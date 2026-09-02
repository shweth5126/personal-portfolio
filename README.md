# Portfolio site

A single-page site built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com).
Static output, a little vanilla JavaScript, no UI framework. Structured as a
faithful clone of the reference layout with placeholder content you swap out.

## Run it locally

Needs [Node.js](https://nodejs.org) v18+.

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:4321).

```bash
npm run build   # production build into dist/
npm run preview # preview the production build
```

## Where everything lives

| I want to change… | Edit this file |
| --- | --- |
| Any text, prices, links, contact details, nav labels | `src/data/content.js` |
| Colours, fonts, the `custom-beige` brand colour | `tailwind.config.mjs` (`theme.extend`) |
| One section's markup / layout | the matching file in `src/components/` |
| Which sections show and their order | `src/pages/index.astro` |
| Add an icon | paste its path into `src/components/Icon.astro` |

Section components, top to bottom:
`FloatingLogo` · `PillNav` · `Hero` · `GradientBridge` · `Stats` ·
`ClientMarquee` · `Footprint` · `CollaborateCta` · `FeaturedWork` ·
`Process` (the `#services` block) · `Pricing` · `Testimonials` · `Contact` ·
`Faq` · `Footer`.

## Swap in your images

All placeholders are SVGs in `public/`. Replace the file (keep the name) or point
`content.js` at a new path:

| Placeholder | Used for |
| --- | --- |
| `public/logo.svg` | logo (top-left, mobile hero, footer) |
| `public/pixel-art-1.svg`, `pixel-art-2.svg` | floating shapes in the hero |
| `public/clients/client1–5.svg` | marquee circles + testimonial avatars |
| `public/avatars/avatar1–3.svg` | corner images on the process cards |
| `public/work/myvideo1–4.svg` | Featured Work thumbnails |
| `public/testimonials/clientvideo1–3.svg` | testimonial thumbnails |

## Videos

Featured Work already uses 4 of your clips, compressed for the web with ffmpeg
(720x1280, ~1-3.5 MB each) and stored in `public/work/`:
`edibee.mp4`, `edibee-2.mp4`, `deva-rakhandar.mp4`, `world-map.mp4`
(each with a `.jpg` poster of the same name).

**Not yet placed** (in `Desktop/my work to be added/`):

- `A_0001…CANON.mp4`, `VID_20260427…​.mp4` — vertical but look like raw footage.
- `football.mp4`, `watch ui.mp4`, `treaser.mp4` — these are **horizontal 16:9**,
  so they don't fit the 9:16 Featured Work cards. Options: give them their own
  16:9 strip, or upload to YouTube/Vimeo and link out.

To compress and add another clip:

```bash
ffmpeg -i "input.mp4" -vf scale=-2:1280 -c:v libx264 -preset medium -crf 30 \
  -c:a aac -b:a 96k -movflags +faststart public/work/myclip.mp4
ffmpeg -ss 0.5 -i public/work/myclip.mp4 -frames:v 1 -vf scale=-2:900 -q:v 4 \
  public/work/myclip.jpg
```

Then add `{ src: "/work/myclip.mp4", poster: "/work/myclip.jpg" }` to the
`featuredWork.videos` array in `content.js`.

The **Testimonials** section still shows placeholder thumbnails + quotes — you
have no client testimonial videos yet. When you do, drop them in
`public/testimonials/` and fill the `video` / `quote` / `name` fields.

## Wire the contact form

1. Sign up at [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com).
2. Create a form, copy the endpoint URL.
3. Paste it into `contact.formEndpoint` in `content.js`.

The **Reference Files** upload field is visual only unless your form service
accepts attachments (Web3Forms does on its free tier).

## Booking widget

`contact.calendlyUrl` is embedded as an iframe. Put your own Calendly / Cal.com
link there, or delete the "Book a Call Instantly" block in
`src/components/Contact.astro`.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. vercel.com → Add New Project → import the repo → Deploy (Astro auto-detected).
3. Every `git push` redeploys.
