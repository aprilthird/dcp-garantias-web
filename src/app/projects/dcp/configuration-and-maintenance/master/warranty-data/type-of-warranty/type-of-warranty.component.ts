import { Component, OnInit } from '@angular/core';
import { DialogMaintenanceTypeOfWarrantyComponent } from './dialog-maintenance-type-of-warranty/dialog-maintenance-type-of-warranty.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from 'app/shared/dialogs/dialog-delete/dialog-delete.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';

@Component({
  selector: 'app-type-of-warranty',
  templateUrl: './type-of-warranty.component.html',
  styleUrls: ['./type-of-warranty.component.scss']
})
export class TypeOfWarrantyComponent implements OnInit {

  displayedColumns: string[] = ['codigo','descripcion','estado','acciones'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private readonly matDialog: MatDialog,
            private _snackBar: MatSnackBar,
            private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.listWarrantyTypes();
  }

  listWarrantyTypes():void{
    this.configurationAndMaintenanceService.listWarrantyTypes().subscribe(resp=>{
      console.log(resp);
    });
  }

  onDialogNewTypeOfWarranty():void{
    const dialogNewTravelDetail = this.matDialog.open(DialogMaintenanceTypeOfWarrantyComponent,{
      data: {option:'new'},
      width:'900px'
    });
    dialogNewTravelDetail.afterClosed().subscribe(resp=>{
      if(resp){
        this.openDialogOperationSuccessfully('Tipo de Garantia creada con éxito');
        this.listWarrantyTypes();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogEditTypeOfWarranty(_warrantyType:any):void{
    const dialogEditTravelDetail = this.matDialog.open(DialogMaintenanceTypeOfWarrantyComponent,{
      data: {option:'edit', warrantyType:_warrantyType},
      width:'900px'

    });
    dialogEditTravelDetail.afterClosed().subscribe(resp => {
      if(resp){
        this.openDialogOperationSuccessfully('Tipo de Garantia  editada con éxito');
        this.listWarrantyTypes();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogDeleteTypeOfWarranty(warrantyType:any):void{
    const dialogDelete = this.matDialog.open(DialogDeleteComponent,{
      data:{text:'¿Está seguro de eliminar este Tipo de Garantia ?'}
    });
    dialogDelete.afterClosed().subscribe(resp=>{
      this.deleteConstant(resp,warrantyType);
    });
  }

  openDialogOperationSuccessfully(textDialog:string):void{
    const dialogOperationSuccessfully = this.matDialog.open(DialogOperationSuccessfullyComponent,{
      data:{text:textDialog}
    });
    dialogOperationSuccessfully.afterClosed().subscribe();
  }

  deleteConstant(option:any, warrantyType:any):void{
    const request = {id:warrantyType.id, active:false};
    if(option){
      this.configurationAndMaintenanceService.deleteWarrantyTypes(request).subscribe(resp=>{
        if(resp.success){
          this.listWarrantyTypes();
          this.openSnackBar('Tipo de Garantia eliminado');
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