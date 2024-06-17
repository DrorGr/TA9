import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ViewState } from '../../../_models/viewState'
import { PopupState } from '../../../_models/PopupState'
import { Item } from '../../../_models/item'

@Injectable({
  providedIn: 'root',
})
export class UtilsBarComponentService {
  private static viewState: BehaviorSubject<ViewState['view']> =
    new BehaviorSubject<ViewState['view']>('List')

  public static popupState: BehaviorSubject<[PopupState['state'], Item]> =
    new BehaviorSubject<[PopupState['state'], Item]>(['', {} as Item])

  private static isAddItemPopupOpen: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false)

  public itemHolder: Item = {} as Item

  public static changeView(view: ViewState['view']) {
    this.viewState.next(view)
  }

  public static getViewState() {
    return this.viewState
  }

  public static setOpenAddItemPopup(value: boolean) {
    this.popupState.next(['new', {} as Item])
    this.isAddItemPopupOpen.next(value)
  }

  public static getIsAddItemPopupOpen() {
    return this.isAddItemPopupOpen
  }

  public static editItem(item: Item) {
    this.popupState.next(['edit', item])
    this.isAddItemPopupOpen.next(true)
  }
}
