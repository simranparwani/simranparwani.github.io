import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.C9b6JYCH.js","_app/immutable/chunks/scheduler.CtbWrGNo.js","_app/immutable/chunks/index.DsKBCyxL.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/stores.Dy2c6lTi.js","_app/immutable/chunks/entry.Cl1MPO3N.js"];
export const stylesheets = ["_app/immutable/assets/0.BFi5POGj.css"];
export const fonts = [];
