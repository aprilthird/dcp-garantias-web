import { Component, OnInit } from '@angular/core';
import { DialogMaintenanceClientComponent } from './dialog-maintenance-client/dialog-maintenance-client.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from 'app/shared/dialogs/dialog-delete/dialog-delete.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  displayedColumns: string[] = ['codigo','razonSocial', 'direccion','ciudad', 'telefono','RUC', 'contacto1' ,'cargoContacto1', 'telefono1', 'email1','acciones'];
  dataSource: any[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private readonly matDialog: MatDialog,
            private _snackBar: MatSnackBar,
            private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.listClients();
  }

  listClients():void{
    this.configurationAndMaintenanceService.listClients().subscribe(resp=>{
      this.dataSource = resp.data;      
    });
  }

  onDialogNewClient():void{
    const dialogNewTravelDetail = this.matDialog.open(DialogMaintenanceClientComponent,{
      data: {option:'new'},
      disableClose:true,
      width:'1100px'
    });
    dialogNewTravelDetail.afterClosed().subscribe(resp=>{
      if(resp){
        this.openDialogOperationSuccessfully('Cliente creado con éxito');
        this.listClients();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogEditClient(client:any):void{
    const dialogEditTravelDetail = this.matDialog.open(DialogMaintenanceClientComponent,{
      data: {option:'edit', client:client},
      disableClose:true,
      width:'1100px'

    });
    dialogEditTravelDetail.afterClosed().subscribe(resp => {
      if(resp){
        this.openDialogOperationSuccessfully('Cliente editado con éxito');
        this.listClients();        
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogDeleteClient(client:any):void{
    const dialogDelete = this.matDialog.open(DialogDeleteComponent,{
      data:{text:'¿Está seguro de eliminar este cliente?'}
    });
    dialogDelete.afterClosed().subscribe(resp=>{
      this.deleteConstant(resp,client);
    });
  }

  openDialogOperationSuccessfully(textDialog:string):void{
    const dialogOperationSuccessfully = this.matDialog.open(DialogOperationSuccessfullyComponent,{
      data:{text:textDialog}
    });
    dialogOperationSuccessfully.afterClosed().subscribe();
  }

  deleteConstant(option:any, client:any):void{
    const request = {id:client.id, activo:false};
    if(option){
      this.configurationAndMaintenanceService.deleteConstant(request).subscribe(resp=>{
        if(resp.success){
          this.listClients();
          this.openSnackBar('Cliente eliminado');
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
