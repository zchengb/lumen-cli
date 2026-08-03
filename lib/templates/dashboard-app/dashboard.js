import { i as e, n as t, t as n } from "./rolldown-runtime-Dbv0sNQl.js";
import { t as r } from "./chunk-KS23V3DP-BLgekSrB.js";
import { _ as i, g as a, h as o, p as s } from "./src-B53NoQT1.js";
import { J as c, M as l, P as u, R as d, S as f, V as p, W as m, X as h, Y as g, c as _, f as v, g as y, h as b, j as x, l as S, n as C, p as w, q as T, r as E, t as ee, w as D, x as O, y as k } from "./chunk-ABZYJK2D-CVevQ3ur.js";
import { a as te, d as ne, h as A, i as j, m as re, r as ie } from "./chunk-S3R3BYOJ-BtVK2Rr4.js";
import { t as ae } from "./chunk-EXTU4WIE-By1ZThX0.js";
import { n as oe, t as se } from "./chunk-MI3HLSF2-DVisFF9Y.js";
import "./chunk-HN2XXSSU-BzJE2DVW.js";
import "./chunk-CVBHYZKI-utcCkCdu.js";
import "./chunk-ATLVNIR6-CY_EFS1R.js";
import { i as M, s as ce } from "./chunk-JA3XYJ7Z-RwfPEVEr.js";
import "./chunk-JZLCHNYA-Ci7qRJgj.js";
import "./chunk-QXUST7PY-DUpJQbC-.js";
import { n as le } from "./chunk-N4CR4FBY-C3Oe3dWX.js";
import { t as ue } from "./isEmpty-DbxQP0Mx.js";
//#region node_modules/react/cjs/react.production.js
var de = /* @__PURE__ */ n(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, T = Object.prototype.hasOwnProperty;
	function E(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function ee(e, t) {
		return E(e.type, t, e.props);
	}
	function D(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function O(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var k = /\/+/g;
	function te(e, t) {
		return typeof e == "object" && e && e.key != null ? O("" + e.key) : t.toString(36);
	}
	function ne(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function A(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, A(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + te(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(k, "$&/") + "/"), A(o, r, i, "", function(e) {
			return e;
		})) : o != null && (D(o) && (o = ee(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(k, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + te(a, u), c += A(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + te(a, u++), c += A(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return A(ne(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function j(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return A(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function re(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var ie = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, ae = {
		map: j,
		forEach: function(e, t, n) {
			j(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return j(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return j(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!D(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = ae, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !T.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return E(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) T.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return E(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = D, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: re
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, ie);
		} catch (e) {
			ie(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.7";
})), fe = /* @__PURE__ */ n(((e, t) => {
	t.exports = de();
})), pe = /* @__PURE__ */ n(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, S || (S = !0, D());
		else {
			var t = n(l);
			t !== null && te(x, t.startTime - e);
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function E() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function ee() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && te(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? D() : S = !1;
			}
		}
	}
	var D;
	if (typeof y == "function") D = function() {
		y(ee);
	};
	else if (typeof MessageChannel < "u") {
		var O = new MessageChannel(), k = O.port2;
		O.port1.onmessage = ee, D = function() {
			k.postMessage(null);
		};
	} else D = function() {
		_(ee, 0);
	};
	function te(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, te(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, D()))), r;
	}, e.unstable_shouldYield = E, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), me = /* @__PURE__ */ n(((e, t) => {
	t.exports = pe();
})), he = /* @__PURE__ */ n(((e) => {
	var t = fe();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = c(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = c(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.7";
})), ge = /* @__PURE__ */ n(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = he();
})), _e = /* @__PURE__ */ n(((e) => {
	var t = me(), n = fe(), r = ge();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function u(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function d(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = d(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var f = Object.assign, p = Symbol.for("react.element"), m = Symbol.for("react.transitional.element"), h = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), _ = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), y = Symbol.for("react.consumer"), b = Symbol.for("react.context"), x = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), C = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), E = Symbol.for("react.activity"), ee = Symbol.for("react.memo_cache_sentinel"), D = Symbol.iterator;
	function O(e) {
		return typeof e != "object" || !e ? null : (e = D && e[D] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var k = Symbol.for("react.client.reference");
	function te(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === k ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case g: return "Fragment";
			case v: return "Profiler";
			case _: return "StrictMode";
			case S: return "Suspense";
			case C: return "SuspenseList";
			case E: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case h: return "Portal";
			case b: return e.displayName || "Context";
			case y: return (e._context.displayName || "Context") + ".Consumer";
			case x:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case w: return t = e.displayName || null, t === null ? te(e.type) || "Memo" : t;
			case T:
				t = e._payload, e = e._init;
				try {
					return te(e(t));
				} catch {}
		}
		return null;
	}
	var ne = Array.isArray, A = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, re = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, ie = [], ae = -1;
	function oe(e) {
		return { current: e };
	}
	function se(e) {
		0 > ae || (e.current = ie[ae], ie[ae] = null, ae--);
	}
	function M(e, t) {
		ae++, ie[ae] = e.current, e.current = t;
	}
	var ce = oe(null), le = oe(null), ue = oe(null), de = oe(null);
	function pe(e, t) {
		switch (M(ue, t), M(le, e), M(ce, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Ud(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Ud(t), e = Wd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		se(ce), M(ce, e);
	}
	function he() {
		se(ce), se(le), se(ue);
	}
	function _e(e) {
		e.memoizedState !== null && M(de, e);
		var t = ce.current, n = Wd(t, e.type);
		t !== n && (M(le, e), M(ce, n));
	}
	function ve(e) {
		le.current === e && (se(ce), se(le)), de.current === e && (se(de), ep._currentValue = re);
	}
	var N, ye;
	function be(e) {
		if (N === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			N = t && t[1] || "", ye = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + N + e + ye;
	}
	var xe = !1;
	function Se(e, t) {
		if (!e || xe) return "";
		xe = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			xe = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? be(n) : "";
	}
	function Ce(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return be(e.type);
			case 16: return be("Lazy");
			case 13: return e.child !== t && t !== null ? be("Suspense Fallback") : be("Suspense");
			case 19: return be("SuspenseList");
			case 0:
			case 15: return Se(e.type, !1);
			case 11: return Se(e.type.render, !1);
			case 1: return Se(e.type, !0);
			case 31: return be("Activity");
			default: return "";
		}
	}
	function we(e) {
		try {
			var t = "", n = null;
			do
				t += Ce(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var P = Object.prototype.hasOwnProperty, Te = t.unstable_scheduleCallback, Ee = t.unstable_cancelCallback, De = t.unstable_shouldYield, Oe = t.unstable_requestPaint, ke = t.unstable_now, Ae = t.unstable_getCurrentPriorityLevel, je = t.unstable_ImmediatePriority, Me = t.unstable_UserBlockingPriority, Ne = t.unstable_NormalPriority, Pe = t.unstable_LowPriority, Fe = t.unstable_IdlePriority, Ie = t.log, Le = t.unstable_setDisableYieldValue, Re = null, ze = null;
	function Be(e) {
		if (typeof Ie == "function" && Le(e), ze && typeof ze.setStrictMode == "function") try {
			ze.setStrictMode(Re, e);
		} catch {}
	}
	var Ve = Math.clz32 ? Math.clz32 : We, He = Math.log, Ue = Math.LN2;
	function We(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (He(e) / Ue | 0) | 0;
	}
	var Ge = 256, Ke = 262144, qe = 4194304;
	function Je(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Ye(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Je(n))) : i = Je(o) : i = Je(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Je(n))) : i = Je(o)) : i = Je(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Xe(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Ze(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function Qe() {
		var e = qe;
		return qe <<= 1, !(qe & 62914560) && (qe = 4194304), e;
	}
	function $e(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function et(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function tt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Ve(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && nt(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function nt(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Ve(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function rt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Ve(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function it(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : at(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function at(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function ot(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function st() {
		var e = j.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : gp(e.type)) : e;
	}
	function ct(e, t) {
		var n = j.p;
		try {
			return j.p = e, t();
		} finally {
			j.p = n;
		}
	}
	var lt = Math.random().toString(36).slice(2), ut = "__reactFiber$" + lt, dt = "__reactProps$" + lt, ft = "__reactContainer$" + lt, pt = "__reactEvents$" + lt, mt = "__reactListeners$" + lt, ht = "__reactHandles$" + lt, gt = "__reactResources$" + lt, _t = "__reactMarker$" + lt;
	function vt(e) {
		delete e[ut], delete e[dt], delete e[pt], delete e[mt], delete e[ht];
	}
	function yt(e) {
		var t = e[ut];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[ft] || n[ut]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = pf(e); e !== null;) {
					if (n = e[ut]) return n;
					e = pf(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function bt(e) {
		if (e = e[ut] || e[ft]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function xt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function St(e) {
		var t = e[gt];
		return t ||= e[gt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Ct(e) {
		e[_t] = !0;
	}
	var wt = /* @__PURE__ */ new Set(), Tt = {};
	function Et(e, t) {
		Dt(e, t), Dt(e + "Capture", t);
	}
	function Dt(e, t) {
		for (Tt[e] = t, e = 0; e < t.length; e++) wt.add(t[e]);
	}
	var Ot = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), kt = {}, At = {};
	function jt(e) {
		return P.call(At, e) ? !0 : P.call(kt, e) ? !1 : Ot.test(e) ? At[e] = !0 : (kt[e] = !0, !1);
	}
	function Mt(e, t, n) {
		if (jt(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Nt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Pt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function Ft(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function It(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Lt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Rt(e) {
		if (!e._valueTracker) {
			var t = It(e) ? "checked" : "value";
			e._valueTracker = Lt(e, t, "" + e[t]);
		}
	}
	function zt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = It(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Bt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Vt = /[\n"\\]/g;
	function Ht(e) {
		return e.replace(Vt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Ut(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ft(t)) : e.value !== "" + Ft(t) && (e.value = "" + Ft(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Gt(e, o, Ft(n)) : Gt(e, o, Ft(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Ft(s) : e.removeAttribute("name");
	}
	function Wt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Rt(e);
				return;
			}
			n = n == null ? "" : "" + Ft(n), t = t == null ? n : "" + Ft(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Rt(e);
	}
	function Gt(e, t, n) {
		t === "number" && Bt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Kt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Ft(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function qt(e, t, n) {
		if (t != null && (t = "" + Ft(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Ft(n);
	}
	function Jt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (ne(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Ft(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Rt(e);
	}
	function Yt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Xt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Zt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Xt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function F(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Zt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Zt(e, o, t[o]);
	}
	function Qt(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var $t = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), en = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function tn(e) {
		return en.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function nn() {}
	var rn = null;
	function an(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var on = null, sn = null;
	function cn(e) {
		var t = bt(e);
		if (t && (e = t.stateNode)) {
			var n = e[dt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Ut(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Ht("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[dt] || null;
								if (!a) throw Error(i(90));
								Ut(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && zt(r);
					}
					break a;
				case "textarea":
					qt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Kt(e, !!n.multiple, t, !1);
			}
		}
	}
	var ln = !1;
	function un(e, t, n) {
		if (ln) return e(t, n);
		ln = !0;
		try {
			return e(t);
		} finally {
			if (ln = !1, (on !== null || sn !== null) && (Su(), on && (t = on, e = sn, sn = on = null, cn(t), e))) for (t = 0; t < e.length; t++) cn(e[t]);
		}
	}
	function dn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[dt] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var fn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), pn = !1;
	if (fn) try {
		var mn = {};
		Object.defineProperty(mn, "passive", { get: function() {
			pn = !0;
		} }), window.addEventListener("test", mn, mn), window.removeEventListener("test", mn, mn);
	} catch {
		pn = !1;
	}
	var hn = null, gn = null, _n = null;
	function vn() {
		if (_n) return _n;
		var e, t = gn, n = t.length, r, i = "value" in hn ? hn.value : hn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return _n = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function yn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function bn() {
		return !0;
	}
	function xn() {
		return !1;
	}
	function Sn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? bn : xn, this.isPropagationStopped = xn, this;
		}
		return f(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = bn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = bn);
			},
			persist: function() {},
			isPersistent: bn
		}), t;
	}
	var Cn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, wn = Sn(Cn), Tn = f({}, Cn, {
		view: 0,
		detail: 0
	}), En = Sn(Tn), Dn, On, kn, An = f({}, Tn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Vn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== kn && (kn && e.type === "mousemove" ? (Dn = e.screenX - kn.screenX, On = e.screenY - kn.screenY) : On = Dn = 0, kn = e), Dn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : On;
		}
	}), jn = Sn(An), Mn = Sn(f({}, An, { dataTransfer: 0 })), Nn = Sn(f({}, Tn, { relatedTarget: 0 })), Pn = Sn(f({}, Cn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Fn = Sn(f({}, Cn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), In = Sn(f({}, Cn, { data: 0 })), Ln = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Rn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, zn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Bn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = zn[e]) ? !!t[e] : !1;
	}
	function Vn() {
		return Bn;
	}
	var Hn = Sn(f({}, Tn, {
		key: function(e) {
			if (e.key) {
				var t = Ln[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = yn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Rn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Vn,
		charCode: function(e) {
			return e.type === "keypress" ? yn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? yn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Un = Sn(f({}, An, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Wn = Sn(f({}, Tn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Vn
	})), Gn = Sn(f({}, Cn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Kn = Sn(f({}, An, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), qn = Sn(f({}, Cn, {
		newState: 0,
		oldState: 0
	})), Jn = [
		9,
		13,
		27,
		32
	], Yn = fn && "CompositionEvent" in window, Xn = null;
	fn && "documentMode" in document && (Xn = document.documentMode);
	var Zn = fn && "TextEvent" in window && !Xn, Qn = fn && (!Yn || Xn && 8 < Xn && 11 >= Xn), $n = " ", er = !1;
	function tr(e, t) {
		switch (e) {
			case "keyup": return Jn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function nr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var rr = !1;
	function ir(e, t) {
		switch (e) {
			case "compositionend": return nr(t);
			case "keypress": return t.which === 32 ? (er = !0, $n) : null;
			case "textInput": return e = t.data, e === $n && er ? null : e;
			default: return null;
		}
	}
	function ar(e, t) {
		if (rr) return e === "compositionend" || !Yn && tr(e, t) ? (e = vn(), _n = gn = hn = null, rr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Qn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var or = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function sr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!or[e.type] : t === "textarea";
	}
	function cr(e, t, n, r) {
		on ? sn ? sn.push(r) : sn = [r] : on = r, t = Dd(t, "onChange"), 0 < t.length && (n = new wn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var lr = null, ur = null;
	function dr(e) {
		X(e, 0);
	}
	function fr(e) {
		if (zt(xt(e))) return e;
	}
	function pr(e, t) {
		if (e === "change") return t;
	}
	var mr = !1;
	if (fn) {
		var hr;
		if (fn) {
			var gr = "oninput" in document;
			if (!gr) {
				var _r = document.createElement("div");
				_r.setAttribute("oninput", "return;"), gr = typeof _r.oninput == "function";
			}
			hr = gr;
		} else hr = !1;
		mr = hr && (!document.documentMode || 9 < document.documentMode);
	}
	function vr() {
		lr && (lr.detachEvent("onpropertychange", yr), ur = lr = null);
	}
	function yr(e) {
		if (e.propertyName === "value" && fr(ur)) {
			var t = [];
			cr(t, ur, e, an(e)), un(dr, t);
		}
	}
	function br(e, t, n) {
		e === "focusin" ? (vr(), lr = t, ur = n, lr.attachEvent("onpropertychange", yr)) : e === "focusout" && vr();
	}
	function xr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return fr(ur);
	}
	function Sr(e, t) {
		if (e === "click") return fr(t);
	}
	function Cr(e, t) {
		if (e === "input" || e === "change") return fr(t);
	}
	function wr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Tr = typeof Object.is == "function" ? Object.is : wr;
	function Er(e, t) {
		if (Tr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!P.call(t, i) || !Tr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Dr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Or(e, t) {
		var n = Dr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Dr(n);
		}
	}
	function kr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? kr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Ar(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Bt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Bt(e.document);
		}
		return t;
	}
	function jr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Mr = fn && "documentMode" in document && 11 >= document.documentMode, Nr = null, Pr = null, Fr = null, Ir = !1;
	function Lr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Ir || Nr == null || Nr !== Bt(r) || (r = Nr, "selectionStart" in r && jr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Fr && Er(Fr, r) || (Fr = r, r = Dd(Pr, "onSelect"), 0 < r.length && (t = new wn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Nr)));
	}
	function Rr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var zr = {
		animationend: Rr("Animation", "AnimationEnd"),
		animationiteration: Rr("Animation", "AnimationIteration"),
		animationstart: Rr("Animation", "AnimationStart"),
		transitionrun: Rr("Transition", "TransitionRun"),
		transitionstart: Rr("Transition", "TransitionStart"),
		transitioncancel: Rr("Transition", "TransitionCancel"),
		transitionend: Rr("Transition", "TransitionEnd")
	}, Br = {}, Vr = {};
	fn && (Vr = document.createElement("div").style, "AnimationEvent" in window || (delete zr.animationend.animation, delete zr.animationiteration.animation, delete zr.animationstart.animation), "TransitionEvent" in window || delete zr.transitionend.transition);
	function Hr(e) {
		if (Br[e]) return Br[e];
		if (!zr[e]) return e;
		var t = zr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Vr) return Br[e] = t[n];
		return e;
	}
	var Ur = Hr("animationend"), Wr = Hr("animationiteration"), Gr = Hr("animationstart"), Kr = Hr("transitionrun"), qr = Hr("transitionstart"), Jr = Hr("transitioncancel"), Yr = Hr("transitionend"), Xr = /* @__PURE__ */ new Map(), Zr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Zr.push("scrollEnd");
	function Qr(e, t) {
		Xr.set(e, t), Et(t, [e]);
	}
	var $r = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, ei = [], ti = 0, ni = 0;
	function ri() {
		for (var e = ti, t = ni = ti = 0; t < e;) {
			var n = ei[t];
			ei[t++] = null;
			var r = ei[t];
			ei[t++] = null;
			var i = ei[t];
			ei[t++] = null;
			var a = ei[t];
			if (ei[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && si(n, i, a);
		}
	}
	function ii(e, t, n, r) {
		ei[ti++] = e, ei[ti++] = t, ei[ti++] = n, ei[ti++] = r, ni |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function ai(e, t, n, r) {
		return ii(e, t, n, r), ci(e);
	}
	function oi(e, t) {
		return ii(e, null, null, t), ci(e);
	}
	function si(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ve(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function ci(e) {
		if (50 < pu) throw pu = 0, mu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var li = {};
	function ui(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function di(e, t, n, r) {
		return new ui(e, t, n, r);
	}
	function fi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function pi(e, t) {
		var n = e.alternate;
		return n === null ? (n = di(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function mi(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function hi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") fi(e) && (s = 1);
		else if (typeof e == "string") s = Gf(e, n, ce.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case E: return e = di(31, n, t, a), e.elementType = E, e.lanes = o, e;
			case g: return gi(n.children, a, o, t);
			case _:
				s = 8, a |= 24;
				break;
			case v: return e = di(12, n, t, a | 2), e.elementType = v, e.lanes = o, e;
			case S: return e = di(13, n, t, a), e.elementType = S, e.lanes = o, e;
			case C: return e = di(19, n, t, a), e.elementType = C, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case b:
						s = 10;
						break a;
					case y:
						s = 9;
						break a;
					case x:
						s = 11;
						break a;
					case w:
						s = 14;
						break a;
					case T:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = di(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function gi(e, t, n, r) {
		return e = di(7, e, r, t), e.lanes = n, e;
	}
	function _i(e, t, n) {
		return e = di(6, e, null, t), e.lanes = n, e;
	}
	function vi(e) {
		var t = di(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function yi(e, t, n) {
		return t = di(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var bi = /* @__PURE__ */ new WeakMap();
	function xi(e, t) {
		if (typeof e == "object" && e) {
			var n = bi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: we(t)
			}, bi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: we(t)
		};
	}
	var Si = [], Ci = 0, wi = null, Ti = 0, Ei = [], Di = 0, Oi = null, ki = 1, Ai = "";
	function ji(e, t) {
		Si[Ci++] = Ti, Si[Ci++] = wi, wi = e, Ti = t;
	}
	function Mi(e, t, n) {
		Ei[Di++] = ki, Ei[Di++] = Ai, Ei[Di++] = Oi, Oi = e;
		var r = ki;
		e = Ai;
		var i = 32 - Ve(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Ve(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, ki = 1 << 32 - Ve(t) + i | n << i | r, Ai = a + e;
		} else ki = 1 << a | n << i | r, Ai = e;
	}
	function Ni(e) {
		e.return !== null && (ji(e, 1), Mi(e, 1, 0));
	}
	function Pi(e) {
		for (; e === wi;) wi = Si[--Ci], Si[Ci] = null, Ti = Si[--Ci], Si[Ci] = null;
		for (; e === Oi;) Oi = Ei[--Di], Ei[Di] = null, Ai = Ei[--Di], Ei[Di] = null, ki = Ei[--Di], Ei[Di] = null;
	}
	function Fi(e, t) {
		Ei[Di++] = ki, Ei[Di++] = Ai, Ei[Di++] = Oi, ki = t.id, Ai = t.overflow, Oi = e;
	}
	var Ii = null, Li = null, I = !1, Ri = null, zi = !1, Bi = Error(i(519));
	function Vi(e) {
		throw qi(xi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Bi;
	}
	function Hi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[ut] = e, t[dt] = r, n) {
			case "dialog":
				Z("cancel", t), Z("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Z("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < yd.length; n++) Z(yd[n], t);
				break;
			case "source":
				Z("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Z("error", t), Z("load", t);
				break;
			case "details":
				Z("toggle", t);
				break;
			case "input":
				Z("invalid", t), Wt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Z("invalid", t);
				break;
			case "textarea": Z("invalid", t), Jt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Nd(t.textContent, n) ? (r.popover != null && (Z("beforetoggle", t), Z("toggle", t)), r.onScroll != null && Z("scroll", t), r.onScrollEnd != null && Z("scrollend", t), r.onClick != null && (t.onclick = nn), t = !0) : t = !1, t || Vi(e, !0);
	}
	function Ui(e) {
		for (Ii = e.return; Ii;) switch (Ii.tag) {
			case 5:
			case 31:
			case 13:
				zi = !1;
				return;
			case 27:
			case 3:
				zi = !0;
				return;
			default: Ii = Ii.return;
		}
	}
	function Wi(e) {
		if (e !== Ii) return !1;
		if (!I) return Ui(e), I = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Gd(e.type, e.memoizedProps)), n = !n), n && Li && Vi(e), Ui(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Li = ff(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Li = ff(e);
		} else t === 27 ? (t = Li, $d(e.type) ? (e = df, df = null, Li = e) : Li = t) : Li = Ii ? uf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Gi() {
		Li = Ii = null, I = !1;
	}
	function Ki() {
		var e = Ri;
		return e !== null && ($l === null ? $l = e : $l.push.apply($l, e), Ri = null), e;
	}
	function qi(e) {
		Ri === null ? Ri = [e] : Ri.push(e);
	}
	var Ji = oe(null), Yi = null, Xi = null;
	function Zi(e, t, n) {
		M(Ji, t._currentValue), t._currentValue = n;
	}
	function Qi(e) {
		e._currentValue = Ji.current, se(Ji);
	}
	function $i(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function ea(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), $i(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), $i(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function ta(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Tr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === de.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [ep] : e.push(ep));
			}
			a = a.return;
		}
		e !== null && ea(t, e, n, r), t.flags |= 262144;
	}
	function na(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Tr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function ra(e) {
		Yi = e, Xi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function ia(e) {
		return oa(Yi, e);
	}
	function aa(e, t) {
		return Yi === null && ra(e), oa(e, t);
	}
	function oa(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Xi === null) {
			if (e === null) throw Error(i(308));
			Xi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Xi = Xi.next = t;
		return n;
	}
	var sa = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, ca = t.unstable_scheduleCallback, la = t.unstable_NormalPriority, L = {
		$$typeof: b,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function ua() {
		return {
			controller: new sa(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function da(e) {
		e.refCount--, e.refCount === 0 && ca(la, function() {
			e.controller.abort();
		});
	}
	var R = null, fa = 0, pa = 0, z = null;
	function ma(e, t) {
		if (R === null) {
			var n = R = [];
			fa = 0, pa = pd(), z = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return fa++, t.then(ha, ha), t;
	}
	function ha() {
		if (--fa === 0 && R !== null) {
			z !== null && (z.status = "fulfilled");
			var e = R;
			R = null, pa = 0, z = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function ga(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var _a = A.S;
	A.S = function(e, t) {
		nu = ke(), typeof t == "object" && t && typeof t.then == "function" && ma(e, t), _a !== null && _a(e, t);
	};
	var va = oe(null);
	function ya() {
		var e = va.current;
		return e === null ? Bl.pooledCache : e;
	}
	function ba(e, t) {
		t === null ? M(va, va.current) : M(va, t.pool);
	}
	function xa() {
		var e = ya();
		return e === null ? null : {
			parent: L._currentValue,
			pool: e
		};
	}
	var Sa = Error(i(460)), Ca = Error(i(474)), wa = Error(i(542)), Ta = { then: function() {} };
	function Ea(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Da(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(nn, nn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, ja(e), e;
			default:
				if (typeof t.status == "string") t.then(nn, nn);
				else {
					if (e = Bl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, ja(e), e;
				}
				throw ka = t, Sa;
		}
	}
	function Oa(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (ka = e, Sa) : e;
		}
	}
	var ka = null;
	function Aa() {
		if (ka === null) throw Error(i(459));
		var e = ka;
		return ka = null, e;
	}
	function ja(e) {
		if (e === Sa || e === wa) throw Error(i(483));
	}
	var Ma = null, Na = 0;
	function Pa(e) {
		var t = Na;
		return Na += 1, Ma === null && (Ma = []), Da(Ma, e, t);
	}
	function Fa(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ia(e, t) {
		throw t.$$typeof === p ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function La(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = pi(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = _i(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === g ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === T && Oa(i) === t.type) ? (t = a(t, n.props), Fa(t, n), t.return = e, t) : (t = hi(n.type, n.key, n.props, null, e.mode, r), Fa(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = yi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = gi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = _i("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case m: return n = hi(t.type, t.key, t.props, null, e.mode, n), Fa(n, t), n.return = e, n;
					case h: return t = yi(t, e.mode, n), t.return = e, t;
					case T: return t = Oa(t), f(e, t, n);
				}
				if (ne(t) || O(t)) return t = gi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Pa(t), n);
				if (t.$$typeof === b) return f(e, aa(e, t), n);
				Ia(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case m: return n.key === i ? l(e, t, n, r) : null;
					case h: return n.key === i ? u(e, t, n, r) : null;
					case T: return n = Oa(n), p(e, t, n, r);
				}
				if (ne(n) || O(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Pa(n), r);
				if (n.$$typeof === b) return p(e, t, aa(e, n), r);
				Ia(e, n);
			}
			return null;
		}
		function _(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case m: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case h: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case T: return r = Oa(r), _(e, t, n, r, i);
				}
				if (ne(r) || O(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return _(e, t, n, Pa(r), i);
				if (r.$$typeof === b) return _(e, t, n, aa(t, r), i);
				Ia(t, r);
			}
			return null;
		}
		function v(i, a, s, c) {
			for (var l = null, u = null, d = a, m = a = 0, h = null; d !== null && m < s.length; m++) {
				d.index > m ? (h = d, d = null) : h = d.sibling;
				var g = p(i, d, s[m], c);
				if (g === null) {
					d === null && (d = h);
					break;
				}
				e && d && g.alternate === null && t(i, d), a = o(g, a, m), u === null ? l = g : u.sibling = g, u = g, d = h;
			}
			if (m === s.length) return n(i, d), I && ji(i, m), l;
			if (d === null) {
				for (; m < s.length; m++) d = f(i, s[m], c), d !== null && (a = o(d, a, m), u === null ? l = d : u.sibling = d, u = d);
				return I && ji(i, m), l;
			}
			for (d = r(d); m < s.length; m++) h = _(d, i, m, s[m], c), h !== null && (e && h.alternate !== null && d.delete(h.key === null ? m : h.key), a = o(h, a, m), u === null ? l = h : u.sibling = h, u = h);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), I && ji(i, m), l;
		}
		function y(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, m = s, h = s = 0, g = null, v = c.next(); m !== null && !v.done; h++, v = c.next()) {
				m.index > h ? (g = m, m = null) : g = m.sibling;
				var y = p(a, m, v.value, l);
				if (y === null) {
					m === null && (m = g);
					break;
				}
				e && m && y.alternate === null && t(a, m), s = o(y, s, h), d === null ? u = y : d.sibling = y, d = y, m = g;
			}
			if (v.done) return n(a, m), I && ji(a, h), u;
			if (m === null) {
				for (; !v.done; h++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, h), d === null ? u = v : d.sibling = v, d = v);
				return I && ji(a, h), u;
			}
			for (m = r(m); !v.done; h++, v = c.next()) v = _(m, a, h, v.value, l), v !== null && (e && v.alternate !== null && m.delete(v.key === null ? h : v.key), s = o(v, s, h), d === null ? u = v : d.sibling = v, d = v);
			return e && m.forEach(function(e) {
				return t(a, e);
			}), I && ji(a, h), u;
		}
		function x(e, r, o, c) {
			if (typeof o == "object" && o && o.type === g && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case m:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === g) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === T && Oa(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Fa(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === g ? (c = gi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = hi(o.type, o.key, o.props, null, e.mode, c), Fa(c, o), c.return = e, e = c);
						}
						return s(e);
					case h:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = yi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case T: return o = Oa(o), x(e, r, o, c);
				}
				if (ne(o)) return v(e, r, o, c);
				if (O(o)) {
					if (l = O(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), y(e, r, o, c);
				}
				if (typeof o.then == "function") return x(e, r, Pa(o), c);
				if (o.$$typeof === b) return x(e, r, aa(e, o), c);
				Ia(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = _i(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Na = 0;
				var i = x(e, t, n, r);
				return Ma = null, i;
			} catch (t) {
				if (t === Sa || t === wa) throw t;
				var a = di(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Ra = La(!0), za = La(!1), Ba = !1;
	function Va(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Ha(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ua(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Wa(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, G & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = ci(e), si(e, null, n), t;
		}
		return ii(e, r, t, n), ci(e);
	}
	function Ga(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, rt(e, n);
		}
	}
	function Ka(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var qa = !1;
	function Ja() {
		if (qa) {
			var e = z;
			if (e !== null) throw e;
		}
	}
	function Ya(e, t, n, r) {
		qa = !1;
		var i = e.updateQueue;
		Ba = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var p = s.lane & -536870913, m = p !== s.lane;
				if (m ? (q & p) === p : (r & p) === p) {
					p !== 0 && p === pa && (qa = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var h = e, g = s;
						p = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (h = g.payload, typeof h == "function") {
									d = h.call(_, d, p);
									break a;
								}
								d = h;
								break a;
							case 3: h.flags = h.flags & -65537 | 128;
							case 0:
								if (h = g.payload, p = typeof h == "function" ? h.call(_, d, p) : h, p == null) break a;
								d = f({}, d, p);
								break a;
							case 2: Ba = !0;
						}
					}
					p = s.callback, p !== null && (e.flags |= 64, m && (e.flags |= 8192), m = i.callbacks, m === null ? i.callbacks = [p] : m.push(p));
				} else m = {
					lane: p,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = m, c = d) : u = u.next = m, o |= p;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					m = s, s = m.next, m.next = null, i.lastBaseUpdate = m, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), ql |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Xa(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Za(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Xa(n[e], t);
	}
	var Qa = oe(null), $a = oe(0);
	function eo(e, t) {
		e = Gl, M($a, e), M(Qa, t), Gl = e | t.baseLanes;
	}
	function to() {
		M($a, Gl), M(Qa, Qa.current);
	}
	function no() {
		Gl = $a.current, se(Qa), se($a);
	}
	var ro = oe(null), io = null;
	function ao(e) {
		var t = e.alternate;
		M(uo, uo.current & 1), M(ro, e), io === null && (t === null || Qa.current !== null || t.memoizedState !== null) && (io = e);
	}
	function oo(e) {
		M(uo, uo.current), M(ro, e), io === null && (io = e);
	}
	function so(e) {
		e.tag === 22 ? (M(uo, uo.current), M(ro, e), io === null && (io = e)) : co(e);
	}
	function co() {
		M(uo, uo.current), M(ro, ro.current);
	}
	function lo(e) {
		se(ro), io === e && (io = null), se(uo);
	}
	var uo = oe(0);
	function fo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || sf(n) || cf(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var po = 0, B = null, V = null, mo = null, ho = !1, go = !1, _o = !1, vo = 0, yo = 0, bo = null, xo = 0;
	function So() {
		throw Error(i(321));
	}
	function Co(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Tr(e[n], t[n])) return !1;
		return !0;
	}
	function wo(e, t, n, r, i, a) {
		return po = a, B = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, A.H = e === null || e.memoizedState === null ? Rs : zs, _o = !1, a = n(r, i), _o = !1, go && (a = Eo(t, n, r, i)), To(e), a;
	}
	function To(e) {
		A.H = Ls;
		var t = V !== null && V.next !== null;
		if (po = 0, mo = V = B = null, ho = !1, yo = 0, bo = null, t) throw Error(i(300));
		e === null || nc || (e = e.dependencies, e !== null && na(e) && (nc = !0));
	}
	function Eo(e, t, n, r) {
		B = e;
		var a = 0;
		do {
			if (go && (bo = null), yo = 0, go = !1, 25 <= a) throw Error(i(301));
			if (a += 1, mo = V = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			A.H = Bs, o = t(n, r);
		} while (go);
		return o;
	}
	function Do() {
		var e = A.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Po(t) : t, e = e.useState()[0], (V === null ? null : V.memoizedState) !== e && (B.flags |= 1024), t;
	}
	function Oo() {
		var e = vo !== 0;
		return vo = 0, e;
	}
	function ko(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Ao(e) {
		if (ho) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			ho = !1;
		}
		po = 0, mo = V = B = null, go = !1, yo = vo = 0, bo = null;
	}
	function jo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return mo === null ? B.memoizedState = mo = e : mo = mo.next = e, mo;
	}
	function Mo() {
		if (V === null) {
			var e = B.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = V.next;
		var t = mo === null ? B.memoizedState : mo.next;
		if (t !== null) mo = t, V = e;
		else {
			if (e === null) throw B.alternate === null ? Error(i(467)) : Error(i(310));
			V = e, e = {
				memoizedState: V.memoizedState,
				baseState: V.baseState,
				baseQueue: V.baseQueue,
				queue: V.queue,
				next: null
			}, mo === null ? B.memoizedState = mo = e : mo = mo.next = e;
		}
		return mo;
	}
	function No() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Po(e) {
		var t = yo;
		return yo += 1, bo === null && (bo = []), e = Da(bo, e, t), t = B, (mo === null ? t.memoizedState : mo.next) === null && (t = t.alternate, A.H = t === null || t.memoizedState === null ? Rs : zs), e;
	}
	function Fo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Po(e);
			if (e.$$typeof === b) return ia(e);
		}
		throw Error(i(438, String(e)));
	}
	function Io(e) {
		var t = null, n = B.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = B.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = No(), B.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = ee;
		return t.index++, n;
	}
	function Lo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Ro(e) {
		return zo(Mo(), V, e);
	}
	function zo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (po & f) === f : (q & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === pa && (d = !0);
					else if ((po & p) === p) {
						u = u.next, p === pa && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, B.lanes |= p, ql |= p;
					f = u.action, _o && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, B.lanes |= f, ql |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Tr(o, e.memoizedState) && (nc = !0, d && (n = z, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Bo(e) {
		var t = Mo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Tr(o, t.memoizedState) || (nc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Vo(e, t, n) {
		var r = B, a = Mo(), o = I;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Tr((V || a).memoizedState, n);
		if (s && (a.memoizedState = n, nc = !0), a = a.queue, ls(Wo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || mo !== null && mo.memoizedState.tag & 1) {
			if (r.flags |= 2048, is(9, { destroy: void 0 }, Uo.bind(null, r, a, n, t), null), Bl === null) throw Error(i(349));
			o || po & 127 || Ho(r, t, n);
		}
		return n;
	}
	function Ho(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = B.updateQueue, t === null ? (t = No(), B.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Uo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Go(t) && Ko(e);
	}
	function Wo(e, t, n) {
		return n(function() {
			Go(t) && Ko(e);
		});
	}
	function Go(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Tr(e, n);
		} catch {
			return !0;
		}
	}
	function Ko(e) {
		var t = oi(e, 2);
		t !== null && _u(t, e, 2);
	}
	function qo(e) {
		var t = jo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), _o) {
				Be(!0);
				try {
					n();
				} finally {
					Be(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Lo,
			lastRenderedState: e
		}, t;
	}
	function Jo(e, t, n, r) {
		return e.baseState = n, zo(e, V, typeof r == "function" ? r : Lo);
	}
	function Yo(e, t, n, r, a) {
		if (Ps(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			A.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Xo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Xo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = A.T, o = {};
			A.T = o;
			try {
				var s = n(i, r), c = A.S;
				c !== null && c(o, s), H(e, t, s);
			} catch (n) {
				U(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), A.T = a;
			}
		} else try {
			a = n(i, r), H(e, t, a);
		} catch (n) {
			U(e, t, n);
		}
	}
	function H(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Zo(e, t, n);
		}, function(n) {
			return U(e, t, n);
		}) : Zo(e, t, n);
	}
	function Zo(e, t, n) {
		t.status = "fulfilled", t.value = n, Qo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Xo(e, n)));
	}
	function U(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Qo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Qo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function $o(e, t) {
		return t;
	}
	function es(e, t) {
		if (I) {
			var n = Bl.formState;
			if (n !== null) {
				a: {
					var r = B;
					if (I) {
						if (Li) {
							b: {
								for (var i = Li, a = zi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = uf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Li = uf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Vi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = jo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: $o,
			lastRenderedState: t
		}, n.queue = r, n = js.bind(null, B, r), r.dispatch = n, r = qo(!1), a = Ns.bind(null, B, !1, r.queue), r = jo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Yo.bind(null, B, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function ts(e) {
		return W(Mo(), V, e);
	}
	function W(e, t, n) {
		if (t = zo(e, t, $o)[0], e = Ro(Lo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Po(t);
		} catch (e) {
			throw e === Sa ? wa : e;
		}
		else r = t;
		t = Mo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (B.flags |= 2048, is(9, { destroy: void 0 }, ns.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function ns(e, t) {
		e.action = t;
	}
	function rs(e) {
		var t = Mo(), n = V;
		if (n !== null) return W(t, n, e);
		Mo(), t = t.memoizedState, n = Mo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function is(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = B.updateQueue, t === null && (t = No(), B.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function as() {
		return Mo().memoizedState;
	}
	function os(e, t, n, r) {
		var i = jo();
		B.flags |= e, i.memoizedState = is(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ss(e, t, n, r) {
		var i = Mo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		V !== null && r !== null && Co(r, V.memoizedState.deps) ? i.memoizedState = is(t, a, n, r) : (B.flags |= e, i.memoizedState = is(1 | t, a, n, r));
	}
	function cs(e, t) {
		os(8390656, 8, e, t);
	}
	function ls(e, t) {
		ss(2048, 8, e, t);
	}
	function us(e) {
		B.flags |= 4;
		var t = B.updateQueue;
		if (t === null) t = No(), B.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function ds(e) {
		var t = Mo().memoizedState;
		return us({
			ref: t,
			nextImpl: e
		}), function() {
			if (G & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function fs(e, t) {
		return ss(4, 2, e, t);
	}
	function ps(e, t) {
		return ss(4, 4, e, t);
	}
	function ms(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function hs(e, t, n) {
		n = n == null ? null : n.concat([e]), ss(4, 4, ms.bind(null, t, e), n);
	}
	function gs() {}
	function _s(e, t) {
		var n = Mo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Co(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function vs(e, t) {
		var n = Mo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Co(t, r[1])) return r[0];
		if (r = e(), _o) {
			Be(!0);
			try {
				e();
			} finally {
				Be(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function ys(e, t, n) {
		return n === void 0 || po & 1073741824 && !(q & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = gu(), B.lanes |= e, ql |= e, n);
	}
	function bs(e, t, n, r) {
		return Tr(n, t) ? n : Qa.current === null ? !(po & 42) || po & 1073741824 && !(q & 261930) ? (nc = !0, e.memoizedState = n) : (e = gu(), B.lanes |= e, ql |= e, t) : (e = ys(e, n, r), Tr(e, t) || (nc = !0), e);
	}
	function xs(e, t, n, r, i) {
		var a = j.p;
		j.p = a !== 0 && 8 > a ? a : 8;
		var o = A.T, s = {};
		A.T = s, Ns(e, !1, t, n);
		try {
			var c = i(), l = A.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ms(e, t, ga(c, r), hu(e)) : Ms(e, t, r, hu(e));
		} catch (n) {
			Ms(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, hu());
		} finally {
			j.p = a, o !== null && s.types !== null && (o.types = s.types), A.T = o;
		}
	}
	function Ss() {}
	function Cs(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = ws(e).queue;
		xs(e, a, t, re, n === null ? Ss : function() {
			return Ts(e), n(r);
		});
	}
	function ws(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: re,
			baseState: re,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Lo,
				lastRenderedState: re
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Lo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Ts(e) {
		var t = ws(e);
		t.next === null && (t = e.alternate.memoizedState), Ms(e, t.next.queue, {}, hu());
	}
	function Es() {
		return ia(ep);
	}
	function Ds() {
		return Mo().memoizedState;
	}
	function Os() {
		return Mo().memoizedState;
	}
	function ks(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = hu();
					e = Ua(n);
					var r = Wa(t, e, n);
					r !== null && (_u(r, t, n), Ga(r, t, n)), t = { cache: ua() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function As(e, t, n) {
		var r = hu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ps(e) ? Fs(t, n) : (n = ai(e, t, n, r), n !== null && (_u(n, e, r), Is(n, t, r)));
	}
	function js(e, t, n) {
		Ms(e, t, n, hu());
	}
	function Ms(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Ps(e)) Fs(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Tr(s, o)) return ii(e, t, i, 0), Bl === null && ri(), !1;
			} catch {}
			if (n = ai(e, t, i, r), n !== null) return _u(n, e, r), Is(n, t, r), !0;
		}
		return !1;
	}
	function Ns(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: pd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ps(e)) {
			if (t) throw Error(i(479));
		} else t = ai(e, n, r, 2), t !== null && _u(t, e, 2);
	}
	function Ps(e) {
		var t = e.alternate;
		return e === B || t !== null && t === B;
	}
	function Fs(e, t) {
		go = ho = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Is(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, rt(e, n);
		}
	}
	var Ls = {
		readContext: ia,
		use: Fo,
		useCallback: So,
		useContext: So,
		useEffect: So,
		useImperativeHandle: So,
		useLayoutEffect: So,
		useInsertionEffect: So,
		useMemo: So,
		useReducer: So,
		useRef: So,
		useState: So,
		useDebugValue: So,
		useDeferredValue: So,
		useTransition: So,
		useSyncExternalStore: So,
		useId: So,
		useHostTransitionStatus: So,
		useFormState: So,
		useActionState: So,
		useOptimistic: So,
		useMemoCache: So,
		useCacheRefresh: So
	};
	Ls.useEffectEvent = So;
	var Rs = {
		readContext: ia,
		use: Fo,
		useCallback: function(e, t) {
			return jo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: ia,
		useEffect: cs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), os(4194308, 4, ms.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return os(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			os(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = jo();
			t = t === void 0 ? null : t;
			var r = e();
			if (_o) {
				Be(!0);
				try {
					e();
				} finally {
					Be(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = jo();
			if (n !== void 0) {
				var i = n(t);
				if (_o) {
					Be(!0);
					try {
						n(t);
					} finally {
						Be(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = As.bind(null, B, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = jo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = qo(e);
			var t = e.queue, n = js.bind(null, B, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: gs,
		useDeferredValue: function(e, t) {
			return ys(jo(), e, t);
		},
		useTransition: function() {
			var e = qo(!1);
			return e = xs.bind(null, B, e.queue, !0, !1), jo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = B, a = jo();
			if (I) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Bl === null) throw Error(i(349));
				q & 127 || Ho(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, cs(Wo.bind(null, r, o, e), [e]), r.flags |= 2048, is(9, { destroy: void 0 }, Uo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = jo(), t = Bl.identifierPrefix;
			if (I) {
				var n = Ai, r = ki;
				n = (r & ~(1 << 32 - Ve(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = vo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = xo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Es,
		useFormState: es,
		useActionState: es,
		useOptimistic: function(e) {
			var t = jo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ns.bind(null, B, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Io,
		useCacheRefresh: function() {
			return jo().memoizedState = ks.bind(null, B);
		},
		useEffectEvent: function(e) {
			var t = jo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (G & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, zs = {
		readContext: ia,
		use: Fo,
		useCallback: _s,
		useContext: ia,
		useEffect: ls,
		useImperativeHandle: hs,
		useInsertionEffect: fs,
		useLayoutEffect: ps,
		useMemo: vs,
		useReducer: Ro,
		useRef: as,
		useState: function() {
			return Ro(Lo);
		},
		useDebugValue: gs,
		useDeferredValue: function(e, t) {
			return bs(Mo(), V.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ro(Lo)[0], t = Mo().memoizedState;
			return [typeof e == "boolean" ? e : Po(e), t];
		},
		useSyncExternalStore: Vo,
		useId: Ds,
		useHostTransitionStatus: Es,
		useFormState: ts,
		useActionState: ts,
		useOptimistic: function(e, t) {
			return Jo(Mo(), V, e, t);
		},
		useMemoCache: Io,
		useCacheRefresh: Os
	};
	zs.useEffectEvent = ds;
	var Bs = {
		readContext: ia,
		use: Fo,
		useCallback: _s,
		useContext: ia,
		useEffect: ls,
		useImperativeHandle: hs,
		useInsertionEffect: fs,
		useLayoutEffect: ps,
		useMemo: vs,
		useReducer: Bo,
		useRef: as,
		useState: function() {
			return Bo(Lo);
		},
		useDebugValue: gs,
		useDeferredValue: function(e, t) {
			var n = Mo();
			return V === null ? ys(n, e, t) : bs(n, V.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Bo(Lo)[0], t = Mo().memoizedState;
			return [typeof e == "boolean" ? e : Po(e), t];
		},
		useSyncExternalStore: Vo,
		useId: Ds,
		useHostTransitionStatus: Es,
		useFormState: rs,
		useActionState: rs,
		useOptimistic: function(e, t) {
			var n = Mo();
			return V === null ? (n.baseState = e, [e, n.queue.dispatch]) : Jo(n, V, e, t);
		},
		useMemoCache: Io,
		useCacheRefresh: Os
	};
	Bs.useEffectEvent = ds;
	function Vs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : f({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Hs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = hu(), i = Ua(r);
			i.payload = t, n != null && (i.callback = n), t = Wa(e, i, r), t !== null && (_u(t, e, r), Ga(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = hu(), i = Ua(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Wa(e, i, r), t !== null && (_u(t, e, r), Ga(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = hu(), r = Ua(n);
			r.tag = 2, t != null && (r.callback = t), t = Wa(e, r, n), t !== null && (_u(t, e, n), Ga(t, e, n));
		}
	};
	function Us(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Er(n, r) || !Er(i, a) : !0;
	}
	function Ws(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Hs.enqueueReplaceState(t, t.state, null);
	}
	function Gs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = f({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Ks(e) {
		$r(e);
	}
	function qs(e) {
		console.error(e);
	}
	function Js(e) {
		$r(e);
	}
	function Ys(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Xs(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Zs(e, t, n) {
		return n = Ua(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Ys(e, t);
		}, n;
	}
	function Qs(e) {
		return e = Ua(e), e.tag = 3, e;
	}
	function $s(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Xs(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Xs(t, n, r), typeof i != "function" && (au === null ? au = /* @__PURE__ */ new Set([this]) : au.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function ec(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ta(t, n, a, !0), n = ro.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return io === null ? ku() : n.alternate === null && Kl === 0 && (Kl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Ta ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), qu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Ta ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), qu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return qu(e, r, a), ku(), !1;
		}
		if (I) return t = ro.current, t === null ? (r !== Bi && (t = Error(i(423), { cause: r }), qi(xi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = xi(r, n), a = Zs(e.stateNode, r, a), Ka(e, a), Kl !== 4 && (Kl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Bi && (e = Error(i(422), { cause: r }), qi(xi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = xi(o, n), Ql === null ? Ql = [o] : Ql.push(o), Kl !== 4 && (Kl = 2), t === null) return !0;
		r = xi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Zs(n.stateNode, r, e), Ka(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (au === null || !au.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Qs(a), $s(a, e, n, r), Ka(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var tc = Error(i(461)), nc = !1;
	function rc(e, t, n, r) {
		t.child = e === null ? za(t, null, n, r) : Ra(t, e.child, n, r);
	}
	function ic(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return ra(t), r = wo(e, t, n, o, a, i), s = Oo(), e !== null && !nc ? (ko(e, t, i), Oc(e, t, i)) : (I && s && Ni(t), t.flags |= 1, rc(e, t, r, i), t.child);
	}
	function ac(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !fi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, oc(e, t, a, r, i)) : (e = hi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !kc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Er : n, n(o, r) && e.ref === t.ref) return Oc(e, t, i);
		}
		return t.flags |= 1, e = pi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function oc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Er(a, r) && e.ref === t.ref) if (nc = !1, t.pendingProps = r = a, kc(e, i)) e.flags & 131072 && (nc = !0);
			else return t.lanes = e.lanes, Oc(e, t, i);
		}
		return mc(e, t, n, r, i);
	}
	function sc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return lc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && ba(t, a === null ? null : a.cachePool), a === null ? to() : eo(t, a), so(t);
			else return r = t.lanes = 536870912, lc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && ba(t, null), to(), co(t)) : (ba(t, a.cachePool), eo(t, a), co(t), t.memoizedState = null);
		return rc(e, t, i, n), t.child;
	}
	function cc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function lc(e, t, n, r, i) {
		var a = ya();
		return a = a === null ? null : {
			parent: L._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && ba(t, null), to(), so(t), e !== null && ta(e, t, r, !0), t.childLanes = i, null;
	}
	function uc(e, t) {
		return t = Cc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function dc(e, t, n) {
		return Ra(t, e.child, null, n), e = uc(t, t.pendingProps), e.flags |= 2, lo(t), t.memoizedState = null, e;
	}
	function fc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (I) {
				if (r.mode === "hidden") return e = uc(t, r), t.lanes = 536870912, cc(null, e);
				if (oo(t), (e = Li) ? (e = of(e, zi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Oi === null ? null : {
						id: ki,
						overflow: Ai
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = vi(e), n.return = t, t.child = n, Ii = t, Li = null)) : e = null, e === null) throw Vi(t);
				return t.lanes = 536870912, null;
			}
			return uc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (oo(t), a) if (t.flags & 256) t.flags &= -257, t = dc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (nc || ta(e, t, n, !1), a = (n & e.childLanes) !== 0, nc || a) {
				if (r = Bl, r !== null && (s = it(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, oi(e, s), _u(r, e, s), tc;
				ku(), t = dc(e, t, n);
			} else e = o.treeContext, Li = uf(s.nextSibling), Ii = t, I = !0, Ri = null, zi = !1, e !== null && Fi(t, e), t = uc(t, r), t.flags |= 4096;
			return t;
		}
		return e = pi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function pc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function mc(e, t, n, r, i) {
		return ra(t), n = wo(e, t, n, r, void 0, i), r = Oo(), e !== null && !nc ? (ko(e, t, i), Oc(e, t, i)) : (I && r && Ni(t), t.flags |= 1, rc(e, t, n, i), t.child);
	}
	function hc(e, t, n, r, i, a) {
		return ra(t), t.updateQueue = null, n = Eo(t, r, n, i), To(e), r = Oo(), e !== null && !nc ? (ko(e, t, a), Oc(e, t, a)) : (I && r && Ni(t), t.flags |= 1, rc(e, t, n, a), t.child);
	}
	function gc(e, t, n, r, i) {
		if (ra(t), t.stateNode === null) {
			var a = li, o = n.contextType;
			typeof o == "object" && o && (a = ia(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Hs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Va(t), o = n.contextType, a.context = typeof o == "object" && o ? ia(o) : li, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Vs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Hs.enqueueReplaceState(a, a.state, null), Ya(t, r, a, i), Ja(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Gs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = li, typeof u == "object" && u && (o = ia(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Ws(t, a, r, o), Ba = !1;
			var f = t.memoizedState;
			a.state = f, Ya(t, r, a, i), Ja(), l = t.memoizedState, s || f !== l || Ba ? (typeof d == "function" && (Vs(t, n, d, r), l = t.memoizedState), (c = Ba || Us(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ha(e, t), o = t.memoizedProps, u = Gs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = li, typeof l == "object" && l && (c = ia(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Ws(t, a, r, c), Ba = !1, f = t.memoizedState, a.state = f, Ya(t, r, a, i), Ja();
			var p = t.memoizedState;
			o !== d || f !== p || Ba || e !== null && e.dependencies !== null && na(e.dependencies) ? (typeof s == "function" && (Vs(t, n, s, r), p = t.memoizedState), (u = Ba || Us(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && na(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, pc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ra(t, e.child, null, i), t.child = Ra(t, null, n, i)) : rc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Oc(e, t, i), e;
	}
	function _c(e, t, n, r) {
		return Gi(), t.flags |= 256, rc(e, t, n, r), t.child;
	}
	var vc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function yc(e) {
		return {
			baseLanes: e,
			cachePool: xa()
		};
	}
	function bc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Xl), e;
	}
	function xc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (uo.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (I) {
				if (a ? ao(t) : co(t), (e = Li) ? (e = of(e, zi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Oi === null ? null : {
						id: ki,
						overflow: Ai
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = vi(e), n.return = t, t.child = n, Ii = t, Li = null)) : e = null, e === null) throw Vi(t);
				return cf(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (co(t), a = t.mode, c = Cc({
				mode: "hidden",
				children: c
			}, a), r = gi(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = yc(n), r.childLanes = bc(e, s, n), t.memoizedState = vc, cc(null, r)) : (ao(t), Sc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (ao(t), t.flags &= -257, t = wc(e, t, n)) : t.memoizedState === null ? (co(t), c = r.fallback, a = t.mode, r = Cc({
				mode: "visible",
				children: r.children
			}, a), c = gi(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ra(t, e.child, null, n), r = t.child, r.memoizedState = yc(n), r.childLanes = bc(e, s, n), t.memoizedState = vc, t = cc(null, r)) : (co(t), t.child = e.child, t.flags |= 128, t = null);
			else if (ao(t), cf(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, qi({
					value: r,
					source: null,
					stack: null
				}), t = wc(e, t, n);
			} else if (nc || ta(e, t, n, !1), s = (n & e.childLanes) !== 0, nc || s) {
				if (s = Bl, s !== null && (r = it(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, oi(e, r), _u(s, e, r), tc;
				sf(c) || ku(), t = wc(e, t, n);
			} else sf(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Li = uf(c.nextSibling), Ii = t, I = !0, Ri = null, zi = !1, e !== null && Fi(t, e), t = Sc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (co(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = pi(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = gi(c, a, n, null), c.flags |= 2) : c = pi(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, cc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = yc(n) : (a = c.cachePool, a === null ? a = xa() : (l = L._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = bc(e, s, n), t.memoizedState = vc, cc(e.child, r)) : (ao(t), n = e.child, e = n.sibling, n = pi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Sc(e, t) {
		return t = Cc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Cc(e, t) {
		return e = di(22, e, null, t), e.lanes = 0, e;
	}
	function wc(e, t, n) {
		return Ra(t, e.child, null, n), e = Sc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Tc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), $i(e.return, t, n);
	}
	function Ec(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function Dc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = uo.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, M(uo, o), rc(e, t, r, n), r = I ? Ti : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Tc(e, n, t);
			else if (e.tag === 19) Tc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && fo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Ec(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && fo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Ec(t, !0, n, null, a, r);
				break;
			case "together":
				Ec(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Oc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), ql |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (ta(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = pi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = pi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function kc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && na(e))) : !0;
	}
	function Ac(e, t, n) {
		switch (t.tag) {
			case 3:
				pe(t, t.stateNode.containerInfo), Zi(t, L, e.memoizedState.cache), Gi();
				break;
			case 27:
			case 5:
				_e(t);
				break;
			case 4:
				pe(t, t.stateNode.containerInfo);
				break;
			case 10:
				Zi(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, oo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (ao(t), e = Oc(e, t, n), e === null ? null : e.sibling) : xc(e, t, n) : (ao(t), t.flags |= 128, null);
				ao(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (ta(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Dc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), M(uo, uo.current), r) break;
				return null;
			case 22: return t.lanes = 0, sc(e, t, n, t.pendingProps);
			case 24: Zi(t, L, e.memoizedState.cache);
		}
		return Oc(e, t, n);
	}
	function jc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) nc = !0;
		else {
			if (!kc(e, n) && !(t.flags & 128)) return nc = !1, Ac(e, t, n);
			nc = !!(e.flags & 131072);
		}
		else nc = !1, I && t.flags & 1048576 && Mi(t, Ti, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Oa(t.elementType), t.type = e, typeof e == "function") fi(e) ? (r = Gs(e, r), t.tag = 1, t = gc(null, t, e, r, n)) : (t.tag = 0, t = mc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === x) {
								t.tag = 11, t = ic(null, t, e, r, n);
								break a;
							} else if (a === w) {
								t.tag = 14, t = ac(null, t, e, r, n);
								break a;
							}
						}
						throw t = te(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return mc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Gs(r, t.pendingProps), gc(e, t, r, a, n);
			case 3:
				a: {
					if (pe(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Ha(e, t), Ya(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Zi(t, L, r), r !== o.cache && ea(t, [L], n, !0), Ja(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = _c(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = xi(Error(i(424)), t), qi(a), t = _c(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Li = uf(e.firstChild), Ii = t, I = !0, Ri = null, zi = !0, n = za(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Gi(), r === a) {
							t = Oc(e, t, n);
							break a;
						}
						rc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return pc(e, t), e === null ? (n = jf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : I || (n = t.type, e = t.pendingProps, r = Hd(ue.current).createElement(n), r[ut] = t, r[dt] = e, Id(r, n, e), Ct(r), t.stateNode = r) : t.memoizedState = jf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return _e(t), e === null && I && (r = t.stateNode = mf(t.type, t.pendingProps, ue.current), Ii = t, zi = !0, a = Li, $d(t.type) ? (df = a, Li = uf(r.firstChild)) : Li = a), rc(e, t, t.pendingProps.children, n), pc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && I && ((a = r = Li) && (r = rf(r, t.type, t.pendingProps, zi), r === null ? a = !1 : (t.stateNode = r, Ii = t, Li = uf(r.firstChild), zi = !1, a = !0)), a || Vi(t)), _e(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Gd(a, o) ? r = null : s !== null && Gd(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = wo(e, t, Do, null, null, n), ep._currentValue = a), pc(e, t), rc(e, t, r, n), t.child;
			case 6: return e === null && I && ((e = n = Li) && (n = af(n, t.pendingProps, zi), n === null ? e = !1 : (t.stateNode = n, Ii = t, Li = null, e = !0)), e || Vi(t)), null;
			case 13: return xc(e, t, n);
			case 4: return pe(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ra(t, null, r, n) : rc(e, t, r, n), t.child;
			case 11: return ic(e, t, t.type, t.pendingProps, n);
			case 7: return rc(e, t, t.pendingProps, n), t.child;
			case 8: return rc(e, t, t.pendingProps.children, n), t.child;
			case 12: return rc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Zi(t, t.type, r.value), rc(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, ra(t), a = ia(a), r = r(a), t.flags |= 1, rc(e, t, r, n), t.child;
			case 14: return ac(e, t, t.type, t.pendingProps, n);
			case 15: return oc(e, t, t.type, t.pendingProps, n);
			case 19: return Dc(e, t, n);
			case 31: return fc(e, t, n);
			case 22: return sc(e, t, n, t.pendingProps);
			case 24: return ra(t), r = ia(L), e === null ? (a = ya(), a === null && (a = Bl, o = ua(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Va(t), Zi(t, L, a)) : ((e.lanes & n) !== 0 && (Ha(e, t), Ya(t, null, null, n), Ja()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Zi(t, L, r), r !== a.cache && ea(t, [L], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Zi(t, L, r))), rc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Mc(e) {
		e.flags |= 4;
	}
	function Nc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Eu()) e.flags |= 8192;
			else throw ka = Ta, Ca;
		} else e.flags &= -16777217;
	}
	function Pc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Kf(t)) if (Eu()) e.flags |= 8192;
		else throw ka = Ta, Ca;
	}
	function Fc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Qe(), e.lanes |= t, Zl |= t);
	}
	function Ic(e, t) {
		if (!I) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function Lc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Rc(e, t, n) {
		var r = t.pendingProps;
		switch (Pi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Lc(t), null;
			case 1: return Lc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Qi(L), he(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Wi(t) ? Mc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ki())), Lc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Mc(t), o === null ? (Lc(t), Nc(t, a, null, r, n)) : (Lc(t), Pc(t, o))) : o ? o === e.memoizedState ? (Lc(t), t.flags &= -16777217) : (Mc(t), Lc(t), Pc(t, o)) : (e = e.memoizedProps, e !== r && Mc(t), Lc(t), Nc(t, a, e, r, n)), null;
			case 27:
				if (ve(t), n = ue.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Mc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Lc(t), null;
					}
					e = ce.current, Wi(t) ? Hi(t, e) : (e = mf(a, r, n), t.stateNode = e, Mc(t));
				}
				return Lc(t), null;
			case 5:
				if (ve(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Mc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Lc(t), null;
					}
					if (o = ce.current, Wi(t)) Hi(t, o);
					else {
						var s = Hd(ue.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[ut] = t, o[dt] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Id(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Mc(t);
					}
				}
				return Lc(t), Nc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Mc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = ue.current, Wi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Ii, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[ut] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Nd(e.nodeValue, n)), e || Vi(t, !0);
					} else e = Hd(e).createTextNode(r), e[ut] = t, t.stateNode = e;
				}
				return Lc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Wi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[ut] = t;
						} else Gi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Lc(t), e = !1;
					} else n = Ki(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (lo(t), t) : (lo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Lc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Wi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[ut] = t;
						} else Gi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Lc(t), a = !1;
					} else a = Ki(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (lo(t), t) : (lo(t), null);
				}
				return lo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Fc(t, t.updateQueue), Lc(t), null);
			case 4: return he(), e === null && Cd(t.stateNode.containerInfo), Lc(t), null;
			case 10: return Qi(t.type), Lc(t), null;
			case 19:
				if (se(uo), r = t.memoizedState, r === null) return Lc(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Ic(r, !1);
				else {
					if (Kl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = fo(e), o !== null) {
							for (t.flags |= 128, Ic(r, !1), e = o.updateQueue, t.updateQueue = e, Fc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) mi(n, e), n = n.sibling;
							return M(uo, uo.current & 1 | 2), I && ji(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && ke() > ru && (t.flags |= 128, a = !0, Ic(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = fo(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Fc(t, e), Ic(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !I) return Lc(t), null;
					} else 2 * ke() - r.renderingStartTime > ru && n !== 536870912 && (t.flags |= 128, a = !0, Ic(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Lc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = ke(), e.sibling = null, n = uo.current, M(uo, a ? n & 1 | 2 : n & 1), I && ji(t, r.treeForkCount), e);
			case 22:
			case 23: return lo(t), no(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Lc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Lc(t), n = t.updateQueue, n !== null && Fc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && se(va), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Qi(L), Lc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function zc(e, t) {
		switch (Pi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Qi(L), he(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return ve(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (lo(t), t.alternate === null) throw Error(i(340));
					Gi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (lo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Gi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return se(uo), null;
			case 4: return he(), null;
			case 10: return Qi(t.type), null;
			case 22:
			case 23: return lo(t), no(), e !== null && se(va), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Qi(L), null;
			case 25: return null;
			default: return null;
		}
	}
	function Bc(e, t) {
		switch (Pi(t), t.tag) {
			case 3:
				Qi(L), he();
				break;
			case 26:
			case 27:
			case 5:
				ve(t);
				break;
			case 4:
				he();
				break;
			case 31:
				t.memoizedState !== null && lo(t);
				break;
			case 13:
				lo(t);
				break;
			case 19:
				se(uo);
				break;
			case 10:
				Qi(t.type);
				break;
			case 22:
			case 23:
				lo(t), no(), e !== null && se(va);
				break;
			case 24: Qi(L);
		}
	}
	function Vc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Y(t, t.return, e);
		}
	}
	function Hc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Y(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Y(t, t.return, e);
		}
	}
	function Uc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Za(t, n);
			} catch (t) {
				Y(e, e.return, t);
			}
		}
	}
	function Wc(e, t, n) {
		n.props = Gs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Y(e, t, n);
		}
	}
	function Gc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Y(e, t, n);
		}
	}
	function Kc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Y(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Y(e, t, n);
		}
		else n.current = null;
	}
	function qc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Y(e, e.return, t);
		}
	}
	function Jc(e, t, n) {
		try {
			var r = e.stateNode;
			Ld(r, e.type, n, t), r[dt] = t;
		} catch (t) {
			Y(e, e.return, t);
		}
	}
	function Yc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && $d(e.type) || e.tag === 4;
	}
	function Xc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Yc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && $d(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Zc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = nn));
		else if (r !== 4 && (r === 27 && $d(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Zc(e, t, n), e = e.sibling; e !== null;) Zc(e, t, n), e = e.sibling;
	}
	function Qc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && $d(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Qc(e, t, n), e = e.sibling; e !== null;) Qc(e, t, n), e = e.sibling;
	}
	function $c(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Id(t, r, n), t[ut] = e, t[dt] = n;
		} catch (t) {
			Y(e, e.return, t);
		}
	}
	var el = !1, tl = !1, nl = !1, rl = typeof WeakSet == "function" ? WeakSet : Set, il = null;
	function al(e, t) {
		if (e = e.containerInfo, Bd = lp, e = Ar(e), jr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (Vd = {
			focusedElem: e,
			selectionRange: n
		}, lp = !1, il = t; il !== null;) if (t = il, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, il = e;
		else for (; il !== null;) {
			switch (t = il, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Gs(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Y(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) nf(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								nf(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, il = e;
				break;
			}
			il = t.return;
		}
	}
	function ol(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				xl(e, n), r & 4 && Vc(5, n);
				break;
			case 1:
				if (xl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Y(n, n.return, e);
				}
				else {
					var i = Gs(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Y(n, n.return, e);
					}
				}
				r & 64 && Uc(n), r & 512 && Gc(n, n.return);
				break;
			case 3:
				if (xl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Za(e, t);
					} catch (e) {
						Y(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && $c(n);
			case 26:
			case 5:
				xl(e, n), t === null && r & 4 && qc(n), r & 512 && Gc(n, n.return);
				break;
			case 12:
				xl(e, n);
				break;
			case 31:
				xl(e, n), r & 4 && fl(e, n);
				break;
			case 13:
				xl(e, n), r & 4 && pl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Xu.bind(null, n), lf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || el, !r) {
					t = t !== null && t.memoizedState !== null || tl, i = el;
					var a = tl;
					el = r, (tl = t) && !a ? Cl(e, n, (n.subtreeFlags & 8772) != 0) : xl(e, n), el = i, tl = a;
				}
				break;
			case 30: break;
			default: xl(e, n);
		}
	}
	function sl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, sl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && vt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var cl = null, ll = !1;
	function ul(e, t, n) {
		for (n = n.child; n !== null;) dl(e, t, n), n = n.sibling;
	}
	function dl(e, t, n) {
		if (ze && typeof ze.onCommitFiberUnmount == "function") try {
			ze.onCommitFiberUnmount(Re, n);
		} catch {}
		switch (n.tag) {
			case 26:
				tl || Kc(n, t), ul(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				tl || Kc(n, t);
				var r = cl, i = ll;
				$d(n.type) && (cl = n.stateNode, ll = !1), ul(e, t, n), hf(n.stateNode), cl = r, ll = i;
				break;
			case 5: tl || Kc(n, t);
			case 6:
				if (r = cl, i = ll, cl = null, ul(e, t, n), cl = r, ll = i, cl !== null) if (ll) try {
					(cl.nodeType === 9 ? cl.body : cl.nodeName === "HTML" ? cl.ownerDocument.body : cl).removeChild(n.stateNode);
				} catch (e) {
					Y(n, t, e);
				}
				else try {
					cl.removeChild(n.stateNode);
				} catch (e) {
					Y(n, t, e);
				}
				break;
			case 18:
				cl !== null && (ll ? (e = cl, ef(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Fp(e)) : ef(cl, n.stateNode));
				break;
			case 4:
				r = cl, i = ll, cl = n.stateNode.containerInfo, ll = !0, ul(e, t, n), cl = r, ll = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Hc(2, n, t), tl || Hc(4, n, t), ul(e, t, n);
				break;
			case 1:
				tl || (Kc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Wc(n, t, r)), ul(e, t, n);
				break;
			case 21:
				ul(e, t, n);
				break;
			case 22:
				tl = (r = tl) || n.memoizedState !== null, ul(e, t, n), tl = r;
				break;
			default: ul(e, t, n);
		}
	}
	function fl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Fp(e);
			} catch (e) {
				Y(t, t.return, e);
			}
		}
	}
	function pl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Fp(e);
		} catch (e) {
			Y(t, t.return, e);
		}
	}
	function ml(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new rl()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new rl()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function hl(e, t) {
		var n = ml(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Zu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function gl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if ($d(c.type)) {
							cl = c.stateNode, ll = !1;
							break a;
						}
						break;
					case 5:
						cl = c.stateNode, ll = !1;
						break a;
					case 3:
					case 4:
						cl = c.stateNode.containerInfo, ll = !0;
						break a;
				}
				c = c.return;
			}
			if (cl === null) throw Error(i(160));
			dl(o, s, a), cl = null, ll = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) vl(t, e), t = t.sibling;
	}
	var _l = null;
	function vl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				gl(t, e), yl(e), r & 4 && (Hc(3, e, e.return), Vc(3, e), Hc(5, e, e.return));
				break;
			case 1:
				gl(t, e), yl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 64 && el && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = _l;
				if (gl(t, e), yl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[_t] || o[ut] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Id(o, r, n), o[ut] = e, Ct(o), r = o;
									break a;
								case "link":
									var s = Uf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Id(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Uf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Id(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[ut] = e, Ct(o), r = o;
						}
						e.stateNode = r;
					} else Wf(a, e.type, e.stateNode);
					else e.stateNode = Rf(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Jc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Wf(a, e.type, e.stateNode) : Rf(a, r, e.memoizedProps));
				}
				break;
			case 27:
				gl(t, e), yl(e), r & 512 && (tl || n === null || Kc(n, n.return)), n !== null && r & 4 && Jc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (gl(t, e), yl(e), r & 512 && (tl || n === null || Kc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Yt(a, "");
					} catch (t) {
						Y(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Jc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (nl = !0);
				break;
			case 6:
				if (gl(t, e), yl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Y(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Hf = null, a = _l, _l = vf(t.containerInfo), gl(t, e), _l = a, yl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Fp(t.containerInfo);
				} catch (t) {
					Y(e, e.return, t);
				}
				nl && (nl = !1, bl(e));
				break;
			case 4:
				r = _l, _l = vf(e.stateNode.containerInfo), gl(t, e), yl(e), _l = r;
				break;
			case 12:
				gl(t, e), yl(e);
				break;
			case 31:
				gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 13:
				gl(t, e), yl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (tu = ke()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = el, d = tl;
				if (el = u || a, tl = d || l, gl(t, e), tl = d, el = u, yl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || el || tl || Sl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Y(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Y(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? tf(m, !0) : tf(l.stateNode, !1);
							} catch (e) {
								Y(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, hl(e, n))));
				break;
			case 19:
				gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: gl(t, e), yl(e);
		}
	}
	function yl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Yc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Qc(e, Xc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Yt(o, ""), n.flags &= -33), Qc(e, Xc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Zc(e, Xc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Y(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function bl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			bl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function xl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) ol(e, t.alternate, t), t = t.sibling;
	}
	function Sl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Hc(4, t, t.return), Sl(t);
					break;
				case 1:
					Kc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Wc(t, t.return, n), Sl(t);
					break;
				case 27: hf(t.stateNode);
				case 26:
				case 5:
					Kc(t, t.return), Sl(t);
					break;
				case 22:
					t.memoizedState === null && Sl(t);
					break;
				case 30:
					Sl(t);
					break;
				default: Sl(t);
			}
			e = e.sibling;
		}
	}
	function Cl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Cl(i, a, n), Vc(4, a);
					break;
				case 1:
					if (Cl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Y(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Xa(c[i], s);
						} catch (e) {
							Y(r, r.return, e);
						}
					}
					n && o & 64 && Uc(a), Gc(a, a.return);
					break;
				case 27: $c(a);
				case 26:
				case 5:
					Cl(i, a, n), n && r === null && o & 4 && qc(a), Gc(a, a.return);
					break;
				case 12:
					Cl(i, a, n);
					break;
				case 31:
					Cl(i, a, n), n && o & 4 && fl(i, a);
					break;
				case 13:
					Cl(i, a, n), n && o & 4 && pl(i, a);
					break;
				case 22:
					a.memoizedState === null && Cl(i, a, n), Gc(a, a.return);
					break;
				case 30: break;
				default: Cl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function wl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && da(n));
	}
	function Tl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && da(e));
	}
	function El(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Dl(e, t, n, r), t = t.sibling;
	}
	function Dl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				El(e, t, n, r), i & 2048 && Vc(9, t);
				break;
			case 1:
				El(e, t, n, r);
				break;
			case 3:
				El(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && da(e)));
				break;
			case 12:
				if (i & 2048) {
					El(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Y(t, t.return, e);
					}
				} else El(e, t, n, r);
				break;
			case 31:
				El(e, t, n, r);
				break;
			case 13:
				El(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? El(e, t, n, r) : (a._visibility |= 2, Ol(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? El(e, t, n, r) : kl(e, t), i & 2048 && wl(o, t);
				break;
			case 24:
				El(e, t, n, r), i & 2048 && Tl(t.alternate, t);
				break;
			default: El(e, t, n, r);
		}
	}
	function Ol(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Ol(a, o, s, c, i), Vc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Ol(a, o, s, c, i)) : u._visibility & 2 ? Ol(a, o, s, c, i) : kl(a, o), i && l & 2048 && wl(o.alternate, o);
					break;
				case 24:
					Ol(a, o, s, c, i), i && l & 2048 && Tl(o.alternate, o);
					break;
				default: Ol(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function kl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					kl(n, r), i & 2048 && wl(r.alternate, r);
					break;
				case 24:
					kl(n, r), i & 2048 && Tl(r.alternate, r);
					break;
				default: kl(n, r);
			}
			t = t.sibling;
		}
	}
	var Al = 8192;
	function jl(e, t, n) {
		if (e.subtreeFlags & Al) for (e = e.child; e !== null;) Ml(e, t, n), e = e.sibling;
	}
	function Ml(e, t, n) {
		switch (e.tag) {
			case 26:
				jl(e, t, n), e.flags & Al && e.memoizedState !== null && qf(n, _l, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				jl(e, t, n);
				break;
			case 3:
			case 4:
				var r = _l;
				_l = vf(e.stateNode.containerInfo), jl(e, t, n), _l = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Al, Al = 16777216, jl(e, t, n), Al = r) : jl(e, t, n));
				break;
			default: jl(e, t, n);
		}
	}
	function Nl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Pl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				il = r, Ll(r, e);
			}
			Nl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Fl(e), e = e.sibling;
	}
	function Fl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Pl(e), e.flags & 2048 && Hc(9, e, e.return);
				break;
			case 3:
				Pl(e);
				break;
			case 12:
				Pl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Il(e)) : Pl(e);
				break;
			default: Pl(e);
		}
	}
	function Il(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				il = r, Ll(r, e);
			}
			Nl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Hc(8, t, t.return), Il(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Il(t));
					break;
				default: Il(t);
			}
			e = e.sibling;
		}
	}
	function Ll(e, t) {
		for (; il !== null;) {
			var n = il;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Hc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: da(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, il = r;
			else a: for (n = e; il !== null;) {
				r = il;
				var i = r.sibling, a = r.return;
				if (sl(r), r === n) {
					il = null;
					break a;
				}
				if (i !== null) {
					i.return = a, il = i;
					break a;
				}
				il = a;
			}
		}
	}
	var Rl = {
		getCacheForType: function(e) {
			var t = ia(L), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return ia(L).controller.signal;
		}
	}, zl = typeof WeakMap == "function" ? WeakMap : Map, G = 0, Bl = null, K = null, q = 0, J = 0, Vl = null, Hl = !1, Ul = !1, Wl = !1, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = 0, Zl = 0, Ql = null, $l = null, eu = !1, tu = 0, nu = 0, ru = Infinity, iu = null, au = null, ou = 0, su = null, cu = null, lu = 0, uu = 0, du = null, fu = null, pu = 0, mu = null;
	function hu() {
		return G & 2 && q !== 0 ? q & -q : A.T === null ? st() : pd();
	}
	function gu() {
		if (Xl === 0) if (!(q & 536870912) || I) {
			var e = Ke;
			Ke <<= 1, !(Ke & 3932160) && (Ke = 262144), Xl = e;
		} else Xl = 536870912;
		return e = ro.current, e !== null && (e.flags |= 32), Xl;
	}
	function _u(e, t, n) {
		(e === Bl && (J === 2 || J === 9) || e.cancelPendingCommit !== null) && (wu(e, 0), xu(e, q, Xl, !1)), et(e, n), (!(G & 2) || e !== Bl) && (e === Bl && (!(G & 2) && (Jl |= n), Kl === 4 && xu(e, q, Xl, !1)), ad(e));
	}
	function vu(e, t, n) {
		if (G & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Xe(e, t), a = r ? Mu(e, t) : Au(e, t, !0), o = r;
		do {
			if (a === 0) {
				Ul && !r && xu(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !bu(n)) {
					a = Au(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Ql;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (wu(c, s).flags |= 256), s = Au(c, s, !1), s !== 2) {
								if (Wl && !l) {
									c.errorRecoveryDisabledLanes |= o, Jl |= o, a = 4;
									break a;
								}
								o = $l, $l = a, o !== null && ($l === null ? $l = o : $l.push.apply($l, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					wu(e, 0), xu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							xu(r, t, Xl, !Hl);
							break a;
						case 2:
							$l = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = tu + 300 - ke(), 10 < a)) {
						if (xu(r, t, Xl, !Hl), Ye(r, 0, !0) !== 0) break a;
						lu = t, r.timeoutHandle = Jd(yu.bind(null, r, n, $l, iu, eu, t, Xl, Jl, Zl, Hl, o, "Throttled", -0, 0), a);
						break a;
					}
					yu(r, n, $l, iu, eu, t, Xl, Jl, Zl, Hl, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		ad(e);
	}
	function yu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: nn
			}, Ml(t, a, d);
			var m = (a & 62914560) === a ? tu - ke() : (a & 4194048) === a ? nu - ke() : 0;
			if (m = Yf(d, m), m !== null) {
				lu = a, e.cancelPendingCommit = m(zu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), xu(e, a, o, !l);
				return;
			}
		}
		zu(e, t, a, n, r, i, o, s, c);
	}
	function bu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Tr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function xu(e, t, n, r) {
		t &= ~Yl, t &= ~Jl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Ve(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && nt(e, n, t);
	}
	function Su() {
		return G & 6 ? !0 : (od(0, !1), !1);
	}
	function Cu() {
		if (K !== null) {
			if (J === 0) var e = K.return;
			else e = K, Xi = Yi = null, Ao(e), Ma = null, Na = 0, e = K;
			for (; e !== null;) Bc(e.alternate, e), e = e.return;
			K = null;
		}
	}
	function wu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, Yd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), lu = 0, Cu(), Bl = e, K = n = pi(e.current, null), q = t, J = 0, Vl = null, Hl = !1, Ul = Xe(e, t), Wl = !1, Zl = Xl = Yl = Jl = ql = Kl = 0, $l = Ql = null, eu = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Ve(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Gl = t, ri(), n;
	}
	function Tu(e, t) {
		B = null, A.H = Ls, t === Sa || t === wa ? (t = Aa(), J = 3) : t === Ca ? (t = Aa(), J = 4) : J = t === tc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Vl = t, K === null && (Kl = 1, Ys(e, xi(t, e.current)));
	}
	function Eu() {
		var e = ro.current;
		return e === null ? !0 : (q & 4194048) === q ? io === null : (q & 62914560) === q || q & 536870912 ? e === io : !1;
	}
	function Du() {
		var e = A.H;
		return A.H = Ls, e === null ? Ls : e;
	}
	function Ou() {
		var e = A.A;
		return A.A = Rl, e;
	}
	function ku() {
		Kl = 4, Hl || (q & 4194048) !== q && ro.current !== null || (Ul = !0), !(ql & 134217727) && !(Jl & 134217727) || Bl === null || xu(Bl, q, Xl, !1);
	}
	function Au(e, t, n) {
		var r = G;
		G |= 2;
		var i = Du(), a = Ou();
		(Bl !== e || q !== t) && (iu = null, wu(e, t)), t = !1;
		var o = Kl;
		a: do
			try {
				if (J !== 0 && K !== null) {
					var s = K, c = Vl;
					switch (J) {
						case 8:
							Cu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							ro.current === null && (t = !0);
							var l = J;
							if (J = 0, Vl = null, Iu(e, s, c, l), n && Ul) {
								o = 0;
								break a;
							}
							break;
						default: l = J, J = 0, Vl = null, Iu(e, s, c, l);
					}
				}
				ju(), o = Kl;
				break;
			} catch (t) {
				Tu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Xi = Yi = null, G = r, A.H = i, A.A = a, K === null && (Bl = null, q = 0, ri()), o;
	}
	function ju() {
		for (; K !== null;) Pu(K);
	}
	function Mu(e, t) {
		var n = G;
		G |= 2;
		var r = Du(), a = Ou();
		Bl !== e || q !== t ? (iu = null, ru = ke() + 500, wu(e, t)) : Ul = Xe(e, t);
		a: do
			try {
				if (J !== 0 && K !== null) {
					t = K;
					var o = Vl;
					b: switch (J) {
						case 1:
							J = 0, Vl = null, Iu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Ea(o)) {
								J = 0, Vl = null, Fu(t);
								break;
							}
							t = function() {
								J !== 2 && J !== 9 || Bl !== e || (J = 7), ad(e);
							}, o.then(t, t);
							break a;
						case 3:
							J = 7;
							break a;
						case 4:
							J = 5;
							break a;
						case 7:
							Ea(o) ? (J = 0, Vl = null, Fu(t)) : (J = 0, Vl = null, Iu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (K.tag) {
								case 26: s = K.memoizedState;
								case 5:
								case 27:
									var c = K;
									if (s ? Kf(s) : c.stateNode.complete) {
										J = 0, Vl = null;
										var l = c.sibling;
										if (l !== null) K = l;
										else {
											var u = c.return;
											u === null ? K = null : (K = u, Lu(u));
										}
										break b;
									}
							}
							J = 0, Vl = null, Iu(e, t, o, 5);
							break;
						case 6:
							J = 0, Vl = null, Iu(e, t, o, 6);
							break;
						case 8:
							Cu(), Kl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Nu();
				break;
			} catch (t) {
				Tu(e, t);
			}
		while (1);
		return Xi = Yi = null, A.H = r, A.A = a, G = n, K === null ? (Bl = null, q = 0, ri(), Kl) : 0;
	}
	function Nu() {
		for (; K !== null && !De();) Pu(K);
	}
	function Pu(e) {
		var t = jc(e.alternate, e, Gl);
		e.memoizedProps = e.pendingProps, t === null ? Lu(e) : K = t;
	}
	function Fu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = hc(n, t, t.pendingProps, t.type, void 0, q);
				break;
			case 11:
				t = hc(n, t, t.pendingProps, t.type.render, t.ref, q);
				break;
			case 5: Ao(t);
			default: Bc(n, t), t = K = mi(t, Gl), t = jc(n, t, Gl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Lu(e) : K = t;
	}
	function Iu(e, t, n, r) {
		Xi = Yi = null, Ao(t), Ma = null, Na = 0;
		var i = t.return;
		try {
			if (ec(e, i, t, n, q)) {
				Kl = 1, Ys(e, xi(n, e.current)), K = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw K = i, t;
			Kl = 1, Ys(e, xi(n, e.current)), K = null;
			return;
		}
		t.flags & 32768 ? (I || r === 1 ? e = !0 : Ul || q & 536870912 ? e = !1 : (Hl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = ro.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Ru(t, e)) : Lu(t);
	}
	function Lu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Ru(t, Hl);
				return;
			}
			e = t.return;
			var n = Rc(t.alternate, t, Gl);
			if (n !== null) {
				K = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				K = t;
				return;
			}
			K = t = e;
		} while (t !== null);
		Kl === 0 && (Kl = 5);
	}
	function Ru(e, t) {
		do {
			var n = zc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, K = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				K = e;
				return;
			}
			K = e = n;
		} while (e !== null);
		Kl = 6, K = null;
	}
	function zu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Wu();
		while (ou !== 0);
		if (G & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= ni, tt(e, n, o, s, c, l), e === Bl && (K = Bl = null, q = 0), cu = t, su = e, lu = n, uu = o, du = a, fu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Qu(Ne, function() {
				return Gu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = A.T, A.T = null, a = j.p, j.p = 2, s = G, G |= 4;
				try {
					al(e, t, n);
				} finally {
					G = s, j.p = a, A.T = r;
				}
			}
			ou = 1, Bu(), Vu(), Hu();
		}
	}
	function Bu() {
		if (ou === 1) {
			ou = 0;
			var e = su, t = cu, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = A.T, A.T = null;
				var r = j.p;
				j.p = 2;
				var i = G;
				G |= 4;
				try {
					vl(t, e);
					var a = Vd, o = Ar(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && kr(s.ownerDocument.documentElement, s)) {
						if (c !== null && jr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Or(s, h), v = Or(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					lp = !!Bd, Vd = Bd = null;
				} finally {
					G = i, j.p = r, A.T = n;
				}
			}
			e.current = t, ou = 2;
		}
	}
	function Vu() {
		if (ou === 2) {
			ou = 0;
			var e = su, t = cu, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = A.T, A.T = null;
				var r = j.p;
				j.p = 2;
				var i = G;
				G |= 4;
				try {
					ol(e, t.alternate, t);
				} finally {
					G = i, j.p = r, A.T = n;
				}
			}
			ou = 3;
		}
	}
	function Hu() {
		if (ou === 4 || ou === 3) {
			ou = 0, Oe();
			var e = su, t = cu, n = lu, r = fu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? ou = 5 : (ou = 0, cu = su = null, Uu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (au = null), ot(n), t = t.stateNode, ze && typeof ze.onCommitFiberRoot == "function") try {
				ze.onCommitFiberRoot(Re, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = A.T, i = j.p, j.p = 2, A.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					A.T = t, j.p = i;
				}
			}
			lu & 3 && Wu(), ad(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === mu ? pu++ : (pu = 0, mu = e) : pu = 0, od(0, !1);
		}
	}
	function Uu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, da(t)));
	}
	function Wu() {
		return Bu(), Vu(), Hu(), Gu();
	}
	function Gu() {
		if (ou !== 5) return !1;
		var e = su, t = uu;
		uu = 0;
		var n = ot(lu), r = A.T, a = j.p;
		try {
			j.p = 32 > n ? 32 : n, A.T = null, n = du, du = null;
			var o = su, s = lu;
			if (ou = 0, cu = su = null, lu = 0, G & 6) throw Error(i(331));
			var c = G;
			if (G |= 4, Fl(o.current), Dl(o, o.current, s, n), G = c, od(0, !1), ze && typeof ze.onPostCommitFiberRoot == "function") try {
				ze.onPostCommitFiberRoot(Re, o);
			} catch {}
			return !0;
		} finally {
			j.p = a, A.T = r, Uu(e, t);
		}
	}
	function Ku(e, t, n) {
		t = xi(n, t), t = Zs(e.stateNode, t, 2), e = Wa(e, t, 2), e !== null && (et(e, 2), ad(e));
	}
	function Y(e, t, n) {
		if (e.tag === 3) Ku(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Ku(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (au === null || !au.has(r))) {
					e = xi(n, e), n = Qs(2), r = Wa(t, n, 2), r !== null && ($s(n, r, t, e), et(r, 2), ad(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function qu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new zl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Wl = !0, i.add(n), e = Ju.bind(null, e, t, n), t.then(e, e));
	}
	function Ju(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Bl === e && (q & n) === n && (Kl === 4 || Kl === 3 && (q & 62914560) === q && 300 > ke() - tu ? !(G & 2) && wu(e, 0) : Yl |= n, Zl === q && (Zl = 0)), ad(e);
	}
	function Yu(e, t) {
		t === 0 && (t = Qe()), e = oi(e, t), e !== null && (et(e, t), ad(e));
	}
	function Xu(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Yu(e, n);
	}
	function Zu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), Yu(e, n);
	}
	function Qu(e, t) {
		return Te(e, t);
	}
	var $u = null, ed = null, td = !1, nd = !1, rd = !1, id = 0;
	function ad(e) {
		e !== ed && e.next === null && (ed === null ? $u = ed = e : ed = ed.next = e), nd = !0, td || (td = !0, fd());
	}
	function od(e, t) {
		if (!rd && nd) {
			rd = !0;
			do
				for (var n = !1, r = $u; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Ve(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, dd(r, a));
					} else a = q, a = Ye(r, r === Bl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Xe(r, a) || (n = !0, dd(r, a));
					r = r.next;
				}
			while (n);
			rd = !1;
		}
	}
	function sd() {
		cd();
	}
	function cd() {
		nd = td = !1;
		var e = 0;
		id !== 0 && qd() && (e = id);
		for (var t = ke(), n = null, r = $u; r !== null;) {
			var i = r.next, a = ld(r, t);
			a === 0 ? (r.next = null, n === null ? $u = i : n.next = i, i === null && (ed = n)) : (n = r, (e !== 0 || a & 3) && (nd = !0)), r = i;
		}
		ou !== 0 && ou !== 5 || od(e, !1), id !== 0 && (id = 0);
	}
	function ld(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Ve(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ze(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Bl, n = q, n = Ye(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (J === 2 || J === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Ee(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Xe(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Ee(r), ot(n)) {
				case 2:
				case 8:
					n = Me;
					break;
				case 32:
					n = Ne;
					break;
				case 268435456:
					n = Fe;
					break;
				default: n = Ne;
			}
			return r = ud.bind(null, e), n = Te(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Ee(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function ud(e, t) {
		if (ou !== 0 && ou !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Wu() && e.callbackNode !== n) return null;
		var r = q;
		return r = Ye(e, e === Bl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (vu(e, r, t), ld(e, ke()), e.callbackNode != null && e.callbackNode === n ? ud.bind(null, e) : null);
	}
	function dd(e, t) {
		if (Wu()) return null;
		vu(e, t, !0);
	}
	function fd() {
		Zd(function() {
			G & 6 ? Te(je, sd) : cd();
		});
	}
	function pd() {
		if (id === 0) {
			var e = pa;
			e === 0 && (e = Ge, Ge <<= 1, !(Ge & 261888) && (Ge = 256)), id = e;
		}
		return id;
	}
	function md(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : tn("" + e);
	}
	function hd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function gd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = md((i[dt] || null).action), o = r.submitter;
			o && (t = (t = o[dt] || null) ? md(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new wn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (id !== 0) {
								var e = o ? hd(i, o) : new FormData(i);
								Cs(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? hd(i, o) : new FormData(i), Cs(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var _d = 0; _d < Zr.length; _d++) {
		var vd = Zr[_d];
		Qr(vd.toLowerCase(), "on" + (vd[0].toUpperCase() + vd.slice(1)));
	}
	Qr(Ur, "onAnimationEnd"), Qr(Wr, "onAnimationIteration"), Qr(Gr, "onAnimationStart"), Qr("dblclick", "onDoubleClick"), Qr("focusin", "onFocus"), Qr("focusout", "onBlur"), Qr(Kr, "onTransitionRun"), Qr(qr, "onTransitionStart"), Qr(Jr, "onTransitionCancel"), Qr(Yr, "onTransitionEnd"), Dt("onMouseEnter", ["mouseout", "mouseover"]), Dt("onMouseLeave", ["mouseout", "mouseover"]), Dt("onPointerEnter", ["pointerout", "pointerover"]), Dt("onPointerLeave", ["pointerout", "pointerover"]), Et("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Et("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Et("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Et("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Et("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Et("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var yd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), bd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(yd));
	function X(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						$r(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						$r(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Z(e, t) {
		var n = t[pt];
		n === void 0 && (n = t[pt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (wd(t, e, 2, !1), n.add(r));
	}
	function xd(e, t, n) {
		var r = 0;
		t && (r |= 4), wd(n, e, r, t);
	}
	var Sd = "_reactListening" + Math.random().toString(36).slice(2);
	function Cd(e) {
		if (!e[Sd]) {
			e[Sd] = !0, wt.forEach(function(t) {
				t !== "selectionchange" && (bd.has(t) || xd(t, !1, e), xd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Sd] || (t[Sd] = !0, xd("selectionchange", !1, t));
		}
	}
	function wd(e, t, n, r) {
		switch (gp(t)) {
			case 2:
				var i = up;
				break;
			case 8:
				i = dp;
				break;
			default: i = fp;
		}
		n = i.bind(null, t, n, e), i = void 0, !pn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Td(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = yt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		un(function() {
			var r = a, i = an(n), s = [];
			a: {
				var c = Xr.get(e);
				if (c !== void 0) {
					var l = wn, u = e;
					switch (e) {
						case "keypress": if (yn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Hn;
							break;
						case "focusin":
							u = "focus", l = Nn;
							break;
						case "focusout":
							u = "blur", l = Nn;
							break;
						case "beforeblur":
						case "afterblur":
							l = Nn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = jn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Mn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Wn;
							break;
						case Ur:
						case Wr:
						case Gr:
							l = Pn;
							break;
						case Yr:
							l = Gn;
							break;
						case "scroll":
						case "scrollend":
							l = En;
							break;
						case "wheel":
							l = Kn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Fn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Un;
							break;
						case "toggle":
						case "beforetoggle": l = qn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = dn(m, p), g != null && d.push(Ed(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== rn && (u = n.relatedTarget || n.fromElement) && (yt(u) || u[ft])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? yt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = jn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Un, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : xt(l), h = u == null ? c : xt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, yt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Od, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && kd(s, c, l, d, !1), u !== null && f !== null && kd(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? xt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = pr;
					else if (sr(c)) if (mr) v = Cr;
					else {
						v = xr;
						var y = br;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Qt(r.elementType) && (v = pr) : v = Sr;
					if (v &&= v(e, r)) {
						cr(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Gt(c, "number", c.value);
				}
				switch (y = r ? xt(r) : window, e) {
					case "focusin":
						(sr(y) || y.contentEditable === "true") && (Nr = y, Pr = r, Fr = null);
						break;
					case "focusout":
						Fr = Pr = Nr = null;
						break;
					case "mousedown":
						Ir = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Ir = !1, Lr(s, n, i);
						break;
					case "selectionchange": if (Mr) break;
					case "keydown":
					case "keyup": Lr(s, n, i);
				}
				var b;
				if (Yn) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else rr ? tr(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Qn && n.locale !== "ko" && (rr || x !== "onCompositionStart" ? x === "onCompositionEnd" && rr && (b = vn()) : (hn = i, gn = "value" in hn ? hn.value : hn.textContent, rr = !0)), y = Dd(r, x), 0 < y.length && (x = new In(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = nr(n), b !== null && (x.data = b)))), (b = Zn ? ir(e, n) : ar(e, n)) && (x = Dd(r, "onBeforeInput"), 0 < x.length && (y = new In("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), gd(s, e, r, n, i);
			}
			X(s, t);
		});
	}
	function Ed(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Dd(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = dn(e, n), i != null && r.unshift(Ed(e, i, a)), i = dn(e, t), i != null && r.push(Ed(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Od(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function kd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = dn(n, a), l != null && o.unshift(Ed(n, l, c))) : i || (l = dn(n, a), l != null && o.push(Ed(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Ad = /\r\n?/g, jd = /\u0000|\uFFFD/g;
	function Md(e) {
		return (typeof e == "string" ? e : "" + e).replace(Ad, "\n").replace(jd, "");
	}
	function Nd(e, t) {
		return t = Md(t), Md(e) === t;
	}
	function Pd(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Yt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Yt(e, "" + r);
				break;
			case "className":
				Nt(e, "class", r);
				break;
			case "tabIndex":
				Nt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Nt(e, n, r);
				break;
			case "style":
				F(e, r, o);
				break;
			case "data": if (t !== "object") {
				Nt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = tn("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && Pd(e, t, "name", a.name, a, null), Pd(e, t, "formEncType", a.formEncType, a, null), Pd(e, t, "formMethod", a.formMethod, a, null), Pd(e, t, "formTarget", a.formTarget, a, null)) : (Pd(e, t, "encType", a.encType, a, null), Pd(e, t, "method", a.method, a, null), Pd(e, t, "target", a.target, a, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = tn("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = nn);
				break;
			case "onScroll":
				r != null && Z("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Z("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = tn("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Z("beforetoggle", e), Z("toggle", e), Mt(e, "popover", r);
				break;
			case "xlinkActuate":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Pt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Pt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Pt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Pt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Mt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = $t.get(n) || n, Mt(e, n, r));
		}
	}
	function Fd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				F(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Yt(e, r) : (typeof r == "number" || typeof r == "bigint") && Yt(e, "" + r);
				break;
			case "onScroll":
				r != null && Z("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Z("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = nn);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!Tt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[dt] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Mt(e, n, r);
			}
		}
	}
	function Id(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Z("error", e), Z("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: Pd(e, t, o, s, n, null);
					}
				}
				a && Pd(e, t, "srcSet", n.srcSet, n, null), r && Pd(e, t, "src", n.src, n, null);
				return;
			case "input":
				Z("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: Pd(e, t, r, d, n, null);
					}
				}
				Wt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Z("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Pd(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Kt(e, !!r, n, !0) : Kt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Z("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: Pd(e, t, s, c, n, null);
				}
				Jt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Pd(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Z("beforetoggle", e), Z("toggle", e), Z("cancel", e), Z("close", e);
				break;
			case "iframe":
			case "object":
				Z("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < yd.length; r++) Z(yd[r], e);
				break;
			case "image":
				Z("error", e), Z("load", e);
				break;
			case "details":
				Z("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Z("error", e), Z("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: Pd(e, t, u, r, n, null);
				}
				return;
			default: if (Qt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Fd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Pd(e, t, c, r, n, null));
	}
	function Ld(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Pd(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && Pd(e, t, p, m, r, f);
					}
				}
				Ut(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Pd(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Pd(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Kt(e, !!n, n ? [] : "", !1) : Kt(e, !!n, t, !0)) : Kt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Pd(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && Pd(e, t, s, a, r, o);
				}
				qt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Pd(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Pd(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Pd(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Pd(e, t, u, p, r, m);
				}
				return;
			default: if (Qt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Fd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Fd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Pd(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Pd(e, t, f, p, r, m);
	}
	function Rd(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function zd() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Rd(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Rd(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Bd = null, Vd = null;
	function Hd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Ud(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Wd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Gd(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Kd = null;
	function qd() {
		var e = window.event;
		return e && e.type === "popstate" ? e === Kd ? !1 : (Kd = e, !0) : (Kd = null, !1);
	}
	var Jd = typeof setTimeout == "function" ? setTimeout : void 0, Yd = typeof clearTimeout == "function" ? clearTimeout : void 0, Xd = typeof Promise == "function" ? Promise : void 0, Zd = typeof queueMicrotask == "function" ? queueMicrotask : Xd === void 0 ? Jd : function(e) {
		return Xd.resolve(null).then(e).catch(Qd);
	};
	function Qd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function $d(e) {
		return e === "head";
	}
	function ef(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Fp(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") hf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, hf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[_t] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && hf(e.ownerDocument.body);
			n = i;
		} while (n);
		Fp(t);
	}
	function tf(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function nf(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					nf(n), vt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function rf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[_t]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = uf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function af(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = uf(e.nextSibling), e === null)) return null;
		return e;
	}
	function of(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = uf(e.nextSibling), e === null)) return null;
		return e;
	}
	function sf(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function cf(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function lf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function uf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var df = null;
	function ff(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return uf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function pf(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function mf(e, t, n) {
		switch (t = Hd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function hf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		vt(e);
	}
	var gf = /* @__PURE__ */ new Map(), _f = /* @__PURE__ */ new Set();
	function vf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var yf = j.d;
	j.d = {
		f: bf,
		r: xf,
		D: wf,
		C: Tf,
		L: Ef,
		m: Df,
		X: kf,
		S: Of,
		M: Af
	};
	function bf() {
		var e = yf.f(), t = Su();
		return e || t;
	}
	function xf(e) {
		var t = bt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Ts(t) : yf.r(e);
	}
	var Sf = typeof document > "u" ? null : document;
	function Cf(e, t, n) {
		var r = Sf;
		if (r && typeof t == "string" && t) {
			var i = Ht(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), _f.has(i) || (_f.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Id(t, "link", e), Ct(t), r.head.appendChild(t)));
		}
	}
	function wf(e) {
		yf.D(e), Cf("dns-prefetch", e, null);
	}
	function Tf(e, t) {
		yf.C(e, t), Cf("preconnect", e, t);
	}
	function Ef(e, t, n) {
		yf.L(e, t, n);
		var r = Sf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Ht(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Ht(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Ht(n.imageSizes) + "\"]")) : i += "[href=\"" + Ht(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Mf(e);
					break;
				case "script": a = If(e);
			}
			gf.has(a) || (e = f({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), gf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Nf(a)) || t === "script" && r.querySelector(Lf(a)) || (t = r.createElement("link"), Id(t, "link", e), Ct(t), r.head.appendChild(t)));
		}
	}
	function Df(e, t) {
		yf.m(e, t);
		var n = Sf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Ht(r) + "\"][href=\"" + Ht(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = If(e);
			}
			if (!gf.has(a) && (e = f({
				rel: "modulepreload",
				href: e
			}, t), gf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Lf(a))) return;
				}
				r = n.createElement("link"), Id(r, "link", e), Ct(r), n.head.appendChild(r);
			}
		}
	}
	function Of(e, t, n) {
		yf.S(e, t, n);
		var r = Sf;
		if (r && e) {
			var i = St(r).hoistableStyles, a = Mf(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Nf(a))) s.loading = 5;
				else {
					e = f({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = gf.get(a)) && Bf(e, n);
					var c = o = r.createElement("link");
					Ct(c), Id(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, zf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function kf(e, t) {
		yf.X(e, t);
		var n = Sf;
		if (n && e) {
			var r = St(n).hoistableScripts, i = If(e), a = r.get(i);
			a || (a = n.querySelector(Lf(i)), a || (e = f({
				src: e,
				async: !0
			}, t), (t = gf.get(i)) && Vf(e, t), a = n.createElement("script"), Ct(a), Id(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Af(e, t) {
		yf.M(e, t);
		var n = Sf;
		if (n && e) {
			var r = St(n).hoistableScripts, i = If(e), a = r.get(i);
			a || (a = n.querySelector(Lf(i)), a || (e = f({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = gf.get(i)) && Vf(e, t), a = n.createElement("script"), Ct(a), Id(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function jf(e, t, n, r) {
		var a = (a = ue.current) ? vf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Mf(n.href), n = St(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Mf(n.href);
					var o = St(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Nf(e))) && !o._p && (s.instance = o, s.state.loading = 5), gf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, gf.set(e, n), o || Ff(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = If(n), n = St(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Mf(e) {
		return "href=\"" + Ht(e) + "\"";
	}
	function Nf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Pf(e) {
		return f({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Ff(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Id(t, "link", n), Ct(t), e.head.appendChild(t));
	}
	function If(e) {
		return "[src=\"" + Ht(e) + "\"]";
	}
	function Lf(e) {
		return "script[async]" + e;
	}
	function Rf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Ht(n.href) + "\"]");
				if (r) return t.instance = r, Ct(r), r;
				var a = f({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Ct(r), Id(r, "style", a), zf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Mf(n.href);
				var o = e.querySelector(Nf(a));
				if (o) return t.state.loading |= 4, t.instance = o, Ct(o), o;
				r = Pf(n), (a = gf.get(a)) && Bf(r, a), o = (e.ownerDocument || e).createElement("link"), Ct(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Id(o, "link", r), t.state.loading |= 4, zf(o, n.precedence, e), t.instance = o;
			case "script": return o = If(n.src), (a = e.querySelector(Lf(o))) ? (t.instance = a, Ct(a), a) : (r = n, (a = gf.get(o)) && (r = f({}, n), Vf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Ct(a), Id(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, zf(r, n.precedence, e));
		return t.instance;
	}
	function zf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Bf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Vf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Hf = null;
	function Uf(e, t, n) {
		if (Hf === null) {
			var r = /* @__PURE__ */ new Map(), i = Hf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Hf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[_t] || a[ut] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Wf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Gf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Kf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function qf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Mf(r.href), a = t.querySelector(Nf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Xf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Ct(a);
					return;
				}
				a = t.ownerDocument || t, r = Pf(r), (i = gf.get(i)) && Bf(r, i), a = a.createElement("link"), Ct(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Id(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Xf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Jf = 0;
	function Yf(e, t) {
		return e.stylesheets && e.count === 0 && Qf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Qf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Jf === 0 && (Jf = 62500 * zd());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Qf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Jf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Xf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Qf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Zf = null;
	function Qf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Zf = /* @__PURE__ */ new Map(), t.forEach($f, e), Zf = null, Xf.call(e));
	}
	function $f(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Zf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Zf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Xf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var ep = {
		$$typeof: b,
		Provider: null,
		Consumer: null,
		_currentValue: re,
		_currentValue2: re,
		_threadCount: 0
	};
	function tp(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = $e(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $e(0), this.hiddenUpdates = $e(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function np(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new tp(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = di(3, null, null, t), e.current = a, a.stateNode = e, t = ua(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Va(a), e;
	}
	function rp(e) {
		return e ? (e = li, e) : li;
	}
	function ip(e, t, n, r, i, a) {
		i = rp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ua(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Wa(e, r, t), n !== null && (_u(n, e, t), Ga(n, e, t));
	}
	function ap(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function op(e, t) {
		ap(e, t), (e = e.alternate) && ap(e, t);
	}
	function sp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = oi(e, 67108864);
			t !== null && _u(t, e, 67108864), op(e, 67108864);
		}
	}
	function cp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = hu();
			t = at(t);
			var n = oi(e, t);
			n !== null && _u(n, e, t), op(e, t);
		}
	}
	var lp = !0;
	function up(e, t, n, r) {
		var i = A.T;
		A.T = null;
		var a = j.p;
		try {
			j.p = 2, fp(e, t, n, r);
		} finally {
			j.p = a, A.T = i;
		}
	}
	function dp(e, t, n, r) {
		var i = A.T;
		A.T = null;
		var a = j.p;
		try {
			j.p = 8, fp(e, t, n, r);
		} finally {
			j.p = a, A.T = i;
		}
	}
	function fp(e, t, n, r) {
		if (lp) {
			var i = pp(r);
			if (i === null) Td(e, t, r, mp, n), Tp(e, r);
			else if (Dp(i, e, t, n, r)) r.stopPropagation();
			else if (Tp(e, r), t & 4 && -1 < wp.indexOf(e)) {
				for (; i !== null;) {
					var a = bt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Je(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Ve(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									ad(a), !(G & 6) && (ru = ke() + 500, od(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = oi(a, 2), s !== null && _u(s, a, 2), Su(), op(a, 2);
					}
					if (a = pp(r), a === null && Td(e, t, r, mp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Td(e, t, r, null, n);
		}
	}
	function pp(e) {
		return e = an(e), hp(e);
	}
	var mp = null;
	function hp(e) {
		if (mp = null, e = yt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return mp = e, null;
	}
	function gp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Ae()) {
				case je: return 2;
				case Me: return 8;
				case Ne:
				case Pe: return 32;
				case Fe: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var _p = !1, vp = null, yp = null, bp = null, xp = /* @__PURE__ */ new Map(), Sp = /* @__PURE__ */ new Map(), Cp = [], wp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Tp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				vp = null;
				break;
			case "dragenter":
			case "dragleave":
				yp = null;
				break;
			case "mouseover":
			case "mouseout":
				bp = null;
				break;
			case "pointerover":
			case "pointerout":
				xp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": Sp.delete(t.pointerId);
		}
	}
	function Ep(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = bt(t), t !== null && sp(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Dp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return vp = Ep(vp, e, t, n, r, i), !0;
			case "dragenter": return yp = Ep(yp, e, t, n, r, i), !0;
			case "mouseover": return bp = Ep(bp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return xp.set(a, Ep(xp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, Sp.set(a, Ep(Sp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Op(e) {
		var t = yt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, ct(e.priority, function() {
							cp(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, ct(e.priority, function() {
							cp(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function kp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = pp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				rn = r, n.target.dispatchEvent(r), rn = null;
			} else return t = bt(n), t !== null && sp(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Ap(e, t, n) {
		kp(e) && n.delete(t);
	}
	function jp() {
		_p = !1, vp !== null && kp(vp) && (vp = null), yp !== null && kp(yp) && (yp = null), bp !== null && kp(bp) && (bp = null), xp.forEach(Ap), Sp.forEach(Ap);
	}
	function Mp(e, n) {
		e.blockedOn === n && (e.blockedOn = null, _p || (_p = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, jp)));
	}
	var Np = null;
	function Pp(e) {
		Np !== e && (Np = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Np === e && (Np = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (hp(r || n) === null) continue;
					break;
				}
				var a = bt(n);
				a !== null && (e.splice(t, 3), t -= 3, Cs(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Fp(e) {
		function t(t) {
			return Mp(t, e);
		}
		vp !== null && Mp(vp, e), yp !== null && Mp(yp, e), bp !== null && Mp(bp, e), xp.forEach(t), Sp.forEach(t);
		for (var n = 0; n < Cp.length; n++) {
			var r = Cp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Cp.length && (n = Cp[0], n.blockedOn === null);) Op(n), n.blockedOn === null && Cp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[dt] || null;
			if (typeof a == "function") o || Pp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[dt] || null) s = o.formAction;
					else if (hp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Pp(n);
			}
		}
	}
	function Ip() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Lp(e) {
		this._internalRoot = e;
	}
	Rp.prototype.render = Lp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		ip(n, hu(), e, t, null, null);
	}, Rp.prototype.unmount = Lp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			ip(e.current, 2, null, e, null, null), Su(), t[ft] = null;
		}
	};
	function Rp(e) {
		this._internalRoot = e;
	}
	Rp.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = st();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Cp.length && t !== 0 && t < Cp[n].priority; n++);
			Cp.splice(n, 0, e), n === 0 && Op(e);
		}
	};
	var zp = n.version;
	if (zp !== "19.2.7") throw Error(i(527, zp, "19.2.7"));
	j.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : d(e), e = e === null ? null : e.stateNode, e;
	};
	var Bp = {
		bundleType: 0,
		version: "19.2.7",
		rendererPackageName: "react-dom",
		currentDispatcherRef: A,
		reconcilerVersion: "19.2.7"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Vp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Vp.isDisabled && Vp.supportsFiber) try {
			Re = Vp.inject(Bp), ze = Vp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Ks, s = qs, c = Js;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = np(e, 1, !1, null, null, n, r, null, o, s, c, Ip), e[ft] = t.current, Cd(e), new Lp(t);
	};
})), ve = /* @__PURE__ */ n(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = _e();
})), N = fe(), ye = ve();
function be() {
	return {
		async: !1,
		breaks: !1,
		extensions: null,
		gfm: !0,
		hooks: null,
		pedantic: !1,
		renderer: null,
		silent: !1,
		tokenizer: null,
		walkTokens: null
	};
}
var xe = be();
function Se(e) {
	xe = e;
}
var Ce = { exec: () => null };
function we(e) {
	let t = [];
	return (n) => {
		let r = Math.max(0, Math.min(3, n - 1)), i = t[r];
		return i || (i = e(r), t[r] = i), i;
	};
}
function P(e, t = "") {
	let n = typeof e == "string" ? e : e.source, r = {
		replace: (e, t) => {
			let i = typeof t == "string" ? t : t.source;
			return i = i.replace(Ee.caret, "$1"), n = n.replace(e, i), r;
		},
		getRegex: () => new RegExp(n, t)
	};
	return r;
}
var Te = ((e = "") => {
	try {
		return !!RegExp("(?<=1)(?<!1)" + e);
	} catch {
		return !1;
	}
})(), Ee = {
	codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
	outputLinkReplace: /\\([\[\]])/g,
	indentCodeCompensation: /^(\s+)(?:```)/,
	beginningSpace: /^\s+/,
	endingHash: /#$/,
	startingSpaceChar: /^ /,
	endingSpaceChar: / $/,
	nonSpaceChar: /[^ ]/,
	newLineCharGlobal: /\n/g,
	tabCharGlobal: /\t/g,
	multipleSpaceGlobal: /\s+/g,
	blankLine: /^[ \t]*$/,
	doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
	blockquoteStart: /^ {0,3}>/,
	blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
	blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
	listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
	listIsTask: /^\[[ xX]\] +\S/,
	listReplaceTask: /^\[[ xX]\] +/,
	listTaskCheckbox: /\[[ xX]\]/,
	anyLine: /\n.*\n/,
	hrefBrackets: /^<(.*)>$/,
	tableDelimiter: /[:|]/,
	tableAlignChars: /^\||\| *$/g,
	tableRowBlankLine: /\n[ \t]*$/,
	tableAlignRight: /^ *-+: *$/,
	tableAlignCenter: /^ *:-+: *$/,
	tableAlignLeft: /^ *:-+ *$/,
	startATag: /^<a /i,
	endATag: /^<\/a>/i,
	startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
	endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
	startAngleBracket: /^</,
	endAngleBracket: />$/,
	pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
	unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
	escapeTest: /[&<>"']/,
	escapeReplace: /[&<>"']/g,
	escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
	escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
	caret: /(^|[^\[])\^/g,
	percentDecode: /%25/g,
	findPipe: /\|/g,
	splitPipe: / \|/,
	slashPipe: /\\\|/g,
	carriageReturn: /\r\n|\r/g,
	spaceLine: /^ +$/gm,
	notSpaceStart: /^\S*/,
	endingNewline: /\n$/,
	listItemRegex: (e) => RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),
	nextBulletRegex: we((e) => RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),
	hrRegex: we((e) => RegExp(`^ {0,${e}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),
	fencesBeginRegex: we((e) => RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),
	headingBeginRegex: we((e) => RegExp(`^ {0,${e}}#`)),
	htmlBeginRegex: we((e) => RegExp(`^ {0,${e}}<(?:[a-z].*>|!--)`, "i")),
	blockquoteBeginRegex: we((e) => RegExp(`^ {0,${e}}>`))
}, De = /^(?:[ \t]*(?:\n|$))+/, Oe = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, ke = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Ae = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, je = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Me = / {0,3}(?:[*+-]|\d{1,9}[.)])/, Ne = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, Pe = P(Ne).replace(/bull/g, Me).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Fe = P(Ne).replace(/bull/g, Me).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), Ie = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, Le = /^[^\n]+/, Re = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, ze = P(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Re).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Be = P(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, Me).getRegex(), Ve = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", He = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Ue = P("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", He).replace("tag", Ve).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), We = (e) => P(Ie).replace("hr", Ae).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace("list", e).replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Ve).getRegex(), Ge = We(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), Ke = We(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), qe = {
	blockquote: P(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Ke).getRegex(),
	code: Oe,
	def: ze,
	fences: ke,
	heading: je,
	hr: Ae,
	html: Ue,
	lheading: Pe,
	list: Be,
	newline: De,
	paragraph: Ge,
	table: Ce,
	text: Le
}, Je = P("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Ae).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Ve).getRegex(), Ye = {
	...qe,
	lheading: Fe,
	table: Je,
	paragraph: P(Ie).replace("hr", Ae).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Je).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Ve).getRegex()
}, Xe = {
	...qe,
	html: P("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", He).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
	def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
	heading: /^(#{1,6})(.*)(?:\n+|$)/,
	fences: Ce,
	lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
	paragraph: P(Ie).replace("hr", Ae).replace("heading", " *#{1,6} *[^\n]").replace("lheading", Pe).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, Ze = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, Qe = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, $e = /^( {2,}|\\)\n(?!\s*$)/, et = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, tt = /[\p{P}\p{S}]/u, nt = /[\s\p{P}\p{S}]/u, rt = /[^\s\p{P}\p{S}]/u, it = P(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, nt).getRegex(), at = /(?!~)[\p{P}\p{S}]/u, ot = /(?!~)[\s\p{P}\p{S}]/u, st = /(?:[^\s\p{P}\p{S}]|~)/u, ct = P(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Te ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), lt = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, ut = P(lt, "u").replace(/punct/g, tt).getRegex(), dt = P(lt, "u").replace(/punct/g, at).getRegex(), ft = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", pt = P(ft, "gu").replace(/notPunctSpace/g, rt).replace(/punctSpace/g, nt).replace(/punct/g, tt).getRegex(), mt = P(ft, "gu").replace(/notPunctSpace/g, st).replace(/punctSpace/g, ot).replace(/punct/g, at).getRegex(), ht = P("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, rt).replace(/punctSpace/g, nt).replace(/punct/g, tt).getRegex(), gt = P(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, tt).getRegex(), _t = P("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", "gu").replace(/notPunctSpace/g, rt).replace(/punctSpace/g, nt).replace(/punct/g, tt).getRegex(), vt = P(/\\(punct)/, "gu").replace(/punct/g, tt).getRegex(), yt = P(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), bt = P(He).replace("(?:-->|$)", "-->").getRegex(), xt = P("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", bt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), St = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/, Ct = P(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", St).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), wt = P(/^!?\[(label)\]\[(ref)\]/).replace("label", St).replace("ref", Re).getRegex(), Tt = P(/^!?\[(ref)\](?:\[\])?/).replace("ref", Re).getRegex(), Et = P("reflink|nolink(?!\\()", "g").replace("reflink", wt).replace("nolink", Tt).getRegex(), Dt = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Ot = {
	_backpedal: Ce,
	anyPunctuation: vt,
	autolink: yt,
	blockSkip: ct,
	br: $e,
	code: Qe,
	del: Ce,
	delLDelim: Ce,
	delRDelim: Ce,
	emStrongLDelim: ut,
	emStrongRDelimAst: pt,
	emStrongRDelimUnd: ht,
	escape: Ze,
	link: Ct,
	nolink: Tt,
	punctuation: it,
	reflink: wt,
	reflinkSearch: Et,
	tag: xt,
	text: et,
	url: Ce
}, kt = {
	...Ot,
	link: P(/^!?\[(label)\]\((.*?)\)/).replace("label", St).getRegex(),
	reflink: P(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", St).getRegex()
}, At = {
	...Ot,
	emStrongRDelimAst: mt,
	emStrongLDelim: dt,
	delLDelim: gt,
	delRDelim: _t,
	url: P(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Dt).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
	_backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
	del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,
	text: P(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Dt).getRegex()
}, jt = {
	...At,
	br: P($e).replace("{2,}", "*").getRegex(),
	text: P(At.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, Mt = {
	normal: qe,
	gfm: Ye,
	pedantic: Xe
}, Nt = {
	normal: Ot,
	gfm: At,
	breaks: jt,
	pedantic: kt
}, Pt = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
}, Ft = (e) => Pt[e];
function It(e, t) {
	if (t) {
		if (Ee.escapeTest.test(e)) return e.replace(Ee.escapeReplace, Ft);
	} else if (Ee.escapeTestNoEncode.test(e)) return e.replace(Ee.escapeReplaceNoEncode, Ft);
	return e;
}
function Lt(e) {
	try {
		e = encodeURI(e).replace(Ee.percentDecode, "%");
	} catch {
		return null;
	}
	return e;
}
function Rt(e, t) {
	let n = e.replace(Ee.findPipe, (e, t, n) => {
		let r = !1, i = t;
		for (; --i >= 0 && n[i] === "\\";) r = !r;
		return r ? "|" : " |";
	}).split(Ee.splitPipe), r = 0;
	if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), t) if (n.length > t) n.splice(t);
	else for (; n.length < t;) n.push("");
	for (; r < n.length; r++) n[r] = n[r].trim().replace(Ee.slashPipe, "|");
	return n;
}
function zt(e, t, n) {
	let r = e.length;
	if (r === 0) return "";
	let i = 0;
	for (; i < r;) {
		let a = e.charAt(r - i - 1);
		if (a === t && !n) i++;
		else if (a !== t && n) i++;
		else break;
	}
	return e.slice(0, r - i);
}
function Bt(e) {
	let t = e.split("\n"), n = t.length - 1;
	for (; n >= 0 && Ee.blankLine.test(t[n]);) n--;
	return t.length - n <= 2 ? e : t.slice(0, n + 1).join("\n");
}
function Vt(e, t) {
	if (e.indexOf(t[1]) === -1) return -1;
	let n = 0;
	for (let r = 0; r < e.length; r++) if (e[r] === "\\") r++;
	else if (e[r] === t[0]) n++;
	else if (e[r] === t[1] && (n--, n < 0)) return r;
	return n > 0 ? -2 : -1;
}
function Ht(e, t = 0) {
	let n = t, r = "";
	for (let t of e) if (t === "	") {
		let e = 4 - n % 4;
		r += " ".repeat(e), n += e;
	} else r += t, n++;
	return r;
}
function Ut(e, t, n, r, i) {
	let a = t.href, o = t.title || null, s = e[1].replace(i.other.outputLinkReplace, "$1");
	r.state.inLink = !0;
	let c = {
		type: e[0].charAt(0) === "!" ? "image" : "link",
		raw: n,
		href: a,
		title: o,
		text: s,
		tokens: r.inlineTokens(s)
	};
	return r.state.inLink = !1, c;
}
function Wt(e, t, n) {
	let r = e.match(n.other.indentCodeCompensation);
	if (r === null) return t;
	let i = r[1];
	return t.split("\n").map((e) => {
		let t = e.match(n.other.beginningSpace);
		if (t === null) return e;
		let [r] = t;
		return r.length >= i.length ? e.slice(i.length) : e;
	}).join("\n");
}
var Gt = class {
	options;
	rules;
	lexer;
	constructor(e) {
		this.options = e || xe;
	}
	space(e) {
		let t = this.rules.block.newline.exec(e);
		if (t && t[0].length > 0) return {
			type: "space",
			raw: t[0]
		};
	}
	code(e) {
		let t = this.rules.block.code.exec(e);
		if (t) {
			let e = this.options.pedantic ? t[0] : Bt(t[0]);
			return {
				type: "code",
				raw: e,
				codeBlockStyle: "indented",
				text: e.replace(this.rules.other.codeRemoveIndent, "")
			};
		}
	}
	fences(e) {
		let t = this.rules.block.fences.exec(e);
		if (t) {
			let e = t[0], n = Wt(e, t[3] || "", this.rules);
			return {
				type: "code",
				raw: e,
				lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
				text: n
			};
		}
	}
	heading(e) {
		let t = this.rules.block.heading.exec(e);
		if (t) {
			let e = t[2].trim();
			if (this.rules.other.endingHash.test(e)) {
				let t = zt(e, "#");
				(this.options.pedantic || !t || this.rules.other.endingSpaceChar.test(t)) && (e = t.trim());
			}
			return {
				type: "heading",
				raw: zt(t[0], "\n"),
				depth: t[1].length,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	hr(e) {
		let t = this.rules.block.hr.exec(e);
		if (t) return {
			type: "hr",
			raw: zt(t[0], "\n")
		};
	}
	blockquote(e) {
		let t = this.rules.block.blockquote.exec(e);
		if (t) {
			let e = zt(t[0], "\n").split("\n"), n = "", r = "", i = [];
			for (; e.length > 0;) {
				let t = !1, a = [], o;
				for (o = 0; o < e.length; o++) if (this.rules.other.blockquoteStart.test(e[o])) a.push(e[o]), t = !0;
				else if (!t) a.push(e[o]);
				else break;
				e = e.slice(o);
				let s = a.join("\n"), c = s.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
				n = n ? `${n}
${s}` : s, r = r ? `${r}
${c}` : c;
				let l = this.lexer.state.top;
				if (this.lexer.state.top = !0, this.lexer.blockTokens(c, i, !0), this.lexer.state.top = l, e.length === 0) break;
				let u = i.at(-1);
				if (u?.type === "code") break;
				if (u?.type === "blockquote") {
					let t = u, a = t.raw + "\n" + e.join("\n"), o = this.blockquote(a);
					i[i.length - 1] = o, n = n.substring(0, n.length - t.raw.length) + o.raw, r = r.substring(0, r.length - t.text.length) + o.text;
					break;
				} else if (u?.type === "list") {
					let t = u, a = t.raw + "\n" + e.join("\n"), o = this.list(a);
					i[i.length - 1] = o, n = n.substring(0, n.length - u.raw.length) + o.raw, r = r.substring(0, r.length - t.raw.length) + o.raw, e = a.substring(i.at(-1).raw.length).split("\n");
					continue;
				}
			}
			return {
				type: "blockquote",
				raw: n,
				tokens: i,
				text: r
			};
		}
	}
	list(e) {
		let t = this.rules.block.list.exec(e);
		if (t) {
			let n = t[1].trim(), r = n.length > 1, i = {
				type: "list",
				raw: "",
				ordered: r,
				start: r ? +n.slice(0, -1) : "",
				loose: !1,
				items: []
			};
			n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
			let a = this.rules.other.listItemRegex(n), o = !1;
			for (; e;) {
				let n = !1, r = "", s = "";
				if (!(t = a.exec(e)) || this.rules.block.hr.test(e)) break;
				r = t[0], e = e.substring(r.length);
				let c = Ht(t[2].split("\n", 1)[0], t[1].length), l = e.split("\n", 1)[0], u = !c.trim(), d = 0;
				if (this.options.pedantic ? (d = 2, s = c.trimStart()) : u ? d = t[1].length + 1 : (d = c.search(this.rules.other.nonSpaceChar), d = d > 4 ? 1 : d, s = c.slice(d), d += t[1].length), u && this.rules.other.blankLine.test(l) && (r += l + "\n", e = e.substring(l.length + 1), n = !0), !n) {
					let t = this.rules.other.nextBulletRegex(d), n = this.rules.other.hrRegex(d), i = this.rules.other.fencesBeginRegex(d), a = this.rules.other.headingBeginRegex(d), o = this.rules.other.htmlBeginRegex(d), f = this.rules.other.blockquoteBeginRegex(d);
					for (; e;) {
						let p = e.split("\n", 1)[0], m;
						if (l = p, this.options.pedantic ? (l = l.replace(this.rules.other.listReplaceNesting, "  "), m = l) : m = l.replace(this.rules.other.tabCharGlobal, "    "), i.test(l) || a.test(l) || o.test(l) || f.test(l) || t.test(l) || n.test(l)) break;
						if (m.search(this.rules.other.nonSpaceChar) >= d || !l.trim()) s += "\n" + m.slice(d);
						else {
							if (u || c.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || i.test(c) || a.test(c) || n.test(c)) break;
							s += "\n" + l;
						}
						u = !l.trim(), r += p + "\n", e = e.substring(p.length + 1), c = m.slice(d);
					}
				}
				i.loose || (o ? i.loose = !0 : this.rules.other.doubleBlankLine.test(r) && (o = !0)), i.items.push({
					type: "list_item",
					raw: r,
					task: !!this.options.gfm && this.rules.other.listIsTask.test(s),
					loose: !1,
					text: s,
					tokens: []
				}), i.raw += r;
			}
			let s = i.items.at(-1);
			if (s) s.raw = s.raw.trimEnd(), s.text = s.text.trimEnd();
			else return;
			i.raw = i.raw.trimEnd();
			for (let e of i.items) {
				this.lexer.state.top = !1, e.tokens = this.lexer.blockTokens(e.text, []);
				let t = e.tokens[0];
				if (e.task && (t?.type === "text" || t?.type === "paragraph")) {
					e.text = e.text.replace(this.rules.other.listReplaceTask, ""), t.raw = t.raw.replace(this.rules.other.listReplaceTask, ""), t.text = t.text.replace(this.rules.other.listReplaceTask, "");
					for (let e = this.lexer.inlineQueue.length - 1; e >= 0; e--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)) {
						this.lexer.inlineQueue[e].src = this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask, "");
						break;
					}
					let n = this.rules.other.listTaskCheckbox.exec(e.raw);
					if (n) {
						let t = {
							type: "checkbox",
							raw: n[0] + " ",
							checked: n[0] !== "[ ]"
						};
						e.checked = t.checked, i.loose ? e.tokens[0] && ["paragraph", "text"].includes(e.tokens[0].type) && "tokens" in e.tokens[0] && e.tokens[0].tokens ? (e.tokens[0].raw = t.raw + e.tokens[0].raw, e.tokens[0].text = t.raw + e.tokens[0].text, e.tokens[0].tokens.unshift(t)) : e.tokens.unshift({
							type: "paragraph",
							raw: t.raw,
							text: t.raw,
							tokens: [t]
						}) : e.tokens.unshift(t);
					}
				} else e.task &&= !1;
				if (!i.loose) {
					let t = e.tokens.filter((e) => e.type === "space");
					i.loose = t.length > 0 && t.some((e) => this.rules.other.anyLine.test(e.raw));
				}
			}
			if (i.loose) for (let e of i.items) {
				e.loose = !0;
				for (let t of e.tokens) t.type === "text" && (t.type = "paragraph");
			}
			return i;
		}
	}
	html(e) {
		let t = this.rules.block.html.exec(e);
		if (t) {
			let e = Bt(t[0]);
			return {
				type: "html",
				block: !0,
				raw: e,
				pre: t[1] === "pre" || t[1] === "script" || t[1] === "style",
				text: e
			};
		}
	}
	def(e) {
		let t = this.rules.block.def.exec(e);
		if (t) {
			let e = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), n = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
			return {
				type: "def",
				tag: e,
				raw: zt(t[0], "\n"),
				href: n,
				title: r
			};
		}
	}
	table(e) {
		let t = this.rules.block.table.exec(e);
		if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
		let n = Rt(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [], a = {
			type: "table",
			raw: zt(t[0], "\n"),
			header: [],
			align: [],
			rows: []
		};
		if (n.length === r.length) {
			for (let e of r) this.rules.other.tableAlignRight.test(e) ? a.align.push("right") : this.rules.other.tableAlignCenter.test(e) ? a.align.push("center") : this.rules.other.tableAlignLeft.test(e) ? a.align.push("left") : a.align.push(null);
			for (let e = 0; e < n.length; e++) a.header.push({
				text: n[e],
				tokens: this.lexer.inline(n[e]),
				header: !0,
				align: a.align[e]
			});
			for (let e of i) a.rows.push(Rt(e, a.header.length).map((e, t) => ({
				text: e,
				tokens: this.lexer.inline(e),
				header: !1,
				align: a.align[t]
			})));
			return a;
		}
	}
	lheading(e) {
		let t = this.rules.block.lheading.exec(e);
		if (t) {
			let e = t[1].trim();
			return {
				type: "heading",
				raw: zt(t[0], "\n"),
				depth: t[2].charAt(0) === "=" ? 1 : 2,
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	paragraph(e) {
		let t = this.rules.block.paragraph.exec(e);
		if (t) {
			let e = t[1].charAt(t[1].length - 1) === "\n" ? t[1].slice(0, -1) : t[1];
			return {
				type: "paragraph",
				raw: t[0],
				text: e,
				tokens: this.lexer.inline(e)
			};
		}
	}
	text(e) {
		let t = this.rules.block.text.exec(e);
		if (t) return {
			type: "text",
			raw: t[0],
			text: t[0],
			tokens: this.lexer.inline(t[0])
		};
	}
	escape(e) {
		let t = this.rules.inline.escape.exec(e);
		if (t) return {
			type: "escape",
			raw: t[0],
			text: t[1]
		};
	}
	tag(e) {
		let t = this.rules.inline.tag.exec(e);
		if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
			type: "html",
			raw: t[0],
			inLink: this.lexer.state.inLink,
			inRawBlock: this.lexer.state.inRawBlock,
			block: !1,
			text: t[0]
		};
	}
	link(e) {
		let t = this.rules.inline.link.exec(e);
		if (t) {
			let e = t[2].trim();
			if (!this.options.pedantic && this.rules.other.startAngleBracket.test(e)) {
				if (!this.rules.other.endAngleBracket.test(e)) return;
				let t = zt(e.slice(0, -1), "\\");
				if ((e.length - t.length) % 2 == 0) return;
			} else {
				let e = Vt(t[2], "()");
				if (e === -2) return;
				if (e > -1) {
					let n = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + e;
					t[2] = t[2].substring(0, e), t[0] = t[0].substring(0, n).trim(), t[3] = "";
				}
			}
			let n = t[2], r = "";
			if (this.options.pedantic) {
				let e = this.rules.other.pedanticHrefTitle.exec(n);
				e && (n = e[1], r = e[3]);
			} else r = t[3] ? t[3].slice(1, -1) : "";
			return n = n.trim(), this.rules.other.startAngleBracket.test(n) && (n = this.options.pedantic && !this.rules.other.endAngleBracket.test(e) ? n.slice(1) : n.slice(1, -1)), Ut(t, {
				href: n && n.replace(this.rules.inline.anyPunctuation, "$1"),
				title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
			}, t[0], this.lexer, this.rules);
		}
	}
	reflink(e, t) {
		let n;
		if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
			let e = t[(n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " ").toLowerCase()];
			if (!e) {
				let e = n[0].charAt(0);
				return {
					type: "text",
					raw: e,
					text: e
				};
			}
			return Ut(n, e, n[0], this.lexer, this.rules);
		}
	}
	emStrong(e, t, n = "") {
		let r = this.rules.inline.emStrongLDelim.exec(e);
		if (!(!r || !r[1] && !r[2] && !r[3] && !r[4] || r[4] && n.match(this.rules.other.unicodeAlphaNumeric)) && (!(r[1] || r[3]) || !n || this.rules.inline.punctuation.exec(n))) {
			let n = [...r[0]].length - 1, i, a, o = n, s = 0, c = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
			for (c.lastIndex = 0, t = t.slice(-1 * e.length + n); (r = c.exec(t)) !== null;) {
				if (i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !i) continue;
				if (a = [...i].length, r[3] || r[4]) {
					o += a;
					continue;
				} else if ((r[5] || r[6]) && n % 3 && !((n + a) % 3)) {
					s += a;
					continue;
				}
				if (o -= a, o > 0) continue;
				a = Math.min(a, a + o + s);
				let t = [...r[0]][0].length, c = e.slice(0, n + r.index + t + a);
				if (Math.min(n, a) % 2) {
					let e = c.slice(1, -1);
					return {
						type: "em",
						raw: c,
						text: e,
						tokens: this.lexer.inlineTokens(e)
					};
				}
				let l = c.slice(2, -2);
				return {
					type: "strong",
					raw: c,
					text: l,
					tokens: this.lexer.inlineTokens(l)
				};
			}
		}
	}
	codespan(e) {
		let t = this.rules.inline.code.exec(e);
		if (t) {
			let e = t[2].replace(this.rules.other.newLineCharGlobal, " "), n = this.rules.other.nonSpaceChar.test(e), r = this.rules.other.startingSpaceChar.test(e) && this.rules.other.endingSpaceChar.test(e);
			return n && r && (e = e.substring(1, e.length - 1)), {
				type: "codespan",
				raw: t[0],
				text: e
			};
		}
	}
	br(e) {
		let t = this.rules.inline.br.exec(e);
		if (t) return {
			type: "br",
			raw: t[0]
		};
	}
	del(e, t, n = "") {
		let r = this.rules.inline.delLDelim.exec(e);
		if (r && (!r[1] || !n || this.rules.inline.punctuation.exec(n))) {
			let n = [...r[0]].length - 1, i, a, o = n, s = this.rules.inline.delRDelim;
			for (s.lastIndex = 0, t = t.slice(-1 * e.length + n); (r = s.exec(t)) !== null;) {
				if (i = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !i || (a = [...i].length, a !== n)) continue;
				if (r[3] || r[4]) {
					o += a;
					continue;
				}
				if (o -= a, o > 0) continue;
				a = Math.min(a, a + o);
				let t = [...r[0]][0].length, s = e.slice(0, n + r.index + t + a), c = s.slice(n, -n);
				return {
					type: "del",
					raw: s,
					text: c,
					tokens: this.lexer.inlineTokens(c)
				};
			}
		}
	}
	autolink(e) {
		let t = this.rules.inline.autolink.exec(e);
		if (t) {
			let e, n;
			return t[2] === "@" ? (e = t[1], n = "mailto:" + e) : (e = t[1], n = e), {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	url(e) {
		let t;
		if (t = this.rules.inline.url.exec(e)) {
			let e, n;
			if (t[2] === "@") e = t[0], n = "mailto:" + e;
			else {
				let r;
				do
					r = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
				while (r !== t[0]);
				e = t[0], n = t[1] === "www." ? "http://" + t[0] : t[0];
			}
			return {
				type: "link",
				raw: t[0],
				text: e,
				href: n,
				tokens: [{
					type: "text",
					raw: e,
					text: e
				}]
			};
		}
	}
	inlineText(e) {
		let t = this.rules.inline.text.exec(e);
		if (t) {
			let e = this.lexer.state.inRawBlock;
			return {
				type: "text",
				raw: t[0],
				text: t[0],
				escaped: e
			};
		}
	}
}, Kt = class e {
	tokens;
	options;
	state;
	inlineQueue;
	tokenizer;
	constructor(e) {
		this.tokens = [], this.tokens.links = Object.create(null), this.options = e || xe, this.options.tokenizer = this.options.tokenizer || new Gt(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
			inLink: !1,
			inRawBlock: !1,
			top: !0
		};
		let t = {
			other: Ee,
			block: Mt.normal,
			inline: Nt.normal
		};
		this.options.pedantic ? (t.block = Mt.pedantic, t.inline = Nt.pedantic) : this.options.gfm && (t.block = Mt.gfm, this.options.breaks ? t.inline = Nt.breaks : t.inline = Nt.gfm), this.tokenizer.rules = t;
	}
	static get rules() {
		return {
			block: Mt,
			inline: Nt
		};
	}
	static lex(t, n) {
		return new e(n).lex(t);
	}
	static lexInline(t, n) {
		return new e(n).inlineTokens(t);
	}
	lex(e) {
		e = e.replace(Ee.carriageReturn, "\n"), this.blockTokens(e, this.tokens);
		for (let e = 0; e < this.inlineQueue.length; e++) {
			let t = this.inlineQueue[e];
			this.inlineTokens(t.src, t.tokens);
		}
		return this.inlineQueue = [], this.tokens;
	}
	blockTokens(e, t = [], n = !1) {
		this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(Ee.tabCharGlobal, "    ").replace(Ee.spaceLine, ""));
		let r = Infinity;
		for (; e;) {
			if (e.length < r) r = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			let i;
			if (this.options.extensions?.block?.some((n) => (i = n.call({ lexer: this }, e, t)) ? (e = e.substring(i.raw.length), t.push(i), !0) : !1)) continue;
			if (i = this.tokenizer.space(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				i.raw.length === 1 && n !== void 0 ? n.raw += "\n" : t.push(i);
				continue;
			}
			if (i = this.tokenizer.code(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.text, this.inlineQueue.at(-1).src = n.text) : t.push(i);
				continue;
			}
			if (i = this.tokenizer.fences(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.heading(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.hr(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.blockquote(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.list(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.html(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.def(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "paragraph" || n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.raw, this.inlineQueue.at(-1).src = n.text) : this.tokens.links[i.tag] || (this.tokens.links[i.tag] = {
					href: i.href,
					title: i.title
				}, t.push(i));
				continue;
			}
			if (i = this.tokenizer.table(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			if (i = this.tokenizer.lheading(e)) {
				e = e.substring(i.raw.length), t.push(i);
				continue;
			}
			let a = e;
			if (this.options.extensions?.startBlock) {
				let t = Infinity, n = e.slice(1), r;
				this.options.extensions.startBlock.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < Infinity && t >= 0 && (a = e.substring(0, t + 1));
			}
			if (this.state.top && (i = this.tokenizer.paragraph(a))) {
				let r = t.at(-1);
				n && r?.type === "paragraph" ? (r.raw += (r.raw.endsWith("\n") ? "" : "\n") + i.raw, r.text += "\n" + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = r.text) : t.push(i), n = a.length !== e.length, e = e.substring(i.raw.length);
				continue;
			}
			if (i = this.tokenizer.text(e)) {
				e = e.substring(i.raw.length);
				let n = t.at(-1);
				n?.type === "text" ? (n.raw += (n.raw.endsWith("\n") ? "" : "\n") + i.raw, n.text += "\n" + i.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = n.text) : t.push(i);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return this.state.top = !0, t;
	}
	inline(e, t = []) {
		return this.inlineQueue.push({
			src: e,
			tokens: t
		}), t;
	}
	inlineTokens(e, t = []) {
		this.tokenizer.lexer = this;
		let n = e;
		if (this.tokens.links) {
			let e = Object.keys(this.tokens.links);
			e.length > 0 && (n = n.replace(this.tokenizer.rules.inline.reflinkSearch, (t) => e.includes(t.slice(t.lastIndexOf("[") + 1, -1)) ? "[" + "a".repeat(t.length - 2) + "]" : t));
		}
		n = n.replace(this.tokenizer.rules.inline.anyPunctuation, "++"), n = n.replace(this.tokenizer.rules.inline.blockSkip, (e, t, n) => {
			let r = n ? n.length : 0;
			return e.slice(0, r) + "[" + "a".repeat(e.length - r - 2) + "]";
		}), n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
		let r = !1, i = "", a = Infinity;
		for (; e;) {
			if (e.length < a) a = e.length;
			else {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
			r || (i = ""), r = !1;
			let o;
			if (this.options.extensions?.inline?.some((n) => (o = n.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), !0) : !1)) continue;
			if (o = this.tokenizer.escape(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.tag(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.link(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.reflink(e, this.tokens.links)) {
				e = e.substring(o.raw.length);
				let n = t.at(-1);
				o.type === "text" && n?.type === "text" ? (n.raw += o.raw, n.text += o.text) : t.push(o);
				continue;
			}
			if (o = this.tokenizer.emStrong(e, n, i)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.codespan(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.br(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.del(e, n, i)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (o = this.tokenizer.autolink(e)) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			if (!this.state.inLink && (o = this.tokenizer.url(e))) {
				e = e.substring(o.raw.length), t.push(o);
				continue;
			}
			let s = e;
			if (this.options.extensions?.startInline) {
				let t = Infinity, n = e.slice(1), r;
				this.options.extensions.startInline.forEach((e) => {
					r = e.call({ lexer: this }, n), typeof r == "number" && r >= 0 && (t = Math.min(t, r));
				}), t < Infinity && t >= 0 && (s = e.substring(0, t + 1));
			}
			if (o = this.tokenizer.inlineText(s)) {
				e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (i = o.raw.slice(-1)), r = !0;
				let n = t.at(-1);
				n?.type === "text" ? (n.raw += o.raw, n.text += o.text) : t.push(o);
				continue;
			}
			if (e) {
				this.infiniteLoopError(e.charCodeAt(0));
				break;
			}
		}
		return t;
	}
	infiniteLoopError(e) {
		let t = "Infinite loop on byte: " + e;
		if (this.options.silent) console.error(t);
		else throw Error(t);
	}
}, qt = class {
	options;
	parser;
	constructor(e) {
		this.options = e || xe;
	}
	space(e) {
		return "";
	}
	code({ text: e, lang: t, escaped: n }) {
		let r = (t || "").match(Ee.notSpaceStart)?.[0], i = e.replace(Ee.endingNewline, "") + "\n";
		return r ? "<pre><code class=\"language-" + It(r) + "\">" + (n ? i : It(i, !0)) + "</code></pre>\n" : "<pre><code>" + (n ? i : It(i, !0)) + "</code></pre>\n";
	}
	blockquote({ tokens: e }) {
		return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
	}
	html({ text: e }) {
		return e;
	}
	def(e) {
		return "";
	}
	heading({ tokens: e, depth: t }) {
		return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
	}
	hr(e) {
		return "<hr>\n";
	}
	list(e) {
		let t = e.ordered, n = e.start, r = "";
		for (let t = 0; t < e.items.length; t++) {
			let n = e.items[t];
			r += this.listitem(n);
		}
		let i = t ? "ol" : "ul", a = t && n !== 1 ? " start=\"" + n + "\"" : "";
		return "<" + i + a + ">\n" + r + "</" + i + ">\n";
	}
	listitem(e) {
		return `<li>${this.parser.parse(e.tokens)}</li>
`;
	}
	checkbox({ checked: e }) {
		return "<input " + (e ? "checked=\"\" " : "") + "disabled=\"\" type=\"checkbox\"> ";
	}
	paragraph({ tokens: e }) {
		return `<p>${this.parser.parseInline(e)}</p>
`;
	}
	table(e) {
		let t = "", n = "";
		for (let t = 0; t < e.header.length; t++) n += this.tablecell(e.header[t]);
		t += this.tablerow({ text: n });
		let r = "";
		for (let t = 0; t < e.rows.length; t++) {
			let i = e.rows[t];
			n = "";
			for (let e = 0; e < i.length; e++) n += this.tablecell(i[e]);
			r += this.tablerow({ text: n });
		}
		return r &&= `<tbody>${r}</tbody>`, "<table>\n<thead>\n" + t + "</thead>\n" + r + "</table>\n";
	}
	tablerow({ text: e }) {
		return `<tr>
${e}</tr>
`;
	}
	tablecell(e) {
		let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
		return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
	}
	strong({ tokens: e }) {
		return `<strong>${this.parser.parseInline(e)}</strong>`;
	}
	em({ tokens: e }) {
		return `<em>${this.parser.parseInline(e)}</em>`;
	}
	codespan({ text: e }) {
		return `<code>${It(e, !0)}</code>`;
	}
	br(e) {
		return "<br>";
	}
	del({ tokens: e }) {
		return `<del>${this.parser.parseInline(e)}</del>`;
	}
	link({ href: e, title: t, tokens: n }) {
		let r = this.parser.parseInline(n), i = Lt(e);
		if (i === null) return r;
		e = i;
		let a = "<a href=\"" + e + "\"";
		return t && (a += " title=\"" + It(t) + "\""), a += ">" + r + "</a>", a;
	}
	image({ href: e, title: t, text: n, tokens: r }) {
		r && (n = this.parser.parseInline(r, this.parser.textRenderer));
		let i = Lt(e);
		if (i === null) return It(n);
		e = i;
		let a = `<img src="${e}" alt="${It(n)}"`;
		return t && (a += ` title="${It(t)}"`), a += ">", a;
	}
	text(e) {
		return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : It(e.text);
	}
}, Jt = class {
	strong({ text: e }) {
		return e;
	}
	em({ text: e }) {
		return e;
	}
	codespan({ text: e }) {
		return e;
	}
	del({ text: e }) {
		return e;
	}
	html({ text: e }) {
		return e;
	}
	text({ text: e }) {
		return e;
	}
	link({ text: e }) {
		return "" + e;
	}
	image({ text: e }) {
		return "" + e;
	}
	br() {
		return "";
	}
	checkbox({ raw: e }) {
		return e;
	}
}, Yt = class e {
	options;
	renderer;
	textRenderer;
	constructor(e) {
		this.options = e || xe, this.options.renderer = this.options.renderer || new qt(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Jt();
	}
	static parse(t, n) {
		return new e(n).parse(t);
	}
	static parseInline(t, n) {
		return new e(n).parseInline(t);
	}
	parse(e) {
		this.renderer.parser = this;
		let t = "";
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (this.options.extensions?.renderers?.[r.type]) {
				let e = r, n = this.options.extensions.renderers[e.type].call({ parser: this }, e);
				if (n !== !1 || ![
					"space",
					"hr",
					"heading",
					"code",
					"table",
					"blockquote",
					"list",
					"html",
					"def",
					"paragraph",
					"text"
				].includes(e.type)) {
					t += n || "";
					continue;
				}
			}
			let i = r;
			switch (i.type) {
				case "space":
					t += this.renderer.space(i);
					break;
				case "hr":
					t += this.renderer.hr(i);
					break;
				case "heading":
					t += this.renderer.heading(i);
					break;
				case "code":
					t += this.renderer.code(i);
					break;
				case "table":
					t += this.renderer.table(i);
					break;
				case "blockquote":
					t += this.renderer.blockquote(i);
					break;
				case "list":
					t += this.renderer.list(i);
					break;
				case "checkbox":
					t += this.renderer.checkbox(i);
					break;
				case "html":
					t += this.renderer.html(i);
					break;
				case "def":
					t += this.renderer.def(i);
					break;
				case "paragraph":
					t += this.renderer.paragraph(i);
					break;
				case "text":
					t += this.renderer.text(i);
					break;
				default: {
					let e = "Token with \"" + i.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return t;
	}
	parseInline(e, t = this.renderer) {
		this.renderer.parser = this;
		let n = "";
		for (let r = 0; r < e.length; r++) {
			let i = e[r];
			if (this.options.extensions?.renderers?.[i.type]) {
				let e = this.options.extensions.renderers[i.type].call({ parser: this }, i);
				if (e !== !1 || ![
					"escape",
					"html",
					"link",
					"image",
					"strong",
					"em",
					"codespan",
					"br",
					"del",
					"text"
				].includes(i.type)) {
					n += e || "";
					continue;
				}
			}
			let a = i;
			switch (a.type) {
				case "escape":
					n += t.text(a);
					break;
				case "html":
					n += t.html(a);
					break;
				case "link":
					n += t.link(a);
					break;
				case "image":
					n += t.image(a);
					break;
				case "checkbox":
					n += t.checkbox(a);
					break;
				case "strong":
					n += t.strong(a);
					break;
				case "em":
					n += t.em(a);
					break;
				case "codespan":
					n += t.codespan(a);
					break;
				case "br":
					n += t.br(a);
					break;
				case "del":
					n += t.del(a);
					break;
				case "text":
					n += t.text(a);
					break;
				default: {
					let e = "Token with \"" + a.type + "\" type was not found.";
					if (this.options.silent) return console.error(e), "";
					throw Error(e);
				}
			}
		}
		return n;
	}
}, Xt = class {
	options;
	block;
	constructor(e) {
		this.options = e || xe;
	}
	static passThroughHooks = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens",
		"emStrongMask"
	]);
	static passThroughHooksRespectAsync = /* @__PURE__ */ new Set([
		"preprocess",
		"postprocess",
		"processAllTokens"
	]);
	preprocess(e) {
		return e;
	}
	postprocess(e) {
		return e;
	}
	processAllTokens(e) {
		return e;
	}
	emStrongMask(e) {
		return e;
	}
	provideLexer(e = this.block) {
		return e ? Kt.lex : Kt.lexInline;
	}
	provideParser(e = this.block) {
		return e ? Yt.parse : Yt.parseInline;
	}
}, Zt = new class {
	defaults = be();
	options = this.setOptions;
	parse = this.parseMarkdown(!0);
	parseInline = this.parseMarkdown(!1);
	Parser = Yt;
	Renderer = qt;
	TextRenderer = Jt;
	Lexer = Kt;
	Tokenizer = Gt;
	Hooks = Xt;
	constructor(...e) {
		this.use(...e);
	}
	walkTokens(e, t) {
		let n = [];
		for (let r of e) switch (n = n.concat(t.call(this, r)), r.type) {
			case "table": {
				let e = r;
				for (let r of e.header) n = n.concat(this.walkTokens(r.tokens, t));
				for (let r of e.rows) for (let e of r) n = n.concat(this.walkTokens(e.tokens, t));
				break;
			}
			case "list": {
				let e = r;
				n = n.concat(this.walkTokens(e.items, t));
				break;
			}
			default: {
				let e = r;
				this.defaults.extensions?.childTokens?.[e.type] ? this.defaults.extensions.childTokens[e.type].forEach((r) => {
					let i = e[r].flat(Infinity);
					n = n.concat(this.walkTokens(i, t));
				}) : e.tokens && (n = n.concat(this.walkTokens(e.tokens, t)));
			}
		}
		return n;
	}
	use(...e) {
		let t = this.defaults.extensions || {
			renderers: {},
			childTokens: {}
		};
		return e.forEach((e) => {
			let n = { ...e };
			if (n.async = this.defaults.async || n.async || !1, e.extensions && (e.extensions.forEach((e) => {
				if (!e.name) throw Error("extension name required");
				if ("renderer" in e) {
					let n = t.renderers[e.name];
					n ? t.renderers[e.name] = function(...t) {
						let r = e.renderer.apply(this, t);
						return r === !1 && (r = n.apply(this, t)), r;
					} : t.renderers[e.name] = e.renderer;
				}
				if ("tokenizer" in e) {
					if (!e.level || e.level !== "block" && e.level !== "inline") throw Error("extension level must be 'block' or 'inline'");
					let n = t[e.level];
					n ? n.unshift(e.tokenizer) : t[e.level] = [e.tokenizer], e.start && (e.level === "block" ? t.startBlock ? t.startBlock.push(e.start) : t.startBlock = [e.start] : e.level === "inline" && (t.startInline ? t.startInline.push(e.start) : t.startInline = [e.start]));
				}
				"childTokens" in e && e.childTokens && (t.childTokens[e.name] = e.childTokens);
			}), n.extensions = t), e.renderer) {
				let t = this.defaults.renderer || new qt(this.defaults);
				for (let n in e.renderer) {
					if (!(n in t)) throw Error(`renderer '${n}' does not exist`);
					if (["options", "parser"].includes(n)) continue;
					let r = n, i = e.renderer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n || "";
					};
				}
				n.renderer = t;
			}
			if (e.tokenizer) {
				let t = this.defaults.tokenizer || new Gt(this.defaults);
				for (let n in e.tokenizer) {
					if (!(n in t)) throw Error(`tokenizer '${n}' does not exist`);
					if ([
						"options",
						"rules",
						"lexer"
					].includes(n)) continue;
					let r = n, i = e.tokenizer[r], a = t[r];
					t[r] = (...e) => {
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.tokenizer = t;
			}
			if (e.hooks) {
				let t = this.defaults.hooks || new Xt();
				for (let n in e.hooks) {
					if (!(n in t)) throw Error(`hook '${n}' does not exist`);
					if (["options", "block"].includes(n)) continue;
					let r = n, i = e.hooks[r], a = t[r];
					Xt.passThroughHooks.has(n) ? t[r] = (e) => {
						if (this.defaults.async && Xt.passThroughHooksRespectAsync.has(n)) return (async () => {
							let n = await i.call(t, e);
							return a.call(t, n);
						})();
						let r = i.call(t, e);
						return a.call(t, r);
					} : t[r] = (...e) => {
						if (this.defaults.async) return (async () => {
							let n = await i.apply(t, e);
							return n === !1 && (n = await a.apply(t, e)), n;
						})();
						let n = i.apply(t, e);
						return n === !1 && (n = a.apply(t, e)), n;
					};
				}
				n.hooks = t;
			}
			if (e.walkTokens) {
				let t = this.defaults.walkTokens, r = e.walkTokens;
				n.walkTokens = function(e) {
					let n = [];
					return n.push(r.call(this, e)), t && (n = n.concat(t.call(this, e))), n;
				};
			}
			this.defaults = {
				...this.defaults,
				...n
			};
		}), this;
	}
	setOptions(e) {
		return this.defaults = {
			...this.defaults,
			...e
		}, this;
	}
	lexer(e, t) {
		return Kt.lex(e, t ?? this.defaults);
	}
	parser(e, t) {
		return Yt.parse(e, t ?? this.defaults);
	}
	parseMarkdown(e) {
		return (t, n) => {
			let r = { ...n }, i = {
				...this.defaults,
				...r
			}, a = this.onError(!!i.silent, !!i.async);
			if (this.defaults.async === !0 && r.async === !1) return a(/* @__PURE__ */ Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
			if (typeof t > "u" || t === null) return a(/* @__PURE__ */ Error("marked(): input parameter is undefined or null"));
			if (typeof t != "string") return a(/* @__PURE__ */ Error("marked(): input parameter is of type " + Object.prototype.toString.call(t) + ", string expected"));
			if (i.hooks && (i.hooks.options = i, i.hooks.block = e), i.async) return (async () => {
				let n = i.hooks ? await i.hooks.preprocess(t) : t, r = await (i.hooks ? await i.hooks.provideLexer(e) : e ? Kt.lex : Kt.lexInline)(n, i), a = i.hooks ? await i.hooks.processAllTokens(r) : r;
				i.walkTokens && await Promise.all(this.walkTokens(a, i.walkTokens));
				let o = await (i.hooks ? await i.hooks.provideParser(e) : e ? Yt.parse : Yt.parseInline)(a, i);
				return i.hooks ? await i.hooks.postprocess(o) : o;
			})().catch(a);
			try {
				i.hooks && (t = i.hooks.preprocess(t));
				let n = (i.hooks ? i.hooks.provideLexer(e) : e ? Kt.lex : Kt.lexInline)(t, i);
				i.hooks && (n = i.hooks.processAllTokens(n)), i.walkTokens && this.walkTokens(n, i.walkTokens);
				let r = (i.hooks ? i.hooks.provideParser(e) : e ? Yt.parse : Yt.parseInline)(n, i);
				return i.hooks && (r = i.hooks.postprocess(r)), r;
			} catch (e) {
				return a(e);
			}
		};
	}
	onError(e, t) {
		return (n) => {
			if (n.message += "\nPlease report this to https://github.com/markedjs/marked.", e) {
				let e = "<p>An error occurred:</p><pre>" + It(n.message + "", !0) + "</pre>";
				return t ? Promise.resolve(e) : e;
			}
			if (t) return Promise.reject(n);
			throw n;
		};
	}
}();
function F(e, t) {
	return Zt.parse(e, t);
}
F.options = F.setOptions = function(e) {
	return Zt.setOptions(e), F.defaults = Zt.defaults, Se(F.defaults), F;
}, F.getDefaults = be, F.defaults = xe, F.use = function(...e) {
	return Zt.use(...e), F.defaults = Zt.defaults, Se(F.defaults), F;
}, F.walkTokens = function(e, t) {
	return Zt.walkTokens(e, t);
}, F.parseInline = Zt.parseInline, F.Parser = Yt, F.parser = Yt.parse, F.Renderer = qt, F.TextRenderer = Jt, F.Lexer = Kt, F.lexer = Kt.lex, F.Tokenizer = Gt, F.Hooks = Xt, F.parse = F, F.options, F.setOptions, F.use, F.walkTokens, F.parseInline, Yt.parse, Kt.lex;
//#endregion
//#region node_modules/stylis/src/Enum.js
var Qt = "comm", $t = "rule", en = "decl", tn = "@import", nn = "@namespace", rn = "@keyframes", an = "@layer", on = Math.abs, sn = String.fromCharCode;
function cn(e) {
	return e.trim();
}
function ln(e, t, n) {
	return e.replace(t, n);
}
function un(e, t) {
	return e.charCodeAt(t) | 0;
}
function dn(e, t, n) {
	return e.slice(t, n);
}
function fn(e) {
	return e.length;
}
function pn(e) {
	return e.length;
}
function mn(e, t) {
	return t.push(e), e;
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var hn = 1, gn = 1, _n = 0, vn = 0, yn = 0, bn = "";
function xn(e, t, n, r, i, a, o, s) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: hn,
		column: gn,
		length: o,
		return: "",
		siblings: s
	};
}
function Sn() {
	return yn;
}
function Cn() {
	return yn = vn > 0 ? un(bn, --vn) : 0, gn--, yn === 10 && (gn = 1, hn--), yn;
}
function wn() {
	return yn = vn < _n ? un(bn, vn++) : 0, gn++, yn === 10 && (gn = 1, hn++), yn;
}
function Tn() {
	return un(bn, vn);
}
function En() {
	return vn;
}
function Dn(e, t) {
	return dn(bn, e, t);
}
function On(e) {
	switch (e) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
function kn(e) {
	return hn = gn = 1, _n = fn(bn = e), vn = 0, [];
}
function An(e) {
	return bn = "", e;
}
function jn(e) {
	return cn(Dn(vn - 1, Pn(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Mn(e) {
	for (; (yn = Tn()) && yn < 33;) wn();
	return On(e) > 2 || On(yn) > 3 ? "" : " ";
}
function Nn(e, t) {
	for (; --t && wn() && !(yn < 48 || yn > 102 || yn > 57 && yn < 65 || yn > 70 && yn < 97););
	return Dn(e, En() + (t < 6 && Tn() == 32 && wn() == 32));
}
function Pn(e) {
	for (; wn();) switch (yn) {
		case e: return vn;
		case 34:
		case 39:
			e !== 34 && e !== 39 && Pn(yn);
			break;
		case 40:
			e === 41 && Pn(e);
			break;
		case 92:
			wn();
			break;
	}
	return vn;
}
function Fn(e, t) {
	for (; wn() && e + yn !== 57 && !(e + yn === 84 && Tn() === 47););
	return "/*" + Dn(t, vn - 1) + "*" + sn(e === 47 ? e : wn());
}
function In(e) {
	for (; !On(Tn());) wn();
	return Dn(e, vn);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function Ln(e) {
	return An(Rn("", null, null, null, [""], e = kn(e), 0, [0], e));
}
function Rn(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = 0, b = "", x = i, S = a, C = r, w = b; g;) switch (m = y, y = wn()) {
		case 40:
			m != 108 && un(w, d - 1) == 58 ? (v++, w += "(") : w += jn(y);
			break;
		case 41:
			v--, w += ")";
			break;
		case 34:
		case 39:
		case 91:
			w += jn(y);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			if (v > 0) {
				w += sn(y);
				break;
			}
			w += Mn(m);
			break;
		case 92:
			w += Nn(En() - 1, 7);
			continue;
		case 47:
			switch (Tn()) {
				case 42:
				case 47:
					mn(Bn(Fn(wn(), En()), t, n, c), c), (On(m || 1) == 5 || On(Tn() || 1) == 5) && fn(w) && dn(w, -1, void 0) !== " " && (w += " ");
					break;
				default: w += "/";
			}
			break;
		case 123 * h: s[l++] = fn(w) * _;
		case 125 * h:
		case 59:
		case 0:
			if (v > 0 && y) {
				w += sn(y);
				break;
			}
			switch (y) {
				case 0:
				case 125: g = 0;
				case 59 + u:
					_ == -1 && (w = ln(w, /\f/g, "")), p > 0 && (fn(w) - d || h === 0) && mn(p > 32 ? Vn(w + ";", r, n, d - 1, c) : Vn(ln(w, " ", "") + ";", r, n, d - 2, c), c);
					break;
				case 59: w += ";";
				default: if (mn(C = zn(w, t, n, l, u, i, s, b, x = [], S = [], d, a), a), y === 123) if (u === 0) Rn(w, t, C, C, x, a, d, s, S);
				else {
					switch (f) {
						case 99: if (un(w, 3) === 110) break;
						case 108: if (un(w, 2) === 97) break;
						default: u = 0;
						case 100:
						case 109:
						case 115:
					}
					u ? Rn(e, C, C, r && mn(zn(e, C, C, 0, 0, i, s, b, i, x = [], d, S), S), i, S, d, s, r ? x : S) : Rn(w, C, C, C, [""], S, 0, s, S);
				}
			}
			l = u = p = 0, h = _ = 1, b = w = "", d = o;
			break;
		case 58: d = 1 + fn(w), p = m;
		default:
			if (h < 1) {
				if (y == 123) --h;
				else if (y == 125 && h++ == 0 && Cn() == 125) continue;
			}
			switch (w += sn(y), y * h) {
				case 38:
					_ = u > 0 ? 1 : (w += "\f", -1);
					break;
				case 44:
					if (v > 0) break;
					s[l++] = (fn(w) - 1) * _, _ = 1;
					break;
				case 64:
					Tn() === 45 && (w += jn(wn())), f = Tn(), u = d = fn(b = w += In(En())), y++;
					break;
				case 45: m === 45 && fn(w) == 2 && (h = 0);
			}
	}
	return a;
}
function zn(e, t, n, r, i, a, o, s, c, l, u, d) {
	for (var f = i - 1, p = i === 0 ? a : [""], m = pn(p), h = 0, g = 0, _ = 0; h < r; ++h) for (var v = 0, y = dn(e, f + 1, f = on(g = o[h])), b = e; v < m; ++v) (b = cn(g > 0 ? p[v] + " " + y : ln(y, /&\f/g, p[v]))) && (c[_++] = b);
	return xn(e, t, n, i === 0 ? $t : s, c, l, u, d);
}
function Bn(e, t, n, r) {
	return xn(e, t, n, Qt, sn(Sn()), dn(e, 2, -2), 0, r);
}
function Vn(e, t, n, r, i) {
	return xn(e, t, n, en, dn(e, 0, r), dn(e, r + 1, -1), r, i);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function Hn(e, t) {
	for (var n = "", r = 0; r < e.length; r++) n += t(e[r], r, e, t) || "";
	return n;
}
function Un(e, t, n, r) {
	switch (e.type) {
		case an: if (e.children.length) break;
		case tn:
		case nn:
		case en: return e.return = e.return || e.value;
		case Qt: return "";
		case rn: return e.return = e.value + "{" + Hn(e.children, r) + "}";
		case $t: if (!fn(e.value = e.props.join(","))) return "";
	}
	return fn(n = Hn(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region node_modules/mermaid/dist/mermaid.core.mjs
var Wn = "c4", Gn = {
	id: Wn,
	detector: /* @__PURE__ */ o((e) => /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./c4Diagram-YG6GDRKO-DUj9Nrez.js");
		return {
			id: Wn,
			diagram: e
		};
	}, "loader")
}, Kn = "flowchart", qn = {
	id: Kn,
	detector: /* @__PURE__ */ o((e, t) => t?.flowchart?.defaultRenderer === "dagre-wrapper" || t?.flowchart?.defaultRenderer === "elk" ? !1 : /^\s*graph/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./flowDiagram-NV44I4VS-CVSbvIN7.js");
		return {
			id: Kn,
			diagram: e
		};
	}, "loader")
}, Jn = "flowchart-v2", Yn = {
	id: Jn,
	detector: /* @__PURE__ */ o((e, t) => t?.flowchart?.defaultRenderer === "dagre-d3" ? !1 : (t?.flowchart?.defaultRenderer === "elk" && (t.layout = "elk"), /^\s*graph/.test(e) && t?.flowchart?.defaultRenderer === "dagre-wrapper" ? !0 : /^\s*flowchart/.test(e)), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./flowDiagram-NV44I4VS-CVSbvIN7.js");
		return {
			id: Jn,
			diagram: e
		};
	}, "loader")
}, Xn = "er", Zn = {
	id: Xn,
	detector: /* @__PURE__ */ o((e) => /^\s*erDiagram/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./erDiagram-Q2GNP2WA-DwKmMoM5.js");
		return {
			id: Xn,
			diagram: e
		};
	}, "loader")
}, Qn = "gitGraph", $n = {
	id: Qn,
	detector: /* @__PURE__ */ o((e) => /^\s*gitGraph/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./gitGraphDiagram-NY62KEGX-CqP1AcKX.js");
		return {
			id: Qn,
			diagram: e
		};
	}, "loader")
}, er = "gantt", tr = {
	id: er,
	detector: /* @__PURE__ */ o((e) => /^\s*gantt/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./ganttDiagram-LVOFAZNH-BmqJJ-NL.js");
		return {
			id: er,
			diagram: e
		};
	}, "loader")
}, nr = "info", rr = {
	id: nr,
	detector: /* @__PURE__ */ o((e) => /^\s*info/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./infoDiagram-F6ZHWCRC-DGRWvZIR.js");
		return {
			id: nr,
			diagram: e
		};
	}, "loader")
}, ir = "pie", ar = {
	id: ir,
	detector: /* @__PURE__ */ o((e) => /^\s*pie/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./pieDiagram-ADFJNKIX-D9cZ-914.js");
		return {
			id: ir,
			diagram: e
		};
	}, "loader")
}, or = "quadrantChart", sr = {
	id: or,
	detector: /* @__PURE__ */ o((e) => /^\s*quadrantChart/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./quadrantDiagram-AYHSOK5B-BfWpwEj_.js");
		return {
			id: or,
			diagram: e
		};
	}, "loader")
}, cr = "xychart", lr = {
	id: cr,
	detector: /* @__PURE__ */ o((e) => /^\s*xychart(-beta)?/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./xychartDiagram-PRI3JC2R-D0QW9OM8.js");
		return {
			id: cr,
			diagram: e
		};
	}, "loader")
}, ur = "requirement", dr = {
	id: ur,
	detector: /* @__PURE__ */ o((e) => /^\s*requirement(Diagram)?/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./requirementDiagram-UZGBJVZJ-Bl6Vci1t.js");
		return {
			id: ur,
			diagram: e
		};
	}, "loader")
}, fr = "sequence", pr = {
	id: fr,
	detector: /* @__PURE__ */ o((e) => /^\s*sequenceDiagram/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./sequenceDiagram-WL72ISMW-BfSpOyat.js");
		return {
			id: fr,
			diagram: e
		};
	}, "loader")
}, mr = "class", hr = {
	id: mr,
	detector: /* @__PURE__ */ o((e, t) => t?.class?.defaultRenderer !== "dagre-wrapper" && /^\s*classDiagram/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./classDiagram-2ON5EDUG-BH36Jhev.js");
		return {
			id: mr,
			diagram: e
		};
	}, "loader")
}, gr = "classDiagram", _r = {
	id: gr,
	detector: /* @__PURE__ */ o((e, t) => /^\s*classDiagram/.test(e) && t?.class?.defaultRenderer === "dagre-wrapper" ? !0 : /^\s*classDiagram-v2/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./classDiagram-v2-WZHVMYZB-Bc09K83G.js");
		return {
			id: gr,
			diagram: e
		};
	}, "loader")
}, vr = "state", yr = {
	id: vr,
	detector: /* @__PURE__ */ o((e, t) => t?.state?.defaultRenderer !== "dagre-wrapper" && /^\s*stateDiagram/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./stateDiagram-FKZM4ZOC-B2fLVxpw.js");
		return {
			id: vr,
			diagram: e
		};
	}, "loader")
}, br = "stateDiagram", xr = {
	id: br,
	detector: /* @__PURE__ */ o((e, t) => !!(/^\s*stateDiagram-v2/.test(e) || /^\s*stateDiagram/.test(e) && t?.state?.defaultRenderer === "dagre-wrapper"), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./stateDiagram-v2-4FDKWEC3-CYGzacu5.js");
		return {
			id: br,
			diagram: e
		};
	}, "loader")
}, Sr = "journey", Cr = {
	id: Sr,
	detector: /* @__PURE__ */ o((e) => /^\s*journey/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./journeyDiagram-XKPGCS4Q-C444Waq3.js");
		return {
			id: Sr,
			diagram: e
		};
	}, "loader")
}, wr = { draw: /* @__PURE__ */ o((e, t, n) => {
	a.debug("rendering svg for syntax error\n");
	let r = ae(t), i = r.append("g");
	r.attr("viewBox", "0 0 2412 512"), _(r, 100, 512, !0), i.append("path").attr("class", "error-icon").attr("d", "m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"), i.append("path").attr("class", "error-icon").attr("d", "m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"), i.append("path").attr("class", "error-icon").attr("d", "m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"), i.append("path").attr("class", "error-icon").attr("d", "m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"), i.append("path").attr("class", "error-icon").attr("d", "m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"), i.append("path").attr("class", "error-icon").attr("d", "m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"), i.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in text"), i.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text(`mermaid version ${n}`);
}, "draw") }, Tr = wr, Er = {
	db: {},
	renderer: wr,
	parser: { parse: /* @__PURE__ */ o(() => {}, "parse") }
}, Dr = "flowchart-elk", Or = {
	id: Dr,
	detector: /* @__PURE__ */ o((e, t = {}) => /^\s*flowchart-elk/.test(e) || /^\s*(flowchart|graph)/.test(e) && t?.flowchart?.defaultRenderer === "elk" ? (t.layout = "elk", !0) : !1, "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./flowDiagram-NV44I4VS-CVSbvIN7.js");
		return {
			id: Dr,
			diagram: e
		};
	}, "loader")
}, kr = "timeline", Ar = {
	id: kr,
	detector: /* @__PURE__ */ o((e) => /^\s*timeline/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./timeline-definition-IT6M3QCI-HXdkOaN2.js");
		return {
			id: kr,
			diagram: e
		};
	}, "loader")
}, jr = "mindmap", Mr = {
	id: jr,
	detector: /* @__PURE__ */ o((e) => /^\s*mindmap/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./mindmap-definition-VGOIOE7T-BNtxI6Wd.js");
		return {
			id: jr,
			diagram: e
		};
	}, "loader")
}, Nr = "kanban", Pr = {
	id: Nr,
	detector: /* @__PURE__ */ o((e) => /^\s*kanban/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./kanban-definition-3W4ZIXB7-CXaqcH5p.js");
		return {
			id: Nr,
			diagram: e
		};
	}, "loader")
}, Fr = "sankey", Ir = {
	id: Fr,
	detector: /* @__PURE__ */ o((e) => /^\s*sankey(-beta)?/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./sankeyDiagram-TZEHDZUN-DRBtADa9.js");
		return {
			id: Fr,
			diagram: e
		};
	}, "loader")
}, Lr = "packet", Rr = {
	id: Lr,
	detector: /* @__PURE__ */ o((e) => /^\s*packet(-beta)?/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./diagram-S2PKOQOG-B0lfZoPs.js");
		return {
			id: Lr,
			diagram: e
		};
	}, "loader")
}, zr = "radar", Br = {
	id: zr,
	detector: /* @__PURE__ */ o((e) => /^\s*radar-beta/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./diagram-QEK2KX5R-DG2HuV0w.js");
		return {
			id: zr,
			diagram: e
		};
	}, "loader")
}, Vr = "block", Hr = {
	id: Vr,
	detector: /* @__PURE__ */ o((e) => /^\s*block(-beta)?/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./blockDiagram-VD42YOAC-CmCUkqCD.js");
		return {
			id: Vr,
			diagram: e
		};
	}, "loader")
}, Ur = "architecture", Wr = {
	id: Ur,
	detector: /* @__PURE__ */ o((e) => /^\s*architecture/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./architectureDiagram-VXUJARFQ-BSmNNANw.js");
		return {
			id: Ur,
			diagram: e
		};
	}, "loader")
}, Gr = "treemap", Kr = {
	id: Gr,
	detector: /* @__PURE__ */ o((e) => /^\s*treemap/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./diagram-PSM6KHXK-CbLtQDqp.js");
		return {
			id: Gr,
			diagram: e
		};
	}, "loader")
}, qr = !1, Jr = /* @__PURE__ */ o(() => {
	qr || (qr = !0, x("error", Er, (e) => e.toLowerCase().trim() === "error"), x("---", {
		db: { clear: /* @__PURE__ */ o(() => {}, "clear") },
		styles: {},
		renderer: { draw: /* @__PURE__ */ o(() => {}, "draw") },
		parser: { parse: /* @__PURE__ */ o(() => {
			throw Error("Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks");
		}, "parse") },
		init: /* @__PURE__ */ o(() => null, "init")
	}, (e) => e.toLowerCase().trimStart().startsWith("---")), l(Or, Mr, Wr), l(Gn, Pr, _r, hr, Zn, tr, rr, ar, dr, pr, Yn, qn, Ar, $n, xr, yr, Cr, sr, Ir, Rr, lr, Hr, Br, Kr));
}, "addDiagrams"), Yr = /* @__PURE__ */ o(async () => {
	a.debug("Loading registered diagrams");
	let e = (await Promise.allSettled(Object.entries(w).map(async ([e, { detector: t, loader: n }]) => {
		if (n) try {
			O(e);
		} catch {
			try {
				let { diagram: e, id: r } = await n();
				x(r, e, t);
			} catch (t) {
				throw a.error(`Failed to load external diagram with key ${e}. Removing from detectors.`), delete w[e], t;
			}
		}
	}))).filter((e) => e.status === "rejected");
	if (e.length > 0) {
		a.error(`Failed to load ${e.length} external diagrams`);
		for (let t of e) a.error(t);
		throw Error(`Failed to load ${e.length} external diagrams`);
	}
}, "loadRegisteredDiagrams"), Xr = "graphics-document document";
function Zr(e, t) {
	e.attr("role", Xr), t !== "" && e.attr("aria-roledescription", t);
}
o(Zr, "setA11yDiagramInfo");
function Qr(e, t, n, r) {
	if (e.insert !== void 0) {
		if (n) {
			let t = `chart-desc-${r}`;
			e.attr("aria-describedby", t), e.insert("desc", ":first-child").attr("id", t).text(n);
		}
		if (t) {
			let n = `chart-title-${r}`;
			e.attr("aria-labelledby", n), e.insert("title", ":first-child").attr("id", n).text(t);
		}
	}
}
o(Qr, "addSVGa11yTitleDescription");
var $r = class e {
	constructor(e, t, n, r, i) {
		this.type = e, this.text = t, this.db = n, this.parser = r, this.renderer = i;
	}
	static {
		o(this, "Diagram");
	}
	static async fromText(t, n = {}) {
		let r = k(), i = v(t, r);
		t = te(t) + "\n";
		try {
			O(i);
		} catch {
			let e = f(i);
			if (!e) throw new ee(`Diagram ${i} not found.`);
			let { id: t, diagram: n } = await e();
			x(t, n);
		}
		let { db: a, parser: o, renderer: s, init: c } = O(i);
		return o.parser && (o.parser.yy = a), a.clear?.(), c?.(r), n.title && a.setDiagramTitle?.(n.title), await o.parse(t), new e(i, t, a, o, s);
	}
	async render(e, t) {
		await this.renderer.draw(this.text, e, t, this);
	}
	getParser() {
		return this.parser;
	}
	getType() {
		return this.type;
	}
}, ei = [], ti = /* @__PURE__ */ o(() => {
	ei.forEach((e) => {
		e();
	}), ei = [];
}, "attachFunctions"), ni = /* @__PURE__ */ o((e) => e.replace(/^\s*%%(?!{)[^\n]+\n?/gm, "").trimStart(), "cleanupComments");
function ri(e) {
	let t = e.match(y);
	if (!t) return {
		text: e,
		metadata: {}
	};
	let n = oe(t[1], { schema: se }) ?? {};
	n = typeof n == "object" && !Array.isArray(n) ? n : {};
	let r = {};
	return n.displayMode && (r.displayMode = n.displayMode.toString()), n.title && (r.title = n.title.toString()), n.config && (r.config = n.config), {
		text: e.slice(t[0].length),
		metadata: r
	};
}
o(ri, "extractFrontMatter");
var ii = /* @__PURE__ */ o((e) => e.replace(/\r\n?/g, "\n").replace(/<(\w+)([^>]*)>/g, (e, t, n) => "<" + t + n.replace(/="([^"]*)"/g, "='$1'") + ">"), "cleanupText"), ai = /* @__PURE__ */ o((e) => {
	let { text: t, metadata: n } = ri(e), { displayMode: r, title: i, config: a = {} } = n;
	return r && (a.gantt ||= {}, a.gantt.displayMode = r), {
		title: i,
		config: a,
		text: t
	};
}, "processFrontmatter"), oi = /* @__PURE__ */ o((e) => {
	let t = A.detectInit(e) ?? {}, n = A.detectDirective(e, "wrap");
	return Array.isArray(n) ? t.wrap = n.some(({ type: e }) => e === "wrap") : n?.type === "wrap" && (t.wrap = !0), {
		text: re(e),
		directive: t
	};
}, "processDirectives");
function si(e) {
	let t = ai(ii(e)), n = oi(t.text), r = ie(t.config, n.directive);
	return e = ni(n.text), {
		code: e,
		title: t.title,
		config: r
	};
}
o(si, "preprocessDiagram");
function ci(e) {
	let t = new TextEncoder().encode(e), n = Array.from(t, (e) => String.fromCodePoint(e)).join("");
	return btoa(n);
}
o(ci, "toBase64");
var li = 5e4, ui = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa", di = "sandbox", fi = "loose", pi = "http://www.w3.org/2000/svg", mi = "http://www.w3.org/1999/xlink", hi = "http://www.w3.org/1999/xhtml", gi = "100%", _i = "100%", vi = "border:0;margin:0;", yi = "margin:0", bi = "allow-top-navigation-by-user-activation allow-popups", xi = "The \"iframe\" tag is not supported by your browser.", Si = ["foreignobject"], Ci = ["dominant-baseline"];
function wi(e) {
	let t = si(e);
	return u(), C(t.config ?? {}), t;
}
o(wi, "processAndSetConfigs");
async function Ti(e, t) {
	Jr();
	try {
		let { code: t, config: n } = wi(e);
		return {
			diagramType: (await Ii(t)).type,
			config: n
		};
	} catch (e) {
		if (t?.suppressErrors) return !1;
		throw e;
	}
}
o(Ti, "parse");
var Ei = /* @__PURE__ */ o((e, t, n = []) => `
.${e} ${t} { ${n.join(" !important; ")} !important; }`, "cssImportantStyles"), Di = /* @__PURE__ */ o((e, t = /* @__PURE__ */ new Map()) => {
	let n = "";
	if (e.themeCSS !== void 0 && (n += `
${e.themeCSS}`), e.fontFamily !== void 0 && (n += `
:root { --mermaid-font-family: ${e.fontFamily}}`), e.altFontFamily !== void 0 && (n += `
:root { --mermaid-alt-font-family: ${e.altFontFamily}}`), t instanceof Map) {
		let r = e.htmlLabels ?? e.flowchart?.htmlLabels ? ["> *", "span"] : [
			"rect",
			"polygon",
			"ellipse",
			"circle",
			"path"
		];
		t.forEach((e) => {
			ue(e.styles) || r.forEach((t) => {
				n += Ei(e.id, t, e.styles);
			}), ue(e.textStyles) || (n += Ei(e.id, "tspan", (e?.textStyles || []).map((e) => e.replace("color", "fill"))));
		});
	}
	return n;
}, "createCssStyles"), Oi = /* @__PURE__ */ o((e, t, n, r) => Hn(Ln(`${r}{${T(t, Di(e, n), e.themeVariables)}}`), Un), "createUserStyles"), ki = /* @__PURE__ */ o((e = "", t, n) => {
	let r = e;
	return !n && !t && (r = r.replace(/marker-end="url\([\d+./:=?A-Za-z-]*?#/g, "marker-end=\"url(#")), r = j(r), r = r.replace(/<br>/g, "<br/>"), r;
}, "cleanUpSvgCode"), Ai = /* @__PURE__ */ o((e = "", t) => `<iframe style="width:${gi};height:${t?.viewBox?.baseVal?.height ? t.viewBox.baseVal.height + "px" : _i};${vi}" src="data:text/html;charset=UTF-8;base64,${ci(`<body style="${yi}">${e}</body>`)}" sandbox="${bi}">
  ${xi}
</iframe>`, "putIntoIFrame"), ji = /* @__PURE__ */ o((e, t, n, r, i) => {
	let a = e.append("div");
	a.attr("id", n), r && a.attr("style", r);
	let o = a.append("svg").attr("id", t).attr("width", "100%").attr("xmlns", pi);
	return i && o.attr("xmlns:xlink", i), o.append("g"), e;
}, "appendDivSvgG");
function Mi(e, t) {
	return e.append("iframe").attr("id", t).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
o(Mi, "sandboxedIframe");
var Ni = /* @__PURE__ */ o((e, t, n, r) => {
	e.getElementById(t)?.remove(), e.getElementById(n)?.remove(), e.getElementById(r)?.remove();
}, "removeExistingElements"), Pi = /* @__PURE__ */ o(async function(e, t, n) {
	Jr();
	let i = wi(t);
	t = i.code;
	let c = k();
	a.debug(c), t.length > (c?.maxTextSize ?? li) && (t = ui);
	let l = "#" + e, u = "i" + e, d = "#" + u, f = "d" + e, p = "#" + f, m = /* @__PURE__ */ o(() => {
		let e = s(_ ? d : p).node();
		e && "remove" in e && e.remove();
	}, "removeTempElements"), g = s("body"), _ = c.securityLevel === di, v = c.securityLevel === fi, y = c.fontFamily;
	n === void 0 ? (Ni(document, e, f, u), _ ? (g = s(Mi(s("body"), u).nodes()[0].contentDocument.body), g.node().style.margin = 0) : g = s("body"), ji(g, e, f)) : (n && (n.innerHTML = ""), _ ? (g = s(Mi(s(n), u).nodes()[0].contentDocument.body), g.node().style.margin = 0) : g = s(n), ji(g, e, f, `font-family: ${y}`, mi));
	let x, S;
	try {
		x = await $r.fromText(t, { title: i.title });
	} catch (e) {
		if (c.suppressErrorRendering) throw m(), e;
		x = await $r.fromText("error"), S = e;
	}
	let C = g.select(p).node(), w = x.type, T = C.firstChild, E = T.firstChild, ee = x.renderer.getClasses?.(t, x), D = Oi(c, w, ee, l), O = document.createElement("style");
	O.innerHTML = D, T.insertBefore(O, E);
	try {
		await x.renderer.draw(t, e, r.version, x);
	} catch (n) {
		throw c.suppressErrorRendering ? m() : Tr.draw(t, e, r.version), n;
	}
	let te = g.select(`${p} svg`), ne = x.db.getAccTitle?.(), A = x.db.getAccDescription?.();
	Li(w, te, ne, A), g.select(`[id="${e}"]`).selectAll("foreignobject > *").attr("xmlns", hi);
	let j = g.select(p).node().innerHTML;
	if (a.debug("config.arrowMarkerAbsolute", c.arrowMarkerAbsolute), j = ki(j, _, b(c.arrowMarkerAbsolute)), _) {
		let e = g.select(p + " svg").node();
		j = Ai(j, e);
	} else v || (j = h.sanitize(j, {
		ADD_TAGS: Si,
		ADD_ATTR: Ci,
		HTML_INTEGRATION_POINTS: { foreignobject: !0 }
	}));
	if (ti(), S) throw S;
	return m(), {
		diagramType: w,
		svg: j,
		bindFunctions: x.db.bindFunctions
	};
}, "render");
function Fi(e = {}) {
	let t = E({}, e);
	t?.fontFamily && !t.themeVariables?.fontFamily && (t.themeVariables ||= {}, t.themeVariables.fontFamily = t.fontFamily), d(t), t?.theme && t.theme in c ? t.themeVariables = c[t.theme].getThemeVariables(t.themeVariables) : t && (t.themeVariables = c.default.getThemeVariables(t.themeVariables)), i((typeof t == "object" ? m(t) : D()).logLevel), Jr();
}
o(Fi, "initialize");
var Ii = /* @__PURE__ */ o((e, t = {}) => {
	let { code: n } = si(e);
	return $r.fromText(n, t);
}, "getDiagramFromText");
function Li(e, t, n, r) {
	Zr(t, e), Qr(t, n, r, t.attr("id"));
}
o(Li, "addA11yInfo");
var I = Object.freeze({
	render: Pi,
	parse: Ti,
	getDiagramFromText: Ii,
	initialize: Fi,
	getConfig: k,
	setConfig: p,
	getSiteConfig: D,
	updateSiteConfig: g,
	reset: /* @__PURE__ */ o(() => {
		u();
	}, "reset"),
	globalReset: /* @__PURE__ */ o(() => {
		u(S);
	}, "globalReset"),
	defaultConfig: S
});
i(k().logLevel), u(k());
var Ri = /* @__PURE__ */ o((e, t, n) => {
	a.warn(e), ne(e) ? (n && n(e.str, e.hash), t.push({
		...e,
		message: e.str,
		error: e
	})) : (n && n(e), e instanceof Error && t.push({
		str: e.message,
		message: e.message,
		hash: e.name,
		error: e
	}));
}, "handleError"), zi = /* @__PURE__ */ o(async function(e = { querySelector: ".mermaid" }) {
	try {
		await Bi(e);
	} catch (t) {
		if (ne(t) && a.error(t.str), Zi.parseError && Zi.parseError(t), !e.suppressErrors) throw a.error("Use the suppressErrors option to suppress these errors"), t;
	}
}, "run"), Bi = /* @__PURE__ */ o(async function({ postRenderCallback: e, querySelector: t, nodes: n } = { querySelector: ".mermaid" }) {
	let r = I.getConfig();
	a.debug(`${e ? "" : "No "}Callback function found`);
	let i;
	if (n) i = n;
	else if (t) i = document.querySelectorAll(t);
	else throw Error("Nodes and querySelector are both undefined");
	a.debug(`Found ${i.length} diagrams`), r?.startOnLoad !== void 0 && (a.debug("Start On Load: " + r?.startOnLoad), I.updateSiteConfig({ startOnLoad: r?.startOnLoad }));
	let o = new A.InitIDGenerator(r.deterministicIds, r.deterministicIDSeed), s, c = [];
	for (let t of Array.from(i)) {
		if (a.info("Rendering diagram: " + t.id), t.getAttribute("data-processed")) continue;
		t.setAttribute("data-processed", "true");
		let n = `mermaid-${o.next()}`;
		s = t.innerHTML, s = ce(A.entityDecode(s)).trim().replace(/<br\s*\/?>/gi, "<br/>");
		let r = A.detectInit(s);
		r && a.debug("Detected early reinit: ", r);
		try {
			let { svg: r, bindFunctions: i } = await Xi(n, s, t);
			t.innerHTML = r, e && await e(n), i && i(t);
		} catch (e) {
			Ri(e, c, Zi.parseError);
		}
	}
	if (c.length > 0) throw c[0];
}, "runThrowsErrors"), Vi = /* @__PURE__ */ o(function(e) {
	I.initialize(e);
}, "initialize"), Hi = /* @__PURE__ */ o(async function(e, t, n) {
	a.warn("mermaid.init is deprecated. Please use run instead."), e && Vi(e);
	let r = {
		postRenderCallback: n,
		querySelector: ".mermaid"
	};
	typeof t == "string" ? r.querySelector = t : t && (t instanceof HTMLElement ? r.nodes = [t] : r.nodes = t), await zi(r);
}, "init"), Ui = /* @__PURE__ */ o(async (e, { lazyLoad: t = !0 } = {}) => {
	Jr(), l(...e), t === !1 && await Yr();
}, "registerExternalDiagrams"), Wi = /* @__PURE__ */ o(function() {
	if (Zi.startOnLoad) {
		let { startOnLoad: e } = I.getConfig();
		e && Zi.run().catch((e) => a.error("Mermaid failed to initialize", e));
	}
}, "contentLoaded");
typeof document < "u" && window.addEventListener("load", Wi, !1);
var Gi = /* @__PURE__ */ o(function(e) {
	Zi.parseError = e;
}, "setParseErrorHandler"), Ki = [], qi = !1, Ji = /* @__PURE__ */ o(async () => {
	if (!qi) {
		for (qi = !0; Ki.length > 0;) {
			let e = Ki.shift();
			if (e) try {
				await e();
			} catch (e) {
				a.error("Error executing queue", e);
			}
		}
		qi = !1;
	}
}, "executeQueue"), Yi = /* @__PURE__ */ o(async (e, t) => new Promise((n, r) => {
	let i = /* @__PURE__ */ o(() => new Promise((i, o) => {
		I.parse(e, t).then((e) => {
			i(e), n(e);
		}, (e) => {
			a.error("Error parsing", e), Zi.parseError?.(e), o(e), r(e);
		});
	}), "performCall");
	Ki.push(i), Ji().catch(r);
}), "parse"), Xi = /* @__PURE__ */ o((e, t, n) => new Promise((r, i) => {
	let s = /* @__PURE__ */ o(() => new Promise((o, s) => {
		I.render(e, t, n).then((e) => {
			o(e), r(e);
		}, (e) => {
			a.error("Error parsing", e), Zi.parseError?.(e), s(e), i(e);
		});
	}), "performCall");
	Ki.push(s), Ji().catch(i);
}), "render"), Zi = {
	startOnLoad: !0,
	mermaidAPI: I,
	parse: Yi,
	render: Xi,
	init: Hi,
	run: zi,
	registerExternalDiagrams: Ui,
	registerLayoutLoaders: le,
	initialize: Vi,
	parseError: void 0,
	contentLoaded: Wi,
	setParseErrorHandler: Gi,
	detectType: v,
	registerIconPacks: M,
	getRegisteredDiagramsMetadata: /* @__PURE__ */ o(() => Object.keys(w).map((e) => ({ id: e })), "getRegisteredDiagramsMetadata")
}, Qi = Zi;
//#endregion
//#region node_modules/comma-separated-tokens/index.js
function $i(e, t) {
	let n = t || {};
	return (e[e.length - 1] === "" ? [...e, ""] : e).join((n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")).trim();
}
//#endregion
//#region node_modules/estree-util-is-identifier-name/lib/index.js
var ea = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, ta = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, na = {};
function ra(e, t) {
	return ((t || na).jsx ? ta : ea).test(e);
}
//#endregion
//#region node_modules/hast-util-whitespace/lib/index.js
var ia = /[ \t\n\f\r]/g;
function aa(e) {
	return typeof e == "object" ? e.type === "text" && oa(e.value) : oa(e);
}
function oa(e) {
	return e.replace(ia, "") === "";
}
//#endregion
//#region node_modules/property-information/lib/util/schema.js
var sa = class {
	constructor(e, t, n) {
		this.normal = t, this.property = e, n && (this.space = n);
	}
};
sa.prototype.normal = {}, sa.prototype.property = {}, sa.prototype.space = void 0;
//#endregion
//#region node_modules/property-information/lib/util/merge.js
function ca(e, t) {
	let n = {}, r = {};
	for (let t of e) Object.assign(n, t.property), Object.assign(r, t.normal);
	return new sa(n, r, t);
}
//#endregion
//#region node_modules/property-information/lib/normalize.js
function la(e) {
	return e.toLowerCase();
}
//#endregion
//#region node_modules/property-information/lib/util/info.js
var L = class {
	constructor(e, t) {
		this.attribute = t, this.property = e;
	}
};
L.prototype.attribute = "", L.prototype.booleanish = !1, L.prototype.boolean = !1, L.prototype.commaOrSpaceSeparated = !1, L.prototype.commaSeparated = !1, L.prototype.defined = !1, L.prototype.mustUseProperty = !1, L.prototype.number = !1, L.prototype.overloadedBoolean = !1, L.prototype.property = "", L.prototype.spaceSeparated = !1, L.prototype.space = void 0;
//#endregion
//#region node_modules/property-information/lib/util/types.js
var ua = /* @__PURE__ */ t({
	boolean: () => R,
	booleanish: () => fa,
	commaOrSpaceSeparated: () => ga,
	commaSeparated: () => ha,
	number: () => z,
	overloadedBoolean: () => pa,
	spaceSeparated: () => ma
}), da = 0, R = _a(), fa = _a(), pa = _a(), z = _a(), ma = _a(), ha = _a(), ga = _a();
function _a() {
	return 2 ** ++da;
}
//#endregion
//#region node_modules/property-information/lib/util/defined-info.js
var va = Object.keys(ua), ya = class extends L {
	constructor(e, t, n, r) {
		let i = -1;
		if (super(e, t), ba(this, "space", r), typeof n == "number") for (; ++i < va.length;) {
			let e = va[i];
			ba(this, va[i], (n & ua[e]) === ua[e]);
		}
	}
};
ya.prototype.defined = !0;
function ba(e, t, n) {
	n && (e[t] = n);
}
//#endregion
//#region node_modules/property-information/lib/util/create.js
function xa(e) {
	let t = {}, n = {};
	for (let [r, i] of Object.entries(e.properties)) {
		let a = new ya(r, e.transform(e.attributes || {}, r), i, e.space);
		e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[la(r)] = r, n[la(a.attribute)] = r;
	}
	return new sa(t, n, e.space);
}
//#endregion
//#region node_modules/property-information/lib/aria.js
var Sa = xa({
	properties: {
		ariaActiveDescendant: null,
		ariaAtomic: fa,
		ariaAutoComplete: null,
		ariaBusy: fa,
		ariaChecked: fa,
		ariaColCount: z,
		ariaColIndex: z,
		ariaColSpan: z,
		ariaControls: ma,
		ariaCurrent: null,
		ariaDescribedBy: ma,
		ariaDetails: null,
		ariaDisabled: fa,
		ariaDropEffect: ma,
		ariaErrorMessage: null,
		ariaExpanded: fa,
		ariaFlowTo: ma,
		ariaGrabbed: fa,
		ariaHasPopup: null,
		ariaHidden: fa,
		ariaInvalid: null,
		ariaKeyShortcuts: null,
		ariaLabel: null,
		ariaLabelledBy: ma,
		ariaLevel: z,
		ariaLive: null,
		ariaModal: fa,
		ariaMultiLine: fa,
		ariaMultiSelectable: fa,
		ariaOrientation: null,
		ariaOwns: ma,
		ariaPlaceholder: null,
		ariaPosInSet: z,
		ariaPressed: fa,
		ariaReadOnly: fa,
		ariaRelevant: null,
		ariaRequired: fa,
		ariaRoleDescription: ma,
		ariaRowCount: z,
		ariaRowIndex: z,
		ariaRowSpan: z,
		ariaSelected: fa,
		ariaSetSize: z,
		ariaSort: null,
		ariaValueMax: z,
		ariaValueMin: z,
		ariaValueNow: z,
		ariaValueText: null,
		role: null
	},
	transform(e, t) {
		return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
	}
});
//#endregion
//#region node_modules/property-information/lib/util/case-sensitive-transform.js
function Ca(e, t) {
	return t in e ? e[t] : t;
}
//#endregion
//#region node_modules/property-information/lib/util/case-insensitive-transform.js
function wa(e, t) {
	return Ca(e, t.toLowerCase());
}
//#endregion
//#region node_modules/property-information/lib/html.js
var Ta = xa({
	attributes: {
		acceptcharset: "accept-charset",
		classname: "class",
		htmlfor: "for",
		httpequiv: "http-equiv"
	},
	mustUseProperty: [
		"checked",
		"multiple",
		"muted",
		"selected"
	],
	properties: {
		abbr: null,
		accept: ha,
		acceptCharset: ma,
		accessKey: ma,
		action: null,
		allow: null,
		allowFullScreen: R,
		allowPaymentRequest: R,
		allowUserMedia: R,
		alpha: R,
		alt: null,
		as: null,
		async: R,
		autoCapitalize: null,
		autoComplete: ma,
		autoFocus: R,
		autoPlay: R,
		blocking: ma,
		capture: null,
		charSet: null,
		checked: R,
		cite: null,
		className: ma,
		closedBy: null,
		colorSpace: null,
		cols: z,
		colSpan: z,
		command: null,
		commandFor: null,
		content: null,
		contentEditable: fa,
		controls: R,
		controlsList: ma,
		coords: z | ha,
		crossOrigin: null,
		data: null,
		dateTime: null,
		decoding: null,
		default: R,
		defer: R,
		dir: null,
		dirName: null,
		disabled: R,
		download: pa,
		draggable: fa,
		encType: null,
		enterKeyHint: null,
		fetchPriority: null,
		form: null,
		formAction: null,
		formEncType: null,
		formMethod: null,
		formNoValidate: R,
		formTarget: null,
		headers: ma,
		height: z,
		hidden: pa,
		high: z,
		href: null,
		hrefLang: null,
		htmlFor: ma,
		httpEquiv: ma,
		id: null,
		imageSizes: null,
		imageSrcSet: null,
		inert: R,
		inputMode: null,
		integrity: null,
		is: null,
		isMap: R,
		itemId: null,
		itemProp: ma,
		itemRef: ma,
		itemScope: R,
		itemType: ma,
		kind: null,
		label: null,
		lang: null,
		language: null,
		list: null,
		loading: null,
		loop: R,
		low: z,
		manifest: null,
		max: null,
		maxLength: z,
		media: null,
		method: null,
		min: null,
		minLength: z,
		multiple: R,
		muted: R,
		name: null,
		nonce: null,
		noModule: R,
		noValidate: R,
		onAbort: null,
		onAfterPrint: null,
		onAuxClick: null,
		onBeforeMatch: null,
		onBeforePrint: null,
		onBeforeToggle: null,
		onBeforeUnload: null,
		onBlur: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onContextLost: null,
		onContextMenu: null,
		onContextRestored: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFormData: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLanguageChange: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadEnd: null,
		onLoadStart: null,
		onMessage: null,
		onMessageError: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRejectionHandled: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onScrollEnd: null,
		onSecurityPolicyViolation: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onSlotChange: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnhandledRejection: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onWheel: null,
		open: R,
		optimum: z,
		pattern: null,
		ping: ma,
		placeholder: null,
		playsInline: R,
		popover: null,
		popoverTarget: null,
		popoverTargetAction: null,
		poster: null,
		preload: null,
		readOnly: R,
		referrerPolicy: null,
		rel: ma,
		required: R,
		reversed: R,
		rows: z,
		rowSpan: z,
		sandbox: ma,
		scope: null,
		scoped: R,
		seamless: R,
		selected: R,
		shadowRootClonable: R,
		shadowRootCustomElementRegistry: R,
		shadowRootDelegatesFocus: R,
		shadowRootMode: null,
		shadowRootSerializable: R,
		shape: null,
		size: z,
		sizes: null,
		slot: null,
		span: z,
		spellCheck: fa,
		src: null,
		srcDoc: null,
		srcLang: null,
		srcSet: null,
		start: z,
		step: null,
		style: null,
		tabIndex: z,
		target: null,
		title: null,
		translate: null,
		type: null,
		typeMustMatch: R,
		useMap: null,
		value: fa,
		width: z,
		wrap: null,
		writingSuggestions: null,
		align: null,
		aLink: null,
		archive: ma,
		axis: null,
		background: null,
		bgColor: null,
		border: z,
		borderColor: null,
		bottomMargin: z,
		cellPadding: null,
		cellSpacing: null,
		char: null,
		charOff: null,
		classId: null,
		clear: null,
		code: null,
		codeBase: null,
		codeType: null,
		color: null,
		compact: R,
		declare: R,
		event: null,
		face: null,
		frame: null,
		frameBorder: null,
		hSpace: z,
		leftMargin: z,
		link: null,
		longDesc: null,
		lowSrc: null,
		marginHeight: z,
		marginWidth: z,
		noResize: R,
		noHref: R,
		noShade: R,
		noWrap: R,
		object: null,
		profile: null,
		prompt: null,
		rev: null,
		rightMargin: z,
		rules: null,
		scheme: null,
		scrolling: fa,
		standby: null,
		summary: null,
		text: null,
		topMargin: z,
		valueType: null,
		version: null,
		vAlign: null,
		vLink: null,
		vSpace: z,
		allowTransparency: null,
		autoCorrect: null,
		autoSave: null,
		credentialless: R,
		disablePictureInPicture: R,
		disableRemotePlayback: R,
		exportParts: ha,
		part: ma,
		prefix: null,
		property: null,
		results: z,
		security: null,
		unselectable: null
	},
	space: "html",
	transform: wa
}), Ea = xa({
	attributes: {
		accentHeight: "accent-height",
		alignmentBaseline: "alignment-baseline",
		arabicForm: "arabic-form",
		baselineShift: "baseline-shift",
		capHeight: "cap-height",
		className: "class",
		clipPath: "clip-path",
		clipRule: "clip-rule",
		colorInterpolation: "color-interpolation",
		colorInterpolationFilters: "color-interpolation-filters",
		colorProfile: "color-profile",
		colorRendering: "color-rendering",
		crossOrigin: "crossorigin",
		dataType: "datatype",
		dominantBaseline: "dominant-baseline",
		enableBackground: "enable-background",
		fillOpacity: "fill-opacity",
		fillRule: "fill-rule",
		floodColor: "flood-color",
		floodOpacity: "flood-opacity",
		fontFamily: "font-family",
		fontSize: "font-size",
		fontSizeAdjust: "font-size-adjust",
		fontStretch: "font-stretch",
		fontStyle: "font-style",
		fontVariant: "font-variant",
		fontWeight: "font-weight",
		glyphName: "glyph-name",
		glyphOrientationHorizontal: "glyph-orientation-horizontal",
		glyphOrientationVertical: "glyph-orientation-vertical",
		hrefLang: "hreflang",
		horizAdvX: "horiz-adv-x",
		horizOriginX: "horiz-origin-x",
		horizOriginY: "horiz-origin-y",
		imageRendering: "image-rendering",
		letterSpacing: "letter-spacing",
		lightingColor: "lighting-color",
		markerEnd: "marker-end",
		markerMid: "marker-mid",
		markerStart: "marker-start",
		maskType: "mask-type",
		navDown: "nav-down",
		navDownLeft: "nav-down-left",
		navDownRight: "nav-down-right",
		navLeft: "nav-left",
		navNext: "nav-next",
		navPrev: "nav-prev",
		navRight: "nav-right",
		navUp: "nav-up",
		navUpLeft: "nav-up-left",
		navUpRight: "nav-up-right",
		onAbort: "onabort",
		onActivate: "onactivate",
		onAfterPrint: "onafterprint",
		onBeforePrint: "onbeforeprint",
		onBegin: "onbegin",
		onCancel: "oncancel",
		onCanPlay: "oncanplay",
		onCanPlayThrough: "oncanplaythrough",
		onChange: "onchange",
		onClick: "onclick",
		onClose: "onclose",
		onCopy: "oncopy",
		onCueChange: "oncuechange",
		onCut: "oncut",
		onDblClick: "ondblclick",
		onDrag: "ondrag",
		onDragEnd: "ondragend",
		onDragEnter: "ondragenter",
		onDragExit: "ondragexit",
		onDragLeave: "ondragleave",
		onDragOver: "ondragover",
		onDragStart: "ondragstart",
		onDrop: "ondrop",
		onDurationChange: "ondurationchange",
		onEmptied: "onemptied",
		onEnd: "onend",
		onEnded: "onended",
		onError: "onerror",
		onFocus: "onfocus",
		onFocusIn: "onfocusin",
		onFocusOut: "onfocusout",
		onHashChange: "onhashchange",
		onInput: "oninput",
		onInvalid: "oninvalid",
		onKeyDown: "onkeydown",
		onKeyPress: "onkeypress",
		onKeyUp: "onkeyup",
		onLoad: "onload",
		onLoadedData: "onloadeddata",
		onLoadedMetadata: "onloadedmetadata",
		onLoadStart: "onloadstart",
		onMessage: "onmessage",
		onMouseDown: "onmousedown",
		onMouseEnter: "onmouseenter",
		onMouseLeave: "onmouseleave",
		onMouseMove: "onmousemove",
		onMouseOut: "onmouseout",
		onMouseOver: "onmouseover",
		onMouseUp: "onmouseup",
		onMouseWheel: "onmousewheel",
		onOffline: "onoffline",
		onOnline: "ononline",
		onPageHide: "onpagehide",
		onPageShow: "onpageshow",
		onPaste: "onpaste",
		onPause: "onpause",
		onPlay: "onplay",
		onPlaying: "onplaying",
		onPopState: "onpopstate",
		onProgress: "onprogress",
		onRateChange: "onratechange",
		onRepeat: "onrepeat",
		onReset: "onreset",
		onResize: "onresize",
		onScroll: "onscroll",
		onSeeked: "onseeked",
		onSeeking: "onseeking",
		onSelect: "onselect",
		onShow: "onshow",
		onStalled: "onstalled",
		onStorage: "onstorage",
		onSubmit: "onsubmit",
		onSuspend: "onsuspend",
		onTimeUpdate: "ontimeupdate",
		onToggle: "ontoggle",
		onUnload: "onunload",
		onVolumeChange: "onvolumechange",
		onWaiting: "onwaiting",
		onZoom: "onzoom",
		overlinePosition: "overline-position",
		overlineThickness: "overline-thickness",
		paintOrder: "paint-order",
		panose1: "panose-1",
		pointerEvents: "pointer-events",
		referrerPolicy: "referrerpolicy",
		renderingIntent: "rendering-intent",
		shapeRendering: "shape-rendering",
		stopColor: "stop-color",
		stopOpacity: "stop-opacity",
		strikethroughPosition: "strikethrough-position",
		strikethroughThickness: "strikethrough-thickness",
		strokeDashArray: "stroke-dasharray",
		strokeDashOffset: "stroke-dashoffset",
		strokeLineCap: "stroke-linecap",
		strokeLineJoin: "stroke-linejoin",
		strokeMiterLimit: "stroke-miterlimit",
		strokeOpacity: "stroke-opacity",
		strokeWidth: "stroke-width",
		tabIndex: "tabindex",
		textAnchor: "text-anchor",
		textDecoration: "text-decoration",
		textRendering: "text-rendering",
		transformOrigin: "transform-origin",
		typeOf: "typeof",
		underlinePosition: "underline-position",
		underlineThickness: "underline-thickness",
		unicodeBidi: "unicode-bidi",
		unicodeRange: "unicode-range",
		unitsPerEm: "units-per-em",
		vAlphabetic: "v-alphabetic",
		vHanging: "v-hanging",
		vIdeographic: "v-ideographic",
		vMathematical: "v-mathematical",
		vectorEffect: "vector-effect",
		vertAdvY: "vert-adv-y",
		vertOriginX: "vert-origin-x",
		vertOriginY: "vert-origin-y",
		wordSpacing: "word-spacing",
		writingMode: "writing-mode",
		xHeight: "x-height",
		playbackOrder: "playbackorder",
		timelineBegin: "timelinebegin"
	},
	properties: {
		about: ga,
		accentHeight: z,
		accumulate: null,
		additive: null,
		alignmentBaseline: null,
		alphabetic: z,
		amplitude: z,
		arabicForm: null,
		ascent: z,
		attributeName: null,
		attributeType: null,
		azimuth: z,
		bandwidth: null,
		baselineShift: null,
		baseFrequency: null,
		baseProfile: null,
		bbox: null,
		begin: null,
		bias: z,
		by: null,
		calcMode: null,
		capHeight: z,
		className: ma,
		clip: null,
		clipPath: null,
		clipPathUnits: null,
		clipRule: null,
		color: null,
		colorInterpolation: null,
		colorInterpolationFilters: null,
		colorProfile: null,
		colorRendering: null,
		content: null,
		contentScriptType: null,
		contentStyleType: null,
		crossOrigin: null,
		cursor: null,
		cx: null,
		cy: null,
		d: null,
		dataType: null,
		defaultAction: null,
		descent: z,
		diffuseConstant: z,
		direction: null,
		display: null,
		dur: null,
		divisor: z,
		dominantBaseline: null,
		download: R,
		dx: null,
		dy: null,
		edgeMode: null,
		editable: null,
		elevation: z,
		enableBackground: null,
		end: null,
		event: null,
		exponent: z,
		externalResourcesRequired: null,
		fill: null,
		fillOpacity: z,
		fillRule: null,
		filter: null,
		filterRes: null,
		filterUnits: null,
		floodColor: null,
		floodOpacity: null,
		focusable: null,
		focusHighlight: null,
		fontFamily: null,
		fontSize: null,
		fontSizeAdjust: null,
		fontStretch: null,
		fontStyle: null,
		fontVariant: null,
		fontWeight: null,
		format: null,
		fr: null,
		from: null,
		fx: null,
		fy: null,
		g1: ha,
		g2: ha,
		glyphName: ha,
		glyphOrientationHorizontal: null,
		glyphOrientationVertical: null,
		glyphRef: null,
		gradientTransform: null,
		gradientUnits: null,
		handler: null,
		hanging: z,
		hatchContentUnits: null,
		hatchUnits: null,
		height: null,
		href: null,
		hrefLang: null,
		horizAdvX: z,
		horizOriginX: z,
		horizOriginY: z,
		id: null,
		ideographic: z,
		imageRendering: null,
		initialVisibility: null,
		in: null,
		in2: null,
		intercept: z,
		k: z,
		k1: z,
		k2: z,
		k3: z,
		k4: z,
		kernelMatrix: ga,
		kernelUnitLength: null,
		keyPoints: null,
		keySplines: null,
		keyTimes: null,
		kerning: null,
		lang: null,
		lengthAdjust: null,
		letterSpacing: null,
		lightingColor: null,
		limitingConeAngle: z,
		local: null,
		markerEnd: null,
		markerMid: null,
		markerStart: null,
		markerHeight: null,
		markerUnits: null,
		markerWidth: null,
		mask: null,
		maskContentUnits: null,
		maskType: null,
		maskUnits: null,
		mathematical: null,
		max: null,
		media: null,
		mediaCharacterEncoding: null,
		mediaContentEncodings: null,
		mediaSize: z,
		mediaTime: null,
		method: null,
		min: null,
		mode: null,
		name: null,
		navDown: null,
		navDownLeft: null,
		navDownRight: null,
		navLeft: null,
		navNext: null,
		navPrev: null,
		navRight: null,
		navUp: null,
		navUpLeft: null,
		navUpRight: null,
		numOctaves: null,
		observer: null,
		offset: null,
		onAbort: null,
		onActivate: null,
		onAfterPrint: null,
		onBeforePrint: null,
		onBegin: null,
		onCancel: null,
		onCanPlay: null,
		onCanPlayThrough: null,
		onChange: null,
		onClick: null,
		onClose: null,
		onCopy: null,
		onCueChange: null,
		onCut: null,
		onDblClick: null,
		onDrag: null,
		onDragEnd: null,
		onDragEnter: null,
		onDragExit: null,
		onDragLeave: null,
		onDragOver: null,
		onDragStart: null,
		onDrop: null,
		onDurationChange: null,
		onEmptied: null,
		onEnd: null,
		onEnded: null,
		onError: null,
		onFocus: null,
		onFocusIn: null,
		onFocusOut: null,
		onHashChange: null,
		onInput: null,
		onInvalid: null,
		onKeyDown: null,
		onKeyPress: null,
		onKeyUp: null,
		onLoad: null,
		onLoadedData: null,
		onLoadedMetadata: null,
		onLoadStart: null,
		onMessage: null,
		onMouseDown: null,
		onMouseEnter: null,
		onMouseLeave: null,
		onMouseMove: null,
		onMouseOut: null,
		onMouseOver: null,
		onMouseUp: null,
		onMouseWheel: null,
		onOffline: null,
		onOnline: null,
		onPageHide: null,
		onPageShow: null,
		onPaste: null,
		onPause: null,
		onPlay: null,
		onPlaying: null,
		onPopState: null,
		onProgress: null,
		onRateChange: null,
		onRepeat: null,
		onReset: null,
		onResize: null,
		onScroll: null,
		onSeeked: null,
		onSeeking: null,
		onSelect: null,
		onShow: null,
		onStalled: null,
		onStorage: null,
		onSubmit: null,
		onSuspend: null,
		onTimeUpdate: null,
		onToggle: null,
		onUnload: null,
		onVolumeChange: null,
		onWaiting: null,
		onZoom: null,
		opacity: null,
		operator: null,
		order: null,
		orient: null,
		orientation: null,
		origin: null,
		overflow: null,
		overlay: null,
		overlinePosition: z,
		overlineThickness: z,
		paintOrder: null,
		panose1: null,
		path: null,
		pathLength: z,
		patternContentUnits: null,
		patternTransform: null,
		patternUnits: null,
		phase: null,
		ping: ma,
		pitch: null,
		playbackOrder: null,
		pointerEvents: null,
		points: null,
		pointsAtX: z,
		pointsAtY: z,
		pointsAtZ: z,
		preserveAlpha: null,
		preserveAspectRatio: null,
		primitiveUnits: null,
		propagate: null,
		property: ga,
		r: null,
		radius: null,
		referrerPolicy: null,
		refX: null,
		refY: null,
		rel: ga,
		rev: ga,
		renderingIntent: null,
		repeatCount: null,
		repeatDur: null,
		requiredExtensions: ga,
		requiredFeatures: ga,
		requiredFonts: ga,
		requiredFormats: ga,
		resource: null,
		restart: null,
		result: null,
		rotate: null,
		rx: null,
		ry: null,
		scale: null,
		seed: null,
		shapeRendering: null,
		side: null,
		slope: null,
		snapshotTime: null,
		specularConstant: z,
		specularExponent: z,
		spreadMethod: null,
		spacing: null,
		startOffset: null,
		stdDeviation: null,
		stemh: null,
		stemv: null,
		stitchTiles: null,
		stopColor: null,
		stopOpacity: null,
		strikethroughPosition: z,
		strikethroughThickness: z,
		string: null,
		stroke: null,
		strokeDashArray: ga,
		strokeDashOffset: null,
		strokeLineCap: null,
		strokeLineJoin: null,
		strokeMiterLimit: z,
		strokeOpacity: z,
		strokeWidth: null,
		style: null,
		surfaceScale: z,
		syncBehavior: null,
		syncBehaviorDefault: null,
		syncMaster: null,
		syncTolerance: null,
		syncToleranceDefault: null,
		systemLanguage: ga,
		tabIndex: z,
		tableValues: null,
		target: null,
		targetX: z,
		targetY: z,
		textAnchor: null,
		textDecoration: null,
		textRendering: null,
		textLength: null,
		timelineBegin: null,
		title: null,
		transformBehavior: null,
		type: null,
		typeOf: ga,
		to: null,
		transform: null,
		transformOrigin: null,
		u1: null,
		u2: null,
		underlinePosition: z,
		underlineThickness: z,
		unicode: null,
		unicodeBidi: null,
		unicodeRange: null,
		unitsPerEm: z,
		values: null,
		vAlphabetic: z,
		vMathematical: z,
		vectorEffect: null,
		vHanging: z,
		vIdeographic: z,
		version: null,
		vertAdvY: z,
		vertOriginX: z,
		vertOriginY: z,
		viewBox: null,
		viewTarget: null,
		visibility: null,
		width: null,
		widths: null,
		wordSpacing: null,
		writingMode: null,
		x: null,
		x1: null,
		x2: null,
		xChannelSelector: null,
		xHeight: z,
		y: null,
		y1: null,
		y2: null,
		yChannelSelector: null,
		z: null,
		zoomAndPan: null
	},
	space: "svg",
	transform: Ca
}), Da = xa({
	properties: {
		xLinkActuate: null,
		xLinkArcRole: null,
		xLinkHref: null,
		xLinkRole: null,
		xLinkShow: null,
		xLinkTitle: null,
		xLinkType: null
	},
	space: "xlink",
	transform(e, t) {
		return "xlink:" + t.slice(5).toLowerCase();
	}
}), Oa = xa({
	attributes: { xmlnsxlink: "xmlns:xlink" },
	properties: {
		xmlnsXLink: null,
		xmlns: null
	},
	space: "xmlns",
	transform: wa
}), ka = xa({
	properties: {
		xmlBase: null,
		xmlLang: null,
		xmlSpace: null
	},
	space: "xml",
	transform(e, t) {
		return "xml:" + t.slice(3).toLowerCase();
	}
}), Aa = {
	classId: "classID",
	dataType: "datatype",
	itemId: "itemID",
	strokeDashArray: "strokeDasharray",
	strokeDashOffset: "strokeDashoffset",
	strokeLineCap: "strokeLinecap",
	strokeLineJoin: "strokeLinejoin",
	strokeMiterLimit: "strokeMiterlimit",
	typeOf: "typeof",
	xLinkActuate: "xlinkActuate",
	xLinkArcRole: "xlinkArcrole",
	xLinkHref: "xlinkHref",
	xLinkRole: "xlinkRole",
	xLinkShow: "xlinkShow",
	xLinkTitle: "xlinkTitle",
	xLinkType: "xlinkType",
	xmlnsXLink: "xmlnsXlink"
}, ja = /[A-Z]/g, Ma = /-[a-z]/g, Na = /^data[-\w.:]+$/i;
function Pa(e, t) {
	let n = la(t), r = t, i = L;
	if (n in e.normal) return e.property[e.normal[n]];
	if (n.length > 4 && n.slice(0, 4) === "data" && Na.test(t)) {
		if (t.charAt(4) === "-") {
			let e = t.slice(5).replace(Ma, Ia);
			r = "data" + e.charAt(0).toUpperCase() + e.slice(1);
		} else {
			let e = t.slice(4);
			if (!Ma.test(e)) {
				let n = e.replace(ja, Fa);
				n.charAt(0) !== "-" && (n = "-" + n), t = "data" + n;
			}
		}
		i = ya;
	}
	return new i(r, t);
}
function Fa(e) {
	return "-" + e.toLowerCase();
}
function Ia(e) {
	return e.charAt(1).toUpperCase();
}
//#endregion
//#region node_modules/property-information/index.js
var La = ca([
	Sa,
	Ta,
	Da,
	Oa,
	ka
], "html"), Ra = ca([
	Sa,
	Ea,
	Da,
	Oa,
	ka
], "svg");
//#endregion
//#region node_modules/space-separated-tokens/index.js
function za(e) {
	return e.join(" ").trim();
}
//#endregion
//#region node_modules/inline-style-parser/cjs/index.js
var Ba = /* @__PURE__ */ n(((e, t) => {
	var n = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, r = /\n/g, i = /^\s*/, a = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, o = /^:\s*/, s = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, c = /^[;\s]*/, l = /^\s+|\s+$/g;
	function u(e, t) {
		if (typeof e != "string") throw TypeError("First argument must be a string");
		if (!e) return [];
		t ||= {};
		var l = 1, u = 1;
		function f(e) {
			var t = e.match(r);
			t && (l += t.length);
			var n = e.lastIndexOf("\n");
			u = ~n ? e.length - n : u + e.length;
		}
		function p() {
			var e = {
				line: l,
				column: u
			};
			return function(t) {
				return t.position = new m(e), _(), t;
			};
		}
		function m(e) {
			this.start = e, this.end = {
				line: l,
				column: u
			}, this.source = t.source;
		}
		m.prototype.content = e;
		function h(n) {
			var r = /* @__PURE__ */ Error(t.source + ":" + l + ":" + u + ": " + n);
			if (r.reason = n, r.filename = t.source, r.line = l, r.column = u, r.source = e, !t.silent) throw r;
		}
		function g(t) {
			var n = t.exec(e);
			if (n) {
				var r = n[0];
				return f(r), e = e.slice(r.length), n;
			}
		}
		function _() {
			g(i);
		}
		function v(e) {
			var t;
			for (e ||= []; t = y();) t !== !1 && e.push(t);
			return e;
		}
		function y() {
			var t = p();
			if (!(e.charAt(0) != "/" || e.charAt(1) != "*")) {
				for (var n = 2; e.charAt(n) != "" && (e.charAt(n) != "*" || e.charAt(n + 1) != "/");) ++n;
				if (n += 2, e.charAt(n - 1) === "") return h("End of comment missing");
				var r = e.slice(2, n - 2);
				return u += 2, f(r), e = e.slice(n), u += 2, t({
					type: "comment",
					comment: r
				});
			}
		}
		function b() {
			var e = p(), t = g(a);
			if (t) {
				if (y(), !g(o)) return h("property missing ':'");
				var r = g(s), i = e({
					type: "declaration",
					property: d(t[0].replace(n, "")),
					value: r ? d(r[0].replace(n, "")) : ""
				});
				return g(c), i;
			}
		}
		function x() {
			var e = [];
			v(e);
			for (var t; t = b();) t !== !1 && (e.push(t), v(e));
			return e;
		}
		return _(), x();
	}
	function d(e) {
		return e ? e.replace(l, "") : "";
	}
	t.exports = u;
})), Va = /* @__PURE__ */ n(((e) => {
	var t = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = r;
	var n = t(Ba());
	function r(e, t) {
		let r = null;
		if (!e || typeof e != "string") return r;
		let i = (0, n.default)(e), a = typeof t == "function";
		return i.forEach((e) => {
			if (e.type !== "declaration") return;
			let { property: n, value: i } = e;
			a ? t(n, i, e) : i && (r ||= {}, r[n] = i);
		}), r;
	}
})), Ha = /* @__PURE__ */ n(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.camelCase = void 0;
	var t = /^--[a-zA-Z0-9_-]+$/, n = /-([a-z])/g, r = /^[^-]+$/, i = /^-(webkit|moz|ms|o|khtml)-/, a = /^-(ms)-/, o = function(e) {
		return !e || r.test(e) || t.test(e);
	}, s = function(e, t) {
		return t.toUpperCase();
	}, c = function(e, t) {
		return `${t}-`;
	};
	e.camelCase = function(e, t) {
		return t === void 0 && (t = {}), o(e) ? e : (e = e.toLowerCase(), e = t.reactCompat ? e.replace(a, c) : e.replace(i, c), e.replace(n, s));
	};
})), Ua = /* @__PURE__ */ n(((e, t) => {
	var n = (e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	})(Va()), r = Ha();
	function i(e, t) {
		var i = {};
		return !e || typeof e != "string" || (0, n.default)(e, function(e, n) {
			e && n && (i[(0, r.camelCase)(e, t)] = n);
		}), i;
	}
	i.default = i, t.exports = i;
})), Wa = Ka("end"), Ga = Ka("start");
function Ka(e) {
	return t;
	function t(t) {
		let n = t && t.position && t.position[e] || {};
		if (typeof n.line == "number" && n.line > 0 && typeof n.column == "number" && n.column > 0) return {
			line: n.line,
			column: n.column,
			offset: typeof n.offset == "number" && n.offset > -1 ? n.offset : void 0
		};
	}
}
function qa(e) {
	let t = Ga(e), n = Wa(e);
	if (t && n) return {
		start: t,
		end: n
	};
}
//#endregion
//#region node_modules/unist-util-stringify-position/lib/index.js
function Ja(e) {
	return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Xa(e.position) : "start" in e || "end" in e ? Xa(e) : "line" in e || "column" in e ? Ya(e) : "";
}
function Ya(e) {
	return Za(e && e.line) + ":" + Za(e && e.column);
}
function Xa(e) {
	return Ya(e && e.start) + "-" + Ya(e && e.end);
}
function Za(e) {
	return e && typeof e == "number" ? e : 1;
}
//#endregion
//#region node_modules/vfile-message/lib/index.js
var Qa = class extends Error {
	constructor(e, t, n) {
		super(), typeof t == "string" && (n = t, t = void 0);
		let r = "", i = {}, a = !1;
		if (t && (i = "line" in t && "column" in t || "start" in t && "end" in t ? { place: t } : "type" in t ? {
			ancestors: [t],
			place: t.position
		} : { ...t }), typeof e == "string" ? r = e : !i.cause && e && (a = !0, r = e.message, i.cause = e), !i.ruleId && !i.source && typeof n == "string") {
			let e = n.indexOf(":");
			e === -1 ? i.ruleId = n : (i.source = n.slice(0, e), i.ruleId = n.slice(e + 1));
		}
		if (!i.place && i.ancestors && i.ancestors) {
			let e = i.ancestors[i.ancestors.length - 1];
			e && (i.place = e.position);
		}
		let o = i.place && "start" in i.place ? i.place.start : i.place;
		this.ancestors = i.ancestors || void 0, this.cause = i.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = r, this.line = o ? o.line : void 0, this.name = Ja(i.place) || "1:1", this.place = i.place || void 0, this.reason = this.message, this.ruleId = i.ruleId || void 0, this.source = i.source || void 0, this.stack = a && i.cause && typeof i.cause.stack == "string" ? i.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
	}
};
Qa.prototype.file = "", Qa.prototype.name = "", Qa.prototype.reason = "", Qa.prototype.message = "", Qa.prototype.stack = "", Qa.prototype.column = void 0, Qa.prototype.line = void 0, Qa.prototype.ancestors = void 0, Qa.prototype.cause = void 0, Qa.prototype.fatal = void 0, Qa.prototype.place = void 0, Qa.prototype.ruleId = void 0, Qa.prototype.source = void 0;
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/lib/index.js
var $a = /* @__PURE__ */ e(Ua(), 1), eo = {}.hasOwnProperty, to = /* @__PURE__ */ new Map(), no = /[A-Z]/g, ro = /* @__PURE__ */ new Set([
	"table",
	"tbody",
	"thead",
	"tfoot",
	"tr"
]), io = /* @__PURE__ */ new Set(["td", "th"]);
function ao(e, t) {
	if (!t || t.Fragment === void 0) throw TypeError("Expected `Fragment` in options");
	let n = t.filePath || void 0, r;
	if (t.development) {
		if (typeof t.jsxDEV != "function") throw TypeError("Expected `jsxDEV` in options when `development: true`");
		r = ho(n, t.jsxDEV);
	} else {
		if (typeof t.jsx != "function") throw TypeError("Expected `jsx` in production options");
		if (typeof t.jsxs != "function") throw TypeError("Expected `jsxs` in production options");
		r = mo(n, t.jsx, t.jsxs);
	}
	let i = {
		Fragment: t.Fragment,
		ancestors: [],
		components: t.components || {},
		create: r,
		elementAttributeNameCase: t.elementAttributeNameCase || "react",
		evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
		filePath: n,
		ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
		passKeys: t.passKeys !== !1,
		passNode: t.passNode || !1,
		schema: t.space === "svg" ? Ra : La,
		stylePropertyNameCase: t.stylePropertyNameCase || "dom",
		tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
	}, a = oo(i, e, void 0);
	return a && typeof a != "string" ? a : i.create(e, i.Fragment, { children: a || void 0 }, void 0);
}
function oo(e, t, n) {
	if (t.type === "element") return so(e, t, n);
	if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression") return co(e, t);
	if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement") return uo(e, t, n);
	if (t.type === "mdxjsEsm") return lo(e, t);
	if (t.type === "root") return fo(e, t, n);
	if (t.type === "text") return po(e, t);
}
function so(e, t, n) {
	let r = e.schema, i = r;
	t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = Ra, e.schema = i), e.ancestors.push(t);
	let a = xo(e, t.tagName, !1), o = go(e, t), s = vo(e, t);
	return ro.has(t.tagName) && (s = s.filter(function(e) {
		return typeof e != "string" || !aa(e);
	})), B(e, o, a, t), V(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function co(e, t) {
	if (t.data && t.data.estree && e.evaluater) {
		let n = t.data.estree.body[0];
		return n.type, e.evaluater.evaluateExpression(n.expression);
	}
	So(e, t.position);
}
function lo(e, t) {
	if (t.data && t.data.estree && e.evaluater) return e.evaluater.evaluateProgram(t.data.estree);
	So(e, t.position);
}
function uo(e, t, n) {
	let r = e.schema, i = r;
	t.name === "svg" && r.space === "html" && (i = Ra, e.schema = i), e.ancestors.push(t);
	let a = t.name === null ? e.Fragment : xo(e, t.name, !0), o = _o(e, t), s = vo(e, t);
	return B(e, o, a, t), V(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function fo(e, t, n) {
	let r = {};
	return V(r, vo(e, t)), e.create(t, e.Fragment, r, n);
}
function po(e, t) {
	return t.value;
}
function B(e, t, n, r) {
	typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function V(e, t) {
	if (t.length > 0) {
		let n = t.length > 1 ? t : t[0];
		n && (e.children = n);
	}
}
function mo(e, t, n) {
	return r;
	function r(e, r, i, a) {
		let o = Array.isArray(i.children) ? n : t;
		return a ? o(r, i, a) : o(r, i);
	}
}
function ho(e, t) {
	return n;
	function n(n, r, i, a) {
		let o = Array.isArray(i.children), s = Ga(n);
		return t(r, i, a, o, {
			columnNumber: s ? s.column - 1 : void 0,
			fileName: e,
			lineNumber: s ? s.line : void 0
		}, void 0);
	}
}
function go(e, t) {
	let n = {}, r, i;
	for (i in t.properties) if (i !== "children" && eo.call(t.properties, i)) {
		let a = yo(e, i, t.properties[i]);
		if (a) {
			let [i, o] = a;
			e.tableCellAlignToStyle && i === "align" && typeof o == "string" && io.has(t.tagName) ? r = o : n[i] = o;
		}
	}
	if (r) {
		let t = n.style ||= {};
		t[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
	}
	return n;
}
function _o(e, t) {
	let n = {};
	for (let r of t.attributes) if (r.type === "mdxJsxExpressionAttribute") if (r.data && r.data.estree && e.evaluater) {
		let t = r.data.estree.body[0];
		t.type;
		let i = t.expression;
		i.type;
		let a = i.properties[0];
		a.type, Object.assign(n, e.evaluater.evaluateExpression(a.argument));
	} else So(e, t.position);
	else {
		let i = r.name, a;
		if (r.value && typeof r.value == "object") if (r.value.data && r.value.data.estree && e.evaluater) {
			let t = r.value.data.estree.body[0];
			t.type, a = e.evaluater.evaluateExpression(t.expression);
		} else So(e, t.position);
		else a = r.value === null || r.value;
		n[i] = a;
	}
	return n;
}
function vo(e, t) {
	let n = [], r = -1, i = e.passKeys ? /* @__PURE__ */ new Map() : to;
	for (; ++r < t.children.length;) {
		let a = t.children[r], o;
		if (e.passKeys) {
			let e = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
			if (e) {
				let t = i.get(e) || 0;
				o = e + "-" + t, i.set(e, t + 1);
			}
		}
		let s = oo(e, a, o);
		s !== void 0 && n.push(s);
	}
	return n;
}
function yo(e, t, n) {
	let r = Pa(e.schema, t);
	if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
		if (Array.isArray(n) && (n = r.commaSeparated ? $i(n) : za(n)), r.property === "style") {
			let t = typeof n == "object" ? n : bo(e, String(n));
			return e.stylePropertyNameCase === "css" && (t = Co(t)), ["style", t];
		}
		return [e.elementAttributeNameCase === "react" && r.space ? Aa[r.property] || r.property : r.attribute, n];
	}
}
function bo(e, t) {
	try {
		return (0, $a.default)(t, { reactCompat: !0 });
	} catch (t) {
		if (e.ignoreInvalidStyle) return {};
		let n = t, r = new Qa("Cannot parse `style` attribute", {
			ancestors: e.ancestors,
			cause: n,
			ruleId: "style",
			source: "hast-util-to-jsx-runtime"
		});
		throw r.file = e.filePath || void 0, r.url = "https://github.com/syntax-tree/hast-util-to-jsx-runtime#cannot-parse-style-attribute", r;
	}
}
function xo(e, t, n) {
	let r;
	if (!n) r = {
		type: "Literal",
		value: t
	};
	else if (t.includes(".")) {
		let e = t.split("."), n = -1, i;
		for (; ++n < e.length;) {
			let t = ra(e[n]) ? {
				type: "Identifier",
				name: e[n]
			} : {
				type: "Literal",
				value: e[n]
			};
			i = i ? {
				type: "MemberExpression",
				object: i,
				property: t,
				computed: !!(n && t.type === "Literal"),
				optional: !1
			} : t;
		}
		r = i;
	} else r = ra(t) && !/^[a-z]/.test(t) ? {
		type: "Identifier",
		name: t
	} : {
		type: "Literal",
		value: t
	};
	if (r.type === "Literal") {
		let t = r.value;
		return eo.call(e.components, t) ? e.components[t] : t;
	}
	if (e.evaluater) return e.evaluater.evaluateExpression(r);
	So(e);
}
function So(e, t) {
	let n = new Qa("Cannot handle MDX estrees without `createEvaluater`", {
		ancestors: e.ancestors,
		place: t,
		ruleId: "mdx-estree",
		source: "hast-util-to-jsx-runtime"
	});
	throw n.file = e.filePath || void 0, n.url = "https://github.com/syntax-tree/hast-util-to-jsx-runtime#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function Co(e) {
	let t = {}, n;
	for (n in e) eo.call(e, n) && (t[wo(n)] = e[n]);
	return t;
}
function wo(e) {
	let t = e.replace(no, To);
	return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function To(e) {
	return "-" + e.toLowerCase();
}
//#endregion
//#region node_modules/html-url-attributes/lib/index.js
var Eo = {
	action: ["form"],
	cite: [
		"blockquote",
		"del",
		"ins",
		"q"
	],
	data: ["object"],
	formAction: ["button", "input"],
	href: [
		"a",
		"area",
		"base",
		"link"
	],
	icon: ["menuitem"],
	itemId: null,
	manifest: ["html"],
	ping: ["a", "area"],
	poster: ["video"],
	src: [
		"audio",
		"embed",
		"iframe",
		"img",
		"input",
		"script",
		"source",
		"track",
		"video"
	]
}, Do = /* @__PURE__ */ n(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), Oo = /* @__PURE__ */ n(((e, t) => {
	t.exports = Do();
})), ko = {};
function Ao(e, t) {
	let n = t || ko;
	return jo(e, typeof n.includeImageAlt != "boolean" || n.includeImageAlt, typeof n.includeHtml != "boolean" || n.includeHtml);
}
function jo(e, t, n) {
	if (No(e)) {
		if ("value" in e) return e.type === "html" && !n ? "" : e.value;
		if (t && "alt" in e && e.alt) return e.alt;
		if ("children" in e) return Mo(e.children, t, n);
	}
	return Array.isArray(e) ? Mo(e, t, n) : "";
}
function Mo(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) r[i] = jo(e[i], t, n);
	return r.join("");
}
function No(e) {
	return !!(e && typeof e == "object");
}
//#endregion
//#region node_modules/decode-named-character-reference/index.dom.js
var Po = document.createElement("i");
function Fo(e) {
	let t = "&" + e + ";";
	Po.innerHTML = t;
	let n = Po.textContent;
	return n.charCodeAt(n.length - 1) === 59 && e !== "semi" ? !1 : n !== t && n;
}
//#endregion
//#region node_modules/micromark-util-chunked/index.js
function Io(e, t, n, r) {
	let i = e.length, a = 0, o;
	if (t = t < 0 ? -t > i ? 0 : i + t : t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4) o = Array.from(r), o.unshift(t, n), e.splice(...o);
	else for (n && e.splice(t, n); a < r.length;) o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
}
function Lo(e, t) {
	return e.length > 0 ? (Io(e, e.length, 0, t), e) : t;
}
//#endregion
//#region node_modules/micromark-util-combine-extensions/index.js
var Ro = {}.hasOwnProperty;
function zo(e) {
	let t = {}, n = -1;
	for (; ++n < e.length;) Bo(t, e[n]);
	return t;
}
function Bo(e, t) {
	let n;
	for (n in t) {
		let r = (Ro.call(e, n) ? e[n] : void 0) || (e[n] = {}), i = t[n], a;
		if (i) for (a in i) {
			Ro.call(r, a) || (r[a] = []);
			let e = i[a];
			Vo(r[a], Array.isArray(e) ? e : e ? [e] : []);
		}
	}
}
function Vo(e, t) {
	let n = -1, r = [];
	for (; ++n < t.length;) (t[n].add === "after" ? e : r).push(t[n]);
	Io(e, 0, 0, r);
}
//#endregion
//#region node_modules/micromark-util-decode-numeric-character-reference/index.js
function Ho(e, t) {
	let n = Number.parseInt(e, t);
	return n < 9 || n === 11 || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || (n & 65535) == 65535 || (n & 65535) == 65534 || n > 1114111 ? "�" : String.fromCodePoint(n);
}
//#endregion
//#region node_modules/micromark-util-normalize-identifier/index.js
function Uo(e) {
	return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
//#endregion
//#region node_modules/micromark-util-character/index.js
var Wo = es(/[A-Za-z]/), Go = es(/[\dA-Za-z]/), Ko = es(/[#-'*+\--9=?A-Z^-~]/);
function qo(e) {
	return e !== null && (e < 32 || e === 127);
}
var Jo = es(/\d/), Yo = es(/[\dA-Fa-f]/), Xo = es(/[!-/:-@[-`{-~]/);
function H(e) {
	return e !== null && e < -2;
}
function Zo(e) {
	return e !== null && (e < 0 || e === 32);
}
function U(e) {
	return e === -2 || e === -1 || e === 32;
}
var Qo = es(/\p{P}|\p{S}/u), $o = es(/\s/);
function es(e) {
	return t;
	function t(t) {
		return t !== null && t > -1 && e.test(String.fromCharCode(t));
	}
}
//#endregion
//#region node_modules/micromark-util-sanitize-uri/index.js
function ts(e) {
	let t = [], n = -1, r = 0, i = 0;
	for (; ++n < e.length;) {
		let a = e.charCodeAt(n), o = "";
		if (a === 37 && Go(e.charCodeAt(n + 1)) && Go(e.charCodeAt(n + 2))) i = 2;
		else if (a < 128) /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (o = String.fromCharCode(a));
		else if (a > 55295 && a < 57344) {
			let t = e.charCodeAt(n + 1);
			a < 56320 && t > 56319 && t < 57344 ? (o = String.fromCharCode(a, t), i = 1) : o = "�";
		} else o = String.fromCharCode(a);
		o &&= (t.push(e.slice(r, n), encodeURIComponent(o)), r = n + i + 1, ""), i &&= (n += i, 0);
	}
	return t.join("") + e.slice(r);
}
//#endregion
//#region node_modules/micromark-factory-space/index.js
function W(e, t, n, r) {
	let i = r ? r - 1 : Infinity, a = 0;
	return o;
	function o(r) {
		return U(r) ? (e.enter(n), s(r)) : t(r);
	}
	function s(r) {
		return U(r) && a++ < i ? (e.consume(r), s) : (e.exit(n), t(r));
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/content.js
var ns = { tokenize: rs };
function rs(e) {
	let t = e.attempt(this.parser.constructs.contentInitial, r, i), n;
	return t;
	function r(n) {
		if (n === null) {
			e.consume(n);
			return;
		}
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), W(e, t, "linePrefix");
	}
	function i(t) {
		return e.enter("paragraph"), a(t);
	}
	function a(t) {
		let r = e.enter("chunkText", {
			contentType: "text",
			previous: n
		});
		return n && (n.next = r), n = r, o(t);
	}
	function o(t) {
		if (t === null) {
			e.exit("chunkText"), e.exit("paragraph"), e.consume(t);
			return;
		}
		return H(t) ? (e.consume(t), e.exit("chunkText"), a) : (e.consume(t), o);
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/document.js
var is = { tokenize: os }, as = { tokenize: ss };
function os(e) {
	let t = this, n = [], r = 0, i, a, o;
	return s;
	function s(i) {
		if (r < n.length) {
			let a = n[r];
			return t.containerState = a[1], e.attempt(a[0].continuation, c, l)(i);
		}
		return l(i);
	}
	function c(e) {
		if (r++, t.containerState._closeFlow) {
			t.containerState._closeFlow = void 0, i && v();
			let n = t.events.length, a = n, o;
			for (; a--;) if (t.events[a][0] === "exit" && t.events[a][1].type === "chunkFlow") {
				o = t.events[a][1].end;
				break;
			}
			_(r);
			let s = n;
			for (; s < t.events.length;) t.events[s][1].end = { ...o }, s++;
			return Io(t.events, a + 1, 0, t.events.slice(n)), t.events.length = s, l(e);
		}
		return s(e);
	}
	function l(a) {
		if (r === n.length) {
			if (!i) return f(a);
			if (i.currentConstruct && i.currentConstruct.concrete) return m(a);
			t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
		}
		return t.containerState = {}, e.check(as, u, d)(a);
	}
	function u(e) {
		return i && v(), _(r), f(e);
	}
	function d(e) {
		return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, m(e);
	}
	function f(n) {
		return t.containerState = {}, e.attempt(as, p, m)(n);
	}
	function p(e) {
		return r++, n.push([t.currentConstruct, t.containerState]), f(e);
	}
	function m(n) {
		if (n === null) {
			i && v(), _(0), e.consume(n);
			return;
		}
		return i ||= t.parser.flow(t.now()), e.enter("chunkFlow", {
			_tokenizer: i,
			contentType: "flow",
			previous: a
		}), h(n);
	}
	function h(n) {
		if (n === null) {
			g(e.exit("chunkFlow"), !0), _(0), e.consume(n);
			return;
		}
		return H(n) ? (e.consume(n), g(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, s) : (e.consume(n), h);
	}
	function g(e, n) {
		let s = t.sliceStream(e);
		if (n && s.push(null), e.previous = a, a && (a.next = e), a = e, i.defineSkip(e.start), i.write(s), t.parser.lazy[e.start.line]) {
			let e = i.events.length;
			for (; e--;) if (i.events[e][1].start.offset < o && (!i.events[e][1].end || i.events[e][1].end.offset > o)) return;
			let n = t.events.length, a = n, s, c;
			for (; a--;) if (t.events[a][0] === "exit" && t.events[a][1].type === "chunkFlow") {
				if (s) {
					c = t.events[a][1].end;
					break;
				}
				s = !0;
			}
			for (_(r), e = n; e < t.events.length;) t.events[e][1].end = { ...c }, e++;
			Io(t.events, a + 1, 0, t.events.slice(n)), t.events.length = e;
		}
	}
	function _(r) {
		let i = n.length;
		for (; i-- > r;) {
			let r = n[i];
			t.containerState = r[1], r[0].exit.call(t, e);
		}
		n.length = r;
	}
	function v() {
		i.write([null]), a = void 0, i = void 0, t.containerState._closeFlow = void 0;
	}
}
function ss(e, t, n) {
	return W(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
//#endregion
//#region node_modules/micromark-util-classify-character/index.js
function cs(e) {
	if (e === null || Zo(e) || $o(e)) return 1;
	if (Qo(e)) return 2;
}
//#endregion
//#region node_modules/micromark-util-resolve-all/index.js
function ls(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) {
		let a = e[i].resolveAll;
		a && !r.includes(a) && (t = a(t, n), r.push(a));
	}
	return t;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/attention.js
var us = {
	name: "attention",
	resolveAll: ds,
	tokenize: fs
};
function ds(e, t) {
	let n = -1, r, i, a, o, s, c, l, u;
	for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
		for (r = n; r--;) if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
			if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3)) continue;
			c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
			let d = { ...e[r][1].end }, f = { ...e[n][1].start };
			ps(d, -c), ps(f, c), o = {
				type: c > 1 ? "strongSequence" : "emphasisSequence",
				start: d,
				end: { ...e[r][1].end }
			}, s = {
				type: c > 1 ? "strongSequence" : "emphasisSequence",
				start: { ...e[n][1].start },
				end: f
			}, a = {
				type: c > 1 ? "strongText" : "emphasisText",
				start: { ...e[r][1].end },
				end: { ...e[n][1].start }
			}, i = {
				type: c > 1 ? "strong" : "emphasis",
				start: { ...o.start },
				end: { ...s.end }
			}, e[r][1].end = { ...o.start }, e[n][1].start = { ...s.end }, l = [], e[r][1].end.offset - e[r][1].start.offset && (l = Lo(l, [[
				"enter",
				e[r][1],
				t
			], [
				"exit",
				e[r][1],
				t
			]])), l = Lo(l, [
				[
					"enter",
					i,
					t
				],
				[
					"enter",
					o,
					t
				],
				[
					"exit",
					o,
					t
				],
				[
					"enter",
					a,
					t
				]
			]), l = Lo(l, ls(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), l = Lo(l, [
				[
					"exit",
					a,
					t
				],
				[
					"enter",
					s,
					t
				],
				[
					"exit",
					s,
					t
				],
				[
					"exit",
					i,
					t
				]
			]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, l = Lo(l, [[
				"enter",
				e[n][1],
				t
			], [
				"exit",
				e[n][1],
				t
			]])) : u = 0, Io(e, r - 1, n - r + 3, l), n = r + l.length - u - 2;
			break;
		}
	}
	for (n = -1; ++n < e.length;) e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
	return e;
}
function fs(e, t) {
	let n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = cs(r), a;
	return o;
	function o(t) {
		return a = t, e.enter("attentionSequence"), s(t);
	}
	function s(o) {
		if (o === a) return e.consume(o), s;
		let c = e.exit("attentionSequence"), l = cs(o), u = !l || l === 2 && i || n.includes(o), d = !i || i === 2 && l || n.includes(r);
		return c._open = !!(a === 42 ? u : u && (i || !d)), c._close = !!(a === 42 ? d : d && (l || !u)), t(o);
	}
}
function ps(e, t) {
	e.column += t, e.offset += t, e._bufferIndex += t;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/autolink.js
var ms = {
	name: "autolink",
	tokenize: hs
};
function hs(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(t), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
	}
	function a(t) {
		return Wo(t) ? (e.consume(t), o) : t === 64 ? n(t) : l(t);
	}
	function o(e) {
		return e === 43 || e === 45 || e === 46 || Go(e) ? (r = 1, s(e)) : l(e);
	}
	function s(t) {
		return t === 58 ? (e.consume(t), r = 0, c) : (t === 43 || t === 45 || t === 46 || Go(t)) && r++ < 32 ? (e.consume(t), s) : (r = 0, l(t));
	}
	function c(r) {
		return r === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(r), e.exit("autolinkMarker"), e.exit("autolink"), t) : r === null || r === 32 || r === 60 || qo(r) ? n(r) : (e.consume(r), c);
	}
	function l(t) {
		return t === 64 ? (e.consume(t), u) : Ko(t) ? (e.consume(t), l) : n(t);
	}
	function u(e) {
		return Go(e) ? d(e) : n(e);
	}
	function d(n) {
		return n === 46 ? (e.consume(n), r = 0, u) : n === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(n), e.exit("autolinkMarker"), e.exit("autolink"), t) : f(n);
	}
	function f(t) {
		if ((t === 45 || Go(t)) && r++ < 63) {
			let n = t === 45 ? f : d;
			return e.consume(t), n;
		}
		return n(t);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/blank-line.js
var gs = {
	partial: !0,
	tokenize: _s
};
function _s(e, t, n) {
	return r;
	function r(t) {
		return U(t) ? W(e, i, "linePrefix")(t) : i(t);
	}
	function i(e) {
		return e === null || H(e) ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/block-quote.js
var vs = {
	continuation: { tokenize: bs },
	exit: xs,
	name: "blockQuote",
	tokenize: ys
};
function ys(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		if (t === 62) {
			let n = r.containerState;
			return n.open ||= (e.enter("blockQuote", { _container: !0 }), !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(t), e.exit("blockQuoteMarker"), a;
		}
		return n(t);
	}
	function a(n) {
		return U(n) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(n), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(n));
	}
}
function bs(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return U(t) ? W(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : a(t);
	}
	function a(r) {
		return e.attempt(vs, t, n)(r);
	}
}
function xs(e) {
	e.exit("blockQuote");
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/character-escape.js
var Ss = {
	name: "characterEscape",
	tokenize: Cs
};
function Cs(e, t, n) {
	return r;
	function r(t) {
		return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(t), e.exit("escapeMarker"), i;
	}
	function i(r) {
		return Xo(r) ? (e.enter("characterEscapeValue"), e.consume(r), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/character-reference.js
var ws = {
	name: "characterReference",
	tokenize: Ts
};
function Ts(e, t, n) {
	let r = this, i = 0, a, o;
	return s;
	function s(t) {
		return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(t), e.exit("characterReferenceMarker"), c;
	}
	function c(t) {
		return t === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(t), e.exit("characterReferenceMarkerNumeric"), l) : (e.enter("characterReferenceValue"), a = 31, o = Go, u(t));
	}
	function l(t) {
		return t === 88 || t === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(t), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, o = Yo, u) : (e.enter("characterReferenceValue"), a = 7, o = Jo, u(t));
	}
	function u(s) {
		if (s === 59 && i) {
			let i = e.exit("characterReferenceValue");
			return o === Go && !Fo(r.sliceSerialize(i)) ? n(s) : (e.enter("characterReferenceMarker"), e.consume(s), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
		}
		return o(s) && i++ < a ? (e.consume(s), u) : n(s);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-fenced.js
var Es = {
	partial: !0,
	tokenize: ks
}, Ds = {
	concrete: !0,
	name: "codeFenced",
	tokenize: Os
};
function Os(e, t, n) {
	let r = this, i = {
		partial: !0,
		tokenize: x
	}, a = 0, o = 0, s;
	return c;
	function c(e) {
		return l(e);
	}
	function l(t) {
		let n = r.events[r.events.length - 1];
		return a = n && n[1].type === "linePrefix" ? n[2].sliceSerialize(n[1], !0).length : 0, s = t, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), u(t);
	}
	function u(t) {
		return t === s ? (o++, e.consume(t), u) : o < 3 ? n(t) : (e.exit("codeFencedFenceSequence"), U(t) ? W(e, d, "whitespace")(t) : d(t));
	}
	function d(n) {
		return n === null || H(n) ? (e.exit("codeFencedFence"), r.interrupt ? t(n) : e.check(Es, h, b)(n)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", { contentType: "string" }), f(n));
	}
	function f(t) {
		return t === null || H(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(t)) : U(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), W(e, p, "whitespace")(t)) : t === 96 && t === s ? n(t) : (e.consume(t), f);
	}
	function p(t) {
		return t === null || H(t) ? d(t) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", { contentType: "string" }), m(t));
	}
	function m(t) {
		return t === null || H(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(t)) : t === 96 && t === s ? n(t) : (e.consume(t), m);
	}
	function h(t) {
		return e.attempt(i, b, g)(t);
	}
	function g(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), _;
	}
	function _(t) {
		return a > 0 && U(t) ? W(e, v, "linePrefix", a + 1)(t) : v(t);
	}
	function v(t) {
		return t === null || H(t) ? e.check(Es, h, b)(t) : (e.enter("codeFlowValue"), y(t));
	}
	function y(t) {
		return t === null || H(t) ? (e.exit("codeFlowValue"), v(t)) : (e.consume(t), y);
	}
	function b(n) {
		return e.exit("codeFenced"), t(n);
	}
	function x(e, t, n) {
		let i = 0;
		return a;
		function a(t) {
			return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), c;
		}
		function c(t) {
			return e.enter("codeFencedFence"), U(t) ? W(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : l(t);
		}
		function l(t) {
			return t === s ? (e.enter("codeFencedFenceSequence"), u(t)) : n(t);
		}
		function u(t) {
			return t === s ? (i++, e.consume(t), u) : i >= o ? (e.exit("codeFencedFenceSequence"), U(t) ? W(e, d, "whitespace")(t) : d(t)) : n(t);
		}
		function d(r) {
			return r === null || H(r) ? (e.exit("codeFencedFence"), t(r)) : n(r);
		}
	}
}
function ks(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return t === null ? n(t) : (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-indented.js
var As = {
	name: "codeIndented",
	tokenize: Ms
}, js = {
	partial: !0,
	tokenize: Ns
};
function Ms(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("codeIndented"), W(e, a, "linePrefix", 5)(t);
	}
	function a(e) {
		let t = r.events[r.events.length - 1];
		return t && t[1].type === "linePrefix" && t[2].sliceSerialize(t[1], !0).length >= 4 ? o(e) : n(e);
	}
	function o(t) {
		return t === null ? c(t) : H(t) ? e.attempt(js, o, c)(t) : (e.enter("codeFlowValue"), s(t));
	}
	function s(t) {
		return t === null || H(t) ? (e.exit("codeFlowValue"), o(t)) : (e.consume(t), s);
	}
	function c(n) {
		return e.exit("codeIndented"), t(n);
	}
}
function Ns(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return r.parser.lazy[r.now().line] ? n(t) : H(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), i) : W(e, a, "linePrefix", 5)(t);
	}
	function a(e) {
		let a = r.events[r.events.length - 1];
		return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(e) : H(e) ? i(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-text.js
var Ps = {
	name: "codeText",
	previous: Is,
	resolve: Fs,
	tokenize: Ls
};
function Fs(e) {
	let t = e.length - 4, n = 3, r, i;
	if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
		for (r = n; ++r < t;) if (e[r][1].type === "codeTextData") {
			e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
			break;
		}
	}
	for (r = n - 1, t++; ++r <= t;) i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
	return e;
}
function Is(e) {
	return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Ls(e, t, n) {
	let r = 0, i, a;
	return o;
	function o(t) {
		return e.enter("codeText"), e.enter("codeTextSequence"), s(t);
	}
	function s(t) {
		return t === 96 ? (e.consume(t), r++, s) : (e.exit("codeTextSequence"), c(t));
	}
	function c(t) {
		return t === null ? n(t) : t === 32 ? (e.enter("space"), e.consume(t), e.exit("space"), c) : t === 96 ? (a = e.enter("codeTextSequence"), i = 0, u(t)) : H(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), c) : (e.enter("codeTextData"), l(t));
	}
	function l(t) {
		return t === null || t === 32 || t === 96 || H(t) ? (e.exit("codeTextData"), c(t)) : (e.consume(t), l);
	}
	function u(n) {
		return n === 96 ? (e.consume(n), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(n)) : (a.type = "codeTextData", l(n));
	}
}
//#endregion
//#region node_modules/micromark-util-subtokenize/lib/splice-buffer.js
var Rs = class {
	constructor(e) {
		this.left = e ? [...e] : [], this.right = [];
	}
	get(e) {
		if (e < 0 || e >= this.left.length + this.right.length) throw RangeError("Cannot access index `" + e + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
		return e < this.left.length ? this.left[e] : this.right[this.right.length - e + this.left.length - 1];
	}
	get length() {
		return this.left.length + this.right.length;
	}
	shift() {
		return this.setCursor(0), this.right.pop();
	}
	slice(e, t) {
		let n = t ?? Infinity;
		return n < this.left.length ? this.left.slice(e, n) : e > this.left.length ? this.right.slice(this.right.length - n + this.left.length, this.right.length - e + this.left.length).reverse() : this.left.slice(e).concat(this.right.slice(this.right.length - n + this.left.length).reverse());
	}
	splice(e, t, n) {
		let r = t || 0;
		this.setCursor(Math.trunc(e));
		let i = this.right.splice(this.right.length - r, Infinity);
		return n && zs(this.left, n), i.reverse();
	}
	pop() {
		return this.setCursor(Infinity), this.left.pop();
	}
	push(e) {
		this.setCursor(Infinity), this.left.push(e);
	}
	pushMany(e) {
		this.setCursor(Infinity), zs(this.left, e);
	}
	unshift(e) {
		this.setCursor(0), this.right.push(e);
	}
	unshiftMany(e) {
		this.setCursor(0), zs(this.right, e.reverse());
	}
	setCursor(e) {
		if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0)) if (e < this.left.length) {
			let t = this.left.splice(e, Infinity);
			zs(this.right, t.reverse());
		} else {
			let t = this.right.splice(this.left.length + this.right.length - e, Infinity);
			zs(this.left, t.reverse());
		}
	}
};
function zs(e, t) {
	let n = 0;
	if (t.length < 1e4) e.push(...t);
	else for (; n < t.length;) e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
//#endregion
//#region node_modules/micromark-util-subtokenize/index.js
function Bs(e) {
	let t = {}, n = -1, r, i, a, o, s, c, l, u = new Rs(e);
	for (; ++n < u.length;) {
		for (; n in t;) n = t[n];
		if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === "lineEndingBlank" && (a += 2), a < c.length && c[a][1].type === "content")) for (; ++a < c.length && c[a][1].type !== "content";) c[a][1].type === "chunkText" && (c[a][1]._isInFirstContentOfListItem = !0, a++);
		if (r[0] === "enter") r[1].contentType && (Object.assign(t, Vs(u, n)), n = t[n], l = !0);
		else if (r[1]._container) {
			for (a = n, i = void 0; a--;) if (o = u.get(a), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank") o[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = a);
			else if (!(o[1].type === "linePrefix" || o[1].type === "listItemIndent")) break;
			i && (r[1].end = { ...u.get(i)[1].start }, s = u.slice(i, n), s.unshift(r), u.splice(i, n - i + 1, s));
		}
	}
	return Io(e, 0, Infinity, u.slice(0)), !l;
}
function Vs(e, t) {
	let n = e.get(t)[1], r = e.get(t)[2], i = t - 1, a = [], o = n._tokenizer;
	o || (o = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
	let s = o.events, c = [], l = {}, u, d, f = -1, p = n, m = 0, h = 0, g = [h];
	for (; p;) {
		for (; e.get(++i)[1] !== p;);
		a.push(i), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), d && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(u), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
	}
	for (p = n; ++f < s.length;) s[f][0] === "exit" && s[f - 1][0] === "enter" && s[f][1].type === s[f - 1][1].type && s[f][1].start.line !== s[f][1].end.line && (h = f + 1, g.push(h), p._tokenizer = void 0, p.previous = void 0, p = p.next);
	for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : g.pop(), f = g.length; f--;) {
		let t = s.slice(g[f], g[f + 1]), n = a.pop();
		c.push([n, n + t.length - 1]), e.splice(n, 2, t);
	}
	for (c.reverse(), f = -1; ++f < c.length;) l[m + c[f][0]] = m + c[f][1], m += c[f][1] - c[f][0] - 1;
	return l;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/content.js
var Hs = {
	resolve: Ws,
	tokenize: Gs
}, Us = {
	partial: !0,
	tokenize: Ks
};
function Ws(e) {
	return Bs(e), e;
}
function Gs(e, t) {
	let n;
	return r;
	function r(t) {
		return e.enter("content"), n = e.enter("chunkContent", { contentType: "content" }), i(t);
	}
	function i(t) {
		return t === null ? a(t) : H(t) ? e.check(Us, o, a)(t) : (e.consume(t), i);
	}
	function a(n) {
		return e.exit("chunkContent"), e.exit("content"), t(n);
	}
	function o(t) {
		return e.consume(t), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
			contentType: "content",
			previous: n
		}), n = n.next, i;
	}
}
function Ks(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), W(e, a, "linePrefix");
	}
	function a(i) {
		if (i === null || H(i)) return n(i);
		let a = r.events[r.events.length - 1];
		return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(i) : e.interrupt(r.parser.constructs.flow, n, t)(i);
	}
}
//#endregion
//#region node_modules/micromark-factory-destination/index.js
function qs(e, t, n, r, i, a, o, s, c) {
	let l = c || Infinity, u = 0;
	return d;
	function d(t) {
		return t === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(t), e.exit(a), f) : t === null || t === 32 || t === 41 || qo(t) ? n(t) : (e.enter(r), e.enter(o), e.enter(s), e.enter("chunkString", { contentType: "string" }), h(t));
	}
	function f(n) {
		return n === 62 ? (e.enter(a), e.consume(n), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter("chunkString", { contentType: "string" }), p(n));
	}
	function p(t) {
		return t === 62 ? (e.exit("chunkString"), e.exit(s), f(t)) : t === null || t === 60 || H(t) ? n(t) : (e.consume(t), t === 92 ? m : p);
	}
	function m(t) {
		return t === 60 || t === 62 || t === 92 ? (e.consume(t), p) : p(t);
	}
	function h(i) {
		return !u && (i === null || i === 41 || Zo(i)) ? (e.exit("chunkString"), e.exit(s), e.exit(o), e.exit(r), t(i)) : u < l && i === 40 ? (e.consume(i), u++, h) : i === 41 ? (e.consume(i), u--, h) : i === null || i === 32 || i === 40 || qo(i) ? n(i) : (e.consume(i), i === 92 ? g : h);
	}
	function g(t) {
		return t === 40 || t === 41 || t === 92 ? (e.consume(t), h) : h(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-label/index.js
function Js(e, t, n, r, i, a) {
	let o = this, s = 0, c;
	return l;
	function l(t) {
		return e.enter(r), e.enter(i), e.consume(t), e.exit(i), e.enter(a), u;
	}
	function u(l) {
		return s > 999 || l === null || l === 91 || l === 93 && !c || l === 94 && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(l) : l === 93 ? (e.exit(a), e.enter(i), e.consume(l), e.exit(i), e.exit(r), t) : H(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), u) : (e.enter("chunkString", { contentType: "string" }), d(l));
	}
	function d(t) {
		return t === null || t === 91 || t === 93 || H(t) || s++ > 999 ? (e.exit("chunkString"), u(t)) : (e.consume(t), c ||= !U(t), t === 92 ? f : d);
	}
	function f(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), s++, d) : d(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-title/index.js
function Ys(e, t, n, r, i, a) {
	let o;
	return s;
	function s(t) {
		return t === 34 || t === 39 || t === 40 ? (e.enter(r), e.enter(i), e.consume(t), e.exit(i), o = t === 40 ? 41 : t, c) : n(t);
	}
	function c(n) {
		return n === o ? (e.enter(i), e.consume(n), e.exit(i), e.exit(r), t) : (e.enter(a), l(n));
	}
	function l(t) {
		return t === o ? (e.exit(a), c(o)) : t === null ? n(t) : H(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), W(e, l, "linePrefix")) : (e.enter("chunkString", { contentType: "string" }), u(t));
	}
	function u(t) {
		return t === o || t === null || H(t) ? (e.exit("chunkString"), l(t)) : (e.consume(t), t === 92 ? d : u);
	}
	function d(t) {
		return t === o || t === 92 ? (e.consume(t), u) : u(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-whitespace/index.js
function Xs(e, t) {
	let n;
	return r;
	function r(i) {
		return H(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : U(i) ? W(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/definition.js
var Zs = {
	name: "definition",
	tokenize: $s
}, Qs = {
	partial: !0,
	tokenize: ec
};
function $s(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		return e.enter("definition"), o(t);
	}
	function o(t) {
		return Js.call(r, e, s, n, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(t);
	}
	function s(t) {
		return i = Uo(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), c) : n(t);
	}
	function c(t) {
		return Zo(t) ? Xs(e, l)(t) : l(t);
	}
	function l(t) {
		return qs(e, u, n, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(t);
	}
	function u(t) {
		return e.attempt(Qs, d, d)(t);
	}
	function d(t) {
		return U(t) ? W(e, f, "whitespace")(t) : f(t);
	}
	function f(a) {
		return a === null || H(a) ? (e.exit("definition"), r.parser.defined.push(i), t(a)) : n(a);
	}
}
function ec(e, t, n) {
	return r;
	function r(t) {
		return Zo(t) ? Xs(e, i)(t) : n(t);
	}
	function i(t) {
		return Ys(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(t);
	}
	function a(t) {
		return U(t) ? W(e, o, "whitespace")(t) : o(t);
	}
	function o(e) {
		return e === null || H(e) ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var tc = {
	name: "hardBreakEscape",
	tokenize: nc
};
function nc(e, t, n) {
	return r;
	function r(t) {
		return e.enter("hardBreakEscape"), e.consume(t), i;
	}
	function i(r) {
		return H(r) ? (e.exit("hardBreakEscape"), t(r)) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/heading-atx.js
var rc = {
	name: "headingAtx",
	resolve: ic,
	tokenize: ac
};
function ic(e, t) {
	let n = e.length - 2, r = 3, i, a;
	return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
		type: "atxHeadingText",
		start: e[r][1].start,
		end: e[n][1].end
	}, a = {
		type: "chunkText",
		start: e[r][1].start,
		end: e[n][1].end,
		contentType: "text"
	}, Io(e, r, n - r + 1, [
		[
			"enter",
			i,
			t
		],
		[
			"enter",
			a,
			t
		],
		[
			"exit",
			a,
			t
		],
		[
			"exit",
			i,
			t
		]
	])), e;
}
function ac(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return e.enter("atxHeading"), a(t);
	}
	function a(t) {
		return e.enter("atxHeadingSequence"), o(t);
	}
	function o(t) {
		return t === 35 && r++ < 6 ? (e.consume(t), o) : t === null || Zo(t) ? (e.exit("atxHeadingSequence"), s(t)) : n(t);
	}
	function s(n) {
		return n === 35 ? (e.enter("atxHeadingSequence"), c(n)) : n === null || H(n) ? (e.exit("atxHeading"), t(n)) : U(n) ? W(e, s, "whitespace")(n) : (e.enter("atxHeadingText"), l(n));
	}
	function c(t) {
		return t === 35 ? (e.consume(t), c) : (e.exit("atxHeadingSequence"), s(t));
	}
	function l(t) {
		return t === null || t === 35 || Zo(t) ? (e.exit("atxHeadingText"), s(t)) : (e.consume(t), l);
	}
}
//#endregion
//#region node_modules/micromark-util-html-tag-name/index.js
var oc = /* @__PURE__ */ "address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul".split("."), sc = [
	"pre",
	"script",
	"style",
	"textarea"
], cc = {
	concrete: !0,
	name: "htmlFlow",
	resolveTo: dc,
	tokenize: fc
}, lc = {
	partial: !0,
	tokenize: mc
}, uc = {
	partial: !0,
	tokenize: pc
};
function dc(e) {
	let t = e.length;
	for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"););
	return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function fc(e, t, n) {
	let r = this, i, a, o, s, c;
	return l;
	function l(e) {
		return u(e);
	}
	function u(t) {
		return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(t), d;
	}
	function d(s) {
		return s === 33 ? (e.consume(s), f) : s === 47 ? (e.consume(s), a = !0, h) : s === 63 ? (e.consume(s), i = 3, r.interrupt ? t : ie) : Wo(s) ? (e.consume(s), o = String.fromCharCode(s), g) : n(s);
	}
	function f(a) {
		return a === 45 ? (e.consume(a), i = 2, p) : a === 91 ? (e.consume(a), i = 5, s = 0, m) : Wo(a) ? (e.consume(a), i = 4, r.interrupt ? t : ie) : n(a);
	}
	function p(i) {
		return i === 45 ? (e.consume(i), r.interrupt ? t : ie) : n(i);
	}
	function m(i) {
		return i === "CDATA[".charCodeAt(s++) ? (e.consume(i), s === 6 ? r.interrupt ? t : D : m) : n(i);
	}
	function h(t) {
		return Wo(t) ? (e.consume(t), o = String.fromCharCode(t), g) : n(t);
	}
	function g(s) {
		if (s === null || s === 47 || s === 62 || Zo(s)) {
			let c = s === 47, l = o.toLowerCase();
			return !c && !a && sc.includes(l) ? (i = 1, r.interrupt ? t(s) : D(s)) : oc.includes(o.toLowerCase()) ? (i = 6, c ? (e.consume(s), _) : r.interrupt ? t(s) : D(s)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(s) : a ? v(s) : y(s));
		}
		return s === 45 || Go(s) ? (e.consume(s), o += String.fromCharCode(s), g) : n(s);
	}
	function _(i) {
		return i === 62 ? (e.consume(i), r.interrupt ? t : D) : n(i);
	}
	function v(t) {
		return U(t) ? (e.consume(t), v) : E(t);
	}
	function y(t) {
		return t === 47 ? (e.consume(t), E) : t === 58 || t === 95 || Wo(t) ? (e.consume(t), b) : U(t) ? (e.consume(t), y) : E(t);
	}
	function b(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || Go(t) ? (e.consume(t), b) : x(t);
	}
	function x(t) {
		return t === 61 ? (e.consume(t), S) : U(t) ? (e.consume(t), x) : y(t);
	}
	function S(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), c = t, C) : U(t) ? (e.consume(t), S) : w(t);
	}
	function C(t) {
		return t === c ? (e.consume(t), c = null, T) : t === null || H(t) ? n(t) : (e.consume(t), C);
	}
	function w(t) {
		return t === null || t === 34 || t === 39 || t === 47 || t === 60 || t === 61 || t === 62 || t === 96 || Zo(t) ? x(t) : (e.consume(t), w);
	}
	function T(e) {
		return e === 47 || e === 62 || U(e) ? y(e) : n(e);
	}
	function E(t) {
		return t === 62 ? (e.consume(t), ee) : n(t);
	}
	function ee(t) {
		return t === null || H(t) ? D(t) : U(t) ? (e.consume(t), ee) : n(t);
	}
	function D(t) {
		return t === 45 && i === 2 ? (e.consume(t), ne) : t === 60 && i === 1 ? (e.consume(t), A) : t === 62 && i === 4 ? (e.consume(t), ae) : t === 63 && i === 3 ? (e.consume(t), ie) : t === 93 && i === 5 ? (e.consume(t), re) : H(t) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(lc, oe, O)(t)) : t === null || H(t) ? (e.exit("htmlFlowData"), O(t)) : (e.consume(t), D);
	}
	function O(t) {
		return e.check(uc, k, oe)(t);
	}
	function k(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), te;
	}
	function te(t) {
		return t === null || H(t) ? O(t) : (e.enter("htmlFlowData"), D(t));
	}
	function ne(t) {
		return t === 45 ? (e.consume(t), ie) : D(t);
	}
	function A(t) {
		return t === 47 ? (e.consume(t), o = "", j) : D(t);
	}
	function j(t) {
		if (t === 62) {
			let n = o.toLowerCase();
			return sc.includes(n) ? (e.consume(t), ae) : D(t);
		}
		return Wo(t) && o.length < 8 ? (e.consume(t), o += String.fromCharCode(t), j) : D(t);
	}
	function re(t) {
		return t === 93 ? (e.consume(t), ie) : D(t);
	}
	function ie(t) {
		return t === 62 ? (e.consume(t), ae) : t === 45 && i === 2 ? (e.consume(t), ie) : D(t);
	}
	function ae(t) {
		return t === null || H(t) ? (e.exit("htmlFlowData"), oe(t)) : (e.consume(t), ae);
	}
	function oe(n) {
		return e.exit("htmlFlow"), t(n);
	}
}
function pc(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return H(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a) : n(t);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
function mc(e, t, n) {
	return r;
	function r(r) {
		return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), e.attempt(gs, t, n);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/html-text.js
var hc = {
	name: "htmlText",
	tokenize: gc
};
function gc(e, t, n) {
	let r = this, i, a, o;
	return s;
	function s(t) {
		return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(t), c;
	}
	function c(t) {
		return t === 33 ? (e.consume(t), l) : t === 47 ? (e.consume(t), x) : t === 63 ? (e.consume(t), y) : Wo(t) ? (e.consume(t), w) : n(t);
	}
	function l(t) {
		return t === 45 ? (e.consume(t), u) : t === 91 ? (e.consume(t), a = 0, m) : Wo(t) ? (e.consume(t), v) : n(t);
	}
	function u(t) {
		return t === 45 ? (e.consume(t), p) : n(t);
	}
	function d(t) {
		return t === null ? n(t) : t === 45 ? (e.consume(t), f) : H(t) ? (o = d, A(t)) : (e.consume(t), d);
	}
	function f(t) {
		return t === 45 ? (e.consume(t), p) : d(t);
	}
	function p(e) {
		return e === 62 ? ne(e) : e === 45 ? f(e) : d(e);
	}
	function m(t) {
		return t === "CDATA[".charCodeAt(a++) ? (e.consume(t), a === 6 ? h : m) : n(t);
	}
	function h(t) {
		return t === null ? n(t) : t === 93 ? (e.consume(t), g) : H(t) ? (o = h, A(t)) : (e.consume(t), h);
	}
	function g(t) {
		return t === 93 ? (e.consume(t), _) : h(t);
	}
	function _(t) {
		return t === 62 ? ne(t) : t === 93 ? (e.consume(t), _) : h(t);
	}
	function v(t) {
		return t === null || t === 62 ? ne(t) : H(t) ? (o = v, A(t)) : (e.consume(t), v);
	}
	function y(t) {
		return t === null ? n(t) : t === 63 ? (e.consume(t), b) : H(t) ? (o = y, A(t)) : (e.consume(t), y);
	}
	function b(e) {
		return e === 62 ? ne(e) : y(e);
	}
	function x(t) {
		return Wo(t) ? (e.consume(t), S) : n(t);
	}
	function S(t) {
		return t === 45 || Go(t) ? (e.consume(t), S) : C(t);
	}
	function C(t) {
		return H(t) ? (o = C, A(t)) : U(t) ? (e.consume(t), C) : ne(t);
	}
	function w(t) {
		return t === 45 || Go(t) ? (e.consume(t), w) : t === 47 || t === 62 || Zo(t) ? T(t) : n(t);
	}
	function T(t) {
		return t === 47 ? (e.consume(t), ne) : t === 58 || t === 95 || Wo(t) ? (e.consume(t), E) : H(t) ? (o = T, A(t)) : U(t) ? (e.consume(t), T) : ne(t);
	}
	function E(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || Go(t) ? (e.consume(t), E) : ee(t);
	}
	function ee(t) {
		return t === 61 ? (e.consume(t), D) : H(t) ? (o = ee, A(t)) : U(t) ? (e.consume(t), ee) : T(t);
	}
	function D(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), i = t, O) : H(t) ? (o = D, A(t)) : U(t) ? (e.consume(t), D) : (e.consume(t), k);
	}
	function O(t) {
		return t === i ? (e.consume(t), i = void 0, te) : t === null ? n(t) : H(t) ? (o = O, A(t)) : (e.consume(t), O);
	}
	function k(t) {
		return t === null || t === 34 || t === 39 || t === 60 || t === 61 || t === 96 ? n(t) : t === 47 || t === 62 || Zo(t) ? T(t) : (e.consume(t), k);
	}
	function te(e) {
		return e === 47 || e === 62 || Zo(e) ? T(e) : n(e);
	}
	function ne(r) {
		return r === 62 ? (e.consume(r), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(r);
	}
	function A(t) {
		return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), j;
	}
	function j(t) {
		return U(t) ? W(e, re, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : re(t);
	}
	function re(t) {
		return e.enter("htmlTextData"), o(t);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-end.js
var _c = {
	name: "labelEnd",
	resolveAll: xc,
	resolveTo: Sc,
	tokenize: Cc
}, vc = { tokenize: wc }, yc = { tokenize: Tc }, bc = { tokenize: Ec };
function xc(e) {
	let t = -1, n = [];
	for (; ++t < e.length;) {
		let r = e[t][1];
		if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
			let e = r.type === "labelImage" ? 4 : 2;
			r.type = "data", t += e;
		}
	}
	return e.length !== n.length && Io(e, 0, e.length, n), e;
}
function Sc(e, t) {
	let n = e.length, r = 0, i, a, o, s;
	for (; n--;) if (i = e[n][1], a) {
		if (i.type === "link" || i.type === "labelLink" && i._inactive) break;
		e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
	} else if (o) {
		if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (a = n, i.type !== "labelLink")) {
			r = 2;
			break;
		}
	} else i.type === "labelEnd" && (o = n);
	let c = {
		type: e[a][1].type === "labelLink" ? "link" : "image",
		start: { ...e[a][1].start },
		end: { ...e[e.length - 1][1].end }
	}, l = {
		type: "label",
		start: { ...e[a][1].start },
		end: { ...e[o][1].end }
	}, u = {
		type: "labelText",
		start: { ...e[a + r + 2][1].end },
		end: { ...e[o - 2][1].start }
	};
	return s = [[
		"enter",
		c,
		t
	], [
		"enter",
		l,
		t
	]], s = Lo(s, e.slice(a + 1, a + r + 3)), s = Lo(s, [[
		"enter",
		u,
		t
	]]), s = Lo(s, ls(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, o - 3), t)), s = Lo(s, [
		[
			"exit",
			u,
			t
		],
		e[o - 2],
		e[o - 1],
		[
			"exit",
			l,
			t
		]
	]), s = Lo(s, e.slice(o + 1)), s = Lo(s, [[
		"exit",
		c,
		t
	]]), Io(e, a, e.length, s), e;
}
function Cc(e, t, n) {
	let r = this, i = r.events.length, a, o;
	for (; i--;) if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
		a = r.events[i][1];
		break;
	}
	return s;
	function s(t) {
		return a ? a._inactive ? d(t) : (o = r.parser.defined.includes(Uo(r.sliceSerialize({
			start: a.end,
			end: r.now()
		}))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelEnd"), c) : n(t);
	}
	function c(t) {
		return t === 40 ? e.attempt(vc, u, o ? u : d)(t) : t === 91 ? e.attempt(yc, u, o ? l : d)(t) : o ? u(t) : d(t);
	}
	function l(t) {
		return e.attempt(bc, u, d)(t);
	}
	function u(e) {
		return t(e);
	}
	function d(e) {
		return a._balanced = !0, n(e);
	}
}
function wc(e, t, n) {
	return r;
	function r(t) {
		return e.enter("resource"), e.enter("resourceMarker"), e.consume(t), e.exit("resourceMarker"), i;
	}
	function i(t) {
		return Zo(t) ? Xs(e, a)(t) : a(t);
	}
	function a(t) {
		return t === 41 ? u(t) : qs(e, o, s, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(t);
	}
	function o(t) {
		return Zo(t) ? Xs(e, c)(t) : u(t);
	}
	function s(e) {
		return n(e);
	}
	function c(t) {
		return t === 34 || t === 39 || t === 40 ? Ys(e, l, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(t) : u(t);
	}
	function l(t) {
		return Zo(t) ? Xs(e, u)(t) : u(t);
	}
	function u(r) {
		return r === 41 ? (e.enter("resourceMarker"), e.consume(r), e.exit("resourceMarker"), e.exit("resource"), t) : n(r);
	}
}
function Tc(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return Js.call(r, e, a, o, "reference", "referenceMarker", "referenceString")(t);
	}
	function a(e) {
		return r.parser.defined.includes(Uo(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(e) : n(e);
	}
	function o(e) {
		return n(e);
	}
}
function Ec(e, t, n) {
	return r;
	function r(t) {
		return e.enter("reference"), e.enter("referenceMarker"), e.consume(t), e.exit("referenceMarker"), i;
	}
	function i(r) {
		return r === 93 ? (e.enter("referenceMarker"), e.consume(r), e.exit("referenceMarker"), e.exit("reference"), t) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-start-image.js
var Dc = {
	name: "labelStartImage",
	resolveAll: _c.resolveAll,
	tokenize: Oc
};
function Oc(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(t), e.exit("labelImageMarker"), a;
	}
	function a(t) {
		return t === 91 ? (e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelImage"), o) : n(t);
	}
	function o(e) {
		/* c8 ignore next 3 */
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-start-link.js
var kc = {
	name: "labelStartLink",
	resolveAll: _c.resolveAll,
	tokenize: Ac
};
function Ac(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("labelLink"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelLink"), a;
	}
	function a(e) {
		/* c8 ignore next 3 */
		return e === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/line-ending.js
var jc = {
	name: "lineEnding",
	tokenize: Mc
};
function Mc(e, t) {
	return n;
	function n(n) {
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), W(e, t, "linePrefix");
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/thematic-break.js
var Nc = {
	name: "thematicBreak",
	tokenize: Pc
};
function Pc(e, t, n) {
	let r = 0, i;
	return a;
	function a(t) {
		return e.enter("thematicBreak"), o(t);
	}
	function o(e) {
		return i = e, s(e);
	}
	function s(a) {
		return a === i ? (e.enter("thematicBreakSequence"), c(a)) : r >= 3 && (a === null || H(a)) ? (e.exit("thematicBreak"), t(a)) : n(a);
	}
	function c(t) {
		return t === i ? (e.consume(t), r++, c) : (e.exit("thematicBreakSequence"), U(t) ? W(e, s, "whitespace")(t) : s(t));
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/list.js
var Fc = {
	continuation: { tokenize: zc },
	exit: Vc,
	name: "list",
	tokenize: Rc
}, Ic = {
	partial: !0,
	tokenize: Hc
}, Lc = {
	partial: !0,
	tokenize: Bc
};
function Rc(e, t, n) {
	let r = this, i = r.events[r.events.length - 1], a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
	return s;
	function s(t) {
		let i = r.containerState.type || (t === 42 || t === 43 || t === 45 ? "listUnordered" : "listOrdered");
		if (i === "listUnordered" ? !r.containerState.marker || t === r.containerState.marker : Jo(t)) {
			if (r.containerState.type || (r.containerState.type = i, e.enter(i, { _container: !0 })), i === "listUnordered") return e.enter("listItemPrefix"), t === 42 || t === 45 ? e.check(Nc, n, l)(t) : l(t);
			if (!r.interrupt || t === 49) return e.enter("listItemPrefix"), e.enter("listItemValue"), c(t);
		}
		return n(t);
	}
	function c(t) {
		return Jo(t) && ++o < 10 ? (e.consume(t), c) : (!r.interrupt || o < 2) && (r.containerState.marker ? t === r.containerState.marker : t === 41 || t === 46) ? (e.exit("listItemValue"), l(t)) : n(t);
	}
	function l(t) {
		return e.enter("listItemMarker"), e.consume(t), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || t, e.check(gs, r.interrupt ? n : u, e.attempt(Ic, f, d));
	}
	function u(e) {
		return r.containerState.initialBlankLine = !0, a++, f(e);
	}
	function d(t) {
		return U(t) ? (e.enter("listItemPrefixWhitespace"), e.consume(t), e.exit("listItemPrefixWhitespace"), f) : n(t);
	}
	function f(n) {
		return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(n);
	}
}
function zc(e, t, n) {
	let r = this;
	return r.containerState._closeFlow = void 0, e.check(gs, i, a);
	function i(n) {
		return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, W(e, t, "listItemIndent", r.containerState.size + 1)(n);
	}
	function a(n) {
		return r.containerState.furtherBlankLines || !U(n) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(n)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Lc, t, o)(n));
	}
	function o(i) {
		return r.containerState._closeFlow = !0, r.interrupt = void 0, W(e, e.attempt(Fc, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i);
	}
}
function Bc(e, t, n) {
	let r = this;
	return W(e, i, "listItemIndent", r.containerState.size + 1);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? t(e) : n(e);
	}
}
function Vc(e) {
	e.exit(this.containerState.type);
}
function Hc(e, t, n) {
	let r = this;
	return W(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return !U(e) && i && i[1].type === "listItemPrefixWhitespace" ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/setext-underline.js
var Uc = {
	name: "setextUnderline",
	resolveTo: Wc,
	tokenize: Gc
};
function Wc(e, t) {
	let n = e.length, r, i, a;
	for (; n--;) if (e[n][0] === "enter") {
		if (e[n][1].type === "content") {
			r = n;
			break;
		}
		e[n][1].type === "paragraph" && (i = n);
	} else e[n][1].type === "content" && e.splice(n, 1), !a && e[n][1].type === "definition" && (a = n);
	let o = {
		type: "setextHeading",
		start: { ...e[r][1].start },
		end: { ...e[e.length - 1][1].end }
	};
	return e[i][1].type = "setextHeadingText", a ? (e.splice(i, 0, [
		"enter",
		o,
		t
	]), e.splice(a + 1, 0, [
		"exit",
		e[r][1],
		t
	]), e[r][1].end = { ...e[a][1].end }) : e[r][1] = o, e.push([
		"exit",
		o,
		t
	]), e;
}
function Gc(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		let a = r.events.length, s;
		for (; a--;) if (r.events[a][1].type !== "lineEnding" && r.events[a][1].type !== "linePrefix" && r.events[a][1].type !== "content") {
			s = r.events[a][1].type === "paragraph";
			break;
		}
		return !r.parser.lazy[r.now().line] && (r.interrupt || s) ? (e.enter("setextHeadingLine"), i = t, o(t)) : n(t);
	}
	function o(t) {
		return e.enter("setextHeadingLineSequence"), s(t);
	}
	function s(t) {
		return t === i ? (e.consume(t), s) : (e.exit("setextHeadingLineSequence"), U(t) ? W(e, c, "lineSuffix")(t) : c(t));
	}
	function c(r) {
		return r === null || H(r) ? (e.exit("setextHeadingLine"), t(r)) : n(r);
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/flow.js
var Kc = { tokenize: qc };
function qc(e) {
	let t = this, n = e.attempt(gs, r, e.attempt(this.parser.constructs.flowInitial, i, W(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Hs, i)), "linePrefix")));
	return n;
	function r(r) {
		if (r === null) {
			e.consume(r);
			return;
		}
		return e.enter("lineEndingBlank"), e.consume(r), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
	}
	function i(r) {
		if (r === null) {
			e.consume(r);
			return;
		}
		return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), t.currentConstruct = void 0, n;
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/text.js
var Jc = { resolveAll: Qc() }, Yc = Zc("string"), Xc = Zc("text");
function Zc(e) {
	return {
		resolveAll: Qc(e === "text" ? $c : void 0),
		tokenize: t
	};
	function t(t) {
		let n = this, r = this.parser.constructs[e], i = t.attempt(r, a, o);
		return a;
		function a(e) {
			return c(e) ? i(e) : o(e);
		}
		function o(e) {
			if (e === null) {
				t.consume(e);
				return;
			}
			return t.enter("data"), t.consume(e), s;
		}
		function s(e) {
			return c(e) ? (t.exit("data"), i(e)) : (t.consume(e), s);
		}
		function c(e) {
			if (e === null) return !0;
			let t = r[e], i = -1;
			if (t) for (; ++i < t.length;) {
				let e = t[i];
				if (!e.previous || e.previous.call(n, n.previous)) return !0;
			}
			return !1;
		}
	}
}
function Qc(e) {
	return t;
	function t(t, n) {
		let r = -1, i;
		for (; ++r <= t.length;) i === void 0 ? t[r] && t[r][1].type === "data" && (i = r, r++) : (!t[r] || t[r][1].type !== "data") && (r !== i + 2 && (t[i][1].end = t[r - 1][1].end, t.splice(i + 2, r - i - 2), r = i + 2), i = void 0);
		return e ? e(t, n) : t;
	}
}
function $c(e, t) {
	let n = 0;
	for (; ++n <= e.length;) if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
		let r = e[n - 1][1], i = t.sliceStream(r), a = i.length, o = -1, s = 0, c;
		for (; a--;) {
			let e = i[a];
			if (typeof e == "string") {
				for (o = e.length; e.charCodeAt(o - 1) === 32;) s++, o--;
				if (o) break;
				o = -1;
			} else if (e === -2) c = !0, s++;
			else if (e !== -1) {
				a++;
				break;
			}
		}
		if (t._contentTypeTextTrailing && n === e.length && (s = 0), s) {
			let i = {
				type: n === e.length || c || s < 2 ? "lineSuffix" : "hardBreakTrailing",
				start: {
					_bufferIndex: a ? o : r.start._bufferIndex + o,
					_index: r.start._index + a,
					line: r.end.line,
					column: r.end.column - s,
					offset: r.end.offset - s
				},
				end: { ...r.end }
			};
			r.end = { ...i.start }, r.start.offset === r.end.offset ? Object.assign(r, i) : (e.splice(n, 0, [
				"enter",
				i,
				t
			], [
				"exit",
				i,
				t
			]), n += 2);
		}
		n++;
	}
	return e;
}
//#endregion
//#region node_modules/micromark/lib/constructs.js
var el = /* @__PURE__ */ t({
	attentionMarkers: () => cl,
	contentInitial: () => nl,
	disable: () => ll,
	document: () => tl,
	flow: () => il,
	flowInitial: () => rl,
	insideSpan: () => sl,
	string: () => al,
	text: () => ol
}), tl = {
	42: Fc,
	43: Fc,
	45: Fc,
	48: Fc,
	49: Fc,
	50: Fc,
	51: Fc,
	52: Fc,
	53: Fc,
	54: Fc,
	55: Fc,
	56: Fc,
	57: Fc,
	62: vs
}, nl = { 91: Zs }, rl = {
	[-2]: As,
	[-1]: As,
	32: As
}, il = {
	35: rc,
	42: Nc,
	45: [Uc, Nc],
	60: cc,
	61: Uc,
	95: Nc,
	96: Ds,
	126: Ds
}, al = {
	38: ws,
	92: Ss
}, ol = {
	[-5]: jc,
	[-4]: jc,
	[-3]: jc,
	33: Dc,
	38: ws,
	42: us,
	60: [ms, hc],
	91: kc,
	92: [tc, Ss],
	93: _c,
	95: us,
	96: Ps
}, sl = { null: [us, Jc] }, cl = { null: [42, 95] }, ll = { null: [] };
//#endregion
//#region node_modules/micromark/lib/create-tokenizer.js
function ul(e, t, n) {
	let r = {
		_bufferIndex: -1,
		_index: 0,
		line: n && n.line || 1,
		column: n && n.column || 1,
		offset: n && n.offset || 0
	}, i = {}, a = [], o = [], s = [], c = {
		attempt: C(x),
		check: C(S),
		consume: v,
		enter: y,
		exit: b,
		interrupt: C(S, { interrupt: !0 })
	}, l = {
		code: null,
		containerState: {},
		defineSkip: h,
		events: [],
		now: m,
		parser: e,
		previous: null,
		sliceSerialize: f,
		sliceStream: p,
		write: d
	}, u = t.tokenize.call(l, c);
	return t.resolveAll && a.push(t), l;
	function d(e) {
		return o = Lo(o, e), g(), o[o.length - 1] === null ? (w(t, 0), l.events = ls(a, l.events, l), l.events) : [];
	}
	function f(e, t) {
		return fl(p(e), t);
	}
	function p(e) {
		return dl(o, e);
	}
	function m() {
		let { _bufferIndex: e, _index: t, line: n, column: i, offset: a } = r;
		return {
			_bufferIndex: e,
			_index: t,
			line: n,
			column: i,
			offset: a
		};
	}
	function h(e) {
		i[e.line] = e.column, E();
	}
	function g() {
		let e;
		for (; r._index < o.length;) {
			let t = o[r._index];
			if (typeof t == "string") for (e = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === e && r._bufferIndex < t.length;) _(t.charCodeAt(r._bufferIndex));
			else _(t);
		}
	}
	function _(e) {
		u = u(e);
	}
	function v(e) {
		H(e) ? (r.line++, r.column = 1, r.offset += e === -3 ? 2 : 1, E()) : e !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === o[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = e;
	}
	function y(e, t) {
		let n = t || {};
		return n.type = e, n.start = m(), l.events.push([
			"enter",
			n,
			l
		]), s.push(n), n;
	}
	function b(e) {
		let t = s.pop();
		return t.end = m(), l.events.push([
			"exit",
			t,
			l
		]), t;
	}
	function x(e, t) {
		w(e, t.from);
	}
	function S(e, t) {
		t.restore();
	}
	function C(e, t) {
		return n;
		function n(n, r, i) {
			let a, o, s, u;
			return Array.isArray(n) ? f(n) : "tokenize" in n ? f([n]) : d(n);
			function d(e) {
				return t;
				function t(t) {
					let n = t !== null && e[t], r = t !== null && e.null;
					return f([...Array.isArray(n) ? n : n ? [n] : [], ...Array.isArray(r) ? r : r ? [r] : []])(t);
				}
			}
			function f(e) {
				return a = e, o = 0, e.length === 0 ? i : p(e[o]);
			}
			function p(e) {
				return n;
				function n(n) {
					return u = T(), s = e, e.partial || (l.currentConstruct = e), e.name && l.parser.constructs.disable.null.includes(e.name) ? h(n) : e.tokenize.call(t ? Object.assign(Object.create(l), t) : l, c, m, h)(n);
				}
			}
			function m(t) {
				return e(s, u), r;
			}
			function h(e) {
				return u.restore(), ++o < a.length ? p(a[o]) : i;
			}
		}
	}
	function w(e, t) {
		e.resolveAll && !a.includes(e) && a.push(e), e.resolve && Io(l.events, t, l.events.length - t, e.resolve(l.events.slice(t), l)), e.resolveTo && (l.events = e.resolveTo(l.events, l));
	}
	function T() {
		let e = m(), t = l.previous, n = l.currentConstruct, i = l.events.length, a = Array.from(s);
		return {
			from: i,
			restore: o
		};
		function o() {
			r = e, l.previous = t, l.currentConstruct = n, l.events.length = i, s = a, E();
		}
	}
	function E() {
		r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
	}
}
function dl(e, t) {
	let n = t.start._index, r = t.start._bufferIndex, i = t.end._index, a = t.end._bufferIndex, o;
	if (n === i) o = [e[n].slice(r, a)];
	else {
		if (o = e.slice(n, i), r > -1) {
			let e = o[0];
			typeof e == "string" ? o[0] = e.slice(r) : o.shift();
		}
		a > 0 && o.push(e[i].slice(0, a));
	}
	return o;
}
function fl(e, t) {
	let n = -1, r = [], i;
	for (; ++n < e.length;) {
		let a = e[n], o;
		if (typeof a == "string") o = a;
		else switch (a) {
			case -5:
				o = "\r";
				break;
			case -4:
				o = "\n";
				break;
			case -3:
				o = "\r\n";
				break;
			case -2:
				o = t ? " " : "	";
				break;
			case -1:
				if (!t && i) continue;
				o = " ";
				break;
			default: o = String.fromCharCode(a);
		}
		i = a === -2, r.push(o);
	}
	return r.join("");
}
//#endregion
//#region node_modules/micromark/lib/parse.js
function pl(e) {
	let t = {
		constructs: zo([el, ...(e || {}).extensions || []]),
		content: n(ns),
		defined: [],
		document: n(is),
		flow: n(Kc),
		lazy: {},
		string: n(Yc),
		text: n(Xc)
	};
	return t;
	function n(e) {
		return n;
		function n(n) {
			return ul(t, e, n);
		}
	}
}
//#endregion
//#region node_modules/micromark/lib/postprocess.js
function ml(e) {
	for (; !Bs(e););
	return e;
}
//#endregion
//#region node_modules/micromark/lib/preprocess.js
var hl = /[\0\t\n\r]/g;
function gl() {
	let e = 1, t = "", n = !0, r;
	return i;
	function i(i, a, o) {
		let s = [], c, l, u, d, f;
		for (i = t + (typeof i == "string" ? i.toString() : new TextDecoder(a || void 0).decode(i)), u = 0, t = "", n &&= (i.charCodeAt(0) === 65279 && u++, void 0); u < i.length;) {
			if (hl.lastIndex = u, c = hl.exec(i), d = c && c.index !== void 0 ? c.index : i.length, f = i.charCodeAt(d), !c) {
				t = i.slice(u);
				break;
			}
			if (f === 10 && u === d && r) s.push(-3), r = void 0;
			else switch (r &&= (s.push(-5), void 0), u < d && (s.push(i.slice(u, d)), e += d - u), f) {
				case 0:
					s.push(65533), e++;
					break;
				case 9:
					for (l = Math.ceil(e / 4) * 4, s.push(-2); e++ < l;) s.push(-1);
					break;
				case 10:
					s.push(-4), e = 1;
					break;
				default: r = !0, e = 1;
			}
			u = d + 1;
		}
		return o && (r && s.push(-5), t && s.push(t), s.push(null)), s;
	}
}
//#endregion
//#region node_modules/micromark-util-decode-string/index.js
var _l = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function vl(e) {
	return e.replace(_l, yl);
}
function yl(e, t, n) {
	if (t) return t;
	if (n.charCodeAt(0) === 35) {
		let e = n.charCodeAt(1), t = e === 120 || e === 88;
		return Ho(n.slice(t ? 2 : 1), t ? 16 : 10);
	}
	return Fo(n) || e;
}
//#endregion
//#region node_modules/mdast-util-from-markdown/lib/index.js
var bl = {}.hasOwnProperty;
function xl(e, t, n) {
	return t && typeof t == "object" && (n = t, t = void 0), Sl(n)(ml(pl(n).document().write(gl()(e, t, !0))));
}
function Sl(e) {
	let t = {
		transforms: [],
		canContainEols: [
			"emphasis",
			"fragment",
			"heading",
			"paragraph",
			"strong"
		],
		enter: {
			autolink: a(xe),
			autolinkProtocol: T,
			autolinkEmail: T,
			atxHeading: a(ve),
			blockQuote: a(pe),
			characterEscape: T,
			characterReference: T,
			codeFenced: a(me),
			codeFencedFenceInfo: o,
			codeFencedFenceMeta: o,
			codeIndented: a(me, o),
			codeText: a(he, o),
			codeTextData: T,
			data: T,
			codeFlowValue: T,
			definition: a(ge),
			definitionDestinationString: o,
			definitionLabelString: o,
			definitionTitleString: o,
			emphasis: a(_e),
			hardBreakEscape: a(N),
			hardBreakTrailing: a(N),
			htmlFlow: a(ye, o),
			htmlFlowData: T,
			htmlText: a(ye, o),
			htmlTextData: T,
			image: a(be),
			label: o,
			link: a(xe),
			listItem: a(Ce),
			listItemValue: f,
			listOrdered: a(Se, d),
			listUnordered: a(Se),
			paragraph: a(we),
			reference: se,
			referenceString: o,
			resourceDestinationString: o,
			resourceTitleString: o,
			setextHeading: a(ve),
			strong: a(P),
			thematicBreak: a(Ee)
		},
		exit: {
			atxHeading: c(),
			atxHeadingSequence: x,
			autolink: c(),
			autolinkEmail: fe,
			autolinkProtocol: de,
			blockQuote: c(),
			characterEscapeValue: E,
			characterReferenceMarkerHexadecimal: ce,
			characterReferenceMarkerNumeric: ce,
			characterReferenceValue: le,
			characterReference: ue,
			codeFenced: c(g),
			codeFencedFence: h,
			codeFencedFenceInfo: p,
			codeFencedFenceMeta: m,
			codeFlowValue: E,
			codeIndented: c(_),
			codeText: c(te),
			codeTextData: E,
			data: E,
			definition: c(),
			definitionDestinationString: b,
			definitionLabelString: v,
			definitionTitleString: y,
			emphasis: c(),
			hardBreakEscape: c(D),
			hardBreakTrailing: c(D),
			htmlFlow: c(O),
			htmlFlowData: E,
			htmlText: c(k),
			htmlTextData: E,
			image: c(A),
			label: re,
			labelText: j,
			lineEnding: ee,
			link: c(ne),
			listItem: c(),
			listOrdered: c(),
			listUnordered: c(),
			paragraph: c(),
			referenceString: M,
			resourceDestinationString: ie,
			resourceTitleString: ae,
			resource: oe,
			setextHeading: c(w),
			setextHeadingLineSequence: C,
			setextHeadingText: S,
			strong: c(),
			thematicBreak: c()
		}
	};
	wl(t, (e || {}).mdastExtensions || []);
	let n = {};
	return r;
	function r(e) {
		let r = {
			type: "root",
			children: []
		}, a = {
			stack: [r],
			tokenStack: [],
			config: t,
			enter: s,
			exit: l,
			buffer: o,
			resume: u,
			data: n
		}, c = [], d = -1;
		for (; ++d < e.length;) (e[d][1].type === "listOrdered" || e[d][1].type === "listUnordered") && (e[d][0] === "enter" ? c.push(d) : d = i(e, c.pop(), d));
		for (d = -1; ++d < e.length;) {
			let n = t[e[d][0]];
			bl.call(n, e[d][1].type) && n[e[d][1].type].call(Object.assign({ sliceSerialize: e[d][2].sliceSerialize }, a), e[d][1]);
		}
		if (a.tokenStack.length > 0) {
			let e = a.tokenStack[a.tokenStack.length - 1];
			(e[1] || El).call(a, void 0, e[0]);
		}
		for (r.position = {
			start: Cl(e.length > 0 ? e[0][1].start : {
				line: 1,
				column: 1,
				offset: 0
			}),
			end: Cl(e.length > 0 ? e[e.length - 2][1].end : {
				line: 1,
				column: 1,
				offset: 0
			})
		}, d = -1; ++d < t.transforms.length;) r = t.transforms[d](r) || r;
		return r;
	}
	function i(e, t, n) {
		let r = t - 1, i = -1, a = !1, o, s, c, l;
		for (; ++r <= n;) {
			let t = e[r];
			switch (t[1].type) {
				case "listUnordered":
				case "listOrdered":
				case "blockQuote":
					t[0] === "enter" ? i++ : i--, l = void 0;
					break;
				case "lineEndingBlank":
					t[0] === "enter" && (o && !l && !i && !c && (c = r), l = void 0);
					break;
				case "linePrefix":
				case "listItemValue":
				case "listItemMarker":
				case "listItemPrefix":
				case "listItemPrefixWhitespace": break;
				default: l = void 0;
			}
			if (!i && t[0] === "enter" && t[1].type === "listItemPrefix" || i === -1 && t[0] === "exit" && (t[1].type === "listUnordered" || t[1].type === "listOrdered")) {
				if (o) {
					let i = r;
					for (s = void 0; i--;) {
						let t = e[i];
						if (t[1].type === "lineEnding" || t[1].type === "lineEndingBlank") {
							if (t[0] === "exit") continue;
							s && (e[s][1].type = "lineEndingBlank", a = !0), t[1].type = "lineEnding", s = i;
						} else if (!(t[1].type === "linePrefix" || t[1].type === "blockQuotePrefix" || t[1].type === "blockQuotePrefixWhitespace" || t[1].type === "blockQuoteMarker" || t[1].type === "listItemIndent")) break;
					}
					c && (!s || c < s) && (o._spread = !0), o.end = Object.assign({}, s ? e[s][1].start : t[1].end), e.splice(s || r, 0, [
						"exit",
						o,
						t[2]
					]), r++, n++;
				}
				if (t[1].type === "listItemPrefix") {
					let i = {
						type: "listItem",
						_spread: !1,
						start: Object.assign({}, t[1].start),
						end: void 0
					};
					o = i, e.splice(r, 0, [
						"enter",
						i,
						t[2]
					]), r++, n++, c = void 0, l = !0;
				}
			}
		}
		return e[t][1]._spread = a, n;
	}
	function a(e, t) {
		return n;
		function n(n) {
			s.call(this, e(n), n), t && t.call(this, n);
		}
	}
	function o() {
		this.stack.push({
			type: "fragment",
			children: []
		});
	}
	function s(e, t, n) {
		this.stack[this.stack.length - 1].children.push(e), this.stack.push(e), this.tokenStack.push([t, n || void 0]), e.position = {
			start: Cl(t.start),
			end: void 0
		};
	}
	function c(e) {
		return t;
		function t(t) {
			e && e.call(this, t), l.call(this, t);
		}
	}
	function l(e, t) {
		let n = this.stack.pop(), r = this.tokenStack.pop();
		if (r) r[0].type !== e.type && (t ? t.call(this, e, r[0]) : (r[1] || El).call(this, e, r[0]));
		else throw Error("Cannot close `" + e.type + "` (" + Ja({
			start: e.start,
			end: e.end
		}) + "): it’s not open");
		n.position.end = Cl(e.end);
	}
	function u() {
		return Ao(this.stack.pop());
	}
	function d() {
		this.data.expectingFirstListItemValue = !0;
	}
	function f(e) {
		if (this.data.expectingFirstListItemValue) {
			let t = this.stack[this.stack.length - 2];
			t.start = Number.parseInt(this.sliceSerialize(e), 10), this.data.expectingFirstListItemValue = void 0;
		}
	}
	function p() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.lang = e;
	}
	function m() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.meta = e;
	}
	function h() {
		this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
	}
	function g() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
	}
	function _() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e.replace(/(\r?\n|\r)$/g, "");
	}
	function v(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.label = t, n.identifier = Uo(this.sliceSerialize(e)).toLowerCase();
	}
	function y() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.title = e;
	}
	function b() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.url = e;
	}
	function x(e) {
		let t = this.stack[this.stack.length - 1];
		t.depth ||= this.sliceSerialize(e).length;
	}
	function S() {
		this.data.setextHeadingSlurpLineEnding = !0;
	}
	function C(e) {
		let t = this.stack[this.stack.length - 1];
		t.depth = this.sliceSerialize(e).codePointAt(0) === 61 ? 1 : 2;
	}
	function w() {
		this.data.setextHeadingSlurpLineEnding = void 0;
	}
	function T(e) {
		let t = this.stack[this.stack.length - 1].children, n = t[t.length - 1];
		(!n || n.type !== "text") && (n = Te(), n.position = {
			start: Cl(e.start),
			end: void 0
		}, t.push(n)), this.stack.push(n);
	}
	function E(e) {
		let t = this.stack.pop();
		t.value += this.sliceSerialize(e), t.position.end = Cl(e.end);
	}
	function ee(e) {
		let n = this.stack[this.stack.length - 1];
		if (this.data.atHardBreak) {
			let t = n.children[n.children.length - 1];
			t.position.end = Cl(e.end), this.data.atHardBreak = void 0;
			return;
		}
		!this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(n.type) && (T.call(this, e), E.call(this, e));
	}
	function D() {
		this.data.atHardBreak = !0;
	}
	function O() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function k() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function te() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function ne() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function A() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function j(e) {
		let t = this.sliceSerialize(e), n = this.stack[this.stack.length - 2];
		n.label = vl(t), n.identifier = Uo(t).toLowerCase();
	}
	function re() {
		let e = this.stack[this.stack.length - 1], t = this.resume(), n = this.stack[this.stack.length - 1];
		this.data.inReference = !0, n.type === "link" ? n.children = e.children : n.alt = t;
	}
	function ie() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.url = e;
	}
	function ae() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.title = e;
	}
	function oe() {
		this.data.inReference = void 0;
	}
	function se() {
		this.data.referenceType = "collapsed";
	}
	function M(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.label = t, n.identifier = Uo(this.sliceSerialize(e)).toLowerCase(), this.data.referenceType = "full";
	}
	function ce(e) {
		this.data.characterReferenceType = e.type;
	}
	function le(e) {
		let t = this.sliceSerialize(e), n = this.data.characterReferenceType, r;
		n ? (r = Ho(t, n === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : r = Fo(t);
		let i = this.stack[this.stack.length - 1];
		i.value += r;
	}
	function ue(e) {
		let t = this.stack.pop();
		t.position.end = Cl(e.end);
	}
	function de(e) {
		E.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = this.sliceSerialize(e);
	}
	function fe(e) {
		E.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = "mailto:" + this.sliceSerialize(e);
	}
	function pe() {
		return {
			type: "blockquote",
			children: []
		};
	}
	function me() {
		return {
			type: "code",
			lang: null,
			meta: null,
			value: ""
		};
	}
	function he() {
		return {
			type: "inlineCode",
			value: ""
		};
	}
	function ge() {
		return {
			type: "definition",
			identifier: "",
			label: null,
			title: null,
			url: ""
		};
	}
	function _e() {
		return {
			type: "emphasis",
			children: []
		};
	}
	function ve() {
		return {
			type: "heading",
			depth: 0,
			children: []
		};
	}
	function N() {
		return { type: "break" };
	}
	function ye() {
		return {
			type: "html",
			value: ""
		};
	}
	function be() {
		return {
			type: "image",
			title: null,
			url: "",
			alt: null
		};
	}
	function xe() {
		return {
			type: "link",
			title: null,
			url: "",
			children: []
		};
	}
	function Se(e) {
		return {
			type: "list",
			ordered: e.type === "listOrdered",
			start: null,
			spread: e._spread,
			children: []
		};
	}
	function Ce(e) {
		return {
			type: "listItem",
			spread: e._spread,
			checked: null,
			children: []
		};
	}
	function we() {
		return {
			type: "paragraph",
			children: []
		};
	}
	function P() {
		return {
			type: "strong",
			children: []
		};
	}
	function Te() {
		return {
			type: "text",
			value: ""
		};
	}
	function Ee() {
		return { type: "thematicBreak" };
	}
}
function Cl(e) {
	return {
		line: e.line,
		column: e.column,
		offset: e.offset
	};
}
function wl(e, t) {
	let n = -1;
	for (; ++n < t.length;) {
		let r = t[n];
		Array.isArray(r) ? wl(e, r) : Tl(e, r);
	}
}
function Tl(e, t) {
	let n;
	for (n in t) if (bl.call(t, n)) switch (n) {
		case "canContainEols": {
			let r = t[n];
			r && e[n].push(...r);
			break;
		}
		case "transforms": {
			let r = t[n];
			r && e[n].push(...r);
			break;
		}
		case "enter":
		case "exit": {
			let r = t[n];
			r && Object.assign(e[n], r);
			break;
		}
	}
}
function El(e, t) {
	throw Error(e ? "Cannot close `" + e.type + "` (" + Ja({
		start: e.start,
		end: e.end
	}) + "): a different token (`" + t.type + "`, " + Ja({
		start: t.start,
		end: t.end
	}) + ") is open" : "Cannot close document, a token (`" + t.type + "`, " + Ja({
		start: t.start,
		end: t.end
	}) + ") is still open");
}
//#endregion
//#region node_modules/remark-parse/lib/index.js
function Dl(e) {
	let t = this;
	t.parser = n;
	function n(n) {
		return xl(n, {
			...t.data("settings"),
			...e,
			extensions: t.data("micromarkExtensions") || [],
			mdastExtensions: t.data("fromMarkdownExtensions") || []
		});
	}
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
function Ol(e, t) {
	let n = {
		type: "element",
		tagName: "blockquote",
		properties: {},
		children: e.wrap(e.all(t), !0)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/break.js
function kl(e, t) {
	let n = {
		type: "element",
		tagName: "br",
		properties: {},
		children: []
	};
	return e.patch(t, n), [e.applyData(t, n), {
		type: "text",
		value: "\n"
	}];
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/code.js
function Al(e, t) {
	let n = t.value ? t.value + "\n" : "", r = {}, i = t.lang ? t.lang.split(/\s+/) : [];
	i.length > 0 && (r.className = ["language-" + i[0]]);
	let a = {
		type: "element",
		tagName: "code",
		properties: r,
		children: [{
			type: "text",
			value: n
		}]
	};
	return t.meta && (a.data = { meta: t.meta }), e.patch(t, a), a = e.applyData(t, a), a = {
		type: "element",
		tagName: "pre",
		properties: {},
		children: [a]
	}, e.patch(t, a), a;
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/delete.js
function jl(e, t) {
	let n = {
		type: "element",
		tagName: "del",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
function Ml(e, t) {
	let n = {
		type: "element",
		tagName: "em",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
function Nl(e, t) {
	let n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = ts(r.toLowerCase()), a = e.footnoteOrder.indexOf(r), o, s = e.footnoteCounts.get(r);
	s === void 0 ? (s = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = a + 1, s += 1, e.footnoteCounts.set(r, s);
	let c = {
		type: "element",
		tagName: "a",
		properties: {
			href: "#" + n + "fn-" + i,
			id: n + "fnref-" + i + (s > 1 ? "-" + s : ""),
			dataFootnoteRef: !0,
			ariaDescribedBy: ["footnote-label"]
		},
		children: [{
			type: "text",
			value: String(o)
		}]
	};
	e.patch(t, c);
	let l = {
		type: "element",
		tagName: "sup",
		properties: {},
		children: [c]
	};
	return e.patch(t, l), e.applyData(t, l);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/heading.js
function Pl(e, t) {
	let n = {
		type: "element",
		tagName: "h" + t.depth,
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/html.js
function Fl(e, t) {
	if (e.options.allowDangerousHtml) {
		let n = {
			type: "raw",
			value: t.value
		};
		return e.patch(t, n), e.applyData(t, n);
	}
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/revert.js
function Il(e, t) {
	let n = t.referenceType, r = "]";
	if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference") return [{
		type: "text",
		value: "![" + t.alt + r
	}];
	let i = e.all(t), a = i[0];
	a && a.type === "text" ? a.value = "[" + a.value : i.unshift({
		type: "text",
		value: "["
	});
	let o = i[i.length - 1];
	return o && o.type === "text" ? o.value += r : i.push({
		type: "text",
		value: r
	}), i;
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
function Ll(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return Il(e, t);
	let i = {
		src: ts(r.url || ""),
		alt: t.alt
	};
	r.title !== null && r.title !== void 0 && (i.title = r.title);
	let a = {
		type: "element",
		tagName: "img",
		properties: i,
		children: []
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/image.js
function Rl(e, t) {
	let n = { src: ts(t.url) };
	t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
	let r = {
		type: "element",
		tagName: "img",
		properties: n,
		children: []
	};
	return e.patch(t, r), e.applyData(t, r);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
function zl(e, t) {
	let n = {
		type: "text",
		value: t.value.replace(/\r?\n|\r/g, " ")
	};
	e.patch(t, n);
	let r = {
		type: "element",
		tagName: "code",
		properties: {},
		children: [n]
	};
	return e.patch(t, r), e.applyData(t, r);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
function G(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return Il(e, t);
	let i = { href: ts(r.url || "") };
	r.title !== null && r.title !== void 0 && (i.title = r.title);
	let a = {
		type: "element",
		tagName: "a",
		properties: i,
		children: e.all(t)
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/link.js
function Bl(e, t) {
	let n = { href: ts(t.url) };
	t.title !== null && t.title !== void 0 && (n.title = t.title);
	let r = {
		type: "element",
		tagName: "a",
		properties: n,
		children: e.all(t)
	};
	return e.patch(t, r), e.applyData(t, r);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/list-item.js
function K(e, t, n) {
	let r = e.all(t), i = n ? q(n) : J(t), a = {}, o = [];
	if (typeof t.checked == "boolean") {
		let e = r[0], n;
		e && e.type === "element" && e.tagName === "p" ? n = e : (n = {
			type: "element",
			tagName: "p",
			properties: {},
			children: []
		}, r.unshift(n)), n.children.length > 0 && n.children.unshift({
			type: "text",
			value: " "
		}), n.children.unshift({
			type: "element",
			tagName: "input",
			properties: {
				type: "checkbox",
				checked: t.checked,
				disabled: !0
			},
			children: []
		}), a.className = ["task-list-item"];
	}
	let s = -1;
	for (; ++s < r.length;) {
		let e = r[s];
		(i || s !== 0 || e.type !== "element" || e.tagName !== "p") && o.push({
			type: "text",
			value: "\n"
		}), e.type === "element" && e.tagName === "p" && !i ? o.push(...e.children) : o.push(e);
	}
	let c = r[r.length - 1];
	c && (i || c.type !== "element" || c.tagName !== "p") && o.push({
		type: "text",
		value: "\n"
	});
	let l = {
		type: "element",
		tagName: "li",
		properties: a,
		children: o
	};
	return e.patch(t, l), e.applyData(t, l);
}
function q(e) {
	let t = !1;
	if (e.type === "list") {
		t = e.spread || !1;
		let n = e.children, r = -1;
		for (; !t && ++r < n.length;) t = J(n[r]);
	}
	return t;
}
function J(e) {
	return e.spread ?? e.children.length > 1;
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/list.js
function Vl(e, t) {
	let n = {}, r = e.all(t), i = -1;
	for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length;) {
		let e = r[i];
		if (e.type === "element" && e.tagName === "li" && e.properties && Array.isArray(e.properties.className) && e.properties.className.includes("task-list-item")) {
			n.className = ["contains-task-list"];
			break;
		}
	}
	let a = {
		type: "element",
		tagName: t.ordered ? "ol" : "ul",
		properties: n,
		children: e.wrap(r, !0)
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
function Hl(e, t) {
	let n = {
		type: "element",
		tagName: "p",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/root.js
function Ul(e, t) {
	let n = {
		type: "root",
		children: e.wrap(e.all(t))
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/strong.js
function Wl(e, t) {
	let n = {
		type: "element",
		tagName: "strong",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/table.js
function Gl(e, t) {
	let n = e.all(t), r = n.shift(), i = [];
	if (r) {
		let n = {
			type: "element",
			tagName: "thead",
			properties: {},
			children: e.wrap([r], !0)
		};
		e.patch(t.children[0], n), i.push(n);
	}
	if (n.length > 0) {
		let r = {
			type: "element",
			tagName: "tbody",
			properties: {},
			children: e.wrap(n, !0)
		}, a = Ga(t.children[1]), o = Wa(t.children[t.children.length - 1]);
		a && o && (r.position = {
			start: a,
			end: o
		}), i.push(r);
	}
	let a = {
		type: "element",
		tagName: "table",
		properties: {},
		children: e.wrap(i, !0)
	};
	return e.patch(t, a), e.applyData(t, a);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/table-row.js
function Kl(e, t, n) {
	let r = n ? n.children : void 0, i = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", a = n && n.type === "table" ? n.align : void 0, o = a ? a.length : t.children.length, s = -1, c = [];
	for (; ++s < o;) {
		let n = t.children[s], r = {}, o = a ? a[s] : void 0;
		o && (r.align = o);
		let l = {
			type: "element",
			tagName: i,
			properties: r,
			children: []
		};
		n && (l.children = e.all(n), e.patch(n, l), l = e.applyData(n, l)), c.push(l);
	}
	let l = {
		type: "element",
		tagName: "tr",
		properties: {},
		children: e.wrap(c, !0)
	};
	return e.patch(t, l), e.applyData(t, l);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/table-cell.js
function ql(e, t) {
	let n = {
		type: "element",
		tagName: "td",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/trim-lines/index.js
var Jl = 9, Yl = 32;
function Xl(e) {
	let t = String(e), n = /\r?\n|\r/g, r = n.exec(t), i = 0, a = [];
	for (; r;) a.push(Zl(t.slice(i, r.index), i > 0, !0), r[0]), i = r.index + r[0].length, r = n.exec(t);
	return a.push(Zl(t.slice(i), i > 0, !1)), a.join("");
}
function Zl(e, t, n) {
	let r = 0, i = e.length;
	if (t) {
		let t = e.codePointAt(r);
		for (; t === Jl || t === Yl;) r++, t = e.codePointAt(r);
	}
	if (n) {
		let t = e.codePointAt(i - 1);
		for (; t === Jl || t === Yl;) i--, t = e.codePointAt(i - 1);
	}
	return i > r ? e.slice(r, i) : "";
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/text.js
function Ql(e, t) {
	let n = {
		type: "text",
		value: Xl(String(t.value))
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
function $l(e, t) {
	let n = {
		type: "element",
		tagName: "hr",
		properties: {},
		children: []
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/index.js
var eu = {
	blockquote: Ol,
	break: kl,
	code: Al,
	delete: jl,
	emphasis: Ml,
	footnoteReference: Nl,
	heading: Pl,
	html: Fl,
	imageReference: Ll,
	image: Rl,
	inlineCode: zl,
	linkReference: G,
	link: Bl,
	listItem: K,
	list: Vl,
	paragraph: Hl,
	root: Ul,
	strong: Wl,
	table: Gl,
	tableCell: ql,
	tableRow: Kl,
	text: Ql,
	thematicBreak: $l,
	toml: tu,
	yaml: tu,
	definition: tu,
	footnoteDefinition: tu
};
function tu() {}
//#endregion
//#region node_modules/@ungap/structured-clone/esm/deserialize.js
var nu = typeof self == "object" ? self : globalThis, ru = (e, t) => {
	switch (e) {
		case "Function":
		case "SharedWorker":
		case "Worker":
		case "eval":
		case "setInterval":
		case "setTimeout": throw TypeError("unable to deserialize " + e);
	}
	return new nu[e](t);
}, iu = (e, t) => {
	let n = (t, n) => (e.set(n, t), t), r = (i) => {
		if (e.has(i)) return e.get(i);
		let [a, o] = t[i];
		switch (a) {
			case 0:
			case -1: return n(o, i);
			case 1: {
				let e = n([], i);
				for (let t of o) e.push(r(t));
				return e;
			}
			case 2: {
				let e = n({}, i);
				for (let [t, n] of o) e[r(t)] = r(n);
				return e;
			}
			case 3: return n(new Date(o), i);
			case 4: {
				let { source: e, flags: t } = o;
				return n(new RegExp(e, t), i);
			}
			case 5: {
				let e = n(/* @__PURE__ */ new Map(), i);
				for (let [t, n] of o) e.set(r(t), r(n));
				return e;
			}
			case 6: {
				let e = n(/* @__PURE__ */ new Set(), i);
				for (let t of o) e.add(r(t));
				return e;
			}
			case 7: {
				let { name: e, message: t } = o;
				return n(typeof nu[e] == "function" ? ru(e, t) : Error(t), i);
			}
			case 8: return n(BigInt(o), i);
			case "BigInt": return n(Object(BigInt(o)), i);
			case "ArrayBuffer": return n(new Uint8Array(o).buffer, o);
			case "DataView": {
				let { buffer: e } = new Uint8Array(o);
				return n(new DataView(e), o);
			}
		}
		return n(ru(a, o), i);
	};
	return r;
}, au = (e) => iu(/* @__PURE__ */ new Map(), e)(0), ou = "", { toString: su } = {}, { keys: cu } = Object, lu = (e) => {
	let t = typeof e;
	if (t !== "object" || !e) return [0, t];
	let n = su.call(e).slice(8, -1);
	switch (n) {
		case "Array": return [1, ou];
		case "Object": return [2, ou];
		case "Date": return [3, ou];
		case "RegExp": return [4, ou];
		case "Map": return [5, ou];
		case "Set": return [6, ou];
		case "DataView": return [1, n];
	}
	return n.includes("Array") ? [1, n] : e instanceof Error ? [7, e.name || "Error"] : [2, n];
}, uu = ([e, t]) => e === 0 && (t === "function" || t === "symbol"), du = (e, t, n, r) => {
	let i = (e, t) => {
		let i = r.push(e) - 1;
		return n.set(t, i), i;
	}, a = (r) => {
		if (n.has(r)) return n.get(r);
		let [o, s] = lu(r);
		switch (o) {
			case 0: {
				let t = r;
				switch (s) {
					case "bigint":
						o = 8, t = r.toString();
						break;
					case "function":
					case "symbol":
						if (e) throw TypeError("unable to serialize " + s);
						t = null;
						break;
					case "undefined": return i([-1], r);
				}
				return i([o, t], r);
			}
			case 1: {
				if (s) {
					let e = r;
					return s === "DataView" ? e = new Uint8Array(r.buffer) : s === "ArrayBuffer" && (e = new Uint8Array(r)), i([s, [...e]], r);
				}
				let e = [], t = i([o, e], r);
				for (let t of r) e.push(a(t));
				return t;
			}
			case 2: {
				if (s) switch (s) {
					case "BigInt": return i([s, r.toString()], r);
					case "Boolean":
					case "Number":
					case "String": return i([s, r.valueOf()], r);
				}
				if (t && "toJSON" in r) return a(r.toJSON());
				let n = [], c = i([o, n], r);
				for (let t of cu(r)) (e || !uu(lu(r[t]))) && n.push([a(t), a(r[t])]);
				return c;
			}
			case 3: return i([o, isNaN(r.getTime()) ? ou : r.toISOString()], r);
			case 4: {
				let { source: e, flags: t } = r;
				return i([o, {
					source: e,
					flags: t
				}], r);
			}
			case 5: {
				let t = [], n = i([o, t], r);
				for (let [n, i] of r) (e || !(uu(lu(n)) || uu(lu(i)))) && t.push([a(n), a(i)]);
				return n;
			}
			case 6: {
				let t = [], n = i([o, t], r);
				for (let n of r) (e || !uu(lu(n))) && t.push(a(n));
				return n;
			}
		}
		let { message: c } = r;
		return i([o, {
			name: s,
			message: c
		}], r);
	};
	return a;
}, fu = (e, { json: t, lossy: n } = {}) => {
	let r = [];
	return du(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, pu = typeof structuredClone == "function" ? (e, t) => t && ("json" in t || "lossy" in t) ? au(fu(e, t)) : structuredClone(e) : (e, t) => au(fu(e, t));
//#endregion
//#region node_modules/mdast-util-to-hast/lib/footer.js
function mu(e, t) {
	let n = [{
		type: "text",
		value: "↩"
	}];
	return t > 1 && n.push({
		type: "element",
		tagName: "sup",
		properties: {},
		children: [{
			type: "text",
			value: String(t)
		}]
	}), n;
}
function hu(e, t) {
	return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function gu(e) {
	let t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || mu, r = e.options.footnoteBackLabel || hu, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || { className: ["sr-only"] }, s = [], c = -1;
	for (; ++c < e.footnoteOrder.length;) {
		let i = e.footnoteById.get(e.footnoteOrder[c]);
		if (!i) continue;
		let a = e.all(i), o = String(i.identifier).toUpperCase(), l = ts(o.toLowerCase()), u = 0, d = [], f = e.footnoteCounts.get(o);
		for (; f !== void 0 && ++u <= f;) {
			d.length > 0 && d.push({
				type: "text",
				value: " "
			});
			let e = typeof n == "string" ? n : n(c, u);
			typeof e == "string" && (e = {
				type: "text",
				value: e
			}), d.push({
				type: "element",
				tagName: "a",
				properties: {
					href: "#" + t + "fnref-" + l + (u > 1 ? "-" + u : ""),
					dataFootnoteBackref: "",
					ariaLabel: typeof r == "string" ? r : r(c, u),
					className: ["data-footnote-backref"]
				},
				children: Array.isArray(e) ? e : [e]
			});
		}
		let p = a[a.length - 1];
		if (p && p.type === "element" && p.tagName === "p") {
			let e = p.children[p.children.length - 1];
			e && e.type === "text" ? e.value += " " : p.children.push({
				type: "text",
				value: " "
			}), p.children.push(...d);
		} else a.push(...d);
		let m = {
			type: "element",
			tagName: "li",
			properties: { id: t + "fn-" + l },
			children: e.wrap(a, !0)
		};
		e.patch(i, m), s.push(m);
	}
	if (s.length !== 0) return {
		type: "element",
		tagName: "section",
		properties: {
			dataFootnotes: !0,
			className: ["footnotes"]
		},
		children: [
			{
				type: "element",
				tagName: a,
				properties: {
					...pu(o),
					id: "footnote-label"
				},
				children: [{
					type: "text",
					value: i
				}]
			},
			{
				type: "text",
				value: "\n"
			},
			{
				type: "element",
				tagName: "ol",
				properties: {},
				children: e.wrap(s, !0)
			},
			{
				type: "text",
				value: "\n"
			}
		]
	};
}
//#endregion
//#region node_modules/unist-util-is/lib/index.js
var _u = (function(e) {
	if (e == null) return Su;
	if (typeof e == "function") return xu(e);
	if (typeof e == "object") return Array.isArray(e) ? vu(e) : yu(e);
	if (typeof e == "string") return bu(e);
	throw Error("Expected function, string, or object as test");
});
function vu(e) {
	let t = [], n = -1;
	for (; ++n < e.length;) t[n] = _u(e[n]);
	return xu(r);
	function r(...e) {
		let n = -1;
		for (; ++n < t.length;) if (t[n].apply(this, e)) return !0;
		return !1;
	}
}
function yu(e) {
	let t = e;
	return xu(n);
	function n(n) {
		let r = n, i;
		for (i in e) if (r[i] !== t[i]) return !1;
		return !0;
	}
}
function bu(e) {
	return xu(t);
	function t(t) {
		return t && t.type === e;
	}
}
function xu(e) {
	return t;
	function t(t, n, r) {
		return !!(Cu(t) && e.call(this, t, typeof n == "number" ? n : void 0, r || void 0));
	}
}
function Su() {
	return !0;
}
function Cu(e) {
	return typeof e == "object" && !!e && "type" in e;
}
//#endregion
//#region node_modules/unist-util-visit-parents/lib/color.js
function wu(e) {
	return e;
}
//#endregion
//#region node_modules/unist-util-visit-parents/lib/index.js
var Tu = [];
function Eu(e, t, n, r) {
	let i;
	typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
	let a = _u(i), o = r ? -1 : 1;
	s(e, void 0, [])();
	function s(e, i, c) {
		let l = e && typeof e == "object" ? e : {};
		if (typeof l.type == "string") {
			let t = typeof l.tagName == "string" ? l.tagName : typeof l.name == "string" ? l.name : void 0;
			Object.defineProperty(u, "name", { value: "node (" + wu(e.type + (t ? "<" + t + ">" : "")) + ")" });
		}
		return u;
		function u() {
			let l = Tu, u, d, f;
			if ((!t || a(e, i, c[c.length - 1] || void 0)) && (l = Du(n(e, c)), l[0] === !1)) return l;
			if ("children" in e && e.children) {
				let t = e;
				if (t.children && l[0] !== "skip") for (d = (r ? t.children.length : -1) + o, f = c.concat(t); d > -1 && d < t.children.length;) {
					let e = t.children[d];
					if (u = s(e, d, f)(), u[0] === !1) return u;
					d = typeof u[1] == "number" ? u[1] : d + o;
				}
			}
			return l;
		}
	}
}
function Du(e) {
	return Array.isArray(e) ? e : typeof e == "number" ? [!0, e] : e == null ? Tu : [e];
}
//#endregion
//#region node_modules/unist-util-visit/lib/index.js
function Ou(e, t, n, r) {
	let i, a, o;
	typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), Eu(e, a, s, i);
	function s(e, t) {
		let n = t[t.length - 1], r = n ? n.children.indexOf(e) : void 0;
		return o(e, r, n);
	}
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/state.js
var ku = {}.hasOwnProperty, Au = {};
function ju(e, t) {
	let n = t || Au, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = {
		all: s,
		applyData: Nu,
		definitionById: r,
		footnoteById: i,
		footnoteCounts: /* @__PURE__ */ new Map(),
		footnoteOrder: [],
		handlers: {
			...eu,
			...n.handlers
		},
		one: o,
		options: n,
		patch: Mu,
		wrap: Fu
	};
	return Ou(e, function(e) {
		if (e.type === "definition" || e.type === "footnoteDefinition") {
			let t = e.type === "definition" ? r : i, n = String(e.identifier).toUpperCase();
			t.has(n) || t.set(n, e);
		}
	}), a;
	function o(e, t) {
		let n = e.type, r = a.handlers[n];
		if (ku.call(a.handlers, n) && r) return r(a, e, t);
		if (a.options.passThrough && a.options.passThrough.includes(n)) {
			if ("children" in e) {
				let { children: t, ...n } = e, r = pu(n);
				return r.children = a.all(e), r;
			}
			return pu(e);
		}
		return (a.options.unknownHandler || Pu)(a, e, t);
	}
	function s(e) {
		let t = [];
		if ("children" in e) {
			let n = e.children, r = -1;
			for (; ++r < n.length;) {
				let i = a.one(n[r], e);
				if (i) {
					if (r && n[r - 1].type === "break" && (!Array.isArray(i) && i.type === "text" && (i.value = Iu(i.value)), !Array.isArray(i) && i.type === "element")) {
						let e = i.children[0];
						e && e.type === "text" && (e.value = Iu(e.value));
					}
					Array.isArray(i) ? t.push(...i) : t.push(i);
				}
			}
		}
		return t;
	}
}
function Mu(e, t) {
	e.position && (t.position = qa(e));
}
function Nu(e, t) {
	let n = t;
	if (e && e.data) {
		let t = e.data.hName, r = e.data.hChildren, i = e.data.hProperties;
		typeof t == "string" && (n.type === "element" ? n.tagName = t : n = {
			type: "element",
			tagName: t,
			properties: {},
			children: "children" in n ? n.children : [n]
		}), n.type === "element" && i && Object.assign(n.properties, pu(i)), "children" in n && n.children && r != null && (n.children = r);
	}
	return n;
}
function Pu(e, t) {
	let n = t.data || {}, r = "value" in t && !(ku.call(n, "hProperties") || ku.call(n, "hChildren")) ? {
		type: "text",
		value: t.value
	} : {
		type: "element",
		tagName: "div",
		properties: {},
		children: e.all(t)
	};
	return e.patch(t, r), e.applyData(t, r);
}
function Fu(e, t) {
	let n = [], r = -1;
	for (t && n.push({
		type: "text",
		value: "\n"
	}); ++r < e.length;) r && n.push({
		type: "text",
		value: "\n"
	}), n.push(e[r]);
	return t && e.length > 0 && n.push({
		type: "text",
		value: "\n"
	}), n;
}
function Iu(e) {
	let t = 0, n = e.charCodeAt(t);
	for (; n === 9 || n === 32;) t++, n = e.charCodeAt(t);
	return e.slice(t);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/index.js
function Lu(e, t) {
	let n = ju(e, t), r = n.one(e, void 0), i = gu(n), a = Array.isArray(r) ? {
		type: "root",
		children: r
	} : r || {
		type: "root",
		children: []
	};
	return i && ("children" in a, a.children.push({
		type: "text",
		value: "\n"
	}, i)), a;
}
//#endregion
//#region node_modules/remark-rehype/lib/index.js
function Ru(e, t) {
	return e && "run" in e ? async function(n, r) {
		let i = Lu(n, {
			file: r,
			...t
		});
		await e.run(i, r);
	} : function(n, r) {
		return Lu(n, {
			file: r,
			...e || t
		});
	};
}
//#endregion
//#region node_modules/bail/index.js
function zu(e) {
	if (e) throw e;
}
//#endregion
//#region node_modules/extend/index.js
var Bu = /* @__PURE__ */ n(((e, t) => {
	var n = Object.prototype.hasOwnProperty, r = Object.prototype.toString, i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = function(e) {
		return typeof Array.isArray == "function" ? Array.isArray(e) : r.call(e) === "[object Array]";
	}, s = function(e) {
		if (!e || r.call(e) !== "[object Object]") return !1;
		var t = n.call(e, "constructor"), i = e.constructor && e.constructor.prototype && n.call(e.constructor.prototype, "isPrototypeOf");
		if (e.constructor && !t && !i) return !1;
		for (var a in e);
		return a === void 0 || n.call(e, a);
	}, c = function(e, t) {
		i && t.name === "__proto__" ? i(e, t.name, {
			enumerable: !0,
			configurable: !0,
			value: t.newValue,
			writable: !0
		}) : e[t.name] = t.newValue;
	}, l = function(e, t) {
		if (t === "__proto__") {
			if (!n.call(e, t)) return;
			if (a) return a(e, t).value;
		}
		return e[t];
	};
	t.exports = function e() {
		var t, n, r, i, a, u, d = arguments[0], f = 1, p = arguments.length, m = !1;
		for (typeof d == "boolean" && (m = d, d = arguments[1] || {}, f = 2), (d == null || typeof d != "object" && typeof d != "function") && (d = {}); f < p; ++f) if (t = arguments[f], t != null) for (n in t) r = l(d, n), i = l(t, n), d !== i && (m && i && (s(i) || (a = o(i))) ? (a ? (a = !1, u = r && o(r) ? r : []) : u = r && s(r) ? r : {}, c(d, {
			name: n,
			newValue: e(m, u, i)
		})) : i !== void 0 && c(d, {
			name: n,
			newValue: i
		}));
		return d;
	};
}));
//#endregion
//#region node_modules/is-plain-obj/index.js
function Vu(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
//#endregion
//#region node_modules/trough/lib/index.js
function Hu() {
	let e = [], t = {
		run: n,
		use: r
	};
	return t;
	function n(...t) {
		let n = -1, r = t.pop();
		if (typeof r != "function") throw TypeError("Expected function as last argument, not " + r);
		i(null, ...t);
		function i(a, ...o) {
			let s = e[++n], c = -1;
			if (a) {
				r(a);
				return;
			}
			for (; ++c < t.length;) (o[c] === null || o[c] === void 0) && (o[c] = t[c]);
			t = o, s ? Uu(s, i)(...o) : r(null, ...o);
		}
	}
	function r(n) {
		if (typeof n != "function") throw TypeError("Expected `middelware` to be a function, not " + n);
		return e.push(n), t;
	}
}
function Uu(e, t) {
	let n;
	return r;
	function r(...t) {
		let r = e.length > t.length, o;
		r && t.push(i);
		try {
			o = e.apply(this, t);
		} catch (e) {
			let t = e;
			if (r && n) throw t;
			return i(t);
		}
		r || (o && o.then && typeof o.then == "function" ? o.then(a, i) : o instanceof Error ? i(o) : a(o));
	}
	function i(e, ...r) {
		n || (n = !0, t(e, ...r));
	}
	function a(e) {
		i(null, e);
	}
}
//#endregion
//#region node_modules/vfile/lib/minpath.browser.js
var Wu = {
	basename: Gu,
	dirname: Ku,
	extname: Y,
	join: qu,
	sep: "/"
};
function Gu(e, t) {
	if (t !== void 0 && typeof t != "string") throw TypeError("\"ext\" argument must be a string");
	Xu(e);
	let n = 0, r = -1, i = e.length, a;
	if (t === void 0 || t.length === 0 || t.length > e.length) {
		for (; i--;) if (e.codePointAt(i) === 47) {
			if (a) {
				n = i + 1;
				break;
			}
		} else r < 0 && (a = !0, r = i + 1);
		return r < 0 ? "" : e.slice(n, r);
	}
	if (t === e) return "";
	let o = -1, s = t.length - 1;
	for (; i--;) if (e.codePointAt(i) === 47) {
		if (a) {
			n = i + 1;
			break;
		}
	} else o < 0 && (a = !0, o = i + 1), s > -1 && (e.codePointAt(i) === t.codePointAt(s--) ? s < 0 && (r = i) : (s = -1, r = o));
	return n === r ? r = o : r < 0 && (r = e.length), e.slice(n, r);
}
function Ku(e) {
	if (Xu(e), e.length === 0) return ".";
	let t = -1, n = e.length, r;
	for (; --n;) if (e.codePointAt(n) === 47) {
		if (r) {
			t = n;
			break;
		}
	} else r ||= !0;
	return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function Y(e) {
	Xu(e);
	let t = e.length, n = -1, r = 0, i = -1, a = 0, o;
	for (; t--;) {
		let s = e.codePointAt(t);
		if (s === 47) {
			if (o) {
				r = t + 1;
				break;
			}
			continue;
		}
		n < 0 && (o = !0, n = t + 1), s === 46 ? i < 0 ? i = t : a !== 1 && (a = 1) : i > -1 && (a = -1);
	}
	return i < 0 || n < 0 || a === 0 || a === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function qu(...e) {
	let t = -1, n;
	for (; ++t < e.length;) Xu(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
	return n === void 0 ? "." : Ju(n);
}
function Ju(e) {
	Xu(e);
	let t = e.codePointAt(0) === 47, n = Yu(e, !t);
	return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function Yu(e, t) {
	let n = "", r = 0, i = -1, a = 0, o = -1, s, c;
	for (; ++o <= e.length;) {
		if (o < e.length) s = e.codePointAt(o);
		else if (s === 47) break;
		else s = 47;
		if (s === 47) {
			if (!(i === o - 1 || a === 1)) if (i !== o - 1 && a === 2) {
				if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
					if (n.length > 2) {
						if (c = n.lastIndexOf("/"), c !== n.length - 1) {
							c < 0 ? (n = "", r = 0) : (n = n.slice(0, c), r = n.length - 1 - n.lastIndexOf("/")), i = o, a = 0;
							continue;
						}
					} else if (n.length > 0) {
						n = "", r = 0, i = o, a = 0;
						continue;
					}
				}
				t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
			} else n.length > 0 ? n += "/" + e.slice(i + 1, o) : n = e.slice(i + 1, o), r = o - i - 1;
			i = o, a = 0;
		} else s === 46 && a > -1 ? a++ : a = -1;
	}
	return n;
}
function Xu(e) {
	if (typeof e != "string") throw TypeError("Path must be a string. Received " + JSON.stringify(e));
}
//#endregion
//#region node_modules/vfile/lib/minproc.browser.js
var Zu = { cwd: Qu };
function Qu() {
	return "/";
}
//#endregion
//#region node_modules/vfile/lib/minurl.shared.js
function $u(e) {
	return !!(typeof e == "object" && e && "href" in e && e.href && "protocol" in e && e.protocol && e.auth === void 0);
}
//#endregion
//#region node_modules/vfile/lib/minurl.browser.js
function ed(e) {
	if (typeof e == "string") e = new URL(e);
	else if (!$u(e)) {
		let t = /* @__PURE__ */ TypeError("The \"path\" argument must be of type string or an instance of URL. Received `" + e + "`");
		throw t.code = "ERR_INVALID_ARG_TYPE", t;
	}
	if (e.protocol !== "file:") {
		let e = /* @__PURE__ */ TypeError("The URL must be of scheme file");
		throw e.code = "ERR_INVALID_URL_SCHEME", e;
	}
	return td(e);
}
function td(e) {
	if (e.hostname !== "") {
		let e = /* @__PURE__ */ TypeError("File URL host must be \"localhost\" or empty on darwin");
		throw e.code = "ERR_INVALID_FILE_URL_HOST", e;
	}
	let t = e.pathname, n = -1;
	for (; ++n < t.length;) if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
		let e = t.codePointAt(n + 2);
		if (e === 70 || e === 102) {
			let e = /* @__PURE__ */ TypeError("File URL path must not include encoded / characters");
			throw e.code = "ERR_INVALID_FILE_URL_PATH", e;
		}
	}
	return decodeURIComponent(t);
}
//#endregion
//#region node_modules/vfile/lib/index.js
var nd = [
	"history",
	"path",
	"basename",
	"stem",
	"extname",
	"dirname"
], rd = class {
	constructor(e) {
		let t;
		t = e ? $u(e) ? { path: e } : typeof e == "string" || sd(e) ? { value: e } : e : {}, this.cwd = "cwd" in t ? "" : Zu.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
		let n = -1;
		for (; ++n < nd.length;) {
			let e = nd[n];
			e in t && t[e] !== void 0 && t[e] !== null && (this[e] = e === "history" ? [...t[e]] : t[e]);
		}
		let r;
		for (r in t) nd.includes(r) || (this[r] = t[r]);
	}
	get basename() {
		return typeof this.path == "string" ? Wu.basename(this.path) : void 0;
	}
	set basename(e) {
		ad(e, "basename"), id(e, "basename"), this.path = Wu.join(this.dirname || "", e);
	}
	get dirname() {
		return typeof this.path == "string" ? Wu.dirname(this.path) : void 0;
	}
	set dirname(e) {
		od(this.basename, "dirname"), this.path = Wu.join(e || "", this.basename);
	}
	get extname() {
		return typeof this.path == "string" ? Wu.extname(this.path) : void 0;
	}
	set extname(e) {
		if (id(e, "extname"), od(this.dirname, "extname"), e) {
			if (e.codePointAt(0) !== 46) throw Error("`extname` must start with `.`");
			if (e.includes(".", 1)) throw Error("`extname` cannot contain multiple dots");
		}
		this.path = Wu.join(this.dirname, this.stem + (e || ""));
	}
	get path() {
		return this.history[this.history.length - 1];
	}
	set path(e) {
		$u(e) && (e = ed(e)), ad(e, "path"), this.path !== e && this.history.push(e);
	}
	get stem() {
		return typeof this.path == "string" ? Wu.basename(this.path, this.extname) : void 0;
	}
	set stem(e) {
		ad(e, "stem"), id(e, "stem"), this.path = Wu.join(this.dirname || "", e + (this.extname || ""));
	}
	fail(e, t, n) {
		let r = this.message(e, t, n);
		throw r.fatal = !0, r;
	}
	info(e, t, n) {
		let r = this.message(e, t, n);
		return r.fatal = void 0, r;
	}
	message(e, t, n) {
		let r = new Qa(e, t, n);
		return this.path && (r.name = this.path + ":" + r.name, r.file = this.path), r.fatal = !1, this.messages.push(r), r;
	}
	toString(e) {
		return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(e || void 0).decode(this.value);
	}
};
function id(e, t) {
	if (e && e.includes(Wu.sep)) throw Error("`" + t + "` cannot be a path: did not expect `" + Wu.sep + "`");
}
function ad(e, t) {
	if (!e) throw Error("`" + t + "` cannot be empty");
}
function od(e, t) {
	if (!e) throw Error("Setting `" + t + "` requires `path` to be set too");
}
function sd(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
//#endregion
//#region node_modules/unified/lib/callable-instance.js
var cd = (function(e) {
	let t = this.constructor.prototype, n = t[e], r = function() {
		return n.apply(r, arguments);
	};
	return Object.setPrototypeOf(r, t), r;
}), ld = /* @__PURE__ */ e(Bu(), 1), ud = {}.hasOwnProperty, dd = new class e extends cd {
	constructor() {
		super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Hu();
	}
	copy() {
		let t = new e(), n = -1;
		for (; ++n < this.attachers.length;) {
			let e = this.attachers[n];
			t.use(...e);
		}
		return t.data((0, ld.default)(!0, {}, this.namespace)), t;
	}
	data(e, t) {
		return typeof e == "string" ? arguments.length === 2 ? (md("data", this.frozen), this.namespace[e] = t, this) : ud.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (md("data", this.frozen), this.namespace = e, this) : this.namespace;
	}
	freeze() {
		if (this.frozen) return this;
		let e = this;
		for (; ++this.freezeIndex < this.attachers.length;) {
			let [t, ...n] = this.attachers[this.freezeIndex];
			if (n[0] === !1) continue;
			n[0] === !0 && (n[0] = void 0);
			let r = t.call(e, ...n);
			typeof r == "function" && this.transformers.use(r);
		}
		return this.frozen = !0, this.freezeIndex = Infinity, this;
	}
	parse(e) {
		this.freeze();
		let t = _d(e), n = this.parser || this.Parser;
		return fd("parse", n), n(String(t), t);
	}
	process(e, t) {
		let n = this;
		return this.freeze(), fd("process", this.parser || this.Parser), pd("process", this.compiler || this.Compiler), t ? r(void 0, t) : new Promise(r);
		function r(r, i) {
			let a = _d(e), o = n.parse(a);
			n.run(o, a, function(e, t, r) {
				if (e || !t || !r) return s(e);
				let i = t, a = n.stringify(i, r);
				yd(a) ? r.value = a : r.result = a, s(e, r);
			});
			function s(e, n) {
				e || !n ? i(e) : r ? r(n) : t(void 0, n);
			}
		}
	}
	processSync(e) {
		let t = !1, n;
		return this.freeze(), fd("processSync", this.parser || this.Parser), pd("processSync", this.compiler || this.Compiler), this.process(e, r), gd("processSync", "process", t), n;
		function r(e, r) {
			t = !0, zu(e), n = r;
		}
	}
	run(e, t, n) {
		hd(e), this.freeze();
		let r = this.transformers;
		return !n && typeof t == "function" && (n = t, t = void 0), n ? i(void 0, n) : new Promise(i);
		function i(i, a) {
			let o = _d(t);
			r.run(e, o, s);
			function s(t, r, o) {
				let s = r || e;
				t ? a(t) : i ? i(s) : n(void 0, s, o);
			}
		}
	}
	runSync(e, t) {
		let n = !1, r;
		return this.run(e, t, i), gd("runSync", "run", n), r;
		function i(e, t) {
			zu(e), r = t, n = !0;
		}
	}
	stringify(e, t) {
		this.freeze();
		let n = _d(t), r = this.compiler || this.Compiler;
		return pd("stringify", r), hd(e), r(e, n);
	}
	use(e, ...t) {
		let n = this.attachers, r = this.namespace;
		if (md("use", this.frozen), e != null) if (typeof e == "function") s(e, t);
		else if (typeof e == "object") Array.isArray(e) ? o(e) : a(e);
		else throw TypeError("Expected usable value, not `" + e + "`");
		return this;
		function i(e) {
			if (typeof e == "function") s(e, []);
			else if (typeof e == "object") if (Array.isArray(e)) {
				let [t, ...n] = e;
				s(t, n);
			} else a(e);
			else throw TypeError("Expected usable value, not `" + e + "`");
		}
		function a(e) {
			if (!("plugins" in e) && !("settings" in e)) throw Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
			o(e.plugins), e.settings && (r.settings = (0, ld.default)(!0, r.settings, e.settings));
		}
		function o(e) {
			let t = -1;
			if (e != null) if (Array.isArray(e)) for (; ++t < e.length;) {
				let n = e[t];
				i(n);
			}
			else throw TypeError("Expected a list of plugins, not `" + e + "`");
		}
		function s(e, t) {
			let r = -1, i = -1;
			for (; ++r < n.length;) if (n[r][0] === e) {
				i = r;
				break;
			}
			if (i === -1) n.push([e, ...t]);
			else if (t.length > 0) {
				let [r, ...a] = t, o = n[i][1];
				Vu(o) && Vu(r) && (r = (0, ld.default)(!0, o, r)), n[i] = [
					e,
					r,
					...a
				];
			}
		}
	}
}().freeze();
function fd(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `parser`");
}
function pd(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `compiler`");
}
function md(e, t) {
	if (t) throw Error("Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function hd(e) {
	if (!Vu(e) || typeof e.type != "string") throw TypeError("Expected node, got `" + e + "`");
}
function gd(e, t, n) {
	if (!n) throw Error("`" + e + "` finished async. Use `" + t + "` instead");
}
function _d(e) {
	return vd(e) ? e : new rd(e);
}
function vd(e) {
	return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function yd(e) {
	return typeof e == "string" || bd(e);
}
function bd(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
//#endregion
//#region node_modules/react-markdown/lib/index.js
var X = Oo(), Z = [], xd = { allowDangerousHtml: !0 }, Sd = /^(https?|ircs?|mailto|xmpp)$/i, Cd = [
	{
		from: "astPlugins",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "allowDangerousHtml",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "allowNode",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "allowElement"
	},
	{
		from: "allowedTypes",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "allowedElements"
	},
	{
		from: "className",
		id: "remove-classname"
	},
	{
		from: "disallowedTypes",
		id: "replace-allownode-allowedtypes-and-disallowedtypes",
		to: "disallowedElements"
	},
	{
		from: "escapeHtml",
		id: "remove-buggy-html-in-markdown-parser"
	},
	{
		from: "includeElementIndex",
		id: "#remove-includeelementindex"
	},
	{
		from: "includeNodeIndex",
		id: "change-includenodeindex-to-includeelementindex"
	},
	{
		from: "linkTarget",
		id: "remove-linktarget"
	},
	{
		from: "plugins",
		id: "change-plugins-to-remarkplugins",
		to: "remarkPlugins"
	},
	{
		from: "rawSourcePos",
		id: "#remove-rawsourcepos"
	},
	{
		from: "renderers",
		id: "change-renderers-to-components",
		to: "components"
	},
	{
		from: "source",
		id: "change-source-to-children",
		to: "children"
	},
	{
		from: "sourcePos",
		id: "#remove-sourcepos"
	},
	{
		from: "transformImageUri",
		id: "#add-urltransform",
		to: "urlTransform"
	},
	{
		from: "transformLinkUri",
		id: "#add-urltransform",
		to: "urlTransform"
	}
];
function wd(e) {
	let t = Td(e), n = Ed(e);
	return Dd(t.runSync(t.parse(n), n), e);
}
function Td(e) {
	let t = e.rehypePlugins || Z, n = e.remarkPlugins || Z, r = e.remarkRehypeOptions ? {
		...e.remarkRehypeOptions,
		...xd
	} : xd;
	return dd().use(Dl).use(n).use(Ru, r).use(t);
}
function Ed(e) {
	let t = e.children || "", n = new rd();
	return typeof t == "string" ? n.value = t : "" + t, n;
}
function Dd(e, t) {
	let n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, o = t.skipHtml, s = t.unwrapDisallowed, c = t.urlTransform || Od;
	for (let e of Cd) Object.hasOwn(t, e.from) && "" + e.from + (e.to ? "use `" + e.to + "` instead" : "remove it") + e.id;
	return Ou(e, l), ao(e, {
		Fragment: X.Fragment,
		components: i,
		ignoreInvalidStyle: !0,
		jsx: X.jsx,
		jsxs: X.jsxs,
		passKeys: !0,
		passNode: !0
	});
	function l(e, t, i) {
		if (e.type === "raw" && i && typeof t == "number") return o ? i.children.splice(t, 1) : i.children[t] = {
			type: "text",
			value: e.value
		}, t;
		if (e.type === "element") {
			let t;
			for (t in Eo) if (Object.hasOwn(Eo, t) && Object.hasOwn(e.properties, t)) {
				let n = e.properties[t], r = Eo[t];
				(r === null || r.includes(e.tagName)) && (e.properties[t] = c(String(n || ""), t, e));
			}
		}
		if (e.type === "element") {
			let o = n ? !n.includes(e.tagName) : a ? a.includes(e.tagName) : !1;
			if (!o && r && typeof t == "number" && (o = !r(e, t, i)), o && i && typeof t == "number") return s && e.children ? i.children.splice(t, 1, ...e.children) : i.children.splice(t, 1), t;
		}
	}
}
function Od(e) {
	let t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
	return t === -1 || i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || Sd.test(e.slice(0, t)) ? e : "";
}
//#endregion
//#region node_modules/ccount/index.js
function kd(e, t) {
	let n = String(e);
	if (typeof t != "string") throw TypeError("Expected character");
	let r = 0, i = n.indexOf(t);
	for (; i !== -1;) r++, i = n.indexOf(t, i + t.length);
	return r;
}
//#endregion
//#region node_modules/escape-string-regexp/index.js
function Ad(e) {
	if (typeof e != "string") throw TypeError("Expected a string");
	return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
//#endregion
//#region node_modules/mdast-util-find-and-replace/lib/index.js
function jd(e, t, n) {
	let r = _u((n || {}).ignore || []), i = Md(t), a = -1;
	for (; ++a < i.length;) Eu(e, "text", o);
	function o(e, t) {
		let n = -1, i;
		for (; ++n < t.length;) {
			let e = t[n], a = i ? i.children : void 0;
			if (r(e, a ? a.indexOf(e) : void 0, i)) return;
			i = e;
		}
		if (i) return s(e, t);
	}
	function s(e, t) {
		let n = t[t.length - 1], r = i[a][0], o = i[a][1], s = 0, c = n.children.indexOf(e), l = !1, u = [];
		r.lastIndex = 0;
		let d = r.exec(e.value);
		for (; d;) {
			let n = d.index, i = {
				index: d.index,
				input: d.input,
				stack: [...t, e]
			}, a = o(...d, i);
			if (typeof a == "string" && (a = a.length > 0 ? {
				type: "text",
				value: a
			} : void 0), a === !1 ? r.lastIndex = n + 1 : (s !== n && u.push({
				type: "text",
				value: e.value.slice(s, n)
			}), Array.isArray(a) ? u.push(...a) : a && u.push(a), s = n + d[0].length, l = !0), !r.global) break;
			d = r.exec(e.value);
		}
		return l ? (s < e.value.length && u.push({
			type: "text",
			value: e.value.slice(s)
		}), n.children.splice(c, 1, ...u)) : u = [e], c + u.length;
	}
}
function Md(e) {
	let t = [];
	if (!Array.isArray(e)) throw TypeError("Expected find and replace tuple or list of tuples");
	let n = !e[0] || Array.isArray(e[0]) ? e : [e], r = -1;
	for (; ++r < n.length;) {
		let e = n[r];
		t.push([Nd(e[0]), Pd(e[1])]);
	}
	return t;
}
function Nd(e) {
	return typeof e == "string" ? new RegExp(Ad(e), "g") : e;
}
function Pd(e) {
	return typeof e == "function" ? e : function() {
		return e;
	};
}
//#endregion
//#region node_modules/mdast-util-gfm-autolink-literal/lib/index.js
var Fd = "phrasing", Id = [
	"autolink",
	"link",
	"image",
	"label"
];
function Ld() {
	return {
		transforms: [Gd],
		enter: {
			literalAutolink: zd,
			literalAutolinkEmail: Bd,
			literalAutolinkHttp: Bd,
			literalAutolinkWww: Bd
		},
		exit: {
			literalAutolink: Wd,
			literalAutolinkEmail: Ud,
			literalAutolinkHttp: Vd,
			literalAutolinkWww: Hd
		}
	};
}
function Rd() {
	return { unsafe: [
		{
			character: "@",
			before: "[+\\-.\\w]",
			after: "[\\-.\\w]",
			inConstruct: Fd,
			notInConstruct: Id
		},
		{
			character: ".",
			before: "[Ww]",
			after: "[\\-.\\w]",
			inConstruct: Fd,
			notInConstruct: Id
		},
		{
			character: ":",
			before: "[ps]",
			after: "\\/",
			inConstruct: Fd,
			notInConstruct: Id
		}
	] };
}
function zd(e) {
	this.enter({
		type: "link",
		title: null,
		url: "",
		children: []
	}, e);
}
function Bd(e) {
	this.config.enter.autolinkProtocol.call(this, e);
}
function Vd(e) {
	this.config.exit.autolinkProtocol.call(this, e);
}
function Hd(e) {
	this.config.exit.data.call(this, e);
	let t = this.stack[this.stack.length - 1];
	t.type, t.url = "http://" + this.sliceSerialize(e);
}
function Ud(e) {
	this.config.exit.autolinkEmail.call(this, e);
}
function Wd(e) {
	this.exit(e);
}
function Gd(e) {
	jd(e, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Kd], [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, qd]], { ignore: ["link", "linkReference"] });
}
function Kd(e, t, n, r, i) {
	let a = "";
	if (!Xd(i) || (/^w/i.test(t) && (n = t + n, t = "", a = "http://"), !Jd(n))) return !1;
	let o = Yd(n + r);
	if (!o[0]) return !1;
	let s = {
		type: "link",
		title: null,
		url: a + t + o[0],
		children: [{
			type: "text",
			value: t + o[0]
		}]
	};
	return o[1] ? [s, {
		type: "text",
		value: o[1]
	}] : s;
}
function qd(e, t, n, r) {
	return !Xd(r, !0) || /[-\d_]$/.test(n) ? !1 : {
		type: "link",
		title: null,
		url: "mailto:" + t + "@" + n,
		children: [{
			type: "text",
			value: t + "@" + n
		}]
	};
}
function Jd(e) {
	let t = e.split(".");
	return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
}
function Yd(e) {
	let t = /[!"&'),.:;<>?\]}]+$/.exec(e);
	if (!t) return [e, void 0];
	e = e.slice(0, t.index);
	let n = t[0], r = n.indexOf(")"), i = kd(e, "("), a = kd(e, ")");
	for (; r !== -1 && i > a;) e += n.slice(0, r + 1), n = n.slice(r + 1), r = n.indexOf(")"), a++;
	return [e, n];
}
function Xd(e, t) {
	let n = e.input.charCodeAt(e.index - 1);
	return (e.index === 0 || $o(n) || Qo(n)) && (!t || n !== 47);
}
//#endregion
//#region node_modules/mdast-util-gfm-footnote/lib/index.js
sf.peek = of;
function Zd() {
	this.buffer();
}
function Qd(e) {
	this.enter({
		type: "footnoteReference",
		identifier: "",
		label: ""
	}, e);
}
function $d() {
	this.buffer();
}
function ef(e) {
	this.enter({
		type: "footnoteDefinition",
		identifier: "",
		label: "",
		children: []
	}, e);
}
function tf(e) {
	let t = this.resume(), n = this.stack[this.stack.length - 1];
	n.type, n.identifier = Uo(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function nf(e) {
	this.exit(e);
}
function rf(e) {
	let t = this.resume(), n = this.stack[this.stack.length - 1];
	n.type, n.identifier = Uo(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function af(e) {
	this.exit(e);
}
function of() {
	return "[";
}
function sf(e, t, n, r) {
	let i = n.createTracker(r), a = i.move("[^"), o = n.enter("footnoteReference"), s = n.enter("reference");
	return a += i.move(n.safe(n.associationId(e), {
		after: "]",
		before: a
	})), s(), o(), a += i.move("]"), a;
}
function cf() {
	return {
		enter: {
			gfmFootnoteCallString: Zd,
			gfmFootnoteCall: Qd,
			gfmFootnoteDefinitionLabelString: $d,
			gfmFootnoteDefinition: ef
		},
		exit: {
			gfmFootnoteCallString: tf,
			gfmFootnoteCall: nf,
			gfmFootnoteDefinitionLabelString: rf,
			gfmFootnoteDefinition: af
		}
	};
}
function lf(e) {
	let t = !1;
	return e && e.firstLineBlank && (t = !0), {
		handlers: {
			footnoteDefinition: n,
			footnoteReference: sf
		},
		unsafe: [{
			character: "[",
			inConstruct: [
				"label",
				"phrasing",
				"reference"
			]
		}]
	};
	function n(e, n, r, i) {
		let a = r.createTracker(i), o = a.move("[^"), s = r.enter("footnoteDefinition"), c = r.enter("label");
		return o += a.move(r.safe(r.associationId(e), {
			before: o,
			after: "]"
		})), c(), o += a.move("]:"), e.children && e.children.length > 0 && (a.shift(4), o += a.move((t ? "\n" : " ") + r.indentLines(r.containerFlow(e, a.current()), t ? df : uf))), s(), o;
	}
}
function uf(e, t, n) {
	return t === 0 ? e : df(e, t, n);
}
function df(e, t, n) {
	return (n ? "" : "    ") + e;
}
//#endregion
//#region node_modules/mdast-util-gfm-strikethrough/lib/index.js
var ff = [
	"autolink",
	"destinationLiteral",
	"destinationRaw",
	"reference",
	"titleQuote",
	"titleApostrophe"
];
_f.peek = vf;
function pf() {
	return {
		canContainEols: ["delete"],
		enter: { strikethrough: hf },
		exit: { strikethrough: gf }
	};
}
function mf() {
	return {
		unsafe: [{
			character: "~",
			inConstruct: "phrasing",
			notInConstruct: ff
		}],
		handlers: { delete: _f }
	};
}
function hf(e) {
	this.enter({
		type: "delete",
		children: []
	}, e);
}
function gf(e) {
	this.exit(e);
}
function _f(e, t, n, r) {
	let i = n.createTracker(r), a = n.enter("strikethrough"), o = i.move("~~");
	return o += n.containerPhrasing(e, {
		...i.current(),
		before: o,
		after: "~"
	}), o += i.move("~~"), a(), o;
}
function vf() {
	return "~";
}
//#endregion
//#region node_modules/markdown-table/index.js
function yf(e) {
	return e.length;
}
function bf(e, t) {
	let n = t || {}, r = (n.align || []).concat(), i = n.stringLength || yf, a = [], o = [], s = [], c = [], l = 0, u = -1;
	for (; ++u < e.length;) {
		let t = [], r = [], a = -1;
		for (e[u].length > l && (l = e[u].length); ++a < e[u].length;) {
			let o = xf(e[u][a]);
			if (n.alignDelimiters !== !1) {
				let e = i(o);
				r[a] = e, (c[a] === void 0 || e > c[a]) && (c[a] = e);
			}
			t.push(o);
		}
		o[u] = t, s[u] = r;
	}
	let d = -1;
	if (typeof r == "object" && "length" in r) for (; ++d < l;) a[d] = Sf(r[d]);
	else {
		let e = Sf(r);
		for (; ++d < l;) a[d] = e;
	}
	d = -1;
	let f = [], p = [];
	for (; ++d < l;) {
		let e = a[d], t = "", r = "";
		e === 99 ? (t = ":", r = ":") : e === 108 ? t = ":" : e === 114 && (r = ":");
		let i = n.alignDelimiters === !1 ? 1 : Math.max(1, c[d] - t.length - r.length), o = t + "-".repeat(i) + r;
		n.alignDelimiters !== !1 && (i = t.length + i + r.length, i > c[d] && (c[d] = i), p[d] = i), f[d] = o;
	}
	o.splice(1, 0, f), s.splice(1, 0, p), u = -1;
	let m = [];
	for (; ++u < o.length;) {
		let e = o[u], t = s[u];
		d = -1;
		let r = [];
		for (; ++d < l;) {
			let i = e[d] || "", o = "", s = "";
			if (n.alignDelimiters !== !1) {
				let e = c[d] - (t[d] || 0), n = a[d];
				n === 114 ? o = " ".repeat(e) : n === 99 ? e % 2 ? (o = " ".repeat(e / 2 + .5), s = " ".repeat(e / 2 - .5)) : (o = " ".repeat(e / 2), s = o) : s = " ".repeat(e);
			}
			n.delimiterStart !== !1 && !d && r.push("|"), n.padding !== !1 && !(n.alignDelimiters === !1 && i === "") && (n.delimiterStart !== !1 || d) && r.push(" "), n.alignDelimiters !== !1 && r.push(o), r.push(i), n.alignDelimiters !== !1 && r.push(s), n.padding !== !1 && r.push(" "), (n.delimiterEnd !== !1 || d !== l - 1) && r.push("|");
		}
		m.push(n.delimiterEnd === !1 ? r.join("").replace(/ +$/, "") : r.join(""));
	}
	return m.join("\n");
}
function xf(e) {
	return e == null ? "" : String(e);
}
function Sf(e) {
	let t = typeof e == "string" ? e.codePointAt(0) : 0;
	return t === 67 || t === 99 ? 99 : t === 76 || t === 108 ? 108 : t === 82 || t === 114 ? 114 : 0;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/blockquote.js
function Cf(e, t, n, r) {
	let i = n.enter("blockquote"), a = n.createTracker(r);
	a.move("> "), a.shift(2);
	let o = n.indentLines(n.containerFlow(e, a.current()), wf);
	return i(), o;
}
function wf(e, t, n) {
	return ">" + (n ? "" : " ") + e;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
function Tf(e, t) {
	return Ef(e, t.inConstruct, !0) && !Ef(e, t.notInConstruct, !1);
}
function Ef(e, t, n) {
	if (typeof t == "string" && (t = [t]), !t || t.length === 0) return n;
	let r = -1;
	for (; ++r < t.length;) if (e.includes(t[r])) return !0;
	return !1;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/break.js
function Df(e, t, n, r) {
	let i = -1;
	for (; ++i < n.unsafe.length;) if (n.unsafe[i].character === "\n" && Tf(n.stack, n.unsafe[i])) return /[ \t]/.test(r.before) ? "" : " ";
	return "\\\n";
}
//#endregion
//#region node_modules/longest-streak/index.js
function Of(e, t) {
	let n = String(e), r = n.indexOf(t), i = r, a = 0, o = 0;
	if (typeof t != "string") throw TypeError("Expected substring");
	for (; r !== -1;) r === i ? ++a > o && (o = a) : a = 1, i = r + t.length, r = n.indexOf(t, i);
	return o;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js
function kf(e, t) {
	return !!(t.options.fences === !1 && e.value && !e.lang && /[^ \r\n]/.test(e.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-fence.js
function Af(e) {
	let t = e.options.fence || "`";
	if (t !== "`" && t !== "~") throw Error("Cannot serialize code with `" + t + "` for `options.fence`, expected `` ` `` or `~`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/code.js
function jf(e, t, n, r) {
	let i = Af(n), a = e.value || "", o = i === "`" ? "GraveAccent" : "Tilde";
	if (kf(e, n)) {
		let e = n.enter("codeIndented"), t = n.indentLines(a, Mf);
		return e(), t;
	}
	let s = n.createTracker(r), c = i.repeat(Math.max(Of(a, i) + 1, 3)), l = n.enter("codeFenced"), u = s.move(c);
	if (e.lang) {
		let t = n.enter(`codeFencedLang${o}`);
		u += s.move(n.safe(e.lang, {
			before: u,
			after: " ",
			encode: ["`"],
			...s.current()
		})), t();
	}
	if (e.lang && e.meta) {
		let t = n.enter(`codeFencedMeta${o}`);
		u += s.move(" "), u += s.move(n.safe(e.meta, {
			before: u,
			after: "\n",
			encode: ["`"],
			...s.current()
		})), t();
	}
	return u += s.move("\n"), a && (u += s.move(a + "\n")), u += s.move(c), l(), u;
}
function Mf(e, t, n) {
	return (n ? "" : "    ") + e;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-quote.js
function Nf(e) {
	let t = e.options.quote || "\"";
	if (t !== "\"" && t !== "'") throw Error("Cannot serialize title with `" + t + "` for `options.quote`, expected `\"`, or `'`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/definition.js
function Pf(e, t, n, r) {
	let i = Nf(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.enter("definition"), s = n.enter("label"), c = n.createTracker(r), l = c.move("[");
	return l += c.move(n.safe(n.associationId(e), {
		before: l,
		after: "]",
		...c.current()
	})), l += c.move("]: "), s(), !e.url || /[\0- \u007F]/.test(e.url) ? (s = n.enter("destinationLiteral"), l += c.move("<"), l += c.move(n.safe(e.url, {
		before: l,
		after: ">",
		...c.current()
	})), l += c.move(">")) : (s = n.enter("destinationRaw"), l += c.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : "\n",
		...c.current()
	}))), s(), e.title && (s = n.enter(`title${a}`), l += c.move(" " + i), l += c.move(n.safe(e.title, {
		before: l,
		after: i,
		...c.current()
	})), l += c.move(i), s()), o(), l;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js
function Ff(e) {
	let t = e.options.emphasis || "*";
	if (t !== "*" && t !== "_") throw Error("Cannot serialize emphasis with `" + t + "` for `options.emphasis`, expected `*`, or `_`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js
function If(e) {
	return "&#x" + e.toString(16).toUpperCase() + ";";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/encode-info.js
function Lf(e, t, n) {
	let r = cs(e), i = cs(t);
	return r === void 0 ? i === void 0 ? n === "_" ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !0
	} : r === 1 ? i === void 0 ? {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !0
	} : {
		inside: !1,
		outside: !1
	} : i === void 0 ? {
		inside: !1,
		outside: !1
	} : i === 1 ? {
		inside: !0,
		outside: !1
	} : {
		inside: !1,
		outside: !1
	};
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/emphasis.js
Rf.peek = zf;
function Rf(e, t, n, r) {
	let i = Ff(n), a = n.enter("emphasis"), o = n.createTracker(r), s = o.move(i), c = o.move(n.containerPhrasing(e, {
		after: i,
		before: s,
		...o.current()
	})), l = c.charCodeAt(0), u = Lf(r.before.charCodeAt(r.before.length - 1), l, i);
	u.inside && (c = If(l) + c.slice(1));
	let d = c.charCodeAt(c.length - 1), f = Lf(r.after.charCodeAt(0), d, i);
	f.inside && (c = c.slice(0, -1) + If(d));
	let p = o.move(i);
	return a(), n.attentionEncodeSurroundingInfo = {
		after: f.outside,
		before: u.outside
	}, s + c + p;
}
function zf(e, t, n) {
	return n.options.emphasis || "*";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js
function Bf(e, t) {
	let n = !1;
	return Ou(e, function(e) {
		if ("value" in e && /\r?\n|\r/.test(e.value) || e.type === "break") return n = !0, !1;
	}), !!((!e.depth || e.depth < 3) && Ao(e) && (t.options.setext || n));
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/heading.js
function Vf(e, t, n, r) {
	let i = Math.max(Math.min(6, e.depth || 1), 1), a = n.createTracker(r);
	if (Bf(e, n)) {
		let t = n.enter("headingSetext"), r = n.enter("phrasing"), o = n.containerPhrasing(e, {
			...a.current(),
			before: "\n",
			after: "\n"
		});
		return r(), t(), o + "\n" + (i === 1 ? "=" : "-").repeat(o.length - (Math.max(o.lastIndexOf("\r"), o.lastIndexOf("\n")) + 1));
	}
	let o = "#".repeat(i), s = n.enter("headingAtx"), c = n.enter("phrasing");
	a.move(o + " ");
	let l = n.containerPhrasing(e, {
		before: "# ",
		after: "\n",
		...a.current()
	});
	return /^[\t ]/.test(l) && (l = If(l.charCodeAt(0)) + l.slice(1)), l = l ? o + " " + l : o, n.options.closeAtx && (l += " " + o), c(), s(), l;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/html.js
Hf.peek = Uf;
function Hf(e) {
	return e.value || "";
}
function Uf() {
	return "<";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/image.js
Wf.peek = Gf;
function Wf(e, t, n, r) {
	let i = Nf(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.enter("image"), s = n.enter("label"), c = n.createTracker(r), l = c.move("![");
	return l += c.move(n.safe(e.alt, {
		before: l,
		after: "]",
		...c.current()
	})), l += c.move("]("), s(), !e.url && e.title || /[\0- \u007F]/.test(e.url) ? (s = n.enter("destinationLiteral"), l += c.move("<"), l += c.move(n.safe(e.url, {
		before: l,
		after: ">",
		...c.current()
	})), l += c.move(">")) : (s = n.enter("destinationRaw"), l += c.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : ")",
		...c.current()
	}))), s(), e.title && (s = n.enter(`title${a}`), l += c.move(" " + i), l += c.move(n.safe(e.title, {
		before: l,
		after: i,
		...c.current()
	})), l += c.move(i), s()), l += c.move(")"), o(), l;
}
function Gf() {
	return "!";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/image-reference.js
Kf.peek = qf;
function Kf(e, t, n, r) {
	let i = e.referenceType, a = n.enter("imageReference"), o = n.enter("label"), s = n.createTracker(r), c = s.move("!["), l = n.safe(e.alt, {
		before: c,
		after: "]",
		...s.current()
	});
	c += s.move(l + "]["), o();
	let u = n.stack;
	n.stack = [], o = n.enter("reference");
	let d = n.safe(n.associationId(e), {
		before: c,
		after: "]",
		...s.current()
	});
	return o(), n.stack = u, a(), i === "full" || !l || l !== d ? c += s.move(d + "]") : i === "shortcut" ? c = c.slice(0, -1) : c += s.move("]"), c;
}
function qf() {
	return "!";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
Jf.peek = Yf;
function Jf(e, t, n) {
	let r = e.value || "", i = "`", a = -1;
	for (; RegExp("(^|[^`])" + i + "([^`]|$)").test(r);) i += "`";
	for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++a < n.unsafe.length;) {
		let e = n.unsafe[a], t = n.compilePattern(e), i;
		if (e.atBreak) for (; i = t.exec(r);) {
			let e = i.index;
			r.charCodeAt(e) === 10 && r.charCodeAt(e - 1) === 13 && e--, r = r.slice(0, e) + " " + r.slice(i.index + 1);
		}
	}
	return i + r + i;
}
function Yf() {
	return "`";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js
function Xf(e, t) {
	let n = Ao(e);
	return !!(!t.options.resourceLink && e.url && !e.title && e.children && e.children.length === 1 && e.children[0].type === "text" && (n === e.url || "mailto:" + n === e.url) && /^[a-z][a-z+.-]+:/i.test(e.url) && !/[\0- <>\u007F]/.test(e.url));
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/link.js
Zf.peek = Qf;
function Zf(e, t, n, r) {
	let i = Nf(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.createTracker(r), s, c;
	if (Xf(e, n)) {
		let t = n.stack;
		n.stack = [], s = n.enter("autolink");
		let r = o.move("<");
		return r += o.move(n.containerPhrasing(e, {
			before: r,
			after: ">",
			...o.current()
		})), r += o.move(">"), s(), n.stack = t, r;
	}
	s = n.enter("link"), c = n.enter("label");
	let l = o.move("[");
	return l += o.move(n.containerPhrasing(e, {
		before: l,
		after: "](",
		...o.current()
	})), l += o.move("]("), c(), !e.url && e.title || /[\0- \u007F]/.test(e.url) ? (c = n.enter("destinationLiteral"), l += o.move("<"), l += o.move(n.safe(e.url, {
		before: l,
		after: ">",
		...o.current()
	})), l += o.move(">")) : (c = n.enter("destinationRaw"), l += o.move(n.safe(e.url, {
		before: l,
		after: e.title ? " " : ")",
		...o.current()
	}))), c(), e.title && (c = n.enter(`title${a}`), l += o.move(" " + i), l += o.move(n.safe(e.title, {
		before: l,
		after: i,
		...o.current()
	})), l += o.move(i), c()), l += o.move(")"), s(), l;
}
function Qf(e, t, n) {
	return Xf(e, n) ? "<" : "[";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/link-reference.js
$f.peek = ep;
function $f(e, t, n, r) {
	let i = e.referenceType, a = n.enter("linkReference"), o = n.enter("label"), s = n.createTracker(r), c = s.move("["), l = n.containerPhrasing(e, {
		before: c,
		after: "]",
		...s.current()
	});
	c += s.move(l + "]["), o();
	let u = n.stack;
	n.stack = [], o = n.enter("reference");
	let d = n.safe(n.associationId(e), {
		before: c,
		after: "]",
		...s.current()
	});
	return o(), n.stack = u, a(), i === "full" || !l || l !== d ? c += s.move(d + "]") : i === "shortcut" ? c = c.slice(0, -1) : c += s.move("]"), c;
}
function ep() {
	return "[";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
function tp(e) {
	let t = e.options.bullet || "*";
	if (t !== "*" && t !== "+" && t !== "-") throw Error("Cannot serialize items with `" + t + "` for `options.bullet`, expected `*`, `+`, or `-`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js
function np(e) {
	let t = tp(e), n = e.options.bulletOther;
	if (!n) return t === "*" ? "-" : "*";
	if (n !== "*" && n !== "+" && n !== "-") throw Error("Cannot serialize items with `" + n + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
	if (n === t) throw Error("Expected `bullet` (`" + t + "`) and `bulletOther` (`" + n + "`) to be different");
	return n;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js
function rp(e) {
	let t = e.options.bulletOrdered || ".";
	if (t !== "." && t !== ")") throw Error("Cannot serialize items with `" + t + "` for `options.bulletOrdered`, expected `.` or `)`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-rule.js
function ip(e) {
	let t = e.options.rule || "*";
	if (t !== "*" && t !== "-" && t !== "_") throw Error("Cannot serialize rules with `" + t + "` for `options.rule`, expected `*`, `-`, or `_`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/list.js
function ap(e, t, n, r) {
	let i = n.enter("list"), a = n.bulletCurrent, o = e.ordered ? rp(n) : tp(n), s = e.ordered ? o === "." ? ")" : "." : np(n), c = t && n.bulletLastUsed ? o === n.bulletLastUsed : !1;
	if (!e.ordered) {
		let t = e.children ? e.children[0] : void 0;
		if ((o === "*" || o === "-") && t && (!t.children || !t.children[0]) && n.stack[n.stack.length - 1] === "list" && n.stack[n.stack.length - 2] === "listItem" && n.stack[n.stack.length - 3] === "list" && n.stack[n.stack.length - 4] === "listItem" && n.indexStack[n.indexStack.length - 1] === 0 && n.indexStack[n.indexStack.length - 2] === 0 && n.indexStack[n.indexStack.length - 3] === 0 && (c = !0), ip(n) === o && t) {
			let t = -1;
			for (; ++t < e.children.length;) {
				let n = e.children[t];
				if (n && n.type === "listItem" && n.children && n.children[0] && n.children[0].type === "thematicBreak") {
					c = !0;
					break;
				}
			}
		}
	}
	c && (o = s), n.bulletCurrent = o;
	let l = n.containerFlow(e, r);
	return n.bulletLastUsed = o, n.bulletCurrent = a, i(), l;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
function op(e) {
	let t = e.options.listItemIndent || "one";
	if (t !== "tab" && t !== "one" && t !== "mixed") throw Error("Cannot serialize items with `" + t + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/list-item.js
function sp(e, t, n, r) {
	let i = op(n), a = n.bulletCurrent || tp(n);
	t && t.type === "list" && t.ordered && (a = (typeof t.start == "number" && t.start > -1 ? t.start : 1) + (n.options.incrementListMarker === !1 ? 0 : t.children.indexOf(e)) + a);
	let o = a.length + 1;
	(i === "tab" || i === "mixed" && (t && t.type === "list" && t.spread || e.spread)) && (o = Math.ceil(o / 4) * 4);
	let s = n.createTracker(r);
	s.move(a + " ".repeat(o - a.length)), s.shift(o);
	let c = n.enter("listItem"), l = n.indentLines(n.containerFlow(e, s.current()), u);
	return c(), l;
	function u(e, t, n) {
		return t ? (n ? "" : " ".repeat(o)) + e : (n ? a : a + " ".repeat(o - a.length)) + e;
	}
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/paragraph.js
function cp(e, t, n, r) {
	let i = n.enter("paragraph"), a = n.enter("phrasing"), o = n.containerPhrasing(e, r);
	return a(), i(), o;
}
//#endregion
//#region node_modules/mdast-util-phrasing/lib/index.js
var lp = _u([
	"break",
	"delete",
	"emphasis",
	"footnote",
	"footnoteReference",
	"image",
	"imageReference",
	"inlineCode",
	"inlineMath",
	"link",
	"linkReference",
	"mdxJsxTextElement",
	"mdxTextExpression",
	"strong",
	"text",
	"textDirective"
]);
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/root.js
function up(e, t, n, r) {
	return (e.children.some(function(e) {
		return lp(e);
	}) ? n.containerPhrasing : n.containerFlow).call(n, e, r);
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-strong.js
function dp(e) {
	let t = e.options.strong || "*";
	if (t !== "*" && t !== "_") throw Error("Cannot serialize strong with `" + t + "` for `options.strong`, expected `*`, or `_`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/strong.js
fp.peek = pp;
function fp(e, t, n, r) {
	let i = dp(n), a = n.enter("strong"), o = n.createTracker(r), s = o.move(i + i), c = o.move(n.containerPhrasing(e, {
		after: i,
		before: s,
		...o.current()
	})), l = c.charCodeAt(0), u = Lf(r.before.charCodeAt(r.before.length - 1), l, i);
	u.inside && (c = If(l) + c.slice(1));
	let d = c.charCodeAt(c.length - 1), f = Lf(r.after.charCodeAt(0), d, i);
	f.inside && (c = c.slice(0, -1) + If(d));
	let p = o.move(i + i);
	return a(), n.attentionEncodeSurroundingInfo = {
		after: f.outside,
		before: u.outside
	}, s + c + p;
}
function pp(e, t, n) {
	return n.options.strong || "*";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/text.js
function mp(e, t, n, r) {
	return n.safe(e.value, r);
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js
function hp(e) {
	let t = e.options.ruleRepetition || 3;
	if (t < 3) throw Error("Cannot serialize rules with repetition `" + t + "` for `options.ruleRepetition`, expected `3` or more");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js
function gp(e, t, n) {
	let r = (ip(n) + (n.options.ruleSpaces ? " " : "")).repeat(hp(n));
	return n.options.ruleSpaces ? r.slice(0, -1) : r;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/index.js
var _p = {
	blockquote: Cf,
	break: Df,
	code: jf,
	definition: Pf,
	emphasis: Rf,
	hardBreak: Df,
	heading: Vf,
	html: Hf,
	image: Wf,
	imageReference: Kf,
	inlineCode: Jf,
	link: Zf,
	linkReference: $f,
	list: ap,
	listItem: sp,
	paragraph: cp,
	root: up,
	strong: fp,
	text: mp,
	thematicBreak: gp
};
//#endregion
//#region node_modules/mdast-util-gfm-table/lib/index.js
function vp() {
	return {
		enter: {
			table: yp,
			tableData: Cp,
			tableHeader: Cp,
			tableRow: xp
		},
		exit: {
			codeText: wp,
			table: bp,
			tableData: Sp,
			tableHeader: Sp,
			tableRow: Sp
		}
	};
}
function yp(e) {
	let t = e._align;
	this.enter({
		type: "table",
		align: t.map(function(e) {
			return e === "none" ? null : e;
		}),
		children: []
	}, e), this.data.inTable = !0;
}
function bp(e) {
	this.exit(e), this.data.inTable = void 0;
}
function xp(e) {
	this.enter({
		type: "tableRow",
		children: []
	}, e);
}
function Sp(e) {
	this.exit(e);
}
function Cp(e) {
	this.enter({
		type: "tableCell",
		children: []
	}, e);
}
function wp(e) {
	let t = this.resume();
	this.data.inTable && (t = t.replace(/\\([\\|])/g, Tp));
	let n = this.stack[this.stack.length - 1];
	n.type, n.value = t, this.exit(e);
}
function Tp(e, t) {
	return t === "|" ? t : e;
}
function Ep(e) {
	let t = e || {}, n = t.tableCellPadding, r = t.tablePipeAlign, i = t.stringLength, a = n ? " " : "|";
	return {
		unsafe: [
			{
				character: "\r",
				inConstruct: "tableCell"
			},
			{
				character: "\n",
				inConstruct: "tableCell"
			},
			{
				atBreak: !0,
				character: "|",
				after: "[	 :-]"
			},
			{
				character: "|",
				inConstruct: "tableCell"
			},
			{
				atBreak: !0,
				character: ":",
				after: "-"
			},
			{
				atBreak: !0,
				character: "-",
				after: "[:|-]"
			}
		],
		handlers: {
			inlineCode: f,
			table: o,
			tableCell: c,
			tableRow: s
		}
	};
	function o(e, t, n, r) {
		return l(u(e, n, r), e.align);
	}
	function s(e, t, n, r) {
		let i = l([d(e, n, r)]);
		return i.slice(0, i.indexOf("\n"));
	}
	function c(e, t, n, r) {
		let i = n.enter("tableCell"), o = n.enter("phrasing"), s = n.containerPhrasing(e, {
			...r,
			before: a,
			after: a
		});
		return o(), i(), s;
	}
	function l(e, t) {
		return bf(e, {
			align: t,
			alignDelimiters: r,
			padding: n,
			stringLength: i
		});
	}
	function u(e, t, n) {
		let r = e.children, i = -1, a = [], o = t.enter("table");
		for (; ++i < r.length;) a[i] = d(r[i], t, n);
		return o(), a;
	}
	function d(e, t, n) {
		let r = e.children, i = -1, a = [], o = t.enter("tableRow");
		for (; ++i < r.length;) a[i] = c(r[i], e, t, n);
		return o(), a;
	}
	function f(e, t, n) {
		let r = _p.inlineCode(e, t, n);
		return n.stack.includes("tableCell") && (r = r.replace(/\|/g, "\\$&")), r;
	}
}
//#endregion
//#region node_modules/mdast-util-gfm-task-list-item/lib/index.js
function Dp() {
	return { exit: {
		taskListCheckValueChecked: kp,
		taskListCheckValueUnchecked: kp,
		paragraph: Ap
	} };
}
function Op() {
	return {
		unsafe: [{
			atBreak: !0,
			character: "-",
			after: "[:|-]"
		}],
		handlers: { listItem: jp }
	};
}
function kp(e) {
	let t = this.stack[this.stack.length - 2];
	t.type, t.checked = e.type === "taskListCheckValueChecked";
}
function Ap(e) {
	let t = this.stack[this.stack.length - 2];
	if (t && t.type === "listItem" && typeof t.checked == "boolean") {
		let e = this.stack[this.stack.length - 1];
		e.type;
		let n = e.children[0];
		if (n && n.type === "text") {
			let r = t.children, i = -1, a;
			for (; ++i < r.length;) {
				let e = r[i];
				if (e.type === "paragraph") {
					a = e;
					break;
				}
			}
			a === e && (n.value = n.value.slice(1), n.value.length === 0 ? e.children.shift() : e.position && n.position && typeof n.position.start.offset == "number" && (n.position.start.column++, n.position.start.offset++, e.position.start = Object.assign({}, n.position.start)));
		}
	}
	this.exit(e);
}
function jp(e, t, n, r) {
	let i = e.children[0], a = typeof e.checked == "boolean" && i && i.type === "paragraph", o = "[" + (e.checked ? "x" : " ") + "] ", s = n.createTracker(r);
	a && s.move(o);
	let c = _p.listItem(e, t, n, {
		...r,
		...s.current()
	});
	return a && (c = c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, l)), c;
	function l(e) {
		return e + o;
	}
}
//#endregion
//#region node_modules/mdast-util-gfm/lib/index.js
function Mp() {
	return [
		Ld(),
		cf(),
		pf(),
		vp(),
		Dp()
	];
}
function Np(e) {
	return { extensions: [
		Rd(),
		lf(e),
		mf(),
		Ep(e),
		Op()
	] };
}
//#endregion
//#region node_modules/micromark-extension-gfm-autolink-literal/lib/syntax.js
var Pp = {
	tokenize: Jp,
	partial: !0
}, Fp = {
	tokenize: Yp,
	partial: !0
}, Ip = {
	tokenize: Xp,
	partial: !0
}, Lp = {
	tokenize: Zp,
	partial: !0
}, Rp = {
	tokenize: Qp,
	partial: !0
}, zp = {
	name: "wwwAutolink",
	tokenize: Kp,
	previous: $p
}, Bp = {
	name: "protocolAutolink",
	tokenize: qp,
	previous: em
}, Vp = {
	name: "emailAutolink",
	tokenize: Gp,
	previous: tm
}, Hp = {};
function Up() {
	return { text: Hp };
}
for (var Wp = 48; Wp < 123;) Hp[Wp] = Vp, Wp++, Wp === 58 ? Wp = 65 : Wp === 91 && (Wp = 97);
Hp[43] = Vp, Hp[45] = Vp, Hp[46] = Vp, Hp[95] = Vp, Hp[72] = [Vp, Bp], Hp[104] = [Vp, Bp], Hp[87] = [Vp, zp], Hp[119] = [Vp, zp];
function Gp(e, t, n) {
	let r = this, i, a;
	return o;
	function o(t) {
		return !nm(t) || !tm.call(r, r.previous) || rm(r.events) ? n(t) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), s(t));
	}
	function s(t) {
		return nm(t) ? (e.consume(t), s) : t === 64 ? (e.consume(t), c) : n(t);
	}
	function c(t) {
		return t === 46 ? e.check(Rp, u, l)(t) : t === 45 || t === 95 || Go(t) ? (a = !0, e.consume(t), c) : u(t);
	}
	function l(t) {
		return e.consume(t), i = !0, c;
	}
	function u(o) {
		return a && i && Wo(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), t(o)) : n(o);
	}
}
function Kp(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return t !== 87 && t !== 119 || !$p.call(r, r.previous) || rm(r.events) ? n(t) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(Pp, e.attempt(Fp, e.attempt(Ip, a), n), n)(t));
	}
	function a(n) {
		return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), t(n);
	}
}
function qp(e, t, n) {
	let r = this, i = "", a = !1;
	return o;
	function o(t) {
		return (t === 72 || t === 104) && em.call(r, r.previous) && !rm(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(t), e.consume(t), s) : n(t);
	}
	function s(t) {
		if (Wo(t) && i.length < 5) return i += String.fromCodePoint(t), e.consume(t), s;
		if (t === 58) {
			let n = i.toLowerCase();
			if (n === "http" || n === "https") return e.consume(t), c;
		}
		return n(t);
	}
	function c(t) {
		return t === 47 ? (e.consume(t), a ? l : (a = !0, c)) : n(t);
	}
	function l(t) {
		return t === null || qo(t) || Zo(t) || $o(t) || Qo(t) ? n(t) : e.attempt(Fp, e.attempt(Ip, u), n)(t);
	}
	function u(n) {
		return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), t(n);
	}
}
function Jp(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return (t === 87 || t === 119) && r < 3 ? (r++, e.consume(t), i) : t === 46 && r === 3 ? (e.consume(t), a) : n(t);
	}
	function a(e) {
		return e === null ? n(e) : t(e);
	}
}
function Yp(e, t, n) {
	let r, i, a;
	return o;
	function o(t) {
		return t === 46 || t === 95 ? e.check(Lp, c, s)(t) : t === null || Zo(t) || $o(t) || t !== 45 && Qo(t) ? c(t) : (a = !0, e.consume(t), o);
	}
	function s(t) {
		return t === 95 ? r = !0 : (i = r, r = void 0), e.consume(t), o;
	}
	function c(e) {
		return i || r || !a ? n(e) : t(e);
	}
}
function Xp(e, t) {
	let n = 0, r = 0;
	return i;
	function i(o) {
		return o === 40 ? (n++, e.consume(o), i) : o === 41 && r < n ? a(o) : o === 33 || o === 34 || o === 38 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 60 || o === 63 || o === 93 || o === 95 || o === 126 ? e.check(Lp, t, a)(o) : o === null || Zo(o) || $o(o) ? t(o) : (e.consume(o), i);
	}
	function a(t) {
		return t === 41 && r++, e.consume(t), i;
	}
}
function Zp(e, t, n) {
	return r;
	function r(o) {
		return o === 33 || o === 34 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 63 || o === 95 || o === 126 ? (e.consume(o), r) : o === 38 ? (e.consume(o), a) : o === 93 ? (e.consume(o), i) : o === 60 || o === null || Zo(o) || $o(o) ? t(o) : n(o);
	}
	function i(e) {
		return e === null || e === 40 || e === 91 || Zo(e) || $o(e) ? t(e) : r(e);
	}
	function a(e) {
		return Wo(e) ? o(e) : n(e);
	}
	function o(t) {
		return t === 59 ? (e.consume(t), r) : Wo(t) ? (e.consume(t), o) : n(t);
	}
}
function Qp(e, t, n) {
	return r;
	function r(t) {
		return e.consume(t), i;
	}
	function i(e) {
		return Go(e) ? n(e) : t(e);
	}
}
function $p(e) {
	return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || Zo(e);
}
function em(e) {
	return !Wo(e);
}
function tm(e) {
	return !(e === 47 || nm(e));
}
function nm(e) {
	return e === 43 || e === 45 || e === 46 || e === 95 || Go(e);
}
function rm(e) {
	let t = e.length, n = !1;
	for (; t--;) {
		let r = e[t][1];
		if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
			n = !0;
			break;
		}
		if (r._gfmAutolinkLiteralWalkedInto) {
			n = !1;
			break;
		}
	}
	return e.length > 0 && !n && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), n;
}
//#endregion
//#region node_modules/micromark-extension-gfm-footnote/lib/syntax.js
var im = {
	tokenize: fm,
	partial: !0
};
function am() {
	return {
		document: { 91: {
			name: "gfmFootnoteDefinition",
			tokenize: lm,
			continuation: { tokenize: um },
			exit: dm
		} },
		text: {
			91: {
				name: "gfmFootnoteCall",
				tokenize: cm
			},
			93: {
				name: "gfmPotentialFootnoteCall",
				add: "after",
				tokenize: om,
				resolveTo: sm
			}
		}
	};
}
function om(e, t, n) {
	let r = this, i = r.events.length, a = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), o;
	for (; i--;) {
		let e = r.events[i][1];
		if (e.type === "labelImage") {
			o = e;
			break;
		}
		if (e.type === "gfmFootnoteCall" || e.type === "labelLink" || e.type === "label" || e.type === "image" || e.type === "link") break;
	}
	return s;
	function s(i) {
		if (!o || !o._balanced) return n(i);
		let s = Uo(r.sliceSerialize({
			start: o.end,
			end: r.now()
		}));
		return s.codePointAt(0) !== 94 || !a.includes(s.slice(1)) ? n(i) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(i), e.exit("gfmFootnoteCallLabelMarker"), t(i));
	}
}
function sm(e, t) {
	let n = e.length;
	for (; n--;) if (e[n][1].type === "labelImage" && e[n][0] === "enter") {
		e[n][1];
		break;
	}
	e[n + 1][1].type = "data", e[n + 3][1].type = "gfmFootnoteCallLabelMarker";
	let r = {
		type: "gfmFootnoteCall",
		start: Object.assign({}, e[n + 3][1].start),
		end: Object.assign({}, e[e.length - 1][1].end)
	}, i = {
		type: "gfmFootnoteCallMarker",
		start: Object.assign({}, e[n + 3][1].end),
		end: Object.assign({}, e[n + 3][1].end)
	};
	i.end.column++, i.end.offset++, i.end._bufferIndex++;
	let a = {
		type: "gfmFootnoteCallString",
		start: Object.assign({}, i.end),
		end: Object.assign({}, e[e.length - 1][1].start)
	}, o = {
		type: "chunkString",
		contentType: "string",
		start: Object.assign({}, a.start),
		end: Object.assign({}, a.end)
	}, s = [
		e[n + 1],
		e[n + 2],
		[
			"enter",
			r,
			t
		],
		e[n + 3],
		e[n + 4],
		[
			"enter",
			i,
			t
		],
		[
			"exit",
			i,
			t
		],
		[
			"enter",
			a,
			t
		],
		[
			"enter",
			o,
			t
		],
		[
			"exit",
			o,
			t
		],
		[
			"exit",
			a,
			t
		],
		e[e.length - 2],
		e[e.length - 1],
		[
			"exit",
			r,
			t
		]
	];
	return e.splice(n, e.length - n + 1, ...s), e;
}
function cm(e, t, n) {
	let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), a = 0, o;
	return s;
	function s(t) {
		return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(t), e.exit("gfmFootnoteCallLabelMarker"), c;
	}
	function c(t) {
		return t === 94 ? (e.enter("gfmFootnoteCallMarker"), e.consume(t), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", l) : n(t);
	}
	function l(s) {
		if (a > 999 || s === 93 && !o || s === null || s === 91 || Zo(s)) return n(s);
		if (s === 93) {
			e.exit("chunkString");
			let a = e.exit("gfmFootnoteCallString");
			return i.includes(Uo(r.sliceSerialize(a))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(s), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), t) : n(s);
		}
		return Zo(s) || (o = !0), a++, e.consume(s), s === 92 ? u : l;
	}
	function u(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), a++, l) : l(t);
	}
}
function lm(e, t, n) {
	let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), a, o = 0, s;
	return c;
	function c(t) {
		return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionLabelMarker"), l;
	}
	function l(t) {
		return t === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", u) : n(t);
	}
	function u(t) {
		if (o > 999 || t === 93 && !s || t === null || t === 91 || Zo(t)) return n(t);
		if (t === 93) {
			e.exit("chunkString");
			let n = e.exit("gfmFootnoteDefinitionLabelString");
			return a = Uo(r.sliceSerialize(n)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), f;
		}
		return Zo(t) || (s = !0), o++, e.consume(t), t === 92 ? d : u;
	}
	function d(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), o++, u) : u(t);
	}
	function f(t) {
		return t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), i.includes(a) || i.push(a), W(e, p, "gfmFootnoteDefinitionWhitespace")) : n(t);
	}
	function p(e) {
		return t(e);
	}
}
function um(e, t, n) {
	return e.check(gs, t, e.attempt(im, t, n));
}
function dm(e) {
	e.exit("gfmFootnoteDefinition");
}
function fm(e, t, n) {
	let r = this;
	return W(e, i, "gfmFootnoteDefinitionIndent", 5);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], !0).length === 4 ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm-strikethrough/lib/syntax.js
function pm(e) {
	let t = (e || {}).singleTilde, n = {
		name: "strikethrough",
		tokenize: i,
		resolveAll: r
	};
	return t ??= !0, {
		text: { 126: n },
		insideSpan: { null: [n] },
		attentionMarkers: { null: [126] }
	};
	function r(e, t) {
		let n = -1;
		for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "strikethroughSequenceTemporary" && e[n][1]._close) {
			let r = n;
			for (; r--;) if (e[r][0] === "exit" && e[r][1].type === "strikethroughSequenceTemporary" && e[r][1]._open && e[n][1].end.offset - e[n][1].start.offset === e[r][1].end.offset - e[r][1].start.offset) {
				e[n][1].type = "strikethroughSequence", e[r][1].type = "strikethroughSequence";
				let i = {
					type: "strikethrough",
					start: Object.assign({}, e[r][1].start),
					end: Object.assign({}, e[n][1].end)
				}, a = {
					type: "strikethroughText",
					start: Object.assign({}, e[r][1].end),
					end: Object.assign({}, e[n][1].start)
				}, o = [
					[
						"enter",
						i,
						t
					],
					[
						"enter",
						e[r][1],
						t
					],
					[
						"exit",
						e[r][1],
						t
					],
					[
						"enter",
						a,
						t
					]
				], s = t.parser.constructs.insideSpan.null;
				s && Io(o, o.length, 0, ls(s, e.slice(r + 1, n), t)), Io(o, o.length, 0, [
					[
						"exit",
						a,
						t
					],
					[
						"enter",
						e[n][1],
						t
					],
					[
						"exit",
						e[n][1],
						t
					],
					[
						"exit",
						i,
						t
					]
				]), Io(e, r - 1, n - r + 3, o), n = r + o.length - 2;
				break;
			}
		}
		for (n = -1; ++n < e.length;) e[n][1].type === "strikethroughSequenceTemporary" && (e[n][1].type = "data");
		return e;
	}
	function i(e, n, r) {
		let i = this.previous, a = this.events, o = 0;
		return s;
		function s(t) {
			return i === 126 && a[a.length - 1][1].type !== "characterEscape" ? r(t) : (e.enter("strikethroughSequenceTemporary"), c(t));
		}
		function c(a) {
			let s = cs(i);
			if (a === 126) return o > 1 ? r(a) : (e.consume(a), o++, c);
			if (o < 2 && !t) return r(a);
			let l = e.exit("strikethroughSequenceTemporary"), u = cs(a);
			return l._open = !u || u === 2 && !!s, l._close = !s || s === 2 && !!u, n(a);
		}
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/edit-map.js
var mm = class {
	constructor() {
		this.map = [];
	}
	add(e, t, n) {
		hm(this, e, t, n);
	}
	consume(e) {
		/* c8 ignore next 3 -- `resolve` is never called without tables, so without edits. */
		if (this.map.sort(function(e, t) {
			return e[0] - t[0];
		}), this.map.length === 0) return;
		let t = this.map.length, n = [];
		for (; t > 0;) --t, n.push(e.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), e.length = this.map[t][0];
		n.push(e.slice()), e.length = 0;
		let r = n.pop();
		for (; r;) {
			for (let t of r) e.push(t);
			r = n.pop();
		}
		this.map.length = 0;
	}
};
function hm(e, t, n, r) {
	let i = 0;
	if (!(n === 0 && r.length === 0)) {
		for (; i < e.map.length;) {
			if (e.map[i][0] === t) {
				e.map[i][1] += n, e.map[i][2].push(...r);
				return;
			}
			i += 1;
		}
		e.map.push([
			t,
			n,
			r
		]);
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/infer.js
function gm(e, t) {
	let n = !1, r = [];
	for (; t < e.length;) {
		let i = e[t];
		if (n) {
			if (i[0] === "enter") i[1].type === "tableContent" && r.push(e[t + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
			else if (i[1].type === "tableContent") {
				if (e[t - 1][1].type === "tableDelimiterMarker") {
					let e = r.length - 1;
					r[e] = r[e] === "left" ? "center" : "right";
				}
			} else if (i[1].type === "tableDelimiterRow") break;
		} else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (n = !0);
		t += 1;
	}
	return r;
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/syntax.js
function _m() {
	return { flow: { null: {
		name: "table",
		tokenize: vm,
		resolveAll: ym
	} } };
}
function vm(e, t, n) {
	let r = this, i = 0, a = 0, o;
	return s;
	function s(e) {
		let t = r.events.length - 1;
		for (; t > -1;) {
			let e = r.events[t][1].type;
			if (e === "lineEnding" || e === "linePrefix") t--;
			else break;
		}
		let i = t > -1 ? r.events[t][1].type : null, a = i === "tableHead" || i === "tableRow" ? S : c;
		return a === S && r.parser.lazy[r.now().line] ? n(e) : a(e);
	}
	function c(t) {
		return e.enter("tableHead"), e.enter("tableRow"), l(t);
	}
	function l(e) {
		return e === 124 ? u(e) : (o = !0, a += 1, u(e));
	}
	function u(t) {
		return t === null ? n(t) : H(t) ? a > 1 ? (a = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), p) : n(t) : U(t) ? W(e, u, "whitespace")(t) : (a += 1, o && (o = !1, i += 1), t === 124 ? (e.enter("tableCellDivider"), e.consume(t), e.exit("tableCellDivider"), o = !0, u) : (e.enter("data"), d(t)));
	}
	function d(t) {
		return t === null || t === 124 || Zo(t) ? (e.exit("data"), u(t)) : (e.consume(t), t === 92 ? f : d);
	}
	function f(t) {
		return t === 92 || t === 124 ? (e.consume(t), d) : d(t);
	}
	function p(t) {
		return r.interrupt = !1, r.parser.lazy[r.now().line] ? n(t) : (e.enter("tableDelimiterRow"), o = !1, U(t) ? W(e, m, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : m(t));
	}
	function m(t) {
		return t === 45 || t === 58 ? g(t) : t === 124 ? (o = !0, e.enter("tableCellDivider"), e.consume(t), e.exit("tableCellDivider"), h) : x(t);
	}
	function h(t) {
		return U(t) ? W(e, g, "whitespace")(t) : g(t);
	}
	function g(t) {
		return t === 58 ? (a += 1, o = !0, e.enter("tableDelimiterMarker"), e.consume(t), e.exit("tableDelimiterMarker"), _) : t === 45 ? (a += 1, _(t)) : t === null || H(t) ? b(t) : x(t);
	}
	function _(t) {
		return t === 45 ? (e.enter("tableDelimiterFiller"), v(t)) : x(t);
	}
	function v(t) {
		return t === 45 ? (e.consume(t), v) : t === 58 ? (o = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(t), e.exit("tableDelimiterMarker"), y) : (e.exit("tableDelimiterFiller"), y(t));
	}
	function y(t) {
		return U(t) ? W(e, b, "whitespace")(t) : b(t);
	}
	function b(n) {
		return n === 124 ? m(n) : n === null || H(n) ? !o || i !== a ? x(n) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), t(n)) : x(n);
	}
	function x(e) {
		return n(e);
	}
	function S(t) {
		return e.enter("tableRow"), C(t);
	}
	function C(n) {
		return n === 124 ? (e.enter("tableCellDivider"), e.consume(n), e.exit("tableCellDivider"), C) : n === null || H(n) ? (e.exit("tableRow"), t(n)) : U(n) ? W(e, C, "whitespace")(n) : (e.enter("data"), w(n));
	}
	function w(t) {
		return t === null || t === 124 || Zo(t) ? (e.exit("data"), C(t)) : (e.consume(t), t === 92 ? T : w);
	}
	function T(t) {
		return t === 92 || t === 124 ? (e.consume(t), w) : w(t);
	}
}
function ym(e, t) {
	let n = -1, r = !0, i = 0, a = [
		0,
		0,
		0,
		0
	], o = [
		0,
		0,
		0,
		0
	], s = !1, c = 0, l, u, d, f = new mm();
	for (; ++n < e.length;) {
		let p = e[n], m = p[1];
		p[0] === "enter" ? m.type === "tableHead" ? (s = !1, c !== 0 && (xm(f, t, c, l, u), u = void 0, c = 0), l = {
			type: "table",
			start: Object.assign({}, m.start),
			end: Object.assign({}, m.end)
		}, f.add(n, 0, [[
			"enter",
			l,
			t
		]])) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (r = !0, d = void 0, a = [
			0,
			0,
			0,
			0
		], o = [
			0,
			n + 1,
			0,
			0
		], s && (s = !1, u = {
			type: "tableBody",
			start: Object.assign({}, m.start),
			end: Object.assign({}, m.end)
		}, f.add(n, 0, [[
			"enter",
			u,
			t
		]])), i = m.type === "tableDelimiterRow" ? 2 : u ? 3 : 1) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") ? (r = !1, o[2] === 0 && (a[1] !== 0 && (o[0] = o[1], d = bm(f, t, a, i, void 0, d), a = [
			0,
			0,
			0,
			0
		]), o[2] = n)) : m.type === "tableCellDivider" && (r ? r = !1 : (a[1] !== 0 && (o[0] = o[1], d = bm(f, t, a, i, void 0, d)), a = o, o = [
			a[1],
			n,
			0,
			0
		])) : m.type === "tableHead" ? (s = !0, c = n) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (c = n, a[1] === 0 ? o[1] !== 0 && (d = bm(f, t, o, i, n, d)) : (o[0] = o[1], d = bm(f, t, a, i, n, d)), i = 0) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") && (o[3] = n);
	}
	for (c !== 0 && xm(f, t, c, l, u), f.consume(t.events), n = -1; ++n < t.events.length;) {
		let e = t.events[n];
		e[0] === "enter" && e[1].type === "table" && (e[1]._align = gm(t.events, n));
	}
	return e;
}
function bm(e, t, n, r, i, a) {
	let o = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData";
	n[0] !== 0 && (a.end = Object.assign({}, Sm(t.events, n[0])), e.add(n[0], 0, [[
		"exit",
		a,
		t
	]]));
	let s = Sm(t.events, n[1]);
	if (a = {
		type: o,
		start: Object.assign({}, s),
		end: Object.assign({}, s)
	}, e.add(n[1], 0, [[
		"enter",
		a,
		t
	]]), n[2] !== 0) {
		let i = Sm(t.events, n[2]), a = Sm(t.events, n[3]), o = {
			type: "tableContent",
			start: Object.assign({}, i),
			end: Object.assign({}, a)
		};
		if (e.add(n[2], 0, [[
			"enter",
			o,
			t
		]]), r !== 2) {
			let r = t.events[n[2]], i = t.events[n[3]];
			if (r[1].end = Object.assign({}, i[1].end), r[1].type = "chunkText", r[1].contentType = "text", n[3] > n[2] + 1) {
				let t = n[2] + 1, r = n[3] - n[2] - 1;
				e.add(t, r, []);
			}
		}
		e.add(n[3] + 1, 0, [[
			"exit",
			o,
			t
		]]);
	}
	return i !== void 0 && (a.end = Object.assign({}, Sm(t.events, i)), e.add(i, 0, [[
		"exit",
		a,
		t
	]]), a = void 0), a;
}
function xm(e, t, n, r, i) {
	let a = [], o = Sm(t.events, n);
	i && (i.end = Object.assign({}, o), a.push([
		"exit",
		i,
		t
	])), r.end = Object.assign({}, o), a.push([
		"exit",
		r,
		t
	]), e.add(n + 1, 0, a);
}
function Sm(e, t) {
	let n = e[t], r = n[0] === "enter" ? "start" : "end";
	return n[1][r];
}
//#endregion
//#region node_modules/micromark-extension-gfm-task-list-item/lib/syntax.js
var Cm = {
	name: "tasklistCheck",
	tokenize: Tm
};
function wm() {
	return { text: { 91: Cm } };
}
function Tm(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return r.previous !== null || !r._gfmTasklistFirstContentOfListItem ? n(t) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(t), e.exit("taskListCheckMarker"), a);
	}
	function a(t) {
		return Zo(t) ? (e.enter("taskListCheckValueUnchecked"), e.consume(t), e.exit("taskListCheckValueUnchecked"), o) : t === 88 || t === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(t), e.exit("taskListCheckValueChecked"), o) : n(t);
	}
	function o(t) {
		return t === 93 ? (e.enter("taskListCheckMarker"), e.consume(t), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), s) : n(t);
	}
	function s(r) {
		return H(r) ? t(r) : U(r) ? e.check({ tokenize: Em }, t, n)(r) : n(r);
	}
}
function Em(e, t, n) {
	return W(e, r, "whitespace");
	function r(e) {
		return e === null ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm/index.js
function Dm(e) {
	return zo([
		Up(),
		am(),
		pm(e),
		_m(),
		wm()
	]);
}
//#endregion
//#region node_modules/remark-gfm/lib/index.js
var Om = {};
function km(e) {
	let t = this, n = e || Om, r = t.data(), i = r.micromarkExtensions ||= [], a = r.fromMarkdownExtensions ||= [], o = r.toMarkdownExtensions ||= [];
	i.push(Dm(n)), a.push(Mp()), o.push(Np(n));
}
//#endregion
//#region node_modules/turndown/lib/turndown.browser.es.js
function Am(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t];
		for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
	}
	return e;
}
function jm(e, t) {
	return Array(t + 1).join(e);
}
function Mm(e) {
	return e.replace(/^\n*/, "");
}
function Nm(e) {
	for (var t = e.length; t > 0 && e[t - 1] === "\n";) t--;
	return e.substring(0, t);
}
function Pm(e) {
	return Nm(Mm(e));
}
var Fm = /* @__PURE__ */ "ADDRESS.ARTICLE.ASIDE.AUDIO.BLOCKQUOTE.BODY.CANVAS.CENTER.DD.DIR.DIV.DL.DT.FIELDSET.FIGCAPTION.FIGURE.FOOTER.FORM.FRAMESET.H1.H2.H3.H4.H5.H6.HEADER.HGROUP.HR.HTML.ISINDEX.LI.MAIN.MENU.NAV.NOFRAMES.NOSCRIPT.OL.OUTPUT.P.PRE.SECTION.TABLE.TBODY.TD.TFOOT.TH.THEAD.TR.UL".split(".");
function Im(e) {
	return Um(e, Fm);
}
var Lm = [
	"AREA",
	"BASE",
	"BR",
	"COL",
	"COMMAND",
	"EMBED",
	"HR",
	"IMG",
	"INPUT",
	"KEYGEN",
	"LINK",
	"META",
	"PARAM",
	"SOURCE",
	"TRACK",
	"WBR"
];
function Rm(e) {
	return Um(e, Lm);
}
function zm(e) {
	return Wm(e, Lm);
}
var Bm = [
	"A",
	"TABLE",
	"THEAD",
	"TBODY",
	"TFOOT",
	"TH",
	"TD",
	"IFRAME",
	"SCRIPT",
	"AUDIO",
	"VIDEO"
];
function Vm(e) {
	return Um(e, Bm);
}
function Hm(e) {
	return Wm(e, Bm);
}
function Um(e, t) {
	return t.indexOf(e.nodeName) >= 0;
}
function Wm(e, t) {
	return e.getElementsByTagName && t.some(function(t) {
		return e.getElementsByTagName(t).length;
	});
}
var Gm = [
	[/\\/g, "\\\\"],
	[/\*/g, "\\*"],
	[/^-/g, "\\-"],
	[/^\+ /g, "\\+ "],
	[/^(=+)/g, "\\$1"],
	[/^(#{1,6}) /g, "\\$1 "],
	[/`/g, "\\`"],
	[/^~~~/g, "\\~~~"],
	[/\[/g, "\\["],
	[/\]/g, "\\]"],
	[/^>/g, "\\>"],
	[/_/g, "\\_"],
	[/^(\d+)\. /g, "$1\\. "]
];
function Km(e) {
	return Gm.reduce(function(e, t) {
		return e.replace(t[0], t[1]);
	}, e);
}
var qm = {};
qm.paragraph = {
	filter: "p",
	replacement: function(e) {
		return "\n\n" + e + "\n\n";
	}
}, qm.lineBreak = {
	filter: "br",
	replacement: function(e, t, n) {
		return n.br + "\n";
	}
}, qm.heading = {
	filter: [
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6"
	],
	replacement: function(e, t, n) {
		var r = Number(t.nodeName.charAt(1));
		if (n.headingStyle === "setext" && r < 3) {
			var i = jm(r === 1 ? "=" : "-", e.length);
			return "\n\n" + e + "\n" + i + "\n\n";
		} else return "\n\n" + jm("#", r) + " " + e + "\n\n";
	}
}, qm.blockquote = {
	filter: "blockquote",
	replacement: function(e) {
		return e = Pm(e).replace(/^/gm, "> "), "\n\n" + e + "\n\n";
	}
}, qm.list = {
	filter: ["ul", "ol"],
	replacement: function(e, t) {
		var n = t.parentNode;
		return n.nodeName === "LI" && n.lastElementChild === t ? "\n" + e : "\n\n" + e + "\n\n";
	}
}, qm.listItem = {
	filter: "li",
	replacement: function(e, t, n) {
		var r = n.bulletListMarker + "   ", i = t.parentNode;
		if (i.nodeName === "OL") {
			var a = i.getAttribute("start"), o = Array.prototype.indexOf.call(i.children, t);
			r = (a ? Number(a) + o : o + 1) + ".  ";
		}
		var s = /\n$/.test(e);
		return e = Pm(e) + (s ? "\n" : ""), e = e.replace(/\n/gm, "\n" + " ".repeat(r.length)), r + e + (t.nextSibling ? "\n" : "");
	}
}, qm.indentedCodeBlock = {
	filter: function(e, t) {
		return t.codeBlockStyle === "indented" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
	},
	replacement: function(e, t, n) {
		return "\n\n    " + t.firstChild.textContent.replace(/\n/g, "\n    ") + "\n\n";
	}
}, qm.fencedCodeBlock = {
	filter: function(e, t) {
		return t.codeBlockStyle === "fenced" && e.nodeName === "PRE" && e.firstChild && e.firstChild.nodeName === "CODE";
	},
	replacement: function(e, t, n) {
		for (var r = ((t.firstChild.getAttribute("class") || "").match(/language-(\S+)/) || [null, ""])[1], i = t.firstChild.textContent, a = n.fence.charAt(0), o = 3, s = RegExp("^" + a + "{3,}", "gm"), c; c = s.exec(i);) c[0].length >= o && (o = c[0].length + 1);
		var l = jm(a, o);
		return "\n\n" + l + r + "\n" + i.replace(/\n$/, "") + "\n" + l + "\n\n";
	}
}, qm.horizontalRule = {
	filter: "hr",
	replacement: function(e, t, n) {
		return "\n\n" + n.hr + "\n\n";
	}
}, qm.inlineLink = {
	filter: function(e, t) {
		return t.linkStyle === "inlined" && e.nodeName === "A" && e.getAttribute("href");
	},
	replacement: function(e, t) {
		var n = Ym(t.getAttribute("href")), r = Xm(Jm(t.getAttribute("title"))), i = r ? " \"" + r + "\"" : "";
		return "[" + e + "](" + n + i + ")";
	}
}, qm.referenceLink = {
	filter: function(e, t) {
		return t.linkStyle === "referenced" && e.nodeName === "A" && e.getAttribute("href");
	},
	replacement: function(e, t, n) {
		var r = Ym(t.getAttribute("href")), i = Jm(t.getAttribute("title"));
		i &&= " \"" + Xm(i) + "\"";
		var a, o;
		switch (n.linkReferenceStyle) {
			case "collapsed":
				a = "[" + e + "][]", o = "[" + e + "]: " + r + i;
				break;
			case "shortcut":
				a = "[" + e + "]", o = "[" + e + "]: " + r + i;
				break;
			default:
				var s = this.references.length + 1;
				a = "[" + e + "][" + s + "]", o = "[" + s + "]: " + r + i;
		}
		return this.references.push(o), a;
	},
	references: [],
	append: function(e) {
		var t = "";
		return this.references.length && (t = "\n\n" + this.references.join("\n") + "\n\n", this.references = []), t;
	}
}, qm.emphasis = {
	filter: ["em", "i"],
	replacement: function(e, t, n) {
		return e.trim() ? n.emDelimiter + e + n.emDelimiter : "";
	}
}, qm.strong = {
	filter: ["strong", "b"],
	replacement: function(e, t, n) {
		return e.trim() ? n.strongDelimiter + e + n.strongDelimiter : "";
	}
}, qm.code = {
	filter: function(e) {
		var t = e.previousSibling || e.nextSibling, n = e.parentNode.nodeName === "PRE" && !t;
		return e.nodeName === "CODE" && !n;
	},
	replacement: function(e) {
		if (!e) return "";
		e = e.replace(/\r?\n|\r/g, " ");
		for (var t = /^`|^ .*?[^ ].* $|`$/.test(e) ? " " : "", n = "`", r = e.match(/`+/gm) || []; r.indexOf(n) !== -1;) n += "`";
		return n + t + e + t + n;
	}
}, qm.image = {
	filter: "img",
	replacement: function(e, t) {
		var n = Km(Jm(t.getAttribute("alt"))), r = Ym(t.getAttribute("src") || ""), i = Jm(t.getAttribute("title")), a = i ? " \"" + Xm(i) + "\"" : "";
		return r ? "![" + n + "](" + r + a + ")" : "";
	}
};
function Jm(e) {
	return e ? e.replace(/(\n+\s*)+/g, "\n") : "";
}
function Ym(e) {
	var t = e.replace(/([<>()])/g, "\\$1");
	return t.indexOf(" ") >= 0 ? "<" + t + ">" : t;
}
function Xm(e) {
	return e.replace(/"/g, "\\\"");
}
function Zm(e) {
	for (var t in this.options = e, this._keep = [], this._remove = [], this.blankRule = { replacement: e.blankReplacement }, this.keepReplacement = e.keepReplacement, this.defaultRule = { replacement: e.defaultReplacement }, this.array = [], e.rules) this.array.push(e.rules[t]);
}
Zm.prototype = {
	add: function(e, t) {
		this.array.unshift(t);
	},
	keep: function(e) {
		this._keep.unshift({
			filter: e,
			replacement: this.keepReplacement
		});
	},
	remove: function(e) {
		this._remove.unshift({
			filter: e,
			replacement: function() {
				return "";
			}
		});
	},
	forNode: function(e) {
		if (e.isBlank) return this.blankRule;
		var t;
		return (t = Qm(this.array, e, this.options)) || (t = Qm(this._keep, e, this.options)) || (t = Qm(this._remove, e, this.options)) ? t : this.defaultRule;
	},
	forEach: function(e) {
		for (var t = 0; t < this.array.length; t++) e(this.array[t], t);
	}
};
function Qm(e, t, n) {
	for (var r = 0; r < e.length; r++) {
		var i = e[r];
		if ($m(i, t, n)) return i;
	}
}
function $m(e, t, n) {
	var r = e.filter;
	if (typeof r == "string") {
		if (r === t.nodeName.toLowerCase()) return !0;
	} else if (Array.isArray(r)) {
		if (r.indexOf(t.nodeName.toLowerCase()) > -1) return !0;
	} else if (typeof r == "function") {
		if (r.call(e, t, n)) return !0;
	} else throw TypeError("`filter` needs to be a string, array, or function");
}
function eh(e) {
	var t = e.element, n = e.isBlock, r = e.isVoid, i = e.isPre || function(e) {
		return e.nodeName === "PRE";
	};
	if (!(!t.firstChild || i(t))) {
		for (var a = null, o = !1, s = null, c = nh(s, t, i); c !== t;) {
			if (c.nodeType === 3 || c.nodeType === 4) {
				var l = c.data.replace(/[ \r\n\t]+/g, " ");
				if ((!a || / $/.test(a.data)) && !o && l[0] === " " && (l = l.substr(1)), !l) {
					c = th(c);
					continue;
				}
				c.data = l, a = c;
			} else if (c.nodeType === 1) n(c) || c.nodeName === "BR" ? (a && (a.data = a.data.replace(/ $/, "")), a = null, o = !1) : r(c) || i(c) ? (a = null, o = !0) : a && (o = !1);
			else {
				c = th(c);
				continue;
			}
			var u = nh(s, c, i);
			s = c, c = u;
		}
		a && (a.data = a.data.replace(/ $/, ""), a.data || th(a));
	}
}
function th(e) {
	var t = e.nextSibling || e.parentNode;
	return e.parentNode.removeChild(e), t;
}
function nh(e, t, n) {
	return e && e.parentNode === t || n(t) ? t.nextSibling || t.parentNode : t.firstChild || t.nextSibling || t.parentNode;
}
var rh = typeof window < "u" ? window : {};
function ih() {
	var e = rh.DOMParser, t = !1;
	try {
		new e().parseFromString("", "text/html") && (t = !0);
	} catch {}
	return t;
}
function ah() {
	var e = function() {};
	return oh() ? e.prototype.parseFromString = function(e) {
		var t = new window.ActiveXObject("htmlfile");
		return t.designMode = "on", t.open(), t.write(e), t.close(), t;
	} : e.prototype.parseFromString = function(e) {
		var t = document.implementation.createHTMLDocument("");
		return t.open(), t.write(e), t.close(), t;
	}, e;
}
function oh() {
	var e = !1;
	try {
		document.implementation.createHTMLDocument("").open();
	} catch {
		rh.ActiveXObject && (e = !0);
	}
	return e;
}
var sh = ih() ? rh.DOMParser : ah();
function ch(e, t) {
	var n = typeof e == "string" ? uh().parseFromString("<x-turndown id=\"turndown-root\">" + e + "</x-turndown>", "text/html").getElementById("turndown-root") : e.cloneNode(!0);
	return eh({
		element: n,
		isBlock: Im,
		isVoid: Rm,
		isPre: t.preformattedCode ? dh : null
	}), n;
}
var lh;
function uh() {
	return lh ||= new sh(), lh;
}
function dh(e) {
	return e.nodeName === "PRE" || e.nodeName === "CODE";
}
function fh(e, t) {
	return e.isBlock = Im(e), e.isCode = e.nodeName === "CODE" || e.parentNode.isCode, e.isBlank = ph(e), e.flankingWhitespace = mh(e, t), e;
}
function ph(e) {
	return !Rm(e) && !Vm(e) && /^\s*$/i.test(e.textContent) && !zm(e) && !Hm(e);
}
function mh(e, t) {
	if (e.isBlock || t.preformattedCode && e.isCode) return {
		leading: "",
		trailing: ""
	};
	var n = hh(e.textContent);
	return n.leadingAscii && gh("left", e, t) && (n.leading = n.leadingNonAscii), n.trailingAscii && gh("right", e, t) && (n.trailing = n.trailingNonAscii), {
		leading: n.leading,
		trailing: n.trailing
	};
}
function hh(e) {
	var t = e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);
	return {
		leading: t[1],
		leadingAscii: t[2],
		leadingNonAscii: t[3],
		trailing: t[4],
		trailingNonAscii: t[5],
		trailingAscii: t[6]
	};
}
function gh(e, t, n) {
	var r, i, a;
	return e === "left" ? (r = t.previousSibling, i = / $/) : (r = t.nextSibling, i = /^ /), r && (r.nodeType === 3 ? a = i.test(r.nodeValue) : n.preformattedCode && r.nodeName === "CODE" ? a = !1 : r.nodeType === 1 && !Im(r) && (a = i.test(r.textContent))), a;
}
var _h = Array.prototype.reduce;
function vh(e) {
	if (!(this instanceof vh)) return new vh(e);
	var t = {
		rules: qm,
		headingStyle: "setext",
		hr: "* * *",
		bulletListMarker: "*",
		codeBlockStyle: "indented",
		fence: "```",
		emDelimiter: "_",
		strongDelimiter: "**",
		linkStyle: "inlined",
		linkReferenceStyle: "full",
		br: "  ",
		preformattedCode: !1,
		blankReplacement: function(e, t) {
			return t.isBlock ? "\n\n" : "";
		},
		keepReplacement: function(e, t) {
			return t.isBlock ? "\n\n" + t.outerHTML + "\n\n" : t.outerHTML;
		},
		defaultReplacement: function(e, t) {
			return t.isBlock ? "\n\n" + e + "\n\n" : e;
		}
	};
	this.options = Am({}, t, e), this.rules = new Zm(this.options);
}
vh.prototype = {
	turndown: function(e) {
		if (!Ch(e)) throw TypeError(e + " is not a string, or an element/document/fragment node.");
		if (e === "") return "";
		var t = yh.call(this, new ch(e, this.options));
		return bh.call(this, t);
	},
	use: function(e) {
		if (Array.isArray(e)) for (var t = 0; t < e.length; t++) this.use(e[t]);
		else if (typeof e == "function") e(this);
		else throw TypeError("plugin must be a Function or an Array of Functions");
		return this;
	},
	addRule: function(e, t) {
		return this.rules.add(e, t), this;
	},
	keep: function(e) {
		return this.rules.keep(e), this;
	},
	remove: function(e) {
		return this.rules.remove(e), this;
	},
	escape: function(e) {
		return Km(e);
	}
};
function yh(e) {
	var t = this;
	return _h.call(e.childNodes, function(e, n) {
		n = new fh(n, t.options);
		var r = "";
		return n.nodeType === 3 ? r = n.isCode ? n.nodeValue : t.escape(n.nodeValue) : n.nodeType === 1 && (r = xh.call(t, n)), Sh(e, r);
	}, "");
}
function bh(e) {
	var t = this;
	return this.rules.forEach(function(n) {
		typeof n.append == "function" && (e = Sh(e, n.append(t.options)));
	}), e.replace(/^[\t\r\n]+/, "").replace(/[\t\r\n\s]+$/, "");
}
function xh(e) {
	var t = this.rules.forNode(e), n = yh.call(this, e), r = e.flankingWhitespace;
	return (r.leading || r.trailing) && (n = n.trim()), r.leading + t.replacement(n, e, this.options) + r.trailing;
}
function Sh(e, t) {
	var n = Nm(e), r = Mm(t), i = Math.max(e.length - n.length, t.length - r.length);
	return n + "\n\n".substring(0, i) + r;
}
function Ch(e) {
	return e != null && (typeof e == "string" || e.nodeType && (e.nodeType === 1 || e.nodeType === 9 || e.nodeType === 11));
}
//#endregion
//#region package.json
var wh = "2.2.30", Th = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), Eh = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Dh = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), Oh = (e) => {
	let t = Dh(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, kh = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, Ah = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, jh = (0, N.createContext)({}), Mh = () => (0, N.useContext)(jh), Nh = (0, N.forwardRef)(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: r, className: i = "", children: a, iconNode: o, ...s }, c) => {
	let { size: l = 24, strokeWidth: u = 2, absoluteStrokeWidth: d = !1, color: f = "currentColor", className: p = "" } = Mh() ?? {}, m = r ?? d ? Number(n ?? u) * 24 / Number(t ?? l) : n ?? u;
	return (0, N.createElement)("svg", {
		ref: c,
		...kh,
		width: t ?? l ?? kh.width,
		height: t ?? l ?? kh.height,
		stroke: e ?? f,
		strokeWidth: m,
		className: Th("lucide", p, i),
		...!a && !Ah(s) && { "aria-hidden": "true" },
		...s
	}, [...o.map(([e, t]) => (0, N.createElement)(e, t)), ...Array.isArray(a) ? a : [a]]);
}), Q = (e, t) => {
	let n = (0, N.forwardRef)(({ className: n, ...r }, i) => (0, N.createElement)(Nh, {
		ref: i,
		iconNode: t,
		className: Th(`lucide-${Eh(Oh(e))}`, `lucide-${e}`, n),
		...r
	}));
	return n.displayName = Oh(e), n;
}, Ph = Q("activity", [["path", {
	d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
	key: "169zse"
}]]), Fh = Q("bold", [["path", {
	d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",
	key: "mg9rjx"
}]]), Ih = Q("calendar", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}]
]), Lh = Q("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]), Rh = Q("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), zh = Q("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), Bh = Q("circle-alert", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12",
		key: "1pkeuh"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16",
		key: "4dfq90"
	}]
]), Vh = Q("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), Hh = Q("circle-dot", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "1",
	key: "41hilf"
}]]), Uh = Q("circle-question-mark", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",
		key: "1u773s"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]), Wh = Q("code-xml", [
	["path", {
		d: "m18 16 4-4-4-4",
		key: "1inbqp"
	}],
	["path", {
		d: "m6 8-4 4 4 4",
		key: "15zrgr"
	}],
	["path", {
		d: "m14.5 4-5 16",
		key: "e7oirm"
	}]
]), Gh = Q("copy", [["rect", {
	width: "14",
	height: "14",
	x: "8",
	y: "8",
	rx: "2",
	ry: "2",
	key: "17jyea"
}], ["path", {
	d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
	key: "zix9uf"
}]]), Kh = Q("external-link", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "M10 14 21 3",
		key: "gplh6r"
	}],
	["path", {
		d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
		key: "a6xqqp"
	}]
]), qh = Q("eye-off", [
	["path", {
		d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
		key: "ct8e1f"
	}],
	["path", {
		d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
		key: "151rxh"
	}],
	["path", {
		d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
		key: "13bj9a"
	}],
	["path", {
		d: "m2 2 20 20",
		key: "1ooewy"
	}]
]), Jh = Q("eye", [["path", {
	d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
	key: "1nclc0"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), Yh = Q("file-code-corner", [
	["path", {
		d: "M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35",
		key: "1wthlu"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "m5 16-3 3 3 3",
		key: "331omg"
	}],
	["path", {
		d: "m9 22 3-3-3-3",
		key: "lsp7cz"
	}]
]), Xh = Q("folder-git-2", [
	["path", {
		d: "M18 19a5 5 0 0 1-5-5v8",
		key: "sz5oeg"
	}],
	["path", {
		d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5",
		key: "1w6njk"
	}],
	["circle", {
		cx: "13",
		cy: "12",
		r: "2",
		key: "1j92g6"
	}],
	["circle", {
		cx: "20",
		cy: "19",
		r: "2",
		key: "1obnsp"
	}]
]), Zh = Q("git-branch", [
	["path", {
		d: "M15 6a9 9 0 0 0-9 9V3",
		key: "1cii5b"
	}],
	["circle", {
		cx: "18",
		cy: "6",
		r: "3",
		key: "1h7g24"
	}],
	["circle", {
		cx: "6",
		cy: "18",
		r: "3",
		key: "fqmcym"
	}]
]), Qh = Q("heading-2", [
	["path", {
		d: "M4 12h8",
		key: "17cfdx"
	}],
	["path", {
		d: "M4 18V6",
		key: "1rz3zl"
	}],
	["path", {
		d: "M12 18V6",
		key: "zqpxq5"
	}],
	["path", {
		d: "M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1",
		key: "9jr5yi"
	}]
]), $h = Q("italic", [
	["line", {
		x1: "19",
		x2: "10",
		y1: "4",
		y2: "4",
		key: "15jd3p"
	}],
	["line", {
		x1: "14",
		x2: "5",
		y1: "20",
		y2: "20",
		key: "bu0au3"
	}],
	["line", {
		x1: "15",
		x2: "9",
		y1: "4",
		y2: "20",
		key: "uljnxc"
	}]
]), eg = Q("link-2", [
	["path", {
		d: "M9 17H7A5 5 0 0 1 7 7h2",
		key: "8i5ue5"
	}],
	["path", {
		d: "M15 7h2a5 5 0 1 1 0 10h-2",
		key: "1b9ql8"
	}],
	["line", {
		x1: "8",
		x2: "16",
		y1: "12",
		y2: "12",
		key: "1jonct"
	}]
]), tg = Q("list-filter", [
	["path", {
		d: "M2 5h20",
		key: "1fs1ex"
	}],
	["path", {
		d: "M6 12h12",
		key: "8npq4p"
	}],
	["path", {
		d: "M9 19h6",
		key: "456am0"
	}]
]), ng = Q("list", [
	["path", {
		d: "M3 5h.01",
		key: "18ugdj"
	}],
	["path", {
		d: "M3 12h.01",
		key: "nlz23k"
	}],
	["path", {
		d: "M3 19h.01",
		key: "noohij"
	}],
	["path", {
		d: "M8 5h13",
		key: "1pao27"
	}],
	["path", {
		d: "M8 12h13",
		key: "1za7za"
	}],
	["path", {
		d: "M8 19h13",
		key: "m83p4d"
	}]
]), rg = Q("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), ig = Q("maximize-2", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "m21 3-7 7",
		key: "1l2asr"
	}],
	["path", {
		d: "m3 21 7-7",
		key: "tjx5ai"
	}],
	["path", {
		d: "M9 21H3v-6",
		key: "wtvkvv"
	}]
]), ag = Q("minimize-2", [
	["path", {
		d: "m14 10 7-7",
		key: "oa77jy"
	}],
	["path", {
		d: "M20 10h-6V4",
		key: "mjg0md"
	}],
	["path", {
		d: "m3 21 7-7",
		key: "tjx5ai"
	}],
	["path", {
		d: "M4 14h6v6",
		key: "rmj7iw"
	}]
]), og = Q("play", [["path", {
	d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	key: "10ikf1"
}]]), sg = Q("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]), cg = Q("save", [
	["path", {
		d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
		key: "1c8476"
	}],
	["path", {
		d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
		key: "1ydtos"
	}],
	["path", {
		d: "M7 3v4a1 1 0 0 0 1 1h7",
		key: "t51u73"
	}]
]), lg = Q("scan-search", [
	["path", {
		d: "M3 7V5a2 2 0 0 1 2-2h2",
		key: "aa7l1z"
	}],
	["path", {
		d: "M17 3h2a2 2 0 0 1 2 2v2",
		key: "4qcy5o"
	}],
	["path", {
		d: "M21 17v2a2 2 0 0 1-2 2h-2",
		key: "6vwrx8"
	}],
	["path", {
		d: "M7 21H5a2 2 0 0 1-2-2v-2",
		key: "ioqczr"
	}],
	["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}],
	["path", {
		d: "m16 16-1.9-1.9",
		key: "1dq9hf"
	}]
]), ug = Q("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]), dg = Q("settings-2", [
	["path", {
		d: "M14 17H5",
		key: "gfn3mx"
	}],
	["path", {
		d: "M19 7h-9",
		key: "6i9tg"
	}],
	["circle", {
		cx: "17",
		cy: "17",
		r: "3",
		key: "18b49y"
	}],
	["circle", {
		cx: "7",
		cy: "7",
		r: "3",
		key: "dfmy0x"
	}]
]), fg = Q("shield-check", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), pg = Q("sparkles", [
	["path", {
		d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
		key: "1s2grr"
	}],
	["path", {
		d: "M20 2v4",
		key: "1rf3ol"
	}],
	["path", {
		d: "M22 4h-4",
		key: "gwowj6"
	}],
	["circle", {
		cx: "4",
		cy: "20",
		r: "2",
		key: "6kqj1y"
	}]
]), mg = Q("terminal", [["path", {
	d: "M12 19h8",
	key: "baeox8"
}], ["path", {
	d: "m4 17 6-6-6-6",
	key: "1yngyt"
}]]), hg = Q("trash-2", [
	["path", {
		d: "M10 11v6",
		key: "nco0om"
	}],
	["path", {
		d: "M14 11v6",
		key: "outv1u"
	}],
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]), gg = Q("truck", [
	["path", {
		d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",
		key: "wrbu53"
	}],
	["path", {
		d: "M15 18H9",
		key: "1lyqi6"
	}],
	["path", {
		d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
		key: "lysw3i"
	}],
	["circle", {
		cx: "17",
		cy: "18",
		r: "2",
		key: "332jqn"
	}],
	["circle", {
		cx: "7",
		cy: "18",
		r: "2",
		key: "19iecd"
	}]
]), _g = Q("user", [["path", {
	d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
	key: "975kel"
}], ["circle", {
	cx: "12",
	cy: "7",
	r: "4",
	key: "17ys0d"
}]]), vg = Q("workflow", [
	["rect", {
		width: "8",
		height: "8",
		x: "3",
		y: "3",
		rx: "2",
		key: "by2w9f"
	}],
	["path", {
		d: "M7 11v4a2 2 0 0 0 2 2h4",
		key: "xkn7yn"
	}],
	["rect", {
		width: "8",
		height: "8",
		x: "13",
		y: "13",
		rx: "2",
		key: "1cgmvn"
	}]
]), yg = Q("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), bg = Q("zoom-in", [
	["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}],
	["line", {
		x1: "21",
		x2: "16.65",
		y1: "21",
		y2: "16.65",
		key: "13gj7c"
	}],
	["line", {
		x1: "11",
		x2: "11",
		y1: "8",
		y2: "14",
		key: "1vmskp"
	}],
	["line", {
		x1: "8",
		x2: "14",
		y1: "11",
		y2: "11",
		key: "durymu"
	}]
]), xg = Q("zoom-out", [
	["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}],
	["line", {
		x1: "21",
		x2: "16.65",
		y1: "21",
		y2: "16.65",
		key: "13gj7c"
	}],
	["line", {
		x1: "8",
		x2: "14",
		y1: "11",
		y2: "11",
		key: "durymu"
	}]
]);
Qi.initialize({
	startOnLoad: !1,
	securityLevel: "strict",
	theme: "neutral"
}), F.setOptions({
	gfm: !0,
	breaks: !1
});
var Sg = /* @__PURE__ */ new Map(), Cg = /* @__PURE__ */ new Map(), wg = 0, Tg = .5, Eg = 3, Dg = .25, Og = [
	{
		id: "scan",
		label: "AUTO SCAN",
		icon: lg
	},
	{
		id: "delivery",
		label: "AUTO DELIVERY",
		icon: gg
	},
	{
		id: "patch",
		label: "AUTO PATCH",
		icon: Wh
	},
	{
		id: "observatory",
		label: "OBSERVATORY",
		icon: Jh
	},
	{
		id: "repositories",
		label: "REPOSITORY",
		icon: Xh
	},
	{
		id: "prompts",
		label: "WORKFLOW",
		icon: vg
	},
	{
		id: "settings",
		label: "SETTINGS",
		icon: dg
	}
], kg = {
	scan: {
		title: "AUTO SCAN",
		description: "Review history and manage tracked findings."
	},
	delivery: {
		title: "AUTO DELIVERY",
		description: "Story execution, verification, and pull request delivery."
	},
	patch: {
		title: "AUTO PATCH",
		description: "Jira Task and Bug capture, focused fixes, and safe handoff."
	},
	observatory: {
		title: "OBSERVATORY",
		description: "Browse and edit story briefs and technical plans."
	},
	repositories: {
		title: "REPOSITORY",
		description: "Local repositories, scan profiles, and delivery verification commands."
	},
	prompts: {
		title: "WORKFLOW",
		description: "The prompts, scripts, control points, and recovery paths behind each local automation."
	},
	settings: {
		title: "SETTINGS",
		description: "Workspace configuration, scheduling, and local integrations."
	}
}, Ag = [
	{
		label: "Auto",
		value: "auto"
	},
	{
		label: "Composer 2.5",
		value: "composer-2.5"
	},
	{
		label: "Cursor Grok 4.5 Medium",
		value: "cursor-grok-4.5-medium"
	},
	{
		label: "Sonnet 4.5",
		value: "sonnet-4.5"
	},
	{
		label: "GPT-5.1 Codex",
		value: "gpt-5.1-codex"
	}
], jg = "__custom__";
function $(e, t = "—") {
	return e == null || e === "" ? t : String(e);
}
function Mg(e, t = "cursor-grok-4.5-medium") {
	return String(e ?? "").trim() || t;
}
function Ng(e) {
	return String(e ?? "").trim();
}
function Pg(e) {
	if (!e) return "—";
	let t = new Date(String(e));
	return Number.isNaN(t.valueOf()) ? String(e) : new Intl.DateTimeFormat(void 0, {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}).format(t);
}
function Fg(e, t) {
	if (!e || !t) return "—";
	let n = Math.round((new Date(t).valueOf() - new Date(e).valueOf()) / 1e3);
	return !Number.isFinite(n) || n < 0 ? "—" : `${Math.floor(n / 60)}m ${String(n % 60).padStart(2, "0")}s`;
}
function Ig(e) {
	let t = String(e || "unknown").toLowerCase().replaceAll("_", " ");
	return t === "open" || /(failed|blocked)/.test(t) ? "danger" : /(completed|succeeded|clean|passed|resolved|synced|configured|included|available|approved|ready|done|pr open)/.test(t) ? "success" : /(progress|running|active|partial|draft|not started)/.test(t) ? "info" : "neutral";
}
function Lg(e) {
	let t = $(e, "unknown").toLowerCase().replaceAll("_", " ");
	return {
		"completed with findings": "Completed",
		completed: "Completed",
		clean: "Completed",
		passed: "Passed",
		failed: "Failed",
		skipped: "Skipped",
		open: "Open",
		"in progress": "In progress",
		running: "Running",
		configured: "Active",
		"not configured": "Not set",
		resolved: "Resolved",
		synced: "Synced",
		ignored: "Ignored",
		blocked: "Blocked",
		pending: "Pending",
		active: "Active",
		"pr open": "PR open",
		"not started": "Not started",
		"dev done": "Dev done",
		approved: "Approved",
		ready: "Ready",
		draft: "Draft",
		done: "Done",
		clarifying: "Clarifying",
		changed: "Changed"
	}[t] || t.replace(/\b\w/g, (e) => e.toUpperCase());
}
async function Rg(e, t, n = {}) {
	let r = new URL(e, window.location.origin);
	(!n.method || n.method === "GET") && r.searchParams.set("project", t);
	let i = new Headers(n.headers), a = n.body;
	n.json && (i.set("Content-Type", "application/json"), a = JSON.stringify({
		...n.json,
		project: t
	}));
	let o = await fetch(r, {
		...n,
		headers: i,
		body: a
	}), s = await o.json();
	if (!o.ok) throw Error(s.error || "Request failed");
	return s;
}
function zg({ value: e }) {
	return /* @__PURE__ */ (0, X.jsx)("span", {
		className: `badge ${Ig(e)}`,
		children: Lg(e)
	});
}
function Bg({ business: e, technical: t, compact: n = !1 }) {
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: `observatory-meta${n ? " compact" : ""}`,
		children: [/* @__PURE__ */ (0, X.jsxs)("span", {
			className: "observatory-meta-item",
			children: [/* @__PURE__ */ (0, X.jsx)("em", { children: "Business" }), /* @__PURE__ */ (0, X.jsx)(zg, { value: e || "draft" })]
		}), /* @__PURE__ */ (0, X.jsxs)("span", {
			className: "observatory-meta-item",
			children: [/* @__PURE__ */ (0, X.jsx)("em", { children: "Technical" }), /* @__PURE__ */ (0, X.jsx)(zg, { value: t || "draft" })]
		})]
	});
}
function Vg(e) {
	let t = String(e || "").trim().slice(0, 10);
	return /^\d{4}-\d{2}-\d{2}$/.test(t) ? t : "";
}
function Hg({ date: e, assignee: t }) {
	let n = Vg(e), r = String(t || "").trim();
	return !n && !r ? null : /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "observatory-story-meta",
		children: [n ? /* @__PURE__ */ (0, X.jsxs)("span", {
			className: "observatory-story-meta-item",
			children: [/* @__PURE__ */ (0, X.jsx)(Ih, {
				size: 11,
				"aria-hidden": "true"
			}), n]
		}) : null, r ? /* @__PURE__ */ (0, X.jsxs)("span", {
			className: "observatory-story-meta-item",
			children: [/* @__PURE__ */ (0, X.jsx)(_g, {
				size: 11,
				"aria-hidden": "true"
			}), r]
		}) : null]
	});
}
function Ug({ business: e, technical: t }) {
	let n = Ig(e || "draft"), r = Ig(t || "draft"), i = (e) => e === "success" ? /* @__PURE__ */ (0, X.jsx)("i", { className: "observatory-status-dot" }) : /* @__PURE__ */ (0, X.jsx)(Hh, { size: 11 });
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "observatory-story-status",
		children: [/* @__PURE__ */ (0, X.jsxs)("span", {
			className: `observatory-story-status-item ${n}`,
			children: [
				i(n),
				"Business ",
				Lg(e || "draft")
			]
		}), /* @__PURE__ */ (0, X.jsxs)("span", {
			className: `observatory-story-status-item ${r}`,
			children: [
				i(r),
				"Technical ",
				Lg(t || "draft")
			]
		})]
	});
}
function Wg({ label: e, onClose: t, children: n }) {
	let [r, i] = (0, N.useState)(1), [a, o] = (0, N.useState)({
		x: 0,
		y: 0
	}), [s, c] = (0, N.useState)(!1), l = (0, N.useRef)(null), u = (e) => Math.min(Eg, Math.max(Tg, Number(e.toFixed(2)))), d = () => {
		i(1), o({
			x: 0,
			y: 0
		});
	};
	(0, N.useEffect)(() => {
		let e = (e) => {
			e.key === "Escape" && t(), (e.key === "+" || e.key === "=") && i((e) => u(e + Dg)), (e.key === "-" || e.key === "_") && i((e) => u(e - Dg)), e.key === "0" && d();
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [t]);
	let f = (e) => {
		e.button === 0 && (l.current = {
			x: e.clientX,
			y: e.clientY
		}, c(!0), e.currentTarget.setPointerCapture(e.pointerId));
	}, p = (e) => {
		let t = l.current;
		if (!t) return;
		let n = e.clientX - t.x, r = e.clientY - t.y;
		l.current = {
			x: e.clientX,
			y: e.clientY
		}, o((e) => ({
			x: e.x + n,
			y: e.y + r
		}));
	}, m = (e) => {
		l.current = null, c(!1), e.currentTarget.hasPointerCapture(e.pointerId) && e.currentTarget.releasePointerCapture(e.pointerId);
	};
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "media-fullscreen",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": e,
		children: [/* @__PURE__ */ (0, X.jsxs)("header", { children: [/* @__PURE__ */ (0, X.jsx)("span", { children: e }), /* @__PURE__ */ (0, X.jsxs)("div", {
			className: "media-fullscreen-actions",
			children: [
				/* @__PURE__ */ (0, X.jsx)("button", {
					type: "button",
					className: "button secondary",
					title: "Zoom out",
					"aria-label": "Zoom out",
					onClick: () => i((e) => u(e - Dg)),
					children: /* @__PURE__ */ (0, X.jsx)(xg, { size: 14 })
				}),
				/* @__PURE__ */ (0, X.jsxs)("button", {
					type: "button",
					className: "button secondary media-fullscreen-zoom-label",
					title: "Reset view",
					"aria-label": "Reset view",
					onClick: d,
					children: [Math.round(r * 100), "%"]
				}),
				/* @__PURE__ */ (0, X.jsx)("button", {
					type: "button",
					className: "button secondary",
					title: "Zoom in",
					"aria-label": "Zoom in",
					onClick: () => i((e) => u(e + Dg)),
					children: /* @__PURE__ */ (0, X.jsx)(bg, { size: 14 })
				}),
				/* @__PURE__ */ (0, X.jsx)("button", {
					type: "button",
					className: "button secondary",
					onClick: t,
					"aria-label": "Close fullscreen",
					children: /* @__PURE__ */ (0, X.jsx)(yg, { size: 14 })
				})
			]
		})] }), /* @__PURE__ */ (0, X.jsx)("div", {
			className: `media-fullscreen-stage${s ? " is-dragging" : ""}`,
			onPointerDown: f,
			onPointerMove: p,
			onPointerUp: m,
			onPointerCancel: m,
			children: /* @__PURE__ */ (0, X.jsx)("div", {
				className: "media-fullscreen-canvas",
				style: { transform: `translate(${a.x}px, ${a.y}px) scale(${r})` },
				children: n
			})
		})]
	});
}
async function Gg(e) {
	let t = Sg.get(e);
	if (t) return t;
	let n = `mmd-${++wg}`, { svg: r } = await Qi.render(n, e);
	return Sg.set(e, r), r;
}
var Kg = (0, N.memo)(function({ chart: e }) {
	let t = (0, N.useRef)(null), [n, r] = (0, N.useState)(!1);
	return (0, N.useEffect)(() => {
		let n = t.current;
		if (!n) return;
		let r = Sg.get(e);
		if (r) {
			n.innerHTML = r;
			return;
		}
		let i = !1;
		return Gg(e).then((e) => {
			!i && t.current && (t.current.innerHTML = e);
		}).catch((e) => {
			!i && t.current && (t.current.innerHTML = `<pre class="mermaid-error">${String(e)}</pre>`);
		}), () => {
			i = !0;
		};
	}, [e]), /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsxs)("div", {
		className: "mermaid-wrap",
		children: [/* @__PURE__ */ (0, X.jsx)("button", {
			type: "button",
			className: "mermaid-fullscreen-btn",
			title: "Show fullscreen",
			"aria-label": "Show fullscreen",
			onClick: () => r(!0),
			children: /* @__PURE__ */ (0, X.jsx)(ig, { size: 14 })
		}), /* @__PURE__ */ (0, X.jsx)("div", {
			className: "mermaid-block",
			ref: t
		})]
	}), n && /* @__PURE__ */ (0, X.jsx)(Wg, {
		label: "Diagram",
		onClose: () => r(!1),
		children: /* @__PURE__ */ (0, X.jsx)("div", {
			className: "mermaid-block mermaid-block-fullscreen",
			dangerouslySetInnerHTML: { __html: Sg.get(e) || t.current?.innerHTML || "" }
		})
	})] });
});
function qg({ src: e, alt: t }) {
	let [n, r] = (0, N.useState)(!1);
	return e ? /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsxs)("span", {
		className: "markdown-image-wrap",
		children: [/* @__PURE__ */ (0, X.jsx)("button", {
			type: "button",
			className: "mermaid-fullscreen-btn",
			title: "Show fullscreen",
			"aria-label": "Show fullscreen",
			onClick: () => r(!0),
			children: /* @__PURE__ */ (0, X.jsx)(ig, { size: 14 })
		}), /* @__PURE__ */ (0, X.jsx)("img", {
			src: e,
			alt: t || ""
		})]
	}), n && /* @__PURE__ */ (0, X.jsx)(Wg, {
		label: t || "Image",
		onClose: () => r(!1),
		children: /* @__PURE__ */ (0, X.jsx)("img", {
			src: e,
			alt: t || ""
		})
	})] }) : null;
}
function Jg({ className: e, children: t }) {
	let n = String(t).replace(/\n$/, ""), [r, i] = (0, N.useState)(!1);
	return /language-mermaid/.test(e || "") ? /* @__PURE__ */ (0, X.jsx)(Kg, { chart: n }) : !n.includes("\n") && !e ? /* @__PURE__ */ (0, X.jsx)("code", {
		className: e,
		children: t
	}) : /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "md-code-block",
		children: [/* @__PURE__ */ (0, X.jsxs)("div", {
			className: "md-code-toolbar",
			children: [/* @__PURE__ */ (0, X.jsx)("span", {
				className: "md-code-lang",
				children: (e || "").replace(/^language-/, "") || "code"
			}), /* @__PURE__ */ (0, X.jsx)("button", {
				type: "button",
				className: "md-code-copy",
				title: "Copy code",
				"aria-label": "Copy code",
				"data-copied": r ? "true" : void 0,
				onClick: () => {
					navigator.clipboard.writeText(n).then(() => {
						i(!0), window.setTimeout(() => i(!1), 1200);
					});
				},
				children: /* @__PURE__ */ (0, X.jsx)(Gh, { size: 14 })
			})]
		}), /* @__PURE__ */ (0, X.jsx)("pre", { children: /* @__PURE__ */ (0, X.jsx)("code", {
			className: e,
			children: n
		}) })]
	});
}
var Yg = {
	a({ href: e, children: t }) {
		return /* @__PURE__ */ (0, X.jsx)("a", {
			href: e,
			target: "_blank",
			rel: "noreferrer noopener",
			children: t
		});
	},
	img({ src: e, alt: t }) {
		return /* @__PURE__ */ (0, X.jsx)(qg, {
			src: e,
			alt: t
		});
	},
	code({ className: e, children: t }) {
		return /* @__PURE__ */ (0, X.jsx)(Jg, {
			className: e,
			children: t
		});
	}
};
function Xg({ content: e }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: "markdown-content",
		children: /* @__PURE__ */ (0, X.jsx)(wd, {
			remarkPlugins: [km],
			components: Yg,
			children: e
		})
	});
}
function Zg(e) {
	let t = e.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	return t ? {
		frontmatter: t[1],
		body: t[2]
	} : {
		frontmatter: "",
		body: e
	};
}
function Qg(e, t) {
	return e ? `---\n${e}\n---\n${t.startsWith("\n") ? t : `\n${t}`}` : t;
}
var $g = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\"/><path d=\"M4 16V4a2 2 0 0 1 2-2h12\"/></svg>";
function e_(e) {
	for (let t of Array.from(e.querySelectorAll("pre"))) {
		if (t.closest(".md-code-block, .mermaid-wrap") || t.classList.contains("mermaid-error")) continue;
		let e = t.querySelector("code"), n = ((e?.className || "").match(/language-([\w-]+)/) || [])[1] || "code", r = document.createElement("div");
		r.className = "md-code-block";
		let i = document.createElement("div");
		i.className = "md-code-toolbar", i.contentEditable = "false";
		let a = document.createElement("span");
		a.className = "md-code-lang", a.textContent = n;
		let o = document.createElement("button");
		o.type = "button", o.className = "md-code-copy", o.title = "Copy code", o.setAttribute("aria-label", "Copy code"), o.innerHTML = $g, o.onclick = (n) => {
			n.preventDefault(), n.stopPropagation();
			let r = e?.textContent || t.textContent || "";
			navigator.clipboard.writeText(r).then(() => {
				o.dataset.copied = "true", window.setTimeout(() => {
					delete o.dataset.copied;
				}, 1200);
			});
		}, i.append(a, o), t.replaceWith(r), r.append(i, t);
	}
}
function t_(e) {
	let t = e.replace(/```mermaid\r?\n([\s\S]*?)```/g, (e, t) => {
		let n = `mm-${++wg}`;
		return Cg.set(n, t.trim()), `\n\n<div class="mermaid-wrap" contenteditable="false" data-mm-id="${n}"><button type="button" class="mermaid-fullscreen-btn" data-mm-fullscreen title="Show fullscreen" aria-label="Show fullscreen"></button><div class="mermaid-block" data-mm-host></div></div>\n\n`;
	});
	return String(F.parse(t, { async: !1 }));
}
function n_() {
	let e = new vh({
		headingStyle: "atx",
		codeBlockStyle: "fenced",
		bulletListMarker: "-"
	});
	return e.addRule("fullscreenBtn", {
		filter: (e) => e instanceof HTMLElement && e.classList.contains("mermaid-fullscreen-btn"),
		replacement: () => ""
	}), e.addRule("codeToolbar", {
		filter: (e) => e instanceof HTMLElement && e.classList.contains("md-code-toolbar"),
		replacement: () => ""
	}), e.addRule("codeBlockShell", {
		filter: (e) => e instanceof HTMLElement && e.classList.contains("md-code-block"),
		replacement: (e, t) => {
			let n = t.querySelector("code"), r = t.querySelector("pre");
			return `\n\n\`\`\`${((n?.className || "").match(/language-([\w-]+)/) || [])[1] || ""}\n${(n?.textContent || r?.textContent || "").replace(/\n$/, "")}\n\`\`\`\n\n`;
		}
	}), e.addRule("mermaidIsland", {
		filter: (e) => e instanceof HTMLElement && e.classList.contains("mermaid-wrap") && !!e.getAttribute("data-mm-id"),
		replacement: (e, t) => {
			let n = t.getAttribute("data-mm-id") || "";
			return `\n\n\`\`\`mermaid\n${Cg.get(n) || ""}\n\`\`\`\n\n`;
		}
	}), e.addRule("imageWrap", {
		filter: (e) => e instanceof HTMLElement && e.classList.contains("markdown-image-wrap"),
		replacement: (e, t) => {
			let n = t.querySelector("img");
			return n ? `![${n.getAttribute("alt") || ""}](${n.getAttribute("src") || ""})` : "";
		}
	}), e;
}
async function r_(e) {
	let t = Array.from(e.querySelectorAll("[data-mm-host]"));
	await Promise.all(t.map(async (e) => {
		let t = e.closest(".mermaid-wrap")?.getAttribute("data-mm-id") || "", n = Cg.get(t);
		if (n) try {
			e.innerHTML = await Gg(n);
		} catch (t) {
			e.innerHTML = `<pre class="mermaid-error">${String(t)}</pre>`;
		}
	}));
}
function i_(e, t, n) {
	return e && t !== n;
}
function a_(e) {
	let t = window.getSelection();
	if (!e || !t?.anchorNode) return null;
	let n = t.anchorNode, r = (n instanceof Element ? n : n.parentElement)?.closest("a");
	return !(r instanceof HTMLAnchorElement) || !e.contains(r) ? null : r;
}
function o_(e) {
	return !e.shiftKey && !e.metaKey && !e.altKey && (e.button === void 0 || e.button === 0);
}
function s_({ value: e, onChange: t }) {
	let { frontmatter: n, body: r } = Zg(e), i = (0, N.useRef)(null), a = (0, N.useRef)(!1), o = (0, N.useRef)(!1), s = (0, N.useRef)(r), c = (0, N.useRef)(n_()), [l, u] = (0, N.useState)(null), [d, f] = (0, N.useState)(!1);
	s.current = r;
	let p = (e) => t(Qg(n, e)), m = () => {
		let e = i.current;
		if (!e) return;
		let t = c.current.turndown(e);
		i_(o.current, t, s.current) && p(t);
	}, h = (e) => {
		e.querySelectorAll("a[href]").forEach((e) => {
			e.setAttribute("target", "_blank"), e.setAttribute("rel", "noreferrer noopener");
		});
	}, g = (0, N.useCallback)(async (e) => {
		let t = i.current;
		if (!t) return;
		o.current = !1, t.innerHTML = t_(e), e_(t), h(t);
		let n = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M15 3h6v6\"/><path d=\"m21 3-7 7\"/><path d=\"m3 21 7-7\"/><path d=\"M9 21H3v-6\"/></svg>";
		t.querySelectorAll("[data-mm-fullscreen]").forEach((e) => {
			e.innerHTML = n, e.onclick = (t) => {
				t.preventDefault(), t.stopPropagation();
				let n = e.parentElement?.querySelector("[data-mm-host]");
				u({
					kind: "html",
					value: n?.innerHTML || ""
				});
			};
		}), t.querySelectorAll("img").forEach((e) => {
			if (e.closest(".markdown-image-wrap")) return;
			let t = document.createElement("span");
			t.className = "markdown-image-wrap";
			let r = document.createElement("button");
			r.type = "button", r.className = "mermaid-fullscreen-btn", r.title = "Show fullscreen", r.setAttribute("aria-label", "Show fullscreen"), r.innerHTML = n;
			let i = e.getAttribute("src") || "", a = e.getAttribute("alt") || "";
			r.onclick = (e) => {
				e.preventDefault(), e.stopPropagation(), u({
					kind: "img",
					value: i,
					alt: a
				});
			}, e.replaceWith(t), t.append(r, e);
		}), await r_(t);
	}, []);
	(0, N.useEffect)(() => {
		a.current || g(r);
	}, [r, g]), (0, N.useEffect)(() => {
		if (!d) return;
		let e = (e) => {
			e.key === "Escape" && f(!1);
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [d]);
	let _ = (e, t) => {
		i.current?.focus(), document.execCommand(e, !1, t), o.current = !0, m(), i.current && h(i.current);
	};
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: `observatory-doc${d ? " observatory-doc-fullscreen" : ""}`,
		children: [
			/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "observatory-toolbar",
				role: "toolbar",
				"aria-label": "Formatting tools",
				children: [
					/* @__PURE__ */ (0, X.jsx)("button", {
						type: "button",
						title: "Heading",
						onMouseDown: (e) => e.preventDefault(),
						onClick: () => _("formatBlock", "h2"),
						children: /* @__PURE__ */ (0, X.jsx)(Qh, { size: 14 })
					}),
					/* @__PURE__ */ (0, X.jsx)("button", {
						type: "button",
						title: "Bold",
						onMouseDown: (e) => e.preventDefault(),
						onClick: () => _("bold"),
						children: /* @__PURE__ */ (0, X.jsx)(Fh, { size: 14 })
					}),
					/* @__PURE__ */ (0, X.jsx)("button", {
						type: "button",
						title: "Italic",
						onMouseDown: (e) => e.preventDefault(),
						onClick: () => _("italic"),
						children: /* @__PURE__ */ (0, X.jsx)($h, { size: 14 })
					}),
					/* @__PURE__ */ (0, X.jsx)("button", {
						type: "button",
						title: "Link — Shift+click a link to place the caret, then edit",
						onMouseDown: (e) => e.preventDefault(),
						onClick: () => {
							let e = i.current;
							e?.focus();
							let t = a_(e), n = t?.getAttribute("href") || "https://", r = window.prompt(t ? "Edit link URL" : "Link URL", n);
							if (r === null) return;
							let a = r.trim();
							if (t) {
								if (!a) {
									_("unlink");
									return;
								}
								t.setAttribute("href", a), t.setAttribute("target", "_blank"), t.setAttribute("rel", "noreferrer noopener"), o.current = !0, m();
								return;
							}
							a && _("createLink", a);
						},
						children: /* @__PURE__ */ (0, X.jsx)(eg, { size: 14 })
					}),
					/* @__PURE__ */ (0, X.jsx)("button", {
						type: "button",
						title: "List",
						onMouseDown: (e) => e.preventDefault(),
						onClick: () => _("insertUnorderedList"),
						children: /* @__PURE__ */ (0, X.jsx)(ng, { size: 14 })
					}),
					/* @__PURE__ */ (0, X.jsx)("button", {
						type: "button",
						title: "Code",
						onMouseDown: (e) => e.preventDefault(),
						onClick: () => _("formatBlock", "pre"),
						children: /* @__PURE__ */ (0, X.jsx)(Wh, { size: 14 })
					})
				]
			}),
			/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "observatory-doc-preview-wrap",
				children: [/* @__PURE__ */ (0, X.jsx)("button", {
					type: "button",
					className: "observatory-doc-fullscreen-btn",
					title: d ? "Exit fullscreen" : "Fullscreen",
					"aria-label": d ? "Exit fullscreen" : "Fullscreen",
					onMouseDown: (e) => e.preventDefault(),
					onClick: () => f((e) => !e),
					children: d ? /* @__PURE__ */ (0, X.jsx)(ag, { size: 14 }) : /* @__PURE__ */ (0, X.jsx)(ig, { size: 14 })
				}), /* @__PURE__ */ (0, X.jsx)("div", {
					ref: i,
					className: "observatory-doc-preview markdown-content",
					contentEditable: !0,
					suppressContentEditableWarning: !0,
					spellCheck: !1,
					role: "textbox",
					"aria-multiline": "true",
					"aria-label": "Document body",
					onFocus: () => {
						a.current = !0;
					},
					onBlur: () => {
						a.current = !1, m();
					},
					onInput: () => {
						o.current = !0, m();
					},
					onClick: (e) => {
						let t = e.target;
						if (!t || t.closest("button")) return;
						let n = t.closest("a[href]");
						if (!(n instanceof HTMLAnchorElement) || !i.current?.contains(n) || !o_(e)) return;
						e.preventDefault(), e.stopPropagation();
						let r = n.getAttribute("href");
						r && window.open(r, "_blank", "noopener,noreferrer");
					}
				})]
			}),
			l && /* @__PURE__ */ (0, X.jsx)(Wg, {
				label: l.kind === "img" ? l.alt || "Image" : "Diagram",
				onClose: () => u(null),
				children: l.kind === "img" ? /* @__PURE__ */ (0, X.jsx)("img", {
					src: l.value,
					alt: l.alt || ""
				}) : /* @__PURE__ */ (0, X.jsx)("div", {
					className: "mermaid-block mermaid-block-fullscreen",
					dangerouslySetInnerHTML: { __html: l.value }
				})
			})
		]
	});
}
function c_({ label: e, children: t, onClick: n, danger: r = !1, disabled: i = !1, className: a = "" }) {
	return /* @__PURE__ */ (0, X.jsx)("button", {
		className: `icon-button ${r ? "danger" : ""} ${a}`,
		title: e,
		"aria-label": e,
		disabled: i,
		onClick: n,
		children: t
	});
}
function l_({ title: e, action: t, children: n, className: r = "" }) {
	return /* @__PURE__ */ (0, X.jsxs)("section", {
		className: `panel ${r}`,
		children: [/* @__PURE__ */ (0, X.jsxs)("header", {
			className: "panel-header",
			children: [/* @__PURE__ */ (0, X.jsx)("h3", { children: e }), t]
		}), n]
	});
}
function u_() {
	let [e, t] = (0, N.useState)(new URLSearchParams(window.location.search).get("project") || window.DASHBOARD_DATA?.interactive?.project || ""), [n, r] = (0, N.useState)(null), [i, a] = (0, N.useState)(Og.find((e) => `/${e.id}` === window.location.pathname)?.id || "scan"), [o, s] = (0, N.useState)(""), [c, l] = (0, N.useState)(null), [u, d] = (0, N.useState)(!0), [f, p] = (0, N.useState)(() => window.localStorage.getItem("lumen-sidebar-collapsed") === "true"), [m, h] = (0, N.useState)(null), [g, _] = (0, N.useState)(!1), [v, y] = (0, N.useState)(!1), [b, x] = (0, N.useState)(null), S = (0, N.useRef)(0), C = (0, N.useCallback)((e, t = "info") => l({
		message: e,
		tone: t
	}), []), w = async () => {
		let n = ++S.current;
		d(!0);
		try {
			let i = await Rg("/api/state", e);
			if (n !== S.current) return;
			r(i);
			let a = i.interactive?.workspace?.git_sync_conflict;
			x(a && typeof a == "object" && [
				"repo",
				"branch",
				"remote_oid",
				"local_oid"
			].every((e) => String(a[e] || "").trim()) ? a : null), h(/* @__PURE__ */ new Date()), !e && i.interactive?.project && t(i.interactive.project), s("");
		} catch (e) {
			if (n !== S.current) return;
			let t = window.DASHBOARD_DATA;
			t ? (r(t), s("Static report mode: interactive actions are unavailable.")) : s(e instanceof Error ? e.message : "Unable to load Dashboard state");
		} finally {
			n === S.current && d(!1);
		}
	};
	(0, N.useEffect)(() => {
		w();
		let e = window.setInterval(w, 5e3);
		return () => window.clearInterval(e);
	}, [e]), (0, N.useEffect)(() => {
		if (!c) return;
		let e = window.setTimeout(() => l(null), 3200);
		return () => window.clearTimeout(e);
	}, [c]), (0, N.useEffect)(() => {
		window.localStorage.setItem("lumen-sidebar-collapsed", String(f));
	}, [f]), (0, N.useEffect)(() => {
		let e = () => a(Og.find((e) => `/${e.id}` === window.location.pathname)?.id || "scan");
		return window.addEventListener("popstate", e), () => window.removeEventListener("popstate", e);
	}, []);
	let T = () => !(g && !window.confirm("You have unsaved Settings changes. Leave without saving?") || v && !window.confirm("You have unsaved Observatory changes. Leave without saving?")), E = (n) => {
		if (n !== e && !T()) return;
		let r = new URL(window.location.href);
		r.searchParams.set("project", n), window.history.replaceState({}, "", `${window.location.pathname}${r.search}`), t(n), _(!1), y(!1);
	}, ee = (e) => {
		if (e !== i && !T()) return;
		let t = new URL(window.location.href);
		t.pathname = `/${e}`, window.history.pushState({}, "", t), a(e), e !== "settings" && _(!1), e !== "observatory" && y(!1);
	}, D = async (t, n, r) => {
		try {
			return await Rg(t, e, {
				method: "POST",
				json: n
			}), C(r, "success"), w(), !0;
		} catch (e) {
			return C(e instanceof Error ? e.message : "Request failed", "error"), !1;
		}
	}, O = n?.interactive?.projects || [], k = n?.product?.tagline || "Engineering, made legible.", te = kg[i];
	return /* @__PURE__ */ (0, X.jsxs)("main", {
		className: `dashboard-layout ${f ? "sidebar-is-collapsed" : ""}`,
		children: [
			/* @__PURE__ */ (0, X.jsxs)("aside", {
				className: "sidebar",
				"aria-label": "Lumen navigation",
				children: [
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "sidebar-brand",
						children: [/* @__PURE__ */ (0, X.jsx)("img", {
							src: "assets/lumen-mark.png",
							className: "brand-mark",
							alt: "Lumen"
						}), /* @__PURE__ */ (0, X.jsxs)("div", {
							className: "sidebar-brand-copy",
							children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: "Lumen" }), /* @__PURE__ */ (0, X.jsx)("span", { children: k })]
						})]
					}),
					/* @__PURE__ */ (0, X.jsx)("nav", {
						className: "side-nav",
						"aria-label": "Dashboard sections",
						children: Og.map((e) => {
							let t = e.icon;
							return /* @__PURE__ */ (0, X.jsxs)("button", {
								title: e.label,
								className: i === e.id ? "active" : "",
								onClick: () => ee(e.id),
								children: [/* @__PURE__ */ (0, X.jsx)(t, { size: 17 }), /* @__PURE__ */ (0, X.jsx)("span", { children: e.label })]
							}, e.id);
						})
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "sidebar-foot",
						children: [!f && /* @__PURE__ */ (0, X.jsx)("img", {
							src: "assets/inspire-group-logo.png",
							className: "company-mark",
							alt: "INSPIRE GROUP"
						}), /* @__PURE__ */ (0, X.jsx)("small", { children: f ? `V${wh}` : `Version ${wh}` })]
					})
				]
			}),
			/* @__PURE__ */ (0, X.jsx)("button", {
				type: "button",
				className: "icon-button sidebar-toggle",
				title: f ? "Expand navigation" : "Collapse navigation",
				"aria-label": f ? "Expand navigation" : "Collapse navigation",
				onPointerDown: (e) => {
					e.preventDefault(), e.stopPropagation(), p((e) => !e);
				},
				children: f ? /* @__PURE__ */ (0, X.jsx)(zh, { size: 14 }) : /* @__PURE__ */ (0, X.jsx)(Lh, { size: 14 })
			}),
			/* @__PURE__ */ (0, X.jsxs)("section", {
				className: "content-area",
				children: [/* @__PURE__ */ (0, X.jsxs)("header", {
					className: "masthead",
					children: [/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "masthead-context",
						children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: te.title }), /* @__PURE__ */ (0, X.jsx)("span", { children: te.description })]
					}), /* @__PURE__ */ (0, X.jsxs)("div", {
						className: "masthead-actions",
						children: [/* @__PURE__ */ (0, X.jsx)("span", {
							className: "last-updated",
							children: m ? `Updated ${Pg(m.toISOString())}` : "Syncing…"
						}), /* @__PURE__ */ (0, X.jsxs)("label", {
							className: "project-picker",
							children: [
								/* @__PURE__ */ (0, X.jsx)("span", { children: "Project" }),
								/* @__PURE__ */ (0, X.jsx)("select", {
									value: e,
									onChange: (e) => E(e.target.value),
									children: O.map((e) => /* @__PURE__ */ (0, X.jsx)("option", {
										value: e.slug,
										children: e.name
									}, e.slug))
								}),
								/* @__PURE__ */ (0, X.jsx)(Rh, { size: 15 })
							]
						})]
					})]
				}), /* @__PURE__ */ (0, X.jsxs)("div", {
					className: "page-content",
					children: [
						o && /* @__PURE__ */ (0, X.jsxs)("div", {
							className: "status-note",
							children: [/* @__PURE__ */ (0, X.jsx)(Ph, { size: 15 }), o]
						}),
						!n && u ? /* @__PURE__ */ (0, X.jsxs)("div", {
							className: "loading-state",
							children: [/* @__PURE__ */ (0, X.jsx)(rg, {
								size: 22,
								className: "spin"
							}), " Loading local workspace state…"]
						}) : null,
						n && i === "scan" && /* @__PURE__ */ (0, X.jsx)(m_, {
							data: n,
							project: e,
							notify: C,
							reload: w
						}),
						n && i === "delivery" && /* @__PURE__ */ (0, X.jsx)(w_, {
							data: n,
							project: e,
							notify: C,
							reload: w
						}),
						n && i === "patch" && /* @__PURE__ */ (0, X.jsx)(T_, {
							data: n,
							project: e,
							notify: C,
							reload: w
						}),
						n && i === "observatory" && /* @__PURE__ */ (0, X.jsx)(A_, {
							project: e,
							notify: C,
							onDirtyChange: y
						}),
						n && i === "repositories" && /* @__PURE__ */ (0, X.jsx)(Y_, {
							data: n,
							interact: D
						}),
						n && i === "prompts" && /* @__PURE__ */ (0, X.jsx)(H_, {
							data: n,
							project: e,
							interact: D,
							notify: C
						}),
						n && i === "settings" && /* @__PURE__ */ (0, X.jsx)(Z_, {
							data: n,
							project: e,
							notify: C,
							onDirtyChange: _,
							reload: w
						})
					]
				}, i)]
			}),
			b && /* @__PURE__ */ (0, X.jsx)(d_, {
				conflict: b,
				project: e,
				notify: C,
				onClose: () => x(null),
				onResolved: w
			}),
			c && /* @__PURE__ */ (0, X.jsxs)("div", {
				className: `toast toast-${c.tone}`,
				role: "status",
				children: [c.tone === "success" ? /* @__PURE__ */ (0, X.jsx)(Vh, { size: 16 }) : c.tone === "error" ? /* @__PURE__ */ (0, X.jsx)(Bh, { size: 16 }) : /* @__PURE__ */ (0, X.jsx)(Hh, { size: 16 }), /* @__PURE__ */ (0, X.jsx)("span", { children: c.message })]
			})
		]
	});
}
function d_({ conflict: e, project: t, notify: n, onClose: r, onResolved: i }) {
	let [a, o] = (0, N.useState)(!1), [s, c] = (0, N.useState)(""), l = async () => {
		o(!0), c("");
		try {
			await Rg("/api/git-sync/force", t, {
				method: "POST",
				json: {}
			}), n("Remote branch overwritten with the local Lumen commit", "success"), r(), await i();
		} catch (e) {
			let t = e instanceof Error ? e.message : "Unable to overwrite the remote branch";
			c(t);
		} finally {
			o(!1);
		}
	};
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		children: /* @__PURE__ */ (0, X.jsxs)("section", {
			className: "modal git-sync-conflict-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Git sync conflict",
			children: [/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "modal-body compact",
				children: [
					/* @__PURE__ */ (0, X.jsx)("strong", { children: "Remote updates need your decision" }),
					/* @__PURE__ */ (0, X.jsxs)("p", {
						className: "modal-copy",
						children: [
							"Lumen committed local workspace changes, but the remote ",
							e.branch || "branch",
							" changed before the push. Review the remote changes before choosing whether to overwrite them."
						]
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "git-sync-conflict-details",
						children: [
							/* @__PURE__ */ (0, X.jsx)("span", { children: "Repository" }),
							/* @__PURE__ */ (0, X.jsx)("code", { children: e.repo || "Workspace" }),
							/* @__PURE__ */ (0, X.jsx)("span", { children: "Local commit" }),
							/* @__PURE__ */ (0, X.jsx)("code", { children: e.local_oid || "—" })
						]
					}),
					s && /* @__PURE__ */ (0, X.jsx)("p", {
						className: "git-sync-error",
						role: "alert",
						children: s
					})
				]
			}), /* @__PURE__ */ (0, X.jsxs)("footer", { children: [/* @__PURE__ */ (0, X.jsx)("button", {
				className: "button",
				disabled: a,
				onClick: r,
				children: "Later"
			}), /* @__PURE__ */ (0, X.jsx)("button", {
				className: "button danger",
				disabled: a,
				onClick: () => void l(),
				children: a ? "Overwriting…" : "Overwrite remote"
			})] })]
		})
	});
}
function f_(e, t) {
	let n = [], r = /* @__PURE__ */ new Set(), i = (e, t, i) => {
		let a = (e || t).trim();
		if (!a) return;
		let o = [
			a,
			t,
			e
		].map((e) => e.trim().toLowerCase()).filter(Boolean);
		if (o.some((e) => r.has(e))) return;
		for (let e of o) r.add(e);
		let s = (t || e || a).trim(), c = i.trim();
		n.push({
			value: a,
			label: c ? `${s} · ${c}` : s
		});
	};
	for (let t of e) i(String(t.story || ""), String(t.jira_key || ""), String(t.title || ""));
	return t && /failed|blocked|not_started/i.test(String(t.delivery_status || "")) && i(String(t.story_id || ""), String(t.jira_key || ""), String(t.story_title || "")), n;
}
function p_(e) {
	let t = String(e.businessStatus || "").toLowerCase(), n = String(e.technicalStatus || "").toLowerCase(), r = String(e.deliveryStatus || "not_started").toLowerCase();
	return t === "ready" && n === "approved" && [
		"",
		"not_started",
		"blocked"
	].includes(r);
}
function m_({ data: e, project: t, notify: n, reload: r }) {
	let i = e.run_stats || {}, a = e.issues || [], o = e.runs || [], [s, c] = (0, N.useState)(null), [l, u] = (0, N.useState)("all"), [d, f] = (0, N.useState)(0), [p, m] = (0, N.useState)(0), [h, g] = (0, N.useState)(!1), [_, v] = (0, N.useState)(""), y = a.filter((e) => [
		"open",
		"in_progress",
		"pr_open"
	].includes(String(e.status || "").toLowerCase())), b = a.filter((e) => l === "all" || (l === "open" ? [
		"open",
		"in_progress",
		"pr_open"
	].includes(String(e.status || "").toLowerCase()) : String(e.status || "").toLowerCase() === l)), x = {
		all: a.length,
		open: y.length,
		ignored: a.filter((e) => e.status === "ignored").length,
		resolved: a.filter((e) => [
			"resolved",
			"accepted_risk",
			"false_positive"
		].includes(e.status)).length
	}, S = o.slice(d * 10, (d + 1) * 10), C = () => document.getElementById("tracked-findings")?.scrollIntoView({
		behavior: "smooth",
		block: "start"
	}), w = async () => {
		g(!0), v("");
		try {
			await Rg("/api/scan/start", t, {
				method: "POST",
				json: {}
			}), m(0), n(`Scan started for ${t}`, "success"), await r().catch(() => void 0);
		} catch (e) {
			let r = e instanceof Error ? e.message : "Unable to start scan", i = r === "Not found" ? `Dashboard is still running an older version. Run \`lumen dashboard stop --project ${t}\`, then open the dashboard again.` : r;
			v(i), n(i, "error");
		} finally {
			g(!1);
		}
	};
	return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [
		/* @__PURE__ */ (0, X.jsxs)("section", {
			className: "metrics",
			children: [
				/* @__PURE__ */ (0, X.jsx)(__, {
					label: "Open findings",
					value: y.length,
					onClick: C
				}),
				/* @__PURE__ */ (0, X.jsx)(__, {
					label: "Successful Scan · 7d",
					value: i.success_7d || 0
				}),
				/* @__PURE__ */ (0, X.jsx)(__, {
					label: "Failed · 7d",
					value: i.failed_7d || 0
				}),
				/* @__PURE__ */ (0, X.jsx)(__, {
					label: "Lookback window",
					value: `${e.scan_window_days || 7}d`
				})
			]
		}),
		/* @__PURE__ */ (0, X.jsxs)(l_, {
			title: "Scan History",
			action: /* @__PURE__ */ (0, X.jsxs)("span", {
				className: "panel-actions",
				children: [/* @__PURE__ */ (0, X.jsxs)("button", {
					type: "button",
					className: "button secondary",
					disabled: h,
					onClick: () => {
						v(""), m(1);
					},
					children: [/* @__PURE__ */ (0, X.jsx)(og, { size: 14 }), "Start scan"]
				}), /* @__PURE__ */ (0, X.jsxs)("span", {
					className: "muted",
					children: [o.length, " runs"]
				})]
			}),
			children: [/* @__PURE__ */ (0, X.jsx)("div", {
				className: "table-scroll",
				children: /* @__PURE__ */ (0, X.jsxs)("table", { children: [/* @__PURE__ */ (0, X.jsx)("thead", { children: /* @__PURE__ */ (0, X.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, X.jsx)("th", { children: "Started" }),
					/* @__PURE__ */ (0, X.jsx)("th", { children: "Status" }),
					/* @__PURE__ */ (0, X.jsx)("th", { children: "Issues" }),
					/* @__PURE__ */ (0, X.jsx)("th", { children: "Duration" }),
					/* @__PURE__ */ (0, X.jsx)("th", { children: "Artifacts" })
				] }) }), /* @__PURE__ */ (0, X.jsx)("tbody", { children: S.map((e) => /* @__PURE__ */ (0, X.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, X.jsx)("td", { children: Pg(e.started_at || e.finished_at) }),
					/* @__PURE__ */ (0, X.jsx)("td", { children: /* @__PURE__ */ (0, X.jsx)(zg, { value: e.status }) }),
					/* @__PURE__ */ (0, X.jsx)("td", { children: /* @__PURE__ */ (0, X.jsx)(y_, { run: e }) }),
					/* @__PURE__ */ (0, X.jsx)("td", { children: $(e.duration) }),
					/* @__PURE__ */ (0, X.jsx)("td", { children: /* @__PURE__ */ (0, X.jsxs)("div", {
						className: "artifact-links",
						children: [
							e.html && /* @__PURE__ */ (0, X.jsx)("a", {
								href: `${e.html}?project=${encodeURIComponent(t)}`,
								target: "_blank",
								children: "HTML"
							}),
							e.pdf && /* @__PURE__ */ (0, X.jsx)("a", {
								href: `${e.pdf}?project=${encodeURIComponent(t)}`,
								target: "_blank",
								children: "PDF"
							}),
							!e.html && !e.pdf && "—"
						]
					}) })
				] }, e.id)) })] })
			}), o.length > 10 && /* @__PURE__ */ (0, X.jsx)(b_, {
				page: d,
				pageCount: Math.ceil(o.length / 10),
				onChange: f
			})]
		}),
		/* @__PURE__ */ (0, X.jsxs)(l_, {
			title: "Tracked Findings",
			action: /* @__PURE__ */ (0, X.jsxs)("span", {
				className: "muted",
				children: [
					b.length,
					" of ",
					a.length,
					" records"
				]
			}),
			children: [/* @__PURE__ */ (0, X.jsx)("div", {
				className: "finding-filters",
				role: "tablist",
				children: [
					"all",
					"open",
					"resolved",
					"ignored"
				].map((e) => /* @__PURE__ */ (0, X.jsxs)("button", {
					className: l === e ? "active" : "",
					onClick: () => u(e),
					children: [
						e === "all" ? "All" : Lg(e),
						" ",
						/* @__PURE__ */ (0, X.jsx)("span", { children: x[e] })
					]
				}, e))
			}), /* @__PURE__ */ (0, X.jsx)("div", {
				id: "tracked-findings",
				className: "findings",
				children: b.length ? b.map((e) => /* @__PURE__ */ (0, X.jsx)(x_, {
					issue: e,
					onIgnore: () => c(e)
				}, e.id)) : /* @__PURE__ */ (0, X.jsx)(v_, { label: "No findings match this status." })
			})]
		}),
		s && /* @__PURE__ */ (0, X.jsx)(C_, {
			onClose: () => c(null),
			onConfirm: (e) => {
				h_(t, n, r, s.id, e), c(null);
			}
		}),
		p > 0 && /* @__PURE__ */ (0, X.jsx)(g_, {
			project: t,
			step: p === 1 ? 1 : 2,
			busy: h,
			error: _,
			onClose: () => {
				h || m(0);
			},
			onContinue: () => m(2),
			onConfirm: () => void w()
		})
	] });
}
async function h_(e, t, n, r, i) {
	try {
		await Rg("/api/issue/ignore", e, {
			method: "POST",
			json: {
				issue_id: r,
				reason: i
			}
		}), t("Finding ignored", "success"), await n();
	} catch (e) {
		t(e instanceof Error ? e.message : "Request failed", "error");
	}
}
function g_({ project: e, step: t, busy: n, error: r, onClose: i, onContinue: a, onConfirm: o }) {
	let s = t === 1;
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: n ? void 0 : i,
		children: /* @__PURE__ */ (0, X.jsxs)("section", {
			className: "modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": s ? "Start scan" : "Confirm start scan",
			onMouseDown: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "modal-body compact",
				children: [
					/* @__PURE__ */ (0, X.jsx)("strong", { children: s ? "Start a scan?" : "Confirm scan start" }),
					/* @__PURE__ */ (0, X.jsx)("p", {
						className: "modal-copy",
						children: s ? `This will launch an auto-scan for ${e}.` : `Are you sure you want to start a scan for ${e} now? A scan agent will run against the configured repositories.`
					}),
					r && /* @__PURE__ */ (0, X.jsx)("p", {
						className: "status-note",
						children: r
					})
				]
			}), /* @__PURE__ */ (0, X.jsxs)("footer", { children: [/* @__PURE__ */ (0, X.jsx)("button", {
				className: "button",
				disabled: n,
				onClick: i,
				children: "Cancel"
			}), s ? /* @__PURE__ */ (0, X.jsx)("button", {
				className: "button primary",
				disabled: n,
				onClick: a,
				children: "Continue"
			}) : /* @__PURE__ */ (0, X.jsxs)("button", {
				className: "button primary",
				disabled: n,
				onClick: o,
				children: [/* @__PURE__ */ (0, X.jsx)(og, { size: 14 }), n ? "Starting…" : "Start scan"]
			})] })]
		})
	});
}
function __({ label: e, value: t, onClick: n }) {
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: `metric ${n ? "metric-action" : ""}`,
		onClick: n,
		role: n ? "button" : void 0,
		tabIndex: n ? 0 : void 0,
		onKeyDown: (e) => {
			n && (e.key === "Enter" || e.key === " ") && n();
		},
		children: [/* @__PURE__ */ (0, X.jsx)("span", { children: e }), /* @__PURE__ */ (0, X.jsx)("strong", { children: t })]
	});
}
function v_({ label: e }) {
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "empty",
		children: [/* @__PURE__ */ (0, X.jsx)(fg, { size: 20 }), e]
	});
}
function y_({ run: e }) {
	let t = [
		[
			"High",
			Number(e.high || 0),
			"high"
		],
		[
			"Medium",
			Number(e.medium || 0),
			"medium"
		],
		[
			"Low",
			Number(e.low || 0),
			"low"
		]
	].filter(([, e]) => e > 0);
	return t.length ? /* @__PURE__ */ (0, X.jsx)("span", {
		className: "severity-breakdown",
		children: t.map(([e, t, n]) => /* @__PURE__ */ (0, X.jsxs)("b", {
			className: n,
			children: [
				e,
				": ",
				t
			]
		}, e))
	}) : /* @__PURE__ */ (0, X.jsx)(X.Fragment, { children: "—" });
}
function b_({ page: e, pageCount: t, onChange: n }) {
	return /* @__PURE__ */ (0, X.jsxs)("footer", {
		className: "pagination",
		children: [/* @__PURE__ */ (0, X.jsxs)("span", { children: [
			"Page ",
			e + 1,
			" of ",
			t
		] }), /* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)("button", {
			className: "button secondary",
			disabled: e === 0,
			onClick: () => n(e - 1),
			children: "Previous"
		}), /* @__PURE__ */ (0, X.jsx)("button", {
			className: "button secondary",
			disabled: e === t - 1,
			onClick: () => n(e + 1),
			children: "Next"
		})] })]
	});
}
function x_({ issue: e, onIgnore: t }) {
	let [n, r] = (0, N.useState)(!1), i = e.status || e.issue_status || "open", a = ![
		"ignored",
		"resolved",
		"accepted_risk",
		"false_positive"
	].includes(String(i).toLowerCase());
	return /* @__PURE__ */ (0, X.jsxs)("article", {
		className: "finding",
		children: [/* @__PURE__ */ (0, X.jsxs)("div", {
			className: "finding-main",
			children: [/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "finding-copy",
				children: [
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "finding-heading",
						children: [/* @__PURE__ */ (0, X.jsx)("h4", { children: $(e.title, "Untitled finding") }), /* @__PURE__ */ (0, X.jsx)(zg, { value: i })]
					}),
					/* @__PURE__ */ (0, X.jsxs)("p", {
						className: "finding-meta",
						children: [
							/* @__PURE__ */ (0, X.jsx)("code", {
								className: "finding-id",
								children: $(e.id)
							}),
							/* @__PURE__ */ (0, X.jsx)("i", { children: "|" }),
							$(e.repository, "Unknown repository"),
							" ",
							/* @__PURE__ */ (0, X.jsx)("i", { children: "|" }),
							" ",
							Pg(e.last_seen_at)
						]
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "finding-links finding-row-links",
						children: [
							/* @__PURE__ */ (0, X.jsx)("button", {
								className: "finding-link",
								onClick: () => r(!n),
								children: n ? "Hide detail" : "View detail"
							}),
							e.jira_key && e.jira_url && /* @__PURE__ */ (0, X.jsxs)("a", {
								className: "finding-link",
								href: e.jira_url,
								target: "_blank",
								rel: "noreferrer",
								children: [e.jira_key, /* @__PURE__ */ (0, X.jsx)(Kh, { size: 12 })]
							}),
							e.pr_url && /* @__PURE__ */ (0, X.jsxs)("a", {
								className: "finding-link",
								href: e.pr_url,
								target: "_blank",
								rel: "noreferrer",
								children: ["Pull request", /* @__PURE__ */ (0, X.jsx)(Kh, { size: 12 })]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, X.jsx)("div", {
				className: "finding-actions",
				children: a && /* @__PURE__ */ (0, X.jsx)("button", {
					className: "button secondary",
					onClick: t,
					children: "Mark ignored"
				})
			})]
		}), n && /* @__PURE__ */ (0, X.jsxs)("div", {
			className: "finding-detail",
			children: [
				/* @__PURE__ */ (0, X.jsx)(S_, {
					label: "Impact",
					value: e.impact
				}),
				/* @__PURE__ */ (0, X.jsx)(S_, {
					label: "Trigger",
					value: e.trigger
				}),
				/* @__PURE__ */ (0, X.jsx)(S_, {
					label: "Root cause",
					value: e.root_cause
				}),
				/* @__PURE__ */ (0, X.jsx)(S_, {
					label: "Code",
					value: e.code_snippet,
					code: !0
				}),
				/* @__PURE__ */ (0, X.jsx)(S_, {
					label: "Recommended correction",
					value: e.suggestion
				}),
				/* @__PURE__ */ (0, X.jsx)(S_, {
					label: "Validation",
					value: e.validation
				})
			]
		})]
	});
}
function S_({ label: e, value: t, code: n = !1 }) {
	return /* @__PURE__ */ (0, X.jsxs)("section", {
		className: "finding-detail-row",
		children: [/* @__PURE__ */ (0, X.jsx)("h5", { children: e }), n ? /* @__PURE__ */ (0, X.jsx)("pre", { children: /* @__PURE__ */ (0, X.jsx)("code", { children: $(t, "No code snippet was captured for this historical finding.") }) }) : /* @__PURE__ */ (0, X.jsx)("p", { children: $(t, "Not recorded.") })]
	});
}
function C_({ onClose: e, onConfirm: t }) {
	let [n, r] = (0, N.useState)("");
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: e,
		children: /* @__PURE__ */ (0, X.jsxs)("section", {
			className: "modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Ignore finding",
			onMouseDown: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "modal-body compact",
				children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: "Mark this finding as ignored?" }), /* @__PURE__ */ (0, X.jsx)(G_, {
					label: "Reason (optional)",
					children: /* @__PURE__ */ (0, X.jsx)("textarea", {
						className: "ignore-reason",
						rows: 2,
						autoFocus: !0,
						value: n,
						onChange: (e) => r(e.target.value),
						placeholder: "Why is this safe to ignore?"
					})
				})]
			}), /* @__PURE__ */ (0, X.jsxs)("footer", { children: [/* @__PURE__ */ (0, X.jsx)("button", {
				className: "button",
				onClick: e,
				children: "Cancel"
			}), /* @__PURE__ */ (0, X.jsx)("button", {
				className: "button primary",
				onClick: () => t(n),
				children: "Mark ignored"
			})] })]
		})
	});
}
function w_({ data: e, project: t, notify: n, reload: r }) {
	let i = e.delivery || {}, a = i.current || {}, o = i.runs || [], s = a.stages || [], c = i.scheduler_activity || [], l = i.available_stories || [], [u, d] = (0, N.useState)(null), [f, p] = (0, N.useState)(null), [m, h] = (0, N.useState)(""), [g, _] = (0, N.useState)(""), [v, y] = (0, N.useState)(!1), [b, x] = (0, N.useState)(!1), [S, C] = (0, N.useState)(!1), [w, T] = (0, N.useState)(!1), [E, ee] = (0, N.useState)(""), [D, O] = (0, N.useState)(0), [k, te] = (0, N.useState)(""), [ne, A] = (0, N.useState)(!1), [j, re] = (0, N.useState)(""), [ie, ae] = (0, N.useState)(null), [oe, se] = (0, N.useState)(""), [M, ce] = (0, N.useState)(Date.now()), le = /in_progress|running/i.test(String(a.delivery_status || "")), ue = f_(l, a), de = (0, N.useCallback)(async (e = a.run_id || "", n = !1) => {
		n || y(!0);
		try {
			let n = await Rg(`/api/delivery/log?run_id=${encodeURIComponent(e)}`, t);
			h(n.content || "No log content recorded."), _("");
		} catch (e) {
			_(e instanceof Error ? e.message : "Unable to load delivery log");
		} finally {
			y(!1);
		}
	}, [a.run_id, t]);
	(0, N.useEffect)(() => {
		if (!le) return;
		let e = window.setInterval(() => ce(Date.now()), 1e3);
		return () => window.clearInterval(e);
	}, [le]);
	let fe = !!(u && le && u.run_id === a.run_id && /in_progress|running/i.test(String(u.status || "")));
	(0, N.useEffect)(() => {
		if (!fe || !u) return;
		let e = window.setInterval(() => void de(u.run_id, !0), 2e3);
		return () => window.clearInterval(e);
	}, [
		u,
		fe,
		de
	]);
	let pe = async (e, t = a.run_id || "") => {
		d({
			...e,
			run_id: t
		}), h(""), _(""), await de(t);
	}, me = async () => {
		x(!0), h(""), _(""), y(!0);
		try {
			let e = await Rg("/api/delivery/scheduler-log", t);
			h(e.content || "No scheduler output recorded.");
		} catch (e) {
			_(e instanceof Error ? e.message : "Unable to load scheduler log");
		} finally {
			y(!1);
		}
	}, he = async () => {
		T(!0), ee("");
		try {
			await Rg("/api/delivery/retry", t, {
				method: "POST",
				json: {}
			}), C(!1), n("Delivery retry started", "success"), await r().catch(() => void 0);
		} catch (e) {
			let t = e instanceof Error ? e.message : "Unable to retry delivery";
			ee(t === "Not found" ? "Dashboard is still running an older version. Run `lumen dashboard stop --project …`, then open the dashboard again." : t);
		} finally {
			T(!1);
		}
	}, ge = () => {
		re(""), te(ue[0]?.value || ""), O(1);
	}, _e = async () => {
		let e = k.trim();
		if (!e) {
			n("Select a story to start", "error");
			return;
		}
		A(!0), re("");
		try {
			await Rg("/api/delivery/start", t, {
				method: "POST",
				json: { story: e }
			}), O(0), n(`Delivery started for ${e}`, "success"), await r().catch(() => void 0);
		} catch (e) {
			let t = e instanceof Error ? e.message : "Unable to start delivery";
			re(t), n(t, "error");
		} finally {
			A(!1);
		}
	}, ve = async () => {
		if (window.confirm("Stop this delivery and remove its worktrees?")) {
			A(!0), re("");
			try {
				await Rg("/api/delivery/stop", t, {
					method: "POST",
					json: {}
				}), n("Delivery stopped", "success"), await r();
			} catch (e) {
				let t = e instanceof Error ? e.message : "Unable to stop delivery";
				re(t), n(t, "error");
			} finally {
				A(!1);
			}
		}
	}, ye = async (e) => {
		try {
			let n = await Rg(`/api/delivery/trace?run_id=${encodeURIComponent(e)}`, t);
			d({
				label: "Trace",
				duration: "Agent evidence",
				detail: "Redacted local execution evidence",
				run_id: e
			}), h(JSON.stringify(n, null, 2)), _("");
		} catch (e) {
			re(e instanceof Error ? e.message : "Unable to load trace");
		}
	}, be = async () => {
		let e = String(ie?.run_id || "").trim();
		if (e) {
			se(e), re("");
			try {
				await Rg("/api/delivery/history/delete", t, {
					method: "POST",
					json: { run_id: e }
				}), ae(null), n("Delivery history deleted", "success"), await r().catch(() => void 0);
			} catch (e) {
				let t = e instanceof Error ? e.message : "Unable to delete delivery history";
				re(t), n(t, "error");
			} finally {
				se("");
			}
		}
	}, xe = /failed|blocked/i.test(String(a.delivery_status || ""));
	return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [
		/* @__PURE__ */ (0, X.jsxs)(l_, {
			title: "Current Progress",
			className: "delivery-summary",
			action: /* @__PURE__ */ (0, X.jsxs)("span", {
				className: "panel-actions",
				children: [
					!le && ue.length > 0 && /* @__PURE__ */ (0, X.jsxs)("button", {
						className: "button secondary",
						disabled: ne,
						onClick: ge,
						children: [/* @__PURE__ */ (0, X.jsx)(og, { size: 14 }), "Start"]
					}),
					le && /* @__PURE__ */ (0, X.jsx)("button", {
						className: "button danger secondary",
						disabled: ne,
						onClick: () => void ve(),
						children: "Stop"
					}),
					xe && /* @__PURE__ */ (0, X.jsxs)("button", {
						className: "button secondary",
						onClick: () => C(!0),
						children: [/* @__PURE__ */ (0, X.jsx)(sg, { size: 14 }), "Retry"]
					})
				]
			}),
			children: [
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "delivery-facts",
					children: [
						/* @__PURE__ */ (0, X.jsx)(P_, {
							label: "Current story",
							value: /* @__PURE__ */ (0, X.jsx)(j_, {
								jiraKey: a.jira_key || a.story_id,
								title: a.story_title
							})
						}),
						/* @__PURE__ */ (0, X.jsx)(P_, {
							label: "Status",
							value: /* @__PURE__ */ (0, X.jsx)(zg, { value: a.delivery_status || "not started" })
						}),
						/* @__PURE__ */ (0, X.jsx)(P_, {
							label: "Elapsed",
							value: Fg(a.started_at, a.finished_at || (le ? new Date(M).toISOString() : void 0))
						}),
						/* @__PURE__ */ (0, X.jsx)(P_, {
							label: "Finished",
							value: le ? "Running" : Pg(a.finished_at)
						})
					]
				}),
				j && /* @__PURE__ */ (0, X.jsx)("div", {
					className: "status-note",
					children: j
				}),
				/* @__PURE__ */ (0, X.jsx)(M_, {
					stages: s,
					deliveryStatus: String(a.delivery_status || ""),
					currentStep: String(a.current_step || ""),
					startedAt: a.started_at,
					finishedAt: a.finished_at,
					remediation: a.remediation,
					now: M,
					onStageClick: pe
				})
			]
		}),
		/* @__PURE__ */ (0, X.jsx)(l_, {
			title: "Delivery History",
			className: "history-panel",
			action: /* @__PURE__ */ (0, X.jsxs)("span", {
				className: "muted",
				children: [o.length, " runs"]
			}),
			children: /* @__PURE__ */ (0, X.jsx)("div", {
				className: "table-scroll",
				children: /* @__PURE__ */ (0, X.jsxs)("table", { children: [/* @__PURE__ */ (0, X.jsx)("thead", { children: /* @__PURE__ */ (0, X.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, X.jsx)("th", { children: "Story" }),
					/* @__PURE__ */ (0, X.jsx)("th", { children: "Finished" }),
					/* @__PURE__ */ (0, X.jsx)("th", { children: "Status" }),
					/* @__PURE__ */ (0, X.jsx)("th", { children: "Pull requests" }),
					/* @__PURE__ */ (0, X.jsx)("th", { children: "Checks" }),
					/* @__PURE__ */ (0, X.jsx)("th", { children: "Duration" }),
					/* @__PURE__ */ (0, X.jsx)("th", { children: "Trace" }),
					/* @__PURE__ */ (0, X.jsx)("th", { children: "Operation" })
				] }) }), /* @__PURE__ */ (0, X.jsx)("tbody", { children: o.length ? o.map((e) => {
					let t = e.verification || [], n = t.filter((e) => e.status === "failed"), r = n.length || /failed|blocked/i.test(String(e.status));
					return /* @__PURE__ */ (0, X.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, X.jsx)("td", { children: /* @__PURE__ */ (0, X.jsxs)("div", {
							className: "history-story",
							children: [/* @__PURE__ */ (0, X.jsxs)("span", {
								className: "history-story-line",
								children: [/* @__PURE__ */ (0, X.jsx)("code", { children: $(e.jira_key || e.story || e.run_id) }), e.story_title && /* @__PURE__ */ (0, X.jsx)("span", {
									className: "history-story-title",
									children: e.story_title
								})]
							}), /* @__PURE__ */ (0, X.jsx)("small", { children: $(e.branch, "") })]
						}) }),
						/* @__PURE__ */ (0, X.jsx)("td", { children: Pg(e.finished_at || e.started_at) }),
						/* @__PURE__ */ (0, X.jsx)("td", { children: r ? /* @__PURE__ */ (0, X.jsx)("button", {
							className: "status-badge-button",
							title: "Open failure log",
							onClick: () => void pe({
								label: "Delivery failure",
								duration: Fg(e.started_at, e.finished_at),
								detail: n.map((e) => e.summary || e.label).filter(Boolean).join(" · ") || "Open the delivery log for details."
							}, e.run_id),
							children: /* @__PURE__ */ (0, X.jsx)(zg, { value: e.status })
						}) : /* @__PURE__ */ (0, X.jsx)(zg, { value: e.status }) }),
						/* @__PURE__ */ (0, X.jsx)("td", { children: /* @__PURE__ */ (0, X.jsx)(F_, { items: e.pull_requests || [] }) }),
						/* @__PURE__ */ (0, X.jsx)("td", { children: /* @__PURE__ */ (0, X.jsx)(I_, {
							checks: t,
							onClick: () => p(t)
						}) }),
						/* @__PURE__ */ (0, X.jsx)("td", { children: Fg(e.started_at, e.finished_at) }),
						/* @__PURE__ */ (0, X.jsx)("td", { children: e.agent_trace && /* @__PURE__ */ (0, X.jsx)("button", {
							className: "text-button",
							onClick: () => void ye(e.run_id),
							children: "View trace"
						}) }),
						/* @__PURE__ */ (0, X.jsx)("td", { children: /* @__PURE__ */ (0, X.jsx)(c_, {
							label: "Delete delivery record",
							danger: !0,
							disabled: oe === e.run_id,
							onClick: () => ae(e),
							children: /* @__PURE__ */ (0, X.jsx)(hg, { size: 15 })
						}) })
					] }, e.run_id);
				}) : /* @__PURE__ */ (0, X.jsx)("tr", { children: /* @__PURE__ */ (0, X.jsx)("td", {
					colSpan: 8,
					children: /* @__PURE__ */ (0, X.jsx)(v_, { label: "No delivery history yet." })
				}) }) })] })
			})
		}),
		/* @__PURE__ */ (0, X.jsx)(l_, {
			title: "Scheduler Activity",
			action: /* @__PURE__ */ (0, X.jsxs)("span", {
				className: "panel-actions",
				children: [/* @__PURE__ */ (0, X.jsxs)("span", {
					className: "muted",
					children: [c.length, " recent events"]
				}), i.scheduler_log_available && /* @__PURE__ */ (0, X.jsxs)("button", {
					className: "button secondary",
					onClick: () => void me(),
					children: [/* @__PURE__ */ (0, X.jsx)(mg, { size: 14 }), "View raw log"]
				})]
			}),
			children: /* @__PURE__ */ (0, X.jsx)("div", {
				className: "scheduler-activity",
				children: c.length ? c.map((e, t) => /* @__PURE__ */ (0, X.jsxs)("article", {
					className: "scheduler-event",
					children: [
						/* @__PURE__ */ (0, X.jsx)(zg, { value: e.outcome }),
						/* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: $(e.story_id || e.jira_key, "Workspace") }), /* @__PURE__ */ (0, X.jsx)("p", { children: $(e.message) })] }),
						/* @__PURE__ */ (0, X.jsx)("time", { children: Pg(e.at) })
					]
				}, `${e.at}-${t}`)) : /* @__PURE__ */ (0, X.jsx)(v_, { label: "No scheduled delivery activity recorded yet." })
			})
		}),
		u && /* @__PURE__ */ (0, X.jsx)(N_, {
			stage: u,
			content: m,
			error: g,
			loading: v,
			live: fe,
			onClose: () => d(null)
		}),
		b && /* @__PURE__ */ (0, X.jsx)(N_, {
			stage: {
				label: "Scheduler log",
				duration: "Recent raw output",
				detail: "Launchd output is capped at 256 KiB; structured activity retains the latest 200 events."
			},
			content: m,
			error: g,
			loading: v,
			onClose: () => x(!1)
		}),
		f && /* @__PURE__ */ (0, X.jsx)(L_, {
			checks: f,
			onClose: () => p(null)
		}),
		S && /* @__PURE__ */ (0, X.jsx)(O_, {
			story: $(a.jira_key || a.story_id),
			busy: w,
			error: E,
			onClose: () => C(!1),
			onConfirm: () => void he()
		}),
		D > 0 && /* @__PURE__ */ (0, X.jsx)(D_, {
			stories: ue,
			value: k,
			onChange: te,
			step: D === 1 ? 1 : 2,
			busy: ne,
			error: j,
			onClose: () => {
				ne || O(0);
			},
			onContinue: () => O(2),
			onConfirm: () => void _e()
		}),
		ie && /* @__PURE__ */ (0, X.jsx)(k_, {
			run: ie,
			busy: !!oe,
			onClose: () => ae(null),
			onConfirm: () => void be()
		})
	] });
}
function T_({ data: e, project: t, notify: n, reload: r }) {
	let i = e.patch || {}, a = i.current || {}, o = i.runs || [], s = i.scheduler_activity || [], c = !!a.active || /in_progress|running/i.test(String(a.patch_status || "")), [l, u] = (0, N.useState)(""), [d, f] = (0, N.useState)(""), [p, m] = (0, N.useState)(!1), [h, g] = (0, N.useState)(!1), [_, v] = (0, N.useState)(null), [y, b] = (0, N.useState)(""), [x, S] = (0, N.useState)(""), C = async (e = String(a.run_id || "")) => {
		m(!0), u(""), f("");
		try {
			let n = await Rg(`/api/patch/log?run_id=${encodeURIComponent(e)}`, t);
			u(n.content || "No log content recorded.");
		} catch (e) {
			f(e instanceof Error ? e.message : "Unable to load Auto Patch log");
		}
	}, w = async () => {
		g(!0);
		try {
			await Rg("/api/patch/start", t, {
				method: "POST",
				json: {}
			}), n("Auto Patch started", "success"), await r();
		} catch (e) {
			n(e instanceof Error ? e.message : "Unable to start Auto Patch", "error");
		} finally {
			g(!1);
		}
	}, T = async () => {
		g(!0);
		try {
			await Rg("/api/patch/stop", t, {
				method: "POST",
				json: {}
			}), n("Auto Patch stopped", "success"), await r();
		} catch (e) {
			n(e instanceof Error ? e.message : "Unable to stop Auto Patch", "error");
		} finally {
			g(!1);
		}
	}, E = async () => {
		let e = String(_?.run_id || "").trim();
		if (e) {
			b(e), S("");
			try {
				await Rg("/api/patch/history/delete", t, {
					method: "POST",
					json: { run_id: e }
				}), v(null), n("Patch history deleted", "success"), await r().catch(() => void 0);
			} catch (e) {
				let t = e instanceof Error ? e.message : "Unable to delete Auto Patch history";
				S(t), n(t, "error");
			} finally {
				b("");
			}
		}
	}, ee = Array.isArray(a.self_checks) ? a.self_checks : [];
	return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [
		/* @__PURE__ */ (0, X.jsxs)(l_, {
			title: "Current Progress",
			action: /* @__PURE__ */ (0, X.jsx)("span", {
				className: "panel-actions",
				children: c ? /* @__PURE__ */ (0, X.jsx)("button", {
					className: "button danger secondary",
					disabled: h,
					onClick: () => void T(),
					children: "Stop"
				}) : /* @__PURE__ */ (0, X.jsxs)("button", {
					className: "button secondary",
					disabled: h,
					onClick: () => void w(),
					children: [/* @__PURE__ */ (0, X.jsx)(og, { size: 14 }), "Run one cycle"]
				})
			}),
			children: [
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "delivery-facts",
					children: [
						/* @__PURE__ */ (0, X.jsx)(P_, {
							label: "Jira card",
							value: /* @__PURE__ */ (0, X.jsx)(j_, {
								jiraKey: a.jira_key,
								title: a.jira_summary
							})
						}),
						/* @__PURE__ */ (0, X.jsx)(P_, {
							label: "Status",
							value: /* @__PURE__ */ (0, X.jsx)(zg, { value: a.patch_status || "not started" })
						}),
						/* @__PURE__ */ (0, X.jsx)(P_, {
							label: "Branch",
							value: /* @__PURE__ */ (0, X.jsx)("code", { children: $(a.branch) })
						}),
						/* @__PURE__ */ (0, X.jsx)(P_, {
							label: "Repositories",
							value: Array.isArray(a.repositories) && a.repositories.map((e) => e.name).filter(Boolean).join(", ") || "—"
						})
					]
				}),
				a.question && /* @__PURE__ */ (0, X.jsxs)("div", {
					className: "status-note",
					children: [/* @__PURE__ */ (0, X.jsx)(Uh, { size: 15 }), a.question]
				}),
				/* @__PURE__ */ (0, X.jsx)(E_, { phases: Array.isArray(a.stages) ? a.stages : [] })
			]
		}),
		/* @__PURE__ */ (0, X.jsxs)(l_, {
			title: "Patch History",
			action: /* @__PURE__ */ (0, X.jsxs)("span", {
				className: "muted",
				children: [o.length, " runs"]
			}),
			children: [x && /* @__PURE__ */ (0, X.jsx)("div", {
				className: "status-note",
				children: x
			}), /* @__PURE__ */ (0, X.jsx)("div", {
				className: "table-scroll patch-history-scroll",
				children: /* @__PURE__ */ (0, X.jsxs)("table", {
					className: "patch-history-table",
					children: [/* @__PURE__ */ (0, X.jsx)("thead", { children: /* @__PURE__ */ (0, X.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, X.jsx)("th", { children: "Jira" }),
						/* @__PURE__ */ (0, X.jsx)("th", { children: "Summary" }),
						/* @__PURE__ */ (0, X.jsx)("th", { children: "Status" }),
						/* @__PURE__ */ (0, X.jsx)("th", { children: "Repositories" }),
						/* @__PURE__ */ (0, X.jsx)("th", { children: "Finished" }),
						/* @__PURE__ */ (0, X.jsx)("th", { children: "Log" }),
						/* @__PURE__ */ (0, X.jsx)("th", { children: "Operation" })
					] }) }), /* @__PURE__ */ (0, X.jsx)("tbody", { children: o.length ? o.map((e) => /* @__PURE__ */ (0, X.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, X.jsx)("td", { children: /* @__PURE__ */ (0, X.jsxs)("div", {
							className: "patch-history-jira",
							children: [/* @__PURE__ */ (0, X.jsx)("code", {
								className: "patch-history-key",
								children: $(e.jira_key)
							}), e.jira_summary && /* @__PURE__ */ (0, X.jsx)("span", {
								className: "patch-history-jira-title",
								title: $(e.jira_summary),
								children: $(e.jira_summary)
							})]
						}) }),
						/* @__PURE__ */ (0, X.jsx)("td", { children: /* @__PURE__ */ (0, X.jsx)("span", {
							className: "patch-history-summary",
							title: $(e.summary),
							children: $(e.summary)
						}) }),
						/* @__PURE__ */ (0, X.jsx)("td", { children: /* @__PURE__ */ (0, X.jsx)(zg, { value: e.status }) }),
						/* @__PURE__ */ (0, X.jsx)("td", { children: (e.repositories || []).map((e) => e.name).filter(Boolean).join(", ") || "—" }),
						/* @__PURE__ */ (0, X.jsx)("td", { children: /* @__PURE__ */ (0, X.jsx)("span", {
							className: "patch-history-finished",
							children: Pg(e.finished_at)
						}) }),
						/* @__PURE__ */ (0, X.jsx)("td", { children: /* @__PURE__ */ (0, X.jsx)("button", {
							className: "text-button",
							onClick: () => void C(e.run_id),
							children: "View log"
						}) }),
						/* @__PURE__ */ (0, X.jsx)("td", { children: /* @__PURE__ */ (0, X.jsx)(c_, {
							label: "Delete Auto Patch record",
							danger: !0,
							disabled: y === e.run_id,
							onClick: () => v(e),
							children: /* @__PURE__ */ (0, X.jsx)(hg, { size: 15 })
						}) })
					] }, e.run_id)) : /* @__PURE__ */ (0, X.jsx)("tr", { children: /* @__PURE__ */ (0, X.jsx)("td", {
						colSpan: 7,
						children: /* @__PURE__ */ (0, X.jsx)(v_, { label: "No Auto Patch history yet." })
					}) }) })]
				})
			})]
		}),
		/* @__PURE__ */ (0, X.jsxs)("div", {
			className: "two-column",
			children: [/* @__PURE__ */ (0, X.jsx)(l_, {
				title: "Patch Evidence",
				children: /* @__PURE__ */ (0, X.jsxs)("div", {
					className: "rows",
					children: [
						/* @__PURE__ */ (0, X.jsxs)("div", {
							className: "info-row",
							children: [/* @__PURE__ */ (0, X.jsx)("span", { children: "Summary" }), /* @__PURE__ */ (0, X.jsx)("div", { children: $(a.summary || a.jira_summary) })]
						}),
						/* @__PURE__ */ (0, X.jsxs)("div", {
							className: "info-row",
							children: [/* @__PURE__ */ (0, X.jsx)("span", { children: "Self-checks" }), /* @__PURE__ */ (0, X.jsx)("div", { children: ee.length ? `${ee.filter((e) => e.status === "passed").length}/${ee.length} passed` : "—" })]
						}),
						/* @__PURE__ */ (0, X.jsxs)("div", {
							className: "info-row",
							children: [/* @__PURE__ */ (0, X.jsx)("span", { children: "Pull requests" }), /* @__PURE__ */ (0, X.jsx)("div", { children: /* @__PURE__ */ (0, X.jsx)(F_, { items: (a.pr_urls || []).map((e) => ({
								url: e,
								repository: "Pull request"
							})) }) })]
						}),
						/* @__PURE__ */ (0, X.jsxs)("div", {
							className: "info-row",
							children: [/* @__PURE__ */ (0, X.jsx)("span", { children: "Files changed" }), /* @__PURE__ */ (0, X.jsx)("div", { children: (a.repositories || []).flatMap((e) => e.files_changed || []).length || "—" })]
						})
					]
				})
			}), /* @__PURE__ */ (0, X.jsx)(l_, {
				title: "Scheduler Activity",
				children: /* @__PURE__ */ (0, X.jsx)("div", {
					className: "scheduler-activity",
					children: s.length ? s.map((e, t) => /* @__PURE__ */ (0, X.jsxs)("article", {
						className: "scheduler-event",
						children: [
							/* @__PURE__ */ (0, X.jsx)(zg, { value: e.outcome }),
							/* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: $(e.jira_key || e.card, "Workspace") }), /* @__PURE__ */ (0, X.jsx)("p", { children: $(e.message) })] }),
							/* @__PURE__ */ (0, X.jsx)("time", { children: Pg(e.at) })
						]
					}, `${e.at}-${t}`)) : /* @__PURE__ */ (0, X.jsx)(v_, { label: "No Auto Patch activity recorded yet." })
				})
			})]
		}),
		p && /* @__PURE__ */ (0, X.jsx)(N_, {
			stage: {
				label: "Auto Patch log",
				detail: "Recent Auto Patch agent output"
			},
			content: l,
			error: d,
			loading: !l && !d,
			onClose: () => m(!1)
		}),
		_ && /* @__PURE__ */ (0, X.jsx)(k_, {
			kind: "patch",
			run: _,
			busy: !!y,
			onClose: () => v(null),
			onConfirm: () => void E()
		})
	] });
}
function E_({ phases: e }) {
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "delivery-flow patch-flow",
		children: [/* @__PURE__ */ (0, X.jsxs)("div", {
			className: "flow-heading",
			children: [/* @__PURE__ */ (0, X.jsx)("div", { children: /* @__PURE__ */ (0, X.jsx)("span", {
				className: "flow-title",
				children: "Patch Flow"
			}) }), /* @__PURE__ */ (0, X.jsx)("p", { children: "Capture → screen → context → patch → publish" })]
		}), /* @__PURE__ */ (0, X.jsxs)("div", {
			className: "flow-track-wrap",
			children: [/* @__PURE__ */ (0, X.jsx)("span", {
				className: "flow-track",
				children: /* @__PURE__ */ (0, X.jsx)("i", { style: { width: `${e.length ? Math.round(e.filter((e) => e.status === "completed").length / e.length * 100) : 0}%` } })
			}), /* @__PURE__ */ (0, X.jsx)("ol", {
				className: "flow-steps",
				style: { "--flow-count": Math.max(e.length, 1) },
				children: e.map((e, t) => {
					let n = String(e.status || "pending").toLowerCase(), r = n === "completed" ? "completed" : /in_progress|running/.test(n) ? "running" : /failed|blocked/.test(n) ? "failed" : "pending";
					return /* @__PURE__ */ (0, X.jsx)("li", {
						className: `flow-step ${r}`,
						children: /* @__PURE__ */ (0, X.jsxs)("div", {
							className: "flow-stage-button",
							children: [/* @__PURE__ */ (0, X.jsx)("span", {
								className: "flow-marker",
								children: r === "completed" ? "✓" : t + 1
							}), /* @__PURE__ */ (0, X.jsxs)("span", {
								className: "flow-copy",
								children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: $(e.label) }), /* @__PURE__ */ (0, X.jsx)("span", { children: $(e.detail || e.status, "Pending") })]
							})]
						})
					}, e.id || t);
				})
			})]
		})]
	});
}
function D_({ stories: e, value: t, onChange: n, step: r, busy: i, error: a, onClose: o, onContinue: s, onConfirm: c }) {
	let l = r === 1, u = e.find((e) => e.value === t)?.label || t;
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: i ? void 0 : o,
		children: /* @__PURE__ */ (0, X.jsxs)("section", {
			className: "modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": l ? "Start delivery" : "Confirm start delivery",
			onMouseDown: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "modal-body compact",
				children: [
					/* @__PURE__ */ (0, X.jsx)("strong", { children: l ? "Start delivery" : "Confirm delivery start" }),
					/* @__PURE__ */ (0, X.jsx)("p", {
						className: "modal-copy",
						children: l ? "Choose a ready story to launch." : `Are you sure you want to start delivery for ${u} now?`
					}),
					l && /* @__PURE__ */ (0, X.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, X.jsx)("span", { children: "Story" }), /* @__PURE__ */ (0, X.jsx)("select", {
							value: t,
							onChange: (e) => n(e.target.value),
							disabled: i || e.length === 0,
							children: e.length ? e.map((e) => /* @__PURE__ */ (0, X.jsx)("option", {
								value: e.value,
								title: e.label,
								children: e.label
							}, e.value)) : /* @__PURE__ */ (0, X.jsx)("option", {
								value: "",
								children: "No ready stories"
							})
						})]
					}),
					a && /* @__PURE__ */ (0, X.jsx)("p", {
						className: "status-note",
						children: a
					})
				]
			}), /* @__PURE__ */ (0, X.jsxs)("footer", { children: [/* @__PURE__ */ (0, X.jsx)("button", {
				className: "button",
				disabled: i,
				onClick: o,
				children: "Cancel"
			}), l ? /* @__PURE__ */ (0, X.jsx)("button", {
				className: "button primary",
				disabled: i || !t,
				onClick: s,
				children: "Continue"
			}) : /* @__PURE__ */ (0, X.jsxs)("button", {
				className: "button primary",
				disabled: i || !t,
				onClick: c,
				children: [/* @__PURE__ */ (0, X.jsx)(og, { size: 14 }), i ? "Starting…" : "Start delivery"]
			})] })]
		})
	});
}
function O_({ story: e, busy: t, error: n, onClose: r, onConfirm: i }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: t ? void 0 : r,
		children: /* @__PURE__ */ (0, X.jsxs)("section", {
			className: "modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Reset and retry delivery",
			onMouseDown: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "modal-body compact",
				children: [
					/* @__PURE__ */ (0, X.jsxs)("strong", { children: [
						"Reset and retry ",
						e,
						"?"
					] }),
					/* @__PURE__ */ (0, X.jsx)("p", { children: "This removes the Story worktrees, resets its Delivery and JIRA status, then starts a new run. The failed run and logs stay in history." }),
					n && /* @__PURE__ */ (0, X.jsx)("p", {
						className: "status-note",
						children: n
					})
				]
			}), /* @__PURE__ */ (0, X.jsxs)("footer", { children: [/* @__PURE__ */ (0, X.jsx)("button", {
				className: "button",
				disabled: t,
				onClick: r,
				children: "Cancel"
			}), /* @__PURE__ */ (0, X.jsxs)("button", {
				className: "button primary",
				disabled: t,
				onClick: i,
				children: [/* @__PURE__ */ (0, X.jsx)(sg, { size: 14 }), t ? "Starting…" : "Retry"]
			})] })]
		})
	});
}
function k_({ kind: e = "delivery", run: t, busy: n, onClose: r, onConfirm: i }) {
	let a = e === "patch", o = $(t.jira_key || t.story || t.run_id);
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: n ? void 0 : r,
		children: /* @__PURE__ */ (0, X.jsxs)("section", {
			className: "modal delete-history-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": `Delete ${a ? "Auto Patch" : "delivery"} history`,
			onMouseDown: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "modal-body compact",
				children: [/* @__PURE__ */ (0, X.jsxs)("strong", { children: [
					"Delete ",
					a ? "Auto Patch" : "delivery",
					" history?"
				] }), /* @__PURE__ */ (0, X.jsxs)("p", {
					className: "modal-copy",
					children: [
						"This removes the ",
						o,
						" record, log, and trace files. This action cannot be undone."
					]
				})]
			}), /* @__PURE__ */ (0, X.jsxs)("footer", { children: [/* @__PURE__ */ (0, X.jsx)("button", {
				className: "button",
				disabled: n,
				onClick: r,
				children: "Cancel"
			}), /* @__PURE__ */ (0, X.jsxs)("button", {
				className: "button danger delete-confirm",
				disabled: n,
				onClick: i,
				children: [/* @__PURE__ */ (0, X.jsx)(hg, { size: 14 }), n ? "Deleting…" : "Delete record"]
			})] })]
		})
	});
}
function A_({ project: e, notify: t, onDirtyChange: n }) {
	let r = new URLSearchParams(window.location.search).get("story") || "", [i, a] = (0, N.useState)([]), [o, s] = (0, N.useState)(r), [c, l] = (0, N.useState)(""), [u, d] = (0, N.useState)(""), [f, p] = (0, N.useState)(""), [m, h] = (0, N.useState)(""), [g, _] = (0, N.useState)(""), [v, y] = (0, N.useState)(""), [b, x] = (0, N.useState)(""), [S, C] = (0, N.useState)({
		story: "",
		plan: ""
	}), [w, T] = (0, N.useState)("story"), [E, ee] = (0, N.useState)(!0), [D, O] = (0, N.useState)(!1), [k, te] = (0, N.useState)(!1), [ne, A] = (0, N.useState)(""), [j, re] = (0, N.useState)(!1), [ie, ae] = (0, N.useState)(!1), [oe, se] = (0, N.useState)(0), [M, ce] = (0, N.useState)(""), [le, ue] = (0, N.useState)(!1), [de, fe] = (0, N.useState)(""), pe = v !== S.story || b !== S.plan, me = f_(i.filter(p_)), he = me.length > 0;
	(0, N.useEffect)(() => {
		n(pe);
	}, [pe, n]), (0, N.useEffect)(() => {
		let e = (e) => {
			pe && (e.preventDefault(), e.returnValue = "");
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, [pe]);
	let ge = (0, N.useCallback)(async () => {
		ee(!0);
		try {
			let t = await Rg("/api/stories", e), n = Array.isArray(t.stories) ? t.stories : [];
			a(n), s((e) => e && n.some((t) => t.story === e) ? e : String(n[0]?.story || ""));
		} catch (e) {
			t(e instanceof Error ? e.message : "Unable to load stories", "error");
		} finally {
			ee(!1);
		}
	}, [e, t]), _e = (0, N.useCallback)(async (n) => {
		if (n) {
			O(!0), T("story");
			try {
				let t = await Rg(`/api/stories/content?story=${encodeURIComponent(n)}`, e);
				l(String(t.title || "")), d(String(t.jira_key || "")), p(String(t.jira_url || "")), h(String(t.businessStatus || "")), _(String(t.technicalStatus || ""));
				let r = String(t.story_markdown || ""), i = String(t.plan_markdown || "");
				y(r), x(i), C({
					story: r,
					plan: i
				});
				let a = new URL(window.location.href);
				a.searchParams.set("story", n), window.history.replaceState({}, "", `${a.pathname}${a.search}`);
			} catch (e) {
				t(e instanceof Error ? e.message : "Unable to load story content", "error");
			} finally {
				O(!1);
			}
		}
	}, [e, t]);
	(0, N.useEffect)(() => {
		ge();
	}, [ge]), (0, N.useEffect)(() => {
		o && _e(o);
	}, [o, _e]);
	let ve = (e) => {
		e !== o && (pe && !window.confirm("You have unsaved Observatory changes. Switch stories without saving?") || s(e));
	}, ye = () => {
		fe("");
		let e = me.find((e) => e.value === o)?.value || me[0]?.value || "";
		ce(e), se(1);
	}, be = async () => {
		let n = M.trim();
		if (!n) {
			t("Select a story to start", "error");
			return;
		}
		if (!(pe && !window.confirm("You have unsaved Observatory changes. Start delivery without saving?"))) {
			ue(!0), fe("");
			try {
				await Rg("/api/delivery/start", e, {
					method: "POST",
					json: { story: n }
				}), se(0), t(`Delivery started for ${n}`, "success"), await ge();
			} catch (e) {
				let n = e instanceof Error ? e.message : "Unable to start delivery";
				fe(n), t(n, "error");
			} finally {
				ue(!1);
			}
		}
	}, xe = async () => {
		if (!(!o || !pe)) {
			te(!0);
			try {
				let n = await Rg("/api/stories/content", e, {
					method: "POST",
					json: {
						story: o,
						story_markdown: v,
						plan_markdown: b
					}
				});
				C({
					story: v,
					plan: b
				}), t(String(n.subject || "Story docs saved"), "success"), await ge();
			} catch (e) {
				t(e instanceof Error ? e.message : "Unable to save story docs", "error");
			} finally {
				te(!1);
			}
		}
	}, Se = $(u || o), Ce = $(c, o), we = i.filter((e) => {
		if (ie && String(e.businessStatus || "").toLowerCase() !== "ready") return !1;
		let t = ne.trim().toLowerCase();
		return !t || `${e.jira_key || ""} ${e.title || ""} ${e.story || ""} ${e.assignee || ""}`.toLowerCase().includes(t);
	}).slice().sort((e, t) => {
		let n = String(e.updatedAt || e.createdAt || ""), r = String(t.updatedAt || t.createdAt || "");
		return n === r ? String(t.story || "").localeCompare(String(e.story || "")) : r.localeCompare(n);
	});
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "observatory-layout",
		children: [
			/* @__PURE__ */ (0, X.jsxs)("aside", {
				className: "observatory-list panel",
				children: [
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "panel-header observatory-list-header",
						children: [/* @__PURE__ */ (0, X.jsx)("h3", { children: "Stories" }), /* @__PURE__ */ (0, X.jsxs)("div", {
							className: "observatory-list-tools",
							children: [/* @__PURE__ */ (0, X.jsx)("button", {
								type: "button",
								className: `icon-button${j ? " active" : ""}`,
								title: "Search stories",
								"aria-label": "Search stories",
								"aria-pressed": j,
								onClick: () => re((e) => !e),
								children: /* @__PURE__ */ (0, X.jsx)(ug, { size: 15 })
							}), /* @__PURE__ */ (0, X.jsx)("button", {
								type: "button",
								className: `icon-button${ie ? " active" : ""}`,
								title: ie ? "Showing business-ready stories" : "Filter business-ready stories",
								"aria-label": "Filter stories",
								"aria-pressed": ie,
								onClick: () => ae((e) => !e),
								children: /* @__PURE__ */ (0, X.jsx)(tg, { size: 15 })
							})]
						})]
					}),
					j && /* @__PURE__ */ (0, X.jsx)("div", {
						className: "observatory-list-search",
						children: /* @__PURE__ */ (0, X.jsx)("input", {
							value: ne,
							onChange: (e) => A(e.target.value),
							placeholder: "Search stories",
							"aria-label": "Search stories",
							autoFocus: !0
						})
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "observatory-list-body",
						children: [
							E ? /* @__PURE__ */ (0, X.jsxs)("div", {
								className: "loading-state",
								children: [/* @__PURE__ */ (0, X.jsx)(rg, {
									size: 18,
									className: "spin"
								}), " Loading…"]
							}) : null,
							!E && !we.length ? /* @__PURE__ */ (0, X.jsx)(v_, { label: i.length ? "No stories match this filter." : "No stories found in the docs repository." }) : null,
							we.map((e) => {
								let t = $(e.jira_key || e.story), n = $(e.title, e.story);
								return /* @__PURE__ */ (0, X.jsxs)("button", {
									className: `observatory-story ${o === e.story ? "selected" : ""}`,
									onClick: () => ve(String(e.story)),
									children: [
										/* @__PURE__ */ (0, X.jsxs)("div", {
											className: "observatory-story-copy",
											children: [/* @__PURE__ */ (0, X.jsx)("span", {
												className: "observatory-key",
												children: t
											}), /* @__PURE__ */ (0, X.jsx)("span", {
												className: "observatory-story-title",
												children: n
											})]
										}),
										/* @__PURE__ */ (0, X.jsx)(Hg, {
											date: String(e.updatedAt || ""),
											assignee: String(e.assignee || "")
										}),
										/* @__PURE__ */ (0, X.jsx)(Ug, {
											business: String(e.businessStatus || "draft"),
											technical: String(e.technicalStatus || "draft")
										})
									]
								}, e.story);
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, X.jsx)("section", {
				className: "observatory-detail panel",
				children: o ? /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "observatory-header",
					children: [/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "observatory-title-row",
						children: [/* @__PURE__ */ (0, X.jsx)("h2", { children: f ? /* @__PURE__ */ (0, X.jsxs)("a", {
							className: "observatory-heading-link",
							href: f,
							target: "_blank",
							rel: "noreferrer",
							children: [
								/* @__PURE__ */ (0, X.jsx)("span", {
									className: "observatory-key",
									children: Se
								}),
								/* @__PURE__ */ (0, X.jsx)("span", {
									className: "observatory-heading-title",
									children: Ce
								}),
								/* @__PURE__ */ (0, X.jsx)(Kh, { size: 12 })
							]
						}) : /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)("span", {
							className: "observatory-key",
							children: Se
						}), /* @__PURE__ */ (0, X.jsx)("span", {
							className: "observatory-heading-title",
							children: Ce
						})] }) }), /* @__PURE__ */ (0, X.jsxs)("div", {
							className: "panel-actions observatory-actions",
							children: [he && /* @__PURE__ */ (0, X.jsxs)("button", {
								type: "button",
								className: "button secondary",
								disabled: le || D,
								onClick: ye,
								children: [/* @__PURE__ */ (0, X.jsx)(og, { size: 14 }), "Start delivery"]
							}), /* @__PURE__ */ (0, X.jsxs)("button", {
								type: "button",
								className: `button primary${k ? " is-busy" : ""}`,
								disabled: !pe || k || D,
								onClick: () => void xe(),
								children: [k ? /* @__PURE__ */ (0, X.jsx)(rg, {
									size: 14,
									className: "spin"
								}) : /* @__PURE__ */ (0, X.jsx)(cg, { size: 14 }), k ? "Saving…" : "Save"]
							})]
						})]
					}), /* @__PURE__ */ (0, X.jsx)("div", {
						className: "observatory-subheader",
						children: /* @__PURE__ */ (0, X.jsx)(Bg, {
							business: m || "draft",
							technical: g || "draft"
						})
					})]
				}), D ? /* @__PURE__ */ (0, X.jsxs)("div", {
					className: "loading-state",
					children: [/* @__PURE__ */ (0, X.jsx)(rg, {
						size: 20,
						className: "spin"
					}), " Loading story…"]
				}) : /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "observatory-doc-tabs",
					role: "tablist",
					children: [/* @__PURE__ */ (0, X.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": w === "story",
						className: w === "story" ? "active" : "",
						onClick: () => T("story"),
						children: "Story"
					}), /* @__PURE__ */ (0, X.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": w === "plan",
						className: w === "plan" ? "active" : "",
						onClick: () => T("plan"),
						children: "Technical plan"
					})]
				}), w === "story" ? /* @__PURE__ */ (0, X.jsx)(s_, {
					value: v,
					onChange: y
				}, `${o || "none"}-story`) : /* @__PURE__ */ (0, X.jsx)(s_, {
					value: b,
					onChange: x
				}, `${o || "none"}-plan`)] })] }) : /* @__PURE__ */ (0, X.jsx)(v_, { label: "Select a story to inspect." })
			}),
			oe > 0 && /* @__PURE__ */ (0, X.jsx)(D_, {
				stories: me,
				value: M,
				onChange: ce,
				step: oe === 1 ? 1 : 2,
				busy: le,
				error: de,
				onClose: () => {
					le || se(0);
				},
				onContinue: () => se(2),
				onConfirm: () => void be()
			})
		]
	});
}
function j_({ jiraKey: e, title: t }) {
	return /* @__PURE__ */ (0, X.jsx)("span", {
		className: "story-reference",
		children: t ? /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)("code", { children: $(e) }), /* @__PURE__ */ (0, X.jsx)("span", {
			className: "story-reference-title",
			children: t
		})] }) : /* @__PURE__ */ (0, X.jsx)("code", { children: $(e, "No active delivery") })
	});
}
function M_({ stages: e, deliveryStatus: t, currentStep: n, startedAt: r, finishedAt: i, remediation: a, now: o, onStageClick: s }) {
	let c = /completed|dev_done|pr_open/i.test(t), l = /stopped from dashboard/i.test(String(n || "")), u = a?.status === "in_progress", d = u ? `${a.attempt}/${a.max_attempts}` : "", f = e.map((e) => {
		let t = String(e.status || "pending").toLowerCase();
		return c || t === "completed" ? "completed" : /running|progress/.test(t) ? "running" : l && /fail|block/.test(t) ? "stopped" : /fail|block/.test(t) ? "failed" : "pending";
	}).reduce((e, t) => e + (t === "completed" ? 1 : t === "running" ? .5 : 0), 0), p = e.length > 1 ? Math.max(0, Math.min(100, (f - 1) / (e.length - 1) * 100)) : 100;
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "delivery-flow",
		children: [/* @__PURE__ */ (0, X.jsxs)("div", {
			className: "flow-heading",
			children: [/* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)("span", {
				className: "flow-title",
				children: "Delivery Flow"
			}), u && /* @__PURE__ */ (0, X.jsxs)("strong", {
				className: "remediation-alert",
				children: [
					/* @__PURE__ */ (0, X.jsx)(sg, { size: 13 }),
					"Verification failed · Remediation retry ",
					d
				]
			})] }), /* @__PURE__ */ (0, X.jsxs)("p", { children: [r ? `Started ${Pg(r)}` : "Awaiting delivery trigger", i ? ` · Finished ${Pg(i)}` : ""] })]
		}), /* @__PURE__ */ (0, X.jsxs)("div", {
			className: "flow-track-wrap",
			children: [/* @__PURE__ */ (0, X.jsx)("span", {
				className: "flow-track",
				children: /* @__PURE__ */ (0, X.jsx)("i", { style: { width: `${p}%` } })
			}), /* @__PURE__ */ (0, X.jsx)("ol", {
				className: "flow-steps",
				style: { "--flow-count": e.length },
				children: e.map((e, t) => {
					let n = String(e.status || "pending").toLowerCase(), r = c || n === "completed" ? "completed" : /running|progress/.test(n) ? "running" : l && /fail|block/.test(n) ? "stopped" : /fail|block/.test(n) ? "failed" : "pending", i = r === "running" ? Fg(e.active_started_at || e.started_at, new Date(o).toISOString()) : e.duration || "Pending", a = Array.isArray(e.attempts) && e.attempts.length > 1 ? ` · ${e.attempts.length} attempts` : "", f = r === "stopped" ? "Stopped" : u && r === "running" && ["implement", "verification"].includes(e.id) ? `Retry ${d} · ${i}` : u && e.id === "verification" && r === "failed" ? `Failed · remediation ${d}` : r === "failed" ? "Needs attention" : `${i}${a}`;
					return /* @__PURE__ */ (0, X.jsx)("li", {
						className: `flow-step ${r}`,
						children: /* @__PURE__ */ (0, X.jsxs)("button", {
							className: "flow-stage-button",
							onClick: () => s(e),
							children: [/* @__PURE__ */ (0, X.jsx)("span", {
								className: "flow-marker",
								children: r === "completed" ? "✓" : r === "running" ? /* @__PURE__ */ (0, X.jsx)("span", { className: "pulse-dot" }) : t + 1
							}), /* @__PURE__ */ (0, X.jsxs)("span", {
								className: "flow-copy",
								children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: $(e.label) }), /* @__PURE__ */ (0, X.jsx)("span", { children: f })]
							})]
						})
					}, `${e.label}-${t}`);
				})
			})]
		})]
	});
}
function N_({ stage: e, content: t, error: n, loading: r, live: i = !1, onClose: a }) {
	let o = (0, N.useRef)(null);
	return (0, N.useEffect)(() => {
		i && o.current && (o.current.scrollTop = o.current.scrollHeight);
	}, [t, i]), /* @__PURE__ */ (0, X.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: a,
		children: /* @__PURE__ */ (0, X.jsxs)("section", {
			className: "modal delivery-log-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": `${e.label} log`,
			onMouseDown: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "delivery-log-header",
				children: [/* @__PURE__ */ (0, X.jsxs)("div", { children: [
					/* @__PURE__ */ (0, X.jsx)("span", { children: e.label }),
					/* @__PURE__ */ (0, X.jsxs)("strong", { children: [e.duration || "—", i && /* @__PURE__ */ (0, X.jsxs)("em", {
						className: "live-log",
						children: [/* @__PURE__ */ (0, X.jsx)("i", {}), "Live"]
					})] }),
					/* @__PURE__ */ (0, X.jsx)("p", { children: e.detail || "Delivery log excerpt" }),
					Array.isArray(e.attempts) && e.attempts.length > 0 && /* @__PURE__ */ (0, X.jsx)("small", {
						className: "stage-attempts",
						children: e.attempts.map((e) => `Attempt ${e.number}: ${e.duration}`).join(" · ")
					})
				] }), /* @__PURE__ */ (0, X.jsx)("button", {
					className: "button secondary",
					onClick: a,
					children: "Close"
				})]
			}), /* @__PURE__ */ (0, X.jsx)("pre", {
				ref: o,
				className: "delivery-log-content",
				children: /* @__PURE__ */ (0, X.jsx)("code", { children: r && !t ? "Loading log…" : n || t })
			})]
		})
	});
}
function P_({ label: e, value: t }) {
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "fact",
		children: [/* @__PURE__ */ (0, X.jsx)("span", { children: e }), /* @__PURE__ */ (0, X.jsx)("strong", { children: t })]
	});
}
function F_({ items: e }) {
	return e.length ? /* @__PURE__ */ (0, X.jsx)("span", {
		className: "pr-links",
		children: e.map((e, t) => /* @__PURE__ */ (0, X.jsxs)("a", {
			href: e.url,
			target: "_blank",
			rel: "noreferrer",
			children: [
				$(e.repository, "Pull request"),
				String(e.url || "").match(/\/(\d+)\/?$/) ? ` #${String(e.url).match(/\/(\d+)\/?$/)?.[1]}` : "",
				/* @__PURE__ */ (0, X.jsx)(Kh, { size: 12 })
			]
		}, `${e.url}-${t}`))
	}) : /* @__PURE__ */ (0, X.jsx)(X.Fragment, { children: "—" });
}
function I_({ checks: e, onClick: t }) {
	let n = e.filter((e) => e.status === "failed").length, r = e.filter((e) => e.status === "passed").length;
	return e.length ? /* @__PURE__ */ (0, X.jsx)("button", {
		className: `check-summary ${n ? "failed" : ""}`,
		title: "Open verification details",
		onClick: t,
		children: n ? `${n} failed` : `${r}/${e.length} passed`
	}) : /* @__PURE__ */ (0, X.jsx)(X.Fragment, { children: "—" });
}
function L_({ checks: e, onClose: t }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: t,
		children: /* @__PURE__ */ (0, X.jsxs)("section", {
			className: "modal verification-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Verification checks",
			onMouseDown: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "delivery-log-header",
				children: [/* @__PURE__ */ (0, X.jsxs)("div", { children: [
					/* @__PURE__ */ (0, X.jsx)("span", { children: "Verification" }),
					/* @__PURE__ */ (0, X.jsx)("strong", { children: "Checks" }),
					/* @__PURE__ */ (0, X.jsxs)("p", { children: [
						e.filter((e) => e.status === "passed").length,
						" passed · ",
						e.filter((e) => e.status === "failed").length,
						" failed · ",
						e.filter((e) => e.status === "skipped").length,
						" skipped"
					] })
				] }), /* @__PURE__ */ (0, X.jsx)("button", {
					className: "button secondary",
					onClick: t,
					children: "Close"
				})]
			}), /* @__PURE__ */ (0, X.jsx)("div", {
				className: "verification-list",
				children: e.map((e, t) => /* @__PURE__ */ (0, X.jsxs)("article", {
					className: "verification-check",
					children: [
						/* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: $(e.label) }), /* @__PURE__ */ (0, X.jsx)("span", { children: $(e.repository, "Workspace") })] }),
						/* @__PURE__ */ (0, X.jsx)(zg, { value: e.status }),
						/* @__PURE__ */ (0, X.jsx)("p", { children: $(e.summary, "No summary recorded.") }),
						e.command && /* @__PURE__ */ (0, X.jsx)("code", { children: e.command })
					]
				}, `${e.repository}-${e.id}-${t}`))
			})]
		})
	});
}
var R_ = {
	"01-role-and-mission.md": {
		title: "Mission",
		description: "Scope, role, and review posture",
		icon: pg
	},
	"02-pipeline.md": {
		title: "Pipeline",
		description: "End-to-end scan sequence",
		icon: vg
	},
	"03-configuration.md": {
		title: "Configuration",
		description: "Workspace and runtime inputs",
		icon: dg
	},
	"04-workspace-and-worktrees.md": {
		title: "Worktrees",
		description: "Repository isolation and refresh",
		icon: Zh
	},
	"05-review-only-mode.md": {
		title: "Review mode",
		description: "Lightweight validation boundaries",
		icon: lg
	},
	"06-issue-registry.md": {
		title: "Issue registry",
		description: "Finding persistence and status",
		icon: Bh
	},
	"07-error-handling.md": {
		title: "Error handling",
		description: "Failure recording and recovery",
		icon: Hh
	},
	"08-github-pr-and-git.md": {
		title: "Git and PR",
		description: "Branch, commit, and PR controls",
		icon: Zh
	},
	"09-severity-guideline.md": {
		title: "Severity",
		description: "Finding classification policy",
		icon: Bh
	},
	"10-findings-and-auto-fix.md": {
		title: "Findings",
		description: "Review output and safe fixes",
		icon: Wh
	},
	"11-output-contract.md": {
		title: "Output",
		description: "Structured result contract",
		icon: Yh
	},
	"12-secrets-and-safety.md": {
		title: "Safety",
		description: "Secret redaction and boundaries",
		icon: fg
	},
	"13-console-summary.md": {
		title: "Summary",
		description: "Console and report output",
		icon: Vh
	},
	"01-role.md": {
		title: "Delivery role",
		description: "Delivery agent scope",
		icon: pg
	},
	"02-workspace.md": {
		title: "Context",
		description: "Story, docs, and workspace inputs",
		icon: Zh
	},
	"03-implementation.md": {
		title: "Implementation",
		description: "Code changes and verification",
		icon: Wh
	},
	"04-output-contract.md": {
		title: "Outcome",
		description: "PR, JIRA, and result record",
		icon: Vh
	},
	"03-jira-context.md": {
		title: "Jira context",
		description: "Primary, related, and keyword context",
		icon: eg
	},
	"04-repository-scope.md": {
		title: "Repository scope",
		description: "Registered repository and worktree rules",
		icon: Zh
	},
	"05-patch-implementation.md": {
		title: "Implementation",
		description: "Minimal Bug or copy change",
		icon: Wh
	},
	"06-self-check.md": {
		title: "Self-check",
		description: "Focused validation evidence",
		icon: Vh
	},
	"07-blocked-question.md": {
		title: "Blocked question",
		description: "One answerable human question",
		icon: Uh
	},
	"08-git-and-publish.md": {
		title: "Git handoff",
		description: "Agent output and publish boundaries",
		icon: Zh
	},
	"09-output-contract.md": {
		title: "Output contract",
		description: "Structured patch result",
		icon: Yh
	},
	"10-secrets-and-safety.md": {
		title: "Safety",
		description: "Secrets and change boundaries",
		icon: fg
	},
	"11-console-summary.md": {
		title: "Summary",
		description: "Concise Agent handoff",
		icon: Vh
	},
	"coding-guideline.md": {
		title: "Code standard",
		description: "Repository-level coding guidance",
		icon: Yh
	}
};
function z_(e) {
	return R_[e.path] || {
		title: e.path.replace(/\.md$/, "").replace(/^\d+-/, ""),
		description: "Prompt fragment",
		icon: Yh
	};
}
function B_(e, t) {
	let n = e.path;
	return t === "delivery" ? [
		"01-role.md",
		"02-workspace.md",
		"coding-guideline.md"
	].includes(n) ? "Inputs & Governance" : n === "03-implementation.md" ? "Implementation" : "Delivery Outputs" : t === "patch" ? [
		"01-role-and-mission.md",
		"03-jira-context.md",
		"04-repository-scope.md",
		"10-secrets-and-safety.md"
	].includes(n) ? "Inputs & Governance" : [
		"02-pipeline.md",
		"05-patch-implementation.md",
		"06-self-check.md"
	].includes(n) ? "Patch Execution" : ["07-blocked-question.md", "08-git-and-publish.md"].includes(n) ? "Operational Controls" : "Patch Outputs" : [
		"01-role-and-mission.md",
		"03-configuration.md",
		"04-workspace-and-worktrees.md",
		"12-secrets-and-safety.md"
	].includes(n) ? "Inputs & Governance" : [
		"02-pipeline.md",
		"05-review-only-mode.md",
		"09-severity-guideline.md",
		"10-findings-and-auto-fix.md"
	].includes(n) ? "Review Execution" : [
		"06-issue-registry.md",
		"07-error-handling.md",
		"08-github-pr-and-git.md"
	].includes(n) ? "Operational Controls" : "Delivery Outputs";
}
function V_(e) {
	return e === "delivery" ? [
		{
			title: "Trigger",
			eyebrow: "ENTRY",
			layers: [],
			scripts: [{
				name: "delivery_scheduler.py",
				description: "Find an approved, eligible story"
			}, {
				name: "prepare_delivery_run.py",
				description: "Create the run record"
			}]
		},
		{
			title: "Context",
			eyebrow: "GROUNDING",
			layers: ["Inputs & Governance"],
			scripts: [{
				name: "capture_jira_context.py",
				description: "Read story, comments, and media"
			}, {
				name: "compose_delivery_prompt.py",
				description: "Assemble the agent context"
			}]
		},
		{
			title: "Implement",
			eyebrow: "AGENT",
			layers: ["Implementation"],
			scripts: [{
				name: "run-delivery.sh",
				description: "Execute in isolated worktrees"
			}]
		},
		{
			title: "Verify & recover",
			eyebrow: "CONTROL",
			layers: [],
			scripts: [{
				name: "run_delivery_verification.py",
				description: "Compile, test, and inspect"
			}, {
				name: "prepare_delivery_remediation.py",
				description: "Prepare a bounded retry"
			}]
		},
		{
			title: "Publish",
			eyebrow: "OUTCOME",
			layers: ["Delivery Outputs"],
			scripts: [{
				name: "finalize_delivery.py",
				description: "Commit, PR, JIRA, and notification"
			}]
		}
	] : e === "patch" ? [
		{
			title: "Capture",
			eyebrow: "ENTRY",
			layers: [],
			scripts: [{
				name: "patch_scheduler.py",
				description: "Find one eligible Task or Bug"
			}]
		},
		{
			title: "Context",
			eyebrow: "GROUNDING",
			layers: ["Inputs & Governance"],
			scripts: [{
				name: "capture_patch_context.py",
				description: "Read the Jira story neighborhood"
			}, {
				name: "compose_patch_prompt.py",
				description: "Assemble bounded patch context"
			}]
		},
		{
			title: "Patch",
			eyebrow: "AGENT",
			layers: ["Patch Execution"],
			scripts: [{
				name: "run-patch.sh",
				description: "Run in an isolated patch worktree"
			}]
		},
		{
			title: "Control",
			eyebrow: "SAFETY",
			layers: ["Operational Controls"],
			scripts: [{
				name: "finalize_patch.py",
				description: "Self-check, commit, and publish"
			}]
		},
		{
			title: "Outcome",
			eyebrow: "HANDOFF",
			layers: ["Patch Outputs"],
			scripts: []
		}
	] : [
		{
			title: "Trigger",
			eyebrow: "ENTRY",
			layers: [],
			scripts: [{
				name: "run-scan.sh",
				description: "Start a scheduled or manual scan"
			}]
		},
		{
			title: "Context",
			eyebrow: "GROUNDING",
			layers: ["Inputs & Governance"],
			scripts: [{
				name: "prepare_scan_worktrees.py",
				description: "Refresh isolated repository views"
			}, {
				name: "compose_scan_prompt.py",
				description: "Assemble review context"
			}]
		},
		{
			title: "Review",
			eyebrow: "AGENT",
			layers: ["Review Execution"],
			scripts: []
		},
		{
			title: "Control & remediate",
			eyebrow: "CONTROL",
			layers: ["Operational Controls"],
			scripts: [{
				name: "auto_fix_sync.py",
				description: "Apply and re-check safe fixes"
			}]
		},
		{
			title: "Report",
			eyebrow: "OUTCOME",
			layers: ["Delivery Outputs"],
			scripts: [{
				name: "render-report-and-notify.py",
				description: "HTML, PDF, dashboard, and Feishu"
			}]
		}
	];
}
function H_({ data: e, project: t, interact: n, notify: r }) {
	let i = e.interactive?.prompts || [], [a, o] = (0, N.useState)("scan"), [s, c] = (0, N.useState)(null), [l, u] = (0, N.useState)(""), [d, f] = (0, N.useState)(!1), [p, m] = (0, N.useState)({
		x: 0,
		y: 0,
		scale: 1
	}), [h, g] = (0, N.useState)(!1), _ = (0, N.useRef)(null), v = (0, N.useRef)(null), y = i.filter((e) => e.mode === a), b = async (e) => {
		c(e);
		try {
			let n = await Rg(`/api/prompt?mode=${encodeURIComponent(e.mode)}&path=${encodeURIComponent(e.path)}`, t);
			u(n.content);
		} catch (e) {
			r(e instanceof Error ? e.message : "Unable to load prompt", "error");
		}
	}, x = async () => {
		if (!(!s || d)) {
			f(!0);
			try {
				await n("/api/prompt", {
					mode: s.mode,
					path: s.path,
					content: l
				}, "Prompt saved");
			} finally {
				f(!1);
			}
		}
	}, S = (e) => {
		o(e), c(null), u(""), m({
			x: 0,
			y: 0,
			scale: 1
		});
	};
	(0, N.useEffect)(() => {
		if (!h) return;
		let e = (e) => {
			e.key === "Escape" && g(!1);
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [h]);
	let C = (0, N.useCallback)((e) => {
		e.preventDefault(), e.ctrlKey || e.metaKey ? m((t) => ({
			...t,
			scale: Math.max(.65, Math.min(1.55, t.scale * (e.deltaY > 0 ? .975 : 1.025)))
		})) : m((t) => ({
			...t,
			x: t.x - e.deltaX,
			y: t.y - e.deltaY
		}));
	}, []);
	(0, N.useEffect)(() => {
		let e = v.current;
		if (e) return e.addEventListener("wheel", C, { passive: !1 }), () => e.removeEventListener("wheel", C);
	}, [C]);
	let w = (e) => {
		e.target.closest("button,a,textarea,input") || (_.current = {
			id: e.pointerId,
			x: e.clientX,
			y: e.clientY
		}, e.currentTarget.setPointerCapture(e.pointerId));
	}, T = (e) => {
		if (!_.current || _.current.id !== e.pointerId) return;
		let t = e.clientX - _.current.x, n = e.clientY - _.current.y;
		_.current = {
			..._.current,
			x: e.clientX,
			y: e.clientY
		}, m((e) => ({
			...e,
			x: e.x + t,
			y: e.y + n
		}));
	}, E = (e) => {
		_.current?.id === e.pointerId && (_.current = null);
	}, ee = V_(a);
	return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [
		/* @__PURE__ */ (0, X.jsxs)("div", {
			className: "workflow-mode-switch",
			role: "tablist",
			children: [
				/* @__PURE__ */ (0, X.jsx)("button", {
					className: a === "scan" ? "active" : "",
					onClick: () => S("scan"),
					children: "Auto Scan"
				}),
				/* @__PURE__ */ (0, X.jsx)("button", {
					className: a === "delivery" ? "active" : "",
					onClick: () => S("delivery"),
					children: "Auto Delivery"
				}),
				/* @__PURE__ */ (0, X.jsx)("button", {
					className: a === "patch" ? "active" : "",
					onClick: () => S("patch"),
					children: "Auto Patch"
				})
			]
		}),
		/* @__PURE__ */ (0, X.jsx)(l_, {
			title: a === "scan" ? "Auto Scan Workflow" : a === "delivery" ? "Auto Delivery Workflow" : "Auto Patch Workflow",
			action: /* @__PURE__ */ (0, X.jsx)(c_, {
				label: h ? "Exit full screen" : "View full screen",
				onClick: () => g((e) => !e),
				children: h ? /* @__PURE__ */ (0, X.jsx)(ag, { size: 14 }) : /* @__PURE__ */ (0, X.jsx)(ig, { size: 14 })
			}),
			className: `workflow-panel ${h ? "workflow-panel-fullscreen" : ""}`,
			children: /* @__PURE__ */ (0, X.jsx)("div", {
				ref: v,
				className: "workflow-canvas workflow-viewport",
				onPointerDown: w,
				onPointerMove: T,
				onPointerUp: E,
				onPointerCancel: E,
				children: /* @__PURE__ */ (0, X.jsxs)("div", {
					className: "workflow-scale",
					style: { transform: `translate(${p.x}px, ${p.y}px) scale(${p.scale})` },
					children: [/* @__PURE__ */ (0, X.jsx)("div", {
						className: "workflow-columns",
						children: ee.map((e, t) => {
							let n = y.filter((t) => e.layers.includes(B_(t, a))), r = [...e.scripts.map((e) => ({
								kind: "script",
								script: e
							})), ...n.map((e) => ({
								kind: "prompt",
								prompt: e
							}))];
							return /* @__PURE__ */ (0, X.jsxs)("section", {
								className: "workflow-column",
								children: [
									/* @__PURE__ */ (0, X.jsxs)("header", { children: [/* @__PURE__ */ (0, X.jsx)("span", { children: e.eyebrow }), /* @__PURE__ */ (0, X.jsx)("strong", { children: e.title })] }),
									/* @__PURE__ */ (0, X.jsx)("div", {
										className: "workflow-node-stack",
										children: r.map((e, n) => {
											let r = `${t + 1}.${n + 1}`;
											if (e.kind === "script") return /* @__PURE__ */ (0, X.jsxs)("article", {
												className: "workflow-node script-node",
												children: [
													/* @__PURE__ */ (0, X.jsx)(mg, { size: 14 }),
													/* @__PURE__ */ (0, X.jsxs)("span", { children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: e.script.name }), /* @__PURE__ */ (0, X.jsx)("small", { children: e.script.description })] }),
													/* @__PURE__ */ (0, X.jsxs)("em", { children: [/* @__PURE__ */ (0, X.jsx)("b", { children: r }), " SCRIPT"] })
												]
											}, e.script.name);
											let i = e.prompt, a = z_(i), o = a.icon;
											return /* @__PURE__ */ (0, X.jsxs)("button", {
												className: `workflow-node prompt-node ${s?.mode === i.mode && s.path === i.path ? "selected" : ""}`,
												onClick: () => void b(i),
												children: [
													/* @__PURE__ */ (0, X.jsx)(o, { size: 14 }),
													/* @__PURE__ */ (0, X.jsxs)("span", { children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: a.title }), /* @__PURE__ */ (0, X.jsx)("small", { children: a.description })] }),
													/* @__PURE__ */ (0, X.jsxs)("em", { children: [/* @__PURE__ */ (0, X.jsx)("b", { children: r }), " PROMPT"] })
												]
											}, `${i.mode}/${i.path}`);
										})
									}),
									t < ee.length - 1 && /* @__PURE__ */ (0, X.jsx)("span", {
										className: "workflow-connector",
										"aria-hidden": "true"
									})
								]
							}, e.title);
						})
					}), /* @__PURE__ */ (0, X.jsxs)("div", {
						className: "workflow-retry",
						children: [/* @__PURE__ */ (0, X.jsx)(sg, { size: 14 }), /* @__PURE__ */ (0, X.jsxs)("span", { children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: a === "delivery" ? "Remediation retry" : a === "patch" ? "Blocked-question retry" : "Safe-fix re-review" }), /* @__PURE__ */ (0, X.jsx)("small", { children: a === "delivery" ? "Verification failure → prepare_delivery_remediation.py → implementation agent → verification" : a === "patch" ? "External Jira reply → capture context → rerun the complete patch flow" : "High-confidence finding → auto_fix_sync.py → focused validation → pull request" })] })]
					})]
				})
			})
		}),
		s && /* @__PURE__ */ (0, X.jsx)(U_, {
			item: s,
			content: l,
			saving: d,
			onChange: u,
			onClose: () => {
				d || (c(null), u(""));
			},
			onSave: () => void x()
		})
	] });
}
function U_({ item: e, content: t, saving: n, onChange: r, onClose: i, onSave: a }) {
	let o = z_(e);
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: n ? void 0 : i,
		children: /* @__PURE__ */ (0, X.jsxs)("section", {
			className: "modal prompt-inspector-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": `${o.title} prompt`,
			onMouseDown: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "prompt-inspector-header",
					children: [/* @__PURE__ */ (0, X.jsxs)("div", { children: [
						/* @__PURE__ */ (0, X.jsxs)("span", { children: [e.mode === "scan" ? "Auto Scan" : e.mode === "delivery" ? "Auto Delivery" : "Auto Patch", " prompt"] }),
						/* @__PURE__ */ (0, X.jsx)("strong", { children: o.title }),
						/* @__PURE__ */ (0, X.jsx)("code", { children: e.path })
					] }), /* @__PURE__ */ (0, X.jsx)("button", {
						className: "button secondary",
						disabled: n,
						onClick: i,
						children: "Close"
					})]
				}),
				/* @__PURE__ */ (0, X.jsx)("div", {
					className: "prompt-inspector-body",
					children: /* @__PURE__ */ (0, X.jsxs)("div", {
						className: "markdown-workbench",
						children: [/* @__PURE__ */ (0, X.jsxs)("label", {
							className: "markdown-pane",
							children: [/* @__PURE__ */ (0, X.jsx)("span", { children: "Original Markdown" }), /* @__PURE__ */ (0, X.jsx)("textarea", {
								value: t,
								onChange: (e) => r(e.target.value),
								spellCheck: !1,
								disabled: n
							})]
						}), /* @__PURE__ */ (0, X.jsxs)("article", {
							className: "markdown-preview",
							children: [/* @__PURE__ */ (0, X.jsx)("span", { children: "Preview" }), /* @__PURE__ */ (0, X.jsx)(Xg, { content: t })]
						})]
					})
				}),
				/* @__PURE__ */ (0, X.jsxs)("footer", { children: [/* @__PURE__ */ (0, X.jsx)("button", {
					className: "button",
					disabled: n,
					onClick: i,
					children: "Cancel"
				}), /* @__PURE__ */ (0, X.jsxs)("button", {
					className: `button primary${n ? " is-busy" : ""}`,
					disabled: n,
					onClick: a,
					children: [n ? /* @__PURE__ */ (0, X.jsx)(rg, {
						size: 14,
						className: "spin"
					}) : /* @__PURE__ */ (0, X.jsx)(cg, { size: 14 }), n ? "Saving…" : "Save prompt"]
				})] })
			]
		})
	});
}
function W_({ children: e }) {
	return /* @__PURE__ */ (0, X.jsxs)("details", {
		className: "field-help",
		children: [/* @__PURE__ */ (0, X.jsx)("summary", {
			"aria-label": "Explain this setting",
			children: /* @__PURE__ */ (0, X.jsx)(Uh, { size: 13 })
		}), /* @__PURE__ */ (0, X.jsx)("span", {
			role: "tooltip",
			children: e
		})]
	});
}
function G_({ label: e, help: t, children: n }) {
	return /* @__PURE__ */ (0, X.jsxs)("label", {
		className: "field",
		children: [/* @__PURE__ */ (0, X.jsxs)("span", {
			className: "field-label",
			children: [e, t && /* @__PURE__ */ (0, X.jsx)(W_, { children: t })]
		}), n]
	});
}
function K_({ options: e, value: t, onChange: n, markDirty: r }) {
	let i = (0, N.useRef)(null), [a, o] = (0, N.useState)(!1);
	(0, N.useEffect)(() => {
		let e = (e) => {
			i.current?.contains(e.target) || o(!1);
		}, t = (e) => {
			e.key === "Escape" && o(!1);
		};
		return document.addEventListener("pointerdown", e), document.addEventListener("keydown", t), () => {
			document.removeEventListener("pointerdown", e), document.removeEventListener("keydown", t);
		};
	}, []);
	let s = (e) => {
		n(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), r();
	}, c = t.length === 0 ? "Select statuses" : t.length === 1 ? t[0] : `${t.length} statuses selected`;
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		ref: i,
		className: `status-picker ${a ? "is-open" : ""}`,
		children: [/* @__PURE__ */ (0, X.jsxs)("button", {
			type: "button",
			className: "status-picker-trigger",
			"aria-label": "Eligible JIRA statuses",
			"aria-expanded": a,
			onClick: () => o((e) => !e),
			children: [/* @__PURE__ */ (0, X.jsx)("span", {
				className: `status-picker-summary ${t.length === 0 ? "placeholder" : ""}`,
				title: t.join(", "),
				children: c
			}), /* @__PURE__ */ (0, X.jsx)(Rh, {
				size: 15,
				"aria-hidden": "true"
			})]
		}), a && /* @__PURE__ */ (0, X.jsxs)("div", {
			className: "status-picker-menu",
			role: "listbox",
			"aria-label": "Eligible JIRA statuses",
			"aria-multiselectable": "true",
			children: [/* @__PURE__ */ (0, X.jsx)("div", {
				className: "status-picker-options",
				children: e.map((e) => {
					let n = t.includes(e);
					return /* @__PURE__ */ (0, X.jsxs)("button", {
						type: "button",
						role: "option",
						"aria-selected": n,
						className: `status-picker-option ${n ? "selected" : ""}`,
						onClick: () => s(e),
						children: [/* @__PURE__ */ (0, X.jsx)("span", {
							className: "status-picker-check",
							"aria-hidden": "true",
							children: n ? "✓" : ""
						}), /* @__PURE__ */ (0, X.jsx)("span", { children: e })]
					}, e);
				})
			}), /* @__PURE__ */ (0, X.jsxs)("footer", {
				className: "status-picker-footer",
				children: [/* @__PURE__ */ (0, X.jsxs)("span", { children: [t.length, " selected"] }), t.length > 0 && /* @__PURE__ */ (0, X.jsx)("button", {
					type: "button",
					onClick: () => {
						n([]), r();
					},
					children: "Clear"
				})]
			})]
		})]
	});
}
function q_({ label: e, value: t, onChange: n, markDirty: r }) {
	let i = Ng(t), a = Ag.some((e) => e.value === i), [o, s] = (0, N.useState)(!1), c = () => s(!0);
	return /* @__PURE__ */ (0, X.jsxs)(G_, {
		label: e,
		help: "Choose a preset, or select Custom and enter a model ID supported by Cursor. Lumen does not validate custom model availability.",
		children: [
			/* @__PURE__ */ (0, X.jsxs)("select", {
				value: a ? i : jg,
				onChange: (e) => {
					e.target.value === jg ? c() : (n(e.target.value), r());
				},
				children: [Ag.map((e) => /* @__PURE__ */ (0, X.jsx)("option", {
					value: e.value,
					children: e.label
				}, e.value)), /* @__PURE__ */ (0, X.jsx)("option", {
					value: jg,
					children: "Custom Cursor model ID…"
				})]
			}),
			!a && /* @__PURE__ */ (0, X.jsx)("button", {
				type: "button",
				className: "custom-model-edit",
				onClick: c,
				children: "Edit custom model"
			}),
			o && /* @__PURE__ */ (0, X.jsx)(J_, {
				label: e,
				value: t,
				onClose: () => s(!1),
				onConfirm: (e) => {
					n(e), r(), s(!1);
				}
			})
		]
	});
}
function J_({ label: e, value: t, onClose: n, onConfirm: r }) {
	let [i, a] = (0, N.useState)(t);
	return (0, N.useEffect)(() => {
		let e = (e) => {
			e.key === "Escape" && n();
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [n]), /* @__PURE__ */ (0, X.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: n,
		children: /* @__PURE__ */ (0, X.jsxs)("section", {
			className: "modal custom-model-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "custom-model-title",
			onMouseDown: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "custom-model-header",
					children: [/* @__PURE__ */ (0, X.jsx)("strong", {
						id: "custom-model-title",
						children: "Enter a custom Cursor model"
					}), /* @__PURE__ */ (0, X.jsxs)("p", { children: [e, " · Use a model ID supported by Cursor."] })]
				}),
				/* @__PURE__ */ (0, X.jsxs)("div", {
					className: "modal-body compact",
					children: [/* @__PURE__ */ (0, X.jsx)(G_, {
						label: "Cursor model ID",
						children: /* @__PURE__ */ (0, X.jsx)("input", {
							autoFocus: !0,
							value: i,
							placeholder: "e.g. cursor-grok-4.5-medium",
							"aria-label": "Custom Cursor model ID",
							onChange: (e) => a(e.target.value)
						})
					}), /* @__PURE__ */ (0, X.jsx)("p", {
						className: "modal-copy",
						children: "Lumen does not validate model availability. The value will be used on the next run."
					})]
				}),
				/* @__PURE__ */ (0, X.jsxs)("footer", { children: [/* @__PURE__ */ (0, X.jsx)("button", {
					type: "button",
					className: "button",
					onClick: n,
					children: "Cancel"
				}), /* @__PURE__ */ (0, X.jsx)("button", {
					type: "button",
					className: "button primary",
					disabled: !i.trim(),
					onClick: () => {
						let e = i.trim();
						e && r(e);
					},
					children: "Confirm"
				})] })
			]
		})
	});
}
function Y_({ data: e, interact: t }) {
	let n = e.interactive?.workspace || {}, [r, i] = (0, N.useState)(n.repositories || []), [a, o] = (0, N.useState)(!1), [s, c] = (0, N.useState)(!1), [l, u] = (0, N.useState)(null), [d, f] = (0, N.useState)(!1), [p, m] = (0, N.useState)("all");
	(0, N.useEffect)(() => {
		a || i(n.repositories || []);
	}, [n.repositories, a]);
	let h = (e, t) => {
		o(!0), i((n) => n.map((n, r) => r === e ? {
			...n,
			...t
		} : n));
	}, g = (e) => (e.delivery_steps || []).map((e) => Array.isArray(e.command) ? e.command.join(" ") : "").filter(Boolean).join("\n"), _ = (e) => ({
		scan: { allow_auto_fix: e.automation?.scan?.allow_auto_fix ?? e.allow_auto_fix !== !1 },
		delivery: { enabled: e.automation?.delivery?.enabled !== !1 },
		patch: { enabled: e.automation?.patch?.enabled ?? !0 }
	}), v = (e, t, n) => {
		o(!0), i((r) => r.map((r, i) => i === e ? {
			...r,
			automation: {
				..._(r),
				[t]: {
					..._(r)[t],
					...n
				}
			}
		} : r));
	}, y = async () => {
		if (!(!a || s)) {
			c(!0);
			try {
				await t("/api/repositories", { repositories: r }, "Repository governance saved") && o(!1);
			} finally {
				c(!1);
			}
		}
	}, b = (e) => {
		let t = e.health || {}, n = [];
		return t.git_status === "changes" && n.push("Uncommitted changes"), t.git_status === "behind" && n.push("Branch behind remote"), t.git_status === "diverged" && n.push("Branch diverged"), t.sync_status === "behind" && n.push("Sync behind remote"), t.sync_status === "diverged" && n.push("Sync diverged"), Array.from(new Set(n));
	}, x = (e) => `${e.java_version ? `Java ${e.java_version}` : e.node_version ? `Node.js ${e.node_version}` : e.language || "Generic"} · ${e.build_tools?.join(", ") || "No build tool detected"}`, S = (e) => {
		let t = $(e, "Not configured");
		return /* @__PURE__ */ (0, X.jsx)("span", {
			className: "repository-fact-value",
			"data-tooltip": t,
			title: t,
			tabIndex: 0,
			"aria-label": t,
			children: /* @__PURE__ */ (0, X.jsx)("code", { children: t })
		});
	}, C = r.filter((e) => b(e).length > 0).length, w = r.filter((e) => _(e).scan.allow_auto_fix).length, T = r.filter((e) => _(e).delivery.enabled).length, E = r.filter((e) => _(e).patch.enabled).length, ee = r.filter((e) => p === "all" || p === "patch" && _(e).patch.enabled || p === "attention" && b(e).length > 0), D = l ? r.find((e) => e.name === l) : null, O = D ? r.indexOf(D) : -1, k = D?.health || {}, te = D ? _(D) : null;
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "repository-page",
		children: [
			/* @__PURE__ */ (0, X.jsxs)(l_, {
				title: "Repository Governance",
				action: /* @__PURE__ */ (0, X.jsx)("button", {
					className: "button secondary",
					onClick: () => f(!0),
					children: "Add repository"
				}),
				children: [
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "repository-intro",
						children: [
							"Connect repositories by Git URL. Lumen clones them into ",
							/* @__PURE__ */ (0, X.jsx)("code", { children: "repos/" }),
							", detects runtime and build tooling, then lets you approve the automation that may change or publish code."
						]
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "repository-overview",
						children: [
							/* @__PURE__ */ (0, X.jsx)(P_, {
								label: "Registered",
								value: r.length
							}),
							/* @__PURE__ */ (0, X.jsx)(P_, {
								label: "Needs attention",
								value: C
							}),
							/* @__PURE__ */ (0, X.jsx)(P_, {
								label: "Auto Scan",
								value: `${w}/${r.length} enabled`
							}),
							/* @__PURE__ */ (0, X.jsx)(P_, {
								label: "Auto Delivery",
								value: `${T}/${r.length} enabled`
							}),
							/* @__PURE__ */ (0, X.jsx)(P_, {
								label: "Auto Patch",
								value: `${E}/${r.length} enabled`
							})
						]
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "repository-filters",
						children: [
							/* @__PURE__ */ (0, X.jsxs)("button", {
								className: p === "all" ? "active" : "",
								onClick: () => m("all"),
								children: [
									"All (",
									r.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, X.jsxs)("button", {
								className: p === "attention" ? "active" : "",
								onClick: () => m("attention"),
								children: [
									"Needs attention (",
									C,
									")"
								]
							}),
							/* @__PURE__ */ (0, X.jsxs)("button", {
								className: p === "patch" ? "active" : "",
								onClick: () => m("patch"),
								children: [
									"Auto Patch enabled (",
									E,
									")"
								]
							})
						]
					}),
					p === "attention" && /* @__PURE__ */ (0, X.jsxs)("div", {
						className: "repository-filter-note",
						children: [/* @__PURE__ */ (0, X.jsx)(Bh, {
							size: 14,
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, X.jsx)("span", { children: "Needs attention means uncommitted changes, a branch behind remote, or a diverged branch/sync." })]
					}),
					/* @__PURE__ */ (0, X.jsx)("div", {
						className: "repository-list",
						children: /* @__PURE__ */ (0, X.jsxs)("div", {
							className: "repository-grid",
							children: [ee.map((e) => {
								let t = e.health || {}, n = _(e);
								return /* @__PURE__ */ (0, X.jsx)("article", {
									className: "repository-card",
									children: /* @__PURE__ */ (0, X.jsxs)("button", {
										type: "button",
										className: "repository-card-button",
										onClick: () => u(e.name),
										"aria-label": `Edit ${e.name || "repository"}`,
										children: [/* @__PURE__ */ (0, X.jsxs)("div", {
											className: "repository-card-heading",
											children: [/* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: e.name || "Unnamed repository" }), /* @__PURE__ */ (0, X.jsx)("span", { children: x(t) })] }), /* @__PURE__ */ (0, X.jsx)(zh, {
												size: 16,
												"aria-hidden": "true"
											})]
										}), /* @__PURE__ */ (0, X.jsxs)("div", {
											className: "repository-card-bottom",
											children: [/* @__PURE__ */ (0, X.jsxs)("div", {
												className: "repository-card-permissions",
												children: [
													/* @__PURE__ */ (0, X.jsxs)("span", {
														className: n.scan.allow_auto_fix ? "enabled" : "disabled",
														children: ["Auto Scan ", n.scan.allow_auto_fix ? "enabled" : "disabled"]
													}),
													/* @__PURE__ */ (0, X.jsxs)("span", {
														className: n.delivery.enabled ? "enabled" : "disabled",
														children: ["Auto Delivery ", n.delivery.enabled ? "enabled" : "disabled"]
													}),
													/* @__PURE__ */ (0, X.jsxs)("span", {
														className: n.patch.enabled ? "enabled" : "disabled",
														children: ["Auto Patch ", n.patch.enabled ? "enabled" : "disabled"]
													})
												]
											}), /* @__PURE__ */ (0, X.jsxs)("span", {
												className: "repository-card-branch",
												children: [/* @__PURE__ */ (0, X.jsx)(Zh, {
													size: 12,
													"aria-hidden": "true"
												}), e.default_branch || "main"]
											})]
										})]
									})
								}, e.name);
							}), ee.length === 0 && /* @__PURE__ */ (0, X.jsx)(v_, { label: "No repositories match this view." })]
						})
					})
				]
			}),
			D && O >= 0 && te && /* @__PURE__ */ (0, X.jsx)("div", {
				className: "modal-backdrop repository-config-backdrop",
				role: "presentation",
				onMouseDown: () => u(null),
				children: /* @__PURE__ */ (0, X.jsxs)("section", {
					className: "modal repository-config-modal",
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "repository-config-title",
					onMouseDown: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, X.jsxs)("header", {
							className: "repository-config-header",
							children: [/* @__PURE__ */ (0, X.jsxs)("div", { children: [
								/* @__PURE__ */ (0, X.jsx)("span", { children: "Repository configuration" }),
								/* @__PURE__ */ (0, X.jsx)("strong", {
									id: "repository-config-title",
									children: D.name || "Unnamed repository"
								}),
								/* @__PURE__ */ (0, X.jsxs)("p", { children: [
									k.language || "Generic",
									" · ",
									k.build_tools?.join(", ") || "No build tool detected",
									" · ",
									D.default_branch || "main"
								] })
							] }), /* @__PURE__ */ (0, X.jsx)(c_, {
								label: "Close repository configuration",
								onClick: () => u(null),
								children: /* @__PURE__ */ (0, X.jsx)(yg, { size: 15 })
							})]
						}),
						/* @__PURE__ */ (0, X.jsx)("div", {
							className: "repository-config-body",
							children: /* @__PURE__ */ (0, X.jsxs)("div", {
								className: "repository-editor",
								children: [
									/* @__PURE__ */ (0, X.jsxs)("section", {
										className: "repository-section",
										children: [
											/* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: "Identity & connection" }), /* @__PURE__ */ (0, X.jsx)("span", { children: "Detected locally; the default branch is the only editable connection setting." })] }),
											/* @__PURE__ */ (0, X.jsxs)("div", {
												className: "repository-facts",
												children: [
													/* @__PURE__ */ (0, X.jsx)(P_, {
														label: "Local path",
														value: S(D.path)
													}),
													/* @__PURE__ */ (0, X.jsx)(P_, {
														label: "Remote",
														value: S(k.remote_url || D.remote_url)
													}),
													/* @__PURE__ */ (0, X.jsx)(P_, {
														label: "Git status",
														value: /* @__PURE__ */ (0, X.jsx)(zg, { value: k.git_status || "unknown" })
													}),
													/* @__PURE__ */ (0, X.jsx)(P_, {
														label: "Branch sync",
														value: /* @__PURE__ */ (0, X.jsx)(zg, { value: k.sync_status || "unknown" })
													})
												]
											}),
											/* @__PURE__ */ (0, X.jsx)("div", {
												className: "form-grid compact",
												children: /* @__PURE__ */ (0, X.jsx)(G_, {
													label: "Default branch",
													children: /* @__PURE__ */ (0, X.jsx)("select", {
														value: D.default_branch || "",
														onChange: (e) => h(O, { default_branch: e.target.value }),
														children: Array.from(new Set([D.default_branch, ...D.branches || []].filter(Boolean))).map((e) => /* @__PURE__ */ (0, X.jsx)("option", {
															value: e,
															children: e
														}, e))
													})
												})
											})
										]
									}),
									/* @__PURE__ */ (0, X.jsxs)("section", {
										className: "repository-section",
										children: [/* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: "Runtime & build" }), /* @__PURE__ */ (0, X.jsx)("span", { children: "Detected from repository files. These values are read-only until the repository changes." })] }), /* @__PURE__ */ (0, X.jsxs)("div", {
											className: "repository-facts",
											children: [
												/* @__PURE__ */ (0, X.jsx)(P_, {
													label: "Language",
													value: k.language || "Generic"
												}),
												/* @__PURE__ */ (0, X.jsx)(P_, {
													label: "Java",
													value: k.java_version ? `Java ${k.java_version}` : "Not detected"
												}),
												/* @__PURE__ */ (0, X.jsx)(P_, {
													label: "Node",
													value: k.node_version ? `Node ${k.node_version}` : "Not detected"
												}),
												/* @__PURE__ */ (0, X.jsx)(P_, {
													label: "Build tools",
													value: k.build_tools?.join(", ") || "Not detected"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, X.jsxs)("section", {
										className: "repository-section",
										children: [
											/* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: "Automation permissions" }), /* @__PURE__ */ (0, X.jsx)("span", { children: "Auto Scan fixes, Auto Delivery, and Auto Patch are controlled independently. Auto Patch is enabled by default for registered repositories." })] }),
											/* @__PURE__ */ (0, X.jsxs)("div", {
												className: "repository-policy-grid",
												children: [
													/* @__PURE__ */ (0, X.jsxs)("label", { children: [/* @__PURE__ */ (0, X.jsx)("input", {
														type: "checkbox",
														checked: te.scan.allow_auto_fix,
														onChange: (e) => v(O, "scan", { allow_auto_fix: e.target.checked })
													}), /* @__PURE__ */ (0, X.jsxs)("span", { children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: "Auto Scan fixes" }), /* @__PURE__ */ (0, X.jsx)("small", { children: "Allow high-confidence Scan fixes and their configured publish flow." })] })] }),
													/* @__PURE__ */ (0, X.jsxs)("label", { children: [/* @__PURE__ */ (0, X.jsx)("input", {
														type: "checkbox",
														checked: te.delivery.enabled,
														onChange: (e) => v(O, "delivery", { enabled: e.target.checked })
													}), /* @__PURE__ */ (0, X.jsxs)("span", { children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: "Auto Delivery" }), /* @__PURE__ */ (0, X.jsx)("small", { children: "Allow approved technical delivery work for this repository." })] })] }),
													/* @__PURE__ */ (0, X.jsxs)("label", { children: [/* @__PURE__ */ (0, X.jsx)("input", {
														type: "checkbox",
														checked: te.patch.enabled,
														onChange: (e) => v(O, "patch", { enabled: e.target.checked })
													}), /* @__PURE__ */ (0, X.jsxs)("span", { children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: "Auto Patch" }), /* @__PURE__ */ (0, X.jsx)("small", { children: "Allow Jira-driven fixes and publishing for this repository." })] })] })
												]
											}),
											/* @__PURE__ */ (0, X.jsx)("p", {
												className: "repository-policy-note",
												children: "Frontend delivery remains disabled globally and cannot be enabled here."
											})
										]
									}),
									/* @__PURE__ */ (0, X.jsxs)("section", {
										className: "repository-section",
										children: [
											/* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: "Delivery verification" }), /* @__PURE__ */ (0, X.jsx)("span", { children: "Leave this empty to use the repository profile detected at run time. Add commands only when this repository needs an explicit override." })] }),
											k.suggested_commands?.length > 0 && /* @__PURE__ */ (0, X.jsxs)("button", {
												className: "text-button",
												onClick: () => h(O, { delivery_commands: k.suggested_commands.join("\n") }),
												children: [
													"Use ",
													k.suggested_commands.length,
													" suggested command",
													k.suggested_commands.length === 1 ? "" : "s"
												]
											}),
											/* @__PURE__ */ (0, X.jsx)("label", {
												className: "field repository-commands",
												children: /* @__PURE__ */ (0, X.jsx)("textarea", {
													value: D.delivery_commands ?? g(D),
													rows: 4,
													placeholder: "Optional override; one command per line.",
													onChange: (e) => h(O, { delivery_commands: e.target.value })
												})
											})
										]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, X.jsx)("footer", {
							className: "repository-config-footer",
							children: /* @__PURE__ */ (0, X.jsxs)("div", {
								className: "repository-config-actions",
								children: [/* @__PURE__ */ (0, X.jsx)("button", {
									type: "button",
									className: "button",
									disabled: s,
									onClick: () => u(null),
									children: "Close"
								}), /* @__PURE__ */ (0, X.jsxs)("button", {
									type: "button",
									className: `button primary${s ? " is-busy" : ""}`,
									disabled: !a || s,
									onClick: () => void y(),
									children: [s ? /* @__PURE__ */ (0, X.jsx)(rg, {
										size: 15,
										className: "spin"
									}) : /* @__PURE__ */ (0, X.jsx)(cg, { size: 15 }), s ? "Saving…" : "Save"]
								})]
							})
						})
					]
				})
			}),
			d && /* @__PURE__ */ (0, X.jsx)(X_, {
				onClose: () => f(!1),
				onAdd: (e) => {
					t("/api/repositories/clone", { url: e }, "Repository cloned and registered"), f(!1);
				}
			})
		]
	});
}
function X_({ onClose: e, onAdd: t }) {
	let [n, r] = (0, N.useState)("");
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: e,
		children: /* @__PURE__ */ (0, X.jsxs)("section", {
			className: "modal repository-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Add repository",
			onMouseDown: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, X.jsx)("div", {
					className: "prompt-inspector-header",
					children: /* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)("strong", { children: "Add repository" }), /* @__PURE__ */ (0, X.jsx)("span", {
						className: "repository-modal-description",
						children: "Lumen clones the Git URL, detects the branch and tooling, enables existing Scan and Delivery behavior, and authorizes Auto Patch by default."
					})] })
				}),
				/* @__PURE__ */ (0, X.jsx)("div", {
					className: "repository-modal-body",
					children: /* @__PURE__ */ (0, X.jsx)(G_, {
						label: "Clone URL",
						children: /* @__PURE__ */ (0, X.jsx)("input", {
							autoFocus: !0,
							value: n,
							placeholder: "https://git.example.com/team/service.git",
							onChange: (e) => r(e.target.value)
						})
					})
				}),
				/* @__PURE__ */ (0, X.jsxs)("footer", { children: [/* @__PURE__ */ (0, X.jsx)("button", {
					className: "button",
					onClick: e,
					children: "Cancel"
				}), /* @__PURE__ */ (0, X.jsx)("button", {
					className: "button primary",
					disabled: !n.trim(),
					onClick: () => t(n.trim()),
					children: "Clone and inspect"
				})] })
			]
		})
	});
}
function Z_({ data: e, project: t, notify: n, onDirtyChange: r, reload: i }) {
	let a = e.interactive?.workspace || {}, o = e.interactive?.schedules || {}, [s, c] = (0, N.useState)(String(a.scan_window_days || 7)), [l, u] = (0, N.useState)(String(o.scan?.cron || "0 12 * * 1-5")), [d, f] = (0, N.useState)(!!o.scan), [p, m] = (0, N.useState)(String(Math.round((o.delivery?.interval_seconds || 300) / 60))), [h, g] = (0, N.useState)(Array.isArray(o.delivery?.jira_statuses) ? o.delivery.jira_statuses.map(String) : String(o.delivery?.jira_status || "To Do,Backlog,In Progress").split(",").map((e) => e.trim()).filter(Boolean)), [_, v] = (0, N.useState)(String(o.delivery?.in_dev_status || "")), [y, b] = (0, N.useState)(String(o.delivery?.dev_done_status || "")), [x, S] = (0, N.useState)(String(o.delivery?.blocked_status || "Block")), [C, w] = (0, N.useState)(!!o.delivery?.enabled), [T, E] = (0, N.useState)(String(Math.round((o.patch?.interval_seconds || 300) / 60))), [ee, D] = (0, N.useState)(Array.isArray(o.patch?.jira_statuses) ? o.patch.jira_statuses.map(String) : ["To Do"]), [O, k] = (0, N.useState)(String(o.patch?.in_progress_status || "In Progress")), [te, ne] = (0, N.useState)(String(o.patch?.done_status || "Done")), [A, j] = (0, N.useState)(String(o.patch?.blocked_status || "Block")), [re, ie] = (0, N.useState)(!!o.patch?.enabled), [ae, oe] = (0, N.useState)(Mg(a.models?.scan)), [se, M] = (0, N.useState)(Mg(a.models?.delivery)), [ce, le] = (0, N.useState)(Mg(a.models?.patch)), [ue, de] = (0, N.useState)([]), [fe, pe] = (0, N.useState)({}), [me, he] = (0, N.useState)({}), [ge, _e] = (0, N.useState)(String(a.publish?.scan || "pr")), [ve, ye] = (0, N.useState)(String(a.publish?.delivery || "pr")), [be, xe] = (0, N.useState)(String(a.publish?.patch || "pr")), [Se, Ce] = (0, N.useState)(a.feishu_notifications_enabled !== !1), [we, P] = (0, N.useState)(!1), [Te, Ee] = (0, N.useState)(!1), De = () => {
		Ee(!0), r(!0);
	};
	(0, N.useEffect)(() => {
		Rg("/api/delivery/status-options", t).then((e) => de(Array.isArray(e.options) ? e.options.map(String) : [])).catch(() => de([]));
	}, [t]), (0, N.useEffect)(() => {
		c(String(a.scan_window_days || 7)), u(String(o.scan?.cron || "0 12 * * 1-5")), f(!!o.scan), m(String(Math.round((o.delivery?.interval_seconds || 300) / 60))), g(Array.isArray(o.delivery?.jira_statuses) ? o.delivery.jira_statuses.map(String) : String(o.delivery?.jira_status || "To Do,Backlog,In Progress").split(",").map((e) => e.trim()).filter(Boolean)), v(String(o.delivery?.in_dev_status || "")), b(String(o.delivery?.dev_done_status || "")), S(String(o.delivery?.blocked_status || "Block")), w(!!o.delivery?.enabled), E(String(Math.round((o.patch?.interval_seconds || 300) / 60))), D(Array.isArray(o.patch?.jira_statuses) ? o.patch.jira_statuses.map(String) : ["To Do"]), k(String(o.patch?.in_progress_status || "In Progress")), ne(String(o.patch?.done_status || "Done")), j(String(o.patch?.blocked_status || "Block")), ie(!!o.patch?.enabled), oe(Mg(a.models?.scan)), M(Mg(a.models?.delivery)), le(Mg(a.models?.patch)), Ce(a.feishu_notifications_enabled !== !1), pe({}), he({}), Ee(!1), r(!1);
	}, [t]), (0, N.useEffect)(() => {
		_e(String(a.publish?.scan || "pr")), ye(String(a.publish?.delivery || "pr")), xe(String(a.publish?.patch || "pr"));
	}, [
		a.publish?.scan,
		a.publish?.delivery,
		a.publish?.patch
	]), (0, N.useEffect)(() => {
		Ce(a.feishu_notifications_enabled !== !1);
	}, [a.feishu_notifications_enabled]), (0, N.useEffect)(() => {
		let e = (e) => {
			Te && (e.preventDefault(), e.returnValue = "");
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, [Te]);
	let Oe = async (e) => {
		let n = await Rg(`/api/integration?key=${encodeURIComponent(e)}`, t);
		return String(n.value);
	}, ke = async (e) => {
		try {
			let t = await Oe(e);
			pe((n) => ({
				...n,
				[e]: t
			})), n("Integration value revealed", "success");
		} catch (e) {
			n(e instanceof Error ? e.message : "Unable to reveal value", "error");
		}
	}, Ae = async (e) => {
		try {
			let t = await Oe(e);
			await navigator.clipboard.writeText(t), n("Integration value copied", "success");
		} catch (e) {
			n(e instanceof Error ? e.message : "Unable to copy value", "error");
		}
	}, je = a.configured_integrations || [], Me = Array.from(new Set([
		"To Do",
		"Backlog",
		"In Progress",
		"Done",
		"Block",
		...ue,
		...h,
		...ee,
		_,
		y,
		O,
		te,
		A
	].filter(Boolean))), Ne = Array.isArray(o.delivery?.jira_statuses) ? o.delivery.jira_statuses.map(String) : String(o.delivery?.jira_status || "To Do,Backlog,In Progress").split(",").map((e) => e.trim()).filter(Boolean), Pe = Array.isArray(o.patch?.jira_statuses) ? o.patch.jira_statuses.map(String) : ["To Do"], Fe = (e, t) => e.length === t.length && e.every((e, n) => e === t[n]), Ie = d !== !!o.scan || d && l !== String(o.scan?.cron || "0 12 * * 1-5"), Le = C !== !!o.delivery?.enabled || C && (p !== String(Math.round((o.delivery?.interval_seconds || 300) / 60)) || !Fe(h, Ne) || _ !== String(o.delivery?.in_dev_status || "") || y !== String(o.delivery?.dev_done_status || "") || x !== String(o.delivery?.blocked_status || "Block")), Re = re !== !!o.patch?.enabled || re && (T !== String(Math.round((o.patch?.interval_seconds || 300) / 60)) || !Fe(ee, Pe) || O !== String(o.patch?.in_progress_status || "In Progress") || te !== String(o.patch?.done_status || "Done") || A !== String(o.patch?.blocked_status || "Block")), ze = ge !== String(a.publish?.scan || "pr") || ve !== String(a.publish?.delivery || "pr") || be !== String(a.publish?.patch || "pr"), Be = async () => {
		if (!we) {
			P(!0);
			try {
				if (!ae.trim() || !se.trim() || !ce.trim()) throw Error("Choose a preset or enter a Cursor-supported model ID for all workflows.");
				let e = [() => Rg("/api/workspace", t, {
					method: "POST",
					json: {
						scan_window_days: Number(s),
						scan_model: ae.trim(),
						delivery_model: se.trim(),
						patch_model: ce.trim(),
						feishu_notifications_enabled: Se
					}
				}), ...Object.entries(me).map(([e, n]) => () => Rg("/api/integration", t, {
					method: "POST",
					json: {
						key: e,
						value: n
					}
				}))];
				Ie && e.push(() => Rg("/api/schedule", t, {
					method: "POST",
					json: d ? {
						kind: "scan",
						action: "save",
						cron: l
					} : {
						kind: "scan",
						action: "remove"
					}
				})), Le && e.push(() => Rg("/api/schedule", t, {
					method: "POST",
					json: C ? {
						kind: "delivery",
						action: "save",
						interval_minutes: Number(p),
						jira_statuses: h,
						in_dev_status: _,
						dev_done_status: y,
						blocked_status: x
					} : {
						kind: "delivery",
						action: "remove"
					}
				})), Re && e.push(() => Rg("/api/schedule", t, {
					method: "POST",
					json: re ? {
						kind: "patch",
						action: "save",
						interval_minutes: Number(T),
						jira_statuses: ee,
						issue_types: ["Task", "Bug"],
						in_progress_status: O,
						done_status: te,
						blocked_status: A
					} : {
						kind: "patch",
						action: "remove"
					}
				})), ze && e.push(() => Rg("/api/publish-policy", t, {
					method: "POST",
					json: {
						scan_mode: ge,
						delivery_mode: ve,
						patch_mode: be
					}
				}));
				for (let t of e) await t();
				he({}), Ee(!1), r(!1), n("Settings saved", "success"), i();
			} catch (e) {
				n(e instanceof Error ? e.message : "Unable to save Settings", "error");
			} finally {
				P(!1);
			}
		}
	};
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "settings-stack",
		children: [
			/* @__PURE__ */ (0, X.jsxs)(l_, {
				title: "Automation Schedules",
				children: [
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "settings-section",
						children: [
							/* @__PURE__ */ (0, X.jsxs)("div", {
								className: "settings-copy",
								children: [/* @__PURE__ */ (0, X.jsx)("div", {
									className: "settings-heading",
									children: /* @__PURE__ */ (0, X.jsx)("div", {
										className: "settings-title-stack",
										children: /* @__PURE__ */ (0, X.jsx)("h4", { children: "Auto Scan" })
									})
								}), /* @__PURE__ */ (0, X.jsx)("p", { children: $(o.scan?.description, "No recurring scan is configured.") })]
							}),
							/* @__PURE__ */ (0, X.jsx)("div", {
								className: "settings-control wide",
								children: /* @__PURE__ */ (0, X.jsxs)("div", {
									className: "form-grid compact scan-settings-fields",
									style: {
										display: "grid",
										gridTemplateColumns: "1fr 1fr",
										gap: 12,
										padding: 0,
										width: "100%"
									},
									children: [/* @__PURE__ */ (0, X.jsx)(G_, {
										label: "Lookback, days",
										children: /* @__PURE__ */ (0, X.jsx)("input", {
											type: "number",
											min: "1",
											max: "365",
											value: s,
											onChange: (e) => {
												c(e.target.value), De();
											}
										})
									}), /* @__PURE__ */ (0, X.jsx)(G_, {
										label: "Five-field cron",
										children: /* @__PURE__ */ (0, X.jsx)("input", {
											value: l,
											onChange: (e) => {
												u(e.target.value), De();
											}
										})
									})]
								})
							}),
							/* @__PURE__ */ (0, X.jsx)("div", {
								className: "settings-toggle",
								children: /* @__PURE__ */ (0, X.jsx)(Q_, {
									enabled: d,
									onChange: (e) => {
										f(e), De();
									}
								})
							})
						]
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "settings-section divider",
						children: [
							/* @__PURE__ */ (0, X.jsxs)("div", {
								className: "settings-copy",
								children: [/* @__PURE__ */ (0, X.jsx)("div", {
									className: "settings-heading",
									children: /* @__PURE__ */ (0, X.jsx)("div", {
										className: "settings-title-stack",
										children: /* @__PURE__ */ (0, X.jsx)("h4", { children: "Auto Delivery" })
									})
								}), /* @__PURE__ */ (0, X.jsx)("p", { children: C ? `Polling every ${p} minute(s).` : "Delivery polling is paused." })]
							}),
							/* @__PURE__ */ (0, X.jsxs)("div", {
								className: "settings-control wide",
								children: [/* @__PURE__ */ (0, X.jsxs)("div", {
									className: "form-grid compact",
									children: [
										/* @__PURE__ */ (0, X.jsx)(G_, {
											label: "Interval, minutes",
											children: /* @__PURE__ */ (0, X.jsx)("input", {
												type: "number",
												min: "1",
												value: p,
												onChange: (e) => {
													m(e.target.value), De();
												}
											})
										}),
										/* @__PURE__ */ (0, X.jsx)(G_, {
											label: "Eligible JIRA statuses",
											help: "Select every Jira status that may start Auto Delivery. The Story must also be Business Ready, Technical Approved, and not already running.",
											children: /* @__PURE__ */ (0, X.jsx)(K_, {
												options: Me,
												value: h,
												onChange: g,
												markDirty: De
											})
										}),
										/* @__PURE__ */ (0, X.jsx)(G_, {
											label: "Move to when started",
											children: /* @__PURE__ */ (0, X.jsx)("select", {
												value: _,
												onChange: (e) => {
													v(e.target.value), De();
												},
												children: Me.map((e) => /* @__PURE__ */ (0, X.jsx)("option", {
													value: e,
													children: e
												}, e))
											})
										}),
										/* @__PURE__ */ (0, X.jsx)(G_, {
											label: "Move to when completed",
											children: /* @__PURE__ */ (0, X.jsx)("select", {
												value: y,
												onChange: (e) => {
													b(e.target.value), De();
												},
												children: Me.map((e) => /* @__PURE__ */ (0, X.jsx)("option", {
													value: e,
													children: e
												}, e))
											})
										}),
										/* @__PURE__ */ (0, X.jsx)(G_, {
											label: "Move to when failed",
											children: /* @__PURE__ */ (0, X.jsx)("select", {
												value: x,
												onChange: (e) => {
													S(e.target.value), De();
												},
												children: Array.from(/* @__PURE__ */ new Set([...Me, "Block"])).map((e) => /* @__PURE__ */ (0, X.jsx)("option", {
													value: e,
													children: e
												}, e))
											})
										})
									]
								}), /* @__PURE__ */ (0, X.jsx)("p", {
									className: "schedule-note",
									children: "Select To Do, Backlog, In Progress, or any other eligible Jira status. On failure, Lumen moves the Jira card to the selected Block status and adds a Needs attention comment."
								})]
							}),
							/* @__PURE__ */ (0, X.jsx)("div", {
								className: "settings-toggle",
								children: /* @__PURE__ */ (0, X.jsx)(Q_, {
									enabled: C,
									onChange: (e) => {
										w(e), De();
									}
								})
							})
						]
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "settings-section divider",
						children: [
							/* @__PURE__ */ (0, X.jsxs)("div", {
								className: "settings-copy",
								children: [/* @__PURE__ */ (0, X.jsx)("div", {
									className: "settings-heading",
									children: /* @__PURE__ */ (0, X.jsx)("div", {
										className: "settings-title-stack",
										children: /* @__PURE__ */ (0, X.jsx)("h4", { children: "Auto Patch" })
									})
								}), /* @__PURE__ */ (0, X.jsx)("p", { children: re ? `Polling every ${T} minute(s) for Task and Bug cards.` : "Auto Patch polling is paused." })]
							}),
							/* @__PURE__ */ (0, X.jsxs)("div", {
								className: "settings-control wide",
								children: [/* @__PURE__ */ (0, X.jsxs)("div", {
									className: "form-grid compact",
									children: [
										/* @__PURE__ */ (0, X.jsx)(G_, {
											label: "Interval, minutes",
											children: /* @__PURE__ */ (0, X.jsx)("input", {
												type: "number",
												min: "1",
												value: T,
												onChange: (e) => {
													E(e.target.value), De();
												}
											})
										}),
										/* @__PURE__ */ (0, X.jsx)(G_, {
											label: "Eligible JIRA statuses",
											children: /* @__PURE__ */ (0, X.jsx)(K_, {
												options: Me,
												value: ee,
												onChange: D,
												markDirty: De
											})
										}),
										/* @__PURE__ */ (0, X.jsx)(G_, {
											label: "Move to when started",
											children: /* @__PURE__ */ (0, X.jsx)("select", {
												value: O,
												onChange: (e) => {
													k(e.target.value), De();
												},
												children: Me.map((e) => /* @__PURE__ */ (0, X.jsx)("option", {
													value: e,
													children: e
												}, e))
											})
										}),
										/* @__PURE__ */ (0, X.jsx)(G_, {
											label: "Move to when completed",
											children: /* @__PURE__ */ (0, X.jsx)("select", {
												value: te,
												onChange: (e) => {
													ne(e.target.value), De();
												},
												children: Me.map((e) => /* @__PURE__ */ (0, X.jsx)("option", {
													value: e,
													children: e
												}, e))
											})
										}),
										/* @__PURE__ */ (0, X.jsx)(G_, {
											label: "Move to when blocked",
											children: /* @__PURE__ */ (0, X.jsx)("select", {
												value: A,
												onChange: (e) => {
													j(e.target.value), De();
												},
												children: Me.map((e) => /* @__PURE__ */ (0, X.jsx)("option", {
													value: e,
													children: e
												}, e))
											})
										})
									]
								}), /* @__PURE__ */ (0, X.jsx)("p", {
									className: "schedule-note",
									children: "Only Task and Bug cards are captured. Blocked cards retry after a new external Jira comment."
								})]
							}),
							/* @__PURE__ */ (0, X.jsx)("div", {
								className: "settings-toggle",
								children: /* @__PURE__ */ (0, X.jsx)(Q_, {
									enabled: re,
									onChange: (e) => {
										ie(e), De();
									}
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, X.jsx)(l_, {
				title: "Execution Models",
				children: /* @__PURE__ */ (0, X.jsxs)("div", {
					className: "settings-section",
					children: [/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "settings-copy",
						children: [/* @__PURE__ */ (0, X.jsx)("h4", { children: "Cursor model" }), /* @__PURE__ */ (0, X.jsx)("p", { children: "Choose a preset or enter a custom Cursor model ID. Custom values must be supported by Cursor; Lumen does not validate model availability." })]
					}), /* @__PURE__ */ (0, X.jsx)("div", {
						className: "settings-control wide",
						children: /* @__PURE__ */ (0, X.jsxs)("div", {
							className: "form-grid compact",
							children: [
								/* @__PURE__ */ (0, X.jsx)(q_, {
									label: "Auto Scan model",
									value: ae,
									onChange: oe,
									markDirty: De
								}),
								/* @__PURE__ */ (0, X.jsx)(q_, {
									label: "Auto Delivery model",
									value: se,
									onChange: M,
									markDirty: De
								}),
								/* @__PURE__ */ (0, X.jsx)(q_, {
									label: "Auto Patch model",
									value: ce,
									onChange: le,
									markDirty: De
								})
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, X.jsx)(l_, {
				title: "Publish Policy",
				children: /* @__PURE__ */ (0, X.jsxs)("div", {
					className: "settings-section",
					children: [/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "settings-copy",
						children: [/* @__PURE__ */ (0, X.jsx)("h4", { children: "Automation outcome" }), /* @__PURE__ */ (0, X.jsx)("p", { children: "Direct push uses the repository credentials already configured for Git; PR and Merge use GitHub CLI. Auto Scan keeps a PR review gate and does not support direct push." })]
					}), /* @__PURE__ */ (0, X.jsx)("div", {
						className: "settings-control wide",
						children: /* @__PURE__ */ (0, X.jsxs)("div", {
							className: "form-grid compact",
							children: [
								/* @__PURE__ */ (0, X.jsx)(G_, {
									label: "Auto Scan",
									children: /* @__PURE__ */ (0, X.jsxs)("select", {
										value: ge,
										onChange: (e) => {
											_e(e.target.value), De();
										},
										children: [/* @__PURE__ */ (0, X.jsx)("option", {
											value: "pr",
											children: "Open pull request"
										}), /* @__PURE__ */ (0, X.jsx)("option", {
											value: "merge",
											children: "Merge after pull request"
										})]
									})
								}),
								/* @__PURE__ */ (0, X.jsx)(G_, {
									label: "Auto Delivery",
									children: /* @__PURE__ */ (0, X.jsxs)("select", {
										value: ve,
										onChange: (e) => {
											ye(e.target.value), De();
										},
										children: [
											/* @__PURE__ */ (0, X.jsx)("option", {
												value: "pr",
												children: "Open pull request"
											}),
											/* @__PURE__ */ (0, X.jsx)("option", {
												value: "merge",
												children: "Merge after pull request"
											}),
											/* @__PURE__ */ (0, X.jsx)("option", {
												value: "direct",
												children: "Push directly to main branch"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, X.jsx)(G_, {
									label: "Auto Patch",
									children: /* @__PURE__ */ (0, X.jsxs)("select", {
										value: be,
										onChange: (e) => {
											xe(e.target.value), De();
										},
										children: [/* @__PURE__ */ (0, X.jsx)("option", {
											value: "pr",
											children: "Open pull request"
										}), /* @__PURE__ */ (0, X.jsx)("option", {
											value: "direct",
											children: "Push directly to main branch"
										})]
									})
								})
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, X.jsx)(l_, {
				title: "Notifications",
				children: /* @__PURE__ */ (0, X.jsxs)("div", {
					className: "settings-section",
					children: [/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "settings-copy",
						children: [/* @__PURE__ */ (0, X.jsx)("h4", { children: "Feishu notifications" }), /* @__PURE__ */ (0, X.jsx)("p", { children: "Control whether Scan and Delivery post cards to the configured Feishu webhook. The webhook URL still lives under Variable Keys." })]
					}), /* @__PURE__ */ (0, X.jsx)("div", {
						className: "settings-toggle",
						children: /* @__PURE__ */ (0, X.jsx)(Q_, {
							enabled: Se,
							onChange: (e) => {
								Ce(e), De();
							}
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, X.jsx)(l_, {
				title: "Variable Keys",
				action: /* @__PURE__ */ (0, X.jsx)("span", {
					className: "muted",
					children: "Stored only in this workspace"
				}),
				children: /* @__PURE__ */ (0, X.jsxs)("div", {
					className: "settings-section",
					children: [/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "settings-copy",
						children: [/* @__PURE__ */ (0, X.jsx)("h4", { children: "Available keys" }), /* @__PURE__ */ (0, X.jsx)("p", { children: "Reveal a value to inspect it, or enter a replacement directly. Values are saved without display quotes." })]
					}), /* @__PURE__ */ (0, X.jsx)("div", {
						className: "settings-control wide",
						children: /* @__PURE__ */ (0, X.jsx)("div", {
							className: "secret-list",
							children: je.length ? je.map((e) => {
								let t = me[e] ?? fe[e] ?? "";
								return /* @__PURE__ */ (0, X.jsxs)("div", {
									className: "secret-row",
									children: [
										/* @__PURE__ */ (0, X.jsx)("code", { children: e }),
										/* @__PURE__ */ (0, X.jsx)("input", {
											type: fe[e] || me[e] !== void 0 ? "text" : "password",
											value: t,
											placeholder: "Reveal or enter a replacement value",
											"aria-label": `Value for ${e}`,
											onChange: (t) => {
												let n = t.target.value;
												he((t) => ({
													...t,
													[e]: n
												})), De();
											}
										}),
										/* @__PURE__ */ (0, X.jsxs)("div", { children: [/* @__PURE__ */ (0, X.jsx)(c_, {
											label: "Reveal value",
											onClick: () => void ke(e),
											children: fe[e] ? /* @__PURE__ */ (0, X.jsx)(qh, { size: 15 }) : /* @__PURE__ */ (0, X.jsx)(Jh, { size: 15 })
										}), /* @__PURE__ */ (0, X.jsx)(c_, {
											label: "Copy value",
											onClick: () => void Ae(e),
											children: /* @__PURE__ */ (0, X.jsx)(Gh, { size: 15 })
										})] })
									]
								}, e);
							}) : /* @__PURE__ */ (0, X.jsx)(v_, { label: "No local integration keys configured." })
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, X.jsxs)("footer", {
				className: "settings-save-bar",
				children: [/* @__PURE__ */ (0, X.jsx)("span", {
					className: Te ? "settings-save-status unsaved" : "settings-save-status",
					children: we ? "Saving settings…" : Te ? "You have unsaved changes" : "All changes saved"
				}), /* @__PURE__ */ (0, X.jsxs)("button", {
					className: `button primary${we ? " is-busy" : ""}`,
					disabled: !Te || we,
					onClick: () => void Be(),
					children: [we ? /* @__PURE__ */ (0, X.jsx)(rg, {
						size: 15,
						className: "spin"
					}) : /* @__PURE__ */ (0, X.jsx)(cg, { size: 15 }), we ? "Saving…" : "Save changes"]
				})]
			})
		]
	});
}
function Q_({ enabled: e, onChange: t }) {
	return /* @__PURE__ */ (0, X.jsxs)("label", {
		className: "schedule-toggle",
		children: [
			/* @__PURE__ */ (0, X.jsx)("input", {
				type: "checkbox",
				checked: e,
				onChange: (e) => t(e.target.checked)
			}),
			/* @__PURE__ */ (0, X.jsx)("span", { "aria-hidden": "true" }),
			/* @__PURE__ */ (0, X.jsx)("em", { children: e ? "Enabled" : "Paused" })
		]
	});
}
(0, ye.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, X.jsx)(u_, {}));
//#endregion
