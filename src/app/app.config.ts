import { ApplicationConfig, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideStore } from '@ngrx/store'
import { provideHttpClient } from '@angular/common/http'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'
import { ItemEffects } from './store/items/items.effects'
import { ItemReducer } from './store/items/items.reducer'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ item: ItemReducer }),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([ItemEffects]),
  ],
}
