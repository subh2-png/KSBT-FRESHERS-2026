# Case File #001 — KSBT Freshers' Event 2026

A cinematic, murder-mystery-themed website for the KIIT School of Biotechnology
Freshers' Event 2026. Built with React, Vite, and Tailwind CSS.

---

## 1. Running it locally

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install     # install dependencies (only needed once)
npm run dev     # start the local dev server
```

Open the URL it prints (usually `http://localhost:5173`). The page hot-reloads
as you edit files.

To build the production-ready static site:

```bash
npm run build     # outputs to /dist
npm run preview   # preview the production build locally
```

---

## 2. Where everything lives

```
src/
├── data/
│   ├── eventConfig.js      ← event details, KIIT/KSBT copy, Dean's message
│   └── representatives.js  ← all 12 CR/CCR profiles
├── components/              ← one file per section (Navbar, Hero, etc.)
├── utils/
│   └── submitRegistration.js ← registration form handler (mock → real backend)
├── App.jsx                  ← assembles all sections in order
└── index.css                 ← theme, fonts, film-grain/vignette effects

public/images/                ← drop photos here (see images/README.md)
google-apps-script/Code.gs    ← paste into Apps Script to enable Sheets storage
```

**You should almost never need to touch `components/`.** Day-to-day edits —
the date, the Dean's message, a CR's name — all happen in `src/data/`.

---

## 3. Editing event details (date, time, venue, theme, dress code)

Open **`src/data/eventConfig.js`** and edit the `eventConfig` object:

```js
export const eventConfig = {
  eventName: "Freshers' Event",
  year: "2026",
  theme: "Murder Mystery",
  date: "[Add Date]",        // ← edit
  time: "[Add Time]",        // ← edit
  venue: "[Add Venue]",      // ← edit
  dressCode: "[Add Dress Code]", // ← edit
  contact: {
    email: "ksbt.events@kiit.ac.in",
    instagram: "https://instagram.com/...",
    linkedin: "https://linkedin.com/...",
    phone: "[Add Contact Number]",
  },
};
```

These values automatically flow into the hero, the "Welcome to the Case"
info card, the Case File section, and the footer — you only edit them once.

---

## 4. Editing the Dean's message

Still in `src/data/eventConfig.js`, edit `deanInfo`:

```js
export const deanInfo = {
  name: "Prof. Srinivas [Surname]",
  title: "Dean, KIIT School of Biotechnology",
  image: "/images/dean.jpg",
  message: `Dear students,

Welcome to the KIIT School of Biotechnology family...`,
};
```

Leave a blank line between paragraphs in `message` — each blank line becomes
a new paragraph on the page.

---

## 5. Editing KIIT / KSBT descriptions and stats

Same file, `kiitInfo` and `ksbtInfo` objects. Replace the placeholder
`description` text with the official approved copy, and fill in the
`stats` (Founded, Campus, Schools, Students) once you have the real figures.
Do not guess at numbers — leave the `[Year]` / `[Number]` placeholders until
you have confirmed figures.

---

## 6. Editing CR / CCR information (names, sections, photos)

Open **`src/data/representatives.js`**. Each CR and CCR is one object:

```js
{
  section: "A",
  gender: "Male",
  name: "[CR Section A Male]",              // ← change the name
  image: "/images/cr_section_a_male.jpg",   // ← change the photo path if needed
}
```

There are exactly 6 CR entries and 6 CCR entries, matching Sections A/B/C ×
Male/Female. The page renders these automatically, grouped by section — you
never need to edit `Representatives.jsx` or `RepresentativeCard.jsx`.

---

## 7. Adding photos

Put image files into **`public/images/`** using the exact filenames already
referenced in the code (see `public/images/README.md` for the full list),
for example:

```
public/images/kiit.jpg
public/images/ksbt.jpg
public/images/dean.jpg
public/images/cr_section_a_male.jpg
public/images/cr_section_a_female.jpg
...
```

Any slot without a matching file automatically shows a themed
"PHOTO EVIDENCE / IMAGE TO BE ADDED" placeholder instead of a broken image
— so you can add photos gradually without the site ever looking broken.

An optional `public/images/hero-bg.jpg` will be blended subtly into the
hero background if present; the hero looks complete without it too.

---

## 8. Connecting registration to Google Sheets

The registration form is already wired to submit to Google Sheets — you
just need to create the Sheet-side endpoint once and paste its URL in.
Until you do, submissions fall back to being saved in the visitor's own
browser only (with a console warning), so the site still works meanwhile.

**One-time setup (~10 minutes):**

1. Create (or open) the Google Sheet you want registrations saved to.
2. In the Sheet, go to **Extensions → Apps Script**.
3. Delete whatever's in `Code.gs` and paste in the contents of
   **`google-apps-script/Code.gs`** from this project.
4. Click **Deploy → New deployment**, click the gear icon, choose
   **Web app**, and set:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**. Google will show an "unverified app" warning because
   it's your own script — click **Advanced → Go to project (unsafe)** to
   authorize it. This is expected and safe for a script you wrote.
6. Copy the **Web app URL** you're given (it ends in `/exec`).
7. Open **`src/utils/submitRegistration.js`** and paste that URL in as
   `GOOGLE_SHEETS_URL`:

   ```js
   const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKf.../exec";
   ```

That's it. The first registration automatically adds a header row
(Timestamp, Full Name, Email, Roll Number, Batch Name); every submission
after that appends a new row.

**Want a different backend instead?** Supabase, Firebase, or a custom API
all work too — replace the body of `submitRegistration()` in
`src/utils/submitRegistration.js`. The Registration form component itself
never needs to change.

---

## 9. Deploying

### Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output
   directory: `dist`.
4. Deploy.

### Netlify

1. Push this project to a GitHub repository.
2. Go to [app.netlify.com](https://app.netlify.com) → "Add new site" →
   "Import an existing project".
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy.

Both platforms auto-redeploy whenever you push changes to the repo.

---

## 10. Tech stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (custom theme: charcoal/burgundy/gold palette, Cinzel /
  Cormorant Garamond / Manrope / Courier Prime typefaces)
- No backend required out of the box; the registration form is structured
  to plug into one later (see section 8).

---

## 11. Accessibility & performance notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`), labelled form
  fields, visible focus states, and `aria-live`/`role="alert"` error
  messages are built in.
- All decorative motion respects `prefers-reduced-motion`.
- Images lazy-load and always have `alt` text or an accessible placeholder
  label.
