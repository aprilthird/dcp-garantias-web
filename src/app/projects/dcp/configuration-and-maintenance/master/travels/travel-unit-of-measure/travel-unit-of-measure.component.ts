import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from 'app/shared/dialogs/dialog-delete/dialog-delete.component';
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { DialogMaintenanceTravelUnitOfMeasureComponent } from '../dialogs/dialog-maintenance-travel-unit-of-measure/dialog-maintenance-travel-unit-of-measure.component';

@Component({
  selector: 'app-travel-unit-of-measure',
  templateUrl: './travel-unit-of-measure.component.html',
  styleUrls: ['./travel-unit-of-measure.component.scss']
})
export class TravelUnitOfMeasureComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'descripcion', 'estado','acciones'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private readonly matDialog: MatDialog,
               private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onDialogNewTravelUnitOfMeasure():void{
    const dialogNewTravelDetail = this.matDialog.open(DialogMaintenanceTravelUnitOfMeasureComponent,{
      data: {option:'new'},
      width:'900px'
    });
    dialogNewTravelDetail.afterClosed().subscribe(resp=>{
      if(resp){
        this.openDialogOperationSuccessfully('Unidad de medida creada con éxito');
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogEditTravelUnitOfMeasure(_constant:any):void{
    const dialogEditTravelDetail = this.matDialog.open(DialogMaintenanceTravelUnitOfMeasureComponent,{
      data: {option:'edit', constant:_constant},
      width:'900px'

    });
    dialogEditTravelDetail.afterClosed().subscribe(resp => {
      if(resp){
        this.openDialogOperationSuccessfully('Unidad de medida editada con éxito');
        // this.getListConstant();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogDeleteTravelUnitOfMeasure(_constant:any):void{
    const dialogDelete = this.matDialog.open(DialogDeleteComponent,{
      data:{text:'¿Está seguro de eliminar este Unidad de medida?'}
    });
    dialogDelete.afterClosed().subscribe(resp=>{
      this.deleteConstant(resp,_constant);
    });
  }

  
  deleteConstant(option:any, _constant:any):void{
    // const request = {id:_constant.id, active:false};
    if(option){
      // this.configurationAndMaintenanceService.deleteConstant(request).subscribe(resp=>{
        // if(resp.success){
          // this.getListConstant();
          this.openSnackBar('Unidad de medida eliminada');
        // }
      // });
    }else{
      console.log('operacion cancelada');      
    }
  }

  openDialogOperationSuccessfully(textDialog:string):void{
    const dialogOperationSuccessfully = this.matDialog.open(DialogOperationSuccessfullyComponent,{
      data:{text:textDialog}
    });
    dialogOperationSuccessfully.afterClosed().subscribe();
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
