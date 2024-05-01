import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Item } from '../../_models/item'

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

  onDeleteClick() {
    this.deleteClick.emit(this.item)
  }
}