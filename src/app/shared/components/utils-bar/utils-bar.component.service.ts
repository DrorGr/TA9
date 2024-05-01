import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ViewState } from '../../../_models/viewState'

@Injectable({
  providedIn: 'root',
})
export class UtilsBarComponentService {
  private static viewState: BehaviorSubject<ViewState['view']> =
    new BehaviorSubject<ViewState['view']>('List')

  private static isAddItemPopupOpen: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false)

  public static changeView(view: ViewState['view']) {
    this.viewState.next(view)
  }

  public static getViewState() {
    return this.viewState
  }

  public static setOpenAddItemPopup(value: boolean) {
    this.isAddItemPopupOpen.next(value)
  }

  public static getIsAddItemPopupOpen() {
    return this.isAddItemPopupOpen
  }
}
