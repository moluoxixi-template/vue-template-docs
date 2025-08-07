var f = function() {
  var e = this, n = e.$createElement, a = e._self._c || n;
  return a("el-button", {
    attrs: {
      type: e.type,
      size: e.size,
      disabled: e.disabled
    },
    on: {
      click: e.handleClick
    }
  }, [e._t("default")], 2);
}, _ = [];
function m(e, n, a, b, i, u, g, k) {
  var t = typeof e == "function" ? e.options : e;
  n && (t.render = n, t.staticRenderFns = a, t._compiled = !0), t._scopeId = "data-v-" + u;
  var o;
  if (i && (o = i), o)
    if (t.functional) {
      t._injectStyles = o;
      var d = t.render;
      t.render = function(s, l) {
        return o.call(l), d(s, l);
      };
    } else {
      var r = t.beforeCreate;
      t.beforeCreate = r ? [].concat(r, o) : [o];
    }
  return {
    exports: e,
    options: t
  };
}
const p = {
  name: "Button",
  props: {
    type: {
      type: String,
      default: "default",
      validator: function(e) {
        return ["primary", "success", "warning", "danger", "info", "default"].includes(e);
      }
    },
    size: {
      type: String,
      default: "medium",
      validator: function(e) {
        return ["large", "medium", "small", "mini"].includes(e);
      }
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  methods: {
    handleClick: function(e) {
      alert("按钮的点击事件触发"), this.$emit("click", e);
    }
  }
}, c = {};
var v = /* @__PURE__ */ m(
  p,
  f,
  _,
  !1,
  h,
  "1ad6c6ce"
);
function h(e) {
  for (let n in c)
    this[n] = c[n];
}
const y = /* @__PURE__ */ function() {
  return v.exports;
}();
function z(e) {
  e.component("MButton", y);
}
export {
  y as default,
  z as install
};
