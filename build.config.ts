// build.config.ts
import { resolve } from "node:path"
import { defineBuildConfig } from "unbuild"

export default defineBuildConfig({
  entries: [
    // bundling
    "src/index.ts",
    // bundleless, or just copy assets
    // { input: 'src/components/', outDir: 'dist/components' },
  ],
  clean: true,
  failOnWarn: false,
  rollup: {
    esbuild: {
      target: "esnext",
      logLevel: "silent",
      minify: true,
    },
    // cjsBridge: true,
    // emitCJS: true,
    inlineDependencies: true,
  },
  externals: ["@unocss/preset-mini"],
  declaration: "node16",
})
