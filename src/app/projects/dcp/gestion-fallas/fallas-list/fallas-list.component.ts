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

  mostrarMensaje = false;
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
  notificacionDeAccionHecha= '-';
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
        this.notificacionDeAccionHecha = 'Se creó correctamente';
      }
      if(localStorage.getItem('success')=='editado'){
        this.notificacionDeAccionHecha = 'Se editó correctamente';
      }
      if(localStorage.getItem('success')=='cerrado'){
        this.notificacionDeAccionHecha = 'Se cerró el caso correctamente';
      }
      if(localStorage.getItem('success')=='escalado'){
        this.notificacionDeAccionHecha = 'Se escaló correctamente';
      }
      if(localStorage.getItem('success')=='observado'){
        this.notificacionDeAccionHecha = 'Se ha observado correctamente';
      }
      this.mostrarMensajeDeAccionHechoEnUnaFalla();
    };
    this.cargarFormularioBusqueda();
    this.listarFallas(false);
  }

  registroMasivo():void{

  }

  registroIndividual():void{
    const dialogSeleccionarTipoDeRegistro = this.matDialog.open(DialogSeleccionarTipoDeRegistroComponent,{
      width:'646px'
    });
  }

  listarFallas(filtrar:boolean):void{
    const filter = this.formBusquedaConFiltros.value;
    if(filtrar){this.paginaActual=1}
    this.fallasService.bandejaFallas(this.paginaActual,filter).subscribe(responseApi=>{
      this.totalFallas = responseApi.totalRecords;
      this.totalFilas = responseApi.pageSize;
      this.numeroDePaginas = this.obtenerNumeroDePaginas(responseApi.pageSize,responseApi.totalRecords);
      this.dataSource = responseApi.data;
      this.deshabilitarBotonesPaginacion(); 
    });
  }


  cargarFormularioBusqueda():void{
    console.log(new Date);
    this.formBusquedaConFiltros = new FormGroup({
      os : new FormControl(),
      io : new FormControl(),
      tsr : new FormControl(),
      fechaIni : new FormControl(),
      fechaFin : new FormControl(),
      soporte : new FormControl(),
      area : new FormControl(),
      esn : new FormControl()
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
      this.listarFallas(false);
      this.deshabilitarBotonesPaginacion();
    }
    if(type=='less'){
      this.paginaActual = this.paginaActual - 1 ;
      this.listarFallas(false);
      this.deshabilitarBotonesPaginacion();
    }
  }

  seeBitacora(element:any):void{
    console.log(element.id);
    this.expandedElement = this.expandedElement === element ? null : element;
    this.garantiasService.logWarranty(element.id,2).subscribe(resp=>{
      this.dataSourceBitacora = resp.body;
    });
  }

  mostrarMensajeDeAccionHechoEnUnaFalla():void{
    this.mostrarMensaje = true;
    setTimeout(()=>{
      this.mostrarMensaje = false;
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
      data:{comentario:_comentario,text:'La falla ha sido observada'},
      disableClose:true, width:'500px'
    });
  }

  mostrarInputBuscarPorArea():void{
    this.inputBuscarPorArea = this.inputBuscarPorArea == false ? true : false;
  }
  mostrarInputBuscarPorEsn():void{
    this.inputBuscarPorEsn = this.inputBuscarPorEsn == false ? true : false;
  }

  getEstado(numeroEstado:number):string{
    if(numeroEstado==1){
      return 'Aprobado';
    }
    if(numeroEstado==2){
      return 'Observado';
    }
    if(numeroEstado==3){
      return 'Cerrado';
    }
    if(numeroEstado==0){
      return 'Activo';
    }
  }

  limpiarFiltros():void{
    this.cargarFormularioBusqueda();
    this.listarFallas(true);
  }

  obtenerEstilo(index:number):string{
    let estilo:string;
    if(index%2==0){
      estilo = 'color-fila-gray';
    }else{
      estilo = 'color-fila-white'
    }
    return estilo;
  }

  obtenerEstiloBitacora(index:number):string{
    let estilo:string;
    if(index%2==0){
      estilo = 'color-fila-bitacora';
    }else{
      estilo = 'color-fila-white'
    }
    return estilo;
  }
  
}