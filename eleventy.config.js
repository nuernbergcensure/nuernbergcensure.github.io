import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

// The Pages workflow sets PREFIX from the repo's Pages base path; local builds use "/".
const slug = (s) =>
  s.replace(/<[^>]+>/g, "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Short content hash for cache-busting static files: style.css?v=<hash> changes whenever the file does.
const fileHash = (path) => createHash("sha256").update(readFileSync(path)).digest("hex").slice(0, 10);

const H2 = /<h2>([\s\S]*?)<\/h2>/g;

export default function (eleventyConfig) {
  eleventyConfig.addFilter("bust", (url, file) => `${url}?v=${fileHash(file)}`);
  eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt", "src/style.css": "style.css", "src/img": "img" });

  // Rendered Markdown -> page body: drop the H1 (the layout shows the title),
  // give each H2 an id for the contents list, and let wide tables scroll.
  eleventyConfig.addFilter("docBody", (html) =>
    html
      .replace(/<h1>[\s\S]*?<\/h1>\s*/, "")
      .replace(H2, (_, t) => `<h2 id="${slug(t)}">${t}</h2>`)
      .replace(/<table>/g, '<div class="table-wrap"><table>')
      .replace(/<\/table>/g, "</table></div>"),
  );
  eleventyConfig.addFilter("docToc", (html) =>
    [...html.matchAll(H2)].map(([, t]) => ({ id: slug(t), text: t.replace(/<[^>]+>/g, "").replace(/^\d+\.\s*/, "") })),
  );

  return {
    dir: { input: "content", includes: "../src/_includes", output: "dist" },
    pathPrefix: process.env.PREFIX || "/",
    markdownTemplateEngine: false,
  };
}
