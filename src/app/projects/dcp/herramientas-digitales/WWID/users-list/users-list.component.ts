import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DigitalToolsService } from 'app/shared/services/digital-tools/digital-tools.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  // formulario filtro
  formFilter: FormGroup;
  //variable para mostrar o no el mensaje de que se guardó con éxito
  seeNotificationSuccessfully=false;
  // tabla usuarios
  displayedColumns: string[] = ['usuario', 'dni', 'area', 'fechaIngreso', 'fechaBaja', 'idPromotion', 'estadoIdPromotion', 'WWID', 'estadoWWID', 'action'];
  dataSource = [];
  //datos del paginado
  totalUsers:any;
  totalRows:any;
  numberOfPages:any;
  pageCurrent:number=1;

  constructor(private readonly router:Router, private readonly digitalToolsService:DigitalToolsService) { }

  ngOnInit(): void {
    this.listUsers();
    this.loadFormFilter();
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

  loadFormFilter():void {
    this.formFilter = new FormGroup({

    });
  }

  onRegisterBasic(usuario:any):void{
    localStorage.setItem('action','edit');
    localStorage.setItem('usuario',JSON.stringify(usuario));
    this.router.navigate(['/digital-tools/basic-registration']);
  }

  disablePaginationButtons(){
    // if(this.paginaActual == this.numeroDePaginas){
    //   this.botonAnterior = true,
    //   this.botonSiguiente = true;
    // }
    // if( this.paginaActual == 1 && this.paginaActual < this.numeroDePaginas ){
    //   this.botonAnterior = true;
    //   this.botonSiguiente = false;
    // }
    // if(this.paginaActual > 1 && this.paginaActual < this.numeroDePaginas){
    //   this.botonAnterior = false;
    //   this.botonSiguiente = false;
    // }
    // if(this.paginaActual > 1 && this.paginaActual == this.numeroDePaginas){
    //   this.botonAnterior = false;
    //   this.botonSiguiente = true;
    // }
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
  nombre: string;
  dni: string;
  area: string;
  fechaIngresoInicio: string;
  fechaBajaInicio: string;
  idPromotion: string;
  estadoIdPromotion:string;
  wwid:string;
  estadoWWID:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nombre: 'ABAD TRELLES', dni: '25136313', area: 'CFK - CAPACITACION EXTERNA', fechaIngresoInicio:'2022-07-05T19:26:35.326Z', fechaBajaInicio:'2022-07-05T19:26:35.326Z', idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngresoInicio:'2022-07-05T19:26:35.326Z', fechaBajaInicio:'2022-07-05T19:26:35.326Z', idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngresoInicio:'2022-07-05T19:26:35.326Z', fechaBajaInicio:'2022-07-05T19:26:35.326Z', idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngresoInicio:'2022-07-05T19:26:35.326Z', fechaBajaInicio:'2022-07-05T19:26:35.326Z', idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngresoInicio:'2022-07-05T19:26:35.326Z', fechaBajaInicio:'2022-07-05T19:26:35.326Z', idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngresoInicio:'2022-07-05T19:26:35.326Z', fechaBajaInicio:'2022-07-05T19:26:35.326Z',  idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngresoInicio:'2022-07-05T19:26:35.326Z', fechaBajaInicio:'2022-07-05T19:26:35.326Z',  idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngresoInicio:'2022-07-05T19:26:35.326Z', fechaBajaInicio:'2022-07-05T19:26:35.326Z',  idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngresoInicio:'2022-07-05T19:26:35.326Z', fechaBajaInicio:'2022-07-05T19:26:35.326Z',  idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngresoInicio:'2022-07-05T19:26:35.326Z', fechaBajaInicio:'2022-07-05T19:26:35.326Z',  idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
];
