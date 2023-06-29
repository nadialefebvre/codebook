import "./code-editor.css"
import "./syntax.css"

import { useRef } from "react"
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react"
import prettier from "prettier"
import parser from "prettier/parser-babel"
import codeShift from "jscodeshift"
import Highlighter from "monaco-jsx-highlighter"

interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
  // onChange1: (value: string) => void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>()

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue())
    })

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 })

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    )
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    )
  }

  const onFormatClick = () => {
    // get current value from editor
    const unformattedCode = editorRef.current.getModel().getValue()
    // format value (and replace white line added at the end with empty string)
    const formattedCode = prettier
      .format(unformattedCode, {
        parser: "babel",
        plugins: [parser],
        semi: false,
        singleQuote: false,
      })
      .replace(/\n$/, "")
    // set formatted value back in editor
    editorRef.current.setValue(formattedCode)
  }

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        height="100%"
        language="javascript"
        theme="dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}

export default CodeEditor
