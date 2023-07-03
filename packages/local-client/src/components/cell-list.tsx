import { Fragment, useEffect } from "react"

import "./cell-list.css"

import { useActions } from "../hooks/use-actions"
import { useTypedSelector } from "../hooks/use-typed-selector"

import AddCell from "./add-cell"
import CellListItem from "./cell-list-item"

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { data, order } }) => {
    return order.map((id) => data[id])
  })

  const { fetchCells } = useActions()

  useEffect(() => {
    fetchCells()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ))

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  )
}

export default CellList
