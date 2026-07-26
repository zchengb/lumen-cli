import { g as e, h as t } from "./src-B53NoQT1.js";
import { s as n, y as r } from "./chunk-ABZYJK2D-CVevQ3ur.js";
import { u as i } from "./chunk-S3R3BYOJ-BtVK2Rr4.js";
import { a, i as o, s } from "./chunk-JZLCHNYA-Ci7qRJgj.js";
import { a as c, i as l, n as u, r as d } from "./chunk-QXUST7PY-DUpJQbC-.js";
//#region node_modules/mermaid/dist/chunks/mermaid.core/chunk-N4CR4FBY.mjs
var f = {
	common: n,
	getConfig: r,
	insertCluster: o,
	insertEdge: u,
	insertEdgeLabel: d,
	insertMarkers: l,
	insertNode: a,
	interpolateToCurve: i,
	labelHelper: s,
	log: e,
	positionEdgeLabel: c
}, p = {}, m = /* @__PURE__ */ t((e) => {
	for (let t of e) p[t.name] = t;
}, "registerLayoutLoaders");
(/* @__PURE__ */ t(() => {
	m([{
		name: "dagre",
		loader: /* @__PURE__ */ t(async () => await import("./dagre-6UL2VRFP-BLJZ92VW.js"), "loader")
	}, {
		name: "cose-bilkent",
		loader: /* @__PURE__ */ t(async () => await import("./cose-bilkent-S5V4N54A-jsdVLRqH.js"), "loader")
	}]);
}, "registerDefaultLayoutLoaders"))();
var h = /* @__PURE__ */ t(async (e, t) => {
	if (!(e.layoutAlgorithm in p)) throw Error(`Unknown layout algorithm: ${e.layoutAlgorithm}`);
	let n = p[e.layoutAlgorithm];
	return (await n.loader()).render(e, t, f, { algorithm: n.algorithm });
}, "render"), g = /* @__PURE__ */ t((t = "", { fallback: n = "dagre" } = {}) => {
	if (t in p) return t;
	if (n in p) return e.warn(`Layout algorithm ${t} is not registered. Using ${n} as fallback.`), n;
	throw Error(`Both layout algorithms ${t} and ${n} are not registered.`);
}, "getRegisteredLayoutAlgorithm");
//#endregion
export { m as n, h as r, g as t };
