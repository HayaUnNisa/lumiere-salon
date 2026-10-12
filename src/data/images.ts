/**
 * HOW TO ADD REAL PHOTOS
 * Put a photo in src/assets/images/ named exactly like the placeholder it replaces,
 * e.g. hero.webp, svc-nails.jpg, team-2.webp. It is picked up automatically —
 * no code changes. Placeholder files (and their ideal sizes) are in src/assets/placeholders/.
 */
const real = import.meta.glob('../assets/images/*.{webp,jpg,jpeg,png,avif}', { eager: true, import: 'default' }) as Record<string, string>
const placeholders = import.meta.glob('../assets/placeholders/*.svg', { eager: true, import: 'default' }) as Record<string, string>

const byName = (files: Record<string, string>) =>
  Object.fromEntries(Object.entries(files).map(([path, url]) => [path.split('/').pop()!.replace(/\.[^.]+$/, ''), url]))

const realMap = byName(real)
const phMap = byName(placeholders)

export function img(name: string): string {
  return realMap[name] ?? phMap[name] ?? phMap['hero']
}
