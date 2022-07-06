import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSeleccionarTipoDeRegistroComponent } from '../dialogs/dialog-seleccionar-tipo-de-registro/dialog-seleccionar-tipo-de-registro.component';
import { FallasService } from 'app/shared/services/gestion-fallas/fallas.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { GarantiasService } from 'app/shared/services/garantias/garantias.service';
import { Router } from '@angular/router';
import { DialogMostrarComentarioComponent } from '../dialogs/dialog-mostrar-comentario/dialog-mostrar-comentario.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fallas-list',
  templateUrl: './fallas-list.component.html',
  styleUrls: ['./fallas-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FallasListComponent implements OnInit {

  verMensajeCreacionExitosa = false;
  displayedColumns: string[] = ['os', 'io', 'tsr', 'area', 'serie', 'usuarioResponsable', 'fechaFalla', 'nivelSoporte', 'estado','acciones'];
  dataSource = [];
  displayedColumnsBitacora: string[] = ['fecha', 'evaluador', 'comentario', 'estado', 'nivelSoporteActual'];
  dataSourceBitacora = [];
  //datos del paginado
  totalFallas:any;
  totalFilas:any;
  numeroDePaginas:any;
  paginaActual:number=1;
  //botones del paginado
  botonSiguiente:boolean=false;
  botonAnterior:boolean=false;
  expandedElement: any;
  //mensaje a mostrar cuando se crea o cierra un caso
  mensajeExitoso = '-';
  // formulario busqueda con filtros
  formBusquedaConFiltros: FormGroup;
  flag = false;
  inputBuscarPorArea = false;
  inputBuscarPorEsn = false;

  constructor(private readonly matDialog: MatDialog, private readonly fallasService:FallasService,
              private readonly garantiasService:GarantiasService, private readonly router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('success')){
      if(localStorage.getItem('success')=='true'){
        this.mensajeExitoso = 'Se creó correctamente';
      }
      if(localStorage.getItem('success')=='cerrado'){
        this.mensajeExitoso = 'Se cerró el caso correctamente';
      }
      if(localStorage.getItem('success')=='escalado'){
        this.mensajeExitoso = 'Se escaló correctamente';
      }
      this.mostrarMensajeRegistroExitosoDeUnaFalla();
    };
    this.listarFallas();
    this.cargarFormularioBusqueda();
  }

  registroMasivo():void{

  }
  registroIndividual():void{
    const dialogSeleccionarTipoDeRegistro = this.matDialog.open(DialogSeleccionarTipoDeRegistroComponent,{
      width:'646px'
    });
  }

  busquedaFallas():void{
    this.flag = true;
    console.log(this.formBusquedaConFiltros.value);
    if(this.formBusquedaConFiltros.value.fechaFin==null){
      this.formBusquedaConFiltros.value.fechaFin = new Date();
    }
    this.fallasService.bandejaBusquedaFallas(this.paginaActual,this.formBusquedaConFiltros.value).subscribe(responseApi=>{
      this.totalFallas = responseApi.totalRecords;
      this.totalFilas = responseApi.pageSize;
      this.numeroDePaginas = this.obtenerNumeroDePaginas(responseApi.pageSize,responseApi.totalRecords);
      this.dataSource = responseApi.data;
      this.deshabilitarBotonesPaginacion(); 
    });
  }

  cargarFormularioBusqueda():void{
    this.formBusquedaConFiltros = new FormGroup({
      os : new FormControl(),
      io : new FormControl(),
      tsr : new FormControl(),
      fechaIni : new FormControl(),
      fechaFin : new FormControl(),
      nivelSoporte : new FormControl(),
      area : new FormControl(),
      esn : new FormControl()
    });
  }

  listarFallas():void{
    this.fallasService.bandejaFallas(this.paginaActual).subscribe(responseApi=>{
      this.totalFallas = responseApi.totalRecords;
      this.totalFilas = responseApi.pageSize;
      this.numeroDePaginas = this.obtenerNumeroDePaginas(responseApi.pageSize,responseApi.totalRecords);
      this.dataSource = responseApi.data;
      this.deshabilitarBotonesPaginacion(); 
    });
  }


  obtenerNumeroDePaginas(totalRows:any,totalRecords:any):number{
    let result:any;
    result = totalRecords / totalRows;
    if((totalRecords % totalRows)>0){
      result = (result + 1 );
    }
    return Math.trunc(result);
  }

  deshabilitarBotonesPaginacion(){
    if(this.paginaActual == this.numeroDePaginas){
      this.botonAnterior = true,
      this.botonSiguiente = true;
    }
    if( this.paginaActual == 1 && this.paginaActual < this.numeroDePaginas ){
      this.botonAnterior = true;
      this.botonSiguiente = false;
    }
    if(this.paginaActual > 1 && this.paginaActual < this.numeroDePaginas){
      this.botonAnterior = false;
      this.botonSiguiente = false;
    }
    if(this.paginaActual > 1 && this.paginaActual == this.numeroDePaginas){
      this.botonAnterior = false;
      this.botonSiguiente = true;
    }
  }

  changePage(type:string){
    if(type=='more'){
      this.paginaActual = this.paginaActual + 1 ;
      this.flag == true ? this.busquedaFallas() : this.listarFallas();
      this.deshabilitarBotonesPaginacion();
    }
    if(type=='less'){
      this.paginaActual = this.paginaActual - 1 ;
      this.flag == true ? this.busquedaFallas() : this.listarFallas();
      this.deshabilitarBotonesPaginacion();
    }
  }

  seeBitacora(element):void{
    console.log(element.id);
    this.expandedElement = this.expandedElement === element ? null : element;
    this.garantiasService.logWarranty(element.id).subscribe(resp=>{
      this.dataSourceBitacora = resp.body;
      console.table(this.dataSourceBitacora)
    });
  }

  mostrarMensajeRegistroExitosoDeUnaFalla():void{
    this.verMensajeCreacionExitosa = true;
    setTimeout(()=>{
      this.verMensajeCreacionExitosa = false;
    },5000);
    localStorage.removeItem('success');
  }

  editarFalla(falla):void{
    localStorage.setItem('action','edit');
    localStorage.setItem('fallaParaGestionar',JSON.stringify(falla));
    this.router.navigate(['gestion-fallas/registro-de-falla']);
  }

  nivelDeSoporte(nivel):string{
    if(nivel==0){
      return 'B. Inicial';
    }
    if(nivel==1){
      return 'Ing. Soporte';
    }
    if(nivel==2){
      return 'DFSE';
    }
    if(nivel==3){
      return 'Fabrica';
    }
  }

  mostrarComentario(_comentario):void{
    const dialogMostrarComentario = this.matDialog.open(DialogMostrarComentarioComponent,{
      data:{comentario:_comentario},
      disableClose:true, width:'500px'
    });
  }

  mostrarInputBuscarPorArea():void{
    this.inputBuscarPorArea = this.inputBuscarPorArea == false ? true : false;
  }
  mostrarInputBuscarPorEsn():void{
    this.inputBuscarPorEsn = this.inputBuscarPorEsn == false ? true : false;
  }
}

export interface PeriodicElement {
  number: number;
  serie: string;
  area: string;
  type: string;
  failureDate: string;
  amount: number;
  user: string;
  age: number;
  inbox: number;
  state: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {number: 1, serie: '66304283', area: 'Piura Motores', type: 'GFA', failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 40, inbox: 0, state: 'servicios'},
  {number: 2, serie: '66304283', area: 'Piura Motores', type: 'GFA', failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 150, inbox: 1, state: 'rechazado'},
  {number: 3, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 195, inbox: 2, state: 'observado'},
  {number: 4, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 368, inbox: 3, state: 'servicios'},
  {number: 5, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 10, inbox: 4, state: 'rechazado'},
  {number: 6, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 368, inbox: 5, state: 'observado'},
  {number: 7, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 361, inbox: 6, state: 'servicios'},
  {number: 8, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 40, inbox: 0, state: 'rechazado'},
  {number: 9, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 40, inbox: 1, state: 'observado'}
];