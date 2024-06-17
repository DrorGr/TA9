import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NewItemPopupComponent } from './item-popup.component'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { Item } from '../../_models/item'
import { addItem } from '../../store/items/items.actions' // Added missing import

describe('NewItemPopupComponent', () => {
  let component: NewItemPopupComponent
  let fixture: ComponentFixture<NewItemPopupComponent>
  let store: MockStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewItemPopupComponent],
      providers: [provideMockStore()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemPopupComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store) as MockStore
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should close the popup', () => {
    spyOn(component, 'closePopup')
    component.closePopup()
    expect(component.closePopup).toHaveBeenCalled()
  })

  it('should cancle', () => {
    spyOn(component, 'cancle')
    component.cancle()
    expect(component.cancle).toHaveBeenCalled()
  })

  it('should handle input change', () => {
    const event = { target: { value: 'Test' } }
    component.inputChange(event)
    expect(component.item.name).toBe('Test')
  })

  it('should save the item', () => {
    spyOn(store, 'dispatch')
    const item: Item = { id: 1, name: 'Test Item', color: 'red' } // Added missing color property
    component.item = item
    component.save()
    expect(store.dispatch).toHaveBeenCalledWith(addItem({ item }))
  })

  it('should destroy the component', () => {
    spyOn(component, 'ngOnDestroy' as never) // Fixed the type error by casting the method name to 'never'
    component.ngOnDestroy()
    expect(component.ngOnDestroy).toHaveBeenCalled()
  })
})
