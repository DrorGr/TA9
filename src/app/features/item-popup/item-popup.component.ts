import { Component, SimpleChanges, Input, OnChanges } from '@angular/core'
import { UtilsBarComponentService } from '../../shared/components/utils-bar/utils-bar.component.service'
import { Item } from '../../_models/item'
import { addItem, loadItem, updateItem } from '../../store/items/items.actions'
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-new-item-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-popup.component.html',
  styleUrl: './item-popup.component.scss',
})
export class NewItemPopupComponent {
  @Input() isHidden!: boolean
  popupProps: any = ['', {}]
  item!: Item

  constructor(private store: Store) {
    UtilsBarComponentService.getIsAddItemPopupOpen().subscribe(value => {
      this.isHidden = !value
      this.store.dispatch(loadItem())
      if (this.isHidden === false) {
        this.popupProps = UtilsBarComponentService.popupState.getValue()
        if (this.popupProps[0] === 'edit') {
          this.item = this.popupProps[1]
        } else {
          this.item = {
            name: '',
            color: '#000000',
            description: '',
            createDate: new Date(),
            lastUpdateDate: new Date(),
            createdBy: 'Logged in user',
          }
        }
      }
    })
  }

  closePopup() {
    this.store.dispatch(loadItem())
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
    if (this.popupProps[0] === 'new') {
      this.item.id = Math.floor(Math.random() * 100000).toString()
      this.store.dispatch(addItem({ item: this.item }))
    }
    if (this.popupProps[0] === 'edit') {
      this.store.dispatch(updateItem({ inputdata: this.item }))
    }
    this.store.dispatch(loadItem())
    setTimeout(() => {
      this.closePopup()
    }, 100)
  }

  ngOnDestroy() {
    UtilsBarComponentService.getIsAddItemPopupOpen().unsubscribe()
  }
}
