import { Command } from "commander"
import { serve } from "local-api"
import path from "path"

interface LocalApiError {
  code: string
}

const isProduction = process.env.NODE_ENV === "production"

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run serve on", "4005")
  .action(
    async (filename: string = "logbook.js", options: { port: string }) => {
      const isLocalApiError = (err: any): err is LocalApiError => {
        return typeof err.code === "string"
      }

      try {
        const dir = path.join(process.cwd(), path.dirname(filename))
        await serve(
          dir,
          path.basename(filename),
          parseInt(options.port),
          !isProduction
        )
        console.log(
          `Opened ${filename}.\n\Navigate to http://localhost:${options.port} to edit the file.`
        )
      } catch (err) {
        if (isLocalApiError(err)) {
          if (err.code === "EADDRINUSE") {
            console.error(
              `Port ${options.port} is already in use.\n\Try running on a different port by adding the following to your command: -p <port number>`
            )
          }
        } else if (err instanceof Error) {
          console.log("Here's the problem:", err.message)
        }
        process.exit(1)
      }
    }
  )
