import { c as e, t, u as n } from "./identity-7Us_sWsB.js";
import { E as r, d as i, l as a, s as o, y as s } from "./reduce-BWLEslnA.js";
//#region node_modules/lodash-es/_baseMap.js
function c(t, n) {
	var r = -1, i = e(t) ? Array(t.length) : [];
	return a(t, function(e, t, a) {
		i[++r] = n(e, t, a);
	}), i;
}
//#endregion
//#region node_modules/lodash-es/map.js
function l(e, t) {
	return (n(e) ? r : c)(e, i(t, 3));
}
//#endregion
//#region node_modules/lodash-es/_baseExtremum.js
function u(e, t, n) {
	for (var r = -1, i = e.length; ++r < i;) {
		var a = e[r], o = t(a);
		if (o != null && (c === void 0 ? o === o && !s(o) : n(o, c))) var c = o, l = a;
	}
	return l;
}
//#endregion
//#region node_modules/lodash-es/_baseLt.js
function d(e, t) {
	return e < t;
}
//#endregion
//#region node_modules/lodash-es/min.js
function f(e) {
	return e && e.length ? u(e, t, d) : void 0;
}
//#endregion
//#region node_modules/lodash-es/flatten.js
function p(e) {
	return e != null && e.length ? o(e, 1) : [];
}
//#endregion
export { l as a, u as i, f as n, c as o, d as r, p as t };
