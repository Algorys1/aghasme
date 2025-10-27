import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, map, Observable } from 'rxjs';

export class MultiTranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, private resources: string[]) {}

  getTranslation(lang: string): Observable<Record<string, any>> {
    return forkJoin(
      this.resources.map(name =>
        this.http.get<Record<string, any>>(`/assets/i18n/${lang}/${name}.json`)      )
    ).pipe(map(parts => parts.reduce((acc, cur) => ({ ...acc, ...cur }), {})));
  }
}
