import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TileItemComponent } from './tile-item.component'
import { CommonModule } from '@angular/common'
import { Item } from '../../../_models/item'

describe('TileItemComponent', () => {
  let component: TileItemComponent
  let fixture: ComponentFixture<TileItemComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TileItemComponent],
      imports: [CommonModule],
    }).compileComponents()
  })

  it('should have an input property "item"', () => {
    const item: Item = { id: 1, name: 'Test Item', color: 'red' }
    component.item = item
    expect(component.item).toEqual(item)
  })
})
