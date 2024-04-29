import { createAction, props } from '@ngrx/store'
import { Item } from '../../_models/item'

export const LOAD_ITEMS = '[item] load item'
export const LOAD_ITEMS_SUCCESS = '[item] load item success'
export const LOAD_ITEMS_FAIL = '[item] load item fail'

export const GET_ITEMS = '[item] get item'
export const GET_ITEMS_SUCCESS = '[item] get item success'

export const ADD_ITEMS = '[item] add item'
export const ADD_ITEMS_SUCCESS = '[item] add item success'

export const UPDATE_ITEMS = '[item] update item'
export const UPDATE_ITEMS_SUCCESS = '[item] update item success'

export const DELETE_ITEMS = '[item] delete item'
export const DELETE_ITEMS_SUCCESS = '[item] delete item success'

export const SHOW_ALERT = '[item] show alert'

export const loadItem = createAction(LOAD_ITEMS)
export const loadItemSuccess = createAction(
  LOAD_ITEMS_SUCCESS,
  props<{ list: Item[] }>(),
)
export const loadItemFail = createAction(
  LOAD_ITEMS_FAIL,
  props<{ errormessage: string }>(),
)

export const getItem = createAction(GET_ITEMS, props<{ code: string }>())
export const getItemSuccess = createAction(
  GET_ITEMS_SUCCESS,
  props<{ obj: Item }>(),
)

export const addItem = createAction(ADD_ITEMS, props<{ item: Item }>())
export const addItemSuccess = createAction(ADD_ITEMS_SUCCESS)

export const updateItem = createAction(
  UPDATE_ITEMS,
  props<{ inputdata: Item }>(),
)
export const updateItemSuccess = createAction(UPDATE_ITEMS_SUCCESS)

export const deleteItem = createAction(DELETE_ITEMS, props<{ id: number }>())
export const deleteItemSuccess = createAction(
  DELETE_ITEMS_SUCCESS,
  props<{ id: number }>(),
)

export const showAlert = createAction(
  SHOW_ALERT,
  props<{ message: string; resptype: string }>(),
)
export const emptyAction = createAction('emptyaction')
