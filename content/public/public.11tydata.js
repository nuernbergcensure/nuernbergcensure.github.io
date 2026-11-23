export default {
  layout: "base.njk",
  eleventyComputed: {
    permalink: (d) => `/${d.page.fileSlug}/`,
    title: (d) => (/^#\s+(.+)$/m.exec(d.page.rawInput || "") || [, "The Nuremberg Prize"])[1],
  },
};
