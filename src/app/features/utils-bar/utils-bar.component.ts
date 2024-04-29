import { Component } from '@angular/core'
import { UtilsBarComponentService } from './utils-bar.component.service'

@Component({
  selector: 'app-utils-bar',
  standalone: true,
  imports: [],
  templateUrl: './utils-bar.component.html',
  styleUrl: './utils-bar.component.scss',
})
export class UtilsBarComponent {
  constructor() {}

  setView(view: string) {
    UtilsBarComponentService.changeView(view)
  }

  getView() {
    return UtilsBarComponentService.getViewState()
  }

  openAddItemPopup() {
    UtilsBarComponentService.setOpenAddItemPopup(true)
  }
}
