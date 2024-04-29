export interface Item {
  id?: number | null
  name: string | null
  color: string | null
  description?: string | null
  createDate?: Date | null
  lastUpdateDate?: Date | null
  createdBy?: string | null
}

export interface ItemModel {
  list: Item[]
  errormessage: string
  editdata: Item
}
