import { Component } from '@angular/core'
import { TopPageComponent } from '../top-page/top-page.component'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TopPageComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
