import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Item } from '../_models/item'

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private http: HttpClient) {}

  Getallitems() {
    return this.http.get<Item[]>('http://localhost:3000/items')
  }

  CreateItem(item: Item) {
    return this.http.post('http://localhost:3000/items', item)
  }
  UpdateItem(item: Item) {
    return this.http.put('http://localhost:3000/items/' + item.id, item)
  }
  DeleteItem(id: number) {
    return this.http.delete('http://localhost:3000/items/' + id)
  }

  haveaccess() {
    return true
  }
}
