import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, Dumbbell, Battery, Brain, Cog, Leaf } from 'lucide-angular';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from './app/core/i18n/multi-translate-loader';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    provideTranslateService({
      fallbackLang: 'en',
      lang: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) =>
          new MultiTranslateHttpLoader(http, [
            'actions',
            'character',
            'items',
            'lore',
            'map',
            'menus',
            'overlay.anomaly',
            'overlay.caravan',
            'overlay.city',
            'overlay.village',
            'overlay.farm',
            'overlay.ritual',


          ]),
        deps: [HttpClient]
      }
    }),
    importProvidersFrom(
      LucideAngularModule.pick({ Dumbbell, Battery, Brain, Cog, Leaf })
    )
  ]
}).catch(err => console.error(err));
