import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'dni', 'area', 'fechaIngreso', 'fechaBaja', 'idPromotion', 'estadoIdPromotion', 'WWID', 'estadoWWID', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(private readonly router:Router) { }

  ngOnInit(): void {
  }

  onRegisterBasic(usuario:any):void{
    localStorage.setItem('action','edit');
    localStorage.setItem('usuario',JSON.stringify(usuario));
    this.router.navigate(['/digital-tools/basic-registration']);
  }

}

export interface PeriodicElement {
  nombre: string;
  dni: string;
  area: string;
  fechaIngreso: string;
  fechaBaja: string;
  idPromotion: string;
  estadoIdPromotion:string;
  wwid:string;
  estadoWWID:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngreso:'2022-07-05T19:26:35.326Z', fechaBaja:'2022-07-05T19:26:35.326Z', idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngreso:'2022-07-05T19:26:35.326Z', fechaBaja:'2022-07-05T19:26:35.326Z', idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngreso:'2022-07-05T19:26:35.326Z', fechaBaja:'2022-07-05T19:26:35.326Z', idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngreso:'2022-07-05T19:26:35.326Z', fechaBaja:'2022-07-05T19:26:35.326Z', idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngreso:'2022-07-05T19:26:35.326Z', fechaBaja:'2022-07-05T19:26:35.326Z', idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngreso:'2022-07-05T19:26:35.326Z', fechaBaja:'2022-07-05T19:26:35.326Z',  idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngreso:'2022-07-05T19:26:35.326Z', fechaBaja:'2022-07-05T19:26:35.326Z',  idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngreso:'2022-07-05T19:26:35.326Z', fechaBaja:'2022-07-05T19:26:35.326Z',  idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngreso:'2022-07-05T19:26:35.326Z', fechaBaja:'2022-07-05T19:26:35.326Z',  idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
  {nombre: 'Carlos Perez', dni: '12345678', area: 'Piura Motors', fechaIngreso:'2022-07-05T19:26:35.326Z', fechaBaja:'2022-07-05T19:26:35.326Z',  idPromotion: '-', estadoIdPromotion:'baja', wwid:'-', estadoWWID:'Baja'},
];
