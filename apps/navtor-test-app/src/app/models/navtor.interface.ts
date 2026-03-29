
export interface VesselInterface {
    id: number;
    name: string;
    mmsi: number;
    imo: number;
    companyId: number;
    companyName: string;
    startDate: string;
    active: boolean;
    vesseltype: VesselType;
}
export interface EmissionsInterface {
    id: number;
    timeSeries: TimeSeries[];

}
export interface TimeSeries {
    report_from_utc: string;
    report_to_utc: string;
    co2_emissions: number;
    sox_emissions: number;
    nox_emissions: number;
    pm_emissions: number;
    ch4_emissions: number;

}
export type VesselType =  'Dry Cargo' | 'General Cargo' | 'Bulk Carrier' | 'Reefer' | 'Container' | 'Liquid Cargo' | 'Crude' 
| 'Crude' | 'Product Carrier' | 'Chemical Carrier' | 'Passenger' | 'Tug' | 'Livestock' | 'Tanker' | 'Dredge';