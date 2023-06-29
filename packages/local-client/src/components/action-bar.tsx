import "./action-bar.css"
import { useActions } from "../hooks/use-actions"
import ActionButton from "./action-button"

interface ActionBarInterface {
  id: string
}

const ActionBar: React.FC<ActionBarInterface> = ({ id }) => {
  const { moveCell, deleteCell } = useActions()

  return (
    <div className="action-bar">
      <ActionButton onClick={() => moveCell(id, "up")} icon="fas fa-arrow-up" />
      <ActionButton
        onClick={() => moveCell(id, "down")}
        icon="fas fa-arrow-down"
      />
      <ActionButton onClick={() => deleteCell(id)} icon="fas fa-times" />
    </div>
  )
}

export default ActionBar
