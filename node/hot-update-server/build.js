#!/usr/bin/env node

const { build, cliopts } = require("estrella")

build({
    entry: "src/main.ts",
    outfile: "dist/bundle.js"
})

cliopts.watch && require("serve-http").createServer({
    port: 8080,
    pubdir: require("path").join(__dirname, "dist")
})

