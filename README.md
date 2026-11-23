# The Nuremberg Prize: site

Public static site. Plan and decisions: [SITE-PLAN.md](SITE-PLAN.md).

- `content/public/`: Markdown sources (one source per document; page and PDF built from it)
- `design-mockups/`: visual and copy reference only
- `scripts/`: private-file guard (more later)

**Never commit private documents here.** They live in the private `private-docs` repo. CI fails if a private file appears.

Not indexed until launch: `robots.txt` disallows all; add `noindex` meta to every page.
