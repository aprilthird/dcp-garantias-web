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

  //botones del paginado
  nextButton:boolean=false;
  prevButton:boolean=false;
  
  constructor(private readonly router: Router, private readonly digitalToolsService:DigitalToolsService) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers():void {
    
    this.digitalToolsService.trayTools(this.pageCurrent).subscribe(responseApi => {
      this.totalUsers = responseApi.totalRecords;
      this.totalRows = responseApi.pageSize;
      this.numberOfPages = this.getPageCount(responseApi.pageSize,responseApi.totalRecords);
      this.dataSource = responseApi.data;

      for(var i=0; i<this.dataSource.length; ++i) {
        var os = localStorage.getItem("os_" + this.dataSource[i].nombres);
        var pcid = localStorage.getItem("pcid_" + this.dataSource[i].nombres);
        var marca = localStorage.getItem("marca_" + this.dataSource[i].nombres);
        var modelo = localStorage.getItem("modelo_" + this.dataSource[i].nombres);
        var serie = localStorage.getItem("serie_" + this.dataSource[i].nombres);

        var area = localStorage.getItem("area_" + this.dataSource[i].nombres);
        var jefe = localStorage.getItem("jefe_" + this.dataSource[i].nombres);
        var cantidad = localStorage.getItem("cantidad_" + this.dataSource[i].nombres);
        var fechaDeSolicitud = localStorage.getItem("fechaDeSolicitud_" + this.dataSource[i].nombres);

        this.dataSource[i].os = os;
        this.dataSource[i].pcid = pcid;
        this.dataSource[i].marca = marca;
        this.dataSource[i].modelo = modelo;
        this.dataSource[i].serie = serie;
        
        this.dataSource[i].area = area;
        this.dataSource[i].jefe = jefe;
        this.dataSource[i].cantidad = cantidad;
        this.dataSource[i].fechaDeSolicitud = fechaDeSolicitud;
        console.log(this.dataSource[i]);
      }
    });

    // this.digitalToolsService.userListManagement(this.pageCurrent).subscribe(responseApi=>{
    //   this.totalUsers = responseApi.body.totalRecords;
    //   this.totalRows = responseApi.body.pageSize;
    //   this.numberOfPages = this.getPageCount(responseApi.body.pageSize,responseApi.body.totalRecords);
    //   this.dataSource = responseApi.body.data;
    //   console.log("DATOS DE ENDPOINT");
    //   console.log(responseApi);
    //   localStorage.setItem("datasrcwwid", JSON.stringify(responseApi.body));
    //   this.dataSource = responseApi.body;
    // });

    // let tmp = localStorage.getItem("datasrcwwid");
    // if(tmp !== null && tmp !== "") {
    //   this.dataSource = JSON.parse(tmp);
    // } else {
    //   this.digitalToolsService.userListManagement(this.pageCurrent).subscribe(responseApi=>{
    //     // this.totalUsers = responseApi.totalRecords;
    //     // this.totalRows = responseApi.pageSize;
    //     // this.numberOfPages = this.getPageCount(responseApi.pageSize,responseApi.totalRecords);
    //     // this.dataSource = responseApi.data;
        
    //     localStorage.setItem("datasrcwwid", JSON.stringify(responseApi.body));
    //     this.dataSource = responseApi.body;
    //   });
    // }
  }

  onEditBasic(usuario:any):void{
    localStorage.setItem('action','edit');
    localStorage.setItem('usuario',JSON.stringify(usuario));
    this.router.navigate(['/digital-tools/tool-request']);
  }

  onRegisterBasic():void{
    localStorage.setItem('action','new');
    this.router.navigate(['/digital-tools/tool-request']);
  }


  disablePaginationButtons(){
    if(this.pageCurrent == this.numberOfPages){
      this.prevButton = true,
      this.nextButton = true;
    }
    if( this.pageCurrent == 1 && this.pageCurrent < this.numberOfPages){
      this.prevButton = true;
      this.nextButton = false;
    }
    if(this.pageCurrent > 1 && this.pageCurrent < this.numberOfPages){
      this.prevButton = false;
      this.nextButton = false;
    }
    if(this.pageCurrent > 1 && this.pageCurrent == this.numberOfPages){
      this.prevButton = false;
      this.nextButton = true;
    }
  }

  changePage(type:string){
    if(type=='more'){
      this.pageCurrent = this.pageCurrent + 1 ;
      this.listUsers();
      this.disablePaginationButtons();
    }
    if(type=='less'){
      this.pageCurrent = this.pageCurrent - 1 ;
      this.listUsers();
      this.disablePaginationButtons();
    }
  }

  getPageCount(totalRows:any,totalRecords:any):number{
    let result:any;
    result = totalRecords / totalRows;
    if((totalRecords % totalRows)>0){
      result = (result + 1 );
    }
    return Math.trunc(result);
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
