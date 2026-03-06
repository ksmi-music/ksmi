import type { Plugin } from "vite";
import { writeFile, mkdir } from "fs/promises";
import { dirname, join, resolve } from "path";
import matter from "gray-matter";

function readBody(req: { on: (e: string, h: (d?: unknown) => void) => void }): Promise<string> {
  return new Promise((ok, err) => {
    let body = "";
    req.on("data", (chunk: Buffer) => (body += chunk.toString()));
    req.on("end", () => ok(body));
    req.on("error", err);
  });
}

export function saveContentPlugin(): Plugin {
  return {
    name: "save-content",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== "POST" || req.url !== "/api/save-content") {
          return next();
        }
        try {
          const body = await readBody(req);
          const { path: contentPath, data, content = "" } = JSON.parse(body) as {
            path: string;
            data: Record<string, unknown>;
            content?: string;
          };
          if (!contentPath || typeof contentPath !== "string") {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "path required" }));
            return;
          }
          if (contentPath.includes("..")) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "invalid path" }));
            return;
          }
          const root = process.cwd();
          const contentDir = resolve(root, "public", "content");
          const filePath = resolve(contentDir, contentPath);
          if (!filePath.startsWith(contentDir)) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "invalid path" }));
            return;
          }
          const md = matter.stringify(content, data, { lineWidth: -1 });
          await mkdir(dirname(filePath), { recursive: true });
          await writeFile(filePath, md, "utf-8");
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: true }));
        } catch (err) {
          console.error("[save-content]", err);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: String(err) }));
        }
      });
    },
  };
}
