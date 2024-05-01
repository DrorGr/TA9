import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LayoutComponent } from './layout.component'
import { TopPageComponent } from '../top-page/top-page.component'
import { ContentContainerComponent } from '../content-container/content-container.component'

describe('LayoutComponent', () => {
  let component: LayoutComponent
  let fixture: ComponentFixture<LayoutComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LayoutComponent,
        TopPageComponent,
        ContentContainerComponent,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
