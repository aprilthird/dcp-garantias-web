import { Component, OnInit } from '@angular/core';
import { DialogMaintenancePartsComponent } from './dialog-maintenance-parts/dialog-maintenance-parts.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComponent } from 'app/shared/dialogs/dialog-delete/dialog-delete.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'descripcion','tipo' ,'precioFob','estado','acciones'];
  dataSource = [];

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

  constructor(private readonly matDialog: MatDialog,
            private _snackBar: MatSnackBar,
            private readonly configurationAndMaintenanceService: ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.listParts();
    this.configurationAndMaintenanceService.listTipoViaje(1).subscribe(resp=>{
      console.log(resp);
    })
    this.configurationAndMaintenanceService.listDetalleViaje(1).subscribe(resp=>{
      console.log(resp);
    })
    this.configurationAndMaintenanceService.listUnidadMedida(1).subscribe(resp=>{
      console.log(resp);
    })
  }

  listParts():void{
    this.configurationAndMaintenanceService.listParts(this.pageCurrent).subscribe(resp=>{      
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
      this.listParts();
      this.disabledButtonsPagination();
    }
    if(type=='less'){
      this.pageCurrent = this.pageCurrent - 1 ;
      this.listParts();
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

  onDialogNewPart():void{
    const dialogNewTravelDetail = this.matDialog.open(DialogMaintenancePartsComponent,{
      data: {option:'new'},
      width:'900px'
    });
    dialogNewTravelDetail.afterClosed().subscribe(resp=>{
      if(resp){
        this.openDialogOperationSuccessfully('Parte creada con éxito');
        this.listParts();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogEditPart(_part:any):void{
    const dialogEditTravelDetail = this.matDialog.open(DialogMaintenancePartsComponent,{
      data: {option:'edit', part:_part},
      width:'900px'
    });
    dialogEditTravelDetail.afterClosed().subscribe(resp => {
      if(resp){
        this.openDialogOperationSuccessfully('Parte editada con éxito');
        this.listParts();
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  onDialogDeletePart(parte:any):void{
    const dialogDelete = this.matDialog.open(DialogDeleteComponent,{
      data:{text:'¿Está seguro de eliminar esta parte?'}
    });
    dialogDelete.afterClosed().subscribe(resp=>{
      this.deleteConstant(resp,parte);
    });
  }

  openDialogOperationSuccessfully(textDialog:string):void{
    const dialogOperationSuccessfully = this.matDialog.open(DialogOperationSuccessfullyComponent,{
      data:{text:textDialog}
    });
    dialogOperationSuccessfully.afterClosed().subscribe();
  }

  deleteConstant(option:any, parte:any):void{
    parte.activo=false;
    if(option){
      this.configurationAndMaintenanceService.maintenanceParts(parte).subscribe(resp=>{
        if(resp.success){
          this.listParts();
          this.openSnackBar('Parte eliminado');
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