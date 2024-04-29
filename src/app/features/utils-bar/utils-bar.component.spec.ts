import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UtilsBarComponent } from './utils-bar.component'

describe('UtilsBarComponent', () => {
  let component: UtilsBarComponent
  let fixture: ComponentFixture<UtilsBarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilsBarComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(UtilsBarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
