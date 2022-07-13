import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogNewConstantComponent } from './dialogs/dialog-new-constant/dialog-new-constant.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { DialogDeleteComponent } from 'app/shared/dialogs/dialog-delete/dialog-delete.component';
import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Component({
  selector: 'app-constant',
  templateUrl: './constant.component.html',
  styleUrls: ['./constant.component.scss']
})
export class ConstantComponent implements OnInit {

  displayedColumns: string[] = ['code', 'laborRate', 'kmRate', 'bfc', 'markup', 'siteLabor', 'state', 'actions'];
  dataSource : any[];
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

  constructor( private readonly matDialog: MatDialog,
              private readonly configurationAndMaintenanceService: ConfigurationAndMaintenanceService,
              private _snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.getListConstant();
  }
  
  getListConstant():void{
    this.configurationAndMaintenanceService.listConstants(this.pageCurrent).subscribe(resp=>{
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
      result = (result + 1 );
    }
    return Math.trunc(result);
  }

  changePage(type:string){
    if(type=='more'){
      this.pageCurrent = this.pageCurrent + 1 ;
      this.getListConstant();
      this.disabledButtonsPagination();
    }
    if(type=='less'){
      this.pageCurrent = this.pageCurrent - 1 ;
      this.getListConstant();
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

  onDialogNewConstant():void{
    const dialogNewConstant = this.matDialog.open(DialogNewConstantComponent,{
      data: {option:'new'}
    });
    dialogNewConstant.afterClosed().subscribe(resp => {
      if(resp){
        this.openDialogOperationSuccessfully('Constante creada con éxito');
        this.getListConstant();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogEditConstant(_constant:any):void{
    const dialogEditConstant = this.matDialog.open(DialogNewConstantComponent,{
      data: {option:'edit', constant:_constant}
    });
    dialogEditConstant.afterClosed().subscribe(resp => {
      if(resp){
        this.openDialogOperationSuccessfully('Constante editada con éxito');
        this.getListConstant();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogDeleteConstant(_constant:any):void{
    const dialogDelete = this.matDialog.open(DialogDeleteComponent,{
      data:{text:'¿Está seguro de eliminar esta constante?'}
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

  deleteConstant(option:any, constante:any):void{
    constante.activo = false;
    if(option){
      this.configurationAndMaintenanceService.maintenanceConstants(constante).subscribe(resp=>{
        if(resp.success){
          this.getListConstant();
          this.openSnackBar('La constante fue eliminada');
        }
      });
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

}
