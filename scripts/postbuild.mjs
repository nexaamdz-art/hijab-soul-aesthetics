import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");

// Possible sources of build output
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
  console.log(`[postbuild] Successfully copied build output from ${path.relative(root, sourceDir)} to dist/`);
} else {
  console.warn("[postbuild] Warning: No build output folder found to copy to dist/");
}
