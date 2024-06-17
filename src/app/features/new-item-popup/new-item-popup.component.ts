import { Component, Input, OnInit } from '@angular/core'
import { UtilsBarComponentService } from '../../shared/components/utils-bar/utils-bar.component.service'
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
  isHidden!: boolean
  item!: Item
  constructor(private store: Store) {
    UtilsBarComponentService.getIsAddItemPopupOpen().subscribe(value => {
      this.isHidden = !value
    })
  }

  ngOnInit() {
    this.item = {
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
    this.item.id = Math.floor(Math.random() * 100000)
    this.store.dispatch(addItem({ item: this.item }))
    this.store.dispatch(loadItem())
    this.closePopup()
  }

  ngOnDestroy() {
    UtilsBarComponentService.getIsAddItemPopupOpen().unsubscribe()
  }
}
