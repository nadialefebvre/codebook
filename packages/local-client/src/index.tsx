import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import "@fortawesome/fontawesome-free/css/all.min.css"
import "bulmaswatch/superhero/bulmaswatch.min.css"

import { store } from "./state"

import CellList from "./components/Cells/CellList"

const App = () => {
  return (
    <Provider store={store}>
      <div style={{ minHeight: "calc(100vh - 9rem - 1em)" }}>
        <section className="hero is-primary">
          <div className="hero-body">
            <p className="title">CodeScribe</p>
            <p className="subtitle">
              Your online code and documentation editor
            </p>
          </div>
        </section>
        <CellList />
      </div>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>CodeScribe</strong> /{" "}
            <a
              href="https://nadialefebvre.dev"
              rel="noreferrer"
              target="_blank"
            >
              Nadia Lefebvre
            </a>
          </p>
        </div>
      </footer>
    </Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
