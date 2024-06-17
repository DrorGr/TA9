import { Component, Input, OnInit, SimpleChanges } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ListItemComponent } from '../../shared/components/list-item/list-item.component'
import { TileItemComponent } from '../../shared/components/tile-item/tile-item.component'
import { Store } from '@ngrx/store'
import { UtilsBarComponentService } from '../../shared/components/utils-bar/utils-bar.component.service'
import { Item } from '../../_models/item'
import { deleteItem } from '../../store/items/items.actions'
import { geItemsList } from '../../store/items/items.selector'
import { SearchBarService } from '../../shared/components/search-bar/search-bar.component.service'

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

  listItems: Item[]
  originalListItems!: Item[]
  searchValue: string = ''
  viewState: string = 'List'
  sortType: string = 'createDate'
  reverse: boolean = false
  pagination = {
    currentPage: 1,
    first: 0,
    rows: 10,
    totalRecords: 0,
  }

  ngOnInit() {
    this.loadInitialData()
    UtilsBarComponentService.getViewState().subscribe((viewState: string) => {
      this.viewState = viewState
      this.paginate(null, viewState)
    })

    this.SearchBarService.getSearchValue().subscribe(value => {
      this.filterItems(value)
    })
    UtilsBarComponentService.getIsAddItemPopupOpen().subscribe(() => {
      this.loadInitialData(true)
    })
  }

  loadInitialData(dontSort?: boolean) {
    // this.store.dispatch(loadItem())
    this.store.select(geItemsList).subscribe(item => {
      if (item) {
        this.listItems = item
        this.originalListItems = item
        dontSort && this.sortItems('createDate', true)
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

  sortItems(by: string, reverse: boolean) {
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
        this.pagination.totalRecords = this.listItems.length
        this.paginate(null, this.viewState)
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
    this.reverse = false
  }

  deleteItem(item: Item) {
    this.store.dispatch(deleteItem({ id: item.id as number }))
  }
  editItem(item: Item) {
    item = { ...item, lastUpdateDate: new Date() }
    UtilsBarComponentService.editItem(item)
  }

  paginate(direction?: string, viewState?: string) {
    !this.listItems ? this.loadInitialData(true) : null
    !viewState ? (viewState = this.viewState) : (this.viewState = viewState)
    this.pagination.rows = viewState === 'List' ? 8 : 20
    if (!direction) {
      this.pagination.first = 0
    }
    if (direction === 'next') {
      this.pagination.first += this.pagination.rows
    } else if (direction === 'prev') {
      this.pagination.first -= this.pagination.rows
    }
    this.pagination.currentPage =
      this.pagination.first / this.pagination.rows + 1
    return this.listItems.slice(
      this.pagination.first,
      this.pagination.first + this.pagination.rows,
    )
  }

  filterItems(searchValue: string) {
    if (searchValue) {
      this.listItems = this.originalListItems.filter(item =>
        item.name.toLowerCase().startsWith(searchValue.toLowerCase()),
      )
      this.paginate(null, this.viewState)
    } else {
      this.loadInitialData(true)
    }
  }

  ngOnDestroy() {
    UtilsBarComponentService.getViewState().unsubscribe()
    this.SearchBarService.getSearchValue().unsubscribe()
  }
}
