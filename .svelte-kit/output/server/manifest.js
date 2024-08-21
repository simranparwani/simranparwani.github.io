export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.mJGVMd75.js","app":"_app/immutable/entry/app.BeTe9wqm.js","imports":["_app/immutable/entry/start.mJGVMd75.js","_app/immutable/chunks/entry.Cl1MPO3N.js","_app/immutable/chunks/scheduler.CtbWrGNo.js","_app/immutable/entry/app.BeTe9wqm.js","_app/immutable/chunks/scheduler.CtbWrGNo.js","_app/immutable/chunks/index.DsKBCyxL.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
