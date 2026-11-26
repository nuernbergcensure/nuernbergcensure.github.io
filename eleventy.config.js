// Pages serves this repo at /site/ until the custom domain; set PREFIX=/ then.
const slug = (s) =>
  s.replace(/<[^>]+>/g, "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const H2 = /<h2>([\s\S]*?)<\/h2>/g;

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt", "src/style.css": "style.css" });

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
