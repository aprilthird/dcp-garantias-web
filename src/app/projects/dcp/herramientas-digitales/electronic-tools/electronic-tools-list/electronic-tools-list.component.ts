import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-electronic-tools-list',
  templateUrl: './electronic-tools-list.component.html',
  styleUrls: ['./electronic-tools-list.component.scss']
})
export class ElectronicToolsListComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'area', 'jefeAprobador', 'tipoDeLicencia', 'cantidad', 'pcidEquipo', 'fechaDeSolicitud', 'estado', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  crearSolicitudDeHerramienta():void{
    this.router.navigate(['/digital-tools/tool-request']);
  }

}

export interface PeriodicElement {
  usuario: string;
  area: string;
  jefeAprobador: string;
  tipoDeLicencia: string;
  cantidad: number;
  pcidEquipo:string;
  fechaDeSolicitud: string;
  estado:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {usuario: 'Carlos Perez', area: 'Piura Motors', jefeAprobador: 'Carlos Perez', tipoDeLicencia:'Inpower',      cantidad:6, pcidEquipo:'5735247524', fechaDeSolicitud:'2022-07-05T19:26:35.326Z', estado:'Pendiente'},
  {usuario: 'Carlos Perez', area: 'Piura Motors', jefeAprobador: 'Carlos Perez', tipoDeLicencia:'Inside',       cantidad:2, pcidEquipo:'5735247524', fechaDeSolicitud:'2022-07-05T19:26:35.326Z', estado:'Pendiente'},
  {usuario: 'Carlos Perez', area: 'Piura Motors', jefeAprobador: 'Carlos Perez', tipoDeLicencia:'Inpower',      cantidad:1, pcidEquipo:'5735247524', fechaDeSolicitud:'2022-07-05T19:26:35.326Z', estado:'Pendiente'},
  {usuario: 'Carlos Perez', area: 'Piura Motors', jefeAprobador: 'Carlos Perez', tipoDeLicencia:'Inpower',      cantidad:3, pcidEquipo:'5735247524', fechaDeSolicitud:'2022-07-05T19:26:35.326Z', estado:'Pendiente'},
  {usuario: 'Carlos Perez', area: 'Piura Motors', jefeAprobador: 'Carlos Perez', tipoDeLicencia:'Inside',       cantidad:2, pcidEquipo:'5735247524', fechaDeSolicitud:'2022-07-05T19:26:35.326Z', estado:'Pendiente'},
  {usuario: 'Carlos Perez', area: 'Piura Motors', jefeAprobador: 'Carlos Perez', tipoDeLicencia:'Calibrations', cantidad:1, pcidEquipo:'5735247524', fechaDeSolicitud:'2022-07-05T19:26:35.326Z', estado:'Pendiente'},
  {usuario: 'Carlos Perez', area: 'Piura Motors', jefeAprobador: 'Carlos Perez', tipoDeLicencia:'Inpower',      cantidad:4, pcidEquipo:'5735247524', fechaDeSolicitud:'2022-07-05T19:26:35.326Z', estado:'Pendiente'},
  {usuario: 'Carlos Perez', area: 'Piura Motors', jefeAprobador: 'Carlos Perez', tipoDeLicencia:'Calibrations', cantidad:1, pcidEquipo:'5735247524', fechaDeSolicitud:'2022-07-05T19:26:35.326Z', estado:'Pendiente'},
  {usuario: 'Carlos Perez', area: 'Piura Motors', jefeAprobador: 'Carlos Perez', tipoDeLicencia:'Calibrations', cantidad:7, pcidEquipo:'5735247524', fechaDeSolicitud:'2022-07-05T19:26:35.326Z', estado:'Pendiente'},
  {usuario: 'Carlos Perez', area: 'Piura Motors', jefeAprobador: 'Carlos Perez', tipoDeLicencia:'Inside',       cantidad:1, pcidEquipo:'5735247524', fechaDeSolicitud:'2022-07-05T19:26:35.326Z', estado:'Pendiente'},
];
