import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogQuestionNewRecordComponent } from './../dialogs/dialog-question-new-record/dialog-question-new-record.component';
import { Router } from '@angular/router';
import { DialogHistoriaESNComponent } from './../dialogs/dialog-historia-esn/dialog-historia-esn.component';

interface Option {
  value: string;
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
  {number: 9, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 40, inbox: 1, state: 'observado'},
  {number: 10, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 40, inbox: 1, state: 'servicios'},
  {number: 11, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 40, inbox: 6, state: 'rechazado'},
  {number: 12, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 40, inbox: 3, state: 'observado'},
  {number: 13, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 40, inbox: 2, state: 'servicios'},
  {number: 14, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 40, inbox: 5, state: 'rechazado'},
  {number: 15, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 40, inbox: 1, state: 'observado'},
  {number: 16, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 40, inbox: 3, state: 'servicios'},
  {number: 17, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 40, inbox: 2, state: 'rechazado'},
  {number: 18, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 40, inbox: 3, state: 'observado'},
  {number: 19, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 40, inbox: 3, state: 'servicios' },
  {number: 20, serie: '66304283', area: 'Piura Motores', type: 'GFA',  failureDate: '12/11/21', amount: 500.50, user: 'José Perez', age: 40, inbox: 1, state: 'rechazado'},
];

@Component({
  selector: 'app-garantias-list',
  templateUrl: './garantias-list.component.html',
  styleUrls: ['./garantias-list.component.scss']
})
export class GarantiasListComponent implements OnInit,AfterViewInit {

  options: Option[] = [
    {value:'opt1', name:'opcion 1'},
    {value:'opt2', name:'opcion 2'},
    {value:'opt3', name:'opcion 3'},
    {value:'opt4', name:'opcion 4'},
  ];

  displayedColumns: string[] = ['number', 'serie', 'area', 'type', 'failureDate', 'amount', 'user', 'age', 'inbox', 'state'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private readonly matDialog: MatDialog,
              private readonly router: Router) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

}
