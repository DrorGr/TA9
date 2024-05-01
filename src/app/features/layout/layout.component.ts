import { Component } from '@angular/core'
import { TopPageComponent } from '../top-page/top-page.component'
import { ContentContainerComponent } from '../content-container/content-container.component'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [TopPageComponent, ContentContainerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
