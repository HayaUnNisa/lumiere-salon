/** On the very first page load, intro animations wait for the preloader (≈2.6s). */
const start = typeof performance !== 'undefined' ? performance.now() : 0
export const bootDelay = () => (performance.now() - start < 2600 ? 2.5 : 0.35)
