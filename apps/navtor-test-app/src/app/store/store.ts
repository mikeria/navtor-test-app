import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { VesselInterface } from '../models/navtor.interface';
import { VesselService } from '../services/vessel.service';
import { inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';

export interface VesselsStateInterface {
  vessels: VesselInterface[];
  isLoading: boolean;
  error: string | null;
}

export const VesselssStore = signalStore(
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
