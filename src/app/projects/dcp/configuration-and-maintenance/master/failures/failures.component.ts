import { Component, OnInit } from '@angular/core';
import { DialogMaintenanceFailuresComponent } from './dialog-maintenance-failures/dialog-maintenance-failures.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from 'app/shared/dialogs/dialog-delete/dialog-delete.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';

@Component({
  selector: 'app-failures',
  templateUrl: './failures.component.html',
  styleUrls: ['./failures.component.scss']
})
export class FailuresComponent implements OnInit {

  displayedColumns: string[] = ['codigo','grupoMayor', 'descripcionGrupoMayor','parteFallada', 'descripcionParteFallada','tipoFalla', 'descripcionTipoFalla' ,'estado','acciones'];
  dataSource = [];
  disabledButtonMore:boolean=false;
  disabledButtonLess:boolean=false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  //datos del paginado
  totalRecords:any;
  totalRows:any;
  numberOfPages:any;
  pageCurrent:number=1;
  
  constructor(private readonly matDialog: MatDialog,
            private _snackBar: MatSnackBar, private readonly configurationAndMaintenanceService: ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.listFallas();
  }

  listFallas():void{
    this.configurationAndMaintenanceService.listaFallas(this.pageCurrent).subscribe(resp=>{      
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
      this.listFallas();
      this.disabledButtonsPagination();
    }
    if(type=='less'){
      this.pageCurrent = this.pageCurrent - 1 ;
      this.listFallas();
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

  onDialogNewFailure():void{
    const dialogNewTravelDetail = this.matDialog.open(DialogMaintenanceFailuresComponent,{
      data: {option:'new'},
      width:'900px'
    });
    dialogNewTravelDetail.afterClosed().subscribe(resp=>{
      if(resp){
        this.openDialogOperationSuccessfully('Falla creada con éxito');
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogEditFailure(_falla:any):void{
    const dialogEditTravelDetail = this.matDialog.open(DialogMaintenanceFailuresComponent,{
      data: {option:'edit', falla:_falla},
      width:'900px'

    });
    dialogEditTravelDetail.afterClosed().subscribe(resp => {
      if(resp){
        this.openDialogOperationSuccessfully('Falla editada con éxito');
        this.listFallas();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogDeleteFailure(falla:any):void{
    const dialogDelete = this.matDialog.open(DialogDeleteComponent,{
      data:{text:'¿Está seguro de eliminar esta falla?'}
    });
    dialogDelete.afterClosed().subscribe(resp=>{
      this.deleteConstant(resp,falla);
    });
  }

  openDialogOperationSuccessfully(textDialog:string):void{
    const dialogOperationSuccessfully = this.matDialog.open(DialogOperationSuccessfullyComponent,{
      data:{text:textDialog}
    });
    dialogOperationSuccessfully.afterClosed().subscribe();
  }

  deleteConstant(option:any, falla:any):void{
    falla.activo=false;
    if(option){
      this.configurationAndMaintenanceService.mantenimientoFallas(falla).subscribe(resp=>{
        if(resp.success){
          this.listFallas();
          this.openSnackBar('Falla eliminado');
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