# The Nuremberg Censure — Website Plan (handoff to Claude Code)

Read this file first. It holds every decision already made about the site. Content for the documents is in `public/` (goes on the site) and `private/` (private repo only, never on the public site). The look is set by the mockups in `design-mockups/`: match their colors, type and layout.

## Decisions already made

- **Domain:** nurembergprize.org (check it's available; register with domain privacy on).
- **Public site:** static, no tracking scripts, no comment sections, no contact forms.
- **Private documents:** behind a login (see "Private area"), never in the public build.
- **Hosting, for now:** GitHub Pages, under the GitHub organization `nurembergprize` (not a personal account), at `nurembergprize.github.io`. Later: the custom domain, with Cloudflare in front. **Never** self-hosted: a site naming heads of state can attract attacks, and self-hosting could expose the founder's home network.
- **Two repositories:** `site` (**public**, required for free GitHub Pages) holds only `content/public/` and the site code. `private-docs` (**private**) holds `content/private/`. A private file must never be committed to the public repo; add a CI check that fails the build if one appears.
- **Not indexed until launch:** a `noindex` meta tag and a `robots.txt` that disallows everything, until the founder says the site is ready.
- **Tone:** sober, legal, archival. Not activist, not satirical.
- **Language:** English at launch; German later.
- **GitHub:** turn on "Automatically delete head branches" on both repositories.

## Repository layout

```
site/                    ← PUBLIC repo, deployed to GitHub Pages
├── content/             ← from content/public/ in this handoff
├── src/                 ← static site generator source
└── scripts/             ← PDF generation, link checks, private-file guard

private-docs/            ← PRIVATE repo, never deployed publicly for now
└── content/             ← from content/private/ in this handoff
```

The login-protected private site (below) comes later, with the custom domain and Cloudflare. Until then the private documents live only in the private repo.

Each document has **one Markdown source**, rendered as a web page **and** generated as a PDF download at build time, so the page and the download never disagree.

## Public site map

### Launch pages (needed before adviser outreach begins)

| Page | URL | Content source | Notes |
| --- | --- | --- | --- |
| Home | `/` | New copy | What the prize is (2–3 sentences); the motto *Nemo supra legem*; "First announcement: 1 October 2027"; a one-line "This is a public record, not a verdict." Links to How it works and the Charter. |
| About | `/about` | New copy, from charter Article 1 | Why "Nuremberg"; the principle; a short founder statement written plainly ("I'm Travis [Last name], a software engineer in Washington State…"); FAQ. |
| Charter | `/charter` | `public/charter-v1.md` | The governing version. Shows the adoption date and a change log. PDF download. |
| Full charter | `/charter/full` | `public/charter-full.md` | Labeled as the long-term version. PDF download. |
| How it works | `/how-it-works` | New copy, from charter v1 sections 5–7 and 10 | Evidence gate → scoring → discussion and vote → notice and right of response → announcement. Downloads: `public/scoring-sheet.md`, `public/formats-dossier-indictment.md`. |
| Categories | `/categories` | Charter Article 2 | All six categories with their legal anchors. Atrocity marked "Opens 2027"; the others "Opens later." |
| The medal | `/medal` | Charter Article 8 and charter v1 section 8 | Text description: front and back, motto, the empty chair, escrow. Photo credits: Truman Library 72-924; National Archives 238-NT-612. **No images** until the real medal exists. |
| Contact | `/contact` | New copy | A single email address on the domain (for example info@). No form. |
| Legal notice | `/legal` | New copy, from charter Article 10 | Not a verdict and calls for no harm; not affiliated with the City of Nuremberg or with the Nobel organizations; corrections policy (Article 7); copyright and photo credits. |

**Footer on every page:** "The Nuremberg Censure is independent. It is not affiliated with the City of Nuremberg or with the Nobel Foundation." Plus links to Legal notice and Contact. Never use the City's coat of arms or logos, and never use "Nobel" in branding.

### Later pages

| Page | URL | When | Content |
| --- | --- | --- | --- |
| Awards index | `/awards` | 1 October 2027 | One entry per award |
| Award page | `/awards/2027-atrocity` | 1 October 2027 | Citation; the Indictment; full evidence dossier (PDF); the honoree's response (unedited, linked prominently); victims' appeal link |
| Response page | `/awards/2027-atrocity/response` | 1 October 2027 | Built from Template D in `private/templates.md` |
| People | `/people` | Once advisers and board agree | Advisers (named, or "one adviser serves confidentially"); board |
| Funding and transparency | `/funding` | Once the legal home exists | Who may give (Article 11); **"What your donation pays for"**: the permitted and forbidden uses, the 25% legal reserve, purpose-restricted gifts; the victims' grant rules; the yearly budget, donor list above $1,000 and annual reports. Donations only after incorporation. |
| German | `/de/…` | After launch | Professional or native-speaker translation only |

## Private area

- **What goes in:** everything in `private/`: the working-draft charter, notice and press templates, adviser outreach kit, lawyer questions, letter to the City, legal-home comparison, and the medal test files.
- **How:** a **separate** static site (`private-site/`), deployed on its own subdomain (for example `private.nurembergprize.org`), protected by Cloudflare Access (Zero Trust) with sign-in by email one-time code. Allow only named email addresses (the founder, later the board). Check current Cloudflare Access free-tier limits.
- **Why separate:** if a single path rule on the public site is misconfigured, private files leak. A separate deployment means private files never exist in the public build at all.
- **Never** put sealed deliberations, scores or candidate lists anywhere on either site. Those stay encrypted and offline (charter Article 12).

## Design

- **Reference:** the four mockups in `design-mockups/` (Home, Charter, How it works, The medal). They are HTML files built for a design tool; treat them as a visual and copy reference, not as code to deploy.

- Plain, archival typography: a serif for headings, a readable sans or serif for body text. Plenty of white space.
- Palette: near-black text, off-white background, one muted bronze accent (echoing the blackened bronze medal).
- No stock photos, no imagery of violence, no Nazi imagery of any kind.
- Fully readable on phones. Accessible: real headings, alt text, good contrast.
- Every document page has: title, version and date, a "Download PDF" link, and a table of contents for long documents.

## Security and privacy checklist

- [ ] Domain registered with privacy protection on
- [ ] Two-factor sign-in on the registrar, the host, Cloudflare and GitHub
- [ ] Public repo contains no private documents and no secrets; private repo is private
- [ ] No analytics, or only a privacy-respecting, cookie-free option
- [ ] No contact form; email address on the domain only
- [ ] HTTPS everywhere; security headers set (content security policy, no third-party scripts)
- [ ] Private site behind Cloudflare Access, separate deployment
- [ ] The founder's home address appears nowhere: not on the site, in domain records or in commit metadata

## Launch checklist

- [ ] Launch pages above are live and proofread
- [ ] PDFs generate correctly for every public document
- [ ] Footer non-affiliation statement on every page
- [ ] Email on the domain works (info@ or contact@)
- [ ] Links checked
- [ ] Charter v1 adoption date filled in once the board and advisers sign
- [ ] **Then:** send the letter to the City of Nuremberg; begin adviser outreach

## What not to do

- Don't publish anything from `private/` on the public site.
- Don't name any candidate, likely honoree or current leader anywhere before an award is announced.
- Don't add donation buttons before the legal home exists.
- Don't use the City of Nuremberg's symbols, or the word "Nobel" in branding.
- Don't add imagery of executions, gallows or Nazi symbols.
