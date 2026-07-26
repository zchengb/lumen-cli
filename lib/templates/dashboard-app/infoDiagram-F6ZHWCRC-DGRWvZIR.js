import { t as e } from "./chunk-KS23V3DP-BLgekSrB.js";
import { g as t, h as n } from "./src-B53NoQT1.js";
import { c as r } from "./chunk-ABZYJK2D-CVevQ3ur.js";
import { t as i } from "./chunk-EXTU4WIE-By1ZThX0.js";
import { t as a } from "./mermaid-parser.core-CqbA3hT_.js";
//#region node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-F6ZHWCRC.mjs
var o = { parse: /* @__PURE__ */ n(async (e) => {
	let n = await a("info", e);
	t.debug(n);
}, "parse") }, s = { version: e.version + "" }, c = {
	parser: o,
	db: { getVersion: /* @__PURE__ */ n(() => s.version, "getVersion") },
	renderer: { draw: /* @__PURE__ */ n((e, n, a) => {
		t.debug("rendering info diagram\n" + e);
		let o = i(n);
		r(o, 100, 400, !0), o.append("g").append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${a}`);
	}, "draw") }
};
//#endregion
export { c as diagram };
