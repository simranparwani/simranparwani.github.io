

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/_page.svelte.js')).default;
export const imports = ["app/immutable/nodes/3.Bd_ha9JP.js","app/immutable/chunks/scheduler.CtbWrGNo.js","app/immutable/chunks/index.DsKBCyxL.js"];
export const stylesheets = ["app/immutable/assets/3.BtsmB6hD.css"];
export const fonts = [];
