import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["app/immutable/nodes/2.DctwyJE7.js","app/immutable/chunks/scheduler.CtbWrGNo.js","app/immutable/chunks/index.DsKBCyxL.js","app/immutable/chunks/each.D6YF6ztN.js"];
export const stylesheets = ["app/immutable/assets/2.CUNcxu85.css"];
export const fonts = [];
