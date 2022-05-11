import { Component, OnInit } from '@angular/core';
import { DialogMaintenanceOthersClaimsComponent } from './dialog-maintenance-others-claims/dialog-maintenance-others-claims.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from 'app/shared/dialogs/dialog-delete/dialog-delete.component';


@Component({
  selector: 'app-other-claims',
  templateUrl: './other-claims.component.html',
  styleUrls: ['./other-claims.component.scss']
})
export class OtherClaimsComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'descripcion', 'estado','acciones'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(private readonly matDialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onDialogNewOtherClaim():void{
    const dialogNewTravelDetail = this.matDialog.open(DialogMaintenanceOthersClaimsComponent,{
      data: {option:'new'},
      width:'900px'
    });
    dialogNewTravelDetail.afterClosed().subscribe(resp=>{
      if(resp){
        this.openDialogOperationSuccessfully('Otro reclamable creada con éxito');
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogEditOtherClaim(_constant:any):void{
    const dialogEditTravelDetail = this.matDialog.open(DialogMaintenanceOthersClaimsComponent,{
      data: {option:'edit', constant:_constant},
      width:'900px'

    });
    dialogEditTravelDetail.afterClosed().subscribe(resp => {
      if(resp){
        this.openDialogOperationSuccessfully('Otro reclamable editada con éxito');
        // this.getListConstant();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogDeleteOtherClaim(_constant:any):void{
    const dialogDelete = this.matDialog.open(DialogDeleteComponent,{
      data:{text:'¿Está seguro de eliminar este otro reclamable?'}
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
          this.openSnackBar('Otro reclamable eliminado');
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

