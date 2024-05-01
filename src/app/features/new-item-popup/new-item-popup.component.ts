import { Component, Input, OnInit } from '@angular/core'
import { UtilsBarComponentService } from '../utils-bar/utils-bar.component.service'
import { Item } from '../../_models/item'
import { addItem, loadItem } from '../../store/items/items.actions'
import { geItemsList } from '../../store/items/items.selector'
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-new-item-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-item-popup.component.html',
  styleUrl: './new-item-popup.component.scss',
})
export class NewItemPopupComponent implements OnInit {
  private _id = 0
  isHidden!: boolean
  item!: Item
  constructor(private store: Store) {
    UtilsBarComponentService.getIsAddItemPopupOpen().subscribe(value => {
      this.isHidden = !value
    })
  }

  ngOnInit() {
    this.store.select(geItemsList).subscribe(list => {
      return (this._id = list.length + 1)
    })
    this.item = {
      id: this._id,
      name: '',
      color: '#000000',
      description: '',
      createDate: new Date(),
      lastUpdateDate: new Date(),
      createdBy: 'Logged in user',
    }
  }

  closePopup() {
    UtilsBarComponentService.setOpenAddItemPopup(false)
  }

  cancle() {
    this.closePopup()
  }

  inputChange(event: any) {
    this.item = {
      ...this.item,
      [event.target.id]: event.target.value,
    }
  }

  save() {
    this.store.dispatch(addItem({ item: this.item }))
    this.store.dispatch(loadItem())
    this.closePopup()
  }

  ongOnDestroy() {
    UtilsBarComponentService.getIsAddItemPopupOpen().unsubscribe()
  }
}
