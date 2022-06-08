import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DialogNewSrtComponent } from './dialogs/dialog-new-srt/dialog-new-srt.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { DialogDeleteComponent } from 'app/shared/dialogs/dialog-delete/dialog-delete.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';

@Component({
  selector: 'app-srt',
  templateUrl: './srt.component.html',
  styleUrls: ['./srt.component.scss']
})
export class SrtComponent implements OnInit {


  displayedColumns: string[] = ['codigo', 'grupoSRT', 'procedimiento', 'paso', 'descripcion', 'tipo', 'dondeSeReparo','fabricaSRT', 'estado','acciones'];
  dataSource = [];
  //datos del paginado
  totalRecords:any;
  totalRows:any;
  numberOfPages:any;
  pageCurrent:number=1;
  //botones del paginado
  disabledButtonMore:boolean=false;
  disabledButtonLess:boolean=false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private readonly matDialog: MatDialog,
              private _snackBar: MatSnackBar,
              private readonly configurationAndMaintenanceService: ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.listSrt();
  }

  listSrt():void{
    this.configurationAndMaintenanceService.listSrt(this.pageCurrent).subscribe(resp=>{      
      this.dataSource = resp.data;
      this.totalRecords = resp.totalRecords;
      this.totalRows = resp.pageSize;
      this.numberOfPages = this.getNumberOfPages(resp.pageSize,resp.totalRecords);
      this.dataSource = resp.data;
      this.disabledButtonsPagination();
    });
  }

  getNumberOfPages(totalRows:any,totalRecords:any):number{
    let result:any;
    result = totalRecords / totalRows;
    if((totalRecords % totalRows)>0){
      result = (result+1);
    }
    return Math.trunc(result);
  }

  changePage(type:string){
    if(type=='more'){
      this.pageCurrent = this.pageCurrent + 1 ;
      this.listSrt();
      this.disabledButtonsPagination();
    }
    if(type=='less'){
      this.pageCurrent = this.pageCurrent - 1 ;
      this.listSrt();
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

  onDialogNewSrt():void{
    const dialogNewSrt = this.matDialog.open(DialogNewSrtComponent,{
      data: {option:'new'}
    });
    dialogNewSrt.afterClosed().subscribe(resp=>{
      if(resp){
        this.openDialogOperationSuccessfully('SRT creada con éxito');
        this.listSrt();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogEditSRT(_srt:any):void{
    const dialogEditConstant = this.matDialog.open(DialogNewSrtComponent,{
      data: {option:'edit', srt:_srt}
    });
    dialogEditConstant.afterClosed().subscribe(resp => {
      if(resp){
        this.openDialogOperationSuccessfully('Constante editada con éxito');
        this.listSrt();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogDeleteSrt(_constant:any):void{
    const dialogDelete = this.matDialog.open(DialogDeleteComponent,{
      data:{text:'¿Está seguro de eliminar esta SRT?'}
    });
    dialogDelete.afterClosed().subscribe(resp=>{
      this.deleteConstant(resp,_constant);
    });
  }

  openDialogOperationSuccessfully(textDialog:string):void{
    const dialogOperationSuccessfully = this.matDialog.open(DialogOperationSuccessfullyComponent,{
      data:{text:textDialog}
    });
    dialogOperationSuccessfully.afterClosed().subscribe();
  }

  deleteConstant(option:any, _constant:any):void{
    // const request = {id:_constant.id, active:false};
    if(option){
      // this.configurationAndMaintenanceService.deleteConstant(request).subscribe(resp=>{
        // if(resp.success){
          // this.getListConstant();
          this.openSnackBar('La SRT fue eliminada');
        // }
      // });
    }else{
      console.log('operacion cancelada');      
    }
  }

  openSnackBar(message:string):void{
    this._snackBar.open(message,'Entendido',{
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['mat-toolbar', 'mat-primary','button-color']
    })
  }

  onUpdateSrt():void{
    this.openSnackBar('SRT actualizadas');
  }
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
