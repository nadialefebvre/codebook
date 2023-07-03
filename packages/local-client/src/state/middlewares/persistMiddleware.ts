import { Dispatch } from "redux"

import { ActionType } from "../actionTypes"
import { Action } from "../actions"
import { RootState } from "../reducers"

import { saveCells } from "../actionCreators"

export const persistMiddleware = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>
  getState: () => RootState
}) => {
  let timer: any

  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action)

      if (
        [
          ActionType.DELETE_CELL,
          ActionType.INSERT_CELL_AFTER,
          ActionType.MOVE_CELL,
          ActionType.UPDATE_CELL,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState)
        }, 250)
      }
    }
  }
}
