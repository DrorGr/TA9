import { Component, Input, SimpleChanges } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { bootstrapSearch } from '@ng-icons/bootstrap-icons'
import { SearchBarService } from './search-bar.component.service'

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  viewProviders: [provideIcons({ bootstrapSearch })],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  constructor(private searchBarService: SearchBarService) {}
  @Input() _searchValue: string = ''

  updateSearchValue(event: any) {
    this._searchValue = event.target.value
    this.searchBarService.setSearchValue(this._searchValue)
  }

  placeHolder = 'Search for a movie...'
  displayIcon = 'bootstrapSearch'
}
