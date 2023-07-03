import { produce } from "immer"

import { ActionType } from "../actionTypes"
import { Action } from "../actions"

interface BundlesState {
  [key: string]:
    | {
        code: string
        err: string
        loading: boolean
      }
    | undefined
}

const initialState: BundlesState = {}

const reducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          code: "",
          err: "",
          loading: true,
        }
        return state

      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
          loading: false,
        }

        return state

      default:
        return state
    }
  },
  initialState
)

export default reducer
