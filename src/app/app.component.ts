import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LayoutComponent } from '../app/shared/components/layout/layout.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'TA9'
}
