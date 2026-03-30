import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  EmissionsInterface,
  VesselInterface,
  VesselRowData,
} from '../models/navtor.interface';
import { VesselService } from '../services/vessel.service';
import { computed, inject } from '@angular/core';
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
  selectedEmissions: EmissionsInterface | null;
}

export const VesselsStore = signalStore(
  withState<VesselsStateInterface>({
    vessels: [],
    error: null,
    isLoading: false,
  }),
  withComputed((store) => ({
    gridRowData: computed(() =>
      store.vessels().map((vessel) => {
        const rowData: VesselRowData = {
          name: vessel.name,
          companyName: vessel.companyName,
          mmsi: vessel.mmsi,
          imo: vessel.imo,
          vesselType: vessel.vesselType,
        };
        return rowData;
      }),
    ),
  })),
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
    selectedEmissions: null,
    error: null,
    isLoading: false,
  }),
  withComputed((store) => ({
    availableVesselEmmisionsIds: computed(() =>
      store.emissions().map((e) => e.id),
    ),
    ch4Series: computed(() => {
      if (!store.selectedEmissions()) {
        return [];
      }
      return store.selectedEmissions()!.timeSeries.map((e) => {
        const date = new Date(e.report_to_utc);
        return {
          x: date,
          y: e.ch4_emissions,
        };
      });
    }),
    sox_emissions: computed(() => {
      if (!store.selectedEmissions()) {
        return [];
      }
      return store.selectedEmissions()!.timeSeries.map((e) => {
        const date = new Date(e.report_to_utc);
        return {
          x: date,
          y: e.sox_emissions,
        };
      });
    }),
    nox_emissions: computed(() => {
      if (!store.selectedEmissions()) {
        return [];
      }
      return store.selectedEmissions()!.timeSeries.map((e) => {
        const date = new Date(e.report_to_utc);
        return {
          x: date,
          y: e.nox_emissions,
        };
      });
    }),
  })),
  withMethods((store, emissionsService = inject(EmissionsService)) => ({
    updateSelectedEmissions(id: number) {
      const updated = [...store.emissions().filter((e) => e.id === id)];
      patchState(store, { selectedEmissions: updated[0] });
    },
    loadEmissions: rxMethod<void>(
      pipe(
        switchMap(() => {
          return emissionsService.getEmissions().pipe(
            tap((emissions) => {
              patchState(store, {
                emissions,
                isLoading: false,
                selectedEmissions: emissions.length ? emissions[0] : null,
              });
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadEmissions();
    },
  }),
);
