import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware"
import path from "path"

import { createCellsRouter } from "./routes/cells"

export const serve = (
  dir: string,
  filename: string,
  port: number,
  useProxy: boolean
) => {
  const app = express()

  app.use(createCellsRouter(dir, filename))

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: "http://127.0.0.1:3000",
        ws: true,
        logLevel: "silent",
        changeOrigin: true,
      })
    )
  } else {
    const packagePath = require.resolve("local-client/build/index.html")
    app.use(express.static(path.dirname(packagePath)))
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject)
  })
}
