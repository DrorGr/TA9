import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Item } from '../../../_models/item'

@Component({
  selector: 'app-tile-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile-item.component.html',
  styleUrl: './tile-item.component.scss',
})
export class TileItemComponent {
  @Input() item!: Item
  @Output() editClick = new EventEmitter()

  onEditClick() {
    this.editClick.emit(this.item)
  }
}
