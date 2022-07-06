import { Component, OnInit } from '@angular/core';
import { DialogMaintenanceServiceAreaComponent } from './dialog-maintenance-service-area/dialog-maintenance-service-area.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from 'app/shared/dialogs/dialog-delete/dialog-delete.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
@Component({
  selector: 'app-service-area',
  templateUrl: './service-area.component.html',
  styleUrls: ['./service-area.component.scss']
})
export class ServiceAreaComponent implements OnInit {

  displayedColumns: string[] = ['codigo','descripcion', 'codigoServicioSap','codigoConstante','estado','bu','subBU','lugar', 'ceco','acciones'];
  dataSource = [];

    //datos del paginado
    totalRecords:any;
    totalRows:any;
    numberOfPages:any;
    pageCurrent:number=1;
    //botones del paginado
    disabledButtonMore:boolean=false;
    disabledButtonLess:boolean=false;
  

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private readonly matDialog: MatDialog,
              private _snackBar: MatSnackBar,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.listServiceAreas();
  }

  listServiceAreas():void{
    this.configurationAndMaintenanceService.listServiceArea(this.pageCurrent).subscribe(resp=>{
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
      this.listServiceAreas();
      this.disabledButtonsPagination();
    }
    if(type=='less'){
      this.pageCurrent = this.pageCurrent - 1 ;
      this.listServiceAreas();
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
  onDialogNewServiceArea():void{
    const dialogNewTravelDetail = this.matDialog.open(DialogMaintenanceServiceAreaComponent,{
      data: {option:'new'},
      width:'900px'
    });
    dialogNewTravelDetail.afterClosed().subscribe(resp=>{
      if(resp){
        this.openDialogOperationSuccessfully('Area de Servicio creada con éxito');
        this.listServiceAreas();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogEditServiceArea(_serviceArea:any):void{
    const dialogEditTravelDetail = this.matDialog.open(DialogMaintenanceServiceAreaComponent,{
      data: {option:'edit', serviceArea:_serviceArea},
      width:'900px'

    });
    dialogEditTravelDetail.afterClosed().subscribe(resp => {
      if(resp){
        this.openDialogOperationSuccessfully('Area de Servicio editada con éxito');
        this.listServiceAreas();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogDeleteServiceArea(serviceArea:any):void{
    const dialogDelete = this.matDialog.open(DialogDeleteComponent,{
      data:{text:'¿Está seguro de eliminar esta Area de Servicio?'}
    });
    dialogDelete.afterClosed().subscribe(resp=>{
      this.deleteConstant(resp,serviceArea);
    });
  }

  openDialogOperationSuccessfully(textDialog:string):void{
    const dialogOperationSuccessfully = this.matDialog.open(DialogOperationSuccessfullyComponent,{
      data:{text:textDialog}
    });
    dialogOperationSuccessfully.afterClosed().subscribe();
  }

  deleteConstant(option:any, serviceArea:any):void{
    serviceArea.activo=false;
    if(option){
      this.configurationAndMaintenanceService.deleteServiceArea(serviceArea).subscribe(resp=>{
        if(resp.success){
          this.listServiceAreas();
          this.openSnackBar('Area de Servicio eliminado');
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