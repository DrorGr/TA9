import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Item } from '../../../_models/item'
import { SimpleChanges } from '@angular/core'

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss',
})
export class ListItemComponent {
  @Input() item!: Item
  @Output() deleteClick = new EventEmitter()
  @Output() editClick = new EventEmitter()

  onDeleteClick() {
    this.deleteClick.emit(this.item)
  }
  onEditClick() {
    this.editClick.emit(this.item)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item']) {
      this.item = changes['item'].currentValue
    }
  }
}
