# Lumière — salon website

React + TypeScript + Tailwind CSS + React Router + Framer Motion + Lenis (Vite).

## Run
```bash
npm install
npm run dev      # local
npm run build    # production build in /dist
```
Deploy on Vercel with the **Vite** preset. `vercel.json` already handles page refreshes.

## Make it theirs
| What | Where |
|---|---|
| Salon name, monogram letter, address, phone, **WhatsApp number**, email, hours, socials, Google Maps link | `src/data/site.ts` → `brand` |
| Services & prices, team, lookbook, reviews, gallery, FAQ | `src/data/site.ts` |
| Browser tab title & description | `index.html` |

### Photos (no code needed)
Every placeholder lives in `src/assets/placeholders/` and shows its ideal size.
To replace one, put a photo in `src/assets/images/` with the **same name**, e.g. `hero.webp`,
`svc-nails.jpg`, `team-2.webp`. It is picked up automatically.

### Booking
The booking drawer and contact form send a pre-filled WhatsApp message to `brand.whatsapp`.
Opening hours drive the "Open now" status (Riyadh time) and the available time slots.
