import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");

// 1. Copy public assets to dist
const candidates = [
  path.join(root, ".vercel", "output", "static"),
  path.join(root, ".output", "public"),
  path.join(root, ".output"),
];

let sourceDir = null;
for (const candidate of candidates) {
  if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
    sourceDir = candidate;
    break;
  }
}

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

if (sourceDir) {
  fs.cpSync(sourceDir, distDir, { recursive: true, force: true });
  console.log(`[postbuild] Copied build output from ${path.relative(root, sourceDir)} to dist/`);
}

// 2. Sanitize any unsafe filenames (+, [, ], etc.) in .vercel/output/functions to prevent ERR_MODULE_NOT_FOUND on Vercel runtime
function sanitizeFolder(baseDir) {
  if (!fs.existsSync(baseDir)) return;

  function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        getAllFiles(fullPath, fileList);
      } else {
        fileList.push(fullPath);
      }
    }
    return fileList;
  }

  const allFiles = getAllFiles(baseDir);
  const renames = [];

  for (const filePath of allFiles) {
    const fileName = path.basename(filePath);
    if (/[+\[\]]/.test(fileName)) {
      const sanitizedName = fileName.replace(/\+\[\.\.\.\]/g, "_chunks").replace(/[+\[\]]/g, "_");
      const newPath = path.join(path.dirname(filePath), sanitizedName);
      renames.push({
        oldPath: filePath,
        newPath: newPath,
        oldName: fileName,
        newName: sanitizedName,
      });
    }
  }

  // Rename files on disk
  for (const item of renames) {
    fs.renameSync(item.oldPath, item.newPath);
    console.log(`[postbuild] Renamed unsafe chunk: ${item.oldName} -> ${item.newName}`);
  }

  // Update references in all code and config files
  const updatedFileList = getAllFiles(baseDir);
  for (const filePath of updatedFileList) {
    if (filePath.endsWith(".mjs") || filePath.endsWith(".js") || filePath.endsWith(".json")) {
      let content = fs.readFileSync(filePath, "utf-8");
      let changed = false;

      for (const item of renames) {
        if (content.includes(item.oldName)) {
          content = content.replaceAll(item.oldName, item.newName);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(filePath, content, "utf-8");
        console.log(`[postbuild] Updated references in ${path.relative(baseDir, filePath)}`);
      }
    }
  }
}

sanitizeFolder(path.join(root, ".vercel", "output", "functions"));
sanitizeFolder(path.join(root, ".output", "server"));

// 3. Pre-render initial HTML so static fallbacks or CDNs immediately have index.html
async function prerenderInitialHtml() {
  const funcEntry = path.join(root, ".vercel", "output", "functions", "__server.func", "index.mjs");
  const serverEntry = path.join(root, ".output", "server", "index.mjs");
  const targetEntry = fs.existsSync(funcEntry)
    ? funcEntry
    : fs.existsSync(serverEntry)
      ? serverEntry
      : null;

  if (!targetEntry) return;

  try {
    const { default: handler } = await import(`file://${targetEntry}`);
    if (handler && typeof handler.fetch === "function") {
      const response = await handler.fetch(new Request("http://localhost/"), {}, {});
      if (response && response.status === 200) {
        const html = await response.text();
        if (html && html.includes("<html")) {
          const destinations = [
            path.join(root, ".vercel", "output", "static", "index.html"),
            path.join(root, "dist", "index.html"),
            path.join(root, ".output", "public", "index.html"),
          ];
          for (const dest of destinations) {
            const dir = path.dirname(dest);
            if (fs.existsSync(dir)) {
              fs.writeFileSync(dest, html, "utf-8");
              console.log(
                `[postbuild] Generated pre-rendered HTML at ${path.relative(root, dest)}`,
              );
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn(`[postbuild] Note: prerender skipped (${err.message || err})`);
  }
}

await prerenderInitialHtml();

console.log("[postbuild] Completed successfully.");
process.exit(0);
