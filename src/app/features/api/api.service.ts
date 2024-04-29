import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  addItem(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/items', data)
  }

  updateItem(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/items/${id}`, data)
  }

  getItemList(): Observable<any> {
    return this._http.get('http://localhost:3000/items')
  }

  deleteItem(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/items/${id}`)
  }
}
