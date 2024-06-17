import { Item } from './item'

export interface PopupState extends Item {
  state: string
  item: Item | null
}
