import { Component, inject } from '@angular/core';
import { VesselsStore } from '../../store/store';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { VesselRowData } from '../../models/navtor.interface';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-vessels-view',
  imports: [AgGridAngular],
  templateUrl: './VesselsView.html',
  styleUrl: './VesselsView.css',
  providers: [VesselsStore],
})
export class VesselsView {
  store = inject(VesselsStore);
  rowData2: VesselRowData[] = this.store.gridRowData();

  colDefs: ColDef[] = [
    { field: 'name' },
    { field: 'mmsi' },
    { field: 'imo' },
    { field: 'companyName' },
    { field: 'vesselType' },
  ];
  defaultColDef: ColDef = {
    flex: 1,
  };
}
