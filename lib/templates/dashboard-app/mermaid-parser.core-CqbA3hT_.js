import { a as e, c as t, d as n, f as r, g as i, h as a, i as o, l as s, m as c, n as l, o as u, p as d, r as f, s as p, t as m, u as h } from "./chunk-FPAJGGOC-DjJ42fs7.js";
//#region node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-O7ZBX7Z2.mjs
var g = class extends m {
	static {
		r(this, "ArchitectureTokenBuilder");
	}
	constructor() {
		super(["architecture"]);
	}
}, _ = class extends l {
	static {
		r(this, "ArchitectureValueConverter");
	}
	runCustomConverter(e, t, n) {
		if (e.name === "ARCH_ICON") return t.replace(/[()]/g, "").trim();
		if (e.name === "ARCH_TEXT_ICON") return t.replace(/["()]/g, "");
		if (e.name === "ARCH_TITLE") return t.replace(/[[\]]/g, "").trim();
	}
}, v = { parser: {
	TokenBuilder: /* @__PURE__ */ r(() => new g(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ r(() => new _(), "ValueConverter")
} };
function y(e = d) {
	let t = c(i(e), p), n = c(a({ shared: t }), f, v);
	return t.ServiceRegistry.register(n), {
		shared: t,
		Architecture: n
	};
}
r(y, "createArchitectureServices");
//#endregion
//#region node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-S6J4BHB3.mjs
var b = class extends m {
	static {
		r(this, "GitGraphTokenBuilder");
	}
	constructor() {
		super(["gitGraph"]);
	}
}, x = { parser: {
	TokenBuilder: /* @__PURE__ */ r(() => new b(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ r(() => new o(), "ValueConverter")
} };
function S(t = d) {
	let n = c(i(t), p), r = c(a({ shared: n }), e, x);
	return n.ServiceRegistry.register(r), {
		shared: n,
		GitGraph: r
	};
}
r(S, "createGitGraphServices");
//#endregion
//#region node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-LBM3YZW2.mjs
var C = class extends m {
	static {
		r(this, "InfoTokenBuilder");
	}
	constructor() {
		super(["info", "showInfo"]);
	}
}, w = { parser: {
	TokenBuilder: /* @__PURE__ */ r(() => new C(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ r(() => new o(), "ValueConverter")
} };
function T(e = d) {
	let t = c(i(e), p), n = c(a({ shared: t }), u, w);
	return t.ServiceRegistry.register(n), {
		shared: t,
		Info: n
	};
}
r(T, "createInfoServices");
//#endregion
//#region node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-76Q3JFCE.mjs
var E = class extends m {
	static {
		r(this, "PacketTokenBuilder");
	}
	constructor() {
		super(["packet"]);
	}
}, D = { parser: {
	TokenBuilder: /* @__PURE__ */ r(() => new E(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ r(() => new o(), "ValueConverter")
} };
function O(e = d) {
	let n = c(i(e), p), r = c(a({ shared: n }), t, D);
	return n.ServiceRegistry.register(r), {
		shared: n,
		Packet: r
	};
}
r(O, "createPacketServices");
//#endregion
//#region node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-T53DSG4Q.mjs
var k = class extends m {
	static {
		r(this, "PieTokenBuilder");
	}
	constructor() {
		super(["pie", "showData"]);
	}
}, A = class extends l {
	static {
		r(this, "PieValueConverter");
	}
	runCustomConverter(e, t, n) {
		if (e.name === "PIE_SECTION_LABEL") return t.replace(/"/g, "").trim();
	}
}, j = { parser: {
	TokenBuilder: /* @__PURE__ */ r(() => new k(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ r(() => new A(), "ValueConverter")
} };
function M(e = d) {
	let t = c(i(e), p), n = c(a({ shared: t }), s, j);
	return t.ServiceRegistry.register(n), {
		shared: t,
		Pie: n
	};
}
r(M, "createPieServices");
//#endregion
//#region node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-LHMN2FUI.mjs
var N = class extends m {
	static {
		r(this, "RadarTokenBuilder");
	}
	constructor() {
		super(["radar-beta"]);
	}
}, P = { parser: {
	TokenBuilder: /* @__PURE__ */ r(() => new N(), "TokenBuilder"),
	ValueConverter: /* @__PURE__ */ r(() => new o(), "ValueConverter")
} };
function F(e = d) {
	let t = c(i(e), p), n = c(a({ shared: t }), h, P);
	return t.ServiceRegistry.register(n), {
		shared: t,
		Radar: n
	};
}
r(F, "createRadarServices");
//#endregion
//#region node_modules/@mermaid-js/parser/dist/chunks/mermaid-parser.core/chunk-FWNWRKHM.mjs
var I = class extends m {
	static {
		r(this, "TreemapTokenBuilder");
	}
	constructor() {
		super(["treemap"]);
	}
}, L = /classDef\s+([A-Z_a-z]\w+)(?:\s+([^\n\r;]*))?;?/, R = class extends l {
	static {
		r(this, "TreemapValueConverter");
	}
	runCustomConverter(e, t, n) {
		if (e.name === "NUMBER2") return parseFloat(t.replace(/,/g, ""));
		if (e.name === "SEPARATOR" || e.name === "STRING2") return t.substring(1, t.length - 1);
		if (e.name === "INDENTATION") return t.length;
		if (e.name === "ClassDef") {
			if (typeof t != "string") return t;
			let e = L.exec(t);
			if (e) return {
				$type: "ClassDefStatement",
				className: e[1],
				styleText: e[2] || void 0
			};
		}
	}
};
function z(e) {
	let t = e.validation.TreemapValidator, n = e.validation.ValidationRegistry;
	if (n) {
		let e = { Treemap: t.checkSingleRoot.bind(t) };
		n.register(e, t);
	}
}
r(z, "registerValidationChecks");
var B = class {
	static {
		r(this, "TreemapValidator");
	}
	checkSingleRoot(e, t) {
		let n;
		for (let r of e.TreemapRows) r.item && (n === void 0 && r.indent === void 0 ? n = 0 : (r.indent === void 0 || n !== void 0 && n >= parseInt(r.indent, 10)) && t("error", "Multiple root nodes are not allowed in a treemap.", {
			node: r,
			property: "item"
		}));
	}
}, V = {
	parser: {
		TokenBuilder: /* @__PURE__ */ r(() => new I(), "TokenBuilder"),
		ValueConverter: /* @__PURE__ */ r(() => new R(), "ValueConverter")
	},
	validation: { TreemapValidator: /* @__PURE__ */ r(() => new B(), "TreemapValidator") }
};
function H(e = d) {
	let t = c(i(e), p), r = c(a({ shared: t }), n, V);
	return t.ServiceRegistry.register(r), z(r), {
		shared: t,
		Treemap: r
	};
}
r(H, "createTreemapServices");
//#endregion
//#region node_modules/@mermaid-js/parser/dist/mermaid-parser.core.mjs
var U = {}, W = {
	info: /* @__PURE__ */ r(async () => {
		let { createInfoServices: e } = await import("./info-NVLQJR56-GIaAmCaY.js");
		U.info = e().Info.parser.LangiumParser;
	}, "info"),
	packet: /* @__PURE__ */ r(async () => {
		let { createPacketServices: e } = await import("./packet-BFZMPI3H-MJUIOZzl.js");
		U.packet = e().Packet.parser.LangiumParser;
	}, "packet"),
	pie: /* @__PURE__ */ r(async () => {
		let { createPieServices: e } = await import("./pie-7BOR55EZ-DJ3HnLmI.js");
		U.pie = e().Pie.parser.LangiumParser;
	}, "pie"),
	architecture: /* @__PURE__ */ r(async () => {
		let { createArchitectureServices: e } = await import("./architecture-U656AL7Q-TIR0P6BG.js");
		U.architecture = e().Architecture.parser.LangiumParser;
	}, "architecture"),
	gitGraph: /* @__PURE__ */ r(async () => {
		let { createGitGraphServices: e } = await import("./gitGraph-F6HP7TQM-CNVdJ93-.js");
		U.gitGraph = e().GitGraph.parser.LangiumParser;
	}, "gitGraph"),
	radar: /* @__PURE__ */ r(async () => {
		let { createRadarServices: e } = await import("./radar-NHE76QYJ-COz_dXQx.js");
		U.radar = e().Radar.parser.LangiumParser;
	}, "radar"),
	treemap: /* @__PURE__ */ r(async () => {
		let { createTreemapServices: e } = await import("./treemap-KMMF4GRG-BaKKwZ-l.js");
		U.treemap = e().Treemap.parser.LangiumParser;
	}, "treemap")
};
async function G(e, t) {
	let n = W[e];
	if (!n) throw Error(`Unknown diagram type: ${e}`);
	U[e] || await n();
	let r = U[e].parse(t);
	if (r.lexerErrors.length > 0 || r.parserErrors.length > 0) throw new K(r);
	return r.value;
}
r(G, "parse");
var K = class extends Error {
	constructor(e) {
		let t = e.lexerErrors.map((e) => e.message).join("\n"), n = e.parserErrors.map((e) => e.message).join("\n");
		super(`Parsing failed: ${t} ${n}`), this.result = e;
	}
	static {
		r(this, "MermaidParseError");
	}
};
//#endregion
export { F as a, D as c, T as d, x as f, y as h, P as i, O as l, v as m, V as n, j as o, S as p, H as r, M as s, G as t, w as u };
