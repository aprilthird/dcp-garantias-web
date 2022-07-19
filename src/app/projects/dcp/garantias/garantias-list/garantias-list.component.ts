import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogQuestionNewRecordComponent } from './../dialogs/dialog-question-new-record/dialog-question-new-record.component';
import { Router } from '@angular/router';
import { GarantiasService } from 'app/shared/services/garantias/garantias.service';
import { DialogHistoriaESNComponent } from './../dialogs/dialog-historia-esn/dialog-historia-esn.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { DialogMostrarComentarioComponent } from '../../gestion-fallas/dialogs/dialog-mostrar-comentario/dialog-mostrar-comentario.component';
interface Option {
  value: any;
  name: string;
}

@Component({
  selector: 'app-garantias-list',
  templateUrl: './garantias-list.component.html',
  styleUrls: ['./garantias-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class GarantiasListComponent implements OnInit {

  options: Option[] = [
    {value:-1, name:'Todas'},
    {value:'opt1', name:'opcion 1'},
    {value:'opt2', name:'opcion 2'},
    {value:'opt3', name:'opcion 3'},
    {value:'opt4', name:'opcion 4'},
  ];

  stateOptions: Option[] = [
    {value:-1, name:'Todas'},
    {value:0, name:'Inicial'},
    {value:1, name:'Blanca'},
    {value:2, name:'Naranja'},
    {value:6, name:'Amarilla'},
    {value:3, name:'Verde'},
    {value:4, name:'Gris'},
    {value:5, name:'Negra'},
  ];

  oldOptions: Option[] = [
    {value:-1, name:'Todas'},
    {value:0, name:'0-29'},
    {value:1, name:'30-59'},
    {value:2, name:'60-89'},
    {value:3, name:'90-119'},
    {value:4, name:'120-179'},
    {value:5, name:'180-364'},
    {value:6, name:'>365'},
  ];

  //formulario para el filtro de las garantias
  formFilter:FormGroup;
  //variable para mostrar o no el mensaje de que se creó la garantía con exito
  seeNotificationCreateWarrantySuccessfully=false;
  //tabla garantias
  displayedColumns: string[] = ['number', 'serie', 'area', 'type', 'failureDate', 'amount', 'user', 'age', 'inbox', 'state','actions'];
  dataSource = [];
  //tabla bitacora
  displayedColumnsBitacora: string[] = ['fecha', 'evaluador', 'comentario', 'estado', 'monto', 'bandejaActual','actions'];
  dataSourceBitacora = [];
  expandedElement: any;
  //datos del paginado
  totalWarranties:any;
  totalRows:any;
  numberOfPages:any;
  pageCurrent:number=1;
  //botones del paginado
  disabledButtonMore:boolean=false;
  disabledButtonLess:boolean=false;
  //info para la bitacora
  dataBitacora:any;
  mensajeDeAccionRealizada:string;
  currentDate = new Date();
  prevDate = new Date(this.currentDate.getFullYear() - 1, this.currentDate.getMonth(), this.currentDate.getDay());

  constructor(private readonly matDialog: MatDialog,
              private readonly router: Router,
              private readonly garantiasService: GarantiasService) {

  }

  ngOnInit(): void {
    if(localStorage.getItem('success')){
      this.loadMessage();
    };
    this.loadFormFilter();
    this.listWarranties();
  }

  listWarranties():void{
    const filterData = this.formFilter.value;
    filterData.area = filterData.area == -1 ? null : filterData.area;
    filterData.bandeja = filterData.bandeja == -1 ? null : filterData.bandeja;
    filterData.antiguedad = filterData.antiguedad == -1 ? null : filterData.antiguedad;
    this.garantiasService.listWarranties(filterData, this.pageCurrent).subscribe(resp=>{
      this.totalWarranties = resp.totalRecords;
      this.totalRows = resp.pageSize;
      this.numberOfPages = this.getNumberOfPages(resp.pageSize,resp.totalRecords);
      this.dataSource = resp.data;
      this.disabledButtonsPagination();
    })
  }

  limpiarFiltros():void{
    this.loadFormFilter(); //si se desea todo sería lo siguiente this.formFilter.reset();
    this.listWarranties();
  }
  getNumberOfPages(totalRows:any,totalRecords:any):number{
    let result:any;
    result = totalRecords / totalRows;
    if((totalRecords % totalRows)>0){
      result = (result + 1 );
    }
    return Math.trunc(result);
  }


  loadFormFilter():void{
    let dateCurrent = new Date; console.log(dateCurrent);
    this.formFilter = new FormGroup({
      esn: new FormControl(null),
      os: new FormControl(null),
      area: new FormControl(-1),
      fechaIni: new FormControl(this.prevDate),
      // fechaIni: new FormControl(dateCurrent),
      fechaFin: new FormControl(this.currentDate),
      // fechaFin: new FormControl(dateCurrent),
      bandeja: new FormControl(-1),
      antiguedad: new FormControl(-1)
    });
  }

  getColorAge(days):string{
    if(days>0 && days<120){ return '#0BEF94'; }
    if (days>=120 && days<180) { return '#FFE14C'; }
    if (days>=180 && days<360) {return '#F9A826'; }
    if(days>=360){ return '#FF857A'; }
  }

  colorDeLaBandeja(garantia:any):string{
    let claseEstilo:string;
    if(garantia.estado==2){
      claseEstilo = 'estado2';
      return claseEstilo;
    }else{
      if(garantia.estado==4){
        claseEstilo = 'estado4';
        return claseEstilo;
      }
      else{
        switch (garantia.bandeja) {
          case 0:return 'bandeja0';
            break;
          case 1:return 'bandeja1';
            break;
          case 2:return 'bandeja2';
            break;
          case 3:return 'bandeja3';
            break;
          case 4:return 'bandeja4';
            break;
          case 5:return 'bandeja5';
            break;
          case 6:return 'bandeja6';
            break;
          default:
            break;
        }
      }
    }
  }

  colorDeLaBandejaBitacora(garantia:any):string{
    let claseEstilo:string;
    if(garantia.estado==2){
      claseEstilo = 'estado2';
      return claseEstilo;
    }else{
      if(garantia.estado==4){
        claseEstilo = 'estado4';
        return claseEstilo;
      }
      else{
        switch (garantia.bandejaActual) {
          case 0:return 'bandeja0';
            break;
          case 1:return 'bandeja1';
            break;
          case 2:return 'bandeja2';
            break;
          case 3:return 'bandeja3';
            break;
          case 4:return 'bandeja4';
            break;
          case 5:return 'bandeja5';
            break;
          case 6:return 'bandeja6';
            break;
          default:
            break;
        }
      }
    }
  }

  bandejaGarantia(garantia:any):string{
    if(garantia.estado==2){return 'Roja';}
    if(garantia.estado==4){return 'Negra';}
    if(garantia.bandeja==0){return 'B. Inicial'}
    if(garantia.bandeja==1){return 'Blanco'}
    if(garantia.bandeja==2){return 'Naranja'}
    if(garantia.bandeja==3){return 'Verde'}
    if(garantia.bandeja==4){return 'Gris'}
    if(garantia.bandeja==5){return 'Negra'}
    if(garantia.bandeja==6){return 'Amarillo'}
  }

  bandejaBitacora(garantia:any):string{
    if(garantia.estado==2){return 'Roja';}
    if(garantia.estado==4){return 'Negra';}
    if(garantia.bandejaActual==0){return 'B. Inicial'}
    if(garantia.bandejaActual==1){return 'Blanco'}
    if(garantia.bandejaActual==2){return 'Naranja'}
    if(garantia.bandejaActual==3){return 'Verde'}
    if(garantia.bandejaActual==4){return 'Gris'}
    if(garantia.bandejaActual==5){return 'Negra'}
    if(garantia.bandejaActual==6){return 'Amarillo'}
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
    if(numeroEstado==4){
      return 'Rechazado';
    }
  }

  onOpenDialogQuestionNewRecord():void{
    const dialogQuestionNewRecord = this.matDialog.open(DialogQuestionNewRecordComponent,{
        width: '650px',
        height:'400px'
    });
  }

  onMassiveRegistrationBasic():void{
    this.router.navigate(['/garantias/massive-basic-registration']);
  }

  onOpenDialogHistoriaEsn():void{
    const dialogHistoriaEsn = this.matDialog.open(DialogHistoriaESNComponent,{
      data:{type:'all', name: 'todo'},
      width: '900px'
    });
  }

  loadMessage():void{
    if(localStorage.getItem('success')=='borrador'){
      this.mensajeDeAccionRealizada = 'Se guardó el borrador';
    }
    if(localStorage.getItem('success')=='editado'){
      this.mensajeDeAccionRealizada = 'Se editó el registro';
    }
    if(localStorage.getItem('success')=='registroBlanco'){
      this.mensajeDeAccionRealizada = 'Registro enviado (Bandeja Blanca)';
    }
    if(localStorage.getItem('success')=='observado'){
      this.mensajeDeAccionRealizada = 'Registro observado';
    }
    if(localStorage.getItem('success')=='registroNaranja'){
      this.mensajeDeAccionRealizada = 'Registro enviado (Bandeja Naranja)';
    }
    if(localStorage.getItem('success')=='rechazado'){
      this.mensajeDeAccionRealizada = 'Registro rechazado';
    }
    this.seeNotificationCreateWarrantySuccessfully = true;
    setTimeout(()=>{
      this.seeNotificationCreateWarrantySuccessfully = false;
    },5000);
    localStorage.removeItem('success');
  }

  seeBitacora(element):void{
    this.expandedElement = this.expandedElement === element ? null : element;
    this.garantiasService.logWarranty(element.id,1).subscribe(resp=>{
      this.dataBitacora = resp.body;
      this.dataSourceBitacora = resp.body;
    });
  }

  changePage(type:string){
    if(type=='more'){
      this.pageCurrent = this.pageCurrent + 1 ;
      this.listWarranties();
      this.disabledButtonsPagination();
    }
    if(type=='less'){
      this.pageCurrent = this.pageCurrent - 1 ;
      this.listWarranties();
      this.disabledButtonsPagination();
    }
  }

  disabledButtonsPagination(){
    if(this.pageCurrent == this.numberOfPages){
      this.disabledButtonLess = true,
      this.disabledButtonMore = true;
    }
    if( this.pageCurrent==1 && this.pageCurrent<this.numberOfPages ){
      this.disabledButtonLess = true;
      this.disabledButtonMore = false;
    }
    if(this.pageCurrent > 1 && this.pageCurrent < this.numberOfPages){
      this.disabledButtonLess = false;
      this.disabledButtonMore = false;
    }
    if( this.pageCurrent>1 && this.pageCurrent==this.numberOfPages){
      this.disabledButtonLess = false;
      this.disabledButtonMore = true;
    }
  }

  editWarranty(warranty):void{
    if(warranty.bandeja==0){
      localStorage.setItem('action','edit');
      localStorage.setItem('garantia',JSON.stringify(warranty));
      this.router.navigate(['garantias/register-engine-basic']);
    }
    if(warranty.bandeja==1){
      localStorage.setItem('action','edit');
      localStorage.setItem('garantia',JSON.stringify(warranty));
      this.router.navigate(['garantias/register-engine-basic']);
    }
    if(warranty.bandeja>=2 && warranty.bandeja<=6){
      localStorage.setItem('garantia',JSON.stringify(warranty));
      this.router.navigate(['garantias/change-tray']);
    }
  }

  mostrarComentario(_comentario):void{
    const dialogMostrarComentario = this.matDialog.open(DialogMostrarComentarioComponent,{
      data:{comentario:_comentario,text:'Tu reclamo ha sido observado'},
      disableClose:true, width:'500px'
    });
  }
}
