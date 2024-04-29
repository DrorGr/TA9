import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ItemModel } from '../../_models/item'

export const getItemState = createFeatureSelector<ItemModel>('item')

export const geItemsList = createSelector(getItemState, state => {
  return state?.list
})
