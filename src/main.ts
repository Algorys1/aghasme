import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { LucideAngularModule, Dumbbell, Battery, Brain, Cog, Leaf } from 'lucide-angular';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      LucideAngularModule.pick({ Dumbbell, Battery, Brain, Cog, Leaf })
    )
  ]
}).catch(err => console.error(err));
