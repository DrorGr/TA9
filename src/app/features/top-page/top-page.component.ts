import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component'
import { UrlBarComponent } from '../../shared/components/url-bar/url-bar.component'
import { UtilsBarComponent } from '../../shared/components/utils-bar/utils-bar.component'

@Component({
  selector: 'app-top-page',
  standalone: true,
  imports: [SearchBarComponent, UrlBarComponent, UtilsBarComponent],
  providers: [CommonModule],
  templateUrl: './top-page.component.html',
  styleUrl: './top-page.component.scss',
})
export class TopPageComponent {}
