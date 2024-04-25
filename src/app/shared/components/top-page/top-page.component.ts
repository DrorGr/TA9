import { Component } from '@angular/core'
import { SearchBarComponent } from '../../../features/search-bar/search-bar.component'

@Component({
  selector: 'app-top-page',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './top-page.component.html',
  styleUrl: './top-page.component.scss',
})
export class TopPageComponent {}
