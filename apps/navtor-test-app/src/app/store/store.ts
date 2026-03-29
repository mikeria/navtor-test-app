import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  EmissionsInterface,
  VesselInterface,
} from '../models/navtor.interface';
import { VesselService } from '../services/vessel.service';
import { inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { EmissionsService } from '../services/emissions.service';

export interface VesselsStateInterface {
  vessels: VesselInterface[];
  isLoading: boolean;
  error: string | null;
}
export interface EmissionsStateInterface {
  emissions: EmissionsInterface[];
  isLoading: boolean;
  error: string | null;
}

export const VesselsStore = signalStore(
  withState<VesselsStateInterface>({
    vessels: [],
    error: null,
    isLoading: false,
  }),
  withMethods((store, vesselService = inject(VesselService)) => ({
    loadVessels: rxMethod<void>(
      pipe(
        switchMap(() => {
          return vesselService.getVessels().pipe(
            tap((vessels) => {
              patchState(store, { vessels });
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadVessels();
    },
  }),
);
export const EmissionsStore = signalStore(
  withState<EmissionsStateInterface>({
    emissions: [],
    error: null,
    isLoading: false,
  }),
  withMethods((store, emissionsService = inject(EmissionsService)) => ({
    loadEmissions: rxMethod<void>(
      pipe(
        switchMap(() => {
          return emissionsService.getEmissions().pipe(
            tap((emissions) => {
              patchState(store, { emissions });
            }),
          );
        }),
      ),
    ),
  })),
);
