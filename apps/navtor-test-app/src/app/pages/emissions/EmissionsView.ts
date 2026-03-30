import { Component, computed, inject, OnInit } from '@angular/core';
import { EmissionsStore, VesselsStore } from '../../store/store';
import { HighchartsChartComponent } from 'highcharts-angular';
import Highcharts from 'highcharts';
import { ChartConstructorType } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { VesselSelect } from '../../models/navtor.interface';

@Component({
  selector: 'app-emissions-view',
  imports: [HighchartsChartComponent, SelectModule, FormsModule],
  templateUrl: './EmissionsView.html',
  styleUrl: './EmissionsView.css',
  providers: [EmissionsStore, VesselsStore],
})
export class EmissionsView implements OnInit {
  store = inject(EmissionsStore);
  vstore = inject(VesselsStore);
  selectProvider = computed(() => 
    this.vstore.vessels().map((v) => {
       const vessel:VesselSelect  = {name: v.name, id: v.id};
       return vessel;
    })
  );
  chartOptions: Highcharts.Options = {
    series: [
      {
        data: [1, 2, 3],
        type: 'line',
      },
    ],
  };
  chartConstructor: ChartConstructorType = 'chart';
  selectedVessel: VesselSelect | undefined;
  ngOnInit() {
  }
}
