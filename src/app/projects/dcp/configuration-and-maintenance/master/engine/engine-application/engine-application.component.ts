import { Component, OnInit } from '@angular/core';
import { DialogMaintenanceEngineApplicationComponent } from './dialog-maintenance-engine-application/dialog-maintenance-engine-application.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from 'app/shared/dialogs/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-engine-application',
  templateUrl: './engine-application.component.html',
  styleUrls: ['./engine-application.component.scss']
})
export class EngineApplicationComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'descripcion', 'estado','acciones'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private readonly matDialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onDialogNewEngineApplication():void{
    const dialogNewTravelDetail = this.matDialog.open(DialogMaintenanceEngineApplicationComponent,{
      data: {option:'new'},
      width:'900px'
    });
    dialogNewTravelDetail.afterClosed().subscribe(resp=>{
      if(resp){
        this.openDialogOperationSuccessfully('Aplicacion de motor creada con éxito');
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogEditEngineApplication(_constant:any):void{
    const dialogEditTravelDetail = this.matDialog.open(DialogMaintenanceEngineApplicationComponent,{
      data: {option:'edit', constant:_constant},
      width:'900px'

    });
    dialogEditTravelDetail.afterClosed().subscribe(resp => {
      if(resp){
        this.openDialogOperationSuccessfully('Aplicacion de motor editada con éxito');
        // this.getListConstant();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogDeleteEngineApplication(_constant:any):void{
    const dialogDelete = this.matDialog.open(DialogDeleteComponent,{
      data:{text:'¿Está seguro de eliminar esta Aplicacion de motor?'}
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
          this.openSnackBar('Aplicacion de motor eliminada');
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
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'}
];