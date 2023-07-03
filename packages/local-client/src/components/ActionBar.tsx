import "./ActionBar.css"

import { useActions } from "../hooks/useActions"

import ActionButton from "./ActionButton"

interface ActionBarInterface {
  id: string
}

const ActionBar: React.FC<ActionBarInterface> = ({ id }) => {
  const { deleteCell, moveCell } = useActions()

  return (
    <div className="action-bar">
      <ActionButton icon="fas fa-arrow-up" onClick={() => moveCell(id, "up")} />
      <ActionButton
        icon="fas fa-arrow-down"
        onClick={() => moveCell(id, "down")}
      />
      <ActionButton icon="fas fa-times" onClick={() => deleteCell(id)} />
    </div>
  )
}

export default ActionBar
