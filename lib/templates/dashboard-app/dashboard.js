import { i as e, n as t, t as n } from "./rolldown-runtime-Dbv0sNQl.js";
import { t as r } from "./chunk-KS23V3DP-BLgekSrB.js";
import { _ as i, g as a, h as o, p as s } from "./src-B53NoQT1.js";
import { J as c, M as l, P as u, R as d, S as f, V as p, W as m, X as h, Y as g, c as _, f as v, g as y, h as b, j as x, l as S, n as C, p as w, q as T, r as E, t as ee, w as D, x as te, y as ne } from "./chunk-ABZYJK2D-CVevQ3ur.js";
import { a as re, d as ie, h as O, i as k, m as ae, r as oe } from "./chunk-S3R3BYOJ-BtVK2Rr4.js";
import { t as se } from "./chunk-EXTU4WIE-By1ZThX0.js";
import { n as ce, t as le } from "./chunk-MI3HLSF2-DVisFF9Y.js";
import "./chunk-HN2XXSSU-BzJE2DVW.js";
import "./chunk-CVBHYZKI-utcCkCdu.js";
import "./chunk-ATLVNIR6-CY_EFS1R.js";
import { i as A, s as ue } from "./chunk-JA3XYJ7Z-RwfPEVEr.js";
import "./chunk-JZLCHNYA-Ci7qRJgj.js";
import "./chunk-QXUST7PY-DUpJQbC-.js";
import { n as de } from "./chunk-N4CR4FBY-C3Oe3dWX.js";
import { t as j } from "./isEmpty-DbxQP0Mx.js";
//#region node_modules/react/cjs/react.production.js
var fe = /* @__PURE__ */ n(((e) => {
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
	function te(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var ne = /\/+/g;
	function re(e, t) {
		return typeof e == "object" && e && e.key != null ? te("" + e.key) : t.toString(36);
	}
	function ie(e) {
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
	function O(e, r, i, a, o) {
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
				case d: return c = e._init, O(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + re(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(ne, "$&/") + "/"), O(o, r, i, "", function(e) {
			return e;
		})) : o != null && (D(o) && (o = ee(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(ne, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + re(a, u), c += O(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + re(a, u++), c += O(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return O(ie(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function k(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return O(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function ae(e) {
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
	var oe = typeof reportError == "function" ? reportError : function(e) {
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
	}, se = {
		map: k,
		forEach: function(e, t, n) {
			k(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return k(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return k(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!D(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = se, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
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
			_init: ae
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
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, oe);
		} catch (e) {
			oe(e);
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
})), pe = /* @__PURE__ */ n(((e, t) => {
	t.exports = fe();
})), me = /* @__PURE__ */ n(((e) => {
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
			t !== null && re(x, t.startTime - e);
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
								u !== null && re(x, u.startTime - t), i = !1;
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
		var te = new MessageChannel(), ne = te.port2;
		te.port1.onmessage = ee, D = function() {
			ne.postMessage(null);
		};
	} else D = function() {
		_(ee, 0);
	};
	function re(t, n) {
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
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, re(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, D()))), r;
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
})), he = /* @__PURE__ */ n(((e, t) => {
	t.exports = me();
})), ge = /* @__PURE__ */ n(((e) => {
	var t = pe();
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
})), _e = /* @__PURE__ */ n(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = ge();
})), ve = /* @__PURE__ */ n(((e) => {
	var t = he(), n = pe(), r = _e();
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
	function te(e) {
		return typeof e != "object" || !e ? null : (e = D && e[D] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ne = Symbol.for("react.client.reference");
	function re(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ne ? null : e.displayName || e.name || null;
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
			case w: return t = e.displayName || null, t === null ? re(e.type) || "Memo" : t;
			case T:
				t = e._payload, e = e._init;
				try {
					return re(e(t));
				} catch {}
		}
		return null;
	}
	var ie = Array.isArray, O = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ae = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, oe = [], se = -1;
	function ce(e) {
		return { current: e };
	}
	function le(e) {
		0 > se || (e.current = oe[se], oe[se] = null, se--);
	}
	function A(e, t) {
		se++, oe[se] = e.current, e.current = t;
	}
	var ue = ce(null), de = ce(null), j = ce(null), fe = ce(null);
	function me(e, t) {
		switch (A(j, t), A(de, e), A(ue, null), t.nodeType) {
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
		le(ue), A(ue, e);
	}
	function ge() {
		le(ue), le(de), le(j);
	}
	function ve(e) {
		e.memoizedState !== null && A(fe, e);
		var t = ue.current, n = Wd(t, e.type);
		t !== n && (A(de, e), A(ue, n));
	}
	function ye(e) {
		de.current === e && (le(ue), le(de)), fe.current === e && (le(fe), ep._currentValue = ae);
	}
	var be, xe;
	function Se(e) {
		if (be === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			be = t && t[1] || "", xe = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + be + e + xe;
	}
	var Ce = !1;
	function we(e, t) {
		if (!e || Ce) return "";
		Ce = !0;
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
			Ce = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Se(n) : "";
	}
	function Te(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Se(e.type);
			case 16: return Se("Lazy");
			case 13: return e.child !== t && t !== null ? Se("Suspense Fallback") : Se("Suspense");
			case 19: return Se("SuspenseList");
			case 0:
			case 15: return we(e.type, !1);
			case 11: return we(e.type.render, !1);
			case 1: return we(e.type, !0);
			case 31: return Se("Activity");
			default: return "";
		}
	}
	function Ee(e) {
		try {
			var t = "", n = null;
			do
				t += Te(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var De = Object.prototype.hasOwnProperty, Oe = t.unstable_scheduleCallback, ke = t.unstable_cancelCallback, Ae = t.unstable_shouldYield, je = t.unstable_requestPaint, Me = t.unstable_now, Ne = t.unstable_getCurrentPriorityLevel, Pe = t.unstable_ImmediatePriority, Fe = t.unstable_UserBlockingPriority, Ie = t.unstable_NormalPriority, Le = t.unstable_LowPriority, Re = t.unstable_IdlePriority, ze = t.log, Be = t.unstable_setDisableYieldValue, Ve = null, He = null;
	function Ue(e) {
		if (typeof ze == "function" && Be(e), He && typeof He.setStrictMode == "function") try {
			He.setStrictMode(Ve, e);
		} catch {}
	}
	var We = Math.clz32 ? Math.clz32 : qe, Ge = Math.log, Ke = Math.LN2;
	function qe(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ge(e) / Ke | 0) | 0;
	}
	var Je = 256, Ye = 262144, Xe = 4194304;
	function Ze(e) {
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
	function Qe(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ze(n))) : i = Ze(o) : i = Ze(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ze(n))) : i = Ze(o)) : i = Ze(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function $e(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function et(e, t) {
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
	function tt() {
		var e = Xe;
		return Xe <<= 1, !(Xe & 62914560) && (Xe = 4194304), e;
	}
	function nt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function rt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function it(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - We(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && at(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function at(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - We(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function ot(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - We(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function st(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : ct(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function ct(e) {
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
	function lt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function ut() {
		var e = k.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : hp(e.type)) : e;
	}
	function M(e, t) {
		var n = k.p;
		try {
			return k.p = e, t();
		} finally {
			k.p = n;
		}
	}
	var dt = Math.random().toString(36).slice(2), ft = "__reactFiber$" + dt, pt = "__reactProps$" + dt, mt = "__reactContainer$" + dt, ht = "__reactEvents$" + dt, gt = "__reactListeners$" + dt, _t = "__reactHandles$" + dt, vt = "__reactResources$" + dt, yt = "__reactMarker$" + dt;
	function bt(e) {
		delete e[ft], delete e[pt], delete e[ht], delete e[gt], delete e[_t];
	}
	function xt(e) {
		var t = e[ft];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[mt] || n[ft]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = pf(e); e !== null;) {
					if (n = e[ft]) return n;
					e = pf(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function St(e) {
		if (e = e[ft] || e[mt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Ct(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function wt(e) {
		var t = e[vt];
		return t ||= e[vt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Tt(e) {
		e[yt] = !0;
	}
	var Et = /* @__PURE__ */ new Set(), Dt = {};
	function Ot(e, t) {
		kt(e, t), kt(e + "Capture", t);
	}
	function kt(e, t) {
		for (Dt[e] = t, e = 0; e < t.length; e++) Et.add(t[e]);
	}
	var At = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), jt = {}, Mt = {};
	function Nt(e) {
		return De.call(Mt, e) ? !0 : De.call(jt, e) ? !1 : At.test(e) ? Mt[e] = !0 : (jt[e] = !0, !1);
	}
	function Pt(e, t, n) {
		if (Nt(t)) if (n === null) e.removeAttribute(t);
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
	function Ft(e, t, n) {
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
	function It(e, t, n, r) {
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
	function Lt(e) {
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
	function Rt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function zt(e, t, n) {
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
	function Bt(e) {
		if (!e._valueTracker) {
			var t = Rt(e) ? "checked" : "value";
			e._valueTracker = zt(e, t, "" + e[t]);
		}
	}
	function Vt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Rt(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Ht(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Ut = /[\n"\\]/g;
	function Wt(e) {
		return e.replace(Ut, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Gt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Lt(t)) : e.value !== "" + Lt(t) && (e.value = "" + Lt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : qt(e, o, Lt(n)) : qt(e, o, Lt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Lt(s) : e.removeAttribute("name");
	}
	function Kt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Bt(e);
				return;
			}
			n = n == null ? "" : "" + Lt(n), t = t == null ? n : "" + Lt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Bt(e);
	}
	function qt(e, t, n) {
		t === "number" && Ht(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Jt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Lt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Yt(e, t, n) {
		if (t != null && (t = "" + Lt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Lt(n);
	}
	function Xt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (ie(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Lt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Bt(e);
	}
	function Zt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Qt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function $t(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Qt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function en(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && $t(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && $t(e, o, t[o]);
	}
	function tn(e) {
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
	var nn = /* @__PURE__ */ new Map([
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
	]), rn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function an(e) {
		return rn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function on() {}
	var sn = null;
	function cn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var ln = null, un = null;
	function dn(e) {
		var t = St(e);
		if (t && (e = t.stateNode)) {
			var n = e[pt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Gt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Wt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[pt] || null;
								if (!a) throw Error(i(90));
								Gt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Vt(r);
					}
					break a;
				case "textarea":
					Yt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Jt(e, !!n.multiple, t, !1);
			}
		}
	}
	var fn = !1;
	function pn(e, t, n) {
		if (fn) return e(t, n);
		fn = !0;
		try {
			return e(t);
		} finally {
			if (fn = !1, (ln !== null || un !== null) && (xu(), ln && (t = ln, e = un, un = ln = null, dn(t), e))) for (t = 0; t < e.length; t++) dn(e[t]);
		}
	}
	function mn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[pt] || null;
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
	var hn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), gn = !1;
	if (hn) try {
		var _n = {};
		Object.defineProperty(_n, "passive", { get: function() {
			gn = !0;
		} }), window.addEventListener("test", _n, _n), window.removeEventListener("test", _n, _n);
	} catch {
		gn = !1;
	}
	var vn = null, yn = null, bn = null;
	function xn() {
		if (bn) return bn;
		var e, t = yn, n = t.length, r, i = "value" in vn ? vn.value : vn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return bn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Sn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function Cn() {
		return !0;
	}
	function wn() {
		return !1;
	}
	function Tn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? Cn : wn, this.isPropagationStopped = wn, this;
		}
		return f(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Cn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Cn);
			},
			persist: function() {},
			isPersistent: Cn
		}), t;
	}
	var En = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Dn = Tn(En), On = f({}, En, {
		view: 0,
		detail: 0
	}), kn = Tn(On), An, jn, Mn, Nn = f({}, On, {
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
		getModifierState: Wn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Mn && (Mn && e.type === "mousemove" ? (An = e.screenX - Mn.screenX, jn = e.screenY - Mn.screenY) : jn = An = 0, Mn = e), An);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : jn;
		}
	}), Pn = Tn(Nn), Fn = Tn(f({}, Nn, { dataTransfer: 0 })), In = Tn(f({}, On, { relatedTarget: 0 })), Ln = Tn(f({}, En, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Rn = Tn(f({}, En, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), zn = Tn(f({}, En, { data: 0 })), Bn = {
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
	}, Vn = {
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
	}, Hn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Un(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Hn[e]) ? !!t[e] : !1;
	}
	function Wn() {
		return Un;
	}
	var Gn = Tn(f({}, On, {
		key: function(e) {
			if (e.key) {
				var t = Bn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Sn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Vn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Wn,
		charCode: function(e) {
			return e.type === "keypress" ? Sn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Sn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Kn = Tn(f({}, Nn, {
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
	})), qn = Tn(f({}, On, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Wn
	})), Jn = Tn(f({}, En, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Yn = Tn(f({}, Nn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Xn = Tn(f({}, En, {
		newState: 0,
		oldState: 0
	})), Zn = [
		9,
		13,
		27,
		32
	], Qn = hn && "CompositionEvent" in window, $n = null;
	hn && "documentMode" in document && ($n = document.documentMode);
	var er = hn && "TextEvent" in window && !$n, tr = hn && (!Qn || $n && 8 < $n && 11 >= $n), nr = " ", rr = !1;
	function ir(e, t) {
		switch (e) {
			case "keyup": return Zn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function ar(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var or = !1;
	function sr(e, t) {
		switch (e) {
			case "compositionend": return ar(t);
			case "keypress": return t.which === 32 ? (rr = !0, nr) : null;
			case "textInput": return e = t.data, e === nr && rr ? null : e;
			default: return null;
		}
	}
	function cr(e, t) {
		if (or) return e === "compositionend" || !Qn && ir(e, t) ? (e = xn(), bn = yn = vn = null, or = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return tr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var lr = {
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
	function ur(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!lr[e.type] : t === "textarea";
	}
	function dr(e, t, n, r) {
		ln ? un ? un.push(r) : un = [r] : ln = r, t = Dd(t, "onChange"), 0 < t.length && (n = new Dn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var fr = null, pr = null;
	function mr(e) {
		bd(e, 0);
	}
	function hr(e) {
		if (Vt(Ct(e))) return e;
	}
	function gr(e, t) {
		if (e === "change") return t;
	}
	var _r = !1;
	if (hn) {
		var vr;
		if (hn) {
			var yr = "oninput" in document;
			if (!yr) {
				var br = document.createElement("div");
				br.setAttribute("oninput", "return;"), yr = typeof br.oninput == "function";
			}
			vr = yr;
		} else vr = !1;
		_r = vr && (!document.documentMode || 9 < document.documentMode);
	}
	function xr() {
		fr && (fr.detachEvent("onpropertychange", Sr), pr = fr = null);
	}
	function Sr(e) {
		if (e.propertyName === "value" && hr(pr)) {
			var t = [];
			dr(t, pr, e, cn(e)), pn(mr, t);
		}
	}
	function Cr(e, t, n) {
		e === "focusin" ? (xr(), fr = t, pr = n, fr.attachEvent("onpropertychange", Sr)) : e === "focusout" && xr();
	}
	function wr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return hr(pr);
	}
	function Tr(e, t) {
		if (e === "click") return hr(t);
	}
	function Er(e, t) {
		if (e === "input" || e === "change") return hr(t);
	}
	function Dr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Or = typeof Object.is == "function" ? Object.is : Dr;
	function kr(e, t) {
		if (Or(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!De.call(t, i) || !Or(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Ar(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function jr(e, t) {
		var n = Ar(e);
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
			n = Ar(n);
		}
	}
	function Mr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Mr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Nr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Ht(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Ht(e.document);
		}
		return t;
	}
	function Pr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Fr = hn && "documentMode" in document && 11 >= document.documentMode, Ir = null, N = null, Lr = null, Rr = !1;
	function P(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Rr || Ir == null || Ir !== Ht(r) || (r = Ir, "selectionStart" in r && Pr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Lr && kr(Lr, r) || (Lr = r, r = Dd(N, "onSelect"), 0 < r.length && (t = new Dn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Ir)));
	}
	function F(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var zr = {
		animationend: F("Animation", "AnimationEnd"),
		animationiteration: F("Animation", "AnimationIteration"),
		animationstart: F("Animation", "AnimationStart"),
		transitionrun: F("Transition", "TransitionRun"),
		transitionstart: F("Transition", "TransitionStart"),
		transitioncancel: F("Transition", "TransitionCancel"),
		transitionend: F("Transition", "TransitionEnd")
	}, Br = {}, Vr = {};
	hn && (Vr = document.createElement("div").style, "AnimationEvent" in window || (delete zr.animationend.animation, delete zr.animationiteration.animation, delete zr.animationstart.animation), "TransitionEvent" in window || delete zr.transitionend.transition);
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
		Xr.set(e, t), Ot(t, [e]);
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
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - We(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function ci(e) {
		if (50 < fu) throw fu = 0, pu = null, Error(i(185));
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
		else if (typeof e == "string") s = Gf(e, n, ue.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
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
				stack: Ee(t)
			}, bi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Ee(t)
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
		var i = 32 - We(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - We(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, ki = 1 << 32 - We(t) + i | n << i | r, Ai = a + e;
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
		switch (t[ft] = e, t[pt] = r, n) {
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
				for (n = 0; n < vd.length; n++) Z(vd[n], t);
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
				Z("invalid", t), Kt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Z("invalid", t);
				break;
			case "textarea": Z("invalid", t), Xt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Nd(t.textContent, n) ? (r.popover != null && (Z("beforetoggle", t), Z("toggle", t)), r.onScroll != null && Z("scroll", t), r.onScrollEnd != null && Z("scrollend", t), r.onClick != null && (t.onclick = on), t = !0) : t = !1, t || Vi(e, !0);
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
		return e !== null && (Ql === null ? Ql = e : Ql.push.apply(Ql, e), Ri = null), e;
	}
	function qi(e) {
		Ri === null ? Ri = [e] : Ri.push(e);
	}
	var Ji = ce(null), Yi = null, Xi = null;
	function Zi(e, t, n) {
		A(Ji, t._currentValue), t._currentValue = n;
	}
	function Qi(e) {
		e._currentValue = Ji.current, le(Ji);
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
					Or(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === fe.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [ep] : e.push(ep));
			}
			a = a.return;
		}
		e !== null && ea(t, e, n, r), t.flags |= 262144;
	}
	function na(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Or(e.context._currentValue, e.memoizedValue)) return !0;
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
	}, ca = t.unstable_scheduleCallback, la = t.unstable_NormalPriority, ua = {
		$$typeof: b,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function da() {
		return {
			controller: new sa(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function fa(e) {
		e.refCount--, e.refCount === 0 && ca(la, function() {
			e.controller.abort();
		});
	}
	var pa = null, ma = 0, ha = 0, ga = null;
	function _a(e, t) {
		if (pa === null) {
			var n = pa = [];
			ma = 0, ha = fd(), ga = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ma++, t.then(va, va), t;
	}
	function va() {
		if (--ma === 0 && pa !== null) {
			ga !== null && (ga.status = "fulfilled");
			var e = pa;
			pa = null, ha = 0, ga = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function ya(e, t) {
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
	var ba = O.S;
	O.S = function(e, t) {
		tu = Me(), typeof t == "object" && t && typeof t.then == "function" && _a(e, t), ba !== null && ba(e, t);
	};
	var L = ce(null);
	function R() {
		var e = L.current;
		return e === null ? G.pooledCache : e;
	}
	function z(e, t) {
		t === null ? A(L, L.current) : A(L, t.pool);
	}
	function xa() {
		var e = R();
		return e === null ? null : {
			parent: ua._currentValue,
			pool: e
		};
	}
	var Sa = Error(i(460)), Ca = Error(i(474)), wa = Error(i(542)), B = { then: function() {} };
	function Ta(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ea(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(on, on), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Aa(e), e;
			default:
				if (typeof t.status == "string") t.then(on, on);
				else {
					if (e = G, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
					case "rejected": throw e = t.reason, Aa(e), e;
				}
				throw Oa = t, Sa;
		}
	}
	function Da(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Oa = e, Sa) : e;
		}
	}
	var Oa = null;
	function ka() {
		if (Oa === null) throw Error(i(459));
		var e = Oa;
		return Oa = null, e;
	}
	function Aa(e) {
		if (e === Sa || e === wa) throw Error(i(483));
	}
	var ja = null, Ma = 0;
	function Na(e) {
		var t = Ma;
		return Ma += 1, ja === null && (ja = []), Ea(ja, e, t);
	}
	function Pa(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Fa(e, t) {
		throw t.$$typeof === p ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Ia(e) {
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
			return i === g ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === T && Da(i) === t.type) ? (t = a(t, n.props), Pa(t, n), t.return = e, t) : (t = hi(n.type, n.key, n.props, null, e.mode, r), Pa(t, n), t.return = e, t);
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
					case m: return n = hi(t.type, t.key, t.props, null, e.mode, n), Pa(n, t), n.return = e, n;
					case h: return t = yi(t, e.mode, n), t.return = e, t;
					case T: return t = Da(t), f(e, t, n);
				}
				if (ie(t) || te(t)) return t = gi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Na(t), n);
				if (t.$$typeof === b) return f(e, aa(e, t), n);
				Fa(e, t);
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
					case T: return n = Da(n), p(e, t, n, r);
				}
				if (ie(n) || te(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Na(n), r);
				if (n.$$typeof === b) return p(e, t, aa(e, n), r);
				Fa(e, n);
			}
			return null;
		}
		function _(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case m: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case h: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case T: return r = Da(r), _(e, t, n, r, i);
				}
				if (ie(r) || te(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return _(e, t, n, Na(r), i);
				if (r.$$typeof === b) return _(e, t, n, aa(t, r), i);
				Fa(t, r);
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
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === T && Da(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Pa(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === g ? (c = gi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = hi(o.type, o.key, o.props, null, e.mode, c), Pa(c, o), c.return = e, e = c);
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
					case T: return o = Da(o), x(e, r, o, c);
				}
				if (ie(o)) return v(e, r, o, c);
				if (te(o)) {
					if (l = te(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), y(e, r, o, c);
				}
				if (typeof o.then == "function") return x(e, r, Na(o), c);
				if (o.$$typeof === b) return x(e, r, aa(e, o), c);
				Fa(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = _i(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ma = 0;
				var i = x(e, t, n, r);
				return ja = null, i;
			} catch (t) {
				if (t === Sa || t === wa) throw t;
				var a = di(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var La = Ia(!0), Ra = Ia(!1), za = !1;
	function Ba(e) {
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
	function Va(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ha(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ua(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, W & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = ci(e), si(e, null, n), t;
		}
		return ii(e, r, t, n), ci(e);
	}
	function Wa(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ot(e, n);
		}
	}
	function Ga(e, t) {
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
	var Ka = !1;
	function qa() {
		if (Ka) {
			var e = ga;
			if (e !== null) throw e;
		}
	}
	function Ja(e, t, n, r) {
		Ka = !1;
		var i = e.updateQueue;
		za = !1;
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
					p !== 0 && p === ha && (Ka = !0), u !== null && (u = u.next = {
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
							case 2: za = !0;
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
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Kl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Ya(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Xa(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ya(n[e], t);
	}
	var Za = ce(null), Qa = ce(0);
	function $a(e, t) {
		e = Wl, A(Qa, e), A(Za, t), Wl = e | t.baseLanes;
	}
	function eo() {
		A(Qa, Wl), A(Za, Za.current);
	}
	function to() {
		Wl = Qa.current, le(Za), le(Qa);
	}
	var no = ce(null), ro = null;
	function io(e) {
		var t = e.alternate;
		A(lo, lo.current & 1), A(no, e), ro === null && (t === null || Za.current !== null || t.memoizedState !== null) && (ro = e);
	}
	function ao(e) {
		A(lo, lo.current), A(no, e), ro === null && (ro = e);
	}
	function oo(e) {
		e.tag === 22 ? (A(lo, lo.current), A(no, e), ro === null && (ro = e)) : so(e);
	}
	function so() {
		A(lo, lo.current), A(no, no.current);
	}
	function co(e) {
		le(no), ro === e && (ro = null), le(lo);
	}
	var lo = ce(0);
	function uo(e) {
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
	var fo = 0, V = null, H = null, po = null, mo = !1, ho = !1, go = !1, _o = 0, vo = 0, yo = null, bo = 0;
	function xo() {
		throw Error(i(321));
	}
	function So(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Or(e[n], t[n])) return !1;
		return !0;
	}
	function Co(e, t, n, r, i, a) {
		return fo = a, V = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? Bs : Vs, go = !1, a = n(r, i), go = !1, ho && (a = To(t, n, r, i)), wo(e), a;
	}
	function wo(e) {
		O.H = zs;
		var t = H !== null && H.next !== null;
		if (fo = 0, po = H = V = null, mo = !1, vo = 0, yo = null, t) throw Error(i(300));
		e === null || ic || (e = e.dependencies, e !== null && na(e) && (ic = !0));
	}
	function To(e, t, n, r) {
		V = e;
		var a = 0;
		do {
			if (ho && (yo = null), vo = 0, ho = !1, 25 <= a) throw Error(i(301));
			if (a += 1, po = H = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			O.H = Hs, o = t(n, r);
		} while (ho);
		return o;
	}
	function Eo() {
		var e = O.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? No(t) : t, e = e.useState()[0], (H === null ? null : H.memoizedState) !== e && (V.flags |= 1024), t;
	}
	function Do() {
		var e = _o !== 0;
		return _o = 0, e;
	}
	function Oo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function ko(e) {
		if (mo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			mo = !1;
		}
		fo = 0, po = H = V = null, ho = !1, vo = _o = 0, yo = null;
	}
	function Ao() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return po === null ? V.memoizedState = po = e : po = po.next = e, po;
	}
	function jo() {
		if (H === null) {
			var e = V.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = H.next;
		var t = po === null ? V.memoizedState : po.next;
		if (t !== null) po = t, H = e;
		else {
			if (e === null) throw V.alternate === null ? Error(i(467)) : Error(i(310));
			H = e, e = {
				memoizedState: H.memoizedState,
				baseState: H.baseState,
				baseQueue: H.baseQueue,
				queue: H.queue,
				next: null
			}, po === null ? V.memoizedState = po = e : po = po.next = e;
		}
		return po;
	}
	function Mo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function No(e) {
		var t = vo;
		return vo += 1, yo === null && (yo = []), e = Ea(yo, e, t), t = V, (po === null ? t.memoizedState : po.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? Bs : Vs), e;
	}
	function Po(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return No(e);
			if (e.$$typeof === b) return ia(e);
		}
		throw Error(i(438, String(e)));
	}
	function Fo(e) {
		var t = null, n = V.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = V.alternate;
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
		}, n === null && (n = Mo(), V.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = ee;
		return t.index++, n;
	}
	function Io(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Lo(e) {
		return Ro(jo(), H, e);
	}
	function Ro(e, t, n) {
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
				if (f === u.lane ? (fo & f) === f : (q & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ha && (d = !0);
					else if ((fo & p) === p) {
						u = u.next, p === ha && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, V.lanes |= p, Kl |= p;
					f = u.action, go && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, V.lanes |= f, Kl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Or(o, e.memoizedState) && (ic = !0, d && (n = ga, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function zo(e) {
		var t = jo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Or(o, t.memoizedState) || (ic = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Bo(e, t, n) {
		var r = V, a = jo(), o = I;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Or((H || a).memoizedState, n);
		if (s && (a.memoizedState = n, ic = !0), a = a.queue, ds(Uo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || po !== null && po.memoizedState.tag & 1) {
			if (r.flags |= 2048, os(9, { destroy: void 0 }, Ho.bind(null, r, a, n, t), null), G === null) throw Error(i(349));
			o || fo & 127 || Vo(r, t, n);
		}
		return n;
	}
	function Vo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = V.updateQueue, t === null ? (t = Mo(), V.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Ho(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Wo(t) && Go(e);
	}
	function Uo(e, t, n) {
		return n(function() {
			Wo(t) && Go(e);
		});
	}
	function Wo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Or(e, n);
		} catch {
			return !0;
		}
	}
	function Go(e) {
		var t = oi(e, 2);
		t !== null && gu(t, e, 2);
	}
	function Ko(e) {
		var t = Ao();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), go) {
				Ue(!0);
				try {
					n();
				} finally {
					Ue(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Io,
			lastRenderedState: e
		}, t;
	}
	function qo(e, t, n, r) {
		return e.baseState = n, Ro(e, H, typeof r == "function" ? r : Io);
	}
	function Jo(e, t, n, r, a) {
		if (Is(e)) throw Error(i(485));
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
			O.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Yo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Yo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = O.T, o = {};
			O.T = o;
			try {
				var s = n(i, r), c = O.S;
				c !== null && c(o, s), Xo(e, t, s);
			} catch (n) {
				Qo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), O.T = a;
			}
		} else try {
			a = n(i, r), Xo(e, t, a);
		} catch (n) {
			Qo(e, t, n);
		}
	}
	function Xo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Zo(e, t, n);
		}, function(n) {
			return Qo(e, t, n);
		}) : Zo(e, t, n);
	}
	function Zo(e, t, n) {
		t.status = "fulfilled", t.value = n, $o(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Yo(e, n)));
	}
	function Qo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, $o(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function $o(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function es(e, t) {
		return t;
	}
	function ts(e, t) {
		if (I) {
			var n = G.formState;
			if (n !== null) {
				a: {
					var r = V;
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
		return n = Ao(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: es,
			lastRenderedState: t
		}, n.queue = r, n = Ns.bind(null, V, r), r.dispatch = n, r = Ko(!1), a = Fs.bind(null, V, !1, r.queue), r = Ao(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Jo.bind(null, V, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function ns(e) {
		return rs(jo(), H, e);
	}
	function rs(e, t, n) {
		if (t = Ro(e, t, es)[0], e = Lo(Io)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = No(t);
		} catch (e) {
			throw e === Sa ? wa : e;
		}
		else r = t;
		t = jo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (V.flags |= 2048, os(9, { destroy: void 0 }, is.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function is(e, t) {
		e.action = t;
	}
	function as(e) {
		var t = jo(), n = H;
		if (n !== null) return rs(t, n, e);
		jo(), t = t.memoizedState, n = jo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function os(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = V.updateQueue, t === null && (t = Mo(), V.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function ss() {
		return jo().memoizedState;
	}
	function cs(e, t, n, r) {
		var i = Ao();
		V.flags |= e, i.memoizedState = os(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ls(e, t, n, r) {
		var i = jo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		H !== null && r !== null && So(r, H.memoizedState.deps) ? i.memoizedState = os(t, a, n, r) : (V.flags |= e, i.memoizedState = os(1 | t, a, n, r));
	}
	function us(e, t) {
		cs(8390656, 8, e, t);
	}
	function ds(e, t) {
		ls(2048, 8, e, t);
	}
	function fs(e) {
		V.flags |= 4;
		var t = V.updateQueue;
		if (t === null) t = Mo(), V.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function ps(e) {
		var t = jo().memoizedState;
		return fs({
			ref: t,
			nextImpl: e
		}), function() {
			if (W & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ms(e, t) {
		return ls(4, 2, e, t);
	}
	function hs(e, t) {
		return ls(4, 4, e, t);
	}
	function gs(e, t) {
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
	function _s(e, t, n) {
		n = n == null ? null : n.concat([e]), ls(4, 4, gs.bind(null, t, e), n);
	}
	function vs() {}
	function ys(e, t) {
		var n = jo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && So(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function bs(e, t) {
		var n = jo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && So(t, r[1])) return r[0];
		if (r = e(), go) {
			Ue(!0);
			try {
				e();
			} finally {
				Ue(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function xs(e, t, n) {
		return n === void 0 || fo & 1073741824 && !(q & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = hu(), V.lanes |= e, Kl |= e, n);
	}
	function Ss(e, t, n, r) {
		return Or(n, t) ? n : Za.current === null ? !(fo & 42) || fo & 1073741824 && !(q & 261930) ? (ic = !0, e.memoizedState = n) : (e = hu(), V.lanes |= e, Kl |= e, t) : (e = xs(e, n, r), Or(e, t) || (ic = !0), e);
	}
	function Cs(e, t, n, r, i) {
		var a = k.p;
		k.p = a !== 0 && 8 > a ? a : 8;
		var o = O.T, s = {};
		O.T = s, Fs(e, !1, t, n);
		try {
			var c = i(), l = O.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ps(e, t, ya(c, r), mu(e)) : Ps(e, t, r, mu(e));
		} catch (n) {
			Ps(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, mu());
		} finally {
			k.p = a, o !== null && s.types !== null && (o.types = s.types), O.T = o;
		}
	}
	function ws() {}
	function Ts(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Es(e).queue;
		Cs(e, a, t, ae, n === null ? ws : function() {
			return Ds(e), n(r);
		});
	}
	function Es(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: ae,
			baseState: ae,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Io,
				lastRenderedState: ae
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
				lastRenderedReducer: Io,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Ds(e) {
		var t = Es(e);
		t.next === null && (t = e.alternate.memoizedState), Ps(e, t.next.queue, {}, mu());
	}
	function Os() {
		return ia(ep);
	}
	function ks() {
		return jo().memoizedState;
	}
	function As() {
		return jo().memoizedState;
	}
	function js(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = mu();
					e = Ha(n);
					var r = Ua(t, e, n);
					r !== null && (gu(r, t, n), Wa(r, t, n)), t = { cache: da() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Ms(e, t, n) {
		var r = mu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Is(e) ? Ls(t, n) : (n = ai(e, t, n, r), n !== null && (gu(n, e, r), Rs(n, t, r)));
	}
	function Ns(e, t, n) {
		Ps(e, t, n, mu());
	}
	function Ps(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Is(e)) Ls(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Or(s, o)) return ii(e, t, i, 0), G === null && ri(), !1;
			} catch {}
			if (n = ai(e, t, i, r), n !== null) return gu(n, e, r), Rs(n, t, r), !0;
		}
		return !1;
	}
	function Fs(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: fd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Is(e)) {
			if (t) throw Error(i(479));
		} else t = ai(e, n, r, 2), t !== null && gu(t, e, 2);
	}
	function Is(e) {
		var t = e.alternate;
		return e === V || t !== null && t === V;
	}
	function Ls(e, t) {
		ho = mo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Rs(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ot(e, n);
		}
	}
	var zs = {
		readContext: ia,
		use: Po,
		useCallback: xo,
		useContext: xo,
		useEffect: xo,
		useImperativeHandle: xo,
		useLayoutEffect: xo,
		useInsertionEffect: xo,
		useMemo: xo,
		useReducer: xo,
		useRef: xo,
		useState: xo,
		useDebugValue: xo,
		useDeferredValue: xo,
		useTransition: xo,
		useSyncExternalStore: xo,
		useId: xo,
		useHostTransitionStatus: xo,
		useFormState: xo,
		useActionState: xo,
		useOptimistic: xo,
		useMemoCache: xo,
		useCacheRefresh: xo
	};
	zs.useEffectEvent = xo;
	var Bs = {
		readContext: ia,
		use: Po,
		useCallback: function(e, t) {
			return Ao().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: ia,
		useEffect: us,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), cs(4194308, 4, gs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return cs(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			cs(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Ao();
			t = t === void 0 ? null : t;
			var r = e();
			if (go) {
				Ue(!0);
				try {
					e();
				} finally {
					Ue(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Ao();
			if (n !== void 0) {
				var i = n(t);
				if (go) {
					Ue(!0);
					try {
						n(t);
					} finally {
						Ue(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Ms.bind(null, V, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Ao();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Ko(e);
			var t = e.queue, n = Ns.bind(null, V, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: vs,
		useDeferredValue: function(e, t) {
			return xs(Ao(), e, t);
		},
		useTransition: function() {
			var e = Ko(!1);
			return e = Cs.bind(null, V, e.queue, !0, !1), Ao().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = V, a = Ao();
			if (I) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), G === null) throw Error(i(349));
				q & 127 || Vo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, us(Uo.bind(null, r, o, e), [e]), r.flags |= 2048, os(9, { destroy: void 0 }, Ho.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Ao(), t = G.identifierPrefix;
			if (I) {
				var n = Ai, r = ki;
				n = (r & ~(1 << 32 - We(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = _o++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = bo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Os,
		useFormState: ts,
		useActionState: ts,
		useOptimistic: function(e) {
			var t = Ao();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Fs.bind(null, V, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Fo,
		useCacheRefresh: function() {
			return Ao().memoizedState = js.bind(null, V);
		},
		useEffectEvent: function(e) {
			var t = Ao(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (W & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Vs = {
		readContext: ia,
		use: Po,
		useCallback: ys,
		useContext: ia,
		useEffect: ds,
		useImperativeHandle: _s,
		useInsertionEffect: ms,
		useLayoutEffect: hs,
		useMemo: bs,
		useReducer: Lo,
		useRef: ss,
		useState: function() {
			return Lo(Io);
		},
		useDebugValue: vs,
		useDeferredValue: function(e, t) {
			return Ss(jo(), H.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Lo(Io)[0], t = jo().memoizedState;
			return [typeof e == "boolean" ? e : No(e), t];
		},
		useSyncExternalStore: Bo,
		useId: ks,
		useHostTransitionStatus: Os,
		useFormState: ns,
		useActionState: ns,
		useOptimistic: function(e, t) {
			return qo(jo(), H, e, t);
		},
		useMemoCache: Fo,
		useCacheRefresh: As
	};
	Vs.useEffectEvent = ps;
	var Hs = {
		readContext: ia,
		use: Po,
		useCallback: ys,
		useContext: ia,
		useEffect: ds,
		useImperativeHandle: _s,
		useInsertionEffect: ms,
		useLayoutEffect: hs,
		useMemo: bs,
		useReducer: zo,
		useRef: ss,
		useState: function() {
			return zo(Io);
		},
		useDebugValue: vs,
		useDeferredValue: function(e, t) {
			var n = jo();
			return H === null ? xs(n, e, t) : Ss(n, H.memoizedState, e, t);
		},
		useTransition: function() {
			var e = zo(Io)[0], t = jo().memoizedState;
			return [typeof e == "boolean" ? e : No(e), t];
		},
		useSyncExternalStore: Bo,
		useId: ks,
		useHostTransitionStatus: Os,
		useFormState: as,
		useActionState: as,
		useOptimistic: function(e, t) {
			var n = jo();
			return H === null ? (n.baseState = e, [e, n.queue.dispatch]) : qo(n, H, e, t);
		},
		useMemoCache: Fo,
		useCacheRefresh: As
	};
	Hs.useEffectEvent = ps;
	function Us(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : f({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ws = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = mu(), i = Ha(r);
			i.payload = t, n != null && (i.callback = n), t = Ua(e, i, r), t !== null && (gu(t, e, r), Wa(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = mu(), i = Ha(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ua(e, i, r), t !== null && (gu(t, e, r), Wa(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = mu(), r = Ha(n);
			r.tag = 2, t != null && (r.callback = t), t = Ua(e, r, n), t !== null && (gu(t, e, n), Wa(t, e, n));
		}
	};
	function Gs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !kr(n, r) || !kr(i, a) : !0;
	}
	function Ks(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ws.enqueueReplaceState(t, t.state, null);
	}
	function qs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = f({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Js(e) {
		$r(e);
	}
	function Ys(e) {
		console.error(e);
	}
	function Xs(e) {
		$r(e);
	}
	function Zs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Qs(e, t, n) {
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
	function $s(e, t, n) {
		return n = Ha(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Zs(e, t);
		}, n;
	}
	function ec(e) {
		return e = Ha(e), e.tag = 3, e;
	}
	function tc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Qs(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Qs(t, n, r), typeof i != "function" && (iu === null ? iu = /* @__PURE__ */ new Set([this]) : iu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function nc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ta(t, n, a, !0), n = no.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return ro === null ? Ou() : n.alternate === null && Gl === 0 && (Gl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === B ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Ku(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === B ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Ku(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Ku(e, r, a), Ou(), !1;
		}
		if (I) return t = no.current, t === null ? (r !== Bi && (t = Error(i(423), { cause: r }), qi(xi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = xi(r, n), a = $s(e.stateNode, r, a), Ga(e, a), Gl !== 4 && (Gl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Bi && (e = Error(i(422), { cause: r }), qi(xi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = xi(o, n), Zl === null ? Zl = [o] : Zl.push(o), Gl !== 4 && (Gl = 2), t === null) return !0;
		r = xi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = $s(n.stateNode, r, e), Ga(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (iu === null || !iu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = ec(a), tc(a, e, n, r), Ga(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var rc = Error(i(461)), ic = !1;
	function ac(e, t, n, r) {
		t.child = e === null ? Ra(t, null, n, r) : La(t, e.child, n, r);
	}
	function oc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return ra(t), r = Co(e, t, n, o, a, i), s = Do(), e !== null && !ic ? (Oo(e, t, i), Ac(e, t, i)) : (I && s && Ni(t), t.flags |= 1, ac(e, t, r, i), t.child);
	}
	function sc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !fi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, cc(e, t, a, r, i)) : (e = hi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !jc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? kr : n, n(o, r) && e.ref === t.ref) return Ac(e, t, i);
		}
		return t.flags |= 1, e = pi(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function cc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (kr(a, r) && e.ref === t.ref) if (ic = !1, t.pendingProps = r = a, jc(e, i)) e.flags & 131072 && (ic = !0);
			else return t.lanes = e.lanes, Ac(e, t, i);
		}
		return gc(e, t, n, r, i);
	}
	function lc(e, t, n, r) {
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
				return dc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && z(t, a === null ? null : a.cachePool), a === null ? eo() : $a(t, a), oo(t);
			else return r = t.lanes = 536870912, dc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && z(t, null), eo(), so(t)) : (z(t, a.cachePool), $a(t, a), so(t), t.memoizedState = null);
		return ac(e, t, i, n), t.child;
	}
	function uc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function dc(e, t, n, r, i) {
		var a = R();
		return a = a === null ? null : {
			parent: ua._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && z(t, null), eo(), oo(t), e !== null && ta(e, t, r, !0), t.childLanes = i, null;
	}
	function fc(e, t) {
		return t = Tc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function pc(e, t, n) {
		return La(t, e.child, null, n), e = fc(t, t.pendingProps), e.flags |= 2, co(t), t.memoizedState = null, e;
	}
	function mc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (I) {
				if (r.mode === "hidden") return e = fc(t, r), t.lanes = 536870912, uc(null, e);
				if (ao(t), (e = Li) ? (e = of(e, zi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
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
			return fc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (ao(t), a) if (t.flags & 256) t.flags &= -257, t = pc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (ic || ta(e, t, n, !1), a = (n & e.childLanes) !== 0, ic || a) {
				if (r = G, r !== null && (s = st(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, oi(e, s), gu(r, e, s), rc;
				Ou(), t = pc(e, t, n);
			} else e = o.treeContext, Li = uf(s.nextSibling), Ii = t, I = !0, Ri = null, zi = !1, e !== null && Fi(t, e), t = fc(t, r), t.flags |= 4096;
			return t;
		}
		return e = pi(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function hc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function gc(e, t, n, r, i) {
		return ra(t), n = Co(e, t, n, r, void 0, i), r = Do(), e !== null && !ic ? (Oo(e, t, i), Ac(e, t, i)) : (I && r && Ni(t), t.flags |= 1, ac(e, t, n, i), t.child);
	}
	function _c(e, t, n, r, i, a) {
		return ra(t), t.updateQueue = null, n = To(t, r, n, i), wo(e), r = Do(), e !== null && !ic ? (Oo(e, t, a), Ac(e, t, a)) : (I && r && Ni(t), t.flags |= 1, ac(e, t, n, a), t.child);
	}
	function vc(e, t, n, r, i) {
		if (ra(t), t.stateNode === null) {
			var a = li, o = n.contextType;
			typeof o == "object" && o && (a = ia(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ws, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ba(t), o = n.contextType, a.context = typeof o == "object" && o ? ia(o) : li, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Us(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Ws.enqueueReplaceState(a, a.state, null), Ja(t, r, a, i), qa(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = qs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = li, typeof u == "object" && u && (o = ia(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Ks(t, a, r, o), za = !1;
			var f = t.memoizedState;
			a.state = f, Ja(t, r, a, i), qa(), l = t.memoizedState, s || f !== l || za ? (typeof d == "function" && (Us(t, n, d, r), l = t.memoizedState), (c = za || Gs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Va(e, t), o = t.memoizedProps, u = qs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = li, typeof l == "object" && l && (c = ia(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Ks(t, a, r, c), za = !1, f = t.memoizedState, a.state = f, Ja(t, r, a, i), qa();
			var p = t.memoizedState;
			o !== d || f !== p || za || e !== null && e.dependencies !== null && na(e.dependencies) ? (typeof s == "function" && (Us(t, n, s, r), p = t.memoizedState), (u = za || Gs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && na(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, hc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = La(t, e.child, null, i), t.child = La(t, null, n, i)) : ac(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Ac(e, t, i), e;
	}
	function yc(e, t, n, r) {
		return Gi(), t.flags |= 256, ac(e, t, n, r), t.child;
	}
	var bc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function xc(e) {
		return {
			baseLanes: e,
			cachePool: xa()
		};
	}
	function Sc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Yl), e;
	}
	function Cc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (lo.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (I) {
				if (a ? io(t) : so(t), (e = Li) ? (e = of(e, zi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
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
			return r = r.fallback, a ? (so(t), a = t.mode, c = Tc({
				mode: "hidden",
				children: c
			}, a), r = gi(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = xc(n), r.childLanes = Sc(e, s, n), t.memoizedState = bc, uc(null, r)) : (io(t), wc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (io(t), t.flags &= -257, t = Ec(e, t, n)) : t.memoizedState === null ? (so(t), c = r.fallback, a = t.mode, r = Tc({
				mode: "visible",
				children: r.children
			}, a), c = gi(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, La(t, e.child, null, n), r = t.child, r.memoizedState = xc(n), r.childLanes = Sc(e, s, n), t.memoizedState = bc, t = uc(null, r)) : (so(t), t.child = e.child, t.flags |= 128, t = null);
			else if (io(t), cf(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, qi({
					value: r,
					source: null,
					stack: null
				}), t = Ec(e, t, n);
			} else if (ic || ta(e, t, n, !1), s = (n & e.childLanes) !== 0, ic || s) {
				if (s = G, s !== null && (r = st(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, oi(e, r), gu(s, e, r), rc;
				sf(c) || Ou(), t = Ec(e, t, n);
			} else sf(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Li = uf(c.nextSibling), Ii = t, I = !0, Ri = null, zi = !1, e !== null && Fi(t, e), t = wc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (so(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = pi(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = gi(c, a, n, null), c.flags |= 2) : c = pi(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, uc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = xc(n) : (a = c.cachePool, a === null ? a = xa() : (l = ua._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = Sc(e, s, n), t.memoizedState = bc, uc(e.child, r)) : (io(t), n = e.child, e = n.sibling, n = pi(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function wc(e, t) {
		return t = Tc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Tc(e, t) {
		return e = di(22, e, null, t), e.lanes = 0, e;
	}
	function Ec(e, t, n) {
		return La(t, e.child, null, n), e = wc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Dc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), $i(e.return, t, n);
	}
	function Oc(e, t, n, r, i, a) {
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
	function kc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = lo.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, A(lo, o), ac(e, t, r, n), r = I ? Ti : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Dc(e, n, t);
			else if (e.tag === 19) Dc(e, n, t);
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
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && uo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Oc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && uo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Oc(t, !0, n, null, a, r);
				break;
			case "together":
				Oc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Ac(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Kl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (ta(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = pi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = pi(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function jc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && na(e))) : !0;
	}
	function Mc(e, t, n) {
		switch (t.tag) {
			case 3:
				me(t, t.stateNode.containerInfo), Zi(t, ua, e.memoizedState.cache), Gi();
				break;
			case 27:
			case 5:
				ve(t);
				break;
			case 4:
				me(t, t.stateNode.containerInfo);
				break;
			case 10:
				Zi(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, ao(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (io(t), e = Ac(e, t, n), e === null ? null : e.sibling) : Cc(e, t, n) : (io(t), t.flags |= 128, null);
				io(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (ta(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return kc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), A(lo, lo.current), r) break;
				return null;
			case 22: return t.lanes = 0, lc(e, t, n, t.pendingProps);
			case 24: Zi(t, ua, e.memoizedState.cache);
		}
		return Ac(e, t, n);
	}
	function Nc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) ic = !0;
		else {
			if (!jc(e, n) && !(t.flags & 128)) return ic = !1, Mc(e, t, n);
			ic = !!(e.flags & 131072);
		}
		else ic = !1, I && t.flags & 1048576 && Mi(t, Ti, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Da(t.elementType), t.type = e, typeof e == "function") fi(e) ? (r = qs(e, r), t.tag = 1, t = vc(null, t, e, r, n)) : (t.tag = 0, t = gc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === x) {
								t.tag = 11, t = oc(null, t, e, r, n);
								break a;
							} else if (a === w) {
								t.tag = 14, t = sc(null, t, e, r, n);
								break a;
							}
						}
						throw t = re(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return gc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = qs(r, t.pendingProps), vc(e, t, r, a, n);
			case 3:
				a: {
					if (me(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Va(e, t), Ja(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Zi(t, ua, r), r !== o.cache && ea(t, [ua], n, !0), qa(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = yc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = xi(Error(i(424)), t), qi(a), t = yc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Li = uf(e.firstChild), Ii = t, I = !0, Ri = null, zi = !0, n = Ra(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Gi(), r === a) {
							t = Ac(e, t, n);
							break a;
						}
						ac(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return hc(e, t), e === null ? (n = jf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : I || (n = t.type, e = t.pendingProps, r = Hd(j.current).createElement(n), r[ft] = t, r[pt] = e, Id(r, n, e), Tt(r), t.stateNode = r) : t.memoizedState = jf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ve(t), e === null && I && (r = t.stateNode = mf(t.type, t.pendingProps, j.current), Ii = t, zi = !0, a = Li, $d(t.type) ? (df = a, Li = uf(r.firstChild)) : Li = a), ac(e, t, t.pendingProps.children, n), hc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && I && ((a = r = Li) && (r = rf(r, t.type, t.pendingProps, zi), r === null ? a = !1 : (t.stateNode = r, Ii = t, Li = uf(r.firstChild), zi = !1, a = !0)), a || Vi(t)), ve(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Gd(a, o) ? r = null : s !== null && Gd(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Co(e, t, Eo, null, null, n), ep._currentValue = a), hc(e, t), ac(e, t, r, n), t.child;
			case 6: return e === null && I && ((e = n = Li) && (n = af(n, t.pendingProps, zi), n === null ? e = !1 : (t.stateNode = n, Ii = t, Li = null, e = !0)), e || Vi(t)), null;
			case 13: return Cc(e, t, n);
			case 4: return me(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = La(t, null, r, n) : ac(e, t, r, n), t.child;
			case 11: return oc(e, t, t.type, t.pendingProps, n);
			case 7: return ac(e, t, t.pendingProps, n), t.child;
			case 8: return ac(e, t, t.pendingProps.children, n), t.child;
			case 12: return ac(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Zi(t, t.type, r.value), ac(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, ra(t), a = ia(a), r = r(a), t.flags |= 1, ac(e, t, r, n), t.child;
			case 14: return sc(e, t, t.type, t.pendingProps, n);
			case 15: return cc(e, t, t.type, t.pendingProps, n);
			case 19: return kc(e, t, n);
			case 31: return mc(e, t, n);
			case 22: return lc(e, t, n, t.pendingProps);
			case 24: return ra(t), r = ia(ua), e === null ? (a = R(), a === null && (a = G, o = da(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Ba(t), Zi(t, ua, a)) : ((e.lanes & n) !== 0 && (Va(e, t), Ja(t, null, null, n), qa()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Zi(t, ua, r), r !== a.cache && ea(t, [ua], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Zi(t, ua, r))), ac(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Pc(e) {
		e.flags |= 4;
	}
	function Fc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Tu()) e.flags |= 8192;
			else throw Oa = B, Ca;
		} else e.flags &= -16777217;
	}
	function Ic(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Kf(t)) if (Tu()) e.flags |= 8192;
		else throw Oa = B, Ca;
	}
	function Lc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : tt(), e.lanes |= t, Xl |= t);
	}
	function Rc(e, t) {
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
	function U(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function zc(e, t, n) {
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
			case 14: return U(t), null;
			case 1: return U(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Qi(ua), ge(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Wi(t) ? Pc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ki())), U(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Pc(t), o === null ? (U(t), Fc(t, a, null, r, n)) : (U(t), Ic(t, o))) : o ? o === e.memoizedState ? (U(t), t.flags &= -16777217) : (Pc(t), U(t), Ic(t, o)) : (e = e.memoizedProps, e !== r && Pc(t), U(t), Fc(t, a, e, r, n)), null;
			case 27:
				if (ye(t), n = j.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Pc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return U(t), null;
					}
					e = ue.current, Wi(t) ? Hi(t, e) : (e = mf(a, r, n), t.stateNode = e, Pc(t));
				}
				return U(t), null;
			case 5:
				if (ye(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Pc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return U(t), null;
					}
					if (o = ue.current, Wi(t)) Hi(t, o);
					else {
						var s = Hd(j.current);
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
						o[ft] = t, o[pt] = r;
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
						r && Pc(t);
					}
				}
				return U(t), Fc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Pc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = j.current, Wi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Ii, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[ft] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Nd(e.nodeValue, n)), e || Vi(t, !0);
					} else e = Hd(e).createTextNode(r), e[ft] = t, t.stateNode = e;
				}
				return U(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Wi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[ft] = t;
						} else Gi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						U(t), e = !1;
					} else n = Ki(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (co(t), t) : (co(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return U(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Wi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[ft] = t;
						} else Gi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						U(t), a = !1;
					} else a = Ki(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (co(t), t) : (co(t), null);
				}
				return co(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Lc(t, t.updateQueue), U(t), null);
			case 4: return ge(), e === null && Cd(t.stateNode.containerInfo), U(t), null;
			case 10: return Qi(t.type), U(t), null;
			case 19:
				if (le(lo), r = t.memoizedState, r === null) return U(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Rc(r, !1);
				else {
					if (Gl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = uo(e), o !== null) {
							for (t.flags |= 128, Rc(r, !1), e = o.updateQueue, t.updateQueue = e, Lc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) mi(n, e), n = n.sibling;
							return A(lo, lo.current & 1 | 2), I && ji(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && Me() > nu && (t.flags |= 128, a = !0, Rc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = uo(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Lc(t, e), Rc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !I) return U(t), null;
					} else 2 * Me() - r.renderingStartTime > nu && n !== 536870912 && (t.flags |= 128, a = !0, Rc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (U(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Me(), e.sibling = null, n = lo.current, A(lo, a ? n & 1 | 2 : n & 1), I && ji(t, r.treeForkCount), e);
			case 22:
			case 23: return co(t), to(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (U(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : U(t), n = t.updateQueue, n !== null && Lc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && le(L), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Qi(ua), U(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Bc(e, t) {
		switch (Pi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Qi(ua), ge(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return ye(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (co(t), t.alternate === null) throw Error(i(340));
					Gi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (co(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Gi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return le(lo), null;
			case 4: return ge(), null;
			case 10: return Qi(t.type), null;
			case 22:
			case 23: return co(t), to(), e !== null && le(L), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Qi(ua), null;
			case 25: return null;
			default: return null;
		}
	}
	function Vc(e, t) {
		switch (Pi(t), t.tag) {
			case 3:
				Qi(ua), ge();
				break;
			case 26:
			case 27:
			case 5:
				ye(t);
				break;
			case 4:
				ge();
				break;
			case 31:
				t.memoizedState !== null && co(t);
				break;
			case 13:
				co(t);
				break;
			case 19:
				le(lo);
				break;
			case 10:
				Qi(t.type);
				break;
			case 22:
			case 23:
				co(t), to(), e !== null && le(L);
				break;
			case 24: Qi(ua);
		}
	}
	function Hc(e, t) {
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
			X(t, t.return, e);
		}
	}
	function Uc(e, t, n) {
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
								X(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			X(t, t.return, e);
		}
	}
	function Wc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Xa(t, n);
			} catch (t) {
				X(e, e.return, t);
			}
		}
	}
	function Gc(e, t, n) {
		n.props = qs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			X(e, t, n);
		}
	}
	function Kc(e, t) {
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
			X(e, t, n);
		}
	}
	function qc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			X(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			X(e, t, n);
		}
		else n.current = null;
	}
	function Jc(e) {
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
			X(e, e.return, t);
		}
	}
	function Yc(e, t, n) {
		try {
			var r = e.stateNode;
			Ld(r, e.type, n, t), r[pt] = t;
		} catch (t) {
			X(e, e.return, t);
		}
	}
	function Xc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && $d(e.type) || e.tag === 4;
	}
	function Zc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Xc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && $d(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Qc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = on));
		else if (r !== 4 && (r === 27 && $d(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Qc(e, t, n), e = e.sibling; e !== null;) Qc(e, t, n), e = e.sibling;
	}
	function $c(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && $d(e.type) && (n = e.stateNode), e = e.child, e !== null)) for ($c(e, t, n), e = e.sibling; e !== null;) $c(e, t, n), e = e.sibling;
	}
	function el(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Id(t, r, n), t[ft] = e, t[pt] = n;
		} catch (t) {
			X(e, e.return, t);
		}
	}
	var tl = !1, nl = !1, rl = !1, il = typeof WeakSet == "function" ? WeakSet : Set, al = null;
	function ol(e, t) {
		if (e = e.containerInfo, Bd = cp, e = Nr(e), Pr(e)) {
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
		}, cp = !1, al = t; al !== null;) if (t = al, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, al = e;
		else for (; al !== null;) {
			switch (t = al, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = qs(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							X(n, n.return, e);
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
				e.return = t.return, al = e;
				break;
			}
			al = t.return;
		}
	}
	function sl(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Sl(e, n), r & 4 && Hc(5, n);
				break;
			case 1:
				if (Sl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					X(n, n.return, e);
				}
				else {
					var i = qs(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						X(n, n.return, e);
					}
				}
				r & 64 && Wc(n), r & 512 && Kc(n, n.return);
				break;
			case 3:
				if (Sl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Xa(e, t);
					} catch (e) {
						X(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && el(n);
			case 26:
			case 5:
				Sl(e, n), t === null && r & 4 && Jc(n), r & 512 && Kc(n, n.return);
				break;
			case 12:
				Sl(e, n);
				break;
			case 31:
				Sl(e, n), r & 4 && pl(e, n);
				break;
			case 13:
				Sl(e, n), r & 4 && ml(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Yu.bind(null, n), lf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || tl, !r) {
					t = t !== null && t.memoizedState !== null || nl, i = tl;
					var a = nl;
					tl = r, (nl = t) && !a ? wl(e, n, (n.subtreeFlags & 8772) != 0) : Sl(e, n), tl = i, nl = a;
				}
				break;
			case 30: break;
			default: Sl(e, n);
		}
	}
	function cl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, cl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && bt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var ll = null, ul = !1;
	function dl(e, t, n) {
		for (n = n.child; n !== null;) fl(e, t, n), n = n.sibling;
	}
	function fl(e, t, n) {
		if (He && typeof He.onCommitFiberUnmount == "function") try {
			He.onCommitFiberUnmount(Ve, n);
		} catch {}
		switch (n.tag) {
			case 26:
				nl || qc(n, t), dl(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				nl || qc(n, t);
				var r = ll, i = ul;
				$d(n.type) && (ll = n.stateNode, ul = !1), dl(e, t, n), hf(n.stateNode), ll = r, ul = i;
				break;
			case 5: nl || qc(n, t);
			case 6:
				if (r = ll, i = ul, ll = null, dl(e, t, n), ll = r, ul = i, ll !== null) if (ul) try {
					(ll.nodeType === 9 ? ll.body : ll.nodeName === "HTML" ? ll.ownerDocument.body : ll).removeChild(n.stateNode);
				} catch (e) {
					X(n, t, e);
				}
				else try {
					ll.removeChild(n.stateNode);
				} catch (e) {
					X(n, t, e);
				}
				break;
			case 18:
				ll !== null && (ul ? (e = ll, ef(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Pp(e)) : ef(ll, n.stateNode));
				break;
			case 4:
				r = ll, i = ul, ll = n.stateNode.containerInfo, ul = !0, dl(e, t, n), ll = r, ul = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Uc(2, n, t), nl || Uc(4, n, t), dl(e, t, n);
				break;
			case 1:
				nl || (qc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Gc(n, t, r)), dl(e, t, n);
				break;
			case 21:
				dl(e, t, n);
				break;
			case 22:
				nl = (r = nl) || n.memoizedState !== null, dl(e, t, n), nl = r;
				break;
			default: dl(e, t, n);
		}
	}
	function pl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Pp(e);
			} catch (e) {
				X(t, t.return, e);
			}
		}
	}
	function ml(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Pp(e);
		} catch (e) {
			X(t, t.return, e);
		}
	}
	function hl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new il()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new il()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function gl(e, t) {
		var n = hl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Xu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function _l(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if ($d(c.type)) {
							ll = c.stateNode, ul = !1;
							break a;
						}
						break;
					case 5:
						ll = c.stateNode, ul = !1;
						break a;
					case 3:
					case 4:
						ll = c.stateNode.containerInfo, ul = !0;
						break a;
				}
				c = c.return;
			}
			if (ll === null) throw Error(i(160));
			fl(o, s, a), ll = null, ul = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) yl(t, e), t = t.sibling;
	}
	var vl = null;
	function yl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				_l(t, e), bl(e), r & 4 && (Uc(3, e, e.return), Hc(3, e), Uc(5, e, e.return));
				break;
			case 1:
				_l(t, e), bl(e), r & 512 && (nl || n === null || qc(n, n.return)), r & 64 && tl && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = vl;
				if (_l(t, e), bl(e), r & 512 && (nl || n === null || qc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[yt] || o[ft] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Id(o, r, n), o[ft] = e, Tt(o), r = o;
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
							o[ft] = e, Tt(o), r = o;
						}
						e.stateNode = r;
					} else Wf(a, e.type, e.stateNode);
					else e.stateNode = Rf(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Yc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Wf(a, e.type, e.stateNode) : Rf(a, r, e.memoizedProps));
				}
				break;
			case 27:
				_l(t, e), bl(e), r & 512 && (nl || n === null || qc(n, n.return)), n !== null && r & 4 && Yc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (_l(t, e), bl(e), r & 512 && (nl || n === null || qc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Zt(a, "");
					} catch (t) {
						X(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Yc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (rl = !0);
				break;
			case 6:
				if (_l(t, e), bl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						X(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Hf = null, a = vl, vl = vf(t.containerInfo), _l(t, e), vl = a, bl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Pp(t.containerInfo);
				} catch (t) {
					X(e, e.return, t);
				}
				rl && (rl = !1, xl(e));
				break;
			case 4:
				r = vl, vl = vf(e.stateNode.containerInfo), _l(t, e), bl(e), vl = r;
				break;
			case 12:
				_l(t, e), bl(e);
				break;
			case 31:
				_l(t, e), bl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, gl(e, r)));
				break;
			case 13:
				_l(t, e), bl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (eu = Me()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, gl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = tl, d = nl;
				if (tl = u || a, nl = d || l, _l(t, e), nl = d, tl = u, bl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || tl || nl || Cl(e)), n = null, t = e;;) {
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
								X(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								X(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? tf(m, !0) : tf(l.stateNode, !1);
							} catch (e) {
								X(l, l.return, e);
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
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, gl(e, n))));
				break;
			case 19:
				_l(t, e), bl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, gl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: _l(t, e), bl(e);
		}
	}
	function bl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Xc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						$c(e, Zc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Zt(o, ""), n.flags &= -33), $c(e, Zc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Qc(e, Zc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				X(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function xl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			xl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function Sl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) sl(e, t.alternate, t), t = t.sibling;
	}
	function Cl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Uc(4, t, t.return), Cl(t);
					break;
				case 1:
					qc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Gc(t, t.return, n), Cl(t);
					break;
				case 27: hf(t.stateNode);
				case 26:
				case 5:
					qc(t, t.return), Cl(t);
					break;
				case 22:
					t.memoizedState === null && Cl(t);
					break;
				case 30:
					Cl(t);
					break;
				default: Cl(t);
			}
			e = e.sibling;
		}
	}
	function wl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					wl(i, a, n), Hc(4, a);
					break;
				case 1:
					if (wl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						X(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ya(c[i], s);
						} catch (e) {
							X(r, r.return, e);
						}
					}
					n && o & 64 && Wc(a), Kc(a, a.return);
					break;
				case 27: el(a);
				case 26:
				case 5:
					wl(i, a, n), n && r === null && o & 4 && Jc(a), Kc(a, a.return);
					break;
				case 12:
					wl(i, a, n);
					break;
				case 31:
					wl(i, a, n), n && o & 4 && pl(i, a);
					break;
				case 13:
					wl(i, a, n), n && o & 4 && ml(i, a);
					break;
				case 22:
					a.memoizedState === null && wl(i, a, n), Kc(a, a.return);
					break;
				case 30: break;
				default: wl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Tl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && fa(n));
	}
	function El(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && fa(e));
	}
	function Dl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Ol(e, t, n, r), t = t.sibling;
	}
	function Ol(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Dl(e, t, n, r), i & 2048 && Hc(9, t);
				break;
			case 1:
				Dl(e, t, n, r);
				break;
			case 3:
				Dl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && fa(e)));
				break;
			case 12:
				if (i & 2048) {
					Dl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						X(t, t.return, e);
					}
				} else Dl(e, t, n, r);
				break;
			case 31:
				Dl(e, t, n, r);
				break;
			case 13:
				Dl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? Dl(e, t, n, r) : (a._visibility |= 2, kl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? Dl(e, t, n, r) : Al(e, t), i & 2048 && Tl(o, t);
				break;
			case 24:
				Dl(e, t, n, r), i & 2048 && El(t.alternate, t);
				break;
			default: Dl(e, t, n, r);
		}
	}
	function kl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					kl(a, o, s, c, i), Hc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, kl(a, o, s, c, i)) : u._visibility & 2 ? kl(a, o, s, c, i) : Al(a, o), i && l & 2048 && Tl(o.alternate, o);
					break;
				case 24:
					kl(a, o, s, c, i), i && l & 2048 && El(o.alternate, o);
					break;
				default: kl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Al(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Al(n, r), i & 2048 && Tl(r.alternate, r);
					break;
				case 24:
					Al(n, r), i & 2048 && El(r.alternate, r);
					break;
				default: Al(n, r);
			}
			t = t.sibling;
		}
	}
	var jl = 8192;
	function Ml(e, t, n) {
		if (e.subtreeFlags & jl) for (e = e.child; e !== null;) Nl(e, t, n), e = e.sibling;
	}
	function Nl(e, t, n) {
		switch (e.tag) {
			case 26:
				Ml(e, t, n), e.flags & jl && e.memoizedState !== null && qf(n, vl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Ml(e, t, n);
				break;
			case 3:
			case 4:
				var r = vl;
				vl = vf(e.stateNode.containerInfo), Ml(e, t, n), vl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = jl, jl = 16777216, Ml(e, t, n), jl = r) : Ml(e, t, n));
				break;
			default: Ml(e, t, n);
		}
	}
	function Pl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Fl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				al = r, Rl(r, e);
			}
			Pl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Il(e), e = e.sibling;
	}
	function Il(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Fl(e), e.flags & 2048 && Uc(9, e, e.return);
				break;
			case 3:
				Fl(e);
				break;
			case 12:
				Fl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ll(e)) : Fl(e);
				break;
			default: Fl(e);
		}
	}
	function Ll(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				al = r, Rl(r, e);
			}
			Pl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Uc(8, t, t.return), Ll(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Ll(t));
					break;
				default: Ll(t);
			}
			e = e.sibling;
		}
	}
	function Rl(e, t) {
		for (; al !== null;) {
			var n = al;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Uc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: fa(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, al = r;
			else a: for (n = e; al !== null;) {
				r = al;
				var i = r.sibling, a = r.return;
				if (cl(r), r === n) {
					al = null;
					break a;
				}
				if (i !== null) {
					i.return = a, al = i;
					break a;
				}
				al = a;
			}
		}
	}
	var zl = {
		getCacheForType: function(e) {
			var t = ia(ua), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return ia(ua).controller.signal;
		}
	}, Bl = typeof WeakMap == "function" ? WeakMap : Map, W = 0, G = null, K = null, q = 0, J = 0, Vl = null, Y = !1, Hl = !1, Ul = !1, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = 0, Zl = null, Ql = null, $l = !1, eu = 0, tu = 0, nu = Infinity, ru = null, iu = null, au = 0, ou = null, su = null, cu = 0, lu = 0, uu = null, du = null, fu = 0, pu = null;
	function mu() {
		return W & 2 && q !== 0 ? q & -q : O.T === null ? ut() : fd();
	}
	function hu() {
		if (Yl === 0) if (!(q & 536870912) || I) {
			var e = Ye;
			Ye <<= 1, !(Ye & 3932160) && (Ye = 262144), Yl = e;
		} else Yl = 536870912;
		return e = no.current, e !== null && (e.flags |= 32), Yl;
	}
	function gu(e, t, n) {
		(e === G && (J === 2 || J === 9) || e.cancelPendingCommit !== null) && (Cu(e, 0), bu(e, q, Yl, !1)), rt(e, n), (!(W & 2) || e !== G) && (e === G && (!(W & 2) && (ql |= n), Gl === 4 && bu(e, q, Yl, !1)), id(e));
	}
	function _u(e, t, n) {
		if (W & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || $e(e, t), a = r ? ju(e, t) : ku(e, t, !0), o = r;
		do {
			if (a === 0) {
				Hl && !r && bu(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !yu(n)) {
					a = ku(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Zl;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Cu(c, s).flags |= 256), s = ku(c, s, !1), s !== 2) {
								if (Ul && !l) {
									c.errorRecoveryDisabledLanes |= o, ql |= o, a = 4;
									break a;
								}
								o = Ql, Ql = a, o !== null && (Ql === null ? Ql = o : Ql.push.apply(Ql, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Cu(e, 0), bu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							bu(r, t, Yl, !Y);
							break a;
						case 2:
							Ql = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = eu + 300 - Me(), 10 < a)) {
						if (bu(r, t, Yl, !Y), Qe(r, 0, !0) !== 0) break a;
						cu = t, r.timeoutHandle = Jd(vu.bind(null, r, n, Ql, ru, $l, t, Yl, ql, Xl, Y, o, "Throttled", -0, 0), a);
						break a;
					}
					vu(r, n, Ql, ru, $l, t, Yl, ql, Xl, Y, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		id(e);
	}
	function vu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: on
			}, Nl(t, a, d);
			var m = (a & 62914560) === a ? eu - Me() : (a & 4194048) === a ? tu - Me() : 0;
			if (m = Yf(d, m), m !== null) {
				cu = a, e.cancelPendingCommit = m(Ru.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), bu(e, a, o, !l);
				return;
			}
		}
		Ru(e, t, a, n, r, i, o, s, c);
	}
	function yu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Or(a(), i)) return !1;
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
	function bu(e, t, n, r) {
		t &= ~Jl, t &= ~ql, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - We(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && at(e, n, t);
	}
	function xu() {
		return W & 6 ? !0 : (ad(0, !1), !1);
	}
	function Su() {
		if (K !== null) {
			if (J === 0) var e = K.return;
			else e = K, Xi = Yi = null, ko(e), ja = null, Ma = 0, e = K;
			for (; e !== null;) Vc(e.alternate, e), e = e.return;
			K = null;
		}
	}
	function Cu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, Yd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), cu = 0, Su(), G = e, K = n = pi(e.current, null), q = t, J = 0, Vl = null, Y = !1, Hl = $e(e, t), Ul = !1, Xl = Yl = Jl = ql = Kl = Gl = 0, Ql = Zl = null, $l = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - We(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Wl = t, ri(), n;
	}
	function wu(e, t) {
		V = null, O.H = zs, t === Sa || t === wa ? (t = ka(), J = 3) : t === Ca ? (t = ka(), J = 4) : J = t === rc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Vl = t, K === null && (Gl = 1, Zs(e, xi(t, e.current)));
	}
	function Tu() {
		var e = no.current;
		return e === null ? !0 : (q & 4194048) === q ? ro === null : (q & 62914560) === q || q & 536870912 ? e === ro : !1;
	}
	function Eu() {
		var e = O.H;
		return O.H = zs, e === null ? zs : e;
	}
	function Du() {
		var e = O.A;
		return O.A = zl, e;
	}
	function Ou() {
		Gl = 4, Y || (q & 4194048) !== q && no.current !== null || (Hl = !0), !(Kl & 134217727) && !(ql & 134217727) || G === null || bu(G, q, Yl, !1);
	}
	function ku(e, t, n) {
		var r = W;
		W |= 2;
		var i = Eu(), a = Du();
		(G !== e || q !== t) && (ru = null, Cu(e, t)), t = !1;
		var o = Gl;
		a: do
			try {
				if (J !== 0 && K !== null) {
					var s = K, c = Vl;
					switch (J) {
						case 8:
							Su(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							no.current === null && (t = !0);
							var l = J;
							if (J = 0, Vl = null, Fu(e, s, c, l), n && Hl) {
								o = 0;
								break a;
							}
							break;
						default: l = J, J = 0, Vl = null, Fu(e, s, c, l);
					}
				}
				Au(), o = Gl;
				break;
			} catch (t) {
				wu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Xi = Yi = null, W = r, O.H = i, O.A = a, K === null && (G = null, q = 0, ri()), o;
	}
	function Au() {
		for (; K !== null;) Nu(K);
	}
	function ju(e, t) {
		var n = W;
		W |= 2;
		var r = Eu(), a = Du();
		G !== e || q !== t ? (ru = null, nu = Me() + 500, Cu(e, t)) : Hl = $e(e, t);
		a: do
			try {
				if (J !== 0 && K !== null) {
					t = K;
					var o = Vl;
					b: switch (J) {
						case 1:
							J = 0, Vl = null, Fu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Ta(o)) {
								J = 0, Vl = null, Pu(t);
								break;
							}
							t = function() {
								J !== 2 && J !== 9 || G !== e || (J = 7), id(e);
							}, o.then(t, t);
							break a;
						case 3:
							J = 7;
							break a;
						case 4:
							J = 5;
							break a;
						case 7:
							Ta(o) ? (J = 0, Vl = null, Pu(t)) : (J = 0, Vl = null, Fu(e, t, o, 7));
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
											u === null ? K = null : (K = u, Iu(u));
										}
										break b;
									}
							}
							J = 0, Vl = null, Fu(e, t, o, 5);
							break;
						case 6:
							J = 0, Vl = null, Fu(e, t, o, 6);
							break;
						case 8:
							Su(), Gl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Mu();
				break;
			} catch (t) {
				wu(e, t);
			}
		while (1);
		return Xi = Yi = null, O.H = r, O.A = a, W = n, K === null ? (G = null, q = 0, ri(), Gl) : 0;
	}
	function Mu() {
		for (; K !== null && !Ae();) Nu(K);
	}
	function Nu(e) {
		var t = Nc(e.alternate, e, Wl);
		e.memoizedProps = e.pendingProps, t === null ? Iu(e) : K = t;
	}
	function Pu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = _c(n, t, t.pendingProps, t.type, void 0, q);
				break;
			case 11:
				t = _c(n, t, t.pendingProps, t.type.render, t.ref, q);
				break;
			case 5: ko(t);
			default: Vc(n, t), t = K = mi(t, Wl), t = Nc(n, t, Wl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Iu(e) : K = t;
	}
	function Fu(e, t, n, r) {
		Xi = Yi = null, ko(t), ja = null, Ma = 0;
		var i = t.return;
		try {
			if (nc(e, i, t, n, q)) {
				Gl = 1, Zs(e, xi(n, e.current)), K = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw K = i, t;
			Gl = 1, Zs(e, xi(n, e.current)), K = null;
			return;
		}
		t.flags & 32768 ? (I || r === 1 ? e = !0 : Hl || q & 536870912 ? e = !1 : (Y = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = no.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Lu(t, e)) : Iu(t);
	}
	function Iu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Lu(t, Y);
				return;
			}
			e = t.return;
			var n = zc(t.alternate, t, Wl);
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
		Gl === 0 && (Gl = 5);
	}
	function Lu(e, t) {
		do {
			var n = Bc(e.alternate, e);
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
		Gl = 6, K = null;
	}
	function Ru(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Uu();
		while (au !== 0);
		if (W & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= ni, it(e, n, o, s, c, l), e === G && (K = G = null, q = 0), su = t, ou = e, cu = n, lu = o, uu = a, du = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Zu(Ie, function() {
				return Wu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = O.T, O.T = null, a = k.p, k.p = 2, s = W, W |= 4;
				try {
					ol(e, t, n);
				} finally {
					W = s, k.p = a, O.T = r;
				}
			}
			au = 1, zu(), Bu(), Vu();
		}
	}
	function zu() {
		if (au === 1) {
			au = 0;
			var e = ou, t = su, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = O.T, O.T = null;
				var r = k.p;
				k.p = 2;
				var i = W;
				W |= 4;
				try {
					yl(t, e);
					var a = Vd, o = Nr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Mr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Pr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = jr(s, h), v = jr(s, g);
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
					cp = !!Bd, Vd = Bd = null;
				} finally {
					W = i, k.p = r, O.T = n;
				}
			}
			e.current = t, au = 2;
		}
	}
	function Bu() {
		if (au === 2) {
			au = 0;
			var e = ou, t = su, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = O.T, O.T = null;
				var r = k.p;
				k.p = 2;
				var i = W;
				W |= 4;
				try {
					sl(e, t.alternate, t);
				} finally {
					W = i, k.p = r, O.T = n;
				}
			}
			au = 3;
		}
	}
	function Vu() {
		if (au === 4 || au === 3) {
			au = 0, je();
			var e = ou, t = su, n = cu, r = du;
			t.subtreeFlags & 10256 || t.flags & 10256 ? au = 5 : (au = 0, su = ou = null, Hu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (iu = null), lt(n), t = t.stateNode, He && typeof He.onCommitFiberRoot == "function") try {
				He.onCommitFiberRoot(Ve, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = O.T, i = k.p, k.p = 2, O.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					O.T = t, k.p = i;
				}
			}
			cu & 3 && Uu(), id(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === pu ? fu++ : (fu = 0, pu = e) : fu = 0, ad(0, !1);
		}
	}
	function Hu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, fa(t)));
	}
	function Uu() {
		return zu(), Bu(), Vu(), Wu();
	}
	function Wu() {
		if (au !== 5) return !1;
		var e = ou, t = lu;
		lu = 0;
		var n = lt(cu), r = O.T, a = k.p;
		try {
			k.p = 32 > n ? 32 : n, O.T = null, n = uu, uu = null;
			var o = ou, s = cu;
			if (au = 0, su = ou = null, cu = 0, W & 6) throw Error(i(331));
			var c = W;
			if (W |= 4, Il(o.current), Ol(o, o.current, s, n), W = c, ad(0, !1), He && typeof He.onPostCommitFiberRoot == "function") try {
				He.onPostCommitFiberRoot(Ve, o);
			} catch {}
			return !0;
		} finally {
			k.p = a, O.T = r, Hu(e, t);
		}
	}
	function Gu(e, t, n) {
		t = xi(n, t), t = $s(e.stateNode, t, 2), e = Ua(e, t, 2), e !== null && (rt(e, 2), id(e));
	}
	function X(e, t, n) {
		if (e.tag === 3) Gu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Gu(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (iu === null || !iu.has(r))) {
					e = xi(n, e), n = ec(2), r = Ua(t, n, 2), r !== null && (tc(n, r, t, e), rt(r, 2), id(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Bl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Ul = !0, i.add(n), e = qu.bind(null, e, t, n), t.then(e, e));
	}
	function qu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, G === e && (q & n) === n && (Gl === 4 || Gl === 3 && (q & 62914560) === q && 300 > Me() - eu ? !(W & 2) && Cu(e, 0) : Jl |= n, Xl === q && (Xl = 0)), id(e);
	}
	function Ju(e, t) {
		t === 0 && (t = tt()), e = oi(e, t), e !== null && (rt(e, t), id(e));
	}
	function Yu(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Ju(e, n);
	}
	function Xu(e, t) {
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
		r !== null && r.delete(t), Ju(e, n);
	}
	function Zu(e, t) {
		return Oe(e, t);
	}
	var Qu = null, $u = null, ed = !1, td = !1, nd = !1, rd = 0;
	function id(e) {
		e !== $u && e.next === null && ($u === null ? Qu = $u = e : $u = $u.next = e), td = !0, ed || (ed = !0, dd());
	}
	function ad(e, t) {
		if (!nd && td) {
			nd = !0;
			do
				for (var n = !1, r = Qu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - We(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, ud(r, a));
					} else a = q, a = Qe(r, r === G ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || $e(r, a) || (n = !0, ud(r, a));
					r = r.next;
				}
			while (n);
			nd = !1;
		}
	}
	function od() {
		sd();
	}
	function sd() {
		td = ed = !1;
		var e = 0;
		rd !== 0 && qd() && (e = rd);
		for (var t = Me(), n = null, r = Qu; r !== null;) {
			var i = r.next, a = cd(r, t);
			a === 0 ? (r.next = null, n === null ? Qu = i : n.next = i, i === null && ($u = n)) : (n = r, (e !== 0 || a & 3) && (td = !0)), r = i;
		}
		au !== 0 && au !== 5 || ad(e, !1), rd !== 0 && (rd = 0);
	}
	function cd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - We(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = et(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = G, n = q, n = Qe(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (J === 2 || J === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && ke(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || $e(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && ke(r), lt(n)) {
				case 2:
				case 8:
					n = Fe;
					break;
				case 32:
					n = Ie;
					break;
				case 268435456:
					n = Re;
					break;
				default: n = Ie;
			}
			return r = ld.bind(null, e), n = Oe(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && ke(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function ld(e, t) {
		if (au !== 0 && au !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Uu() && e.callbackNode !== n) return null;
		var r = q;
		return r = Qe(e, e === G ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (_u(e, r, t), cd(e, Me()), e.callbackNode != null && e.callbackNode === n ? ld.bind(null, e) : null);
	}
	function ud(e, t) {
		if (Uu()) return null;
		_u(e, t, !0);
	}
	function dd() {
		Zd(function() {
			W & 6 ? Oe(Pe, od) : sd();
		});
	}
	function fd() {
		if (rd === 0) {
			var e = ha;
			e === 0 && (e = Je, Je <<= 1, !(Je & 261888) && (Je = 256)), rd = e;
		}
		return rd;
	}
	function pd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : an("" + e);
	}
	function md(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function hd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = pd((i[pt] || null).action), o = r.submitter;
			o && (t = (t = o[pt] || null) ? pd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Dn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (rd !== 0) {
								var e = o ? md(i, o) : new FormData(i);
								Ts(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? md(i, o) : new FormData(i), Ts(n, {
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
	for (var gd = 0; gd < Zr.length; gd++) {
		var _d = Zr[gd];
		Qr(_d.toLowerCase(), "on" + (_d[0].toUpperCase() + _d.slice(1)));
	}
	Qr(Ur, "onAnimationEnd"), Qr(Wr, "onAnimationIteration"), Qr(Gr, "onAnimationStart"), Qr("dblclick", "onDoubleClick"), Qr("focusin", "onFocus"), Qr("focusout", "onBlur"), Qr(Kr, "onTransitionRun"), Qr(qr, "onTransitionStart"), Qr(Jr, "onTransitionCancel"), Qr(Yr, "onTransitionEnd"), kt("onMouseEnter", ["mouseout", "mouseover"]), kt("onMouseLeave", ["mouseout", "mouseover"]), kt("onPointerEnter", ["pointerout", "pointerover"]), kt("onPointerLeave", ["pointerout", "pointerover"]), Ot("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ot("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ot("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Ot("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ot("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ot("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var vd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), yd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(vd));
	function bd(e, t) {
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
		var n = t[ht];
		n === void 0 && (n = t[ht] = /* @__PURE__ */ new Set());
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
			e[Sd] = !0, Et.forEach(function(t) {
				t !== "selectionchange" && (yd.has(t) || xd(t, !1, e), xd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Sd] || (t[Sd] = !0, xd("selectionchange", !1, t));
		}
	}
	function wd(e, t, n, r) {
		switch (hp(t)) {
			case 2:
				var i = lp;
				break;
			case 8:
				i = up;
				break;
			default: i = dp;
		}
		n = i.bind(null, t, n, e), i = void 0, !gn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
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
					if (s = xt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		pn(function() {
			var r = a, i = cn(n), s = [];
			a: {
				var c = Xr.get(e);
				if (c !== void 0) {
					var l = Dn, u = e;
					switch (e) {
						case "keypress": if (Sn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Gn;
							break;
						case "focusin":
							u = "focus", l = In;
							break;
						case "focusout":
							u = "blur", l = In;
							break;
						case "beforeblur":
						case "afterblur":
							l = In;
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
							l = Pn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Fn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = qn;
							break;
						case Ur:
						case Wr:
						case Gr:
							l = Ln;
							break;
						case Yr:
							l = Jn;
							break;
						case "scroll":
						case "scrollend":
							l = kn;
							break;
						case "wheel":
							l = Yn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Rn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Kn;
							break;
						case "toggle":
						case "beforetoggle": l = Xn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = mn(m, p), g != null && d.push(Ed(m, g, h))), f) break;
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
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== sn && (u = n.relatedTarget || n.fromElement) && (xt(u) || u[mt])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? xt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = Pn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Kn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : Ct(l), h = u == null ? c : Ct(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, xt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
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
					if (c = r ? Ct(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = gr;
					else if (ur(c)) if (_r) v = Er;
					else {
						v = wr;
						var y = Cr;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && tn(r.elementType) && (v = gr) : v = Tr;
					if (v &&= v(e, r)) {
						dr(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && qt(c, "number", c.value);
				}
				switch (y = r ? Ct(r) : window, e) {
					case "focusin":
						(ur(y) || y.contentEditable === "true") && (Ir = y, N = r, Lr = null);
						break;
					case "focusout":
						Lr = N = Ir = null;
						break;
					case "mousedown":
						Rr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Rr = !1, P(s, n, i);
						break;
					case "selectionchange": if (Fr) break;
					case "keydown":
					case "keyup": P(s, n, i);
				}
				var b;
				if (Qn) b: {
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
				else or ? ir(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (tr && n.locale !== "ko" && (or || x !== "onCompositionStart" ? x === "onCompositionEnd" && or && (b = xn()) : (vn = i, yn = "value" in vn ? vn.value : vn.textContent, or = !0)), y = Dd(r, x), 0 < y.length && (x = new zn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = ar(n), b !== null && (x.data = b)))), (b = er ? sr(e, n) : cr(e, n)) && (x = Dd(r, "onBeforeInput"), 0 < x.length && (y = new zn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), hd(s, e, r, n, i);
			}
			bd(s, t);
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
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = mn(e, n), i != null && r.unshift(Ed(e, i, a)), i = mn(e, t), i != null && r.push(Ed(e, i, a))), e.tag === 3) return r;
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
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = mn(n, a), l != null && o.unshift(Ed(n, l, c))) : i || (l = mn(n, a), l != null && o.push(Ed(n, l, c)))), n = n.return;
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
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Zt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Zt(e, "" + r);
				break;
			case "className":
				Ft(e, "class", r);
				break;
			case "tabIndex":
				Ft(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Ft(e, n, r);
				break;
			case "style":
				en(e, r, o);
				break;
			case "data": if (t !== "object") {
				Ft(e, "data", r);
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
				r = an("" + r), e.setAttribute(n, r);
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
				r = an("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = on);
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
				n = an("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				Z("beforetoggle", e), Z("toggle", e), Pt(e, "popover", r);
				break;
			case "xlinkActuate":
				It(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				It(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				It(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				It(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				It(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				It(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				It(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				It(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				It(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Pt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = nn.get(n) || n, Pt(e, n, r));
		}
	}
	function Fd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				en(e, r, o);
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
				typeof r == "string" ? Zt(e, r) : (typeof r == "number" || typeof r == "bigint") && Zt(e, "" + r);
				break;
			case "onScroll":
				r != null && Z("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Z("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = on);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!Dt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[pt] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Pt(e, n, r);
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
				Kt(e, o, c, l, u, s, a, !1);
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
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Jt(e, !!r, n, !0) : Jt(e, !!r, t, !1);
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
				Xt(e, r, a, o);
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
				for (r = 0; r < vd.length; r++) Z(vd[r], e);
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
			default: if (tn(t)) {
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
				Gt(e, s, c, l, u, d, o, a);
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
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Jt(e, !!n, n ? [] : "", !1) : Jt(e, !!n, t, !0)) : Jt(e, !!n, p, !1);
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
				Yt(e, p, m);
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
			default: if (tn(t)) {
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
					e.removeChild(i), Pp(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") hf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, hf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[yt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && hf(e.ownerDocument.body);
			n = i;
		} while (n);
		Pp(t);
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
					nf(n), bt(n);
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
			else if (!e[yt]) switch (t) {
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
		bt(e);
	}
	var gf = /* @__PURE__ */ new Map(), _f = /* @__PURE__ */ new Set();
	function vf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var yf = k.d;
	k.d = {
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
		var e = yf.f(), t = xu();
		return e || t;
	}
	function xf(e) {
		var t = St(e);
		t !== null && t.tag === 5 && t.type === "form" ? Ds(t) : yf.r(e);
	}
	var Sf = typeof document > "u" ? null : document;
	function Cf(e, t, n) {
		var r = Sf;
		if (r && typeof t == "string" && t) {
			var i = Wt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), _f.has(i) || (_f.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Id(t, "link", e), Tt(t), r.head.appendChild(t)));
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
			var i = "link[rel=\"preload\"][as=\"" + Wt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Wt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Wt(n.imageSizes) + "\"]")) : i += "[href=\"" + Wt(e) + "\"]";
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
			}, n), gf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Nf(a)) || t === "script" && r.querySelector(Lf(a)) || (t = r.createElement("link"), Id(t, "link", e), Tt(t), r.head.appendChild(t)));
		}
	}
	function Df(e, t) {
		yf.m(e, t);
		var n = Sf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Wt(r) + "\"][href=\"" + Wt(e) + "\"]", a = i;
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
				r = n.createElement("link"), Id(r, "link", e), Tt(r), n.head.appendChild(r);
			}
		}
	}
	function Of(e, t, n) {
		yf.S(e, t, n);
		var r = Sf;
		if (r && e) {
			var i = wt(r).hoistableStyles, a = Mf(e);
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
					Tt(c), Id(c, "link", e), c._p = new Promise(function(e, t) {
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
			var r = wt(n).hoistableScripts, i = If(e), a = r.get(i);
			a || (a = n.querySelector(Lf(i)), a || (e = f({
				src: e,
				async: !0
			}, t), (t = gf.get(i)) && Vf(e, t), a = n.createElement("script"), Tt(a), Id(a, "link", e), n.head.appendChild(a)), a = {
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
			var r = wt(n).hoistableScripts, i = If(e), a = r.get(i);
			a || (a = n.querySelector(Lf(i)), a || (e = f({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = gf.get(i)) && Vf(e, t), a = n.createElement("script"), Tt(a), Id(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function jf(e, t, n, r) {
		var a = (a = j.current) ? vf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Mf(n.href), n = wt(a).hoistableStyles, r = n.get(t), r || (r = {
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
					var o = wt(a).hoistableStyles, s = o.get(e);
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
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = If(n), n = wt(a).hoistableScripts, r = n.get(t), r || (r = {
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
		return "href=\"" + Wt(e) + "\"";
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
		}), Id(t, "link", n), Tt(t), e.head.appendChild(t));
	}
	function If(e) {
		return "[src=\"" + Wt(e) + "\"]";
	}
	function Lf(e) {
		return "script[async]" + e;
	}
	function Rf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Wt(n.href) + "\"]");
				if (r) return t.instance = r, Tt(r), r;
				var a = f({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Tt(r), Id(r, "style", a), zf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Mf(n.href);
				var o = e.querySelector(Nf(a));
				if (o) return t.state.loading |= 4, t.instance = o, Tt(o), o;
				r = Pf(n), (a = gf.get(a)) && Bf(r, a), o = (e.ownerDocument || e).createElement("link"), Tt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Id(o, "link", r), t.state.loading |= 4, zf(o, n.precedence, e), t.instance = o;
			case "script": return o = If(n.src), (a = e.querySelector(Lf(o))) ? (t.instance = a, Tt(a), a) : (r = n, (a = gf.get(o)) && (r = f({}, n), Vf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Tt(a), Id(a, "link", r), e.head.appendChild(a), t.instance = a);
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
			if (!(a[yt] || a[ft] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
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
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Xf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Tt(a);
					return;
				}
				a = t.ownerDocument || t, r = Pf(r), (i = gf.get(i)) && Bf(r, i), a = a.createElement("link"), Tt(a);
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
		_currentValue: ae,
		_currentValue2: ae,
		_threadCount: 0
	};
	function tp(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = nt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = nt(0), this.hiddenUpdates = nt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function np(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new tp(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = di(3, null, null, t), e.current = a, a.stateNode = e, t = da(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ba(a), e;
	}
	function rp(e) {
		return e ? (e = li, e) : li;
	}
	function ip(e, t, n, r, i, a) {
		i = rp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ha(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ua(e, r, t), n !== null && (gu(n, e, t), Wa(n, e, t));
	}
	function ap(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function Q(e, t) {
		ap(e, t), (e = e.alternate) && ap(e, t);
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = oi(e, 67108864);
			t !== null && gu(t, e, 67108864), Q(e, 67108864);
		}
	}
	function sp(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = mu();
			t = ct(t);
			var n = oi(e, t);
			n !== null && gu(n, e, t), Q(e, t);
		}
	}
	var cp = !0;
	function lp(e, t, n, r) {
		var i = O.T;
		O.T = null;
		var a = k.p;
		try {
			k.p = 2, dp(e, t, n, r);
		} finally {
			k.p = a, O.T = i;
		}
	}
	function up(e, t, n, r) {
		var i = O.T;
		O.T = null;
		var a = k.p;
		try {
			k.p = 8, dp(e, t, n, r);
		} finally {
			k.p = a, O.T = i;
		}
	}
	function dp(e, t, n, r) {
		if (cp) {
			var i = fp(r);
			if (i === null) Td(e, t, r, pp, n), wp(e, r);
			else if (Ep(i, e, t, n, r)) r.stopPropagation();
			else if (wp(e, r), t & 4 && -1 < Cp.indexOf(e)) {
				for (; i !== null;) {
					var a = St(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Ze(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - We(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									id(a), !(W & 6) && (nu = Me() + 500, ad(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = oi(a, 2), s !== null && gu(s, a, 2), xu(), Q(a, 2);
					}
					if (a = fp(r), a === null && Td(e, t, r, pp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Td(e, t, r, null, n);
		}
	}
	function fp(e) {
		return e = cn(e), mp(e);
	}
	var pp = null;
	function mp(e) {
		if (pp = null, e = xt(e), e !== null) {
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
		return pp = e, null;
	}
	function hp(e) {
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
			case "message": switch (Ne()) {
				case Pe: return 2;
				case Fe: return 8;
				case Ie:
				case Le: return 32;
				case Re: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var gp = !1, _p = null, vp = null, yp = null, bp = /* @__PURE__ */ new Map(), xp = /* @__PURE__ */ new Map(), Sp = [], Cp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function wp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				_p = null;
				break;
			case "dragenter":
			case "dragleave":
				vp = null;
				break;
			case "mouseover":
			case "mouseout":
				yp = null;
				break;
			case "pointerover":
			case "pointerout":
				bp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": xp.delete(t.pointerId);
		}
	}
	function Tp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = St(t), t !== null && op(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Ep(e, t, n, r, i) {
		switch (t) {
			case "focusin": return _p = Tp(_p, e, t, n, r, i), !0;
			case "dragenter": return vp = Tp(vp, e, t, n, r, i), !0;
			case "mouseover": return yp = Tp(yp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return bp.set(a, Tp(bp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, xp.set(a, Tp(xp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Dp(e) {
		var t = xt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, M(e.priority, function() {
							sp(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, M(e.priority, function() {
							sp(n);
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
	function Op(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = fp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				sn = r, n.target.dispatchEvent(r), sn = null;
			} else return t = St(n), t !== null && op(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function kp(e, t, n) {
		Op(e) && n.delete(t);
	}
	function Ap() {
		gp = !1, _p !== null && Op(_p) && (_p = null), vp !== null && Op(vp) && (vp = null), yp !== null && Op(yp) && (yp = null), bp.forEach(kp), xp.forEach(kp);
	}
	function jp(e, n) {
		e.blockedOn === n && (e.blockedOn = null, gp || (gp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Ap)));
	}
	var Mp = null;
	function Np(e) {
		Mp !== e && (Mp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Mp === e && (Mp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (mp(r || n) === null) continue;
					break;
				}
				var a = St(n);
				a !== null && (e.splice(t, 3), t -= 3, Ts(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Pp(e) {
		function t(t) {
			return jp(t, e);
		}
		_p !== null && jp(_p, e), vp !== null && jp(vp, e), yp !== null && jp(yp, e), bp.forEach(t), xp.forEach(t);
		for (var n = 0; n < Sp.length; n++) {
			var r = Sp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Sp.length && (n = Sp[0], n.blockedOn === null);) Dp(n), n.blockedOn === null && Sp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[pt] || null;
			if (typeof a == "function") o || Np(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[pt] || null) s = o.formAction;
					else if (mp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Np(n);
			}
		}
	}
	function Fp() {
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
	function Ip(e) {
		this._internalRoot = e;
	}
	Lp.prototype.render = Ip.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		ip(n, mu(), e, t, null, null);
	}, Lp.prototype.unmount = Ip.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			ip(e.current, 2, null, e, null, null), xu(), t[mt] = null;
		}
	};
	function Lp(e) {
		this._internalRoot = e;
	}
	Lp.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = ut();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Sp.length && t !== 0 && t < Sp[n].priority; n++);
			Sp.splice(n, 0, e), n === 0 && Dp(e);
		}
	};
	var Rp = n.version;
	if (Rp !== "19.2.7") throw Error(i(527, Rp, "19.2.7"));
	k.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : d(e), e = e === null ? null : e.stateNode, e;
	};
	var zp = {
		bundleType: 0,
		version: "19.2.7",
		rendererPackageName: "react-dom",
		currentDispatcherRef: O,
		reconcilerVersion: "19.2.7"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Bp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Bp.isDisabled && Bp.supportsFiber) try {
			Ve = Bp.inject(zp), He = Bp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Js, s = Ys, c = Xs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = np(e, 1, !1, null, null, n, r, null, o, s, c, Fp), e[mt] = t.current, Cd(e), new Ip(t);
	};
})), ye = /* @__PURE__ */ n(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = ve();
})), be = "comm", xe = "rule", Se = "decl", Ce = "@import", we = "@namespace", Te = "@keyframes", Ee = "@layer", De = Math.abs, Oe = String.fromCharCode;
function ke(e) {
	return e.trim();
}
function Ae(e, t, n) {
	return e.replace(t, n);
}
function je(e, t) {
	return e.charCodeAt(t) | 0;
}
function Me(e, t, n) {
	return e.slice(t, n);
}
function Ne(e) {
	return e.length;
}
function Pe(e) {
	return e.length;
}
function Fe(e, t) {
	return t.push(e), e;
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var Ie = 1, Le = 1, Re = 0, ze = 0, Be = 0, Ve = "";
function He(e, t, n, r, i, a, o, s) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: Ie,
		column: Le,
		length: o,
		return: "",
		siblings: s
	};
}
function Ue() {
	return Be;
}
function We() {
	return Be = ze > 0 ? je(Ve, --ze) : 0, Le--, Be === 10 && (Le = 1, Ie--), Be;
}
function Ge() {
	return Be = ze < Re ? je(Ve, ze++) : 0, Le++, Be === 10 && (Le = 1, Ie++), Be;
}
function Ke() {
	return je(Ve, ze);
}
function qe() {
	return ze;
}
function Je(e, t) {
	return Me(Ve, e, t);
}
function Ye(e) {
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
function Xe(e) {
	return Ie = Le = 1, Re = Ne(Ve = e), ze = 0, [];
}
function Ze(e) {
	return Ve = "", e;
}
function Qe(e) {
	return ke(Je(ze - 1, tt(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function $e(e) {
	for (; (Be = Ke()) && Be < 33;) Ge();
	return Ye(e) > 2 || Ye(Be) > 3 ? "" : " ";
}
function et(e, t) {
	for (; --t && Ge() && !(Be < 48 || Be > 102 || Be > 57 && Be < 65 || Be > 70 && Be < 97););
	return Je(e, qe() + (t < 6 && Ke() == 32 && Ge() == 32));
}
function tt(e) {
	for (; Ge();) switch (Be) {
		case e: return ze;
		case 34:
		case 39:
			e !== 34 && e !== 39 && tt(Be);
			break;
		case 40:
			e === 41 && tt(e);
			break;
		case 92:
			Ge();
			break;
	}
	return ze;
}
function nt(e, t) {
	for (; Ge() && e + Be !== 57 && !(e + Be === 84 && Ke() === 47););
	return "/*" + Je(t, ze - 1) + "*" + Oe(e === 47 ? e : Ge());
}
function rt(e) {
	for (; !Ye(Ke());) Ge();
	return Je(e, ze);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function it(e) {
	return Ze(at("", null, null, null, [""], e = Xe(e), 0, [0], e));
}
function at(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = 0, b = "", x = i, S = a, C = r, w = b; g;) switch (m = y, y = Ge()) {
		case 40:
			m != 108 && je(w, d - 1) == 58 ? (v++, w += "(") : w += Qe(y);
			break;
		case 41:
			v--, w += ")";
			break;
		case 34:
		case 39:
		case 91:
			w += Qe(y);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			if (v > 0) {
				w += Oe(y);
				break;
			}
			w += $e(m);
			break;
		case 92:
			w += et(qe() - 1, 7);
			continue;
		case 47:
			switch (Ke()) {
				case 42:
				case 47:
					Fe(st(nt(Ge(), qe()), t, n, c), c), (Ye(m || 1) == 5 || Ye(Ke() || 1) == 5) && Ne(w) && Me(w, -1, void 0) !== " " && (w += " ");
					break;
				default: w += "/";
			}
			break;
		case 123 * h: s[l++] = Ne(w) * _;
		case 125 * h:
		case 59:
		case 0:
			if (v > 0 && y) {
				w += Oe(y);
				break;
			}
			switch (y) {
				case 0:
				case 125: g = 0;
				case 59 + u:
					_ == -1 && (w = Ae(w, /\f/g, "")), p > 0 && (Ne(w) - d || h === 0) && Fe(p > 32 ? ct(w + ";", r, n, d - 1, c) : ct(Ae(w, " ", "") + ";", r, n, d - 2, c), c);
					break;
				case 59: w += ";";
				default: if (Fe(C = ot(w, t, n, l, u, i, s, b, x = [], S = [], d, a), a), y === 123) if (u === 0) at(w, t, C, C, x, a, d, s, S);
				else {
					switch (f) {
						case 99: if (je(w, 3) === 110) break;
						case 108: if (je(w, 2) === 97) break;
						default: u = 0;
						case 100:
						case 109:
						case 115:
					}
					u ? at(e, C, C, r && Fe(ot(e, C, C, 0, 0, i, s, b, i, x = [], d, S), S), i, S, d, s, r ? x : S) : at(w, C, C, C, [""], S, 0, s, S);
				}
			}
			l = u = p = 0, h = _ = 1, b = w = "", d = o;
			break;
		case 58: d = 1 + Ne(w), p = m;
		default:
			if (h < 1) {
				if (y == 123) --h;
				else if (y == 125 && h++ == 0 && We() == 125) continue;
			}
			switch (w += Oe(y), y * h) {
				case 38:
					_ = u > 0 ? 1 : (w += "\f", -1);
					break;
				case 44:
					if (v > 0) break;
					s[l++] = (Ne(w) - 1) * _, _ = 1;
					break;
				case 64:
					Ke() === 45 && (w += Qe(Ge())), f = Ke(), u = d = Ne(b = w += rt(qe())), y++;
					break;
				case 45: m === 45 && Ne(w) == 2 && (h = 0);
			}
	}
	return a;
}
function ot(e, t, n, r, i, a, o, s, c, l, u, d) {
	for (var f = i - 1, p = i === 0 ? a : [""], m = Pe(p), h = 0, g = 0, _ = 0; h < r; ++h) for (var v = 0, y = Me(e, f + 1, f = De(g = o[h])), b = e; v < m; ++v) (b = ke(g > 0 ? p[v] + " " + y : Ae(y, /&\f/g, p[v]))) && (c[_++] = b);
	return He(e, t, n, i === 0 ? xe : s, c, l, u, d);
}
function st(e, t, n, r) {
	return He(e, t, n, be, Oe(Ue()), Me(e, 2, -2), 0, r);
}
function ct(e, t, n, r, i) {
	return He(e, t, n, Se, Me(e, 0, r), Me(e, r + 1, -1), r, i);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function lt(e, t) {
	for (var n = "", r = 0; r < e.length; r++) n += t(e[r], r, e, t) || "";
	return n;
}
function ut(e, t, n, r) {
	switch (e.type) {
		case Ee: if (e.children.length) break;
		case Ce:
		case we:
		case Se: return e.return = e.return || e.value;
		case be: return "";
		case Te: return e.return = e.value + "{" + lt(e.children, r) + "}";
		case xe: if (!Ne(e.value = e.props.join(","))) return "";
	}
	return Ne(n = lt(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region node_modules/mermaid/dist/mermaid.core.mjs
var M = pe(), dt = ye(), ft = "c4", pt = {
	id: ft,
	detector: /* @__PURE__ */ o((e) => /^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./c4Diagram-YG6GDRKO-DUj9Nrez.js");
		return {
			id: ft,
			diagram: e
		};
	}, "loader")
}, mt = "flowchart", ht = {
	id: mt,
	detector: /* @__PURE__ */ o((e, t) => t?.flowchart?.defaultRenderer === "dagre-wrapper" || t?.flowchart?.defaultRenderer === "elk" ? !1 : /^\s*graph/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./flowDiagram-NV44I4VS-CVSbvIN7.js");
		return {
			id: mt,
			diagram: e
		};
	}, "loader")
}, gt = "flowchart-v2", _t = {
	id: gt,
	detector: /* @__PURE__ */ o((e, t) => t?.flowchart?.defaultRenderer === "dagre-d3" ? !1 : (t?.flowchart?.defaultRenderer === "elk" && (t.layout = "elk"), /^\s*graph/.test(e) && t?.flowchart?.defaultRenderer === "dagre-wrapper" ? !0 : /^\s*flowchart/.test(e)), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./flowDiagram-NV44I4VS-CVSbvIN7.js");
		return {
			id: gt,
			diagram: e
		};
	}, "loader")
}, vt = "er", yt = {
	id: vt,
	detector: /* @__PURE__ */ o((e) => /^\s*erDiagram/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./erDiagram-Q2GNP2WA-DwKmMoM5.js");
		return {
			id: vt,
			diagram: e
		};
	}, "loader")
}, bt = "gitGraph", xt = {
	id: bt,
	detector: /* @__PURE__ */ o((e) => /^\s*gitGraph/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./gitGraphDiagram-NY62KEGX-CqP1AcKX.js");
		return {
			id: bt,
			diagram: e
		};
	}, "loader")
}, St = "gantt", Ct = {
	id: St,
	detector: /* @__PURE__ */ o((e) => /^\s*gantt/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./ganttDiagram-LVOFAZNH-BmqJJ-NL.js");
		return {
			id: St,
			diagram: e
		};
	}, "loader")
}, wt = "info", Tt = {
	id: wt,
	detector: /* @__PURE__ */ o((e) => /^\s*info/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./infoDiagram-F6ZHWCRC-DGRWvZIR.js");
		return {
			id: wt,
			diagram: e
		};
	}, "loader")
}, Et = "pie", Dt = {
	id: Et,
	detector: /* @__PURE__ */ o((e) => /^\s*pie/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./pieDiagram-ADFJNKIX-D9cZ-914.js");
		return {
			id: Et,
			diagram: e
		};
	}, "loader")
}, Ot = "quadrantChart", kt = {
	id: Ot,
	detector: /* @__PURE__ */ o((e) => /^\s*quadrantChart/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./quadrantDiagram-AYHSOK5B-BfWpwEj_.js");
		return {
			id: Ot,
			diagram: e
		};
	}, "loader")
}, At = "xychart", jt = {
	id: At,
	detector: /* @__PURE__ */ o((e) => /^\s*xychart(-beta)?/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./xychartDiagram-PRI3JC2R-D0QW9OM8.js");
		return {
			id: At,
			diagram: e
		};
	}, "loader")
}, Mt = "requirement", Nt = {
	id: Mt,
	detector: /* @__PURE__ */ o((e) => /^\s*requirement(Diagram)?/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./requirementDiagram-UZGBJVZJ-Bl6Vci1t.js");
		return {
			id: Mt,
			diagram: e
		};
	}, "loader")
}, Pt = "sequence", Ft = {
	id: Pt,
	detector: /* @__PURE__ */ o((e) => /^\s*sequenceDiagram/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./sequenceDiagram-WL72ISMW-BfSpOyat.js");
		return {
			id: Pt,
			diagram: e
		};
	}, "loader")
}, It = "class", Lt = {
	id: It,
	detector: /* @__PURE__ */ o((e, t) => t?.class?.defaultRenderer !== "dagre-wrapper" && /^\s*classDiagram/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./classDiagram-2ON5EDUG-BH36Jhev.js");
		return {
			id: It,
			diagram: e
		};
	}, "loader")
}, Rt = "classDiagram", zt = {
	id: Rt,
	detector: /* @__PURE__ */ o((e, t) => /^\s*classDiagram/.test(e) && t?.class?.defaultRenderer === "dagre-wrapper" ? !0 : /^\s*classDiagram-v2/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./classDiagram-v2-WZHVMYZB-Bc09K83G.js");
		return {
			id: Rt,
			diagram: e
		};
	}, "loader")
}, Bt = "state", Vt = {
	id: Bt,
	detector: /* @__PURE__ */ o((e, t) => t?.state?.defaultRenderer !== "dagre-wrapper" && /^\s*stateDiagram/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./stateDiagram-FKZM4ZOC-B2fLVxpw.js");
		return {
			id: Bt,
			diagram: e
		};
	}, "loader")
}, Ht = "stateDiagram", Ut = {
	id: Ht,
	detector: /* @__PURE__ */ o((e, t) => !!(/^\s*stateDiagram-v2/.test(e) || /^\s*stateDiagram/.test(e) && t?.state?.defaultRenderer === "dagre-wrapper"), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./stateDiagram-v2-4FDKWEC3-CYGzacu5.js");
		return {
			id: Ht,
			diagram: e
		};
	}, "loader")
}, Wt = "journey", Gt = {
	id: Wt,
	detector: /* @__PURE__ */ o((e) => /^\s*journey/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./journeyDiagram-XKPGCS4Q-C444Waq3.js");
		return {
			id: Wt,
			diagram: e
		};
	}, "loader")
}, Kt = { draw: /* @__PURE__ */ o((e, t, n) => {
	a.debug("rendering svg for syntax error\n");
	let r = se(t), i = r.append("g");
	r.attr("viewBox", "0 0 2412 512"), _(r, 100, 512, !0), i.append("path").attr("class", "error-icon").attr("d", "m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"), i.append("path").attr("class", "error-icon").attr("d", "m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"), i.append("path").attr("class", "error-icon").attr("d", "m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"), i.append("path").attr("class", "error-icon").attr("d", "m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"), i.append("path").attr("class", "error-icon").attr("d", "m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"), i.append("path").attr("class", "error-icon").attr("d", "m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"), i.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in text"), i.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text(`mermaid version ${n}`);
}, "draw") }, qt = Kt, Jt = {
	db: {},
	renderer: Kt,
	parser: { parse: /* @__PURE__ */ o(() => {}, "parse") }
}, Yt = "flowchart-elk", Xt = {
	id: Yt,
	detector: /* @__PURE__ */ o((e, t = {}) => /^\s*flowchart-elk/.test(e) || /^\s*(flowchart|graph)/.test(e) && t?.flowchart?.defaultRenderer === "elk" ? (t.layout = "elk", !0) : !1, "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./flowDiagram-NV44I4VS-CVSbvIN7.js");
		return {
			id: Yt,
			diagram: e
		};
	}, "loader")
}, Zt = "timeline", Qt = {
	id: Zt,
	detector: /* @__PURE__ */ o((e) => /^\s*timeline/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./timeline-definition-IT6M3QCI-HXdkOaN2.js");
		return {
			id: Zt,
			diagram: e
		};
	}, "loader")
}, $t = "mindmap", en = {
	id: $t,
	detector: /* @__PURE__ */ o((e) => /^\s*mindmap/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./mindmap-definition-VGOIOE7T-BNtxI6Wd.js");
		return {
			id: $t,
			diagram: e
		};
	}, "loader")
}, tn = "kanban", nn = {
	id: tn,
	detector: /* @__PURE__ */ o((e) => /^\s*kanban/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./kanban-definition-3W4ZIXB7-CXaqcH5p.js");
		return {
			id: tn,
			diagram: e
		};
	}, "loader")
}, rn = "sankey", an = {
	id: rn,
	detector: /* @__PURE__ */ o((e) => /^\s*sankey(-beta)?/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./sankeyDiagram-TZEHDZUN-DRBtADa9.js");
		return {
			id: rn,
			diagram: e
		};
	}, "loader")
}, on = "packet", sn = {
	id: on,
	detector: /* @__PURE__ */ o((e) => /^\s*packet(-beta)?/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./diagram-S2PKOQOG-B0lfZoPs.js");
		return {
			id: on,
			diagram: e
		};
	}, "loader")
}, cn = "radar", ln = {
	id: cn,
	detector: /* @__PURE__ */ o((e) => /^\s*radar-beta/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./diagram-QEK2KX5R-DG2HuV0w.js");
		return {
			id: cn,
			diagram: e
		};
	}, "loader")
}, un = "block", dn = {
	id: un,
	detector: /* @__PURE__ */ o((e) => /^\s*block(-beta)?/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./blockDiagram-VD42YOAC-CmCUkqCD.js");
		return {
			id: un,
			diagram: e
		};
	}, "loader")
}, fn = "architecture", pn = {
	id: fn,
	detector: /* @__PURE__ */ o((e) => /^\s*architecture/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./architectureDiagram-VXUJARFQ-BSmNNANw.js");
		return {
			id: fn,
			diagram: e
		};
	}, "loader")
}, mn = "treemap", hn = {
	id: mn,
	detector: /* @__PURE__ */ o((e) => /^\s*treemap/.test(e), "detector"),
	loader: /* @__PURE__ */ o(async () => {
		let { diagram: e } = await import("./diagram-PSM6KHXK-CbLtQDqp.js");
		return {
			id: mn,
			diagram: e
		};
	}, "loader")
}, gn = !1, _n = /* @__PURE__ */ o(() => {
	gn || (gn = !0, x("error", Jt, (e) => e.toLowerCase().trim() === "error"), x("---", {
		db: { clear: /* @__PURE__ */ o(() => {}, "clear") },
		styles: {},
		renderer: { draw: /* @__PURE__ */ o(() => {}, "draw") },
		parser: { parse: /* @__PURE__ */ o(() => {
			throw Error("Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks");
		}, "parse") },
		init: /* @__PURE__ */ o(() => null, "init")
	}, (e) => e.toLowerCase().trimStart().startsWith("---")), l(Xt, en, pn), l(pt, nn, zt, Lt, yt, Ct, Tt, Dt, Nt, Ft, _t, ht, Qt, xt, Ut, Vt, Gt, kt, an, sn, jt, dn, ln, hn));
}, "addDiagrams"), vn = /* @__PURE__ */ o(async () => {
	a.debug("Loading registered diagrams");
	let e = (await Promise.allSettled(Object.entries(w).map(async ([e, { detector: t, loader: n }]) => {
		if (n) try {
			te(e);
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
}, "loadRegisteredDiagrams"), yn = "graphics-document document";
function bn(e, t) {
	e.attr("role", yn), t !== "" && e.attr("aria-roledescription", t);
}
o(bn, "setA11yDiagramInfo");
function xn(e, t, n, r) {
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
o(xn, "addSVGa11yTitleDescription");
var Sn = class e {
	constructor(e, t, n, r, i) {
		this.type = e, this.text = t, this.db = n, this.parser = r, this.renderer = i;
	}
	static {
		o(this, "Diagram");
	}
	static async fromText(t, n = {}) {
		let r = ne(), i = v(t, r);
		t = re(t) + "\n";
		try {
			te(i);
		} catch {
			let e = f(i);
			if (!e) throw new ee(`Diagram ${i} not found.`);
			let { id: t, diagram: n } = await e();
			x(t, n);
		}
		let { db: a, parser: o, renderer: s, init: c } = te(i);
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
}, Cn = [], wn = /* @__PURE__ */ o(() => {
	Cn.forEach((e) => {
		e();
	}), Cn = [];
}, "attachFunctions"), Tn = /* @__PURE__ */ o((e) => e.replace(/^\s*%%(?!{)[^\n]+\n?/gm, "").trimStart(), "cleanupComments");
function En(e) {
	let t = e.match(y);
	if (!t) return {
		text: e,
		metadata: {}
	};
	let n = ce(t[1], { schema: le }) ?? {};
	n = typeof n == "object" && !Array.isArray(n) ? n : {};
	let r = {};
	return n.displayMode && (r.displayMode = n.displayMode.toString()), n.title && (r.title = n.title.toString()), n.config && (r.config = n.config), {
		text: e.slice(t[0].length),
		metadata: r
	};
}
o(En, "extractFrontMatter");
var Dn = /* @__PURE__ */ o((e) => e.replace(/\r\n?/g, "\n").replace(/<(\w+)([^>]*)>/g, (e, t, n) => "<" + t + n.replace(/="([^"]*)"/g, "='$1'") + ">"), "cleanupText"), On = /* @__PURE__ */ o((e) => {
	let { text: t, metadata: n } = En(e), { displayMode: r, title: i, config: a = {} } = n;
	return r && (a.gantt ||= {}, a.gantt.displayMode = r), {
		title: i,
		config: a,
		text: t
	};
}, "processFrontmatter"), kn = /* @__PURE__ */ o((e) => {
	let t = O.detectInit(e) ?? {}, n = O.detectDirective(e, "wrap");
	return Array.isArray(n) ? t.wrap = n.some(({ type: e }) => e === "wrap") : n?.type === "wrap" && (t.wrap = !0), {
		text: ae(e),
		directive: t
	};
}, "processDirectives");
function An(e) {
	let t = On(Dn(e)), n = kn(t.text), r = oe(t.config, n.directive);
	return e = Tn(n.text), {
		code: e,
		title: t.title,
		config: r
	};
}
o(An, "preprocessDiagram");
function jn(e) {
	let t = new TextEncoder().encode(e), n = Array.from(t, (e) => String.fromCodePoint(e)).join("");
	return btoa(n);
}
o(jn, "toBase64");
var Mn = 5e4, Nn = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa", Pn = "sandbox", Fn = "loose", In = "http://www.w3.org/2000/svg", Ln = "http://www.w3.org/1999/xlink", Rn = "http://www.w3.org/1999/xhtml", zn = "100%", Bn = "100%", Vn = "border:0;margin:0;", Hn = "margin:0", Un = "allow-top-navigation-by-user-activation allow-popups", Wn = "The \"iframe\" tag is not supported by your browser.", Gn = ["foreignobject"], Kn = ["dominant-baseline"];
function qn(e) {
	let t = An(e);
	return u(), C(t.config ?? {}), t;
}
o(qn, "processAndSetConfigs");
async function Jn(e, t) {
	_n();
	try {
		let { code: t, config: n } = qn(e);
		return {
			diagramType: (await ar(t)).type,
			config: n
		};
	} catch (e) {
		if (t?.suppressErrors) return !1;
		throw e;
	}
}
o(Jn, "parse");
var Yn = /* @__PURE__ */ o((e, t, n = []) => `
.${e} ${t} { ${n.join(" !important; ")} !important; }`, "cssImportantStyles"), Xn = /* @__PURE__ */ o((e, t = /* @__PURE__ */ new Map()) => {
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
			j(e.styles) || r.forEach((t) => {
				n += Yn(e.id, t, e.styles);
			}), j(e.textStyles) || (n += Yn(e.id, "tspan", (e?.textStyles || []).map((e) => e.replace("color", "fill"))));
		});
	}
	return n;
}, "createCssStyles"), Zn = /* @__PURE__ */ o((e, t, n, r) => lt(it(`${r}{${T(t, Xn(e, n), e.themeVariables)}}`), ut), "createUserStyles"), Qn = /* @__PURE__ */ o((e = "", t, n) => {
	let r = e;
	return !n && !t && (r = r.replace(/marker-end="url\([\d+./:=?A-Za-z-]*?#/g, "marker-end=\"url(#")), r = k(r), r = r.replace(/<br>/g, "<br/>"), r;
}, "cleanUpSvgCode"), $n = /* @__PURE__ */ o((e = "", t) => `<iframe style="width:${zn};height:${t?.viewBox?.baseVal?.height ? t.viewBox.baseVal.height + "px" : Bn};${Vn}" src="data:text/html;charset=UTF-8;base64,${jn(`<body style="${Hn}">${e}</body>`)}" sandbox="${Un}">
  ${Wn}
</iframe>`, "putIntoIFrame"), er = /* @__PURE__ */ o((e, t, n, r, i) => {
	let a = e.append("div");
	a.attr("id", n), r && a.attr("style", r);
	let o = a.append("svg").attr("id", t).attr("width", "100%").attr("xmlns", In);
	return i && o.attr("xmlns:xlink", i), o.append("g"), e;
}, "appendDivSvgG");
function tr(e, t) {
	return e.append("iframe").attr("id", t).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
o(tr, "sandboxedIframe");
var nr = /* @__PURE__ */ o((e, t, n, r) => {
	e.getElementById(t)?.remove(), e.getElementById(n)?.remove(), e.getElementById(r)?.remove();
}, "removeExistingElements"), rr = /* @__PURE__ */ o(async function(e, t, n) {
	_n();
	let i = qn(t);
	t = i.code;
	let c = ne();
	a.debug(c), t.length > (c?.maxTextSize ?? Mn) && (t = Nn);
	let l = "#" + e, u = "i" + e, d = "#" + u, f = "d" + e, p = "#" + f, m = /* @__PURE__ */ o(() => {
		let e = s(_ ? d : p).node();
		e && "remove" in e && e.remove();
	}, "removeTempElements"), g = s("body"), _ = c.securityLevel === Pn, v = c.securityLevel === Fn, y = c.fontFamily;
	n === void 0 ? (nr(document, e, f, u), _ ? (g = s(tr(s("body"), u).nodes()[0].contentDocument.body), g.node().style.margin = 0) : g = s("body"), er(g, e, f)) : (n && (n.innerHTML = ""), _ ? (g = s(tr(s(n), u).nodes()[0].contentDocument.body), g.node().style.margin = 0) : g = s(n), er(g, e, f, `font-family: ${y}`, Ln));
	let x, S;
	try {
		x = await Sn.fromText(t, { title: i.title });
	} catch (e) {
		if (c.suppressErrorRendering) throw m(), e;
		x = await Sn.fromText("error"), S = e;
	}
	let C = g.select(p).node(), w = x.type, T = C.firstChild, E = T.firstChild, ee = x.renderer.getClasses?.(t, x), D = Zn(c, w, ee, l), te = document.createElement("style");
	te.innerHTML = D, T.insertBefore(te, E);
	try {
		await x.renderer.draw(t, e, r.version, x);
	} catch (n) {
		throw c.suppressErrorRendering ? m() : qt.draw(t, e, r.version), n;
	}
	let re = g.select(`${p} svg`), ie = x.db.getAccTitle?.(), O = x.db.getAccDescription?.();
	or(w, re, ie, O), g.select(`[id="${e}"]`).selectAll("foreignobject > *").attr("xmlns", Rn);
	let k = g.select(p).node().innerHTML;
	if (a.debug("config.arrowMarkerAbsolute", c.arrowMarkerAbsolute), k = Qn(k, _, b(c.arrowMarkerAbsolute)), _) {
		let e = g.select(p + " svg").node();
		k = $n(k, e);
	} else v || (k = h.sanitize(k, {
		ADD_TAGS: Gn,
		ADD_ATTR: Kn,
		HTML_INTEGRATION_POINTS: { foreignobject: !0 }
	}));
	if (wn(), S) throw S;
	return m(), {
		diagramType: w,
		svg: k,
		bindFunctions: x.db.bindFunctions
	};
}, "render");
function ir(e = {}) {
	let t = E({}, e);
	t?.fontFamily && !t.themeVariables?.fontFamily && (t.themeVariables ||= {}, t.themeVariables.fontFamily = t.fontFamily), d(t), t?.theme && t.theme in c ? t.themeVariables = c[t.theme].getThemeVariables(t.themeVariables) : t && (t.themeVariables = c.default.getThemeVariables(t.themeVariables)), i((typeof t == "object" ? m(t) : D()).logLevel), _n();
}
o(ir, "initialize");
var ar = /* @__PURE__ */ o((e, t = {}) => {
	let { code: n } = An(e);
	return Sn.fromText(n, t);
}, "getDiagramFromText");
function or(e, t, n, r) {
	bn(t, e), xn(t, n, r, t.attr("id"));
}
o(or, "addA11yInfo");
var sr = Object.freeze({
	render: rr,
	parse: Jn,
	getDiagramFromText: ar,
	initialize: ir,
	getConfig: ne,
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
i(ne().logLevel), u(ne());
var cr = /* @__PURE__ */ o((e, t, n) => {
	a.warn(e), ie(e) ? (n && n(e.str, e.hash), t.push({
		...e,
		message: e.str,
		error: e
	})) : (n && n(e), e instanceof Error && t.push({
		str: e.message,
		message: e.message,
		hash: e.name,
		error: e
	}));
}, "handleError"), lr = /* @__PURE__ */ o(async function(e = { querySelector: ".mermaid" }) {
	try {
		await ur(e);
	} catch (t) {
		if (ie(t) && a.error(t.str), xr.parseError && xr.parseError(t), !e.suppressErrors) throw a.error("Use the suppressErrors option to suppress these errors"), t;
	}
}, "run"), ur = /* @__PURE__ */ o(async function({ postRenderCallback: e, querySelector: t, nodes: n } = { querySelector: ".mermaid" }) {
	let r = sr.getConfig();
	a.debug(`${e ? "" : "No "}Callback function found`);
	let i;
	if (n) i = n;
	else if (t) i = document.querySelectorAll(t);
	else throw Error("Nodes and querySelector are both undefined");
	a.debug(`Found ${i.length} diagrams`), r?.startOnLoad !== void 0 && (a.debug("Start On Load: " + r?.startOnLoad), sr.updateSiteConfig({ startOnLoad: r?.startOnLoad }));
	let o = new O.InitIDGenerator(r.deterministicIds, r.deterministicIDSeed), s, c = [];
	for (let t of Array.from(i)) {
		if (a.info("Rendering diagram: " + t.id), t.getAttribute("data-processed")) continue;
		t.setAttribute("data-processed", "true");
		let n = `mermaid-${o.next()}`;
		s = t.innerHTML, s = ue(O.entityDecode(s)).trim().replace(/<br\s*\/?>/gi, "<br/>");
		let r = O.detectInit(s);
		r && a.debug("Detected early reinit: ", r);
		try {
			let { svg: r, bindFunctions: i } = await br(n, s, t);
			t.innerHTML = r, e && await e(n), i && i(t);
		} catch (e) {
			cr(e, c, xr.parseError);
		}
	}
	if (c.length > 0) throw c[0];
}, "runThrowsErrors"), dr = /* @__PURE__ */ o(function(e) {
	sr.initialize(e);
}, "initialize"), fr = /* @__PURE__ */ o(async function(e, t, n) {
	a.warn("mermaid.init is deprecated. Please use run instead."), e && dr(e);
	let r = {
		postRenderCallback: n,
		querySelector: ".mermaid"
	};
	typeof t == "string" ? r.querySelector = t : t && (t instanceof HTMLElement ? r.nodes = [t] : r.nodes = t), await lr(r);
}, "init"), pr = /* @__PURE__ */ o(async (e, { lazyLoad: t = !0 } = {}) => {
	_n(), l(...e), t === !1 && await vn();
}, "registerExternalDiagrams"), mr = /* @__PURE__ */ o(function() {
	if (xr.startOnLoad) {
		let { startOnLoad: e } = sr.getConfig();
		e && xr.run().catch((e) => a.error("Mermaid failed to initialize", e));
	}
}, "contentLoaded");
typeof document < "u" && window.addEventListener("load", mr, !1);
var hr = /* @__PURE__ */ o(function(e) {
	xr.parseError = e;
}, "setParseErrorHandler"), gr = [], _r = !1, vr = /* @__PURE__ */ o(async () => {
	if (!_r) {
		for (_r = !0; gr.length > 0;) {
			let e = gr.shift();
			if (e) try {
				await e();
			} catch (e) {
				a.error("Error executing queue", e);
			}
		}
		_r = !1;
	}
}, "executeQueue"), yr = /* @__PURE__ */ o(async (e, t) => new Promise((n, r) => {
	let i = /* @__PURE__ */ o(() => new Promise((i, o) => {
		sr.parse(e, t).then((e) => {
			i(e), n(e);
		}, (e) => {
			a.error("Error parsing", e), xr.parseError?.(e), o(e), r(e);
		});
	}), "performCall");
	gr.push(i), vr().catch(r);
}), "parse"), br = /* @__PURE__ */ o((e, t, n) => new Promise((r, i) => {
	let s = /* @__PURE__ */ o(() => new Promise((o, s) => {
		sr.render(e, t, n).then((e) => {
			o(e), r(e);
		}, (e) => {
			a.error("Error parsing", e), xr.parseError?.(e), s(e), i(e);
		});
	}), "performCall");
	gr.push(s), vr().catch(i);
}), "render"), xr = {
	startOnLoad: !0,
	mermaidAPI: sr,
	parse: yr,
	render: br,
	init: fr,
	run: lr,
	registerExternalDiagrams: pr,
	registerLayoutLoaders: de,
	initialize: dr,
	parseError: void 0,
	contentLoaded: mr,
	setParseErrorHandler: hr,
	detectType: v,
	registerIconPacks: A,
	getRegisteredDiagramsMetadata: /* @__PURE__ */ o(() => Object.keys(w).map((e) => ({ id: e })), "getRegisteredDiagramsMetadata")
}, Sr = xr;
//#endregion
//#region node_modules/comma-separated-tokens/index.js
function Cr(e, t) {
	let n = t || {};
	return (e[e.length - 1] === "" ? [...e, ""] : e).join((n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")).trim();
}
//#endregion
//#region node_modules/estree-util-is-identifier-name/lib/index.js
var wr = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Tr = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Er = {};
function Dr(e, t) {
	return ((t || Er).jsx ? Tr : wr).test(e);
}
//#endregion
//#region node_modules/hast-util-whitespace/lib/index.js
var Or = /[ \t\n\f\r]/g;
function kr(e) {
	return typeof e == "object" ? e.type === "text" && Ar(e.value) : Ar(e);
}
function Ar(e) {
	return e.replace(Or, "") === "";
}
//#endregion
//#region node_modules/property-information/lib/util/schema.js
var jr = class {
	constructor(e, t, n) {
		this.normal = t, this.property = e, n && (this.space = n);
	}
};
jr.prototype.normal = {}, jr.prototype.property = {}, jr.prototype.space = void 0;
//#endregion
//#region node_modules/property-information/lib/util/merge.js
function Mr(e, t) {
	let n = {}, r = {};
	for (let t of e) Object.assign(n, t.property), Object.assign(r, t.normal);
	return new jr(n, r, t);
}
//#endregion
//#region node_modules/property-information/lib/normalize.js
function Nr(e) {
	return e.toLowerCase();
}
//#endregion
//#region node_modules/property-information/lib/util/info.js
var Pr = class {
	constructor(e, t) {
		this.attribute = t, this.property = e;
	}
};
Pr.prototype.attribute = "", Pr.prototype.booleanish = !1, Pr.prototype.boolean = !1, Pr.prototype.commaOrSpaceSeparated = !1, Pr.prototype.commaSeparated = !1, Pr.prototype.defined = !1, Pr.prototype.mustUseProperty = !1, Pr.prototype.number = !1, Pr.prototype.overloadedBoolean = !1, Pr.prototype.property = "", Pr.prototype.spaceSeparated = !1, Pr.prototype.space = void 0;
//#endregion
//#region node_modules/property-information/lib/util/types.js
var Fr = /* @__PURE__ */ t({
	boolean: () => N,
	booleanish: () => Lr,
	commaOrSpaceSeparated: () => Br,
	commaSeparated: () => zr,
	number: () => P,
	overloadedBoolean: () => Rr,
	spaceSeparated: () => F
}), Ir = 0, N = Vr(), Lr = Vr(), Rr = Vr(), P = Vr(), F = Vr(), zr = Vr(), Br = Vr();
function Vr() {
	return 2 ** ++Ir;
}
//#endregion
//#region node_modules/property-information/lib/util/defined-info.js
var Hr = Object.keys(Fr), Ur = class extends Pr {
	constructor(e, t, n, r) {
		let i = -1;
		if (super(e, t), Wr(this, "space", r), typeof n == "number") for (; ++i < Hr.length;) {
			let e = Hr[i];
			Wr(this, Hr[i], (n & Fr[e]) === Fr[e]);
		}
	}
};
Ur.prototype.defined = !0;
function Wr(e, t, n) {
	n && (e[t] = n);
}
//#endregion
//#region node_modules/property-information/lib/util/create.js
function Gr(e) {
	let t = {}, n = {};
	for (let [r, i] of Object.entries(e.properties)) {
		let a = new Ur(r, e.transform(e.attributes || {}, r), i, e.space);
		e.mustUseProperty && e.mustUseProperty.includes(r) && (a.mustUseProperty = !0), t[r] = a, n[Nr(r)] = r, n[Nr(a.attribute)] = r;
	}
	return new jr(t, n, e.space);
}
//#endregion
//#region node_modules/property-information/lib/aria.js
var Kr = Gr({
	properties: {
		ariaActiveDescendant: null,
		ariaAtomic: Lr,
		ariaAutoComplete: null,
		ariaBusy: Lr,
		ariaChecked: Lr,
		ariaColCount: P,
		ariaColIndex: P,
		ariaColSpan: P,
		ariaControls: F,
		ariaCurrent: null,
		ariaDescribedBy: F,
		ariaDetails: null,
		ariaDisabled: Lr,
		ariaDropEffect: F,
		ariaErrorMessage: null,
		ariaExpanded: Lr,
		ariaFlowTo: F,
		ariaGrabbed: Lr,
		ariaHasPopup: null,
		ariaHidden: Lr,
		ariaInvalid: null,
		ariaKeyShortcuts: null,
		ariaLabel: null,
		ariaLabelledBy: F,
		ariaLevel: P,
		ariaLive: null,
		ariaModal: Lr,
		ariaMultiLine: Lr,
		ariaMultiSelectable: Lr,
		ariaOrientation: null,
		ariaOwns: F,
		ariaPlaceholder: null,
		ariaPosInSet: P,
		ariaPressed: Lr,
		ariaReadOnly: Lr,
		ariaRelevant: null,
		ariaRequired: Lr,
		ariaRoleDescription: F,
		ariaRowCount: P,
		ariaRowIndex: P,
		ariaRowSpan: P,
		ariaSelected: Lr,
		ariaSetSize: P,
		ariaSort: null,
		ariaValueMax: P,
		ariaValueMin: P,
		ariaValueNow: P,
		ariaValueText: null,
		role: null
	},
	transform(e, t) {
		return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
	}
});
//#endregion
//#region node_modules/property-information/lib/util/case-sensitive-transform.js
function qr(e, t) {
	return t in e ? e[t] : t;
}
//#endregion
//#region node_modules/property-information/lib/util/case-insensitive-transform.js
function Jr(e, t) {
	return qr(e, t.toLowerCase());
}
//#endregion
//#region node_modules/property-information/lib/html.js
var Yr = Gr({
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
		accept: zr,
		acceptCharset: F,
		accessKey: F,
		action: null,
		allow: null,
		allowFullScreen: N,
		allowPaymentRequest: N,
		allowUserMedia: N,
		alpha: N,
		alt: null,
		as: null,
		async: N,
		autoCapitalize: null,
		autoComplete: F,
		autoFocus: N,
		autoPlay: N,
		blocking: F,
		capture: null,
		charSet: null,
		checked: N,
		cite: null,
		className: F,
		closedBy: null,
		colorSpace: null,
		cols: P,
		colSpan: P,
		command: null,
		commandFor: null,
		content: null,
		contentEditable: Lr,
		controls: N,
		controlsList: F,
		coords: P | zr,
		crossOrigin: null,
		data: null,
		dateTime: null,
		decoding: null,
		default: N,
		defer: N,
		dir: null,
		dirName: null,
		disabled: N,
		download: Rr,
		draggable: Lr,
		encType: null,
		enterKeyHint: null,
		fetchPriority: null,
		form: null,
		formAction: null,
		formEncType: null,
		formMethod: null,
		formNoValidate: N,
		formTarget: null,
		headers: F,
		height: P,
		hidden: Rr,
		high: P,
		href: null,
		hrefLang: null,
		htmlFor: F,
		httpEquiv: F,
		id: null,
		imageSizes: null,
		imageSrcSet: null,
		inert: N,
		inputMode: null,
		integrity: null,
		is: null,
		isMap: N,
		itemId: null,
		itemProp: F,
		itemRef: F,
		itemScope: N,
		itemType: F,
		kind: null,
		label: null,
		lang: null,
		language: null,
		list: null,
		loading: null,
		loop: N,
		low: P,
		manifest: null,
		max: null,
		maxLength: P,
		media: null,
		method: null,
		min: null,
		minLength: P,
		multiple: N,
		muted: N,
		name: null,
		nonce: null,
		noModule: N,
		noValidate: N,
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
		open: N,
		optimum: P,
		pattern: null,
		ping: F,
		placeholder: null,
		playsInline: N,
		popover: null,
		popoverTarget: null,
		popoverTargetAction: null,
		poster: null,
		preload: null,
		readOnly: N,
		referrerPolicy: null,
		rel: F,
		required: N,
		reversed: N,
		rows: P,
		rowSpan: P,
		sandbox: F,
		scope: null,
		scoped: N,
		seamless: N,
		selected: N,
		shadowRootClonable: N,
		shadowRootCustomElementRegistry: N,
		shadowRootDelegatesFocus: N,
		shadowRootMode: null,
		shadowRootSerializable: N,
		shape: null,
		size: P,
		sizes: null,
		slot: null,
		span: P,
		spellCheck: Lr,
		src: null,
		srcDoc: null,
		srcLang: null,
		srcSet: null,
		start: P,
		step: null,
		style: null,
		tabIndex: P,
		target: null,
		title: null,
		translate: null,
		type: null,
		typeMustMatch: N,
		useMap: null,
		value: Lr,
		width: P,
		wrap: null,
		writingSuggestions: null,
		align: null,
		aLink: null,
		archive: F,
		axis: null,
		background: null,
		bgColor: null,
		border: P,
		borderColor: null,
		bottomMargin: P,
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
		compact: N,
		declare: N,
		event: null,
		face: null,
		frame: null,
		frameBorder: null,
		hSpace: P,
		leftMargin: P,
		link: null,
		longDesc: null,
		lowSrc: null,
		marginHeight: P,
		marginWidth: P,
		noResize: N,
		noHref: N,
		noShade: N,
		noWrap: N,
		object: null,
		profile: null,
		prompt: null,
		rev: null,
		rightMargin: P,
		rules: null,
		scheme: null,
		scrolling: Lr,
		standby: null,
		summary: null,
		text: null,
		topMargin: P,
		valueType: null,
		version: null,
		vAlign: null,
		vLink: null,
		vSpace: P,
		allowTransparency: null,
		autoCorrect: null,
		autoSave: null,
		credentialless: N,
		disablePictureInPicture: N,
		disableRemotePlayback: N,
		exportParts: zr,
		part: F,
		prefix: null,
		property: null,
		results: P,
		security: null,
		unselectable: null
	},
	space: "html",
	transform: Jr
}), Xr = Gr({
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
		about: Br,
		accentHeight: P,
		accumulate: null,
		additive: null,
		alignmentBaseline: null,
		alphabetic: P,
		amplitude: P,
		arabicForm: null,
		ascent: P,
		attributeName: null,
		attributeType: null,
		azimuth: P,
		bandwidth: null,
		baselineShift: null,
		baseFrequency: null,
		baseProfile: null,
		bbox: null,
		begin: null,
		bias: P,
		by: null,
		calcMode: null,
		capHeight: P,
		className: F,
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
		descent: P,
		diffuseConstant: P,
		direction: null,
		display: null,
		dur: null,
		divisor: P,
		dominantBaseline: null,
		download: N,
		dx: null,
		dy: null,
		edgeMode: null,
		editable: null,
		elevation: P,
		enableBackground: null,
		end: null,
		event: null,
		exponent: P,
		externalResourcesRequired: null,
		fill: null,
		fillOpacity: P,
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
		g1: zr,
		g2: zr,
		glyphName: zr,
		glyphOrientationHorizontal: null,
		glyphOrientationVertical: null,
		glyphRef: null,
		gradientTransform: null,
		gradientUnits: null,
		handler: null,
		hanging: P,
		hatchContentUnits: null,
		hatchUnits: null,
		height: null,
		href: null,
		hrefLang: null,
		horizAdvX: P,
		horizOriginX: P,
		horizOriginY: P,
		id: null,
		ideographic: P,
		imageRendering: null,
		initialVisibility: null,
		in: null,
		in2: null,
		intercept: P,
		k: P,
		k1: P,
		k2: P,
		k3: P,
		k4: P,
		kernelMatrix: Br,
		kernelUnitLength: null,
		keyPoints: null,
		keySplines: null,
		keyTimes: null,
		kerning: null,
		lang: null,
		lengthAdjust: null,
		letterSpacing: null,
		lightingColor: null,
		limitingConeAngle: P,
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
		mediaSize: P,
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
		overlinePosition: P,
		overlineThickness: P,
		paintOrder: null,
		panose1: null,
		path: null,
		pathLength: P,
		patternContentUnits: null,
		patternTransform: null,
		patternUnits: null,
		phase: null,
		ping: F,
		pitch: null,
		playbackOrder: null,
		pointerEvents: null,
		points: null,
		pointsAtX: P,
		pointsAtY: P,
		pointsAtZ: P,
		preserveAlpha: null,
		preserveAspectRatio: null,
		primitiveUnits: null,
		propagate: null,
		property: Br,
		r: null,
		radius: null,
		referrerPolicy: null,
		refX: null,
		refY: null,
		rel: Br,
		rev: Br,
		renderingIntent: null,
		repeatCount: null,
		repeatDur: null,
		requiredExtensions: Br,
		requiredFeatures: Br,
		requiredFonts: Br,
		requiredFormats: Br,
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
		specularConstant: P,
		specularExponent: P,
		spreadMethod: null,
		spacing: null,
		startOffset: null,
		stdDeviation: null,
		stemh: null,
		stemv: null,
		stitchTiles: null,
		stopColor: null,
		stopOpacity: null,
		strikethroughPosition: P,
		strikethroughThickness: P,
		string: null,
		stroke: null,
		strokeDashArray: Br,
		strokeDashOffset: null,
		strokeLineCap: null,
		strokeLineJoin: null,
		strokeMiterLimit: P,
		strokeOpacity: P,
		strokeWidth: null,
		style: null,
		surfaceScale: P,
		syncBehavior: null,
		syncBehaviorDefault: null,
		syncMaster: null,
		syncTolerance: null,
		syncToleranceDefault: null,
		systemLanguage: Br,
		tabIndex: P,
		tableValues: null,
		target: null,
		targetX: P,
		targetY: P,
		textAnchor: null,
		textDecoration: null,
		textRendering: null,
		textLength: null,
		timelineBegin: null,
		title: null,
		transformBehavior: null,
		type: null,
		typeOf: Br,
		to: null,
		transform: null,
		transformOrigin: null,
		u1: null,
		u2: null,
		underlinePosition: P,
		underlineThickness: P,
		unicode: null,
		unicodeBidi: null,
		unicodeRange: null,
		unitsPerEm: P,
		values: null,
		vAlphabetic: P,
		vMathematical: P,
		vectorEffect: null,
		vHanging: P,
		vIdeographic: P,
		version: null,
		vertAdvY: P,
		vertOriginX: P,
		vertOriginY: P,
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
		xHeight: P,
		y: null,
		y1: null,
		y2: null,
		yChannelSelector: null,
		z: null,
		zoomAndPan: null
	},
	space: "svg",
	transform: qr
}), Zr = Gr({
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
}), Qr = Gr({
	attributes: { xmlnsxlink: "xmlns:xlink" },
	properties: {
		xmlnsXLink: null,
		xmlns: null
	},
	space: "xmlns",
	transform: Jr
}), $r = Gr({
	properties: {
		xmlBase: null,
		xmlLang: null,
		xmlSpace: null
	},
	space: "xml",
	transform(e, t) {
		return "xml:" + t.slice(3).toLowerCase();
	}
}), ei = {
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
}, ti = /[A-Z]/g, ni = /-[a-z]/g, ri = /^data[-\w.:]+$/i;
function ii(e, t) {
	let n = Nr(t), r = t, i = Pr;
	if (n in e.normal) return e.property[e.normal[n]];
	if (n.length > 4 && n.slice(0, 4) === "data" && ri.test(t)) {
		if (t.charAt(4) === "-") {
			let e = t.slice(5).replace(ni, oi);
			r = "data" + e.charAt(0).toUpperCase() + e.slice(1);
		} else {
			let e = t.slice(4);
			if (!ni.test(e)) {
				let n = e.replace(ti, ai);
				n.charAt(0) !== "-" && (n = "-" + n), t = "data" + n;
			}
		}
		i = Ur;
	}
	return new i(r, t);
}
function ai(e) {
	return "-" + e.toLowerCase();
}
function oi(e) {
	return e.charAt(1).toUpperCase();
}
//#endregion
//#region node_modules/property-information/index.js
var si = Mr([
	Kr,
	Yr,
	Zr,
	Qr,
	$r
], "html"), ci = Mr([
	Kr,
	Xr,
	Zr,
	Qr,
	$r
], "svg");
//#endregion
//#region node_modules/space-separated-tokens/index.js
function li(e) {
	return e.join(" ").trim();
}
//#endregion
//#region node_modules/inline-style-parser/cjs/index.js
var ui = /* @__PURE__ */ n(((e, t) => {
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
})), di = /* @__PURE__ */ n(((e) => {
	var t = e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	};
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = r;
	var n = t(ui());
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
})), fi = /* @__PURE__ */ n(((e) => {
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
})), pi = /* @__PURE__ */ n(((e, t) => {
	var n = (e && e.__importDefault || function(e) {
		return e && e.__esModule ? e : { default: e };
	})(di()), r = fi();
	function i(e, t) {
		var i = {};
		return !e || typeof e != "string" || (0, n.default)(e, function(e, n) {
			e && n && (i[(0, r.camelCase)(e, t)] = n);
		}), i;
	}
	i.default = i, t.exports = i;
})), mi = gi("end"), hi = gi("start");
function gi(e) {
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
function _i(e) {
	let t = hi(e), n = mi(e);
	if (t && n) return {
		start: t,
		end: n
	};
}
//#endregion
//#region node_modules/unist-util-stringify-position/lib/index.js
function vi(e) {
	return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? bi(e.position) : "start" in e || "end" in e ? bi(e) : "line" in e || "column" in e ? yi(e) : "";
}
function yi(e) {
	return xi(e && e.line) + ":" + xi(e && e.column);
}
function bi(e) {
	return yi(e && e.start) + "-" + yi(e && e.end);
}
function xi(e) {
	return e && typeof e == "number" ? e : 1;
}
//#endregion
//#region node_modules/vfile-message/lib/index.js
var Si = class extends Error {
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
		this.ancestors = i.ancestors || void 0, this.cause = i.cause || void 0, this.column = o ? o.column : void 0, this.fatal = void 0, this.file = "", this.message = r, this.line = o ? o.line : void 0, this.name = vi(i.place) || "1:1", this.place = i.place || void 0, this.reason = this.message, this.ruleId = i.ruleId || void 0, this.source = i.source || void 0, this.stack = a && i.cause && typeof i.cause.stack == "string" ? i.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
	}
};
Si.prototype.file = "", Si.prototype.name = "", Si.prototype.reason = "", Si.prototype.message = "", Si.prototype.stack = "", Si.prototype.column = void 0, Si.prototype.line = void 0, Si.prototype.ancestors = void 0, Si.prototype.cause = void 0, Si.prototype.fatal = void 0, Si.prototype.place = void 0, Si.prototype.ruleId = void 0, Si.prototype.source = void 0;
//#endregion
//#region node_modules/hast-util-to-jsx-runtime/lib/index.js
var Ci = /* @__PURE__ */ e(pi(), 1), wi = {}.hasOwnProperty, Ti = /* @__PURE__ */ new Map(), Ei = /[A-Z]/g, Di = /* @__PURE__ */ new Set([
	"table",
	"tbody",
	"thead",
	"tfoot",
	"tr"
]), Oi = /* @__PURE__ */ new Set(["td", "th"]);
function ki(e, t) {
	if (!t || t.Fragment === void 0) throw TypeError("Expected `Fragment` in options");
	let n = t.filePath || void 0, r;
	if (t.development) {
		if (typeof t.jsxDEV != "function") throw TypeError("Expected `jsxDEV` in options when `development: true`");
		r = zi(n, t.jsxDEV);
	} else {
		if (typeof t.jsx != "function") throw TypeError("Expected `jsx` in production options");
		if (typeof t.jsxs != "function") throw TypeError("Expected `jsxs` in production options");
		r = Ri(n, t.jsx, t.jsxs);
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
		schema: t.space === "svg" ? ci : si,
		stylePropertyNameCase: t.stylePropertyNameCase || "dom",
		tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
	}, a = Ai(i, e, void 0);
	return a && typeof a != "string" ? a : i.create(e, i.Fragment, { children: a || void 0 }, void 0);
}
function Ai(e, t, n) {
	if (t.type === "element") return ji(e, t, n);
	if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression") return Mi(e, t);
	if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement") return Pi(e, t, n);
	if (t.type === "mdxjsEsm") return Ni(e, t);
	if (t.type === "root") return Fi(e, t, n);
	if (t.type === "text") return Ii(e, t);
}
function ji(e, t, n) {
	let r = e.schema, i = r;
	t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = ci, e.schema = i), e.ancestors.push(t);
	let a = Gi(e, t.tagName, !1), o = Bi(e, t), s = Hi(e, t);
	return Di.has(t.tagName) && (s = s.filter(function(e) {
		return typeof e != "string" || !kr(e);
	})), Li(e, o, a, t), I(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function Mi(e, t) {
	if (t.data && t.data.estree && e.evaluater) {
		let n = t.data.estree.body[0];
		return n.type, e.evaluater.evaluateExpression(n.expression);
	}
	Ki(e, t.position);
}
function Ni(e, t) {
	if (t.data && t.data.estree && e.evaluater) return e.evaluater.evaluateProgram(t.data.estree);
	Ki(e, t.position);
}
function Pi(e, t, n) {
	let r = e.schema, i = r;
	t.name === "svg" && r.space === "html" && (i = ci, e.schema = i), e.ancestors.push(t);
	let a = t.name === null ? e.Fragment : Gi(e, t.name, !0), o = Vi(e, t), s = Hi(e, t);
	return Li(e, o, a, t), I(o, s), e.ancestors.pop(), e.schema = r, e.create(t, a, o, n);
}
function Fi(e, t, n) {
	let r = {};
	return I(r, Hi(e, t)), e.create(t, e.Fragment, r, n);
}
function Ii(e, t) {
	return t.value;
}
function Li(e, t, n, r) {
	typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function I(e, t) {
	if (t.length > 0) {
		let n = t.length > 1 ? t : t[0];
		n && (e.children = n);
	}
}
function Ri(e, t, n) {
	return r;
	function r(e, r, i, a) {
		let o = Array.isArray(i.children) ? n : t;
		return a ? o(r, i, a) : o(r, i);
	}
}
function zi(e, t) {
	return n;
	function n(n, r, i, a) {
		let o = Array.isArray(i.children), s = hi(n);
		return t(r, i, a, o, {
			columnNumber: s ? s.column - 1 : void 0,
			fileName: e,
			lineNumber: s ? s.line : void 0
		}, void 0);
	}
}
function Bi(e, t) {
	let n = {}, r, i;
	for (i in t.properties) if (i !== "children" && wi.call(t.properties, i)) {
		let a = Ui(e, i, t.properties[i]);
		if (a) {
			let [i, o] = a;
			e.tableCellAlignToStyle && i === "align" && typeof o == "string" && Oi.has(t.tagName) ? r = o : n[i] = o;
		}
	}
	if (r) {
		let t = n.style ||= {};
		t[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
	}
	return n;
}
function Vi(e, t) {
	let n = {};
	for (let r of t.attributes) if (r.type === "mdxJsxExpressionAttribute") if (r.data && r.data.estree && e.evaluater) {
		let t = r.data.estree.body[0];
		t.type;
		let i = t.expression;
		i.type;
		let a = i.properties[0];
		a.type, Object.assign(n, e.evaluater.evaluateExpression(a.argument));
	} else Ki(e, t.position);
	else {
		let i = r.name, a;
		if (r.value && typeof r.value == "object") if (r.value.data && r.value.data.estree && e.evaluater) {
			let t = r.value.data.estree.body[0];
			t.type, a = e.evaluater.evaluateExpression(t.expression);
		} else Ki(e, t.position);
		else a = r.value === null || r.value;
		n[i] = a;
	}
	return n;
}
function Hi(e, t) {
	let n = [], r = -1, i = e.passKeys ? /* @__PURE__ */ new Map() : Ti;
	for (; ++r < t.children.length;) {
		let a = t.children[r], o;
		if (e.passKeys) {
			let e = a.type === "element" ? a.tagName : a.type === "mdxJsxFlowElement" || a.type === "mdxJsxTextElement" ? a.name : void 0;
			if (e) {
				let t = i.get(e) || 0;
				o = e + "-" + t, i.set(e, t + 1);
			}
		}
		let s = Ai(e, a, o);
		s !== void 0 && n.push(s);
	}
	return n;
}
function Ui(e, t, n) {
	let r = ii(e.schema, t);
	if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
		if (Array.isArray(n) && (n = r.commaSeparated ? Cr(n) : li(n)), r.property === "style") {
			let t = typeof n == "object" ? n : Wi(e, String(n));
			return e.stylePropertyNameCase === "css" && (t = qi(t)), ["style", t];
		}
		return [e.elementAttributeNameCase === "react" && r.space ? ei[r.property] || r.property : r.attribute, n];
	}
}
function Wi(e, t) {
	try {
		return (0, Ci.default)(t, { reactCompat: !0 });
	} catch (t) {
		if (e.ignoreInvalidStyle) return {};
		let n = t, r = new Si("Cannot parse `style` attribute", {
			ancestors: e.ancestors,
			cause: n,
			ruleId: "style",
			source: "hast-util-to-jsx-runtime"
		});
		throw r.file = e.filePath || void 0, r.url = "https://github.com/syntax-tree/hast-util-to-jsx-runtime#cannot-parse-style-attribute", r;
	}
}
function Gi(e, t, n) {
	let r;
	if (!n) r = {
		type: "Literal",
		value: t
	};
	else if (t.includes(".")) {
		let e = t.split("."), n = -1, i;
		for (; ++n < e.length;) {
			let t = Dr(e[n]) ? {
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
	} else r = Dr(t) && !/^[a-z]/.test(t) ? {
		type: "Identifier",
		name: t
	} : {
		type: "Literal",
		value: t
	};
	if (r.type === "Literal") {
		let t = r.value;
		return wi.call(e.components, t) ? e.components[t] : t;
	}
	if (e.evaluater) return e.evaluater.evaluateExpression(r);
	Ki(e);
}
function Ki(e, t) {
	let n = new Si("Cannot handle MDX estrees without `createEvaluater`", {
		ancestors: e.ancestors,
		place: t,
		ruleId: "mdx-estree",
		source: "hast-util-to-jsx-runtime"
	});
	throw n.file = e.filePath || void 0, n.url = "https://github.com/syntax-tree/hast-util-to-jsx-runtime#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function qi(e) {
	let t = {}, n;
	for (n in e) wi.call(e, n) && (t[Ji(n)] = e[n]);
	return t;
}
function Ji(e) {
	let t = e.replace(Ei, Yi);
	return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function Yi(e) {
	return "-" + e.toLowerCase();
}
//#endregion
//#region node_modules/html-url-attributes/lib/index.js
var Xi = {
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
}, Zi = /* @__PURE__ */ n(((e) => {
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
})), Qi = /* @__PURE__ */ n(((e, t) => {
	t.exports = Zi();
})), $i = {};
function ea(e, t) {
	let n = t || $i;
	return ta(e, typeof n.includeImageAlt != "boolean" || n.includeImageAlt, typeof n.includeHtml != "boolean" || n.includeHtml);
}
function ta(e, t, n) {
	if (ra(e)) {
		if ("value" in e) return e.type === "html" && !n ? "" : e.value;
		if (t && "alt" in e && e.alt) return e.alt;
		if ("children" in e) return na(e.children, t, n);
	}
	return Array.isArray(e) ? na(e, t, n) : "";
}
function na(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) r[i] = ta(e[i], t, n);
	return r.join("");
}
function ra(e) {
	return !!(e && typeof e == "object");
}
//#endregion
//#region node_modules/decode-named-character-reference/index.dom.js
var ia = document.createElement("i");
function aa(e) {
	let t = "&" + e + ";";
	ia.innerHTML = t;
	let n = ia.textContent;
	return n.charCodeAt(n.length - 1) === 59 && e !== "semi" ? !1 : n !== t && n;
}
//#endregion
//#region node_modules/micromark-util-chunked/index.js
function oa(e, t, n, r) {
	let i = e.length, a = 0, o;
	if (t = t < 0 ? -t > i ? 0 : i + t : t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4) o = Array.from(r), o.unshift(t, n), e.splice(...o);
	else for (n && e.splice(t, n); a < r.length;) o = r.slice(a, a + 1e4), o.unshift(t, 0), e.splice(...o), a += 1e4, t += 1e4;
}
function sa(e, t) {
	return e.length > 0 ? (oa(e, e.length, 0, t), e) : t;
}
//#endregion
//#region node_modules/micromark-util-combine-extensions/index.js
var ca = {}.hasOwnProperty;
function la(e) {
	let t = {}, n = -1;
	for (; ++n < e.length;) ua(t, e[n]);
	return t;
}
function ua(e, t) {
	let n;
	for (n in t) {
		let r = (ca.call(e, n) ? e[n] : void 0) || (e[n] = {}), i = t[n], a;
		if (i) for (a in i) {
			ca.call(r, a) || (r[a] = []);
			let e = i[a];
			da(r[a], Array.isArray(e) ? e : e ? [e] : []);
		}
	}
}
function da(e, t) {
	let n = -1, r = [];
	for (; ++n < t.length;) (t[n].add === "after" ? e : r).push(t[n]);
	oa(e, 0, 0, r);
}
//#endregion
//#region node_modules/micromark-util-decode-numeric-character-reference/index.js
function fa(e, t) {
	let n = Number.parseInt(e, t);
	return n < 9 || n === 11 || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || (n & 65535) == 65535 || (n & 65535) == 65534 || n > 1114111 ? "�" : String.fromCodePoint(n);
}
//#endregion
//#region node_modules/micromark-util-normalize-identifier/index.js
function pa(e) {
	return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
//#endregion
//#region node_modules/micromark-util-character/index.js
var ma = Ca(/[A-Za-z]/), ha = Ca(/[\dA-Za-z]/), ga = Ca(/[#-'*+\--9=?A-Z^-~]/);
function _a(e) {
	return e !== null && (e < 32 || e === 127);
}
var va = Ca(/\d/), ya = Ca(/[\dA-Fa-f]/), ba = Ca(/[!-/:-@[-`{-~]/);
function L(e) {
	return e !== null && e < -2;
}
function R(e) {
	return e !== null && (e < 0 || e === 32);
}
function z(e) {
	return e === -2 || e === -1 || e === 32;
}
var xa = Ca(/\p{P}|\p{S}/u), Sa = Ca(/\s/);
function Ca(e) {
	return t;
	function t(t) {
		return t !== null && t > -1 && e.test(String.fromCharCode(t));
	}
}
//#endregion
//#region node_modules/micromark-util-sanitize-uri/index.js
function wa(e) {
	let t = [], n = -1, r = 0, i = 0;
	for (; ++n < e.length;) {
		let a = e.charCodeAt(n), o = "";
		if (a === 37 && ha(e.charCodeAt(n + 1)) && ha(e.charCodeAt(n + 2))) i = 2;
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
function B(e, t, n, r) {
	let i = r ? r - 1 : Infinity, a = 0;
	return o;
	function o(r) {
		return z(r) ? (e.enter(n), s(r)) : t(r);
	}
	function s(r) {
		return z(r) && a++ < i ? (e.consume(r), s) : (e.exit(n), t(r));
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/content.js
var Ta = { tokenize: Ea };
function Ea(e) {
	let t = e.attempt(this.parser.constructs.contentInitial, r, i), n;
	return t;
	function r(n) {
		if (n === null) {
			e.consume(n);
			return;
		}
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), B(e, t, "linePrefix");
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
		return L(t) ? (e.consume(t), e.exit("chunkText"), a) : (e.consume(t), o);
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/document.js
var Da = { tokenize: ka }, Oa = { tokenize: Aa };
function ka(e) {
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
			return oa(t.events, a + 1, 0, t.events.slice(n)), t.events.length = s, l(e);
		}
		return s(e);
	}
	function l(a) {
		if (r === n.length) {
			if (!i) return f(a);
			if (i.currentConstruct && i.currentConstruct.concrete) return m(a);
			t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
		}
		return t.containerState = {}, e.check(Oa, u, d)(a);
	}
	function u(e) {
		return i && v(), _(r), f(e);
	}
	function d(e) {
		return t.parser.lazy[t.now().line] = r !== n.length, o = t.now().offset, m(e);
	}
	function f(n) {
		return t.containerState = {}, e.attempt(Oa, p, m)(n);
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
		return L(n) ? (e.consume(n), g(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, s) : (e.consume(n), h);
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
			oa(t.events, a + 1, 0, t.events.slice(n)), t.events.length = e;
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
function Aa(e, t, n) {
	return B(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
//#endregion
//#region node_modules/micromark-util-classify-character/index.js
function ja(e) {
	if (e === null || R(e) || Sa(e)) return 1;
	if (xa(e)) return 2;
}
//#endregion
//#region node_modules/micromark-util-resolve-all/index.js
function Ma(e, t, n) {
	let r = [], i = -1;
	for (; ++i < e.length;) {
		let a = e[i].resolveAll;
		a && !r.includes(a) && (t = a(t, n), r.push(a));
	}
	return t;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/attention.js
var Na = {
	name: "attention",
	resolveAll: Pa,
	tokenize: Fa
};
function Pa(e, t) {
	let n = -1, r, i, a, o, s, c, l, u;
	for (; ++n < e.length;) if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
		for (r = n; r--;) if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
			if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3)) continue;
			c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
			let d = { ...e[r][1].end }, f = { ...e[n][1].start };
			Ia(d, -c), Ia(f, c), o = {
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
			}, e[r][1].end = { ...o.start }, e[n][1].start = { ...s.end }, l = [], e[r][1].end.offset - e[r][1].start.offset && (l = sa(l, [[
				"enter",
				e[r][1],
				t
			], [
				"exit",
				e[r][1],
				t
			]])), l = sa(l, [
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
			]), l = sa(l, Ma(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), l = sa(l, [
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
			]), e[n][1].end.offset - e[n][1].start.offset ? (u = 2, l = sa(l, [[
				"enter",
				e[n][1],
				t
			], [
				"exit",
				e[n][1],
				t
			]])) : u = 0, oa(e, r - 1, n - r + 3, l), n = r + l.length - u - 2;
			break;
		}
	}
	for (n = -1; ++n < e.length;) e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
	return e;
}
function Fa(e, t) {
	let n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = ja(r), a;
	return o;
	function o(t) {
		return a = t, e.enter("attentionSequence"), s(t);
	}
	function s(o) {
		if (o === a) return e.consume(o), s;
		let c = e.exit("attentionSequence"), l = ja(o), u = !l || l === 2 && i || n.includes(o), d = !i || i === 2 && l || n.includes(r);
		return c._open = !!(a === 42 ? u : u && (i || !d)), c._close = !!(a === 42 ? d : d && (l || !u)), t(o);
	}
}
function Ia(e, t) {
	e.column += t, e.offset += t, e._bufferIndex += t;
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/autolink.js
var La = {
	name: "autolink",
	tokenize: Ra
};
function Ra(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(t), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), a;
	}
	function a(t) {
		return ma(t) ? (e.consume(t), o) : t === 64 ? n(t) : l(t);
	}
	function o(e) {
		return e === 43 || e === 45 || e === 46 || ha(e) ? (r = 1, s(e)) : l(e);
	}
	function s(t) {
		return t === 58 ? (e.consume(t), r = 0, c) : (t === 43 || t === 45 || t === 46 || ha(t)) && r++ < 32 ? (e.consume(t), s) : (r = 0, l(t));
	}
	function c(r) {
		return r === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(r), e.exit("autolinkMarker"), e.exit("autolink"), t) : r === null || r === 32 || r === 60 || _a(r) ? n(r) : (e.consume(r), c);
	}
	function l(t) {
		return t === 64 ? (e.consume(t), u) : ga(t) ? (e.consume(t), l) : n(t);
	}
	function u(e) {
		return ha(e) ? d(e) : n(e);
	}
	function d(n) {
		return n === 46 ? (e.consume(n), r = 0, u) : n === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(n), e.exit("autolinkMarker"), e.exit("autolink"), t) : f(n);
	}
	function f(t) {
		if ((t === 45 || ha(t)) && r++ < 63) {
			let n = t === 45 ? f : d;
			return e.consume(t), n;
		}
		return n(t);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/blank-line.js
var za = {
	partial: !0,
	tokenize: Ba
};
function Ba(e, t, n) {
	return r;
	function r(t) {
		return z(t) ? B(e, i, "linePrefix")(t) : i(t);
	}
	function i(e) {
		return e === null || L(e) ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/block-quote.js
var Va = {
	continuation: { tokenize: Ua },
	exit: Wa,
	name: "blockQuote",
	tokenize: Ha
};
function Ha(e, t, n) {
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
		return z(n) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(n), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(n));
	}
}
function Ua(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return z(t) ? B(e, a, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : a(t);
	}
	function a(r) {
		return e.attempt(Va, t, n)(r);
	}
}
function Wa(e) {
	e.exit("blockQuote");
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/character-escape.js
var Ga = {
	name: "characterEscape",
	tokenize: Ka
};
function Ka(e, t, n) {
	return r;
	function r(t) {
		return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(t), e.exit("escapeMarker"), i;
	}
	function i(r) {
		return ba(r) ? (e.enter("characterEscapeValue"), e.consume(r), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/character-reference.js
var qa = {
	name: "characterReference",
	tokenize: Ja
};
function Ja(e, t, n) {
	let r = this, i = 0, a, o;
	return s;
	function s(t) {
		return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(t), e.exit("characterReferenceMarker"), c;
	}
	function c(t) {
		return t === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(t), e.exit("characterReferenceMarkerNumeric"), l) : (e.enter("characterReferenceValue"), a = 31, o = ha, u(t));
	}
	function l(t) {
		return t === 88 || t === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(t), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), a = 6, o = ya, u) : (e.enter("characterReferenceValue"), a = 7, o = va, u(t));
	}
	function u(s) {
		if (s === 59 && i) {
			let i = e.exit("characterReferenceValue");
			return o === ha && !aa(r.sliceSerialize(i)) ? n(s) : (e.enter("characterReferenceMarker"), e.consume(s), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
		}
		return o(s) && i++ < a ? (e.consume(s), u) : n(s);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-fenced.js
var Ya = {
	partial: !0,
	tokenize: Qa
}, Xa = {
	concrete: !0,
	name: "codeFenced",
	tokenize: Za
};
function Za(e, t, n) {
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
		return t === s ? (o++, e.consume(t), u) : o < 3 ? n(t) : (e.exit("codeFencedFenceSequence"), z(t) ? B(e, d, "whitespace")(t) : d(t));
	}
	function d(n) {
		return n === null || L(n) ? (e.exit("codeFencedFence"), r.interrupt ? t(n) : e.check(Ya, h, b)(n)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", { contentType: "string" }), f(n));
	}
	function f(t) {
		return t === null || L(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(t)) : z(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), B(e, p, "whitespace")(t)) : t === 96 && t === s ? n(t) : (e.consume(t), f);
	}
	function p(t) {
		return t === null || L(t) ? d(t) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", { contentType: "string" }), m(t));
	}
	function m(t) {
		return t === null || L(t) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(t)) : t === 96 && t === s ? n(t) : (e.consume(t), m);
	}
	function h(t) {
		return e.attempt(i, b, g)(t);
	}
	function g(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), _;
	}
	function _(t) {
		return a > 0 && z(t) ? B(e, v, "linePrefix", a + 1)(t) : v(t);
	}
	function v(t) {
		return t === null || L(t) ? e.check(Ya, h, b)(t) : (e.enter("codeFlowValue"), y(t));
	}
	function y(t) {
		return t === null || L(t) ? (e.exit("codeFlowValue"), v(t)) : (e.consume(t), y);
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
			return e.enter("codeFencedFence"), z(t) ? B(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : l(t);
		}
		function l(t) {
			return t === s ? (e.enter("codeFencedFenceSequence"), u(t)) : n(t);
		}
		function u(t) {
			return t === s ? (i++, e.consume(t), u) : i >= o ? (e.exit("codeFencedFenceSequence"), z(t) ? B(e, d, "whitespace")(t) : d(t)) : n(t);
		}
		function d(r) {
			return r === null || L(r) ? (e.exit("codeFencedFence"), t(r)) : n(r);
		}
	}
}
function Qa(e, t, n) {
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
var $a = {
	name: "codeIndented",
	tokenize: to
}, eo = {
	partial: !0,
	tokenize: no
};
function to(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.enter("codeIndented"), B(e, a, "linePrefix", 5)(t);
	}
	function a(e) {
		let t = r.events[r.events.length - 1];
		return t && t[1].type === "linePrefix" && t[2].sliceSerialize(t[1], !0).length >= 4 ? o(e) : n(e);
	}
	function o(t) {
		return t === null ? c(t) : L(t) ? e.attempt(eo, o, c)(t) : (e.enter("codeFlowValue"), s(t));
	}
	function s(t) {
		return t === null || L(t) ? (e.exit("codeFlowValue"), o(t)) : (e.consume(t), s);
	}
	function c(n) {
		return e.exit("codeIndented"), t(n);
	}
}
function no(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return r.parser.lazy[r.now().line] ? n(t) : L(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), i) : B(e, a, "linePrefix", 5)(t);
	}
	function a(e) {
		let a = r.events[r.events.length - 1];
		return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(e) : L(e) ? i(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/code-text.js
var ro = {
	name: "codeText",
	previous: ao,
	resolve: io,
	tokenize: oo
};
function io(e) {
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
function ao(e) {
	return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function oo(e, t, n) {
	let r = 0, i, a;
	return o;
	function o(t) {
		return e.enter("codeText"), e.enter("codeTextSequence"), s(t);
	}
	function s(t) {
		return t === 96 ? (e.consume(t), r++, s) : (e.exit("codeTextSequence"), c(t));
	}
	function c(t) {
		return t === null ? n(t) : t === 32 ? (e.enter("space"), e.consume(t), e.exit("space"), c) : t === 96 ? (a = e.enter("codeTextSequence"), i = 0, u(t)) : L(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), c) : (e.enter("codeTextData"), l(t));
	}
	function l(t) {
		return t === null || t === 32 || t === 96 || L(t) ? (e.exit("codeTextData"), c(t)) : (e.consume(t), l);
	}
	function u(n) {
		return n === 96 ? (e.consume(n), i++, u) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(n)) : (a.type = "codeTextData", l(n));
	}
}
//#endregion
//#region node_modules/micromark-util-subtokenize/lib/splice-buffer.js
var so = class {
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
		return n && co(this.left, n), i.reverse();
	}
	pop() {
		return this.setCursor(Infinity), this.left.pop();
	}
	push(e) {
		this.setCursor(Infinity), this.left.push(e);
	}
	pushMany(e) {
		this.setCursor(Infinity), co(this.left, e);
	}
	unshift(e) {
		this.setCursor(0), this.right.push(e);
	}
	unshiftMany(e) {
		this.setCursor(0), co(this.right, e.reverse());
	}
	setCursor(e) {
		if (!(e === this.left.length || e > this.left.length && this.right.length === 0 || e < 0 && this.left.length === 0)) if (e < this.left.length) {
			let t = this.left.splice(e, Infinity);
			co(this.right, t.reverse());
		} else {
			let t = this.right.splice(this.left.length + this.right.length - e, Infinity);
			co(this.left, t.reverse());
		}
	}
};
function co(e, t) {
	let n = 0;
	if (t.length < 1e4) e.push(...t);
	else for (; n < t.length;) e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
//#endregion
//#region node_modules/micromark-util-subtokenize/index.js
function lo(e) {
	let t = {}, n = -1, r, i, a, o, s, c, l, u = new so(e);
	for (; ++n < u.length;) {
		for (; n in t;) n = t[n];
		if (r = u.get(n), n && r[1].type === "chunkFlow" && u.get(n - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, a = 0, a < c.length && c[a][1].type === "lineEndingBlank" && (a += 2), a < c.length && c[a][1].type === "content")) for (; ++a < c.length && c[a][1].type !== "content";) c[a][1].type === "chunkText" && (c[a][1]._isInFirstContentOfListItem = !0, a++);
		if (r[0] === "enter") r[1].contentType && (Object.assign(t, uo(u, n)), n = t[n], l = !0);
		else if (r[1]._container) {
			for (a = n, i = void 0; a--;) if (o = u.get(a), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank") o[0] === "enter" && (i && (u.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = a);
			else if (!(o[1].type === "linePrefix" || o[1].type === "listItemIndent")) break;
			i && (r[1].end = { ...u.get(i)[1].start }, s = u.slice(i, n), s.unshift(r), u.splice(i, n - i + 1, s));
		}
	}
	return oa(e, 0, Infinity, u.slice(0)), !l;
}
function uo(e, t) {
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
var fo = {
	resolve: H,
	tokenize: po
}, V = {
	partial: !0,
	tokenize: mo
};
function H(e) {
	return lo(e), e;
}
function po(e, t) {
	let n;
	return r;
	function r(t) {
		return e.enter("content"), n = e.enter("chunkContent", { contentType: "content" }), i(t);
	}
	function i(t) {
		return t === null ? a(t) : L(t) ? e.check(V, o, a)(t) : (e.consume(t), i);
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
function mo(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), B(e, a, "linePrefix");
	}
	function a(i) {
		if (i === null || L(i)) return n(i);
		let a = r.events[r.events.length - 1];
		return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(i) : e.interrupt(r.parser.constructs.flow, n, t)(i);
	}
}
//#endregion
//#region node_modules/micromark-factory-destination/index.js
function ho(e, t, n, r, i, a, o, s, c) {
	let l = c || Infinity, u = 0;
	return d;
	function d(t) {
		return t === 60 ? (e.enter(r), e.enter(i), e.enter(a), e.consume(t), e.exit(a), f) : t === null || t === 32 || t === 41 || _a(t) ? n(t) : (e.enter(r), e.enter(o), e.enter(s), e.enter("chunkString", { contentType: "string" }), h(t));
	}
	function f(n) {
		return n === 62 ? (e.enter(a), e.consume(n), e.exit(a), e.exit(i), e.exit(r), t) : (e.enter(s), e.enter("chunkString", { contentType: "string" }), p(n));
	}
	function p(t) {
		return t === 62 ? (e.exit("chunkString"), e.exit(s), f(t)) : t === null || t === 60 || L(t) ? n(t) : (e.consume(t), t === 92 ? m : p);
	}
	function m(t) {
		return t === 60 || t === 62 || t === 92 ? (e.consume(t), p) : p(t);
	}
	function h(i) {
		return !u && (i === null || i === 41 || R(i)) ? (e.exit("chunkString"), e.exit(s), e.exit(o), e.exit(r), t(i)) : u < l && i === 40 ? (e.consume(i), u++, h) : i === 41 ? (e.consume(i), u--, h) : i === null || i === 32 || i === 40 || _a(i) ? n(i) : (e.consume(i), i === 92 ? g : h);
	}
	function g(t) {
		return t === 40 || t === 41 || t === 92 ? (e.consume(t), h) : h(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-label/index.js
function go(e, t, n, r, i, a) {
	let o = this, s = 0, c;
	return l;
	function l(t) {
		return e.enter(r), e.enter(i), e.consume(t), e.exit(i), e.enter(a), u;
	}
	function u(l) {
		return s > 999 || l === null || l === 91 || l === 93 && !c || l === 94 && !s && "_hiddenFootnoteSupport" in o.parser.constructs ? n(l) : l === 93 ? (e.exit(a), e.enter(i), e.consume(l), e.exit(i), e.exit(r), t) : L(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), u) : (e.enter("chunkString", { contentType: "string" }), d(l));
	}
	function d(t) {
		return t === null || t === 91 || t === 93 || L(t) || s++ > 999 ? (e.exit("chunkString"), u(t)) : (e.consume(t), c ||= !z(t), t === 92 ? f : d);
	}
	function f(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), s++, d) : d(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-title/index.js
function _o(e, t, n, r, i, a) {
	let o;
	return s;
	function s(t) {
		return t === 34 || t === 39 || t === 40 ? (e.enter(r), e.enter(i), e.consume(t), e.exit(i), o = t === 40 ? 41 : t, c) : n(t);
	}
	function c(n) {
		return n === o ? (e.enter(i), e.consume(n), e.exit(i), e.exit(r), t) : (e.enter(a), l(n));
	}
	function l(t) {
		return t === o ? (e.exit(a), c(o)) : t === null ? n(t) : L(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), B(e, l, "linePrefix")) : (e.enter("chunkString", { contentType: "string" }), u(t));
	}
	function u(t) {
		return t === o || t === null || L(t) ? (e.exit("chunkString"), l(t)) : (e.consume(t), t === 92 ? d : u);
	}
	function d(t) {
		return t === o || t === 92 ? (e.consume(t), u) : u(t);
	}
}
//#endregion
//#region node_modules/micromark-factory-whitespace/index.js
function vo(e, t) {
	let n;
	return r;
	function r(i) {
		return L(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : z(i) ? B(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/definition.js
var yo = {
	name: "definition",
	tokenize: xo
}, bo = {
	partial: !0,
	tokenize: So
};
function xo(e, t, n) {
	let r = this, i;
	return a;
	function a(t) {
		return e.enter("definition"), o(t);
	}
	function o(t) {
		return go.call(r, e, s, n, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(t);
	}
	function s(t) {
		return i = pa(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), c) : n(t);
	}
	function c(t) {
		return R(t) ? vo(e, l)(t) : l(t);
	}
	function l(t) {
		return ho(e, u, n, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(t);
	}
	function u(t) {
		return e.attempt(bo, d, d)(t);
	}
	function d(t) {
		return z(t) ? B(e, f, "whitespace")(t) : f(t);
	}
	function f(a) {
		return a === null || L(a) ? (e.exit("definition"), r.parser.defined.push(i), t(a)) : n(a);
	}
}
function So(e, t, n) {
	return r;
	function r(t) {
		return R(t) ? vo(e, i)(t) : n(t);
	}
	function i(t) {
		return _o(e, a, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(t);
	}
	function a(t) {
		return z(t) ? B(e, o, "whitespace")(t) : o(t);
	}
	function o(e) {
		return e === null || L(e) ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var Co = {
	name: "hardBreakEscape",
	tokenize: wo
};
function wo(e, t, n) {
	return r;
	function r(t) {
		return e.enter("hardBreakEscape"), e.consume(t), i;
	}
	function i(r) {
		return L(r) ? (e.exit("hardBreakEscape"), t(r)) : n(r);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/heading-atx.js
var To = {
	name: "headingAtx",
	resolve: Eo,
	tokenize: Do
};
function Eo(e, t) {
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
	}, oa(e, r, n - r + 1, [
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
function Do(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return e.enter("atxHeading"), a(t);
	}
	function a(t) {
		return e.enter("atxHeadingSequence"), o(t);
	}
	function o(t) {
		return t === 35 && r++ < 6 ? (e.consume(t), o) : t === null || R(t) ? (e.exit("atxHeadingSequence"), s(t)) : n(t);
	}
	function s(n) {
		return n === 35 ? (e.enter("atxHeadingSequence"), c(n)) : n === null || L(n) ? (e.exit("atxHeading"), t(n)) : z(n) ? B(e, s, "whitespace")(n) : (e.enter("atxHeadingText"), l(n));
	}
	function c(t) {
		return t === 35 ? (e.consume(t), c) : (e.exit("atxHeadingSequence"), s(t));
	}
	function l(t) {
		return t === null || t === 35 || R(t) ? (e.exit("atxHeadingText"), s(t)) : (e.consume(t), l);
	}
}
//#endregion
//#region node_modules/micromark-util-html-tag-name/index.js
var Oo = /* @__PURE__ */ "address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul".split("."), ko = [
	"pre",
	"script",
	"style",
	"textarea"
], Ao = {
	concrete: !0,
	name: "htmlFlow",
	resolveTo: No,
	tokenize: Po
}, jo = {
	partial: !0,
	tokenize: Io
}, Mo = {
	partial: !0,
	tokenize: Fo
};
function No(e) {
	let t = e.length;
	for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"););
	return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Po(e, t, n) {
	let r = this, i, a, o, s, c;
	return l;
	function l(e) {
		return u(e);
	}
	function u(t) {
		return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(t), d;
	}
	function d(s) {
		return s === 33 ? (e.consume(s), f) : s === 47 ? (e.consume(s), a = !0, h) : s === 63 ? (e.consume(s), i = 3, r.interrupt ? t : oe) : ma(s) ? (e.consume(s), o = String.fromCharCode(s), g) : n(s);
	}
	function f(a) {
		return a === 45 ? (e.consume(a), i = 2, p) : a === 91 ? (e.consume(a), i = 5, s = 0, m) : ma(a) ? (e.consume(a), i = 4, r.interrupt ? t : oe) : n(a);
	}
	function p(i) {
		return i === 45 ? (e.consume(i), r.interrupt ? t : oe) : n(i);
	}
	function m(i) {
		return i === "CDATA[".charCodeAt(s++) ? (e.consume(i), s === 6 ? r.interrupt ? t : D : m) : n(i);
	}
	function h(t) {
		return ma(t) ? (e.consume(t), o = String.fromCharCode(t), g) : n(t);
	}
	function g(s) {
		if (s === null || s === 47 || s === 62 || R(s)) {
			let c = s === 47, l = o.toLowerCase();
			return !c && !a && ko.includes(l) ? (i = 1, r.interrupt ? t(s) : D(s)) : Oo.includes(o.toLowerCase()) ? (i = 6, c ? (e.consume(s), _) : r.interrupt ? t(s) : D(s)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(s) : a ? v(s) : y(s));
		}
		return s === 45 || ha(s) ? (e.consume(s), o += String.fromCharCode(s), g) : n(s);
	}
	function _(i) {
		return i === 62 ? (e.consume(i), r.interrupt ? t : D) : n(i);
	}
	function v(t) {
		return z(t) ? (e.consume(t), v) : E(t);
	}
	function y(t) {
		return t === 47 ? (e.consume(t), E) : t === 58 || t === 95 || ma(t) ? (e.consume(t), b) : z(t) ? (e.consume(t), y) : E(t);
	}
	function b(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || ha(t) ? (e.consume(t), b) : x(t);
	}
	function x(t) {
		return t === 61 ? (e.consume(t), S) : z(t) ? (e.consume(t), x) : y(t);
	}
	function S(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), c = t, C) : z(t) ? (e.consume(t), S) : w(t);
	}
	function C(t) {
		return t === c ? (e.consume(t), c = null, T) : t === null || L(t) ? n(t) : (e.consume(t), C);
	}
	function w(t) {
		return t === null || t === 34 || t === 39 || t === 47 || t === 60 || t === 61 || t === 62 || t === 96 || R(t) ? x(t) : (e.consume(t), w);
	}
	function T(e) {
		return e === 47 || e === 62 || z(e) ? y(e) : n(e);
	}
	function E(t) {
		return t === 62 ? (e.consume(t), ee) : n(t);
	}
	function ee(t) {
		return t === null || L(t) ? D(t) : z(t) ? (e.consume(t), ee) : n(t);
	}
	function D(t) {
		return t === 45 && i === 2 ? (e.consume(t), ie) : t === 60 && i === 1 ? (e.consume(t), O) : t === 62 && i === 4 ? (e.consume(t), se) : t === 63 && i === 3 ? (e.consume(t), oe) : t === 93 && i === 5 ? (e.consume(t), ae) : L(t) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(jo, ce, te)(t)) : t === null || L(t) ? (e.exit("htmlFlowData"), te(t)) : (e.consume(t), D);
	}
	function te(t) {
		return e.check(Mo, ne, ce)(t);
	}
	function ne(t) {
		return e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), re;
	}
	function re(t) {
		return t === null || L(t) ? te(t) : (e.enter("htmlFlowData"), D(t));
	}
	function ie(t) {
		return t === 45 ? (e.consume(t), oe) : D(t);
	}
	function O(t) {
		return t === 47 ? (e.consume(t), o = "", k) : D(t);
	}
	function k(t) {
		if (t === 62) {
			let n = o.toLowerCase();
			return ko.includes(n) ? (e.consume(t), se) : D(t);
		}
		return ma(t) && o.length < 8 ? (e.consume(t), o += String.fromCharCode(t), k) : D(t);
	}
	function ae(t) {
		return t === 93 ? (e.consume(t), oe) : D(t);
	}
	function oe(t) {
		return t === 62 ? (e.consume(t), se) : t === 45 && i === 2 ? (e.consume(t), oe) : D(t);
	}
	function se(t) {
		return t === null || L(t) ? (e.exit("htmlFlowData"), ce(t)) : (e.consume(t), se);
	}
	function ce(n) {
		return e.exit("htmlFlow"), t(n);
	}
}
function Fo(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return L(t) ? (e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), a) : n(t);
	}
	function a(e) {
		return r.parser.lazy[r.now().line] ? n(e) : t(e);
	}
}
function Io(e, t, n) {
	return r;
	function r(r) {
		return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), e.attempt(za, t, n);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/html-text.js
var Lo = {
	name: "htmlText",
	tokenize: Ro
};
function Ro(e, t, n) {
	let r = this, i, a, o;
	return s;
	function s(t) {
		return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(t), c;
	}
	function c(t) {
		return t === 33 ? (e.consume(t), l) : t === 47 ? (e.consume(t), x) : t === 63 ? (e.consume(t), y) : ma(t) ? (e.consume(t), w) : n(t);
	}
	function l(t) {
		return t === 45 ? (e.consume(t), u) : t === 91 ? (e.consume(t), a = 0, m) : ma(t) ? (e.consume(t), v) : n(t);
	}
	function u(t) {
		return t === 45 ? (e.consume(t), p) : n(t);
	}
	function d(t) {
		return t === null ? n(t) : t === 45 ? (e.consume(t), f) : L(t) ? (o = d, O(t)) : (e.consume(t), d);
	}
	function f(t) {
		return t === 45 ? (e.consume(t), p) : d(t);
	}
	function p(e) {
		return e === 62 ? ie(e) : e === 45 ? f(e) : d(e);
	}
	function m(t) {
		return t === "CDATA[".charCodeAt(a++) ? (e.consume(t), a === 6 ? h : m) : n(t);
	}
	function h(t) {
		return t === null ? n(t) : t === 93 ? (e.consume(t), g) : L(t) ? (o = h, O(t)) : (e.consume(t), h);
	}
	function g(t) {
		return t === 93 ? (e.consume(t), _) : h(t);
	}
	function _(t) {
		return t === 62 ? ie(t) : t === 93 ? (e.consume(t), _) : h(t);
	}
	function v(t) {
		return t === null || t === 62 ? ie(t) : L(t) ? (o = v, O(t)) : (e.consume(t), v);
	}
	function y(t) {
		return t === null ? n(t) : t === 63 ? (e.consume(t), b) : L(t) ? (o = y, O(t)) : (e.consume(t), y);
	}
	function b(e) {
		return e === 62 ? ie(e) : y(e);
	}
	function x(t) {
		return ma(t) ? (e.consume(t), S) : n(t);
	}
	function S(t) {
		return t === 45 || ha(t) ? (e.consume(t), S) : C(t);
	}
	function C(t) {
		return L(t) ? (o = C, O(t)) : z(t) ? (e.consume(t), C) : ie(t);
	}
	function w(t) {
		return t === 45 || ha(t) ? (e.consume(t), w) : t === 47 || t === 62 || R(t) ? T(t) : n(t);
	}
	function T(t) {
		return t === 47 ? (e.consume(t), ie) : t === 58 || t === 95 || ma(t) ? (e.consume(t), E) : L(t) ? (o = T, O(t)) : z(t) ? (e.consume(t), T) : ie(t);
	}
	function E(t) {
		return t === 45 || t === 46 || t === 58 || t === 95 || ha(t) ? (e.consume(t), E) : ee(t);
	}
	function ee(t) {
		return t === 61 ? (e.consume(t), D) : L(t) ? (o = ee, O(t)) : z(t) ? (e.consume(t), ee) : T(t);
	}
	function D(t) {
		return t === null || t === 60 || t === 61 || t === 62 || t === 96 ? n(t) : t === 34 || t === 39 ? (e.consume(t), i = t, te) : L(t) ? (o = D, O(t)) : z(t) ? (e.consume(t), D) : (e.consume(t), ne);
	}
	function te(t) {
		return t === i ? (e.consume(t), i = void 0, re) : t === null ? n(t) : L(t) ? (o = te, O(t)) : (e.consume(t), te);
	}
	function ne(t) {
		return t === null || t === 34 || t === 39 || t === 60 || t === 61 || t === 96 ? n(t) : t === 47 || t === 62 || R(t) ? T(t) : (e.consume(t), ne);
	}
	function re(e) {
		return e === 47 || e === 62 || R(e) ? T(e) : n(e);
	}
	function ie(r) {
		return r === 62 ? (e.consume(r), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(r);
	}
	function O(t) {
		return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), k;
	}
	function k(t) {
		return z(t) ? B(e, ae, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : ae(t);
	}
	function ae(t) {
		return e.enter("htmlTextData"), o(t);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/label-end.js
var zo = {
	name: "labelEnd",
	resolveAll: Uo,
	resolveTo: Wo,
	tokenize: Go
}, Bo = { tokenize: Ko }, Vo = { tokenize: qo }, Ho = { tokenize: Jo };
function Uo(e) {
	let t = -1, n = [];
	for (; ++t < e.length;) {
		let r = e[t][1];
		if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
			let e = r.type === "labelImage" ? 4 : 2;
			r.type = "data", t += e;
		}
	}
	return e.length !== n.length && oa(e, 0, e.length, n), e;
}
function Wo(e, t) {
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
	]], s = sa(s, e.slice(a + 1, a + r + 3)), s = sa(s, [[
		"enter",
		u,
		t
	]]), s = sa(s, Ma(t.parser.constructs.insideSpan.null, e.slice(a + r + 4, o - 3), t)), s = sa(s, [
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
	]), s = sa(s, e.slice(o + 1)), s = sa(s, [[
		"exit",
		c,
		t
	]]), oa(e, a, e.length, s), e;
}
function Go(e, t, n) {
	let r = this, i = r.events.length, a, o;
	for (; i--;) if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
		a = r.events[i][1];
		break;
	}
	return s;
	function s(t) {
		return a ? a._inactive ? d(t) : (o = r.parser.defined.includes(pa(r.sliceSerialize({
			start: a.end,
			end: r.now()
		}))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(t), e.exit("labelMarker"), e.exit("labelEnd"), c) : n(t);
	}
	function c(t) {
		return t === 40 ? e.attempt(Bo, u, o ? u : d)(t) : t === 91 ? e.attempt(Vo, u, o ? l : d)(t) : o ? u(t) : d(t);
	}
	function l(t) {
		return e.attempt(Ho, u, d)(t);
	}
	function u(e) {
		return t(e);
	}
	function d(e) {
		return a._balanced = !0, n(e);
	}
}
function Ko(e, t, n) {
	return r;
	function r(t) {
		return e.enter("resource"), e.enter("resourceMarker"), e.consume(t), e.exit("resourceMarker"), i;
	}
	function i(t) {
		return R(t) ? vo(e, a)(t) : a(t);
	}
	function a(t) {
		return t === 41 ? u(t) : ho(e, o, s, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(t);
	}
	function o(t) {
		return R(t) ? vo(e, c)(t) : u(t);
	}
	function s(e) {
		return n(e);
	}
	function c(t) {
		return t === 34 || t === 39 || t === 40 ? _o(e, l, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(t) : u(t);
	}
	function l(t) {
		return R(t) ? vo(e, u)(t) : u(t);
	}
	function u(r) {
		return r === 41 ? (e.enter("resourceMarker"), e.consume(r), e.exit("resourceMarker"), e.exit("resource"), t) : n(r);
	}
}
function qo(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return go.call(r, e, a, o, "reference", "referenceMarker", "referenceString")(t);
	}
	function a(e) {
		return r.parser.defined.includes(pa(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(e) : n(e);
	}
	function o(e) {
		return n(e);
	}
}
function Jo(e, t, n) {
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
var Yo = {
	name: "labelStartImage",
	resolveAll: zo.resolveAll,
	tokenize: Xo
};
function Xo(e, t, n) {
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
var Zo = {
	name: "labelStartLink",
	resolveAll: zo.resolveAll,
	tokenize: Qo
};
function Qo(e, t, n) {
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
var $o = {
	name: "lineEnding",
	tokenize: es
};
function es(e, t) {
	return n;
	function n(n) {
		return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), B(e, t, "linePrefix");
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/thematic-break.js
var ts = {
	name: "thematicBreak",
	tokenize: ns
};
function ns(e, t, n) {
	let r = 0, i;
	return a;
	function a(t) {
		return e.enter("thematicBreak"), o(t);
	}
	function o(e) {
		return i = e, s(e);
	}
	function s(a) {
		return a === i ? (e.enter("thematicBreakSequence"), c(a)) : r >= 3 && (a === null || L(a)) ? (e.exit("thematicBreak"), t(a)) : n(a);
	}
	function c(t) {
		return t === i ? (e.consume(t), r++, c) : (e.exit("thematicBreakSequence"), z(t) ? B(e, s, "whitespace")(t) : s(t));
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/list.js
var rs = {
	continuation: { tokenize: ss },
	exit: ls,
	name: "list",
	tokenize: os
}, is = {
	partial: !0,
	tokenize: us
}, as = {
	partial: !0,
	tokenize: cs
};
function os(e, t, n) {
	let r = this, i = r.events[r.events.length - 1], a = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
	return s;
	function s(t) {
		let i = r.containerState.type || (t === 42 || t === 43 || t === 45 ? "listUnordered" : "listOrdered");
		if (i === "listUnordered" ? !r.containerState.marker || t === r.containerState.marker : va(t)) {
			if (r.containerState.type || (r.containerState.type = i, e.enter(i, { _container: !0 })), i === "listUnordered") return e.enter("listItemPrefix"), t === 42 || t === 45 ? e.check(ts, n, l)(t) : l(t);
			if (!r.interrupt || t === 49) return e.enter("listItemPrefix"), e.enter("listItemValue"), c(t);
		}
		return n(t);
	}
	function c(t) {
		return va(t) && ++o < 10 ? (e.consume(t), c) : (!r.interrupt || o < 2) && (r.containerState.marker ? t === r.containerState.marker : t === 41 || t === 46) ? (e.exit("listItemValue"), l(t)) : n(t);
	}
	function l(t) {
		return e.enter("listItemMarker"), e.consume(t), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || t, e.check(za, r.interrupt ? n : u, e.attempt(is, f, d));
	}
	function u(e) {
		return r.containerState.initialBlankLine = !0, a++, f(e);
	}
	function d(t) {
		return z(t) ? (e.enter("listItemPrefixWhitespace"), e.consume(t), e.exit("listItemPrefixWhitespace"), f) : n(t);
	}
	function f(n) {
		return r.containerState.size = a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(n);
	}
}
function ss(e, t, n) {
	let r = this;
	return r.containerState._closeFlow = void 0, e.check(za, i, a);
	function i(n) {
		return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, B(e, t, "listItemIndent", r.containerState.size + 1)(n);
	}
	function a(n) {
		return r.containerState.furtherBlankLines || !z(n) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(n)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(as, t, o)(n));
	}
	function o(i) {
		return r.containerState._closeFlow = !0, r.interrupt = void 0, B(e, e.attempt(rs, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i);
	}
}
function cs(e, t, n) {
	let r = this;
	return B(e, i, "listItemIndent", r.containerState.size + 1);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? t(e) : n(e);
	}
}
function ls(e) {
	e.exit(this.containerState.type);
}
function us(e, t, n) {
	let r = this;
	return B(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return !z(e) && i && i[1].type === "listItemPrefixWhitespace" ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-core-commonmark/lib/setext-underline.js
var ds = {
	name: "setextUnderline",
	resolveTo: fs,
	tokenize: ps
};
function fs(e, t) {
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
function ps(e, t, n) {
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
		return t === i ? (e.consume(t), s) : (e.exit("setextHeadingLineSequence"), z(t) ? B(e, c, "lineSuffix")(t) : c(t));
	}
	function c(r) {
		return r === null || L(r) ? (e.exit("setextHeadingLine"), t(r)) : n(r);
	}
}
//#endregion
//#region node_modules/micromark/lib/initialize/flow.js
var ms = { tokenize: hs };
function hs(e) {
	let t = this, n = e.attempt(za, r, e.attempt(this.parser.constructs.flowInitial, i, B(e, e.attempt(this.parser.constructs.flow, i, e.attempt(fo, i)), "linePrefix")));
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
var gs = { resolveAll: bs() }, _s = ys("string"), vs = ys("text");
function ys(e) {
	return {
		resolveAll: bs(e === "text" ? xs : void 0),
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
function bs(e) {
	return t;
	function t(t, n) {
		let r = -1, i;
		for (; ++r <= t.length;) i === void 0 ? t[r] && t[r][1].type === "data" && (i = r, r++) : (!t[r] || t[r][1].type !== "data") && (r !== i + 2 && (t[i][1].end = t[r - 1][1].end, t.splice(i + 2, r - i - 2), r = i + 2), i = void 0);
		return e ? e(t, n) : t;
	}
}
function xs(e, t) {
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
var Ss = /* @__PURE__ */ t({
	attentionMarkers: () => As,
	contentInitial: () => ws,
	disable: () => js,
	document: () => Cs,
	flow: () => Es,
	flowInitial: () => Ts,
	insideSpan: () => ks,
	string: () => Ds,
	text: () => Os
}), Cs = {
	42: rs,
	43: rs,
	45: rs,
	48: rs,
	49: rs,
	50: rs,
	51: rs,
	52: rs,
	53: rs,
	54: rs,
	55: rs,
	56: rs,
	57: rs,
	62: Va
}, ws = { 91: yo }, Ts = {
	[-2]: $a,
	[-1]: $a,
	32: $a
}, Es = {
	35: To,
	42: ts,
	45: [ds, ts],
	60: Ao,
	61: ds,
	95: ts,
	96: Xa,
	126: Xa
}, Ds = {
	38: qa,
	92: Ga
}, Os = {
	[-5]: $o,
	[-4]: $o,
	[-3]: $o,
	33: Yo,
	38: qa,
	42: Na,
	60: [La, Lo],
	91: Zo,
	92: [Co, Ga],
	93: zo,
	95: Na,
	96: ro
}, ks = { null: [Na, gs] }, As = { null: [42, 95] }, js = { null: [] };
//#endregion
//#region node_modules/micromark/lib/create-tokenizer.js
function Ms(e, t, n) {
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
		return o = sa(o, e), g(), o[o.length - 1] === null ? (w(t, 0), l.events = Ma(a, l.events, l), l.events) : [];
	}
	function f(e, t) {
		return Ps(p(e), t);
	}
	function p(e) {
		return Ns(o, e);
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
		L(e) ? (r.line++, r.column = 1, r.offset += e === -3 ? 2 : 1, E()) : e !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === o[r._index].length && (r._bufferIndex = -1, r._index++)), l.previous = e;
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
		e.resolveAll && !a.includes(e) && a.push(e), e.resolve && oa(l.events, t, l.events.length - t, e.resolve(l.events.slice(t), l)), e.resolveTo && (l.events = e.resolveTo(l.events, l));
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
function Ns(e, t) {
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
function Ps(e, t) {
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
function Fs(e) {
	let t = {
		constructs: la([Ss, ...(e || {}).extensions || []]),
		content: n(Ta),
		defined: [],
		document: n(Da),
		flow: n(ms),
		lazy: {},
		string: n(_s),
		text: n(vs)
	};
	return t;
	function n(e) {
		return n;
		function n(n) {
			return Ms(t, e, n);
		}
	}
}
//#endregion
//#region node_modules/micromark/lib/postprocess.js
function Is(e) {
	for (; !lo(e););
	return e;
}
//#endregion
//#region node_modules/micromark/lib/preprocess.js
var Ls = /[\0\t\n\r]/g;
function Rs() {
	let e = 1, t = "", n = !0, r;
	return i;
	function i(i, a, o) {
		let s = [], c, l, u, d, f;
		for (i = t + (typeof i == "string" ? i.toString() : new TextDecoder(a || void 0).decode(i)), u = 0, t = "", n &&= (i.charCodeAt(0) === 65279 && u++, void 0); u < i.length;) {
			if (Ls.lastIndex = u, c = Ls.exec(i), d = c && c.index !== void 0 ? c.index : i.length, f = i.charCodeAt(d), !c) {
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
var zs = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Bs(e) {
	return e.replace(zs, Vs);
}
function Vs(e, t, n) {
	if (t) return t;
	if (n.charCodeAt(0) === 35) {
		let e = n.charCodeAt(1), t = e === 120 || e === 88;
		return fa(n.slice(t ? 2 : 1), t ? 16 : 10);
	}
	return aa(n) || e;
}
//#endregion
//#region node_modules/mdast-util-from-markdown/lib/index.js
var Hs = {}.hasOwnProperty;
function Us(e, t, n) {
	return t && typeof t == "object" && (n = t, t = void 0), Ws(n)(Is(Fs(n).document().write(Rs()(e, t, !0))));
}
function Ws(e) {
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
			autolink: a(Ce),
			autolinkProtocol: T,
			autolinkEmail: T,
			atxHeading: a(ye),
			blockQuote: a(me),
			characterEscape: T,
			characterReference: T,
			codeFenced: a(he),
			codeFencedFenceInfo: o,
			codeFencedFenceMeta: o,
			codeIndented: a(he, o),
			codeText: a(ge, o),
			codeTextData: T,
			data: T,
			codeFlowValue: T,
			definition: a(_e),
			definitionDestinationString: o,
			definitionLabelString: o,
			definitionTitleString: o,
			emphasis: a(ve),
			hardBreakEscape: a(be),
			hardBreakTrailing: a(be),
			htmlFlow: a(xe, o),
			htmlFlowData: T,
			htmlText: a(xe, o),
			htmlTextData: T,
			image: a(Se),
			label: o,
			link: a(Ce),
			listItem: a(Te),
			listItemValue: f,
			listOrdered: a(we, d),
			listUnordered: a(we),
			paragraph: a(Ee),
			reference: le,
			referenceString: o,
			resourceDestinationString: o,
			resourceTitleString: o,
			setextHeading: a(ye),
			strong: a(De),
			thematicBreak: a(ke)
		},
		exit: {
			atxHeading: c(),
			atxHeadingSequence: x,
			autolink: c(),
			autolinkEmail: pe,
			autolinkProtocol: fe,
			blockQuote: c(),
			characterEscapeValue: E,
			characterReferenceMarkerHexadecimal: ue,
			characterReferenceMarkerNumeric: ue,
			characterReferenceValue: de,
			characterReference: j,
			codeFenced: c(g),
			codeFencedFence: h,
			codeFencedFenceInfo: p,
			codeFencedFenceMeta: m,
			codeFlowValue: E,
			codeIndented: c(_),
			codeText: c(re),
			codeTextData: E,
			data: E,
			definition: c(),
			definitionDestinationString: b,
			definitionLabelString: v,
			definitionTitleString: y,
			emphasis: c(),
			hardBreakEscape: c(D),
			hardBreakTrailing: c(D),
			htmlFlow: c(te),
			htmlFlowData: E,
			htmlText: c(ne),
			htmlTextData: E,
			image: c(O),
			label: ae,
			labelText: k,
			lineEnding: ee,
			link: c(ie),
			listItem: c(),
			listOrdered: c(),
			listUnordered: c(),
			paragraph: c(),
			referenceString: A,
			resourceDestinationString: oe,
			resourceTitleString: se,
			resource: ce,
			setextHeading: c(w),
			setextHeadingLineSequence: C,
			setextHeadingText: S,
			strong: c(),
			thematicBreak: c()
		}
	};
	Ks(t, (e || {}).mdastExtensions || []);
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
			Hs.call(n, e[d][1].type) && n[e[d][1].type].call(Object.assign({ sliceSerialize: e[d][2].sliceSerialize }, a), e[d][1]);
		}
		if (a.tokenStack.length > 0) {
			let e = a.tokenStack[a.tokenStack.length - 1];
			(e[1] || Js).call(a, void 0, e[0]);
		}
		for (r.position = {
			start: Gs(e.length > 0 ? e[0][1].start : {
				line: 1,
				column: 1,
				offset: 0
			}),
			end: Gs(e.length > 0 ? e[e.length - 2][1].end : {
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
			start: Gs(t.start),
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
		if (r) r[0].type !== e.type && (t ? t.call(this, e, r[0]) : (r[1] || Js).call(this, e, r[0]));
		else throw Error("Cannot close `" + e.type + "` (" + vi({
			start: e.start,
			end: e.end
		}) + "): it’s not open");
		n.position.end = Gs(e.end);
	}
	function u() {
		return ea(this.stack.pop());
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
		n.label = t, n.identifier = pa(this.sliceSerialize(e)).toLowerCase();
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
		(!n || n.type !== "text") && (n = Oe(), n.position = {
			start: Gs(e.start),
			end: void 0
		}, t.push(n)), this.stack.push(n);
	}
	function E(e) {
		let t = this.stack.pop();
		t.value += this.sliceSerialize(e), t.position.end = Gs(e.end);
	}
	function ee(e) {
		let n = this.stack[this.stack.length - 1];
		if (this.data.atHardBreak) {
			let t = n.children[n.children.length - 1];
			t.position.end = Gs(e.end), this.data.atHardBreak = void 0;
			return;
		}
		!this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(n.type) && (T.call(this, e), E.call(this, e));
	}
	function D() {
		this.data.atHardBreak = !0;
	}
	function te() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function ne() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function re() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.value = e;
	}
	function ie() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function O() {
		let e = this.stack[this.stack.length - 1];
		if (this.data.inReference) {
			let t = this.data.referenceType || "shortcut";
			e.type += "Reference", e.referenceType = t, delete e.url, delete e.title;
		} else delete e.identifier, delete e.label;
		this.data.referenceType = void 0;
	}
	function k(e) {
		let t = this.sliceSerialize(e), n = this.stack[this.stack.length - 2];
		n.label = Bs(t), n.identifier = pa(t).toLowerCase();
	}
	function ae() {
		let e = this.stack[this.stack.length - 1], t = this.resume(), n = this.stack[this.stack.length - 1];
		this.data.inReference = !0, n.type === "link" ? n.children = e.children : n.alt = t;
	}
	function oe() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.url = e;
	}
	function se() {
		let e = this.resume(), t = this.stack[this.stack.length - 1];
		t.title = e;
	}
	function ce() {
		this.data.inReference = void 0;
	}
	function le() {
		this.data.referenceType = "collapsed";
	}
	function A(e) {
		let t = this.resume(), n = this.stack[this.stack.length - 1];
		n.label = t, n.identifier = pa(this.sliceSerialize(e)).toLowerCase(), this.data.referenceType = "full";
	}
	function ue(e) {
		this.data.characterReferenceType = e.type;
	}
	function de(e) {
		let t = this.sliceSerialize(e), n = this.data.characterReferenceType, r;
		n ? (r = fa(t, n === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : r = aa(t);
		let i = this.stack[this.stack.length - 1];
		i.value += r;
	}
	function j(e) {
		let t = this.stack.pop();
		t.position.end = Gs(e.end);
	}
	function fe(e) {
		E.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = this.sliceSerialize(e);
	}
	function pe(e) {
		E.call(this, e);
		let t = this.stack[this.stack.length - 1];
		t.url = "mailto:" + this.sliceSerialize(e);
	}
	function me() {
		return {
			type: "blockquote",
			children: []
		};
	}
	function he() {
		return {
			type: "code",
			lang: null,
			meta: null,
			value: ""
		};
	}
	function ge() {
		return {
			type: "inlineCode",
			value: ""
		};
	}
	function _e() {
		return {
			type: "definition",
			identifier: "",
			label: null,
			title: null,
			url: ""
		};
	}
	function ve() {
		return {
			type: "emphasis",
			children: []
		};
	}
	function ye() {
		return {
			type: "heading",
			depth: 0,
			children: []
		};
	}
	function be() {
		return { type: "break" };
	}
	function xe() {
		return {
			type: "html",
			value: ""
		};
	}
	function Se() {
		return {
			type: "image",
			title: null,
			url: "",
			alt: null
		};
	}
	function Ce() {
		return {
			type: "link",
			title: null,
			url: "",
			children: []
		};
	}
	function we(e) {
		return {
			type: "list",
			ordered: e.type === "listOrdered",
			start: null,
			spread: e._spread,
			children: []
		};
	}
	function Te(e) {
		return {
			type: "listItem",
			spread: e._spread,
			checked: null,
			children: []
		};
	}
	function Ee() {
		return {
			type: "paragraph",
			children: []
		};
	}
	function De() {
		return {
			type: "strong",
			children: []
		};
	}
	function Oe() {
		return {
			type: "text",
			value: ""
		};
	}
	function ke() {
		return { type: "thematicBreak" };
	}
}
function Gs(e) {
	return {
		line: e.line,
		column: e.column,
		offset: e.offset
	};
}
function Ks(e, t) {
	let n = -1;
	for (; ++n < t.length;) {
		let r = t[n];
		Array.isArray(r) ? Ks(e, r) : qs(e, r);
	}
}
function qs(e, t) {
	let n;
	for (n in t) if (Hs.call(t, n)) switch (n) {
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
function Js(e, t) {
	throw Error(e ? "Cannot close `" + e.type + "` (" + vi({
		start: e.start,
		end: e.end
	}) + "): a different token (`" + t.type + "`, " + vi({
		start: t.start,
		end: t.end
	}) + ") is open" : "Cannot close document, a token (`" + t.type + "`, " + vi({
		start: t.start,
		end: t.end
	}) + ") is still open");
}
//#endregion
//#region node_modules/remark-parse/lib/index.js
function Ys(e) {
	let t = this;
	t.parser = n;
	function n(n) {
		return Us(n, {
			...t.data("settings"),
			...e,
			extensions: t.data("micromarkExtensions") || [],
			mdastExtensions: t.data("fromMarkdownExtensions") || []
		});
	}
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
function Xs(e, t) {
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
function Zs(e, t) {
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
function Qs(e, t) {
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
function $s(e, t) {
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
function ec(e, t) {
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
function tc(e, t) {
	let n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = wa(r.toLowerCase()), a = e.footnoteOrder.indexOf(r), o, s = e.footnoteCounts.get(r);
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
function nc(e, t) {
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
function rc(e, t) {
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
function ic(e, t) {
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
function ac(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return ic(e, t);
	let i = {
		src: wa(r.url || ""),
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
function oc(e, t) {
	let n = { src: wa(t.url) };
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
function sc(e, t) {
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
function cc(e, t) {
	let n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
	if (!r) return ic(e, t);
	let i = { href: wa(r.url || "") };
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
function lc(e, t) {
	let n = { href: wa(t.url) };
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
function uc(e, t, n) {
	let r = e.all(t), i = n ? dc(n) : fc(t), a = {}, o = [];
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
function dc(e) {
	let t = !1;
	if (e.type === "list") {
		t = e.spread || !1;
		let n = e.children, r = -1;
		for (; !t && ++r < n.length;) t = fc(n[r]);
	}
	return t;
}
function fc(e) {
	return e.spread ?? e.children.length > 1;
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/list.js
function pc(e, t) {
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
function mc(e, t) {
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
function hc(e, t) {
	let n = {
		type: "root",
		children: e.wrap(e.all(t))
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/strong.js
function gc(e, t) {
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
function _c(e, t) {
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
		}, a = hi(t.children[1]), o = mi(t.children[t.children.length - 1]);
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
function vc(e, t, n) {
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
function yc(e, t) {
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
var bc = 9, xc = 32;
function Sc(e) {
	let t = String(e), n = /\r?\n|\r/g, r = n.exec(t), i = 0, a = [];
	for (; r;) a.push(Cc(t.slice(i, r.index), i > 0, !0), r[0]), i = r.index + r[0].length, r = n.exec(t);
	return a.push(Cc(t.slice(i), i > 0, !1)), a.join("");
}
function Cc(e, t, n) {
	let r = 0, i = e.length;
	if (t) {
		let t = e.codePointAt(r);
		for (; t === bc || t === xc;) r++, t = e.codePointAt(r);
	}
	if (n) {
		let t = e.codePointAt(i - 1);
		for (; t === bc || t === xc;) i--, t = e.codePointAt(i - 1);
	}
	return i > r ? e.slice(r, i) : "";
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/text.js
function wc(e, t) {
	let n = {
		type: "text",
		value: Sc(String(t.value))
	};
	return e.patch(t, n), e.applyData(t, n);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
function Tc(e, t) {
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
var Ec = {
	blockquote: Xs,
	break: Zs,
	code: Qs,
	delete: $s,
	emphasis: ec,
	footnoteReference: tc,
	heading: nc,
	html: rc,
	imageReference: ac,
	image: oc,
	inlineCode: sc,
	linkReference: cc,
	link: lc,
	listItem: uc,
	list: pc,
	paragraph: mc,
	root: hc,
	strong: gc,
	table: _c,
	tableCell: yc,
	tableRow: vc,
	text: wc,
	thematicBreak: Tc,
	toml: Dc,
	yaml: Dc,
	definition: Dc,
	footnoteDefinition: Dc
};
function Dc() {}
//#endregion
//#region node_modules/@ungap/structured-clone/esm/deserialize.js
var Oc = typeof self == "object" ? self : globalThis, kc = (e, t) => {
	switch (e) {
		case "Function":
		case "SharedWorker":
		case "Worker":
		case "eval":
		case "setInterval":
		case "setTimeout": throw TypeError("unable to deserialize " + e);
	}
	return new Oc[e](t);
}, Ac = (e, t) => {
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
				return n(typeof Oc[e] == "function" ? kc(e, t) : Error(t), i);
			}
			case 8: return n(BigInt(o), i);
			case "BigInt": return n(Object(BigInt(o)), i);
			case "ArrayBuffer": return n(new Uint8Array(o).buffer, o);
			case "DataView": {
				let { buffer: e } = new Uint8Array(o);
				return n(new DataView(e), o);
			}
		}
		return n(kc(a, o), i);
	};
	return r;
}, jc = (e) => Ac(/* @__PURE__ */ new Map(), e)(0), Mc = "", { toString: Nc } = {}, { keys: Pc } = Object, Fc = (e) => {
	let t = typeof e;
	if (t !== "object" || !e) return [0, t];
	let n = Nc.call(e).slice(8, -1);
	switch (n) {
		case "Array": return [1, Mc];
		case "Object": return [2, Mc];
		case "Date": return [3, Mc];
		case "RegExp": return [4, Mc];
		case "Map": return [5, Mc];
		case "Set": return [6, Mc];
		case "DataView": return [1, n];
	}
	return n.includes("Array") ? [1, n] : e instanceof Error ? [7, e.name || "Error"] : [2, n];
}, Ic = ([e, t]) => e === 0 && (t === "function" || t === "symbol"), Lc = (e, t, n, r) => {
	let i = (e, t) => {
		let i = r.push(e) - 1;
		return n.set(t, i), i;
	}, a = (r) => {
		if (n.has(r)) return n.get(r);
		let [o, s] = Fc(r);
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
				for (let t of Pc(r)) (e || !Ic(Fc(r[t]))) && n.push([a(t), a(r[t])]);
				return c;
			}
			case 3: return i([o, isNaN(r.getTime()) ? Mc : r.toISOString()], r);
			case 4: {
				let { source: e, flags: t } = r;
				return i([o, {
					source: e,
					flags: t
				}], r);
			}
			case 5: {
				let t = [], n = i([o, t], r);
				for (let [n, i] of r) (e || !(Ic(Fc(n)) || Ic(Fc(i)))) && t.push([a(n), a(i)]);
				return n;
			}
			case 6: {
				let t = [], n = i([o, t], r);
				for (let n of r) (e || !Ic(Fc(n))) && t.push(a(n));
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
}, Rc = (e, { json: t, lossy: n } = {}) => {
	let r = [];
	return Lc(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, U = typeof structuredClone == "function" ? (e, t) => t && ("json" in t || "lossy" in t) ? jc(Rc(e, t)) : structuredClone(e) : (e, t) => jc(Rc(e, t));
//#endregion
//#region node_modules/mdast-util-to-hast/lib/footer.js
function zc(e, t) {
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
function Bc(e, t) {
	return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function Vc(e) {
	let t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || zc, r = e.options.footnoteBackLabel || Bc, i = e.options.footnoteLabel || "Footnotes", a = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || { className: ["sr-only"] }, s = [], c = -1;
	for (; ++c < e.footnoteOrder.length;) {
		let i = e.footnoteById.get(e.footnoteOrder[c]);
		if (!i) continue;
		let a = e.all(i), o = String(i.identifier).toUpperCase(), l = wa(o.toLowerCase()), u = 0, d = [], f = e.footnoteCounts.get(o);
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
					...U(o),
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
var Hc = (function(e) {
	if (e == null) return qc;
	if (typeof e == "function") return Kc(e);
	if (typeof e == "object") return Array.isArray(e) ? Uc(e) : Wc(e);
	if (typeof e == "string") return Gc(e);
	throw Error("Expected function, string, or object as test");
});
function Uc(e) {
	let t = [], n = -1;
	for (; ++n < e.length;) t[n] = Hc(e[n]);
	return Kc(r);
	function r(...e) {
		let n = -1;
		for (; ++n < t.length;) if (t[n].apply(this, e)) return !0;
		return !1;
	}
}
function Wc(e) {
	let t = e;
	return Kc(n);
	function n(n) {
		let r = n, i;
		for (i in e) if (r[i] !== t[i]) return !1;
		return !0;
	}
}
function Gc(e) {
	return Kc(t);
	function t(t) {
		return t && t.type === e;
	}
}
function Kc(e) {
	return t;
	function t(t, n, r) {
		return !!(Jc(t) && e.call(this, t, typeof n == "number" ? n : void 0, r || void 0));
	}
}
function qc() {
	return !0;
}
function Jc(e) {
	return typeof e == "object" && !!e && "type" in e;
}
//#endregion
//#region node_modules/unist-util-visit-parents/lib/color.js
function Yc(e) {
	return e;
}
//#endregion
//#region node_modules/unist-util-visit-parents/lib/index.js
var Xc = [];
function Zc(e, t, n, r) {
	let i;
	typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
	let a = Hc(i), o = r ? -1 : 1;
	s(e, void 0, [])();
	function s(e, i, c) {
		let l = e && typeof e == "object" ? e : {};
		if (typeof l.type == "string") {
			let t = typeof l.tagName == "string" ? l.tagName : typeof l.name == "string" ? l.name : void 0;
			Object.defineProperty(u, "name", { value: "node (" + Yc(e.type + (t ? "<" + t + ">" : "")) + ")" });
		}
		return u;
		function u() {
			let l = Xc, u, d, f;
			if ((!t || a(e, i, c[c.length - 1] || void 0)) && (l = Qc(n(e, c)), l[0] === !1)) return l;
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
function Qc(e) {
	return Array.isArray(e) ? e : typeof e == "number" ? [!0, e] : e == null ? Xc : [e];
}
//#endregion
//#region node_modules/unist-util-visit/lib/index.js
function $c(e, t, n, r) {
	let i, a, o;
	typeof t == "function" && typeof n != "function" ? (a = void 0, o = t, i = n) : (a = t, o = n, i = r), Zc(e, a, s, i);
	function s(e, t) {
		let n = t[t.length - 1], r = n ? n.children.indexOf(e) : void 0;
		return o(e, r, n);
	}
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/state.js
var el = {}.hasOwnProperty, tl = {};
function nl(e, t) {
	let n = t || tl, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = {
		all: s,
		applyData: il,
		definitionById: r,
		footnoteById: i,
		footnoteCounts: /* @__PURE__ */ new Map(),
		footnoteOrder: [],
		handlers: {
			...Ec,
			...n.handlers
		},
		one: o,
		options: n,
		patch: rl,
		wrap: ol
	};
	return $c(e, function(e) {
		if (e.type === "definition" || e.type === "footnoteDefinition") {
			let t = e.type === "definition" ? r : i, n = String(e.identifier).toUpperCase();
			t.has(n) || t.set(n, e);
		}
	}), a;
	function o(e, t) {
		let n = e.type, r = a.handlers[n];
		if (el.call(a.handlers, n) && r) return r(a, e, t);
		if (a.options.passThrough && a.options.passThrough.includes(n)) {
			if ("children" in e) {
				let { children: t, ...n } = e, r = U(n);
				return r.children = a.all(e), r;
			}
			return U(e);
		}
		return (a.options.unknownHandler || al)(a, e, t);
	}
	function s(e) {
		let t = [];
		if ("children" in e) {
			let n = e.children, r = -1;
			for (; ++r < n.length;) {
				let i = a.one(n[r], e);
				if (i) {
					if (r && n[r - 1].type === "break" && (!Array.isArray(i) && i.type === "text" && (i.value = sl(i.value)), !Array.isArray(i) && i.type === "element")) {
						let e = i.children[0];
						e && e.type === "text" && (e.value = sl(e.value));
					}
					Array.isArray(i) ? t.push(...i) : t.push(i);
				}
			}
		}
		return t;
	}
}
function rl(e, t) {
	e.position && (t.position = _i(e));
}
function il(e, t) {
	let n = t;
	if (e && e.data) {
		let t = e.data.hName, r = e.data.hChildren, i = e.data.hProperties;
		typeof t == "string" && (n.type === "element" ? n.tagName = t : n = {
			type: "element",
			tagName: t,
			properties: {},
			children: "children" in n ? n.children : [n]
		}), n.type === "element" && i && Object.assign(n.properties, U(i)), "children" in n && n.children && r != null && (n.children = r);
	}
	return n;
}
function al(e, t) {
	let n = t.data || {}, r = "value" in t && !(el.call(n, "hProperties") || el.call(n, "hChildren")) ? {
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
function ol(e, t) {
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
function sl(e) {
	let t = 0, n = e.charCodeAt(t);
	for (; n === 9 || n === 32;) t++, n = e.charCodeAt(t);
	return e.slice(t);
}
//#endregion
//#region node_modules/mdast-util-to-hast/lib/index.js
function cl(e, t) {
	let n = nl(e, t), r = n.one(e, void 0), i = Vc(n), a = Array.isArray(r) ? {
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
function ll(e, t) {
	return e && "run" in e ? async function(n, r) {
		let i = cl(n, {
			file: r,
			...t
		});
		await e.run(i, r);
	} : function(n, r) {
		return cl(n, {
			file: r,
			...e || t
		});
	};
}
//#endregion
//#region node_modules/bail/index.js
function ul(e) {
	if (e) throw e;
}
//#endregion
//#region node_modules/extend/index.js
var dl = /* @__PURE__ */ n(((e, t) => {
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
function fl(e) {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
//#endregion
//#region node_modules/trough/lib/index.js
function pl() {
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
			t = o, s ? ml(s, i)(...o) : r(null, ...o);
		}
	}
	function r(n) {
		if (typeof n != "function") throw TypeError("Expected `middelware` to be a function, not " + n);
		return e.push(n), t;
	}
}
function ml(e, t) {
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
var hl = {
	basename: gl,
	dirname: _l,
	extname: vl,
	join: yl,
	sep: "/"
};
function gl(e, t) {
	if (t !== void 0 && typeof t != "string") throw TypeError("\"ext\" argument must be a string");
	Sl(e);
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
function _l(e) {
	if (Sl(e), e.length === 0) return ".";
	let t = -1, n = e.length, r;
	for (; --n;) if (e.codePointAt(n) === 47) {
		if (r) {
			t = n;
			break;
		}
	} else r ||= !0;
	return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function vl(e) {
	Sl(e);
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
function yl(...e) {
	let t = -1, n;
	for (; ++t < e.length;) Sl(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
	return n === void 0 ? "." : bl(n);
}
function bl(e) {
	Sl(e);
	let t = e.codePointAt(0) === 47, n = xl(e, !t);
	return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function xl(e, t) {
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
function Sl(e) {
	if (typeof e != "string") throw TypeError("Path must be a string. Received " + JSON.stringify(e));
}
//#endregion
//#region node_modules/vfile/lib/minproc.browser.js
var Cl = { cwd: wl };
function wl() {
	return "/";
}
//#endregion
//#region node_modules/vfile/lib/minurl.shared.js
function Tl(e) {
	return !!(typeof e == "object" && e && "href" in e && e.href && "protocol" in e && e.protocol && e.auth === void 0);
}
//#endregion
//#region node_modules/vfile/lib/minurl.browser.js
function El(e) {
	if (typeof e == "string") e = new URL(e);
	else if (!Tl(e)) {
		let t = /* @__PURE__ */ TypeError("The \"path\" argument must be of type string or an instance of URL. Received `" + e + "`");
		throw t.code = "ERR_INVALID_ARG_TYPE", t;
	}
	if (e.protocol !== "file:") {
		let e = /* @__PURE__ */ TypeError("The URL must be of scheme file");
		throw e.code = "ERR_INVALID_URL_SCHEME", e;
	}
	return Dl(e);
}
function Dl(e) {
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
var Ol = [
	"history",
	"path",
	"basename",
	"stem",
	"extname",
	"dirname"
], kl = class {
	constructor(e) {
		let t;
		t = e ? Tl(e) ? { path: e } : typeof e == "string" || Nl(e) ? { value: e } : e : {}, this.cwd = "cwd" in t ? "" : Cl.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
		let n = -1;
		for (; ++n < Ol.length;) {
			let e = Ol[n];
			e in t && t[e] !== void 0 && t[e] !== null && (this[e] = e === "history" ? [...t[e]] : t[e]);
		}
		let r;
		for (r in t) Ol.includes(r) || (this[r] = t[r]);
	}
	get basename() {
		return typeof this.path == "string" ? hl.basename(this.path) : void 0;
	}
	set basename(e) {
		jl(e, "basename"), Al(e, "basename"), this.path = hl.join(this.dirname || "", e);
	}
	get dirname() {
		return typeof this.path == "string" ? hl.dirname(this.path) : void 0;
	}
	set dirname(e) {
		Ml(this.basename, "dirname"), this.path = hl.join(e || "", this.basename);
	}
	get extname() {
		return typeof this.path == "string" ? hl.extname(this.path) : void 0;
	}
	set extname(e) {
		if (Al(e, "extname"), Ml(this.dirname, "extname"), e) {
			if (e.codePointAt(0) !== 46) throw Error("`extname` must start with `.`");
			if (e.includes(".", 1)) throw Error("`extname` cannot contain multiple dots");
		}
		this.path = hl.join(this.dirname, this.stem + (e || ""));
	}
	get path() {
		return this.history[this.history.length - 1];
	}
	set path(e) {
		Tl(e) && (e = El(e)), jl(e, "path"), this.path !== e && this.history.push(e);
	}
	get stem() {
		return typeof this.path == "string" ? hl.basename(this.path, this.extname) : void 0;
	}
	set stem(e) {
		jl(e, "stem"), Al(e, "stem"), this.path = hl.join(this.dirname || "", e + (this.extname || ""));
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
		let r = new Si(e, t, n);
		return this.path && (r.name = this.path + ":" + r.name, r.file = this.path), r.fatal = !1, this.messages.push(r), r;
	}
	toString(e) {
		return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(e || void 0).decode(this.value);
	}
};
function Al(e, t) {
	if (e && e.includes(hl.sep)) throw Error("`" + t + "` cannot be a path: did not expect `" + hl.sep + "`");
}
function jl(e, t) {
	if (!e) throw Error("`" + t + "` cannot be empty");
}
function Ml(e, t) {
	if (!e) throw Error("Setting `" + t + "` requires `path` to be set too");
}
function Nl(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
//#endregion
//#region node_modules/unified/lib/callable-instance.js
var Pl = (function(e) {
	let t = this.constructor.prototype, n = t[e], r = function() {
		return n.apply(r, arguments);
	};
	return Object.setPrototypeOf(r, t), r;
}), Fl = /* @__PURE__ */ e(dl(), 1), Il = {}.hasOwnProperty, Ll = new class e extends Pl {
	constructor() {
		super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = pl();
	}
	copy() {
		let t = new e(), n = -1;
		for (; ++n < this.attachers.length;) {
			let e = this.attachers[n];
			t.use(...e);
		}
		return t.data((0, Fl.default)(!0, {}, this.namespace)), t;
	}
	data(e, t) {
		return typeof e == "string" ? arguments.length === 2 ? (Bl("data", this.frozen), this.namespace[e] = t, this) : Il.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (Bl("data", this.frozen), this.namespace = e, this) : this.namespace;
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
		let t = K(e), n = this.parser || this.Parser;
		return Rl("parse", n), n(String(t), t);
	}
	process(e, t) {
		let n = this;
		return this.freeze(), Rl("process", this.parser || this.Parser), zl("process", this.compiler || this.Compiler), t ? r(void 0, t) : new Promise(r);
		function r(r, i) {
			let a = K(e), o = n.parse(a);
			n.run(o, a, function(e, t, r) {
				if (e || !t || !r) return s(e);
				let i = t, a = n.stringify(i, r);
				J(a) ? r.value = a : r.result = a, s(e, r);
			});
			function s(e, n) {
				e || !n ? i(e) : r ? r(n) : t(void 0, n);
			}
		}
	}
	processSync(e) {
		let t = !1, n;
		return this.freeze(), Rl("processSync", this.parser || this.Parser), zl("processSync", this.compiler || this.Compiler), this.process(e, r), G("processSync", "process", t), n;
		function r(e, r) {
			t = !0, ul(e), n = r;
		}
	}
	run(e, t, n) {
		W(e), this.freeze();
		let r = this.transformers;
		return !n && typeof t == "function" && (n = t, t = void 0), n ? i(void 0, n) : new Promise(i);
		function i(i, a) {
			let o = K(t);
			r.run(e, o, s);
			function s(t, r, o) {
				let s = r || e;
				t ? a(t) : i ? i(s) : n(void 0, s, o);
			}
		}
	}
	runSync(e, t) {
		let n = !1, r;
		return this.run(e, t, i), G("runSync", "run", n), r;
		function i(e, t) {
			ul(e), r = t, n = !0;
		}
	}
	stringify(e, t) {
		this.freeze();
		let n = K(t), r = this.compiler || this.Compiler;
		return zl("stringify", r), W(e), r(e, n);
	}
	use(e, ...t) {
		let n = this.attachers, r = this.namespace;
		if (Bl("use", this.frozen), e != null) if (typeof e == "function") s(e, t);
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
			o(e.plugins), e.settings && (r.settings = (0, Fl.default)(!0, r.settings, e.settings));
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
				fl(o) && fl(r) && (r = (0, Fl.default)(!0, o, r)), n[i] = [
					e,
					r,
					...a
				];
			}
		}
	}
}().freeze();
function Rl(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `parser`");
}
function zl(e, t) {
	if (typeof t != "function") throw TypeError("Cannot `" + e + "` without `compiler`");
}
function Bl(e, t) {
	if (t) throw Error("Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function W(e) {
	if (!fl(e) || typeof e.type != "string") throw TypeError("Expected node, got `" + e + "`");
}
function G(e, t, n) {
	if (!n) throw Error("`" + e + "` finished async. Use `" + t + "` instead");
}
function K(e) {
	return q(e) ? e : new kl(e);
}
function q(e) {
	return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function J(e) {
	return typeof e == "string" || Vl(e);
}
function Vl(e) {
	return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
//#endregion
//#region node_modules/react-markdown/lib/index.js
var Y = Qi(), Hl = [], Ul = { allowDangerousHtml: !0 }, Wl = /^(https?|ircs?|mailto|xmpp)$/i, Gl = [
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
function Kl(e) {
	let t = ql(e), n = Jl(e);
	return Yl(t.runSync(t.parse(n), n), e);
}
function ql(e) {
	let t = e.rehypePlugins || Hl, n = e.remarkPlugins || Hl, r = e.remarkRehypeOptions ? {
		...e.remarkRehypeOptions,
		...Ul
	} : Ul;
	return Ll().use(Ys).use(n).use(ll, r).use(t);
}
function Jl(e) {
	let t = e.children || "", n = new kl();
	return typeof t == "string" ? n.value = t : "" + t, n;
}
function Yl(e, t) {
	let n = t.allowedElements, r = t.allowElement, i = t.components, a = t.disallowedElements, o = t.skipHtml, s = t.unwrapDisallowed, c = t.urlTransform || Xl;
	for (let e of Gl) Object.hasOwn(t, e.from) && "" + e.from + (e.to ? "use `" + e.to + "` instead" : "remove it") + e.id;
	return $c(e, l), ki(e, {
		Fragment: Y.Fragment,
		components: i,
		ignoreInvalidStyle: !0,
		jsx: Y.jsx,
		jsxs: Y.jsxs,
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
			for (t in Xi) if (Object.hasOwn(Xi, t) && Object.hasOwn(e.properties, t)) {
				let n = e.properties[t], r = Xi[t];
				(r === null || r.includes(e.tagName)) && (e.properties[t] = c(String(n || ""), t, e));
			}
		}
		if (e.type === "element") {
			let o = n ? !n.includes(e.tagName) : a ? a.includes(e.tagName) : !1;
			if (!o && r && typeof t == "number" && (o = !r(e, t, i)), o && i && typeof t == "number") return s && e.children ? i.children.splice(t, 1, ...e.children) : i.children.splice(t, 1), t;
		}
	}
}
function Xl(e) {
	let t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
	return t === -1 || i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || Wl.test(e.slice(0, t)) ? e : "";
}
//#endregion
//#region node_modules/ccount/index.js
function Zl(e, t) {
	let n = String(e);
	if (typeof t != "string") throw TypeError("Expected character");
	let r = 0, i = n.indexOf(t);
	for (; i !== -1;) r++, i = n.indexOf(t, i + t.length);
	return r;
}
//#endregion
//#region node_modules/escape-string-regexp/index.js
function Ql(e) {
	if (typeof e != "string") throw TypeError("Expected a string");
	return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
//#endregion
//#region node_modules/mdast-util-find-and-replace/lib/index.js
function $l(e, t, n) {
	let r = Hc((n || {}).ignore || []), i = eu(t), a = -1;
	for (; ++a < i.length;) Zc(e, "text", o);
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
function eu(e) {
	let t = [];
	if (!Array.isArray(e)) throw TypeError("Expected find and replace tuple or list of tuples");
	let n = !e[0] || Array.isArray(e[0]) ? e : [e], r = -1;
	for (; ++r < n.length;) {
		let e = n[r];
		t.push([tu(e[0]), nu(e[1])]);
	}
	return t;
}
function tu(e) {
	return typeof e == "string" ? new RegExp(Ql(e), "g") : e;
}
function nu(e) {
	return typeof e == "function" ? e : function() {
		return e;
	};
}
//#endregion
//#region node_modules/mdast-util-gfm-autolink-literal/lib/index.js
var ru = "phrasing", iu = [
	"autolink",
	"link",
	"image",
	"label"
];
function au() {
	return {
		transforms: [pu],
		enter: {
			literalAutolink: su,
			literalAutolinkEmail: cu,
			literalAutolinkHttp: cu,
			literalAutolinkWww: cu
		},
		exit: {
			literalAutolink: fu,
			literalAutolinkEmail: du,
			literalAutolinkHttp: lu,
			literalAutolinkWww: uu
		}
	};
}
function ou() {
	return { unsafe: [
		{
			character: "@",
			before: "[+\\-.\\w]",
			after: "[\\-.\\w]",
			inConstruct: ru,
			notInConstruct: iu
		},
		{
			character: ".",
			before: "[Ww]",
			after: "[\\-.\\w]",
			inConstruct: ru,
			notInConstruct: iu
		},
		{
			character: ":",
			before: "[ps]",
			after: "\\/",
			inConstruct: ru,
			notInConstruct: iu
		}
	] };
}
function su(e) {
	this.enter({
		type: "link",
		title: null,
		url: "",
		children: []
	}, e);
}
function cu(e) {
	this.config.enter.autolinkProtocol.call(this, e);
}
function lu(e) {
	this.config.exit.autolinkProtocol.call(this, e);
}
function uu(e) {
	this.config.exit.data.call(this, e);
	let t = this.stack[this.stack.length - 1];
	t.type, t.url = "http://" + this.sliceSerialize(e);
}
function du(e) {
	this.config.exit.autolinkEmail.call(this, e);
}
function fu(e) {
	this.exit(e);
}
function pu(e) {
	$l(e, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, mu], [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, hu]], { ignore: ["link", "linkReference"] });
}
function mu(e, t, n, r, i) {
	let a = "";
	if (!vu(i) || (/^w/i.test(t) && (n = t + n, t = "", a = "http://"), !gu(n))) return !1;
	let o = _u(n + r);
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
function hu(e, t, n, r) {
	return !vu(r, !0) || /[-\d_]$/.test(n) ? !1 : {
		type: "link",
		title: null,
		url: "mailto:" + t + "@" + n,
		children: [{
			type: "text",
			value: t + "@" + n
		}]
	};
}
function gu(e) {
	let t = e.split(".");
	return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
}
function _u(e) {
	let t = /[!"&'),.:;<>?\]}]+$/.exec(e);
	if (!t) return [e, void 0];
	e = e.slice(0, t.index);
	let n = t[0], r = n.indexOf(")"), i = Zl(e, "("), a = Zl(e, ")");
	for (; r !== -1 && i > a;) e += n.slice(0, r + 1), n = n.slice(r + 1), r = n.indexOf(")"), a++;
	return [e, n];
}
function vu(e, t) {
	let n = e.input.charCodeAt(e.index - 1);
	return (e.index === 0 || Sa(n) || xa(n)) && (!t || n !== 47);
}
//#endregion
//#region node_modules/mdast-util-gfm-footnote/lib/index.js
Ou.peek = Du;
function yu() {
	this.buffer();
}
function bu(e) {
	this.enter({
		type: "footnoteReference",
		identifier: "",
		label: ""
	}, e);
}
function xu() {
	this.buffer();
}
function Su(e) {
	this.enter({
		type: "footnoteDefinition",
		identifier: "",
		label: "",
		children: []
	}, e);
}
function Cu(e) {
	let t = this.resume(), n = this.stack[this.stack.length - 1];
	n.type, n.identifier = pa(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function wu(e) {
	this.exit(e);
}
function Tu(e) {
	let t = this.resume(), n = this.stack[this.stack.length - 1];
	n.type, n.identifier = pa(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function Eu(e) {
	this.exit(e);
}
function Du() {
	return "[";
}
function Ou(e, t, n, r) {
	let i = n.createTracker(r), a = i.move("[^"), o = n.enter("footnoteReference"), s = n.enter("reference");
	return a += i.move(n.safe(n.associationId(e), {
		after: "]",
		before: a
	})), s(), o(), a += i.move("]"), a;
}
function ku() {
	return {
		enter: {
			gfmFootnoteCallString: yu,
			gfmFootnoteCall: bu,
			gfmFootnoteDefinitionLabelString: xu,
			gfmFootnoteDefinition: Su
		},
		exit: {
			gfmFootnoteCallString: Cu,
			gfmFootnoteCall: wu,
			gfmFootnoteDefinitionLabelString: Tu,
			gfmFootnoteDefinition: Eu
		}
	};
}
function Au(e) {
	let t = !1;
	return e && e.firstLineBlank && (t = !0), {
		handlers: {
			footnoteDefinition: n,
			footnoteReference: Ou
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
		})), c(), o += a.move("]:"), e.children && e.children.length > 0 && (a.shift(4), o += a.move((t ? "\n" : " ") + r.indentLines(r.containerFlow(e, a.current()), t ? Mu : ju))), s(), o;
	}
}
function ju(e, t, n) {
	return t === 0 ? e : Mu(e, t, n);
}
function Mu(e, t, n) {
	return (n ? "" : "    ") + e;
}
//#endregion
//#region node_modules/mdast-util-gfm-strikethrough/lib/index.js
var Nu = [
	"autolink",
	"destinationLiteral",
	"destinationRaw",
	"reference",
	"titleQuote",
	"titleApostrophe"
];
Ru.peek = zu;
function Pu() {
	return {
		canContainEols: ["delete"],
		enter: { strikethrough: Iu },
		exit: { strikethrough: Lu }
	};
}
function Fu() {
	return {
		unsafe: [{
			character: "~",
			inConstruct: "phrasing",
			notInConstruct: Nu
		}],
		handlers: { delete: Ru }
	};
}
function Iu(e) {
	this.enter({
		type: "delete",
		children: []
	}, e);
}
function Lu(e) {
	this.exit(e);
}
function Ru(e, t, n, r) {
	let i = n.createTracker(r), a = n.enter("strikethrough"), o = i.move("~~");
	return o += n.containerPhrasing(e, {
		...i.current(),
		before: o,
		after: "~"
	}), o += i.move("~~"), a(), o;
}
function zu() {
	return "~";
}
//#endregion
//#region node_modules/markdown-table/index.js
function Bu(e) {
	return e.length;
}
function Vu(e, t) {
	let n = t || {}, r = (n.align || []).concat(), i = n.stringLength || Bu, a = [], o = [], s = [], c = [], l = 0, u = -1;
	for (; ++u < e.length;) {
		let t = [], r = [], a = -1;
		for (e[u].length > l && (l = e[u].length); ++a < e[u].length;) {
			let o = Hu(e[u][a]);
			if (n.alignDelimiters !== !1) {
				let e = i(o);
				r[a] = e, (c[a] === void 0 || e > c[a]) && (c[a] = e);
			}
			t.push(o);
		}
		o[u] = t, s[u] = r;
	}
	let d = -1;
	if (typeof r == "object" && "length" in r) for (; ++d < l;) a[d] = Uu(r[d]);
	else {
		let e = Uu(r);
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
function Hu(e) {
	return e == null ? "" : String(e);
}
function Uu(e) {
	let t = typeof e == "string" ? e.codePointAt(0) : 0;
	return t === 67 || t === 99 ? 99 : t === 76 || t === 108 ? 108 : t === 82 || t === 114 ? 114 : 0;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/blockquote.js
function Wu(e, t, n, r) {
	let i = n.enter("blockquote"), a = n.createTracker(r);
	a.move("> "), a.shift(2);
	let o = n.indentLines(n.containerFlow(e, a.current()), Gu);
	return i(), o;
}
function Gu(e, t, n) {
	return ">" + (n ? "" : " ") + e;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
function X(e, t) {
	return Ku(e, t.inConstruct, !0) && !Ku(e, t.notInConstruct, !1);
}
function Ku(e, t, n) {
	if (typeof t == "string" && (t = [t]), !t || t.length === 0) return n;
	let r = -1;
	for (; ++r < t.length;) if (e.includes(t[r])) return !0;
	return !1;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/break.js
function qu(e, t, n, r) {
	let i = -1;
	for (; ++i < n.unsafe.length;) if (n.unsafe[i].character === "\n" && X(n.stack, n.unsafe[i])) return /[ \t]/.test(r.before) ? "" : " ";
	return "\\\n";
}
//#endregion
//#region node_modules/longest-streak/index.js
function Ju(e, t) {
	let n = String(e), r = n.indexOf(t), i = r, a = 0, o = 0;
	if (typeof t != "string") throw TypeError("Expected substring");
	for (; r !== -1;) r === i ? ++a > o && (o = a) : a = 1, i = r + t.length, r = n.indexOf(t, i);
	return o;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js
function Yu(e, t) {
	return !!(t.options.fences === !1 && e.value && !e.lang && /[^ \r\n]/.test(e.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-fence.js
function Xu(e) {
	let t = e.options.fence || "`";
	if (t !== "`" && t !== "~") throw Error("Cannot serialize code with `" + t + "` for `options.fence`, expected `` ` `` or `~`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/code.js
function Zu(e, t, n, r) {
	let i = Xu(n), a = e.value || "", o = i === "`" ? "GraveAccent" : "Tilde";
	if (Yu(e, n)) {
		let e = n.enter("codeIndented"), t = n.indentLines(a, Qu);
		return e(), t;
	}
	let s = n.createTracker(r), c = i.repeat(Math.max(Ju(a, i) + 1, 3)), l = n.enter("codeFenced"), u = s.move(c);
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
function Qu(e, t, n) {
	return (n ? "" : "    ") + e;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-quote.js
function $u(e) {
	let t = e.options.quote || "\"";
	if (t !== "\"" && t !== "'") throw Error("Cannot serialize title with `" + t + "` for `options.quote`, expected `\"`, or `'`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/definition.js
function ed(e, t, n, r) {
	let i = $u(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.enter("definition"), s = n.enter("label"), c = n.createTracker(r), l = c.move("[");
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
function td(e) {
	let t = e.options.emphasis || "*";
	if (t !== "*" && t !== "_") throw Error("Cannot serialize emphasis with `" + t + "` for `options.emphasis`, expected `*`, or `_`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js
function nd(e) {
	return "&#x" + e.toString(16).toUpperCase() + ";";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/encode-info.js
function rd(e, t, n) {
	let r = ja(e), i = ja(t);
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
id.peek = ad;
function id(e, t, n, r) {
	let i = td(n), a = n.enter("emphasis"), o = n.createTracker(r), s = o.move(i), c = o.move(n.containerPhrasing(e, {
		after: i,
		before: s,
		...o.current()
	})), l = c.charCodeAt(0), u = rd(r.before.charCodeAt(r.before.length - 1), l, i);
	u.inside && (c = nd(l) + c.slice(1));
	let d = c.charCodeAt(c.length - 1), f = rd(r.after.charCodeAt(0), d, i);
	f.inside && (c = c.slice(0, -1) + nd(d));
	let p = o.move(i);
	return a(), n.attentionEncodeSurroundingInfo = {
		after: f.outside,
		before: u.outside
	}, s + c + p;
}
function ad(e, t, n) {
	return n.options.emphasis || "*";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js
function od(e, t) {
	let n = !1;
	return $c(e, function(e) {
		if ("value" in e && /\r?\n|\r/.test(e.value) || e.type === "break") return n = !0, !1;
	}), !!((!e.depth || e.depth < 3) && ea(e) && (t.options.setext || n));
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/heading.js
function sd(e, t, n, r) {
	let i = Math.max(Math.min(6, e.depth || 1), 1), a = n.createTracker(r);
	if (od(e, n)) {
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
	return /^[\t ]/.test(l) && (l = nd(l.charCodeAt(0)) + l.slice(1)), l = l ? o + " " + l : o, n.options.closeAtx && (l += " " + o), c(), s(), l;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/html.js
cd.peek = ld;
function cd(e) {
	return e.value || "";
}
function ld() {
	return "<";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/image.js
ud.peek = dd;
function ud(e, t, n, r) {
	let i = $u(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.enter("image"), s = n.enter("label"), c = n.createTracker(r), l = c.move("![");
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
function dd() {
	return "!";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/image-reference.js
fd.peek = pd;
function fd(e, t, n, r) {
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
function pd() {
	return "!";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
md.peek = hd;
function md(e, t, n) {
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
function hd() {
	return "`";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js
function gd(e, t) {
	let n = ea(e);
	return !!(!t.options.resourceLink && e.url && !e.title && e.children && e.children.length === 1 && e.children[0].type === "text" && (n === e.url || "mailto:" + n === e.url) && /^[a-z][a-z+.-]+:/i.test(e.url) && !/[\0- <>\u007F]/.test(e.url));
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/link.js
_d.peek = vd;
function _d(e, t, n, r) {
	let i = $u(n), a = i === "\"" ? "Quote" : "Apostrophe", o = n.createTracker(r), s, c;
	if (gd(e, n)) {
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
function vd(e, t, n) {
	return gd(e, n) ? "<" : "[";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/link-reference.js
yd.peek = bd;
function yd(e, t, n, r) {
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
function bd() {
	return "[";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
function Z(e) {
	let t = e.options.bullet || "*";
	if (t !== "*" && t !== "+" && t !== "-") throw Error("Cannot serialize items with `" + t + "` for `options.bullet`, expected `*`, `+`, or `-`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js
function xd(e) {
	let t = Z(e), n = e.options.bulletOther;
	if (!n) return t === "*" ? "-" : "*";
	if (n !== "*" && n !== "+" && n !== "-") throw Error("Cannot serialize items with `" + n + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
	if (n === t) throw Error("Expected `bullet` (`" + t + "`) and `bulletOther` (`" + n + "`) to be different");
	return n;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js
function Sd(e) {
	let t = e.options.bulletOrdered || ".";
	if (t !== "." && t !== ")") throw Error("Cannot serialize items with `" + t + "` for `options.bulletOrdered`, expected `.` or `)`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-rule.js
function Cd(e) {
	let t = e.options.rule || "*";
	if (t !== "*" && t !== "-" && t !== "_") throw Error("Cannot serialize rules with `" + t + "` for `options.rule`, expected `*`, `-`, or `_`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/list.js
function wd(e, t, n, r) {
	let i = n.enter("list"), a = n.bulletCurrent, o = e.ordered ? Sd(n) : Z(n), s = e.ordered ? o === "." ? ")" : "." : xd(n), c = t && n.bulletLastUsed ? o === n.bulletLastUsed : !1;
	if (!e.ordered) {
		let t = e.children ? e.children[0] : void 0;
		if ((o === "*" || o === "-") && t && (!t.children || !t.children[0]) && n.stack[n.stack.length - 1] === "list" && n.stack[n.stack.length - 2] === "listItem" && n.stack[n.stack.length - 3] === "list" && n.stack[n.stack.length - 4] === "listItem" && n.indexStack[n.indexStack.length - 1] === 0 && n.indexStack[n.indexStack.length - 2] === 0 && n.indexStack[n.indexStack.length - 3] === 0 && (c = !0), Cd(n) === o && t) {
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
function Td(e) {
	let t = e.options.listItemIndent || "one";
	if (t !== "tab" && t !== "one" && t !== "mixed") throw Error("Cannot serialize items with `" + t + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/list-item.js
function Ed(e, t, n, r) {
	let i = Td(n), a = n.bulletCurrent || Z(n);
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
function Dd(e, t, n, r) {
	let i = n.enter("paragraph"), a = n.enter("phrasing"), o = n.containerPhrasing(e, r);
	return a(), i(), o;
}
//#endregion
//#region node_modules/mdast-util-phrasing/lib/index.js
var Od = Hc([
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
function kd(e, t, n, r) {
	return (e.children.some(function(e) {
		return Od(e);
	}) ? n.containerPhrasing : n.containerFlow).call(n, e, r);
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-strong.js
function Ad(e) {
	let t = e.options.strong || "*";
	if (t !== "*" && t !== "_") throw Error("Cannot serialize strong with `" + t + "` for `options.strong`, expected `*`, or `_`");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/strong.js
jd.peek = Md;
function jd(e, t, n, r) {
	let i = Ad(n), a = n.enter("strong"), o = n.createTracker(r), s = o.move(i + i), c = o.move(n.containerPhrasing(e, {
		after: i,
		before: s,
		...o.current()
	})), l = c.charCodeAt(0), u = rd(r.before.charCodeAt(r.before.length - 1), l, i);
	u.inside && (c = nd(l) + c.slice(1));
	let d = c.charCodeAt(c.length - 1), f = rd(r.after.charCodeAt(0), d, i);
	f.inside && (c = c.slice(0, -1) + nd(d));
	let p = o.move(i + i);
	return a(), n.attentionEncodeSurroundingInfo = {
		after: f.outside,
		before: u.outside
	}, s + c + p;
}
function Md(e, t, n) {
	return n.options.strong || "*";
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/text.js
function Nd(e, t, n, r) {
	return n.safe(e.value, r);
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js
function Pd(e) {
	let t = e.options.ruleRepetition || 3;
	if (t < 3) throw Error("Cannot serialize rules with repetition `" + t + "` for `options.ruleRepetition`, expected `3` or more");
	return t;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js
function Fd(e, t, n) {
	let r = (Cd(n) + (n.options.ruleSpaces ? " " : "")).repeat(Pd(n));
	return n.options.ruleSpaces ? r.slice(0, -1) : r;
}
//#endregion
//#region node_modules/mdast-util-to-markdown/lib/handle/index.js
var Id = {
	blockquote: Wu,
	break: qu,
	code: Zu,
	definition: ed,
	emphasis: id,
	hardBreak: qu,
	heading: sd,
	html: cd,
	image: ud,
	imageReference: fd,
	inlineCode: md,
	link: _d,
	linkReference: yd,
	list: wd,
	listItem: Ed,
	paragraph: Dd,
	root: kd,
	strong: jd,
	text: Nd,
	thematicBreak: Fd
};
//#endregion
//#region node_modules/mdast-util-gfm-table/lib/index.js
function Ld() {
	return {
		enter: {
			table: Rd,
			tableData: Hd,
			tableHeader: Hd,
			tableRow: Bd
		},
		exit: {
			codeText: Ud,
			table: zd,
			tableData: Vd,
			tableHeader: Vd,
			tableRow: Vd
		}
	};
}
function Rd(e) {
	let t = e._align;
	this.enter({
		type: "table",
		align: t.map(function(e) {
			return e === "none" ? null : e;
		}),
		children: []
	}, e), this.data.inTable = !0;
}
function zd(e) {
	this.exit(e), this.data.inTable = void 0;
}
function Bd(e) {
	this.enter({
		type: "tableRow",
		children: []
	}, e);
}
function Vd(e) {
	this.exit(e);
}
function Hd(e) {
	this.enter({
		type: "tableCell",
		children: []
	}, e);
}
function Ud(e) {
	let t = this.resume();
	this.data.inTable && (t = t.replace(/\\([\\|])/g, Wd));
	let n = this.stack[this.stack.length - 1];
	n.type, n.value = t, this.exit(e);
}
function Wd(e, t) {
	return t === "|" ? t : e;
}
function Gd(e) {
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
		return Vu(e, {
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
		let r = Id.inlineCode(e, t, n);
		return n.stack.includes("tableCell") && (r = r.replace(/\|/g, "\\$&")), r;
	}
}
//#endregion
//#region node_modules/mdast-util-gfm-task-list-item/lib/index.js
function Kd() {
	return { exit: {
		taskListCheckValueChecked: Jd,
		taskListCheckValueUnchecked: Jd,
		paragraph: Yd
	} };
}
function qd() {
	return {
		unsafe: [{
			atBreak: !0,
			character: "-",
			after: "[:|-]"
		}],
		handlers: { listItem: Xd }
	};
}
function Jd(e) {
	let t = this.stack[this.stack.length - 2];
	t.type, t.checked = e.type === "taskListCheckValueChecked";
}
function Yd(e) {
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
function Xd(e, t, n, r) {
	let i = e.children[0], a = typeof e.checked == "boolean" && i && i.type === "paragraph", o = "[" + (e.checked ? "x" : " ") + "] ", s = n.createTracker(r);
	a && s.move(o);
	let c = Id.listItem(e, t, n, {
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
function Zd() {
	return [
		au(),
		ku(),
		Pu(),
		Ld(),
		Kd()
	];
}
function Qd(e) {
	return { extensions: [
		ou(),
		Au(e),
		Fu(),
		Gd(e),
		qd()
	] };
}
//#endregion
//#region node_modules/micromark-extension-gfm-autolink-literal/lib/syntax.js
var $d = {
	tokenize: mf,
	partial: !0
}, ef = {
	tokenize: hf,
	partial: !0
}, tf = {
	tokenize: gf,
	partial: !0
}, nf = {
	tokenize: _f,
	partial: !0
}, rf = {
	tokenize: vf,
	partial: !0
}, af = {
	name: "wwwAutolink",
	tokenize: ff,
	previous: yf
}, of = {
	name: "protocolAutolink",
	tokenize: pf,
	previous: bf
}, sf = {
	name: "emailAutolink",
	tokenize: df,
	previous: xf
}, cf = {};
function lf() {
	return { text: cf };
}
for (var uf = 48; uf < 123;) cf[uf] = sf, uf++, uf === 58 ? uf = 65 : uf === 91 && (uf = 97);
cf[43] = sf, cf[45] = sf, cf[46] = sf, cf[95] = sf, cf[72] = [sf, of], cf[104] = [sf, of], cf[87] = [sf, af], cf[119] = [sf, af];
function df(e, t, n) {
	let r = this, i, a;
	return o;
	function o(t) {
		return !Sf(t) || !xf.call(r, r.previous) || Cf(r.events) ? n(t) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), s(t));
	}
	function s(t) {
		return Sf(t) ? (e.consume(t), s) : t === 64 ? (e.consume(t), c) : n(t);
	}
	function c(t) {
		return t === 46 ? e.check(rf, u, l)(t) : t === 45 || t === 95 || ha(t) ? (a = !0, e.consume(t), c) : u(t);
	}
	function l(t) {
		return e.consume(t), i = !0, c;
	}
	function u(o) {
		return a && i && ma(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), t(o)) : n(o);
	}
}
function ff(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return t !== 87 && t !== 119 || !yf.call(r, r.previous) || Cf(r.events) ? n(t) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check($d, e.attempt(ef, e.attempt(tf, a), n), n)(t));
	}
	function a(n) {
		return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), t(n);
	}
}
function pf(e, t, n) {
	let r = this, i = "", a = !1;
	return o;
	function o(t) {
		return (t === 72 || t === 104) && bf.call(r, r.previous) && !Cf(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(t), e.consume(t), s) : n(t);
	}
	function s(t) {
		if (ma(t) && i.length < 5) return i += String.fromCodePoint(t), e.consume(t), s;
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
		return t === null || _a(t) || R(t) || Sa(t) || xa(t) ? n(t) : e.attempt(ef, e.attempt(tf, u), n)(t);
	}
	function u(n) {
		return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), t(n);
	}
}
function mf(e, t, n) {
	let r = 0;
	return i;
	function i(t) {
		return (t === 87 || t === 119) && r < 3 ? (r++, e.consume(t), i) : t === 46 && r === 3 ? (e.consume(t), a) : n(t);
	}
	function a(e) {
		return e === null ? n(e) : t(e);
	}
}
function hf(e, t, n) {
	let r, i, a;
	return o;
	function o(t) {
		return t === 46 || t === 95 ? e.check(nf, c, s)(t) : t === null || R(t) || Sa(t) || t !== 45 && xa(t) ? c(t) : (a = !0, e.consume(t), o);
	}
	function s(t) {
		return t === 95 ? r = !0 : (i = r, r = void 0), e.consume(t), o;
	}
	function c(e) {
		return i || r || !a ? n(e) : t(e);
	}
}
function gf(e, t) {
	let n = 0, r = 0;
	return i;
	function i(o) {
		return o === 40 ? (n++, e.consume(o), i) : o === 41 && r < n ? a(o) : o === 33 || o === 34 || o === 38 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 60 || o === 63 || o === 93 || o === 95 || o === 126 ? e.check(nf, t, a)(o) : o === null || R(o) || Sa(o) ? t(o) : (e.consume(o), i);
	}
	function a(t) {
		return t === 41 && r++, e.consume(t), i;
	}
}
function _f(e, t, n) {
	return r;
	function r(o) {
		return o === 33 || o === 34 || o === 39 || o === 41 || o === 42 || o === 44 || o === 46 || o === 58 || o === 59 || o === 63 || o === 95 || o === 126 ? (e.consume(o), r) : o === 38 ? (e.consume(o), a) : o === 93 ? (e.consume(o), i) : o === 60 || o === null || R(o) || Sa(o) ? t(o) : n(o);
	}
	function i(e) {
		return e === null || e === 40 || e === 91 || R(e) || Sa(e) ? t(e) : r(e);
	}
	function a(e) {
		return ma(e) ? o(e) : n(e);
	}
	function o(t) {
		return t === 59 ? (e.consume(t), r) : ma(t) ? (e.consume(t), o) : n(t);
	}
}
function vf(e, t, n) {
	return r;
	function r(t) {
		return e.consume(t), i;
	}
	function i(e) {
		return ha(e) ? n(e) : t(e);
	}
}
function yf(e) {
	return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || R(e);
}
function bf(e) {
	return !ma(e);
}
function xf(e) {
	return !(e === 47 || Sf(e));
}
function Sf(e) {
	return e === 43 || e === 45 || e === 46 || e === 95 || ha(e);
}
function Cf(e) {
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
var wf = {
	tokenize: Mf,
	partial: !0
};
function Tf() {
	return {
		document: { 91: {
			name: "gfmFootnoteDefinition",
			tokenize: kf,
			continuation: { tokenize: Af },
			exit: jf
		} },
		text: {
			91: {
				name: "gfmFootnoteCall",
				tokenize: Of
			},
			93: {
				name: "gfmPotentialFootnoteCall",
				add: "after",
				tokenize: Ef,
				resolveTo: Df
			}
		}
	};
}
function Ef(e, t, n) {
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
		let s = pa(r.sliceSerialize({
			start: o.end,
			end: r.now()
		}));
		return s.codePointAt(0) !== 94 || !a.includes(s.slice(1)) ? n(i) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(i), e.exit("gfmFootnoteCallLabelMarker"), t(i));
	}
}
function Df(e, t) {
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
function Of(e, t, n) {
	let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), a = 0, o;
	return s;
	function s(t) {
		return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(t), e.exit("gfmFootnoteCallLabelMarker"), c;
	}
	function c(t) {
		return t === 94 ? (e.enter("gfmFootnoteCallMarker"), e.consume(t), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", l) : n(t);
	}
	function l(s) {
		if (a > 999 || s === 93 && !o || s === null || s === 91 || R(s)) return n(s);
		if (s === 93) {
			e.exit("chunkString");
			let a = e.exit("gfmFootnoteCallString");
			return i.includes(pa(r.sliceSerialize(a))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(s), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), t) : n(s);
		}
		return R(s) || (o = !0), a++, e.consume(s), s === 92 ? u : l;
	}
	function u(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), a++, l) : l(t);
	}
}
function kf(e, t, n) {
	let r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []), a, o = 0, s;
	return c;
	function c(t) {
		return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionLabelMarker"), l;
	}
	function l(t) {
		return t === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", u) : n(t);
	}
	function u(t) {
		if (o > 999 || t === 93 && !s || t === null || t === 91 || R(t)) return n(t);
		if (t === 93) {
			e.exit("chunkString");
			let n = e.exit("gfmFootnoteDefinitionLabelString");
			return a = pa(r.sliceSerialize(n)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), f;
		}
		return R(t) || (s = !0), o++, e.consume(t), t === 92 ? d : u;
	}
	function d(t) {
		return t === 91 || t === 92 || t === 93 ? (e.consume(t), o++, u) : u(t);
	}
	function f(t) {
		return t === 58 ? (e.enter("definitionMarker"), e.consume(t), e.exit("definitionMarker"), i.includes(a) || i.push(a), B(e, p, "gfmFootnoteDefinitionWhitespace")) : n(t);
	}
	function p(e) {
		return t(e);
	}
}
function Af(e, t, n) {
	return e.check(za, t, e.attempt(wf, t, n));
}
function jf(e) {
	e.exit("gfmFootnoteDefinition");
}
function Mf(e, t, n) {
	let r = this;
	return B(e, i, "gfmFootnoteDefinitionIndent", 5);
	function i(e) {
		let i = r.events[r.events.length - 1];
		return i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], !0).length === 4 ? t(e) : n(e);
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm-strikethrough/lib/syntax.js
function Nf(e) {
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
				s && oa(o, o.length, 0, Ma(s, e.slice(r + 1, n), t)), oa(o, o.length, 0, [
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
				]), oa(e, r - 1, n - r + 3, o), n = r + o.length - 2;
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
			let s = ja(i);
			if (a === 126) return o > 1 ? r(a) : (e.consume(a), o++, c);
			if (o < 2 && !t) return r(a);
			let l = e.exit("strikethroughSequenceTemporary"), u = ja(a);
			return l._open = !u || u === 2 && !!s, l._close = !s || s === 2 && !!u, n(a);
		}
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm-table/lib/edit-map.js
var Pf = class {
	constructor() {
		this.map = [];
	}
	add(e, t, n) {
		Ff(this, e, t, n);
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
function Ff(e, t, n, r) {
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
function If(e, t) {
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
function Lf() {
	return { flow: { null: {
		name: "table",
		tokenize: Rf,
		resolveAll: zf
	} } };
}
function Rf(e, t, n) {
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
		return t === null ? n(t) : L(t) ? a > 1 ? (a = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(t), e.exit("lineEnding"), p) : n(t) : z(t) ? B(e, u, "whitespace")(t) : (a += 1, o && (o = !1, i += 1), t === 124 ? (e.enter("tableCellDivider"), e.consume(t), e.exit("tableCellDivider"), o = !0, u) : (e.enter("data"), d(t)));
	}
	function d(t) {
		return t === null || t === 124 || R(t) ? (e.exit("data"), u(t)) : (e.consume(t), t === 92 ? f : d);
	}
	function f(t) {
		return t === 92 || t === 124 ? (e.consume(t), d) : d(t);
	}
	function p(t) {
		return r.interrupt = !1, r.parser.lazy[r.now().line] ? n(t) : (e.enter("tableDelimiterRow"), o = !1, z(t) ? B(e, m, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t) : m(t));
	}
	function m(t) {
		return t === 45 || t === 58 ? g(t) : t === 124 ? (o = !0, e.enter("tableCellDivider"), e.consume(t), e.exit("tableCellDivider"), h) : x(t);
	}
	function h(t) {
		return z(t) ? B(e, g, "whitespace")(t) : g(t);
	}
	function g(t) {
		return t === 58 ? (a += 1, o = !0, e.enter("tableDelimiterMarker"), e.consume(t), e.exit("tableDelimiterMarker"), _) : t === 45 ? (a += 1, _(t)) : t === null || L(t) ? b(t) : x(t);
	}
	function _(t) {
		return t === 45 ? (e.enter("tableDelimiterFiller"), v(t)) : x(t);
	}
	function v(t) {
		return t === 45 ? (e.consume(t), v) : t === 58 ? (o = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(t), e.exit("tableDelimiterMarker"), y) : (e.exit("tableDelimiterFiller"), y(t));
	}
	function y(t) {
		return z(t) ? B(e, b, "whitespace")(t) : b(t);
	}
	function b(n) {
		return n === 124 ? m(n) : n === null || L(n) ? !o || i !== a ? x(n) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), t(n)) : x(n);
	}
	function x(e) {
		return n(e);
	}
	function S(t) {
		return e.enter("tableRow"), C(t);
	}
	function C(n) {
		return n === 124 ? (e.enter("tableCellDivider"), e.consume(n), e.exit("tableCellDivider"), C) : n === null || L(n) ? (e.exit("tableRow"), t(n)) : z(n) ? B(e, C, "whitespace")(n) : (e.enter("data"), w(n));
	}
	function w(t) {
		return t === null || t === 124 || R(t) ? (e.exit("data"), C(t)) : (e.consume(t), t === 92 ? T : w);
	}
	function T(t) {
		return t === 92 || t === 124 ? (e.consume(t), w) : w(t);
	}
}
function zf(e, t) {
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
	], s = !1, c = 0, l, u, d, f = new Pf();
	for (; ++n < e.length;) {
		let p = e[n], m = p[1];
		p[0] === "enter" ? m.type === "tableHead" ? (s = !1, c !== 0 && (Vf(f, t, c, l, u), u = void 0, c = 0), l = {
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
		]])), i = m.type === "tableDelimiterRow" ? 2 : u ? 3 : 1) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") ? (r = !1, o[2] === 0 && (a[1] !== 0 && (o[0] = o[1], d = Bf(f, t, a, i, void 0, d), a = [
			0,
			0,
			0,
			0
		]), o[2] = n)) : m.type === "tableCellDivider" && (r ? r = !1 : (a[1] !== 0 && (o[0] = o[1], d = Bf(f, t, a, i, void 0, d)), a = o, o = [
			a[1],
			n,
			0,
			0
		])) : m.type === "tableHead" ? (s = !0, c = n) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (c = n, a[1] === 0 ? o[1] !== 0 && (d = Bf(f, t, o, i, n, d)) : (o[0] = o[1], d = Bf(f, t, a, i, n, d)), i = 0) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") && (o[3] = n);
	}
	for (c !== 0 && Vf(f, t, c, l, u), f.consume(t.events), n = -1; ++n < t.events.length;) {
		let e = t.events[n];
		e[0] === "enter" && e[1].type === "table" && (e[1]._align = If(t.events, n));
	}
	return e;
}
function Bf(e, t, n, r, i, a) {
	let o = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData";
	n[0] !== 0 && (a.end = Object.assign({}, Hf(t.events, n[0])), e.add(n[0], 0, [[
		"exit",
		a,
		t
	]]));
	let s = Hf(t.events, n[1]);
	if (a = {
		type: o,
		start: Object.assign({}, s),
		end: Object.assign({}, s)
	}, e.add(n[1], 0, [[
		"enter",
		a,
		t
	]]), n[2] !== 0) {
		let i = Hf(t.events, n[2]), a = Hf(t.events, n[3]), o = {
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
	return i !== void 0 && (a.end = Object.assign({}, Hf(t.events, i)), e.add(i, 0, [[
		"exit",
		a,
		t
	]]), a = void 0), a;
}
function Vf(e, t, n, r, i) {
	let a = [], o = Hf(t.events, n);
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
function Hf(e, t) {
	let n = e[t], r = n[0] === "enter" ? "start" : "end";
	return n[1][r];
}
//#endregion
//#region node_modules/micromark-extension-gfm-task-list-item/lib/syntax.js
var Uf = {
	name: "tasklistCheck",
	tokenize: Gf
};
function Wf() {
	return { text: { 91: Uf } };
}
function Gf(e, t, n) {
	let r = this;
	return i;
	function i(t) {
		return r.previous !== null || !r._gfmTasklistFirstContentOfListItem ? n(t) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(t), e.exit("taskListCheckMarker"), a);
	}
	function a(t) {
		return R(t) ? (e.enter("taskListCheckValueUnchecked"), e.consume(t), e.exit("taskListCheckValueUnchecked"), o) : t === 88 || t === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(t), e.exit("taskListCheckValueChecked"), o) : n(t);
	}
	function o(t) {
		return t === 93 ? (e.enter("taskListCheckMarker"), e.consume(t), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), s) : n(t);
	}
	function s(r) {
		return L(r) ? t(r) : z(r) ? e.check({ tokenize: Kf }, t, n)(r) : n(r);
	}
}
function Kf(e, t, n) {
	return B(e, r, "whitespace");
	function r(e) {
		return e === null ? n(e) : t(e);
	}
}
//#endregion
//#region node_modules/micromark-extension-gfm/index.js
function qf(e) {
	return la([
		lf(),
		Tf(),
		Nf(e),
		Lf(),
		Wf()
	]);
}
//#endregion
//#region node_modules/remark-gfm/lib/index.js
var Jf = {};
function Yf(e) {
	let t = this, n = e || Jf, r = t.data(), i = r.micromarkExtensions ||= [], a = r.fromMarkdownExtensions ||= [], o = r.toMarkdownExtensions ||= [];
	i.push(qf(n)), a.push(Zd()), o.push(Qd(n));
}
//#endregion
//#region package.json
var Xf = "1.24.32", Zf = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), Qf = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), $f = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), ep = (e) => {
	let t = $f(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, tp = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, np = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, rp = (0, M.createContext)({}), ip = () => (0, M.useContext)(rp), ap = (0, M.forwardRef)(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: r, className: i = "", children: a, iconNode: o, ...s }, c) => {
	let { size: l = 24, strokeWidth: u = 2, absoluteStrokeWidth: d = !1, color: f = "currentColor", className: p = "" } = ip() ?? {}, m = r ?? d ? Number(n ?? u) * 24 / Number(t ?? l) : n ?? u;
	return (0, M.createElement)("svg", {
		ref: c,
		...tp,
		width: t ?? l ?? tp.width,
		height: t ?? l ?? tp.height,
		stroke: e ?? f,
		strokeWidth: m,
		className: Zf("lucide", p, i),
		...!a && !np(s) && { "aria-hidden": "true" },
		...s
	}, [...o.map(([e, t]) => (0, M.createElement)(e, t)), ...Array.isArray(a) ? a : [a]]);
}), Q = (e, t) => {
	let n = (0, M.forwardRef)(({ className: n, ...r }, i) => (0, M.createElement)(ap, {
		ref: i,
		iconNode: t,
		className: Zf(`lucide-${Qf(ep(e))}`, `lucide-${e}`, n),
		...r
	}));
	return n.displayName = ep(e), n;
}, op = Q("activity", [["path", {
	d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
	key: "169zse"
}]]), sp = Q("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]), cp = Q("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), lp = Q("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), up = Q("circle-alert", [
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
]), dp = Q("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), fp = Q("circle-dot", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "1",
	key: "41hilf"
}]]), pp = Q("circle-question-mark", [
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
]), mp = Q("code-xml", [
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
]), hp = Q("copy", [["rect", {
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
}]]), gp = Q("external-link", [
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
]), _p = Q("eye-off", [
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
]), vp = Q("eye", [["path", {
	d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
	key: "1nclc0"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), yp = Q("file-code-corner", [
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
]), bp = Q("folder-git-2", [
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
]), xp = Q("git-branch", [
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
]), Sp = Q("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), Cp = Q("maximize-2", [
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
]), wp = Q("minimize-2", [
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
]), Tp = Q("play", [["path", {
	d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	key: "10ikf1"
}]]), Ep = Q("rotate-ccw", [["path", {
	d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
	key: "1357e3"
}], ["path", {
	d: "M3 3v5h5",
	key: "1xhq8a"
}]]), Dp = Q("save", [
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
]), Op = Q("scan-search", [
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
]), kp = Q("settings-2", [
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
]), Ap = Q("shield-check", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), jp = Q("sparkles", [
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
]), Mp = Q("terminal", [["path", {
	d: "M12 19h8",
	key: "baeox8"
}], ["path", {
	d: "m4 17 6-6-6-6",
	key: "1yngyt"
}]]), Np = Q("trash-2", [
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
]), Pp = Q("truck", [
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
]), Fp = Q("workflow", [
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
]);
//#endregion
//#region src/main.tsx
Sr.initialize({
	startOnLoad: !1,
	securityLevel: "strict",
	theme: "neutral"
});
var Ip = [
	{
		id: "scan",
		label: "AUTO SCAN",
		icon: Op
	},
	{
		id: "delivery",
		label: "AUTO DELIVERY",
		icon: Pp
	},
	{
		id: "observatory",
		label: "OBSERVATORY",
		icon: vp
	},
	{
		id: "repositories",
		label: "REPOSITORY",
		icon: bp
	},
	{
		id: "prompts",
		label: "WORKFLOW",
		icon: Fp
	},
	{
		id: "settings",
		label: "SETTINGS",
		icon: kp
	}
], Lp = {
	scan: {
		title: "AUTO SCAN",
		description: "Review history and manage tracked findings."
	},
	delivery: {
		title: "AUTO DELIVERY",
		description: "Story execution, verification, and pull request delivery."
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
}, Rp = [
	{
		label: "Auto",
		value: "auto"
	},
	{
		label: "Composer 2.5",
		value: "composer-2.5"
	},
	{
		label: "Grok 4.5",
		value: "grok-4.5"
	},
	{
		label: "Sonnet 4.5",
		value: "sonnet-4.5"
	},
	{
		label: "GPT-5.1 Codex",
		value: "gpt-5.1-codex"
	}
];
function zp(e, t = "—") {
	return e == null || e === "" ? t : String(e);
}
function Bp(e) {
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
function Vp(e, t) {
	if (!e || !t) return "—";
	let n = Math.round((new Date(t).valueOf() - new Date(e).valueOf()) / 1e3);
	return !Number.isFinite(n) || n < 0 ? "—" : `${Math.floor(n / 60)}m ${String(n % 60).padStart(2, "0")}s`;
}
function Hp(e) {
	let t = String(e || "unknown").toLowerCase().replaceAll("_", " ");
	return t === "open" || /(failed|blocked)/.test(t) ? "danger" : /(completed|succeeded|clean|passed|resolved|synced|configured|included|available|approved|ready|done|pr open)/.test(t) ? "success" : /(progress|running|active|partial|draft|not started)/.test(t) ? "info" : "neutral";
}
function Up(e) {
	let t = zp(e, "unknown").toLowerCase().replaceAll("_", " ");
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
async function Wp(e, t, n = {}) {
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
function Gp({ value: e }) {
	return /* @__PURE__ */ (0, Y.jsx)("span", {
		className: `badge ${Hp(e)}`,
		children: Up(e)
	});
}
function Kp({ business: e, technical: t }) {
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "observatory-meta",
		children: [/* @__PURE__ */ (0, Y.jsxs)("span", {
			className: "observatory-meta-item",
			children: [/* @__PURE__ */ (0, Y.jsx)("em", { children: "Business" }), /* @__PURE__ */ (0, Y.jsx)(Gp, { value: e || "draft" })]
		}), /* @__PURE__ */ (0, Y.jsxs)("span", {
			className: "observatory-meta-item",
			children: [/* @__PURE__ */ (0, Y.jsx)("em", { children: "Technical" }), /* @__PURE__ */ (0, Y.jsx)(Gp, { value: t || "draft" })]
		})]
	});
}
function qp({ business: e, technical: t }) {
	return /* @__PURE__ */ (0, Y.jsxs)("span", {
		className: "observatory-pills",
		title: `Business ${Up(e || "draft")} · Technical ${Up(t || "draft")}`,
		children: [/* @__PURE__ */ (0, Y.jsx)(Gp, { value: e || "draft" }), /* @__PURE__ */ (0, Y.jsx)(Gp, { value: t || "draft" })]
	});
}
function Jp({ chart: e }) {
	let t = (0, M.useRef)(null);
	return (0, M.useEffect)(() => {
		let n = t.current;
		if (!n) return;
		let r = !1, i = `mmd-${Math.random().toString(36).slice(2)}`;
		return Sr.render(i, e).then(({ svg: e }) => {
			r || (n.innerHTML = e);
		}).catch((e) => {
			r || (n.innerHTML = `<pre class="mermaid-error">${String(e)}</pre>`);
		}), () => {
			r = !0;
		};
	}, [e]), /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "mermaid-block",
		ref: t
	});
}
function Yp({ content: e }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "markdown-content",
		children: /* @__PURE__ */ (0, Y.jsx)(Kl, {
			remarkPlugins: [Yf],
			components: {
				a({ href: e, children: t }) {
					return /* @__PURE__ */ (0, Y.jsx)("a", {
						href: e,
						target: "_blank",
						rel: "noreferrer noopener",
						children: t
					});
				},
				code({ className: e, children: t }) {
					let n = String(t).replace(/\n$/, "");
					return /language-mermaid/.test(e || "") ? /* @__PURE__ */ (0, Y.jsx)(Jp, { chart: n }) : n.includes("\n") ? /* @__PURE__ */ (0, Y.jsx)("pre", { children: /* @__PURE__ */ (0, Y.jsx)("code", {
						className: e,
						children: n
					}) }) : /* @__PURE__ */ (0, Y.jsx)("code", {
						className: e,
						children: t
					});
				}
			},
			children: e
		})
	});
}
function Xp(e) {
	let t = e.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	return t ? {
		frontmatter: t[1],
		body: t[2]
	} : {
		frontmatter: "",
		body: e
	};
}
function Zp(e, t) {
	return e ? `---\n${e}\n---\n${t.startsWith("\n") ? t : `\n${t}`}` : t;
}
function Qp({ value: e, onChange: t, editing: n }) {
	let { frontmatter: r, body: i } = Xp(e), a = (e) => t(Zp(r, e));
	return n ? /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "observatory-doc editing",
		children: [/* @__PURE__ */ (0, Y.jsx)("div", {
			className: "observatory-doc-preview",
			children: /* @__PURE__ */ (0, Y.jsx)(Yp, { content: i })
		}), /* @__PURE__ */ (0, Y.jsx)("textarea", {
			className: "observatory-doc-input",
			value: i,
			onChange: (e) => a(e.target.value),
			spellCheck: !1,
			"aria-label": "Document body"
		})]
	}) : /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "observatory-doc",
		children: /* @__PURE__ */ (0, Y.jsx)(Yp, { content: i })
	});
}
function $p({ label: e, children: t, onClick: n, danger: r = !1, disabled: i = !1, className: a = "" }) {
	return /* @__PURE__ */ (0, Y.jsx)("button", {
		className: `icon-button ${r ? "danger" : ""} ${a}`,
		title: e,
		"aria-label": e,
		disabled: i,
		onClick: n,
		children: t
	});
}
function em({ title: e, action: t, children: n, className: r = "" }) {
	return /* @__PURE__ */ (0, Y.jsxs)("section", {
		className: `panel ${r}`,
		children: [/* @__PURE__ */ (0, Y.jsxs)("header", {
			className: "panel-header",
			children: [/* @__PURE__ */ (0, Y.jsx)("h3", { children: e }), t]
		}), n]
	});
}
function tm() {
	let [e, t] = (0, M.useState)(new URLSearchParams(window.location.search).get("project") || window.DASHBOARD_DATA?.interactive?.project || ""), [n, r] = (0, M.useState)(null), [i, a] = (0, M.useState)(Ip.find((e) => `/${e.id}` === window.location.pathname)?.id || "scan"), [o, s] = (0, M.useState)(""), [c, l] = (0, M.useState)(null), [u, d] = (0, M.useState)(!0), [f, p] = (0, M.useState)(() => window.localStorage.getItem("lumen-sidebar-collapsed") === "true"), [m, h] = (0, M.useState)(null), [g, _] = (0, M.useState)(!1), [v, y] = (0, M.useState)(!1), b = (0, M.useCallback)((e, t = "info") => l({
		message: e,
		tone: t
	}), []), x = async () => {
		d(!0);
		try {
			let n = await Wp("/api/state", e);
			r(n), h(/* @__PURE__ */ new Date()), !e && n.interactive?.project && t(n.interactive.project), s("");
		} catch (e) {
			let t = window.DASHBOARD_DATA;
			t ? (r(t), s("Static report mode: interactive actions are unavailable.")) : s(e instanceof Error ? e.message : "Unable to load Dashboard state");
		} finally {
			d(!1);
		}
	};
	(0, M.useEffect)(() => {
		x();
		let e = window.setInterval(x, 5e3);
		return () => window.clearInterval(e);
	}, [e]), (0, M.useEffect)(() => {
		if (!c) return;
		let e = window.setTimeout(() => l(null), 3200);
		return () => window.clearTimeout(e);
	}, [c]), (0, M.useEffect)(() => {
		window.localStorage.setItem("lumen-sidebar-collapsed", String(f));
	}, [f]), (0, M.useEffect)(() => {
		let e = () => a(Ip.find((e) => `/${e.id}` === window.location.pathname)?.id || "scan");
		return window.addEventListener("popstate", e), () => window.removeEventListener("popstate", e);
	}, []);
	let S = () => !(g && !window.confirm("You have unsaved Settings changes. Leave without saving?") || v && !window.confirm("You have unsaved Observatory changes. Leave without saving?")), C = (n) => {
		if (n !== e && !S()) return;
		let r = new URL(window.location.href);
		r.searchParams.set("project", n), window.history.replaceState({}, "", `${window.location.pathname}${r.search}`), t(n), _(!1), y(!1);
	}, w = (e) => {
		if (e !== i && !S()) return;
		let t = new URL(window.location.href);
		t.pathname = `/${e}`, window.history.pushState({}, "", t), a(e), e !== "settings" && _(!1), e !== "observatory" && y(!1);
	}, T = async (t, n, r) => {
		try {
			await Wp(t, e, {
				method: "POST",
				json: n
			}), b(r, "success"), await x();
		} catch (e) {
			b(e instanceof Error ? e.message : "Request failed", "error");
		}
	}, E = n?.interactive?.projects || [], ee = n?.product?.tagline || "Engineering, made legible.", D = Lp[i];
	return /* @__PURE__ */ (0, Y.jsxs)("main", {
		className: `dashboard-layout ${f ? "sidebar-is-collapsed" : ""}`,
		children: [
			/* @__PURE__ */ (0, Y.jsxs)("aside", {
				className: "sidebar",
				"aria-label": "Lumen navigation",
				children: [
					/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "sidebar-brand",
						children: [/* @__PURE__ */ (0, Y.jsx)("img", {
							src: "assets/lumen-mark.png",
							className: "brand-mark",
							alt: "Lumen"
						}), /* @__PURE__ */ (0, Y.jsxs)("div", {
							className: "sidebar-brand-copy",
							children: [/* @__PURE__ */ (0, Y.jsx)("strong", { children: "Lumen" }), /* @__PURE__ */ (0, Y.jsx)("span", { children: ee })]
						})]
					}),
					/* @__PURE__ */ (0, Y.jsx)("nav", {
						className: "side-nav",
						"aria-label": "Dashboard sections",
						children: Ip.map((e) => {
							let t = e.icon;
							return /* @__PURE__ */ (0, Y.jsxs)("button", {
								title: e.label,
								className: i === e.id ? "active" : "",
								onClick: () => w(e.id),
								children: [/* @__PURE__ */ (0, Y.jsx)(t, { size: 17 }), /* @__PURE__ */ (0, Y.jsx)("span", { children: e.label })]
							}, e.id);
						})
					}),
					/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "sidebar-foot",
						children: [!f && /* @__PURE__ */ (0, Y.jsx)("img", {
							src: "assets/inspire-group-logo.png",
							className: "company-mark",
							alt: "INSPIRE GROUP"
						}), /* @__PURE__ */ (0, Y.jsx)("small", { children: f ? `V${Xf}` : `Version ${Xf}` })]
					})
				]
			}),
			/* @__PURE__ */ (0, Y.jsx)($p, {
				className: "sidebar-toggle",
				label: f ? "Expand navigation" : "Collapse navigation",
				onClick: () => p((e) => !e),
				children: f ? /* @__PURE__ */ (0, Y.jsx)(lp, { size: 14 }) : /* @__PURE__ */ (0, Y.jsx)(sp, { size: 14 })
			}),
			/* @__PURE__ */ (0, Y.jsxs)("section", {
				className: "content-area",
				children: [/* @__PURE__ */ (0, Y.jsxs)("header", {
					className: "masthead",
					children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "masthead-context",
						children: [/* @__PURE__ */ (0, Y.jsx)("strong", { children: D.title }), /* @__PURE__ */ (0, Y.jsx)("span", { children: D.description })]
					}), /* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "masthead-actions",
						children: [/* @__PURE__ */ (0, Y.jsx)("span", {
							className: "last-updated",
							children: m ? `Updated ${Bp(m.toISOString())}` : "Syncing…"
						}), /* @__PURE__ */ (0, Y.jsxs)("label", {
							className: "project-picker",
							children: [
								/* @__PURE__ */ (0, Y.jsx)("span", { children: "Project" }),
								/* @__PURE__ */ (0, Y.jsx)("select", {
									value: e,
									onChange: (e) => C(e.target.value),
									children: E.map((e) => /* @__PURE__ */ (0, Y.jsx)("option", {
										value: e.slug,
										children: e.name
									}, e.slug))
								}),
								/* @__PURE__ */ (0, Y.jsx)(cp, { size: 15 })
							]
						})]
					})]
				}), /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "page-content",
					children: [
						o && /* @__PURE__ */ (0, Y.jsxs)("div", {
							className: "status-note",
							children: [/* @__PURE__ */ (0, Y.jsx)(op, { size: 15 }), o]
						}),
						!n && u ? /* @__PURE__ */ (0, Y.jsxs)("div", {
							className: "loading-state",
							children: [/* @__PURE__ */ (0, Y.jsx)(Sp, {
								size: 22,
								className: "spin"
							}), " Loading local workspace state…"]
						}) : null,
						n && i === "scan" && /* @__PURE__ */ (0, Y.jsx)(nm, {
							data: n,
							project: e,
							interact: T
						}),
						n && i === "delivery" && /* @__PURE__ */ (0, Y.jsx)(um, {
							data: n,
							project: e,
							notify: b,
							reload: x
						}),
						n && i === "observatory" && /* @__PURE__ */ (0, Y.jsx)(mm, {
							project: e,
							notify: b,
							onDirtyChange: y
						}),
						n && i === "repositories" && /* @__PURE__ */ (0, Y.jsx)(Am, {
							data: n,
							interact: T
						}),
						n && i === "prompts" && /* @__PURE__ */ (0, Y.jsx)(Em, {
							data: n,
							project: e,
							interact: T,
							notify: b
						}),
						n && i === "settings" && /* @__PURE__ */ (0, Y.jsx)(Mm, {
							data: n,
							project: e,
							notify: b,
							onDirtyChange: _,
							reload: x
						})
					]
				}, i)]
			}),
			c && /* @__PURE__ */ (0, Y.jsxs)("div", {
				className: `toast toast-${c.tone}`,
				role: "status",
				children: [c.tone === "success" ? /* @__PURE__ */ (0, Y.jsx)(dp, { size: 16 }) : c.tone === "error" ? /* @__PURE__ */ (0, Y.jsx)(up, { size: 16 }) : /* @__PURE__ */ (0, Y.jsx)(fp, { size: 16 }), /* @__PURE__ */ (0, Y.jsx)("span", { children: c.message })]
			})
		]
	});
}
function nm({ data: e, project: t, interact: n }) {
	let r = e.run_stats || {}, i = e.issues || [], a = e.runs || [], [o, s] = (0, M.useState)(null), [c, l] = (0, M.useState)("all"), [u, d] = (0, M.useState)(0), f = i.filter((e) => [
		"open",
		"in_progress",
		"pr_open"
	].includes(String(e.status || "").toLowerCase())), p = i.filter((e) => c === "all" || (c === "open" ? [
		"open",
		"in_progress",
		"pr_open"
	].includes(String(e.status || "").toLowerCase()) : String(e.status || "").toLowerCase() === c)), m = {
		all: i.length,
		open: f.length,
		ignored: i.filter((e) => e.status === "ignored").length,
		resolved: i.filter((e) => [
			"resolved",
			"accepted_risk",
			"false_positive"
		].includes(e.status)).length
	}, h = a.slice(u * 10, (u + 1) * 10);
	return /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [
		/* @__PURE__ */ (0, Y.jsxs)("section", {
			className: "metrics",
			children: [
				/* @__PURE__ */ (0, Y.jsx)(rm, {
					label: "Open findings",
					value: f.length,
					onClick: () => document.getElementById("tracked-findings")?.scrollIntoView({
						behavior: "smooth",
						block: "start"
					})
				}),
				/* @__PURE__ */ (0, Y.jsx)(rm, {
					label: "Successful Scan · 7d",
					value: r.success_7d || 0
				}),
				/* @__PURE__ */ (0, Y.jsx)(rm, {
					label: "Failed · 7d",
					value: r.failed_7d || 0
				}),
				/* @__PURE__ */ (0, Y.jsx)(rm, {
					label: "Lookback window",
					value: `${e.scan_window_days || 7}d`
				})
			]
		}),
		/* @__PURE__ */ (0, Y.jsxs)(em, {
			title: "Scan History",
			action: /* @__PURE__ */ (0, Y.jsxs)("span", {
				className: "muted",
				children: [a.length, " runs"]
			}),
			children: [/* @__PURE__ */ (0, Y.jsx)("div", {
				className: "table-scroll",
				children: /* @__PURE__ */ (0, Y.jsxs)("table", { children: [/* @__PURE__ */ (0, Y.jsx)("thead", { children: /* @__PURE__ */ (0, Y.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, Y.jsx)("th", { children: "Started" }),
					/* @__PURE__ */ (0, Y.jsx)("th", { children: "Status" }),
					/* @__PURE__ */ (0, Y.jsx)("th", { children: "Issues" }),
					/* @__PURE__ */ (0, Y.jsx)("th", { children: "Duration" }),
					/* @__PURE__ */ (0, Y.jsx)("th", { children: "Artifacts" })
				] }) }), /* @__PURE__ */ (0, Y.jsx)("tbody", { children: h.map((e) => /* @__PURE__ */ (0, Y.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, Y.jsx)("td", { children: Bp(e.started_at || e.finished_at) }),
					/* @__PURE__ */ (0, Y.jsx)("td", { children: /* @__PURE__ */ (0, Y.jsx)(Gp, { value: e.status }) }),
					/* @__PURE__ */ (0, Y.jsx)("td", { children: /* @__PURE__ */ (0, Y.jsx)(am, { run: e }) }),
					/* @__PURE__ */ (0, Y.jsx)("td", { children: zp(e.duration) }),
					/* @__PURE__ */ (0, Y.jsx)("td", { children: /* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "artifact-links",
						children: [
							e.html && /* @__PURE__ */ (0, Y.jsx)("a", {
								href: `${e.html}?project=${encodeURIComponent(t)}`,
								target: "_blank",
								children: "HTML"
							}),
							e.pdf && /* @__PURE__ */ (0, Y.jsx)("a", {
								href: `${e.pdf}?project=${encodeURIComponent(t)}`,
								target: "_blank",
								children: "PDF"
							}),
							!e.html && !e.pdf && "—"
						]
					}) })
				] }, e.id)) })] })
			}), a.length > 10 && /* @__PURE__ */ (0, Y.jsx)(om, {
				page: u,
				pageCount: Math.ceil(a.length / 10),
				onChange: d
			})]
		}),
		/* @__PURE__ */ (0, Y.jsxs)(em, {
			title: "Tracked Findings",
			action: /* @__PURE__ */ (0, Y.jsxs)("span", {
				className: "muted",
				children: [
					p.length,
					" of ",
					i.length,
					" records"
				]
			}),
			children: [/* @__PURE__ */ (0, Y.jsx)("div", {
				className: "finding-filters",
				role: "tablist",
				children: [
					"all",
					"open",
					"resolved",
					"ignored"
				].map((e) => /* @__PURE__ */ (0, Y.jsxs)("button", {
					className: c === e ? "active" : "",
					onClick: () => l(e),
					children: [
						e === "all" ? "All" : Up(e),
						" ",
						/* @__PURE__ */ (0, Y.jsx)("span", { children: m[e] })
					]
				}, e))
			}), /* @__PURE__ */ (0, Y.jsx)("div", {
				id: "tracked-findings",
				className: "findings",
				children: p.length ? p.map((e) => /* @__PURE__ */ (0, Y.jsx)(sm, {
					issue: e,
					onIgnore: () => s(e)
				}, e.id)) : /* @__PURE__ */ (0, Y.jsx)(im, { label: "No findings match this status." })
			})]
		}),
		o && /* @__PURE__ */ (0, Y.jsx)(lm, {
			onClose: () => s(null),
			onConfirm: (e) => {
				n("/api/issue/ignore", {
					issue_id: o.id,
					reason: e
				}, "Finding ignored"), s(null);
			}
		})
	] });
}
function rm({ label: e, value: t, onClick: n }) {
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: `metric ${n ? "metric-action" : ""}`,
		onClick: n,
		role: n ? "button" : void 0,
		tabIndex: n ? 0 : void 0,
		onKeyDown: (e) => {
			n && (e.key === "Enter" || e.key === " ") && n();
		},
		children: [/* @__PURE__ */ (0, Y.jsx)("span", { children: e }), /* @__PURE__ */ (0, Y.jsx)("strong", { children: t })]
	});
}
function im({ label: e }) {
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "empty",
		children: [/* @__PURE__ */ (0, Y.jsx)(Ap, { size: 20 }), e]
	});
}
function am({ run: e }) {
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
	return t.length ? /* @__PURE__ */ (0, Y.jsx)("span", {
		className: "severity-breakdown",
		children: t.map(([e, t, n]) => /* @__PURE__ */ (0, Y.jsxs)("b", {
			className: n,
			children: [
				e,
				": ",
				t
			]
		}, e))
	}) : /* @__PURE__ */ (0, Y.jsx)(Y.Fragment, { children: "—" });
}
function om({ page: e, pageCount: t, onChange: n }) {
	return /* @__PURE__ */ (0, Y.jsxs)("footer", {
		className: "pagination",
		children: [/* @__PURE__ */ (0, Y.jsxs)("span", { children: [
			"Page ",
			e + 1,
			" of ",
			t
		] }), /* @__PURE__ */ (0, Y.jsxs)("div", { children: [/* @__PURE__ */ (0, Y.jsx)("button", {
			className: "button secondary",
			disabled: e === 0,
			onClick: () => n(e - 1),
			children: "Previous"
		}), /* @__PURE__ */ (0, Y.jsx)("button", {
			className: "button secondary",
			disabled: e === t - 1,
			onClick: () => n(e + 1),
			children: "Next"
		})] })]
	});
}
function sm({ issue: e, onIgnore: t }) {
	let [n, r] = (0, M.useState)(!1), i = e.status || e.issue_status || "open", a = ![
		"ignored",
		"resolved",
		"accepted_risk",
		"false_positive"
	].includes(String(i).toLowerCase());
	return /* @__PURE__ */ (0, Y.jsxs)("article", {
		className: "finding",
		children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
			className: "finding-main",
			children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "finding-copy",
				children: [
					/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "finding-heading",
						children: [/* @__PURE__ */ (0, Y.jsx)("h4", { children: zp(e.title, "Untitled finding") }), /* @__PURE__ */ (0, Y.jsx)(Gp, { value: i })]
					}),
					/* @__PURE__ */ (0, Y.jsxs)("p", {
						className: "finding-meta",
						children: [
							/* @__PURE__ */ (0, Y.jsx)("code", {
								className: "finding-id",
								children: zp(e.id)
							}),
							/* @__PURE__ */ (0, Y.jsx)("i", { children: "|" }),
							zp(e.repository, "Unknown repository"),
							" ",
							/* @__PURE__ */ (0, Y.jsx)("i", { children: "|" }),
							" ",
							Bp(e.last_seen_at)
						]
					}),
					/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "finding-links finding-row-links",
						children: [
							/* @__PURE__ */ (0, Y.jsx)("button", {
								className: "finding-link",
								onClick: () => r(!n),
								children: n ? "Hide detail" : "View detail"
							}),
							e.jira_key && e.jira_url && /* @__PURE__ */ (0, Y.jsxs)("a", {
								className: "finding-link",
								href: e.jira_url,
								target: "_blank",
								rel: "noreferrer",
								children: [e.jira_key, /* @__PURE__ */ (0, Y.jsx)(gp, { size: 12 })]
							}),
							e.pr_url && /* @__PURE__ */ (0, Y.jsxs)("a", {
								className: "finding-link",
								href: e.pr_url,
								target: "_blank",
								rel: "noreferrer",
								children: ["Pull request", /* @__PURE__ */ (0, Y.jsx)(gp, { size: 12 })]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, Y.jsx)("div", {
				className: "finding-actions",
				children: a && /* @__PURE__ */ (0, Y.jsx)("button", {
					className: "button secondary",
					onClick: t,
					children: "Mark ignored"
				})
			})]
		}), n && /* @__PURE__ */ (0, Y.jsxs)("div", {
			className: "finding-detail",
			children: [
				/* @__PURE__ */ (0, Y.jsx)(cm, {
					label: "Impact",
					value: e.impact
				}),
				/* @__PURE__ */ (0, Y.jsx)(cm, {
					label: "Trigger",
					value: e.trigger
				}),
				/* @__PURE__ */ (0, Y.jsx)(cm, {
					label: "Root cause",
					value: e.root_cause
				}),
				/* @__PURE__ */ (0, Y.jsx)(cm, {
					label: "Code",
					value: e.code_snippet,
					code: !0
				}),
				/* @__PURE__ */ (0, Y.jsx)(cm, {
					label: "Recommended correction",
					value: e.suggestion
				}),
				/* @__PURE__ */ (0, Y.jsx)(cm, {
					label: "Validation",
					value: e.validation
				})
			]
		})]
	});
}
function cm({ label: e, value: t, code: n = !1 }) {
	return /* @__PURE__ */ (0, Y.jsxs)("section", {
		className: "finding-detail-row",
		children: [/* @__PURE__ */ (0, Y.jsx)("h5", { children: e }), n ? /* @__PURE__ */ (0, Y.jsx)("pre", { children: /* @__PURE__ */ (0, Y.jsx)("code", { children: zp(t, "No code snippet was captured for this historical finding.") }) }) : /* @__PURE__ */ (0, Y.jsx)("p", { children: zp(t, "Not recorded.") })]
	});
}
function lm({ onClose: e, onConfirm: t }) {
	let [n, r] = (0, M.useState)("");
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: e,
		children: /* @__PURE__ */ (0, Y.jsxs)("section", {
			className: "modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Ignore finding",
			onMouseDown: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "modal-body compact",
				children: [/* @__PURE__ */ (0, Y.jsx)("strong", { children: "Mark this finding as ignored?" }), /* @__PURE__ */ (0, Y.jsx)($, {
					label: "Reason (optional)",
					children: /* @__PURE__ */ (0, Y.jsx)("textarea", {
						className: "ignore-reason",
						rows: 2,
						autoFocus: !0,
						value: n,
						onChange: (e) => r(e.target.value),
						placeholder: "Why is this safe to ignore?"
					})
				})]
			}), /* @__PURE__ */ (0, Y.jsxs)("footer", { children: [/* @__PURE__ */ (0, Y.jsx)("button", {
				className: "button",
				onClick: e,
				children: "Cancel"
			}), /* @__PURE__ */ (0, Y.jsx)("button", {
				className: "button primary",
				onClick: () => t(n),
				children: "Mark ignored"
			})] })]
		})
	});
}
function um({ data: e, project: t, notify: n, reload: r }) {
	let i = e.delivery || {}, a = i.current || {}, o = i.runs || [], s = a.stages || [], c = i.scheduler_activity || [], l = i.available_stories || [], [u, d] = (0, M.useState)(null), [f, p] = (0, M.useState)(null), [m, h] = (0, M.useState)(""), [g, _] = (0, M.useState)(""), [v, y] = (0, M.useState)(!1), [b, x] = (0, M.useState)(!1), [S, C] = (0, M.useState)(!1), [w, T] = (0, M.useState)(!1), [E, ee] = (0, M.useState)(""), [D, te] = (0, M.useState)(!1), [ne, re] = (0, M.useState)(""), [ie, O] = (0, M.useState)(!1), [k, ae] = (0, M.useState)(""), [oe, se] = (0, M.useState)(null), [ce, le] = (0, M.useState)(""), [A, ue] = (0, M.useState)(Date.now()), de = /in_progress|running/i.test(String(a.delivery_status || "")), j = (() => {
		let e = [], t = /* @__PURE__ */ new Set(), n = (n, r = "") => {
			let i = n.trim();
			!i || t.has(i.toLowerCase()) || (t.add(i.toLowerCase()), e.push({
				value: i,
				label: r ? `${i} · ${r}` : i
			}));
		};
		for (let e of l) n(String(e.story || e.jira_key || ""), String(e.title || ""));
		let r = String(a.story_id || a.jira_key || "").trim();
		return r && /failed|blocked|not_started/i.test(String(a.delivery_status || "")) && n(r, String(a.story_title || "")), e;
	})(), fe = (0, M.useCallback)(async (e = a.run_id || "", n = !1) => {
		n || y(!0);
		try {
			let n = await Wp(`/api/delivery/log?run_id=${encodeURIComponent(e)}`, t);
			h(n.content || "No log content recorded."), _("");
		} catch (e) {
			_(e instanceof Error ? e.message : "Unable to load delivery log");
		} finally {
			y(!1);
		}
	}, [a.run_id, t]);
	(0, M.useEffect)(() => {
		if (!de) return;
		let e = window.setInterval(() => ue(Date.now()), 1e3);
		return () => window.clearInterval(e);
	}, [de]);
	let pe = !!(u && de && u.run_id === a.run_id && /in_progress|running/i.test(String(u.status || "")));
	(0, M.useEffect)(() => {
		if (!pe || !u) return;
		let e = window.setInterval(() => void fe(u.run_id, !0), 2e3);
		return () => window.clearInterval(e);
	}, [
		u,
		pe,
		fe
	]);
	let me = async (e, t = a.run_id || "") => {
		d({
			...e,
			run_id: t
		}), h(""), _(""), await fe(t);
	}, he = async () => {
		x(!0), h(""), _(""), y(!0);
		try {
			let e = await Wp("/api/delivery/scheduler-log", t);
			h(e.content || "No scheduler output recorded.");
		} catch (e) {
			_(e instanceof Error ? e.message : "Unable to load scheduler log");
		} finally {
			y(!1);
		}
	}, ge = async () => {
		T(!0), ee("");
		try {
			await Wp("/api/delivery/retry", t, {
				method: "POST",
				json: {}
			}), C(!1), n("Delivery retry started", "success"), await r().catch(() => void 0);
		} catch (e) {
			let t = e instanceof Error ? e.message : "Unable to retry delivery";
			ee(t === "Not found" ? "Dashboard is still running an older version. Run `lumen dashboard stop --project …`, then open the dashboard again." : t);
		} finally {
			T(!1);
		}
	}, _e = () => {
		ae(""), re(j[0]?.value || ""), te(!0);
	}, ve = async () => {
		let e = ne.trim();
		if (!e) {
			n("Select a story to start", "error");
			return;
		}
		O(!0), ae("");
		try {
			await Wp("/api/delivery/start", t, {
				method: "POST",
				json: { story: e }
			}), te(!1), n(`Delivery started for ${e}`, "success"), await r().catch(() => void 0);
		} catch (e) {
			let t = e instanceof Error ? e.message : "Unable to start delivery";
			ae(t), n(t, "error");
		} finally {
			O(!1);
		}
	}, ye = async () => {
		if (window.confirm("Stop this delivery and remove its worktrees?")) {
			O(!0), ae("");
			try {
				await Wp("/api/delivery/stop", t, {
					method: "POST",
					json: {}
				}), n("Delivery stopped", "success"), await r();
			} catch (e) {
				let t = e instanceof Error ? e.message : "Unable to stop delivery";
				ae(t), n(t, "error");
			} finally {
				O(!1);
			}
		}
	}, be = async (e) => {
		try {
			let n = await Wp(`/api/delivery/trace?run_id=${encodeURIComponent(e)}`, t);
			d({
				label: "Trace",
				duration: "Agent evidence",
				detail: "Redacted local execution evidence",
				run_id: e
			}), h(JSON.stringify(n, null, 2)), _("");
		} catch (e) {
			ae(e instanceof Error ? e.message : "Unable to load trace");
		}
	}, xe = async () => {
		let e = String(oe?.run_id || "").trim();
		if (e) {
			le(e), ae("");
			try {
				await Wp("/api/delivery/history/delete", t, {
					method: "POST",
					json: { run_id: e }
				}), se(null), n("Delivery history deleted", "success"), await r().catch(() => void 0);
			} catch (e) {
				let t = e instanceof Error ? e.message : "Unable to delete delivery history";
				ae(t), n(t, "error");
			} finally {
				le("");
			}
		}
	}, Se = /failed|blocked/i.test(String(a.delivery_status || ""));
	return /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [
		/* @__PURE__ */ (0, Y.jsxs)(em, {
			title: "Current Progress",
			className: "delivery-summary",
			action: /* @__PURE__ */ (0, Y.jsxs)("span", {
				className: "panel-actions",
				children: [
					!de && j.length > 0 && /* @__PURE__ */ (0, Y.jsxs)("button", {
						className: "button secondary",
						disabled: ie,
						onClick: _e,
						children: [/* @__PURE__ */ (0, Y.jsx)(Tp, { size: 14 }), "Start"]
					}),
					de && /* @__PURE__ */ (0, Y.jsx)("button", {
						className: "button danger secondary",
						disabled: ie,
						onClick: () => void ye(),
						children: "Stop"
					}),
					Se && /* @__PURE__ */ (0, Y.jsxs)("button", {
						className: "button secondary",
						onClick: () => C(!0),
						children: [/* @__PURE__ */ (0, Y.jsx)(Ep, { size: 14 }), "Retry"]
					})
				]
			}),
			children: [
				/* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "delivery-facts",
					children: [
						/* @__PURE__ */ (0, Y.jsx)(vm, {
							label: "Current story",
							value: /* @__PURE__ */ (0, Y.jsx)(hm, {
								jiraKey: a.jira_key || a.story_id,
								title: a.story_title
							})
						}),
						/* @__PURE__ */ (0, Y.jsx)(vm, {
							label: "Status",
							value: /* @__PURE__ */ (0, Y.jsx)(Gp, { value: a.delivery_status || "not started" })
						}),
						/* @__PURE__ */ (0, Y.jsx)(vm, {
							label: "Elapsed",
							value: Vp(a.started_at, a.finished_at || (de ? new Date(A).toISOString() : void 0))
						}),
						/* @__PURE__ */ (0, Y.jsx)(vm, {
							label: "Finished",
							value: de ? "Running" : Bp(a.finished_at)
						})
					]
				}),
				k && /* @__PURE__ */ (0, Y.jsx)("div", {
					className: "status-note",
					children: k
				}),
				/* @__PURE__ */ (0, Y.jsx)(gm, {
					stages: s,
					deliveryStatus: String(a.delivery_status || ""),
					currentStep: String(a.current_step || ""),
					startedAt: a.started_at,
					finishedAt: a.finished_at,
					remediation: a.remediation,
					now: A,
					onStageClick: me
				})
			]
		}),
		/* @__PURE__ */ (0, Y.jsx)(em, {
			title: "Delivery History",
			className: "history-panel",
			action: /* @__PURE__ */ (0, Y.jsxs)("span", {
				className: "muted",
				children: [o.length, " runs"]
			}),
			children: /* @__PURE__ */ (0, Y.jsx)("div", {
				className: "table-scroll",
				children: /* @__PURE__ */ (0, Y.jsxs)("table", { children: [/* @__PURE__ */ (0, Y.jsx)("thead", { children: /* @__PURE__ */ (0, Y.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, Y.jsx)("th", { children: "Story" }),
					/* @__PURE__ */ (0, Y.jsx)("th", { children: "Finished" }),
					/* @__PURE__ */ (0, Y.jsx)("th", { children: "Status" }),
					/* @__PURE__ */ (0, Y.jsx)("th", { children: "Pull requests" }),
					/* @__PURE__ */ (0, Y.jsx)("th", { children: "Checks" }),
					/* @__PURE__ */ (0, Y.jsx)("th", { children: "Duration" }),
					/* @__PURE__ */ (0, Y.jsx)("th", { children: "Trace" }),
					/* @__PURE__ */ (0, Y.jsx)("th", { children: "Operation" })
				] }) }), /* @__PURE__ */ (0, Y.jsx)("tbody", { children: o.length ? o.map((e) => {
					let t = e.verification || [], n = t.filter((e) => e.status === "failed"), r = n.length || /failed|blocked/i.test(String(e.status));
					return /* @__PURE__ */ (0, Y.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, Y.jsx)("td", { children: /* @__PURE__ */ (0, Y.jsxs)("div", {
							className: "history-story",
							children: [/* @__PURE__ */ (0, Y.jsxs)("span", {
								className: "history-story-line",
								children: [/* @__PURE__ */ (0, Y.jsx)("code", { children: zp(e.jira_key || e.story || e.run_id) }), e.story_title && /* @__PURE__ */ (0, Y.jsx)("span", {
									className: "history-story-title",
									children: e.story_title
								})]
							}), /* @__PURE__ */ (0, Y.jsx)("small", { children: zp(e.branch, "") })]
						}) }),
						/* @__PURE__ */ (0, Y.jsx)("td", { children: Bp(e.finished_at || e.started_at) }),
						/* @__PURE__ */ (0, Y.jsx)("td", { children: r ? /* @__PURE__ */ (0, Y.jsx)("button", {
							className: "status-badge-button",
							title: "Open failure log",
							onClick: () => void me({
								label: "Delivery failure",
								duration: Vp(e.started_at, e.finished_at),
								detail: n.map((e) => e.summary || e.label).filter(Boolean).join(" · ") || "Open the delivery log for details."
							}, e.run_id),
							children: /* @__PURE__ */ (0, Y.jsx)(Gp, { value: e.status })
						}) : /* @__PURE__ */ (0, Y.jsx)(Gp, { value: e.status }) }),
						/* @__PURE__ */ (0, Y.jsx)("td", { children: /* @__PURE__ */ (0, Y.jsx)(ym, { items: e.pull_requests || [] }) }),
						/* @__PURE__ */ (0, Y.jsx)("td", { children: /* @__PURE__ */ (0, Y.jsx)(bm, {
							checks: t,
							onClick: () => p(t)
						}) }),
						/* @__PURE__ */ (0, Y.jsx)("td", { children: Vp(e.started_at, e.finished_at) }),
						/* @__PURE__ */ (0, Y.jsx)("td", { children: e.agent_trace && /* @__PURE__ */ (0, Y.jsx)("button", {
							className: "text-button",
							onClick: () => void be(e.run_id),
							children: "View trace"
						}) }),
						/* @__PURE__ */ (0, Y.jsx)("td", { children: /* @__PURE__ */ (0, Y.jsx)($p, {
							label: "Delete delivery record",
							danger: !0,
							disabled: ce === e.run_id,
							onClick: () => se(e),
							children: /* @__PURE__ */ (0, Y.jsx)(Np, { size: 15 })
						}) })
					] }, e.run_id);
				}) : /* @__PURE__ */ (0, Y.jsx)("tr", { children: /* @__PURE__ */ (0, Y.jsx)("td", {
					colSpan: 8,
					children: /* @__PURE__ */ (0, Y.jsx)(im, { label: "No delivery history yet." })
				}) }) })] })
			})
		}),
		/* @__PURE__ */ (0, Y.jsx)(em, {
			title: "Scheduler Activity",
			action: /* @__PURE__ */ (0, Y.jsxs)("span", {
				className: "panel-actions",
				children: [/* @__PURE__ */ (0, Y.jsxs)("span", {
					className: "muted",
					children: [c.length, " recent events"]
				}), i.scheduler_log_available && /* @__PURE__ */ (0, Y.jsxs)("button", {
					className: "button secondary",
					onClick: () => void he(),
					children: [/* @__PURE__ */ (0, Y.jsx)(Mp, { size: 14 }), "View raw log"]
				})]
			}),
			children: /* @__PURE__ */ (0, Y.jsx)("div", {
				className: "scheduler-activity",
				children: c.length ? c.map((e, t) => /* @__PURE__ */ (0, Y.jsxs)("article", {
					className: "scheduler-event",
					children: [
						/* @__PURE__ */ (0, Y.jsx)(Gp, { value: e.outcome }),
						/* @__PURE__ */ (0, Y.jsxs)("div", { children: [/* @__PURE__ */ (0, Y.jsx)("strong", { children: zp(e.story_id || e.jira_key, "Workspace") }), /* @__PURE__ */ (0, Y.jsx)("p", { children: zp(e.message) })] }),
						/* @__PURE__ */ (0, Y.jsx)("time", { children: Bp(e.at) })
					]
				}, `${e.at}-${t}`)) : /* @__PURE__ */ (0, Y.jsx)(im, { label: "No scheduled delivery activity recorded yet." })
			})
		}),
		u && /* @__PURE__ */ (0, Y.jsx)(_m, {
			stage: u,
			content: m,
			error: g,
			loading: v,
			live: pe,
			onClose: () => d(null)
		}),
		b && /* @__PURE__ */ (0, Y.jsx)(_m, {
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
		f && /* @__PURE__ */ (0, Y.jsx)(xm, {
			checks: f,
			onClose: () => p(null)
		}),
		S && /* @__PURE__ */ (0, Y.jsx)(fm, {
			story: zp(a.jira_key || a.story_id),
			busy: w,
			error: E,
			onClose: () => C(!1),
			onConfirm: () => void ge()
		}),
		D && /* @__PURE__ */ (0, Y.jsx)(dm, {
			stories: j,
			value: ne,
			onChange: re,
			busy: ie,
			error: k,
			onClose: () => te(!1),
			onConfirm: () => void ve()
		}),
		oe && /* @__PURE__ */ (0, Y.jsx)(pm, {
			run: oe,
			busy: !!ce,
			onClose: () => se(null),
			onConfirm: () => void xe()
		})
	] });
}
function dm({ stories: e, value: t, onChange: n, busy: r, error: i, onClose: a, onConfirm: o }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: r ? void 0 : a,
		children: /* @__PURE__ */ (0, Y.jsxs)("section", {
			className: "modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Start delivery",
			onMouseDown: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "modal-body compact",
				children: [
					/* @__PURE__ */ (0, Y.jsx)("strong", { children: "Start delivery" }),
					/* @__PURE__ */ (0, Y.jsx)("p", {
						className: "modal-copy",
						children: "Choose a ready story to launch."
					}),
					/* @__PURE__ */ (0, Y.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, Y.jsx)("span", { children: "Story" }), /* @__PURE__ */ (0, Y.jsx)("select", {
							value: t,
							onChange: (e) => n(e.target.value),
							disabled: r || e.length === 0,
							children: e.length ? e.map((e) => /* @__PURE__ */ (0, Y.jsx)("option", {
								value: e.value,
								children: e.label
							}, e.value)) : /* @__PURE__ */ (0, Y.jsx)("option", {
								value: "",
								children: "No ready stories"
							})
						})]
					}),
					i && /* @__PURE__ */ (0, Y.jsx)("p", {
						className: "status-note",
						children: i
					})
				]
			}), /* @__PURE__ */ (0, Y.jsxs)("footer", { children: [/* @__PURE__ */ (0, Y.jsx)("button", {
				className: "button",
				disabled: r,
				onClick: a,
				children: "Cancel"
			}), /* @__PURE__ */ (0, Y.jsxs)("button", {
				className: "button primary",
				disabled: r || !t,
				onClick: o,
				children: [/* @__PURE__ */ (0, Y.jsx)(Tp, { size: 14 }), r ? "Starting…" : "Start"]
			})] })]
		})
	});
}
function fm({ story: e, busy: t, error: n, onClose: r, onConfirm: i }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: t ? void 0 : r,
		children: /* @__PURE__ */ (0, Y.jsxs)("section", {
			className: "modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Reset and retry delivery",
			onMouseDown: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "modal-body compact",
				children: [
					/* @__PURE__ */ (0, Y.jsxs)("strong", { children: [
						"Reset and retry ",
						e,
						"?"
					] }),
					/* @__PURE__ */ (0, Y.jsx)("p", { children: "This removes the Story worktrees, resets its Delivery and JIRA status, then starts a new run. The failed run and logs stay in history." }),
					n && /* @__PURE__ */ (0, Y.jsx)("p", {
						className: "status-note",
						children: n
					})
				]
			}), /* @__PURE__ */ (0, Y.jsxs)("footer", { children: [/* @__PURE__ */ (0, Y.jsx)("button", {
				className: "button",
				disabled: t,
				onClick: r,
				children: "Cancel"
			}), /* @__PURE__ */ (0, Y.jsxs)("button", {
				className: "button primary",
				disabled: t,
				onClick: i,
				children: [/* @__PURE__ */ (0, Y.jsx)(Ep, { size: 14 }), t ? "Starting…" : "Retry"]
			})] })]
		})
	});
}
function pm({ run: e, busy: t, onClose: n, onConfirm: r }) {
	let i = zp(e.jira_key || e.story || e.run_id);
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: t ? void 0 : n,
		children: /* @__PURE__ */ (0, Y.jsxs)("section", {
			className: "modal delete-history-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Delete delivery history",
			onMouseDown: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "modal-body compact",
				children: [/* @__PURE__ */ (0, Y.jsx)("strong", { children: "Delete delivery history?" }), /* @__PURE__ */ (0, Y.jsxs)("p", {
					className: "modal-copy",
					children: [
						"This removes the ",
						i,
						" record, log, and trace files. This action cannot be undone."
					]
				})]
			}), /* @__PURE__ */ (0, Y.jsxs)("footer", { children: [/* @__PURE__ */ (0, Y.jsx)("button", {
				className: "button",
				disabled: t,
				onClick: n,
				children: "Cancel"
			}), /* @__PURE__ */ (0, Y.jsxs)("button", {
				className: "button danger delete-confirm",
				disabled: t,
				onClick: r,
				children: [/* @__PURE__ */ (0, Y.jsx)(Np, { size: 14 }), t ? "Deleting…" : "Delete record"]
			})] })]
		})
	});
}
function mm({ project: e, notify: t, onDirtyChange: n }) {
	let r = new URLSearchParams(window.location.search).get("story") || "", [i, a] = (0, M.useState)([]), [o, s] = (0, M.useState)(r), [c, l] = (0, M.useState)(""), [u, d] = (0, M.useState)(""), [f, p] = (0, M.useState)(""), [m, h] = (0, M.useState)(""), [g, _] = (0, M.useState)(""), [v, y] = (0, M.useState)(""), [b, x] = (0, M.useState)(""), [S, C] = (0, M.useState)({
		story: "",
		plan: ""
	}), [w, T] = (0, M.useState)("story"), [E, ee] = (0, M.useState)(!1), [D, te] = (0, M.useState)(!0), [ne, re] = (0, M.useState)(!1), [ie, O] = (0, M.useState)(!1), k = v !== S.story || b !== S.plan;
	(0, M.useEffect)(() => {
		n(k);
	}, [k, n]), (0, M.useEffect)(() => {
		let e = (e) => {
			k && (e.preventDefault(), e.returnValue = "");
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, [k]);
	let ae = (0, M.useCallback)(async () => {
		te(!0);
		try {
			let t = await Wp("/api/stories", e), n = Array.isArray(t.stories) ? t.stories : [];
			a(n), s((e) => e && n.some((t) => t.story === e) ? e : String(n[0]?.story || ""));
		} catch (e) {
			t(e instanceof Error ? e.message : "Unable to load stories", "error");
		} finally {
			te(!1);
		}
	}, [e, t]), oe = (0, M.useCallback)(async (n) => {
		if (n) {
			re(!0), ee(!1), T("story");
			try {
				let t = await Wp(`/api/stories/content?story=${encodeURIComponent(n)}`, e), r = String(t.story_markdown || ""), i = String(t.plan_markdown || "");
				l(String(t.title || n)), d(String(t.jira_key || "")), p(String(t.jira_url || "")), h(String(t.businessStatus || "")), _(String(t.technicalStatus || "")), y(r), x(i), C({
					story: r,
					plan: i
				});
				let a = new URL(window.location.href);
				a.searchParams.set("story", n), window.history.replaceState({}, "", `${a.pathname}${a.search}`);
			} catch (e) {
				t(e instanceof Error ? e.message : "Unable to load story content", "error");
			} finally {
				re(!1);
			}
		}
	}, [e, t]);
	(0, M.useEffect)(() => {
		ae();
	}, [ae]), (0, M.useEffect)(() => {
		o && oe(o);
	}, [o, oe]);
	let se = (e) => {
		e !== o && (k && !window.confirm("You have unsaved Observatory changes. Switch stories without saving?") || s(e));
	}, ce = async () => {
		if (!(!o || !k)) {
			O(!0);
			try {
				let n = await Wp("/api/stories/content", e, {
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
				}), ee(!1), t(String(n.subject || "Story docs saved"), "success"), await ae();
			} catch (e) {
				t(e instanceof Error ? e.message : "Unable to save story docs", "error");
			} finally {
				O(!1);
			}
		}
	}, le = zp(u || o);
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "observatory-layout",
		children: [/* @__PURE__ */ (0, Y.jsxs)("aside", {
			className: "observatory-list panel",
			children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "panel-header",
				children: [/* @__PURE__ */ (0, Y.jsx)("h3", { children: "Stories" }), /* @__PURE__ */ (0, Y.jsx)("span", {
					className: "muted",
					children: i.length
				})]
			}), /* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "observatory-list-body",
				children: [
					D ? /* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "loading-state",
						children: [/* @__PURE__ */ (0, Y.jsx)(Sp, {
							size: 18,
							className: "spin"
						}), " Loading…"]
					}) : null,
					!D && !i.length ? /* @__PURE__ */ (0, Y.jsx)(im, { label: "No stories found in the docs repository." }) : null,
					i.map((e) => {
						let t = zp(e.jira_key || e.story);
						return /* @__PURE__ */ (0, Y.jsxs)("button", {
							className: `observatory-story ${o === e.story ? "selected" : ""}`,
							onClick: () => se(String(e.story)),
							children: [/* @__PURE__ */ (0, Y.jsxs)("strong", { children: [/* @__PURE__ */ (0, Y.jsx)("span", {
								className: "observatory-key",
								children: t
							}), /* @__PURE__ */ (0, Y.jsx)("span", {
								className: "observatory-story-title",
								children: zp(e.title, e.story)
							})] }), /* @__PURE__ */ (0, Y.jsx)(qp, {
								business: String(e.businessStatus || "draft"),
								technical: String(e.technicalStatus || "draft")
							})]
						}, e.story);
					})
				]
			})]
		}), /* @__PURE__ */ (0, Y.jsx)("section", {
			className: "observatory-detail",
			children: o ? /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [/* @__PURE__ */ (0, Y.jsx)("div", {
				className: "observatory-header panel",
				children: /* @__PURE__ */ (0, Y.jsxs)("div", { children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "observatory-title-row",
					children: [/* @__PURE__ */ (0, Y.jsxs)("h2", { children: [f ? /* @__PURE__ */ (0, Y.jsxs)("a", {
						className: "observatory-key",
						href: f,
						target: "_blank",
						rel: "noreferrer",
						children: [
							le,
							" ",
							/* @__PURE__ */ (0, Y.jsx)(gp, { size: 12 })
						]
					}) : /* @__PURE__ */ (0, Y.jsx)("span", {
						className: "observatory-key",
						children: le
					}), /* @__PURE__ */ (0, Y.jsx)("span", {
						className: "observatory-heading-title",
						children: zp(c, o)
					})] }), /* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "panel-actions observatory-actions",
						children: [
							/* @__PURE__ */ (0, Y.jsx)("span", {
								className: k ? "settings-save-status unsaved" : "settings-save-status",
								children: k ? "Unsaved" : "Saved"
							}),
							/* @__PURE__ */ (0, Y.jsx)("button", {
								type: "button",
								className: "button",
								disabled: ne,
								onClick: () => ee((e) => !e),
								children: E ? "Done" : "Edit"
							}),
							/* @__PURE__ */ (0, Y.jsxs)("button", {
								type: "button",
								className: `button primary${ie ? " is-busy" : ""}`,
								disabled: !k || ie || ne,
								onClick: () => void ce(),
								children: [/* @__PURE__ */ (0, Y.jsx)(Dp, { size: 14 }), ie ? "Saving…" : "Save"]
							})
						]
					})]
				}), /* @__PURE__ */ (0, Y.jsx)("div", {
					className: "observatory-subheader",
					children: /* @__PURE__ */ (0, Y.jsx)(Kp, {
						business: m || "draft",
						technical: g || "draft"
					})
				})] })
			}), ne ? /* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "loading-state",
				children: [/* @__PURE__ */ (0, Y.jsx)(Sp, {
					size: 20,
					className: "spin"
				}), " Loading story…"]
			}) : /* @__PURE__ */ (0, Y.jsxs)("section", {
				className: "panel observatory-doc-panel",
				children: [/* @__PURE__ */ (0, Y.jsx)("header", {
					className: "panel-header",
					children: /* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "observatory-tabs",
						role: "tablist",
						children: [/* @__PURE__ */ (0, Y.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": w === "story",
							className: w === "story" ? "active" : "",
							onClick: () => T("story"),
							children: "Story"
						}), /* @__PURE__ */ (0, Y.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": w === "plan",
							className: w === "plan" ? "active" : "",
							onClick: () => T("plan"),
							children: "Technical plan"
						})]
					})
				}), w === "story" ? /* @__PURE__ */ (0, Y.jsx)(Qp, {
					value: v,
					onChange: y,
					editing: E
				}) : /* @__PURE__ */ (0, Y.jsx)(Qp, {
					value: b,
					onChange: x,
					editing: E
				})]
			})] }) : /* @__PURE__ */ (0, Y.jsx)(im, { label: "Select a story to inspect." })
		})]
	});
}
function hm({ jiraKey: e, title: t }) {
	return /* @__PURE__ */ (0, Y.jsx)("span", {
		className: "story-reference",
		children: t ? /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [/* @__PURE__ */ (0, Y.jsx)("code", { children: zp(e) }), /* @__PURE__ */ (0, Y.jsx)("span", {
			className: "story-reference-title",
			children: t
		})] }) : /* @__PURE__ */ (0, Y.jsx)("code", { children: zp(e, "No active delivery") })
	});
}
function gm({ stages: e, deliveryStatus: t, currentStep: n, startedAt: r, finishedAt: i, remediation: a, now: o, onStageClick: s }) {
	let c = /completed|dev_done|pr_open/i.test(t), l = /stopped from dashboard/i.test(String(n || "")), u = a?.status === "in_progress", d = u ? `${a.attempt}/${a.max_attempts}` : "", f = e.map((e) => {
		let t = String(e.status || "pending").toLowerCase();
		return c || t === "completed" ? "completed" : /running|progress/.test(t) ? "running" : l && /fail|block/.test(t) ? "stopped" : /fail|block/.test(t) ? "failed" : "pending";
	}).reduce((e, t) => e + (t === "completed" ? 1 : t === "running" ? .5 : 0), 0), p = e.length > 1 ? Math.max(0, Math.min(100, (f - 1) / (e.length - 1) * 100)) : 100;
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "delivery-flow",
		children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
			className: "flow-heading",
			children: [/* @__PURE__ */ (0, Y.jsxs)("div", { children: [/* @__PURE__ */ (0, Y.jsx)("span", {
				className: "flow-title",
				children: "Delivery Flow"
			}), u && /* @__PURE__ */ (0, Y.jsxs)("strong", {
				className: "remediation-alert",
				children: [
					/* @__PURE__ */ (0, Y.jsx)(Ep, { size: 13 }),
					"Verification failed · Remediation retry ",
					d
				]
			})] }), /* @__PURE__ */ (0, Y.jsxs)("p", { children: [r ? `Started ${Bp(r)}` : "Awaiting delivery trigger", i ? ` · Finished ${Bp(i)}` : ""] })]
		}), /* @__PURE__ */ (0, Y.jsxs)("div", {
			className: "flow-track-wrap",
			children: [/* @__PURE__ */ (0, Y.jsx)("span", {
				className: "flow-track",
				children: /* @__PURE__ */ (0, Y.jsx)("i", { style: { width: `${p}%` } })
			}), /* @__PURE__ */ (0, Y.jsx)("ol", {
				className: "flow-steps",
				style: { "--flow-count": e.length },
				children: e.map((e, t) => {
					let n = String(e.status || "pending").toLowerCase(), r = c || n === "completed" ? "completed" : /running|progress/.test(n) ? "running" : l && /fail|block/.test(n) ? "stopped" : /fail|block/.test(n) ? "failed" : "pending", i = r === "running" ? Vp(e.active_started_at || e.started_at, new Date(o).toISOString()) : e.duration || "Pending", a = Array.isArray(e.attempts) && e.attempts.length > 1 ? ` · ${e.attempts.length} attempts` : "", f = r === "stopped" ? "Stopped" : u && r === "running" && ["implement", "verification"].includes(e.id) ? `Retry ${d} · ${i}` : u && e.id === "verification" && r === "failed" ? `Failed · remediation ${d}` : r === "failed" ? "Needs attention" : `${i}${a}`;
					return /* @__PURE__ */ (0, Y.jsx)("li", {
						className: `flow-step ${r}`,
						children: /* @__PURE__ */ (0, Y.jsxs)("button", {
							className: "flow-stage-button",
							onClick: () => s(e),
							children: [/* @__PURE__ */ (0, Y.jsx)("span", {
								className: "flow-marker",
								children: r === "completed" ? "✓" : r === "running" ? /* @__PURE__ */ (0, Y.jsx)("span", { className: "pulse-dot" }) : t + 1
							}), /* @__PURE__ */ (0, Y.jsxs)("span", {
								className: "flow-copy",
								children: [/* @__PURE__ */ (0, Y.jsx)("strong", { children: zp(e.label) }), /* @__PURE__ */ (0, Y.jsx)("span", { children: f })]
							})]
						})
					}, `${e.label}-${t}`);
				})
			})]
		})]
	});
}
function _m({ stage: e, content: t, error: n, loading: r, live: i = !1, onClose: a }) {
	let o = (0, M.useRef)(null);
	return (0, M.useEffect)(() => {
		i && o.current && (o.current.scrollTop = o.current.scrollHeight);
	}, [t, i]), /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: a,
		children: /* @__PURE__ */ (0, Y.jsxs)("section", {
			className: "modal delivery-log-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": `${e.label} log`,
			onMouseDown: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "delivery-log-header",
				children: [/* @__PURE__ */ (0, Y.jsxs)("div", { children: [
					/* @__PURE__ */ (0, Y.jsx)("span", { children: e.label }),
					/* @__PURE__ */ (0, Y.jsxs)("strong", { children: [e.duration || "—", i && /* @__PURE__ */ (0, Y.jsxs)("em", {
						className: "live-log",
						children: [/* @__PURE__ */ (0, Y.jsx)("i", {}), "Live"]
					})] }),
					/* @__PURE__ */ (0, Y.jsx)("p", { children: e.detail || "Delivery log excerpt" }),
					Array.isArray(e.attempts) && e.attempts.length > 0 && /* @__PURE__ */ (0, Y.jsx)("small", {
						className: "stage-attempts",
						children: e.attempts.map((e) => `Attempt ${e.number}: ${e.duration}`).join(" · ")
					})
				] }), /* @__PURE__ */ (0, Y.jsx)("button", {
					className: "button secondary",
					onClick: a,
					children: "Close"
				})]
			}), /* @__PURE__ */ (0, Y.jsx)("pre", {
				ref: o,
				className: "delivery-log-content",
				children: /* @__PURE__ */ (0, Y.jsx)("code", { children: r && !t ? "Loading log…" : n || t })
			})]
		})
	});
}
function vm({ label: e, value: t }) {
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "fact",
		children: [/* @__PURE__ */ (0, Y.jsx)("span", { children: e }), /* @__PURE__ */ (0, Y.jsx)("strong", { children: t })]
	});
}
function ym({ items: e }) {
	return e.length ? /* @__PURE__ */ (0, Y.jsx)("span", {
		className: "pr-links",
		children: e.map((e, t) => /* @__PURE__ */ (0, Y.jsxs)("a", {
			href: e.url,
			target: "_blank",
			rel: "noreferrer",
			children: [
				zp(e.repository, "Pull request"),
				String(e.url || "").match(/\/(\d+)\/?$/) ? ` #${String(e.url).match(/\/(\d+)\/?$/)?.[1]}` : "",
				/* @__PURE__ */ (0, Y.jsx)(gp, { size: 12 })
			]
		}, `${e.url}-${t}`))
	}) : /* @__PURE__ */ (0, Y.jsx)(Y.Fragment, { children: "—" });
}
function bm({ checks: e, onClick: t }) {
	let n = e.filter((e) => e.status === "failed").length, r = e.filter((e) => e.status === "passed").length;
	return e.length ? /* @__PURE__ */ (0, Y.jsx)("button", {
		className: `check-summary ${n ? "failed" : ""}`,
		title: "Open verification details",
		onClick: t,
		children: n ? `${n} failed` : `${r}/${e.length} passed`
	}) : /* @__PURE__ */ (0, Y.jsx)(Y.Fragment, { children: "—" });
}
function xm({ checks: e, onClose: t }) {
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: t,
		children: /* @__PURE__ */ (0, Y.jsxs)("section", {
			className: "modal verification-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Verification checks",
			onMouseDown: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "delivery-log-header",
				children: [/* @__PURE__ */ (0, Y.jsxs)("div", { children: [
					/* @__PURE__ */ (0, Y.jsx)("span", { children: "Verification" }),
					/* @__PURE__ */ (0, Y.jsx)("strong", { children: "Checks" }),
					/* @__PURE__ */ (0, Y.jsxs)("p", { children: [
						e.filter((e) => e.status === "passed").length,
						" passed · ",
						e.filter((e) => e.status === "failed").length,
						" failed · ",
						e.filter((e) => e.status === "skipped").length,
						" skipped"
					] })
				] }), /* @__PURE__ */ (0, Y.jsx)("button", {
					className: "button secondary",
					onClick: t,
					children: "Close"
				})]
			}), /* @__PURE__ */ (0, Y.jsx)("div", {
				className: "verification-list",
				children: e.map((e, t) => /* @__PURE__ */ (0, Y.jsxs)("article", {
					className: "verification-check",
					children: [
						/* @__PURE__ */ (0, Y.jsxs)("div", { children: [/* @__PURE__ */ (0, Y.jsx)("strong", { children: zp(e.label) }), /* @__PURE__ */ (0, Y.jsx)("span", { children: zp(e.repository, "Workspace") })] }),
						/* @__PURE__ */ (0, Y.jsx)(Gp, { value: e.status }),
						/* @__PURE__ */ (0, Y.jsx)("p", { children: zp(e.summary, "No summary recorded.") }),
						e.command && /* @__PURE__ */ (0, Y.jsx)("code", { children: e.command })
					]
				}, `${e.repository}-${e.id}-${t}`))
			})]
		})
	});
}
var Sm = {
	"01-role-and-mission.md": {
		title: "Mission",
		description: "Scope, role, and review posture",
		icon: jp
	},
	"02-pipeline.md": {
		title: "Pipeline",
		description: "End-to-end scan sequence",
		icon: Fp
	},
	"03-configuration.md": {
		title: "Configuration",
		description: "Workspace and runtime inputs",
		icon: kp
	},
	"04-workspace-and-worktrees.md": {
		title: "Worktrees",
		description: "Repository isolation and refresh",
		icon: xp
	},
	"05-review-only-mode.md": {
		title: "Review mode",
		description: "Lightweight validation boundaries",
		icon: Op
	},
	"06-issue-registry.md": {
		title: "Issue registry",
		description: "Finding persistence and status",
		icon: up
	},
	"07-error-handling.md": {
		title: "Error handling",
		description: "Failure recording and recovery",
		icon: fp
	},
	"08-github-pr-and-git.md": {
		title: "Git and PR",
		description: "Branch, commit, and PR controls",
		icon: xp
	},
	"09-severity-guideline.md": {
		title: "Severity",
		description: "Finding classification policy",
		icon: up
	},
	"10-findings-and-auto-fix.md": {
		title: "Findings",
		description: "Review output and safe fixes",
		icon: mp
	},
	"11-output-contract.md": {
		title: "Output",
		description: "Structured result contract",
		icon: yp
	},
	"12-secrets-and-safety.md": {
		title: "Safety",
		description: "Secret redaction and boundaries",
		icon: Ap
	},
	"13-console-summary.md": {
		title: "Summary",
		description: "Console and report output",
		icon: dp
	},
	"01-role.md": {
		title: "Delivery role",
		description: "Delivery agent scope",
		icon: jp
	},
	"02-workspace.md": {
		title: "Context",
		description: "Story, docs, and workspace inputs",
		icon: xp
	},
	"03-implementation.md": {
		title: "Implementation",
		description: "Code changes and verification",
		icon: mp
	},
	"04-output-contract.md": {
		title: "Outcome",
		description: "PR, JIRA, and result record",
		icon: dp
	},
	"coding-guideline.md": {
		title: "Code standard",
		description: "Repository-level coding guidance",
		icon: yp
	}
};
function Cm(e) {
	return Sm[e.path] || {
		title: e.path.replace(/\.md$/, "").replace(/^\d+-/, ""),
		description: "Prompt fragment",
		icon: yp
	};
}
function wm(e, t) {
	let n = e.path;
	return t === "delivery" ? [
		"01-role.md",
		"02-workspace.md",
		"coding-guideline.md"
	].includes(n) ? "Inputs & Governance" : n === "03-implementation.md" ? "Implementation" : "Delivery Outputs" : [
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
function Tm(e) {
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
function Em({ data: e, project: t, interact: n, notify: r }) {
	let i = e.interactive?.prompts || [], [a, o] = (0, M.useState)("scan"), [s, c] = (0, M.useState)(null), [l, u] = (0, M.useState)(""), [d, f] = (0, M.useState)({
		x: 0,
		y: 0,
		scale: 1
	}), [p, m] = (0, M.useState)(!1), h = (0, M.useRef)(null), g = (0, M.useRef)(null), _ = i.filter((e) => e.mode === a), v = async (e) => {
		c(e);
		try {
			let n = await Wp(`/api/prompt?mode=${encodeURIComponent(e.mode)}&path=${encodeURIComponent(e.path)}`, t);
			u(n.content);
		} catch (e) {
			r(e instanceof Error ? e.message : "Unable to load prompt", "error");
		}
	}, y = (e) => {
		o(e), c(null), u(""), f({
			x: 0,
			y: 0,
			scale: 1
		});
	};
	(0, M.useEffect)(() => {
		if (!p) return;
		let e = (e) => {
			e.key === "Escape" && m(!1);
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [p]);
	let b = (0, M.useCallback)((e) => {
		e.preventDefault(), e.ctrlKey || e.metaKey ? f((t) => ({
			...t,
			scale: Math.max(.65, Math.min(1.55, t.scale * (e.deltaY > 0 ? .975 : 1.025)))
		})) : f((t) => ({
			...t,
			x: t.x - e.deltaX,
			y: t.y - e.deltaY
		}));
	}, []);
	(0, M.useEffect)(() => {
		let e = g.current;
		if (e) return e.addEventListener("wheel", b, { passive: !1 }), () => e.removeEventListener("wheel", b);
	}, [b]);
	let x = (e) => {
		e.target.closest("button,a,textarea,input") || (h.current = {
			id: e.pointerId,
			x: e.clientX,
			y: e.clientY
		}, e.currentTarget.setPointerCapture(e.pointerId));
	}, S = (e) => {
		if (!h.current || h.current.id !== e.pointerId) return;
		let t = e.clientX - h.current.x, n = e.clientY - h.current.y;
		h.current = {
			...h.current,
			x: e.clientX,
			y: e.clientY
		}, f((e) => ({
			...e,
			x: e.x + t,
			y: e.y + n
		}));
	}, C = (e) => {
		h.current?.id === e.pointerId && (h.current = null);
	}, w = Tm(a);
	return /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [
		/* @__PURE__ */ (0, Y.jsxs)("div", {
			className: "workflow-mode-switch",
			role: "tablist",
			children: [/* @__PURE__ */ (0, Y.jsx)("button", {
				className: a === "scan" ? "active" : "",
				onClick: () => y("scan"),
				children: "Auto Scan"
			}), /* @__PURE__ */ (0, Y.jsx)("button", {
				className: a === "delivery" ? "active" : "",
				onClick: () => y("delivery"),
				children: "Auto Delivery"
			})]
		}),
		/* @__PURE__ */ (0, Y.jsx)(em, {
			title: a === "scan" ? "Auto Scan Workflow" : "Auto Delivery Workflow",
			action: /* @__PURE__ */ (0, Y.jsx)($p, {
				label: p ? "Exit full screen" : "View full screen",
				onClick: () => m((e) => !e),
				children: p ? /* @__PURE__ */ (0, Y.jsx)(wp, { size: 14 }) : /* @__PURE__ */ (0, Y.jsx)(Cp, { size: 14 })
			}),
			className: `workflow-panel ${p ? "workflow-panel-fullscreen" : ""}`,
			children: /* @__PURE__ */ (0, Y.jsx)("div", {
				ref: g,
				className: "workflow-canvas workflow-viewport",
				onPointerDown: x,
				onPointerMove: S,
				onPointerUp: C,
				onPointerCancel: C,
				children: /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "workflow-scale",
					style: { transform: `translate(${d.x}px, ${d.y}px) scale(${d.scale})` },
					children: [/* @__PURE__ */ (0, Y.jsx)("div", {
						className: "workflow-columns",
						children: w.map((e, t) => {
							let n = _.filter((t) => e.layers.includes(wm(t, a))), r = [...e.scripts.map((e) => ({
								kind: "script",
								script: e
							})), ...n.map((e) => ({
								kind: "prompt",
								prompt: e
							}))];
							return /* @__PURE__ */ (0, Y.jsxs)("section", {
								className: "workflow-column",
								children: [
									/* @__PURE__ */ (0, Y.jsxs)("header", { children: [/* @__PURE__ */ (0, Y.jsx)("span", { children: e.eyebrow }), /* @__PURE__ */ (0, Y.jsx)("strong", { children: e.title })] }),
									/* @__PURE__ */ (0, Y.jsx)("div", {
										className: "workflow-node-stack",
										children: r.map((e, n) => {
											let r = `${t + 1}.${n + 1}`;
											if (e.kind === "script") return /* @__PURE__ */ (0, Y.jsxs)("article", {
												className: "workflow-node script-node",
												children: [
													/* @__PURE__ */ (0, Y.jsx)(Mp, { size: 14 }),
													/* @__PURE__ */ (0, Y.jsxs)("span", { children: [/* @__PURE__ */ (0, Y.jsx)("strong", { children: e.script.name }), /* @__PURE__ */ (0, Y.jsx)("small", { children: e.script.description })] }),
													/* @__PURE__ */ (0, Y.jsxs)("em", { children: [/* @__PURE__ */ (0, Y.jsx)("b", { children: r }), " SCRIPT"] })
												]
											}, e.script.name);
											let i = e.prompt, a = Cm(i), o = a.icon;
											return /* @__PURE__ */ (0, Y.jsxs)("button", {
												className: `workflow-node prompt-node ${s?.mode === i.mode && s.path === i.path ? "selected" : ""}`,
												onClick: () => void v(i),
												children: [
													/* @__PURE__ */ (0, Y.jsx)(o, { size: 14 }),
													/* @__PURE__ */ (0, Y.jsxs)("span", { children: [/* @__PURE__ */ (0, Y.jsx)("strong", { children: a.title }), /* @__PURE__ */ (0, Y.jsx)("small", { children: a.description })] }),
													/* @__PURE__ */ (0, Y.jsxs)("em", { children: [/* @__PURE__ */ (0, Y.jsx)("b", { children: r }), " PROMPT"] })
												]
											}, `${i.mode}/${i.path}`);
										})
									}),
									t < w.length - 1 && /* @__PURE__ */ (0, Y.jsx)("span", {
										className: "workflow-connector",
										"aria-hidden": "true"
									})
								]
							}, e.title);
						})
					}), /* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "workflow-retry",
						children: [/* @__PURE__ */ (0, Y.jsx)(Ep, { size: 14 }), /* @__PURE__ */ (0, Y.jsxs)("span", { children: [/* @__PURE__ */ (0, Y.jsx)("strong", { children: a === "delivery" ? "Remediation retry" : "Safe-fix re-review" }), /* @__PURE__ */ (0, Y.jsx)("small", { children: a === "delivery" ? "Verification failure → prepare_delivery_remediation.py → implementation agent → verification" : "High-confidence finding → auto_fix_sync.py → focused validation → pull request" })] })]
					})]
				})
			})
		}),
		s && /* @__PURE__ */ (0, Y.jsx)(Dm, {
			item: s,
			content: l,
			onChange: u,
			onClose: () => {
				c(null), u("");
			},
			onSave: () => void n("/api/prompt", {
				mode: s.mode,
				path: s.path,
				content: l
			}, "Prompt saved")
		})
	] });
}
function Dm({ item: e, content: t, onChange: n, onClose: r, onSave: i }) {
	let a = Cm(e);
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: r,
		children: /* @__PURE__ */ (0, Y.jsxs)("section", {
			className: "modal prompt-inspector-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": `${a.title} prompt`,
			onMouseDown: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "prompt-inspector-header",
					children: [/* @__PURE__ */ (0, Y.jsxs)("div", { children: [
						/* @__PURE__ */ (0, Y.jsxs)("span", { children: [e.mode === "scan" ? "Auto Scan" : "Auto Delivery", " prompt"] }),
						/* @__PURE__ */ (0, Y.jsx)("strong", { children: a.title }),
						/* @__PURE__ */ (0, Y.jsx)("code", { children: e.path })
					] }), /* @__PURE__ */ (0, Y.jsx)("button", {
						className: "button secondary",
						onClick: r,
						children: "Close"
					})]
				}),
				/* @__PURE__ */ (0, Y.jsx)("div", {
					className: "prompt-inspector-body",
					children: /* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "markdown-workbench",
						children: [/* @__PURE__ */ (0, Y.jsxs)("label", {
							className: "markdown-pane",
							children: [/* @__PURE__ */ (0, Y.jsx)("span", { children: "Original Markdown" }), /* @__PURE__ */ (0, Y.jsx)("textarea", {
								value: t,
								onChange: (e) => n(e.target.value),
								spellCheck: !1
							})]
						}), /* @__PURE__ */ (0, Y.jsxs)("article", {
							className: "markdown-preview",
							children: [/* @__PURE__ */ (0, Y.jsx)("span", { children: "Preview" }), /* @__PURE__ */ (0, Y.jsx)(Yp, { content: t })]
						})]
					})
				}),
				/* @__PURE__ */ (0, Y.jsxs)("footer", { children: [/* @__PURE__ */ (0, Y.jsx)("button", {
					className: "button",
					onClick: r,
					children: "Cancel"
				}), /* @__PURE__ */ (0, Y.jsxs)("button", {
					className: "button primary",
					onClick: i,
					children: [/* @__PURE__ */ (0, Y.jsx)(Dp, { size: 14 }), "Save prompt"]
				})] })
			]
		})
	});
}
function Om({ children: e }) {
	return /* @__PURE__ */ (0, Y.jsxs)("details", {
		className: "field-help",
		children: [/* @__PURE__ */ (0, Y.jsx)("summary", {
			"aria-label": "Explain this setting",
			children: /* @__PURE__ */ (0, Y.jsx)(pp, { size: 13 })
		}), /* @__PURE__ */ (0, Y.jsx)("span", {
			role: "tooltip",
			children: e
		})]
	});
}
function $({ label: e, help: t, children: n }) {
	return /* @__PURE__ */ (0, Y.jsxs)("label", {
		className: "field",
		children: [/* @__PURE__ */ (0, Y.jsxs)("span", {
			className: "field-label",
			children: [e, t && /* @__PURE__ */ (0, Y.jsx)(Om, { children: t })]
		}), n]
	});
}
function km({ runtime: e, onChange: t }) {
	let n = String(e.platform || "web");
	return /* @__PURE__ */ (0, Y.jsxs)("section", {
		className: "repository-runtime",
		children: [
			/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "repository-runtime-heading",
				children: [/* @__PURE__ */ (0, Y.jsxs)("div", { children: [/* @__PURE__ */ (0, Y.jsxs)("strong", { children: ["Visual runtime ", /* @__PURE__ */ (0, Y.jsx)(Om, { children: "These settings tell Lumen how to start the repository, reach its page, authenticate, and provide mock data during visual verification." })] }), /* @__PURE__ */ (0, Y.jsx)("span", { children: "Only the runtime inputs needed for visual verification are shown first." })] }), /* @__PURE__ */ (0, Y.jsx)("code", { children: e.runtime_profile || n })]
			}),
			/* @__PURE__ */ (0, Y.jsxs)("div", {
				className: "form-grid compact",
				children: [
					/* @__PURE__ */ (0, Y.jsx)($, {
						label: "Base URL",
						help: "The address the visual agent opens, for example http://127.0.0.1:3000.",
						children: /* @__PURE__ */ (0, Y.jsx)("input", {
							value: e.base_url || "",
							placeholder: "http://127.0.0.1:3000",
							onChange: (e) => t({ base_url: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, Y.jsx)($, {
						label: "Ready URL",
						help: "The address Lumen polls before handing the page to the visual agent. Keep it on the same running app unless a separate health route is needed.",
						children: /* @__PURE__ */ (0, Y.jsx)("input", {
							value: e.ready_url || "",
							placeholder: "http://127.0.0.1:3000",
							onChange: (e) => t({ ready_url: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, Y.jsx)($, {
						label: "Auth strategy",
						help: "Choose how the agent becomes authenticated: login endpoint submits the configured credential, storage state reuses a saved session, and existing session connects to an already logged-in browser.",
						children: /* @__PURE__ */ (0, Y.jsxs)("select", {
							value: e.auth_strategy || "login-endpoint",
							onChange: (e) => t({ auth_strategy: e.target.value }),
							children: [
								/* @__PURE__ */ (0, Y.jsx)("option", {
									value: "login-endpoint",
									children: "Login endpoint"
								}),
								/* @__PURE__ */ (0, Y.jsx)("option", {
									value: "storage-state",
									children: "Storage state"
								}),
								/* @__PURE__ */ (0, Y.jsx)("option", {
									value: "existing-session",
									children: "Existing session"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, Y.jsx)($, {
						label: "Visual auth credential",
						help: "The local repository credential used by the visual login flow. It is shown here in plain text for local debugging and is not included in agent prompts or evidence.",
						children: /* @__PURE__ */ (0, Y.jsx)("input", {
							type: "text",
							autoComplete: "off",
							value: e.visual_auth_credential || "",
							placeholder: "Enter repository login credential",
							onChange: (e) => t({ visual_auth_credential: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, Y.jsx)($, {
						label: "Auth login path",
						help: "The relative API path used by the login endpoint, such as /oauth-proxy-api/auth/admin/fake.",
						children: /* @__PURE__ */ (0, Y.jsx)("input", {
							value: e.auth_login_path || "",
							placeholder: "/auth/fake",
							onChange: (e) => t({ auth_login_path: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, Y.jsx)($, {
						label: "Auth login field",
						help: "The request field expected by the login endpoint, such as wiw or username.",
						children: /* @__PURE__ */ (0, Y.jsx)("input", {
							value: e.auth_login_field || "",
							placeholder: "username",
							onChange: (e) => t({ auth_login_field: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, Y.jsx)($, {
						label: "Fixture strategy",
						help: "Controls how API responses are made deterministic during visual verification. Playwright route is the usual choice for a browser app.",
						children: /* @__PURE__ */ (0, Y.jsxs)("select", {
							value: e.fixture_strategy || "playwright-route",
							onChange: (e) => t({ fixture_strategy: e.target.value }),
							children: [
								/* @__PURE__ */ (0, Y.jsx)("option", {
									value: "playwright-route",
									children: "Playwright route"
								}),
								/* @__PURE__ */ (0, Y.jsx)("option", {
									value: "mock-server",
									children: "Mock server"
								}),
								/* @__PURE__ */ (0, Y.jsx)("option", {
									value: "none",
									children: "None"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, Y.jsx)($, {
						label: "Fixture file",
						help: "The mock-data file loaded by the selected fixture strategy. Use a repository-relative path.",
						children: /* @__PURE__ */ (0, Y.jsx)("input", {
							value: e.fixture_file || "",
							placeholder: "stories/.../visual-fixtures.json",
							onChange: (e) => t({ fixture_file: e.target.value })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, Y.jsxs)("details", {
				className: "repository-runtime-advanced",
				children: [
					/* @__PURE__ */ (0, Y.jsx)("summary", { children: "Advanced runtime settings" }),
					/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "form-grid compact",
						children: [
							/* @__PURE__ */ (0, Y.jsx)($, {
								label: "Platform",
								children: /* @__PURE__ */ (0, Y.jsxs)("select", {
									value: n,
									onChange: (e) => t({ platform: e.target.value }),
									children: [/* @__PURE__ */ (0, Y.jsx)("option", {
										value: "web",
										children: "Web"
									}), /* @__PURE__ */ (0, Y.jsx)("option", {
										value: "react-native",
										children: "React Native"
									})]
								})
							}),
							/* @__PURE__ */ (0, Y.jsx)($, {
								label: "Package manager",
								children: /* @__PURE__ */ (0, Y.jsx)("input", {
									value: e.package_manager || "",
									placeholder: "yarn",
									onChange: (e) => t({ package_manager: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, Y.jsx)($, {
								label: "Install command",
								children: /* @__PURE__ */ (0, Y.jsx)("input", {
									value: e.install_command || "",
									placeholder: "yarn install",
									onChange: (e) => t({ install_command: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, Y.jsx)($, {
								label: "Start command",
								children: /* @__PURE__ */ (0, Y.jsx)("input", {
									value: e.start_command || "",
									placeholder: "PORT=3000 yarn start:dev",
									onChange: (e) => t({ start_command: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, Y.jsx)($, {
								label: "Ready timeout, seconds",
								children: /* @__PURE__ */ (0, Y.jsx)("input", {
									type: "number",
									min: "1",
									value: e.ready_timeout_seconds || 60,
									onChange: (e) => t({ ready_timeout_seconds: Number(e.target.value) || 60 })
								})
							}),
							n === "web" && /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [/* @__PURE__ */ (0, Y.jsx)($, {
								label: "Browser",
								children: /* @__PURE__ */ (0, Y.jsx)("input", {
									value: e.browser || "chromium",
									onChange: (e) => t({ browser: e.target.value })
								})
							}), /* @__PURE__ */ (0, Y.jsx)($, {
								label: "Browser mode",
								children: /* @__PURE__ */ (0, Y.jsxs)("select", {
									value: e.browser_mode || "managed",
									onChange: (e) => t({ browser_mode: e.target.value }),
									children: [/* @__PURE__ */ (0, Y.jsx)("option", {
										value: "managed",
										children: "Managed"
									}), /* @__PURE__ */ (0, Y.jsx)("option", {
										value: "cdp",
										children: "Chrome CDP"
									})]
								})
							})] })
						]
					}),
					n === "web" && /* @__PURE__ */ (0, Y.jsx)($, {
						label: "Agent auth notes",
						children: /* @__PURE__ */ (0, Y.jsx)("textarea", {
							value: e.agent_auth_notes || "",
							rows: 2,
							placeholder: "Same-origin, cookie, or local runtime notes",
							onChange: (e) => t({ agent_auth_notes: e.target.value })
						})
					})
				]
			})
		]
	});
}
function Am({ data: e, interact: t }) {
	let n = e.interactive?.workspace || {}, r = n.runtime_profiles || {}, i = Object.keys(r), [a, o] = (0, M.useState)(n.repositories || []), [s, c] = (0, M.useState)(null), [l, u] = (0, M.useState)(!1);
	(0, M.useEffect)(() => o(n.repositories || []), [n.repositories]);
	let d = (e, t) => o((n) => n.map((n, r) => r === e ? {
		...n,
		...t
	} : n)), f = (e) => (e.delivery_steps || []).map((e) => Array.isArray(e.command) ? e.command.join(" ") : "").filter(Boolean).join("\n");
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "repository-page",
		children: [/* @__PURE__ */ (0, Y.jsxs)(em, {
			title: "Repository Registry",
			action: /* @__PURE__ */ (0, Y.jsx)("button", {
				className: "button secondary",
				onClick: () => u(!0),
				children: "Add repository"
			}),
			children: [
				/* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "repository-intro",
					children: [
						"Add a clone URL once. Lumen stores the repository under ",
						/* @__PURE__ */ (0, Y.jsx)("code", { children: "repos/" }),
						", infers its profile, and uses the selected branch for Scan and Delivery."
					]
				}),
				/* @__PURE__ */ (0, Y.jsx)("div", {
					className: "repository-list",
					children: a.map((e, t) => {
						let n = r[e.runtime_profile] || {}, a = s === e.name;
						return /* @__PURE__ */ (0, Y.jsxs)("article", {
							className: "repository-row",
							children: [/* @__PURE__ */ (0, Y.jsxs)("button", {
								className: "repository-summary",
								onClick: () => c(a ? null : e.name),
								children: [/* @__PURE__ */ (0, Y.jsxs)("div", { children: [/* @__PURE__ */ (0, Y.jsx)("strong", { children: e.name || "Unnamed repository" }), /* @__PURE__ */ (0, Y.jsxs)("span", { children: [
									n.language || "generic",
									" · ",
									e.runtime_profile || "No profile"
								] })] }), /* @__PURE__ */ (0, Y.jsx)("code", { children: e.default_branch || "main" })]
							}), a && /* @__PURE__ */ (0, Y.jsxs)("div", {
								className: "repository-editor",
								children: [
									/* @__PURE__ */ (0, Y.jsxs)("div", {
										className: "form-grid compact",
										children: [
											/* @__PURE__ */ (0, Y.jsx)($, {
												label: "Default branch",
												children: /* @__PURE__ */ (0, Y.jsx)("select", {
													value: e.default_branch || "",
													onChange: (e) => d(t, { default_branch: e.target.value }),
													children: Array.from(new Set([e.default_branch, ...e.branches || []].filter(Boolean))).map((e) => /* @__PURE__ */ (0, Y.jsx)("option", {
														value: e,
														children: e
													}, e))
												})
											}),
											/* @__PURE__ */ (0, Y.jsx)($, {
												label: "Scan runtime profile",
												children: /* @__PURE__ */ (0, Y.jsx)("select", {
													value: e.runtime_profile || "",
													onChange: (e) => d(t, { runtime_profile: e.target.value }),
													children: i.map((e) => /* @__PURE__ */ (0, Y.jsx)("option", {
														value: e,
														children: e
													}, e))
												})
											}),
											/* @__PURE__ */ (0, Y.jsx)($, {
												label: "Visual runtime status",
												help: "Ready tells Lumen this repository has enough startup, authentication, and fixture configuration for visual verification.",
												children: /* @__PURE__ */ (0, Y.jsxs)("select", {
													value: e.runtime_status || "incomplete",
													onChange: (e) => d(t, { runtime_status: e.target.value }),
													children: [/* @__PURE__ */ (0, Y.jsx)("option", {
														value: "ready",
														children: "Ready"
													}), /* @__PURE__ */ (0, Y.jsx)("option", {
														value: "incomplete",
														children: "Incomplete"
													})]
												})
											})
										]
									}),
									/* @__PURE__ */ (0, Y.jsxs)("div", {
										className: "repository-policy",
										children: [
											/* @__PURE__ */ (0, Y.jsxs)("label", { children: [/* @__PURE__ */ (0, Y.jsx)("input", {
												type: "checkbox",
												checked: e.allow_auto_fix !== !1,
												onChange: (e) => d(t, { allow_auto_fix: e.target.checked })
											}), "Allow automated Scan fixes"] }),
											/* @__PURE__ */ (0, Y.jsxs)("label", { children: [/* @__PURE__ */ (0, Y.jsx)("input", {
												type: "checkbox",
												checked: e.allow_pr !== !1,
												onChange: (e) => d(t, { allow_pr: e.target.checked })
											}), "Allow publish"] }),
											/* @__PURE__ */ (0, Y.jsx)("span", { children: "Local Scan commands: disabled (review-only)" })
										]
									}),
									/* @__PURE__ */ (0, Y.jsx)(km, {
										runtime: e.runtime || {},
										onChange: (n) => d(t, { runtime: {
											...e.runtime || {},
											...n
										} })
									}),
									/* @__PURE__ */ (0, Y.jsxs)("details", {
										className: "repository-verification-advanced",
										children: [/* @__PURE__ */ (0, Y.jsx)("summary", { children: "Delivery verification commands" }), /* @__PURE__ */ (0, Y.jsx)("label", {
											className: "field repository-commands",
											children: /* @__PURE__ */ (0, Y.jsx)("textarea", {
												value: e.delivery_commands ?? f(e),
												rows: 4,
												placeholder: "One command per line, e.g. ./gradlew test",
												onChange: (e) => d(t, { delivery_commands: e.target.value })
											})
										})]
									})
								]
							})]
						}, `${e.name}-${t}`);
					})
				}),
				/* @__PURE__ */ (0, Y.jsx)("footer", {
					className: "repository-footer",
					children: /* @__PURE__ */ (0, Y.jsxs)("button", {
						className: "button primary",
						onClick: () => void t("/api/repositories", { repositories: a }, "Repository registry saved"),
						children: [/* @__PURE__ */ (0, Y.jsx)(Dp, { size: 15 }), "Save repositories"]
					})
				})
			]
		}), l && /* @__PURE__ */ (0, Y.jsx)(jm, {
			onClose: () => u(!1),
			onAdd: (e) => {
				t("/api/repositories/clone", { url: e }, "Repository cloned and registered"), u(!1);
			}
		})]
	});
}
function jm({ onClose: e, onAdd: t }) {
	let [n, r] = (0, M.useState)("");
	return /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "modal-backdrop",
		role: "presentation",
		onMouseDown: e,
		children: /* @__PURE__ */ (0, Y.jsxs)("section", {
			className: "modal repository-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Add repository",
			onMouseDown: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, Y.jsx)("div", {
					className: "prompt-inspector-header",
					children: /* @__PURE__ */ (0, Y.jsxs)("div", { children: [/* @__PURE__ */ (0, Y.jsx)("strong", { children: "Add repository" }), /* @__PURE__ */ (0, Y.jsx)("span", { children: "Paste a Git clone URL. Lumen derives the name, local path, branch, and runtime profile." })] })
				}),
				/* @__PURE__ */ (0, Y.jsx)("div", {
					className: "repository-modal-body",
					children: /* @__PURE__ */ (0, Y.jsx)($, {
						label: "Clone URL",
						children: /* @__PURE__ */ (0, Y.jsx)("input", {
							autoFocus: !0,
							value: n,
							placeholder: "https://git.example.com/team/service.git",
							onChange: (e) => r(e.target.value)
						})
					})
				}),
				/* @__PURE__ */ (0, Y.jsxs)("footer", { children: [/* @__PURE__ */ (0, Y.jsx)("button", {
					className: "button",
					onClick: e,
					children: "Cancel"
				}), /* @__PURE__ */ (0, Y.jsx)("button", {
					className: "button primary",
					disabled: !n.trim(),
					onClick: () => t(n.trim()),
					children: "Clone and add"
				})] })
			]
		})
	});
}
function Mm({ data: e, project: t, notify: n, onDirtyChange: r, reload: i }) {
	let a = e.interactive?.workspace || {}, o = e.interactive?.schedules || {}, [s, c] = (0, M.useState)(String(a.scan_window_days || 7)), [l, u] = (0, M.useState)(String(o.scan?.cron || "0 12 * * 1-5")), [d, f] = (0, M.useState)(!!o.scan), [p, m] = (0, M.useState)(String(Math.round((o.delivery?.interval_seconds || 300) / 60))), [h, g] = (0, M.useState)(String(o.delivery?.jira_status || "")), [_, v] = (0, M.useState)(String(o.delivery?.in_dev_status || "")), [y, b] = (0, M.useState)(String(o.delivery?.dev_done_status || "")), [x, S] = (0, M.useState)(String(o.delivery?.blocked_status || "Block")), [C, w] = (0, M.useState)(!!o.delivery?.enabled), [T, E] = (0, M.useState)(String(a.models?.scan || "composer-2.5")), [ee, D] = (0, M.useState)(String(a.models?.delivery || "composer-2.5")), [te, ne] = (0, M.useState)([]), [re, ie] = (0, M.useState)({}), [O, k] = (0, M.useState)({}), [ae, oe] = (0, M.useState)(String(a.publish?.scan || "pr")), [se, ce] = (0, M.useState)(String(a.publish?.delivery || "pr")), [le, A] = (0, M.useState)(a.feishu_notifications_enabled !== !1), [ue, de] = (0, M.useState)(!1), j = () => {
		de(!0), r(!0);
	};
	(0, M.useEffect)(() => {
		Wp("/api/delivery/status-options", t).then((e) => ne(Array.isArray(e.options) ? e.options.map(String) : [])).catch(() => ne([]));
	}, [t]), (0, M.useEffect)(() => {
		c(String(a.scan_window_days || 7)), u(String(o.scan?.cron || "0 12 * * 1-5")), f(!!o.scan), m(String(Math.round((o.delivery?.interval_seconds || 300) / 60))), g(String(o.delivery?.jira_status || "")), v(String(o.delivery?.in_dev_status || "")), b(String(o.delivery?.dev_done_status || "")), S(String(o.delivery?.blocked_status || "Block")), w(!!o.delivery?.enabled), E(String(a.models?.scan || "composer-2.5")), D(String(a.models?.delivery || "composer-2.5")), A(a.feishu_notifications_enabled !== !1), ie({}), k({}), de(!1), r(!1);
	}, [t]), (0, M.useEffect)(() => {
		oe(String(a.publish?.scan || "pr")), ce(String(a.publish?.delivery || "pr"));
	}, [a.publish?.scan, a.publish?.delivery]), (0, M.useEffect)(() => {
		A(a.feishu_notifications_enabled !== !1);
	}, [a.feishu_notifications_enabled]), (0, M.useEffect)(() => {
		let e = (e) => {
			ue && (e.preventDefault(), e.returnValue = "");
		};
		return window.addEventListener("beforeunload", e), () => window.removeEventListener("beforeunload", e);
	}, [ue]);
	let fe = async (e) => {
		let n = await Wp(`/api/integration?key=${encodeURIComponent(e)}`, t);
		return String(n.value);
	}, pe = async (e) => {
		try {
			let t = await fe(e);
			ie((n) => ({
				...n,
				[e]: t
			})), n("Integration value revealed", "success");
		} catch (e) {
			n(e instanceof Error ? e.message : "Unable to reveal value", "error");
		}
	}, me = async (e) => {
		try {
			let t = await fe(e);
			await navigator.clipboard.writeText(t), n("Integration value copied", "success");
		} catch (e) {
			n(e instanceof Error ? e.message : "Unable to copy value", "error");
		}
	}, he = a.configured_integrations || [], ge = Array.from(new Set([
		...te,
		h,
		_,
		y
	].filter(Boolean))), _e = async () => {
		try {
			await Promise.all([
				Wp("/api/workspace", t, {
					method: "POST",
					json: {
						scan_window_days: Number(s),
						scan_model: T,
						delivery_model: ee,
						feishu_notifications_enabled: le
					}
				}),
				Wp("/api/schedule", t, {
					method: "POST",
					json: d ? {
						kind: "scan",
						action: "save",
						cron: l
					} : {
						kind: "scan",
						action: "remove"
					}
				}),
				Wp("/api/schedule", t, {
					method: "POST",
					json: C ? {
						kind: "delivery",
						action: "save",
						interval_minutes: Number(p),
						jira_status: h,
						in_dev_status: _,
						dev_done_status: y,
						blocked_status: x
					} : {
						kind: "delivery",
						action: "remove"
					}
				}),
				Wp("/api/publish-policy", t, {
					method: "POST",
					json: {
						scan_mode: ae,
						delivery_mode: se
					}
				}),
				...Object.entries(O).map(([e, n]) => Wp("/api/integration", t, {
					method: "POST",
					json: {
						key: e,
						value: n
					}
				}))
			]), k({}), de(!1), r(!1), n("Settings saved", "success"), await i();
		} catch (e) {
			n(e instanceof Error ? e.message : "Unable to save Settings", "error");
		}
	};
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "settings-stack",
		children: [
			/* @__PURE__ */ (0, Y.jsxs)(em, {
				title: "Automation Schedules",
				children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "settings-section",
					children: [
						/* @__PURE__ */ (0, Y.jsxs)("div", {
							className: "settings-copy",
							children: [/* @__PURE__ */ (0, Y.jsx)("div", {
								className: "settings-heading",
								children: /* @__PURE__ */ (0, Y.jsx)("div", {
									className: "settings-title-stack",
									children: /* @__PURE__ */ (0, Y.jsx)("h4", { children: "Auto Scan" })
								})
							}), /* @__PURE__ */ (0, Y.jsx)("p", { children: zp(o.scan?.description, "No recurring scan is configured.") })]
						}),
						/* @__PURE__ */ (0, Y.jsx)("div", {
							className: "settings-control wide",
							children: /* @__PURE__ */ (0, Y.jsxs)("div", {
								className: "form-grid compact scan-settings-fields",
								style: {
									display: "grid",
									gridTemplateColumns: "1fr 1fr",
									gap: 12,
									padding: 0,
									width: "100%"
								},
								children: [/* @__PURE__ */ (0, Y.jsx)($, {
									label: "Lookback, days",
									children: /* @__PURE__ */ (0, Y.jsx)("input", {
										type: "number",
										min: "1",
										max: "365",
										value: s,
										onChange: (e) => {
											c(e.target.value), j();
										}
									})
								}), /* @__PURE__ */ (0, Y.jsx)($, {
									label: "Five-field cron",
									children: /* @__PURE__ */ (0, Y.jsx)("input", {
										value: l,
										onChange: (e) => {
											u(e.target.value), j();
										}
									})
								})]
							})
						}),
						/* @__PURE__ */ (0, Y.jsx)("div", {
							className: "settings-toggle",
							children: /* @__PURE__ */ (0, Y.jsx)(Nm, {
								enabled: d,
								onChange: (e) => {
									f(e), j();
								}
							})
						})
					]
				}), /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "settings-section divider",
					children: [
						/* @__PURE__ */ (0, Y.jsxs)("div", {
							className: "settings-copy",
							children: [/* @__PURE__ */ (0, Y.jsx)("div", {
								className: "settings-heading",
								children: /* @__PURE__ */ (0, Y.jsx)("div", {
									className: "settings-title-stack",
									children: /* @__PURE__ */ (0, Y.jsx)("h4", { children: "Auto Delivery" })
								})
							}), /* @__PURE__ */ (0, Y.jsx)("p", { children: C ? `Polling every ${p} minute(s).` : "Delivery polling is paused." })]
						}),
						/* @__PURE__ */ (0, Y.jsxs)("div", {
							className: "settings-control wide",
							children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
								className: "form-grid compact",
								children: [
									/* @__PURE__ */ (0, Y.jsx)($, {
										label: "Interval, minutes",
										children: /* @__PURE__ */ (0, Y.jsx)("input", {
											type: "number",
											min: "1",
											value: p,
											onChange: (e) => {
												m(e.target.value), j();
											}
										})
									}),
									/* @__PURE__ */ (0, Y.jsx)($, {
										label: "Eligible JIRA status",
										children: /* @__PURE__ */ (0, Y.jsx)("select", {
											value: h,
											onChange: (e) => {
												g(e.target.value), j();
											},
											children: ge.map((e) => /* @__PURE__ */ (0, Y.jsx)("option", {
												value: e,
												children: e
											}, e))
										})
									}),
									/* @__PURE__ */ (0, Y.jsx)($, {
										label: "Move to when started",
										children: /* @__PURE__ */ (0, Y.jsx)("select", {
											value: _,
											onChange: (e) => {
												v(e.target.value), j();
											},
											children: ge.map((e) => /* @__PURE__ */ (0, Y.jsx)("option", {
												value: e,
												children: e
											}, e))
										})
									}),
									/* @__PURE__ */ (0, Y.jsx)($, {
										label: "Move to when completed",
										children: /* @__PURE__ */ (0, Y.jsx)("select", {
											value: y,
											onChange: (e) => {
												b(e.target.value), j();
											},
											children: ge.map((e) => /* @__PURE__ */ (0, Y.jsx)("option", {
												value: e,
												children: e
											}, e))
										})
									}),
									/* @__PURE__ */ (0, Y.jsx)($, {
										label: "Move to when failed",
										children: /* @__PURE__ */ (0, Y.jsx)("select", {
											value: x,
											onChange: (e) => {
												S(e.target.value), j();
											},
											children: Array.from(/* @__PURE__ */ new Set([...ge, "Block"])).map((e) => /* @__PURE__ */ (0, Y.jsx)("option", {
												value: e,
												children: e
											}, e))
										})
									})
								]
							}), /* @__PURE__ */ (0, Y.jsx)("p", {
								className: "schedule-note",
								children: "On failure, Lumen moves the Jira card to the selected Block status and adds a Needs attention comment."
							})]
						}),
						/* @__PURE__ */ (0, Y.jsx)("div", {
							className: "settings-toggle",
							children: /* @__PURE__ */ (0, Y.jsx)(Nm, {
								enabled: C,
								onChange: (e) => {
									w(e), j();
								}
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, Y.jsx)(em, {
				title: "Execution Models",
				children: /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "settings-section",
					children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "settings-copy",
						children: [/* @__PURE__ */ (0, Y.jsx)("h4", { children: "Cursor model" }), /* @__PURE__ */ (0, Y.jsx)("p", { children: "Choose a preset or type any custom Cursor model ID. Each workflow reads its selected model on the next run." })]
					}), /* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "settings-control wide",
						children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
							className: "form-grid compact",
							children: [/* @__PURE__ */ (0, Y.jsx)($, {
								label: "Auto Scan model",
								children: /* @__PURE__ */ (0, Y.jsx)("input", {
									list: "cursor-model-options",
									value: T,
									onChange: (e) => {
										E(e.target.value), j();
									},
									placeholder: "Choose or type a model"
								})
							}), /* @__PURE__ */ (0, Y.jsx)($, {
								label: "Auto Delivery model",
								children: /* @__PURE__ */ (0, Y.jsx)("input", {
									list: "cursor-model-options",
									value: ee,
									onChange: (e) => {
										D(e.target.value), j();
									},
									placeholder: "Choose or type a model"
								})
							})]
						}), /* @__PURE__ */ (0, Y.jsx)("datalist", {
							id: "cursor-model-options",
							children: Rp.map((e) => /* @__PURE__ */ (0, Y.jsx)("option", {
								value: e.value,
								label: e.label
							}, e.value))
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, Y.jsx)(em, {
				title: "Publish Policy",
				children: /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "settings-section",
					children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "settings-copy",
						children: [/* @__PURE__ */ (0, Y.jsx)("h4", { children: "Automation outcome" }), /* @__PURE__ */ (0, Y.jsx)("p", { children: "Direct push uses the repository credentials already configured for Git; PR and Merge use GitHub CLI." })]
					}), /* @__PURE__ */ (0, Y.jsx)("div", {
						className: "settings-control wide",
						children: /* @__PURE__ */ (0, Y.jsxs)("div", {
							className: "form-grid compact",
							children: [/* @__PURE__ */ (0, Y.jsx)($, {
								label: "Auto Scan",
								children: /* @__PURE__ */ (0, Y.jsxs)("select", {
									value: ae,
									onChange: (e) => {
										oe(e.target.value), j();
									},
									children: [/* @__PURE__ */ (0, Y.jsx)("option", {
										value: "pr",
										children: "Open pull request"
									}), /* @__PURE__ */ (0, Y.jsx)("option", {
										value: "merge",
										children: "Merge after pull request"
									})]
								})
							}), /* @__PURE__ */ (0, Y.jsx)($, {
								label: "Auto Delivery",
								children: /* @__PURE__ */ (0, Y.jsxs)("select", {
									value: se,
									onChange: (e) => {
										ce(e.target.value), j();
									},
									children: [
										/* @__PURE__ */ (0, Y.jsx)("option", {
											value: "pr",
											children: "Open pull request"
										}),
										/* @__PURE__ */ (0, Y.jsx)("option", {
											value: "merge",
											children: "Merge after pull request"
										}),
										/* @__PURE__ */ (0, Y.jsx)("option", {
											value: "direct",
											children: "Push directly to main branch"
										})
									]
								})
							})]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, Y.jsx)(em, {
				title: "Notifications",
				children: /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "settings-section",
					children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "settings-copy",
						children: [/* @__PURE__ */ (0, Y.jsx)("h4", { children: "Feishu notifications" }), /* @__PURE__ */ (0, Y.jsx)("p", { children: "Control whether Scan and Delivery post cards to the configured Feishu webhook. The webhook URL still lives under Variable Keys." })]
					}), /* @__PURE__ */ (0, Y.jsx)("div", {
						className: "settings-toggle",
						children: /* @__PURE__ */ (0, Y.jsx)(Nm, {
							enabled: le,
							onChange: (e) => {
								A(e), j();
							}
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, Y.jsx)(em, {
				title: "Variable Keys",
				action: /* @__PURE__ */ (0, Y.jsx)("span", {
					className: "muted",
					children: "Stored only in this workspace"
				}),
				children: /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "settings-section",
					children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
						className: "settings-copy",
						children: [/* @__PURE__ */ (0, Y.jsx)("h4", { children: "Available keys" }), /* @__PURE__ */ (0, Y.jsx)("p", { children: "Reveal a value to inspect it, or enter a replacement directly. Values are saved without display quotes." })]
					}), /* @__PURE__ */ (0, Y.jsx)("div", {
						className: "settings-control wide",
						children: /* @__PURE__ */ (0, Y.jsx)("div", {
							className: "secret-list",
							children: he.length ? he.map((e) => {
								let t = O[e] ?? re[e] ?? "";
								return /* @__PURE__ */ (0, Y.jsxs)("div", {
									className: "secret-row",
									children: [
										/* @__PURE__ */ (0, Y.jsx)("code", { children: e }),
										/* @__PURE__ */ (0, Y.jsx)("input", {
											type: re[e] || O[e] !== void 0 ? "text" : "password",
											value: t,
											placeholder: "Reveal or enter a replacement value",
											"aria-label": `Value for ${e}`,
											onChange: (t) => {
												let n = t.target.value;
												k((t) => ({
													...t,
													[e]: n
												})), j();
											}
										}),
										/* @__PURE__ */ (0, Y.jsxs)("div", { children: [/* @__PURE__ */ (0, Y.jsx)($p, {
											label: "Reveal value",
											onClick: () => void pe(e),
											children: re[e] ? /* @__PURE__ */ (0, Y.jsx)(_p, { size: 15 }) : /* @__PURE__ */ (0, Y.jsx)(vp, { size: 15 })
										}), /* @__PURE__ */ (0, Y.jsx)($p, {
											label: "Copy value",
											onClick: () => void me(e),
											children: /* @__PURE__ */ (0, Y.jsx)(hp, { size: 15 })
										})] })
									]
								}, e);
							}) : /* @__PURE__ */ (0, Y.jsx)(im, { label: "No local integration keys configured." })
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, Y.jsxs)("footer", {
				className: "settings-save-bar",
				children: [/* @__PURE__ */ (0, Y.jsx)("span", {
					className: ue ? "settings-save-status unsaved" : "settings-save-status",
					children: ue ? "You have unsaved changes" : "All changes saved"
				}), /* @__PURE__ */ (0, Y.jsxs)("button", {
					className: "button primary",
					disabled: !ue,
					onClick: () => void _e(),
					children: [/* @__PURE__ */ (0, Y.jsx)(Dp, { size: 15 }), "Save changes"]
				})]
			})
		]
	});
}
function Nm({ enabled: e, onChange: t }) {
	return /* @__PURE__ */ (0, Y.jsxs)("label", {
		className: "schedule-toggle",
		children: [
			/* @__PURE__ */ (0, Y.jsx)("input", {
				type: "checkbox",
				checked: e,
				onChange: (e) => t(e.target.checked)
			}),
			/* @__PURE__ */ (0, Y.jsx)("span", { "aria-hidden": "true" }),
			/* @__PURE__ */ (0, Y.jsx)("em", { children: e ? "Enabled" : "Paused" })
		]
	});
}
(0, dt.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, Y.jsx)(tm, {}));
//#endregion
