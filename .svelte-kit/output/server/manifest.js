export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "app",
	appPath: "app",
	assets: new Set([".nojekyll","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"app/immutable/entry/start.DogtfRD-.js","app":"app/immutable/entry/app.CuS8P0PO.js","imports":["app/immutable/entry/start.DogtfRD-.js","app/immutable/chunks/entry.CqJdIXcm.js","app/immutable/chunks/scheduler.CtbWrGNo.js","app/immutable/entry/app.CuS8P0PO.js","app/immutable/chunks/scheduler.CtbWrGNo.js","app/immutable/chunks/index.DsKBCyxL.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
