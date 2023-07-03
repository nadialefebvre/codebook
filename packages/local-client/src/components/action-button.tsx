interface ActionButtonInterface {
  icon: string
  onClick: () => void
}

const ActionButton: React.FC<ActionButtonInterface> = ({ icon, onClick }) => {
  return (
    <button className="button is-primary is-small" onClick={onClick}>
      <span className="icon">
        <i className={icon}></i>
      </span>
    </button>
  )
}

export default ActionButton
