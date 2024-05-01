import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TopPageComponent } from './top-page.component'
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component'
import { UrlBarComponent } from '../../shared/components/url-bar/url-bar.component'
import { UtilsBarComponent } from '../../shared/components/utils-bar/utils-bar.component'

describe('TopPageComponent', () => {
  let component: TopPageComponent
  let fixture: ComponentFixture<TopPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TopPageComponent,
        SearchBarComponent,
        UrlBarComponent,
        UtilsBarComponent,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
