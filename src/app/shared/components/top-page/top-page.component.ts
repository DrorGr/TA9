import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SearchBarComponent } from '../../../features/search-bar/search-bar.component'
import { UrlBarComponent } from '../../../features/url-bar/url-bar.component'
import { UtilsBarComponent } from '../../../features/utils-bar/utils-bar.component'

@Component({
  selector: 'app-top-page',
  standalone: true,
  imports: [SearchBarComponent, UrlBarComponent, UtilsBarComponent],
  providers: [CommonModule],
  templateUrl: './top-page.component.html',
  styleUrl: './top-page.component.scss',
})
export class TopPageComponent {}
