import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function devApiPlugin(): Plugin {
  return {
    name: "dev-api-plugin",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api")) {
          return next();
        }
        try {
          const { handleCombinedApi } = await import("./src/lib/server-api-handler");
          const protocol = req.headers["x-forwarded-proto"] || "http";
          const host = req.headers.host || "localhost:3000";
          const fullUrl = `${protocol}://${host}${req.url}`;

          let body: string | undefined = undefined;
          if (req.method !== "GET" && req.method !== "HEAD") {
            const chunks: Buffer[] = [];
            for await (const chunk of req) {
              chunks.push(chunk);
            }
            body = Buffer.concat(chunks).toString("utf8");
          }

          const headersInit: Record<string, string> = {};
          for (const [key, value] of Object.entries(req.headers)) {
            if (typeof value === "string") {
              headersInit[key] = value;
            } else if (Array.isArray(value)) {
              headersInit[key] = value.join(", ");
            }
          }

          const webReq = new Request(fullUrl, {
            method: req.method,
            headers: headersInit,
            body: body ? body : undefined,
          });

          const response = await handleCombinedApi(webReq);
          if (!response) {
            return next();
          }

          res.statusCode = response.status;
          response.headers.forEach((val, key) => {
            res.setHeader(key, val);
          });
          const text = await response.text();
          res.end(text);
        } catch (err) {
          console.error("API dev server error:", err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Internal API Error" }));
        }
      });
    },
  };
}

export default defineConfig(({ command, mode }) => ({
  mode: process.env["NODE_ENV"] === "production" || command === "build" ? "production" : mode,
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  plugins: [
    devApiPlugin(),
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
    }),
    command === "build"
      ? nitro({
          preset:
            process.env["NITRO_PRESET"] ||
            (process.env["VERCEL"] || process.env["VERCEL_ENV"] || !process.env["CF_PAGES"]
              ? "vercel"
              : "cloudflare-module"),
        })
      : null,
    viteReact(),
  ].filter(Boolean),
}));
