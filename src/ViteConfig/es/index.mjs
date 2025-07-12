import R from "@vitejs/plugin-vue";
import T from "@vitejs/plugin-vue-jsx";
import C from "vite-plugin-vue-devtools";
import P from "autoprefixer";
import V from "@tailwindcss/postcss";
import { visualizer as y } from "rollup-plugin-visualizer";
import N from "unplugin-auto-import/vite";
import { ElementPlusResolver as E } from "unplugin-vue-components/resolvers";
import j from "unplugin-vue-components/vite";
import A from "vite-plugin-cdn-import";
import L from "vite-plugin-compression";
import M from "vite-plugin-imagemin";
import U from "vite-plugin-qiankun";
import { defineConfig as z } from "vite";
import { createHtmlPlugin as w } from "vite-plugin-html";
const _ = {};
function v(o) {
  return o.replace(/[-_]+/g, " ").replace(/(?:^|\s)\w/g, (t) => t.toUpperCase()).replace(/\s+/g, "");
}
function B(o) {
  function t(e) {
    return e ? e.startsWith("/") ? e : "/" + e : "";
  }
  return o.map((e) => typeof e == "string" ? { name: e, var: v(e), path: "" } : e).map((e) => ({ name: e.name, var: e.var || v(e.name), path: t(e.path), css: t(e.css) }));
}
const G = B(["vue"]);
function k(o = "", t = "", e = "") {
  const r = new RegExp(`(class|style)\\s*:\\s*((["']((` + t + `\\b)-).*["'])|((_normalizeClass|_normalizeStyle)\\(.*(` + t + "\\b)-.*\\)))", "g");
  return o.replace(r, (s = "") => s.replace(t, e));
}
function q(o = "", t = "", e = "") {
  const r = new RegExp("(\\." + t + "\\b|#" + t + "\\b|--" + t + "\\b)", "g");
  return o.replace(r, (s = "") => s.replace(t, e));
}
function F({ prefixScoped: o = "", oldPrefix: t = "", newPrefix: e = "", useDevMode: r = !1 }) {
  let s;
  return { name: "addScopedAndReplacePrefix", configResolved(x) {
    s = x.command === "build" || x.isProduction;
  }, transform(x = "", n = "") {
    if (!s && !r || !t || !e || n.includes("node_modules")) return x;
    const u = ["css", "scss", "less", "stylus", "styl"];
    let i = x;
    if (n.endsWith(".vue")) i = k(i, t, e);
    else if (u.some((a) => n.endsWith("." + a))) return t && e && (i = q(i, t, e)), o && (i = "" + i + o + "{" + i + "}"), i;
    return i;
  } };
}
function h(o, t) {
  for (const e of o) {
    if (e.path === t) return e;
    if (e.children) {
      const r = h(e.children, t);
      if (r) return r;
    }
  }
}
function W(o, t = "", e) {
  e && (e.children = e.children || [], e.name = e.name || t);
  const r = e ? [e] : [];
  return Object.keys(o).sort((s, x) => {
    const n = s.split("/").length;
    return x.split("/").length > n ? -1 : 1;
  }).reduce((s = [], x) => {
    const n = o[x];
    if (!n || x === "install") return s;
    const u = x.split("/"), i = u.findIndex((g) => g === "src");
    if (i === -1) return s;
    const a = u.slice(i + 1, -1), p = a.at(-1), m = n.name || p === "src" ? a.at(-2) : a.at(-1);
    a.at(-1) === "src" && a.pop();
    const l = "/" + a.join("/"), d = "/" + a.slice(0, -1).join("/"), f = h(s, d);
    return f ? (f.children || (f.children = []), f.children.push({ path: l, name: l, meta: { title: n.name || m }, component: n })) : s.push({ path: l, name: l, meta: { title: n.name || m }, component: n }), s;
  }, r);
}
function b(o) {
  var t, e, r;
  for (const s of o) {
    if ((t = s.meta) != null && t.default) return s.path;
    if ((e = s.children) != null && e.length) return b(s.children);
  }
  return (r = o == null ? void 0 : o[0]) == null ? void 0 : r.path;
}
function J({ routeConfig: o, virtualModuleId: t }) {
  const e = /* @__PURE__ */ new Map(), r = t || "virtual:auto-routes", s = "\0" + r;
  return { name: "vite-plugin-auto-routes", resolveId(x) {
    if (x === r) return s;
  }, load(x) {
    if (x === s) {
      const n = [], u = [];
      Object.entries(o).forEach(([a, p], m) => {
        const l = "files" + m, d = p.glob || p;
        n.push("const " + l + " = import.meta.glob(" + JSON.stringify(d) + ", { eager: true, import: 'default' });");
        const f = p.baseRoute;
        u.push("...generateRoutes(" + l + ", '" + a + "'," + JSON.stringify(f) + ")");
      });
      const i = `
          ` + n.join(`
`) + `
          ` + h + `
          ` + W + `
          const routes = [` + u.join(`,
`) + `];
          ` + b + `
          export { routes, findDefaultRoute };
          export default routes;
        `;
      return e.set(x, i), i;
    }
  } };
}
function ce(o) {
  return z(({ mode: t }) => {
    const e = o == null ? void 0 : o.rootPath, r = (o == null ? void 0 : o.mode) || {}, s = (r == null ? void 0 : r.base) || {}, x = (r == null ? void 0 : r[t]) || {}, n = { ...s, ...x }, u = n.VITE_GLOB_APP_TITLE, i = t === "development", a = n.VITE_GLOB_APP_CODE, p = n.VITE_QIANKUN_DEV, m = i && !p ? "el" : n.VITE_GLOB_APP_CODE, l = t === "github", d = n.VITE_USE_QIANKUN && !l, f = n.VITE_USE_CDN && !l && !d, g = [R(), T(), i && n.VITE_DEVTOOLS && C(), N({ imports: ["vue"], resolvers: [E()], dts: _.resolve(e, "./src/typings/auto-imports.d.ts") }), j({ resolvers: [E({ exclude: new RegExp((l ? [] : ["ElButton", "ElDrawer", "ElDialog"]).map((c) => "^" + c + "$").join("|")) })], globs: ["src/components/**/index.vue", "src/components/**/index.ts", "!src/components/**/base/**/*", "!src/components/**/components/**/*", "!src/components/**/src/**/*", "!src/components/**/_utils/**/*", "!src/components/**/_types/**/*"], dts: _.resolve(e, "./src/typings/components.d.ts") })].filter((c) => !!c), I = [w({ inject: { data: { title: u } } }), n.VITE_COMPRESS && L({ algorithm: n.VITE_BUILD_GZIP ? "gzip" : "brotliCompress", verbose: !0, disable: !1, ext: ".gz", threshold: 10240, deleteOriginFile: !1 }), n.VITE_IMAGEMIN && M({ gifsicle: { optimizationLevel: 7, interlaced: !1 }, optipng: { optimizationLevel: 7 }, mozjpeg: { quality: 20 }, pngquant: { quality: [0.8, 0.9], speed: 4 }, svgo: { plugins: [{ name: "removeViewBox" }, { name: "removeEmptyAttrs", active: !1 }] } }), f && A({ enableInDevMode: n.VITE_USE_CDN_IS_DEV, prodUrl: n.VITE_CDN_BASE_URL + "/{name}@{version}{path}", modules: G })].filter((c) => !!c), S = [n.VITE_REPORT && y({ open: !0 })].filter((c) => !!c), D = d ? [U(m, { useDevMode: p }), F({ prefixScoped: "div[data-qiankun='" + m + "']", oldPrefix: "el", newPrefix: a, useDevMode: p })] : [];
    return { base: "/" + a, plugins: [...g, ...I, ...S, ...D, J({ routeConfig: { views: ["/src/views/**/index.vue", "!/src/views/**/components/*"], examples: "/src/examples/**/index.vue", componentExamples: { glob: ["/src/components/**/Example.vue", "!/src/components/**/components/*"], baseRoute: { path: "/components", name: "组件示例" } } } })], esbuild: { pure: !i && n.VITE_PURE_CONSOLE_AND_DEBUGGER ? ["console.log", "console.info", "console.debug"] : [] }, optimizeDeps: { include: [], exclude: [] }, build: { sourcemap: i, outDir: l ? "./docs/pages" : "" + a, cssCodeSplit: !0, chunkSizeWarningLimit: 1500, minify: "esbuild", rollupOptions: { external: [], output: { globals: {}, chunkFileNames: "static/js/[name]-[hash].js", entryFileNames: "static/js/[name]-[hash].js", assetFileNames: "static/[ext]/[name]-[hash].[ext]", manualChunks: (c) => {
      if (c.includes("node_modules")) return c.toString().split("node_modules/")[1].split("/")[0].toString();
    } } } }, define: { __SYSTEM_CODE__: JSON.stringify(m) }, css: { postcss: { plugins: [V(), P()] }, devSourcemap: i, preprocessorOptions: { scss: { api: "modern-compiler", additionalData(c, O) {
      return O.includes("element") ? "$namespace: " + m + ";" + `
` + c : c;
    } } } }, resolve: { extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"], alias: { "@": _.resolve(e, "./src") } }, server: { host: "0.0.0.0", port: n.VITE_PORT, open: n.VITE_OPEN, cors: !0, proxy: {} } };
  });
}
export {
  ce as default
};
