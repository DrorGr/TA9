import { ComponentFixture, TestBed } from '@angular/core/testing'
import { UrlBarComponent } from './url-bar.component'

describe('UrlBarComponent', () => {
  let component: UrlBarComponent
  let fixture: ComponentFixture<UrlBarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UrlBarComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the component', () => {
    expect(component).toBeTruthy()
  })

  // Add more tests here as needed
})
