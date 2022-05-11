import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogNewConstantComponent } from './dialogs/dialog-new-constant/dialog-new-constant.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { DialogDeleteComponent } from 'app/shared/dialogs/dialog-delete/dialog-delete.component';
import { MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
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

@Component({
  selector: 'app-constant',
  templateUrl: './constant.component.html',
  styleUrls: ['./constant.component.scss']
})
export class ConstantComponent implements OnInit {

  displayedColumns: string[] = ['code', 'laborRate', 'kmRate', 'bcfMarkup', 'siteLabor', 'state', 'actions'];
  listConstants: any[];
  totalConstants: number;

  dataSource : any[];


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor( private readonly matDialog: MatDialog,
              private readonly configurationAndMaintenanceService: ConfigurationAndMaintenanceService,
              private _snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.getListConstant();
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

  deleteConstant(option:any, _constant:any):void{
    const request = {id:_constant.id, active:false};
    if(option){
      this.configurationAndMaintenanceService.deleteConstant(request).subscribe(resp=>{
        if(resp.success){
          this.getListConstant();
          this.openSnackBar('La constante fue eliminada');
        }
      });
    }else{
      console.log('operacion cancelada');      
    }
  }

  getListConstant():void{
    this.configurationAndMaintenanceService.listConstants().subscribe(resp=>{
      this.dataSource = resp.data;
      this.totalConstants = resp.totalRecords;
    });
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