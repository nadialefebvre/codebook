import "./ActionBar.css"

import { useActions } from "../hooks/useActions"

import ActionBarButton from "./ActionBarButton"

interface ActionBarInterface {
  id: string
}

const ActionBar: React.FC<ActionBarInterface> = ({ id }) => {
  const { deleteCell, moveCell } = useActions()

  return (
    <div className="action-bar">
      <ActionBarButton
        icon="fas fa-arrow-up"
        onClick={() => moveCell(id, "up")}
      />
      <ActionBarButton
        icon="fas fa-arrow-down"
        onClick={() => moveCell(id, "down")}
      />
      <ActionBarButton icon="fas fa-times" onClick={() => deleteCell(id)} />
    </div>
  )
}

export default ActionBar
