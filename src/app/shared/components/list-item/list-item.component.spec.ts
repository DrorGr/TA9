import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ListItemComponent } from './list-item.component'
import { Item } from '../../../_models/item'

describe('ListItemComponent', () => {
  let component: ListItemComponent
  let fixture: ComponentFixture<ListItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListItemComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit deleteClick event when onDeleteClick is called', () => {
    spyOn(component.deleteClick, 'emit')
    component.onDeleteClick()
    expect(component.deleteClick.emit).toHaveBeenCalled()
  })

  it('should have item input property', () => {
    const item: Item = { id: 1, name: 'Test Item', color: 'red' }
    component.item = item
    expect(component.item).toEqual(item)
  })
})
