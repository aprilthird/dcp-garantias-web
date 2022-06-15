import { Component, OnInit } from '@angular/core';
import { DialogMaintenanceEngineApplicationComponent } from './dialog-maintenance-engine-application/dialog-maintenance-engine-application.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from 'app/shared/dialogs/dialog-delete/dialog-delete.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';

@Component({
  selector: 'app-engine-application',
  templateUrl: './engine-application.component.html',
  styleUrls: ['./engine-application.component.scss']
})
export class EngineApplicationComponent implements OnInit {

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
    this.listEngineApplications();
  }

  listEngineApplications():void{
    this.configurationAndMaintenanceService.listEngineApplications(1).subscribe(resp=>{
        this.dataSource = resp.data;
        this.totalRecords = resp.totalRecords;
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
      result = (result+1);
    }
    return Math.trunc(result);
  }

  changePage(type:string){
    if(type=='more'){
      this.pageCurrent = this.pageCurrent + 1 ;
      this.listEngineApplications();
      this.disabledButtonsPagination();
    }
    if(type=='less'){
      this.pageCurrent = this.pageCurrent - 1 ;
      this.listEngineApplications();
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

  onDialogNewEngineApplication():void{
    const dialogNewTravelDetail = this.matDialog.open(DialogMaintenanceEngineApplicationComponent,{
      data: {option:'new'},
      width:'900px'
    });
    dialogNewTravelDetail.afterClosed().subscribe(resp=>{
      if(resp){
        this.openDialogOperationSuccessfully('Aplicacion de motor creada con éxito');
        this.listEngineApplications();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogEditEngineApplication(_application:any):void{
    const dialogEditTravelDetail = this.matDialog.open(DialogMaintenanceEngineApplicationComponent,{
      data: {option:'edit', application:_application},
      width:'900px'

    });
    dialogEditTravelDetail.afterClosed().subscribe(resp => {
      if(resp){
        this.openDialogOperationSuccessfully('Aplicacion de motor editada con éxito');
        this.listEngineApplications();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogDeleteEngineApplication(application:any):void{
    const dialogDelete = this.matDialog.open(DialogDeleteComponent,{
      data:{text:'¿Está seguro de eliminar esta Aplicacion de motor?'}
    });
    dialogDelete.afterClosed().subscribe(resp=>{
      this.deleteConstant(resp,application);
    });
  }

  openDialogOperationSuccessfully(textDialog:string):void{
    const dialogOperationSuccessfully = this.matDialog.open(DialogOperationSuccessfullyComponent,{
      data:{text:textDialog}
    });
    dialogOperationSuccessfully.afterClosed().subscribe();
  }

  deleteConstant(option:any, application:any):void{
    const request = {id:application.id, activo:false};
    if(option){
      this.configurationAndMaintenanceService.deleteEngineApplication(request).subscribe(resp=>{
        if(resp.success){
          this.listEngineApplications();
          this.openSnackBar('Aplicacion de motor eliminada');
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
