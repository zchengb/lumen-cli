import { h as e } from "./src-B53NoQT1.js";
import { k as t } from "./chunk-ABZYJK2D-CVevQ3ur.js";
import { t as n } from "./dist-DkhStvw3.js";
//#region node_modules/mermaid/dist/chunks/mermaid.core/chunk-TZMSLE5B.mjs
var r = n(), i = /* @__PURE__ */ e((e, t) => {
	let n = e.append("rect");
	if (n.attr("x", t.x), n.attr("y", t.y), n.attr("fill", t.fill), n.attr("stroke", t.stroke), n.attr("width", t.width), n.attr("height", t.height), t.name && n.attr("name", t.name), t.rx && n.attr("rx", t.rx), t.ry && n.attr("ry", t.ry), t.attrs !== void 0) for (let e in t.attrs) n.attr(e, t.attrs[e]);
	return t.class && n.attr("class", t.class), n;
}, "drawRect"), a = /* @__PURE__ */ e((e, t) => {
	i(e, {
		x: t.startx,
		y: t.starty,
		width: t.stopx - t.startx,
		height: t.stopy - t.starty,
		fill: t.fill,
		stroke: t.stroke,
		class: "rect"
	}).lower();
}, "drawBackgroundRect"), o = /* @__PURE__ */ e((e, n) => {
	let r = n.text.replace(t, " "), i = e.append("text");
	i.attr("x", n.x), i.attr("y", n.y), i.attr("class", "legend"), i.style("text-anchor", n.anchor), n.class && i.attr("class", n.class);
	let a = i.append("tspan");
	return a.attr("x", n.x + n.textMargin * 2), a.text(r), i;
}, "drawText"), s = /* @__PURE__ */ e((e, t, n, i) => {
	let a = e.append("image");
	a.attr("x", t), a.attr("y", n);
	let o = (0, r.sanitizeUrl)(i);
	a.attr("xlink:href", o);
}, "drawImage"), c = /* @__PURE__ */ e((e, t, n, i) => {
	let a = e.append("use");
	a.attr("x", t), a.attr("y", n);
	let o = (0, r.sanitizeUrl)(i);
	a.attr("xlink:href", `#${o}`);
}, "drawEmbeddedImage"), l = /* @__PURE__ */ e(() => ({
	x: 0,
	y: 0,
	width: 100,
	height: 100,
	fill: "#EDF2AE",
	stroke: "#666",
	anchor: "start",
	rx: 0,
	ry: 0
}), "getNoteRect"), u = /* @__PURE__ */ e(() => ({
	x: 0,
	y: 0,
	width: 100,
	height: 100,
	"text-anchor": "start",
	style: "#666",
	textMargin: 0,
	rx: 0,
	ry: 0,
	tspan: !0
}), "getTextObj");
//#endregion
export { o as a, i, c as n, l as o, s as r, u as s, a as t };
