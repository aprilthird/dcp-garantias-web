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

  constructor(private readonly matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.listEngineModels();
  }

  listEngineModels():void{
    this.configurationAndMaintenanceService.listEngineModels().subscribe(resp=>{
        this.dataSource = resp.data;
    })
  }

  onDialogNewEngineModel():void{
    const dialogNewTravelDetail = this.matDialog.open(DialogMaintenanceEngineModelComponent,{
      data: {option:'new'},
      width:'900px'
    });
    dialogNewTravelDetail.afterClosed().subscribe(resp=>{
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
