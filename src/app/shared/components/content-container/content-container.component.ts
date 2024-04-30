import { Component, Input, OnInit, SimpleChanges } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ListItemComponent } from '../../../features/list-item/list-item.component'
import { TileItemComponent } from '../../../features/tile-item/tile-item.component'
import { Store } from '@ngrx/store'
import { UtilsBarComponentService } from '../../../features/utils-bar/utils-bar.component.service'
import { Item } from '../../../_models/item'
import { deleteItem, loadItem } from '../../../store/items/items.actions'
import { geItemsList } from '../../../store/items/items.selector'
import { SearchBarService } from '../../../features/search-bar/search-bar.component.service'

@Component({
  selector: 'app-content-container',
  standalone: true,
  imports: [CommonModule, ListItemComponent, TileItemComponent],
  templateUrl: './content-container.component.html',
  styleUrl: './content-container.component.scss',
})
export class ContentContainerComponent implements OnInit {
  constructor(
    private store: Store,
    private SearchBarService: SearchBarService,
  ) {}

  searchValue: string = ''
  listItems!: Item[]
  viewState: string = 'List'
  sortType: string = 'createDate'
  currentPage: number = 1
  reverse: boolean = false
  pagination = {
    first: 0,
    rows: this.viewState === 'List' ? 8 : 20,
    totalRecords: 0,
  }

  ngOnInit() {
    UtilsBarComponentService.getViewState().subscribe((viewState: string) => {
      this.viewState = viewState
    })
    this.loadInitialData()

    this.SearchBarService.getSearchValue().subscribe(value => {
      this.filterItems(value)
    })
  }

  loadInitialData() {
    this.store.dispatch(loadItem())
    this.store.select(geItemsList).subscribe(item => {
      if (item) {
        this.listItems = item
        this.sortItems('createDate', false)
        this.pagination.totalRecords = this.listItems.length
      }
      if (
        this.listItems.length > this.pagination.rows &&
        this.pagination.first === 0
      ) {
        this.paginate()
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
    this.store.dispatch(loadItem())
  }

  editItem(item: Item) {
    UtilsBarComponentService.setOpenAddItemPopup(true)
  }
  paginate(direction?: string) {
    if (direction === 'next') {
      this.pagination.first += this.pagination.rows
    } else if (direction === 'prev') {
      this.pagination.first -= this.pagination.rows
    }
    this.currentPage = this.pagination.first / this.pagination.rows + 1
    return this.listItems.slice(
      this.pagination.first,
      this.pagination.first + this.pagination.rows,
    )
  }

  filterItems(searchValue: string) {
    if (searchValue) {
      this.listItems = this.listItems.filter(item =>
        item.name.toLowerCase().startsWith(searchValue.toLowerCase()),
      )
    } else {
      this.loadInitialData()
    }
  }

  ngOnDestroy() {
    UtilsBarComponentService.getViewState().unsubscribe()
  }
}
