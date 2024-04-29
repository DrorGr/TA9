import { createReducer, on } from '@ngrx/store'
import { itemState } from './items.state'
import {
  deleteItemSuccess,
  getItemSuccess,
  loadItemFail,
  loadItemSuccess,
} from './items.actions'

const _ItemReducer = createReducer(
  itemState,
  on(loadItemSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errormessage: '',
      editdata: {
        code: '',
        name: '',
        email: '',
        phone: '',
        color: null,
      },
    }
  }),
  on(getItemSuccess, (state, action) => {
    return {
      ...state,
      errormessage: '',
      editdata: action.obj,
    }
  }),
  on(loadItemFail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage,
    }
  }),
  on(deleteItemSuccess, (state, action) => {
    let _newdata = state.list.filter(o => o.id != action.id)
    return {
      ...state,
      list: _newdata,
      errormessage: '',
    }
  }),
)

export function ItemReducer(state: any, action: any) {
  return _ItemReducer(state, action)
}
