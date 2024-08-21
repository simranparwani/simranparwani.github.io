import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["app/immutable/nodes/0.CvqKrMh6.js","app/immutable/chunks/scheduler.CtbWrGNo.js","app/immutable/chunks/index.DsKBCyxL.js","app/immutable/chunks/each.D6YF6ztN.js","app/immutable/chunks/stores.D-CER0mO.js","app/immutable/chunks/entry.CqJdIXcm.js"];
export const stylesheets = ["app/immutable/assets/0.BFi5POGj.css"];
export const fonts = [];
