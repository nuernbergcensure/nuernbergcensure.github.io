// Eyebrow and intro line for each public document (the Markdown stays the single source).
const meta = {
  "charter-v1": {
    title: "Charter v1",
    eyebrow: "Governing document",
    intro: 'Launch edition for the 2027 cycle. The <a href="../charter-full/">full charter</a> sets out the long-term rules.',
  },
  "charter-full": {
    title: "Full charter",
    eyebrow: "Long-term charter",
    intro: 'The full charter the Censure is working toward. Until it is adopted step by step, <a href="../charter-v1/">Charter v1</a> governs.',
  },
  "scoring-sheet": { eyebrow: "Form", intro: "Blank form. Completed sheets are sealed." },
  "formats-dossier-indictment": { eyebrow: "Form", intro: "With the wording rules every award follows." },
};

export default {
  layout: "doc.njk",
  eleventyComputed: {
    permalink: (d) => `/${d.page.fileSlug}/`,
    // "# The Nürnberg Censure — Charter v1 (Launch Edition)" -> "Charter v1 (Launch Edition)"
    title: (d) => {
      if (meta[d.page.fileSlug]?.title) return meta[d.page.fileSlug].title;
      const h1 = (/^#\s+(.+)$/m.exec(d.page.rawInput || "") || [, "The Nürnberg Censure"])[1];
      return h1.replace(/^The Nürnberg Censure\s+[—–-]\s+/, "");
    },
    eyebrow: (d) => meta[d.page.fileSlug]?.eyebrow || "Document",
    intro: (d) => meta[d.page.fileSlug]?.intro || "",
  },
};
