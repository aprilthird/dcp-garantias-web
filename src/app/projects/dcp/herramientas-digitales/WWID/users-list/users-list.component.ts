import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  countStart:any;
  countEnd:any;
  numberOfPages:any;
  pageCurrent:number=1;
  //botones del paginado
  nextButton:boolean=false;
  prevButton:boolean=false;

  constructor(private readonly router:Router, private readonly digitalToolsService:DigitalToolsService) { }

  ngOnInit(): void {
    this.loadFormFilter();
    this.listUsers();
  }

  listUsers():void {
    this.digitalToolsService.userListManagement(this.formFilter.value, this.pageCurrent).subscribe(responseApi=>{
      this.totalUsers = responseApi.body.totalRecords;
      this.totalRows = responseApi.body.pageSize;
      this.countStart = this.totalRows*(this.pageCurrent - 1) + 1;
      this.countEnd = this.totalRows*this.pageCurrent;
      this.numberOfPages = this.getPageCount(responseApi.body.pageSize,responseApi.body.totalRecords);
      this.dataSource = responseApi.body.data;
    }); 
  }

  loadFormFilter():void {
    this.formFilter = new FormGroup({
      usuario: new FormControl(null),
      wwid: new FormControl(null),
      fechaIngresoInicio: new FormControl(),
      fechaIngresoFin: new FormControl(),
      fechaBajaInicio: new FormControl(),
      fechaBajaFin: new FormControl(),
    });
  }

  onRegisterBasic(usuario:any):void{
    localStorage.setItem('action','edit');
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.router.navigate(['/digital-tools/basic-registration']);
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
