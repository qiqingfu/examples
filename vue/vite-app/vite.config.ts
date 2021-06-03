import vue from '@vitejs/plugin-vue'
import { defineConfig } from "vite"

/**
 * @type {import('vite').UserConfig}
 */

const COMMAND_TYPE = "serve"

export default function ({ command, mode }) {
  if (command === COMMAND_TYPE) {
    return defineConfig({
      root: process.cwd(),
      plugins: [vue()],
      define: {
        VITE_APP_MESSAGE: "test"
      },
      // https://vitejs.dev/config/#css-modules
      css: {
        modules: false,
        preprocessorOptions: {}
      },
      logLevel: "info",
      // https://vitejs.dev/config/#server-options
      server: {
        open: false,
        port: 8080,
        host: "localhost",
        proxy: {},
        cors: true
      }
    })
  } else {
    // https://vitejs.dev/config/#build-options
    return defineConfig({
      build: {
        base: "/",
        target: "es2020",
        outDir: "dist",
        assetsDir: "assets",
        // https://vitejs.dev/config/#build-assetsinlinelimit
        assetsInlineLimit: 4096,
        cssCodeSplit: true,
        sourcemap: false,
        rollupOptions: {},
        manifest: false,
        minify: "terser",
        // https://terser.org/docs/api-reference#minify-options
        terserOptions: {},
        write: true,
      },
      // https://vitejs.dev/guide/dep-pre-bundling.html#dependency-pre-bundling
      optimizeDeps: {
        include: [],
        exclude: [],
        link: [],
        // https://vitejs.dev/config/#optimizedeps-allownodebuiltins
        allowNodeBuiltins: [],
        // https://vitejs.dev/guide/dep-pre-bundling.html#dependency-pre-bundling
        // 例如：将 lodash-es 预先绑定到单个模块中, 现在只需要发送一个 HTTP 请求即可获得所有的辅助函数 
        auto: true
      }
    })
  }
}
