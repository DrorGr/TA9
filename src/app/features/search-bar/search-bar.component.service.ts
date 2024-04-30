import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  public searchValue: BehaviorSubject<string> = new BehaviorSubject<string>('')

  getSearchValue() {
    return this.searchValue
  }

  setSearchValue(value: string) {
    this.searchValue.next(value)
  }
}
