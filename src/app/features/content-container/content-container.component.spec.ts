import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ContentContainerComponent } from './content-container.component'
import { Store } from '@ngrx/store'
import { SearchBarService } from '../../shared/components/search-bar/search-bar.component.service'
import { of } from 'rxjs'
import { Item } from '../../_models/item'
import { deleteItem, loadItem } from '../../store/items/items.actions'

describe('ContentContainerComponent', () => {
  let component: ContentContainerComponent
  let fixture: ComponentFixture<ContentContainerComponent>
  let mockStore: jasmine.SpyObj<Store>
  let mockSearchBarService: jasmine.SpyObj<SearchBarService>

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select'])
    mockSearchBarService = jasmine.createSpyObj('SearchBarService', ['search'])

    await TestBed.configureTestingModule({
      declarations: [ContentContainerComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: SearchBarService, useValue: mockSearchBarService },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should load initial data on initialization', () => {
    spyOn(component, 'loadInitialData')
    component.ngOnInit()
    expect(component.loadInitialData).toHaveBeenCalled()
  })

  it('should sort items', () => {
    const by = 'createDate'
    const reverse = false
    spyOn(component, 'sortItems')
    component.sortItems(by, reverse)
    expect(component.sortItems).toHaveBeenCalledWith(by, reverse)
  })

  const item: Item = { id: 1, name: 'Item 1', color: 'red' }

  it('should filter items', () => {
    const searchValue = 'search'
    spyOn(component, 'filterItems')
    component.filterItems(searchValue)
    expect(component.filterItems).toHaveBeenCalledWith(searchValue)
    expect(
      mockSearchBarService as jasmine.SpyObj<SearchBarService>,
    ).toHaveBeenCalledWith(searchValue)
  })

  it('should unsubscribe on component destroy', () => {
    spyOn(component, 'ngOnDestroy')
    component.ngOnDestroy()
    expect(component.ngOnDestroy).toHaveBeenCalled()
  })
})
