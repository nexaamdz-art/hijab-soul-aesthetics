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
      const sanitizedName = fileName
        .replace(/\+\[\.\.\.\]/g, "_chunks")
        .replace(/[+\[\]]/g, "_");
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
