import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LayoutComponent } from './features/layout/layout.component'
import { NewItemPopupComponent } from './features/new-item-popup/new-item-popup.component'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutComponent,
    NewItemPopupComponent,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'TA9'
}
