// Pages serves this repo at /site/ until the custom domain; set PREFIX=/ then.
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt", "src/style.css": "style.css" });
  return {
    dir: { input: "content", includes: "../src/_includes", output: "dist" },
    pathPrefix: process.env.PREFIX || "/",
    markdownTemplateEngine: false,
  };
}
