import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VesselInterface } from '../models/navtor.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VesselService {
  httpClient = inject(HttpClient);
  getVessels(): Observable<VesselInterface[]> {
    return this.httpClient.get<VesselInterface[]>(
      'https://frontendteamfiles.blob.core.windows.net/exercises/vessels.json',
    );
  }
}
