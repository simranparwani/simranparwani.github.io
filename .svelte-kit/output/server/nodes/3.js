

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.B2UUsDnA.js","_app/immutable/chunks/scheduler.CtbWrGNo.js","_app/immutable/chunks/index.DsKBCyxL.js"];
export const stylesheets = ["_app/immutable/assets/3.BtsmB6hD.css"];
export const fonts = [];
