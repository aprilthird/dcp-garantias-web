import { Component, OnInit } from '@angular/core';
import { DialogMaintenanceEngineModelComponent } from './dialog-maintenance-engine-model/dialog-maintenance-engine-model.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from 'app/shared/dialogs/dialog-delete/dialog-delete.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';

@Component({
  selector: 'app-engine-model',
  templateUrl: './engine-model.component.html',
  styleUrls: ['./engine-model.component.scss']
})
export class EngineModelComponent implements OnInit {


  displayedColumns: string[] = ['codigo', 'descripcion', 'estado','acciones'];
  dataSource: any[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  //datos del paginado
  totalRecords:any;
  totalRows:any;
  numberOfPages:any;
  pageCurrent:number=1;
  //botones del paginado
  disabledButtonMore:boolean=false;
  disabledButtonLess:boolean=false;

  constructor(private readonly matDialog: MatDialog,private _snackBar: MatSnackBar,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.listEngineModels();
  }

  listEngineModels():void{
    this.configurationAndMaintenanceService.listEngineModels(this.pageCurrent).subscribe(resp=>{
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
      this.listEngineModels();
      this.disabledButtonsPagination();
    }
    if(type=='less'){
      this.pageCurrent = this.pageCurrent - 1 ;
      this.listEngineModels();
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

  onDialogNewEngineModel():void{
    const dialogNew = this.matDialog.open(DialogMaintenanceEngineModelComponent,{
      data: {option:'new'},
      width:'900px',
      disableClose:true
    });
    dialogNew.afterClosed().subscribe(resp=>{
      if(resp){
        this.openDialogOperationSuccessfully('Modelo de motor creado con éxito');
        this.listEngineModels();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogEditEngineModel(_model:any):void{
    const dialogEditTravelDetail = this.matDialog.open(DialogMaintenanceEngineModelComponent,{
      data: {option:'edit', model:_model},
      width:'900px'

    });
    dialogEditTravelDetail.afterClosed().subscribe(resp => {
      if(resp){
        this.openDialogOperationSuccessfully('Modelo de motor editado con éxito');
        this.listEngineModels();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogDeleteEngineModel(model:any):void{
    const dialogDelete = this.matDialog.open(DialogDeleteComponent,{
      data:{text:'¿Está seguro de eliminar este Modelo de motor?'}
    });
    dialogDelete.afterClosed().subscribe(resp=>{
      this.deleteConstant(resp,model);
    });
  }

  openDialogOperationSuccessfully(textDialog:string):void{
    const dialogOperationSuccessfully = this.matDialog.open(DialogOperationSuccessfullyComponent,{
      data:{text:textDialog}
    });
    dialogOperationSuccessfully.afterClosed().subscribe();
  }

  deleteConstant(option:any, model:any):void{
    if(option){
      const request = {id:model.id, activo:false};
      this.configurationAndMaintenanceService.deleteEngineModel(request).subscribe(resp=>{
        if(resp.success){
          this.listEngineModels();
          this.openSnackBar('Modelo de motor eliminado');
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
