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
interface Option {
  value: any;
  name: string;
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
  displayedColumnsBitacora: string[] = ['fecha', 'evaluador', 'comentario', 'estado', 'monto', 'bandejaActual'];
  dataSourceBitacora = ELEMENT_DATA;
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
      console.log(resp);
      this.totalWarranties = resp.totalRecords;
      this.totalRows = resp.pageSize;
      this.numberOfPages = this.getNumberOfPages(resp.pageSize,resp.totalRecords);
      this.dataSource = resp.data;
      this.disabledButtonsPagination();
    })
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
    this.formFilter = new FormGroup({
      esn: new FormControl(null),
      os: new FormControl(null),
      area: new FormControl(-1),
      fechaIni: new FormControl(this.prevDate),
      fechaFin: new FormControl(this.currentDate),
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

  getColorInbox(state):string{
    if(state==1){return 'state1'}
    if(state==2){return 'state2'}
    if(state==3){return 'state3'}
    if(state==4){return 'state4'}
    if(state==5){return 'state5'}
    if(state==6){return 'state6'}
  }

  getWordInbox(state):string{
    if(state==0){return 'B. Inicial'}
    if(state==1){return 'Blanco'}
    if(state==2){return 'Naranja'}
    if(state==3){return 'Verde'}
    if(state==4){return 'Gris'}
    if(state==5){return 'Negra'}
    if(state==6){return 'Amarillo'}
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
    this.seeNotificationCreateWarrantySuccessfully = true;
    setTimeout(()=>{
      this.seeNotificationCreateWarrantySuccessfully = false;
    },5000);
    localStorage.removeItem('success');
  }

  seeBitacora(element):void{
    console.log(element.id);
    this.expandedElement = this.expandedElement === element ? null : element;
    this.garantiasService.logWarranty(element.id).subscribe(resp=>{
      console.log(resp);
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
}
