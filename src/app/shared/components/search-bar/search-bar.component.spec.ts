import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SearchBarComponent } from './search-bar.component'
import { SearchBarService } from './search-bar.component.service'

describe('SearchBarComponent', () => {
  let component: SearchBarComponent
  let fixture: ComponentFixture<SearchBarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      providers: [SearchBarService],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should update search value', () => {
    const event = { target: { value: 'test' } }
    component.updateSearchValue(event)
    expect((component as any).searchBarService.getSearchValue()).toBe('test')
  })

  it('should have default placeholder', () => {
    expect(component.placeHolder).toBe('Search for a movie...')
  })

  it('should have default display icon', () => {
    expect(component.displayIcon).toBe('bootstrapSearch')
  })
})
