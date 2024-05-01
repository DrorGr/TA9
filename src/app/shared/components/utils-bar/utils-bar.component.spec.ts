import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UtilsBarComponent } from './utils-bar.component'

describe('UtilsBarComponent', () => {
  let component: UtilsBarComponent
  let fixture: ComponentFixture<UtilsBarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtilsBarComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilsBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  it('should set the view', () => {
    const view = 'example view'
    component.setView(view)
    expect(component.getView().value).toBe(view)
  })

  it('should open the add item popup', () => {
    spyOn(window, 'open')
    component.openAddItemPopup()
    expect(window.open).toHaveBeenCalled()
  })
})
