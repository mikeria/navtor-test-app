import { Component, computed, inject, signal } from '@angular/core';
import { EmissionsStore, VesselsStore } from '../../store/store';
import { HighchartsChartComponent } from 'highcharts-angular';
import Highcharts from 'highcharts';
import { ChartConstructorType } from 'highcharts-angular';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { VesselSelect } from '../../models/navtor.interface';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-emissions-view',
  imports: [HighchartsChartComponent, SelectModule, FormsModule],
  templateUrl: './EmissionsView.html',
  styleUrl: './EmissionsView.css',
  providers: [EmissionsStore, VesselsStore],
})
export class EmissionsView {
  store = inject(EmissionsStore);
  vstore = inject(VesselsStore);
  chartConstructor: ChartConstructorType = 'chart';
  selectedVessel: VesselSelect | undefined;
  sv = signal<string>('');
  selectProvider = computed(() =>
    this.vstore
      .vessels()
      .map((v) => {
        const vessel: VesselSelect = { name: v.name, id: v.id };
        return vessel;
      })
      .filter((v) => this.store.availableVesselEmmisionsIds().includes(v.id)),
  );
  getChartTitle(): string {
    return this.selectedVessel ? this.selectedVessel?.name + ' Emissions' : '';
  }
  chartOptions: Highcharts.Options = {
    title: {
      text: this.sv(),
    },
    series: [
      {
        data: [1, 2, 3],
        type: 'line',
      },
      {
        data: [2, 2, 4],
        type: 'line',
      },
      {
        data: [2, 2, 4],
        type: 'line',
      },
    ],
  };

  changeHandler(event: any) {
    this.store.updateSelectedEmissions(this.selectedVessel!.id);
    this.sv.set(this.selectedVessel!.name);
    this.chartOptions = {
      title: {
        text: this.sv() + ' Emissions',
      },
      xAxis: {
        labels: {
          formatter: function () {
            return formatDate(new Date(this.value), 'dd-MMM', 'en-US');
          },
        },
        title: {
          text: 'Date',
        },
        tickInterval: 1,
      },
      yAxis: {
        title: {
          text: 'Values',
        },
        tickInterval: 1,
      },
      series: [
        {
          name: 'Ch4 Emissions',
          data: this.store.ch4Series(),
          color: '#00FF00',
        },
        {
          name: 'Sox Emissions',
          data: this.store.sox_emissions(),
          color: '#FF00FF',
        },
        {
          name: 'Nox Emissions',
          data: this.store.nox_emissions(),
          color: '#46465c',
        },
      ],
    };
  }
}
