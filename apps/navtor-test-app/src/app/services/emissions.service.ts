import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmissionsInterface } from '../models/navtor.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmissionsService {
  httpClient = inject(HttpClient);
  getEmissions(): Observable<EmissionsInterface[]> {
    return this.httpClient.get<EmissionsInterface[]>(
      'https://frontendteamfiles.blob.core.windows.net/exercises/emissions.json',
    );
  }
}
