import { Component, OnInit, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ListItemComponent } from '../../../features/list-item/list-item.component'
import { TileItemComponent } from '../../../features/tile-item/tile-item.component'
import { Store } from '@ngrx/store'
import { UtilsBarComponentService } from '../../../features/utils-bar/utils-bar.component.service'
import { Item } from '../../../_models/item'
import { deleteItem, loadItem } from '../../../store/items/items.actions'
import { geItemsList } from '../../../store/items/items.selector'

@Component({
  selector: 'app-content-container',
  standalone: true,
  imports: [CommonModule, ListItemComponent, TileItemComponent],
  templateUrl: './content-container.component.html',
  styleUrl: './content-container.component.scss',
})
export class ContentContainerComponent implements OnInit {
  constructor(private store: Store) {}
  listItems!: Item[]
  viewState: string = 'List'
  sortType: string = 'createDate'
  reverse: boolean = false
  pagination: any = {
    first: 0,
    rows: 10,
    totalRecords: 0,
  }

  ngOnInit() {
    UtilsBarComponentService.getViewState().subscribe((viewState: string) => {
      this.viewState = viewState
    })
    this.loadInitialData()
  }

  loadInitialData() {
    this.store.dispatch(loadItem())
    this.store.select(geItemsList).subscribe(item => {
      if (item) {
        this.listItems = item
        this.sortItems('createDate', false)
      }
      if (this.listItems.length > 8) {
        this.paginate({ first: 0, rows: 8 })
      }
    })
  }

  sortItems(by: string = 'createDate', reverse: boolean) {
    this.sortType = by
    this.reverse = reverse

    switch (by) {
      case 'name':
        this.listItems = [...this.listItems].sort((a: Item, b: Item) =>
          a.name.localeCompare(b.name) ? (reverse ? -1 : 1) : !reverse ? 1 : -1,
        )
        break
      case 'createDate':
        this.listItems = [...this.listItems].sort((a: Item, b: Item) =>
          new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
            ? reverse
              ? -1
              : 1
            : !reverse
            ? 1
            : -1,
        )
        break
      case 'lastUpdateDate':
        this.listItems = [...this.listItems].sort((a: Item, b: Item) =>
          new Date(a.lastUpdateDate).getTime() -
          new Date(b.lastUpdateDate).getTime()
            ? reverse
              ? -1
              : 1
            : !reverse
            ? 1
            : -1,
        )
        break
      case 'createdBy':
        this.listItems = [...this.listItems].sort((a: Item, b: Item) =>
          a.createdBy.localeCompare(b.createdBy)
            ? reverse
              ? -1
              : 1
            : !reverse
            ? 1
            : -1,
        )
        break
      case 'color':
        this.listItems = [...this.listItems].sort((a: Item, b: Item) =>
          a.color.localeCompare(b.color)
            ? reverse
              ? -1
              : 1
            : !reverse
            ? 1
            : -1,
        )
        break
      default:
        break
    }
  }

  deleteItem(item: Item) {
    this.store.dispatch(deleteItem({ id: item.id as number }))
  }

  paginate(event: any) {
    this.pagination.first = event.first
    this.pagination.rows = event.rows
    return (this.listItems = [...this.listItems].slice(
      this.pagination.first,
      this.pagination.first + this.pagination.rows,
    ))
  }

  ngOnDestroy() {
    UtilsBarComponentService.getViewState().unsubscribe()
  }
}
