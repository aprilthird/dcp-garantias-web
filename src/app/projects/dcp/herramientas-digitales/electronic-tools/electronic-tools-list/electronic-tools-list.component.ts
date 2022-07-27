import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigitalToolsService } from 'app/shared/services/digital-tools/digital-tools.service';

@Component({
  selector: 'app-electronic-tools-list',
  templateUrl: './electronic-tools-list.component.html',
  styleUrls: ['./electronic-tools-list.component.scss']
})
export class ElectronicToolsListComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'area', 'jefeAprobador', 'tipoDeLicencia', 'cantidad', 'pcidEquipo', 'fechaDeSolicitud', 'estado', 'action'];
  dataSource = [];

  //datos del paginado
  totalUsers:any;
  totalRows:any;
  numberOfPages:any;
  pageCurrent:number=1;

  constructor(private readonly router: Router, private readonly digitalToolsService:DigitalToolsService) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers():void {
    let tmp = localStorage.getItem("datasrcwwid");
    if(tmp !== null && tmp !== "") {
      this.dataSource = JSON.parse(tmp);
    } else {
      this.digitalToolsService.userListManagement(this.pageCurrent).subscribe(responseApi=>{
        // this.totalUsers = responseApi.totalRecords;
        // this.totalRows = responseApi.pageSize;
        // this.numberOfPages = this.getPageCount(responseApi.pageSize,responseApi.totalRecords);
        // this.dataSource = responseApi.data;
        
        localStorage.setItem("datasrcwwid", JSON.stringify(responseApi.body));
        this.dataSource = responseApi.body;
      });
    }
  }

  onEditBasic(usuario:any):void{
    localStorage.setItem('action','edit');
    localStorage.setItem('usuario',JSON.stringify(usuario));
    this.router.navigate(['/digital-tools/tool-request']);
  }

  onRegisterBasic():void{
    localStorage.setItem('action','create');
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
