import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Item } from '../../_models/item'

@Component({
  selector: 'app-tile-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile-item.component.html',
  styleUrl: './tile-item.component.scss',
})
export class TileItemComponent {
  @Input() item!: Item
}
