import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { SnackBarMessageComponent } from 'app/shared/dialogs/snack-bar-message/snack-bar-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dialog-maintenance-service-area',
  templateUrl: './dialog-maintenance-service-area.component.html',
  styleUrls: ['./dialog-maintenance-service-area.component.scss']
})
export class DialogMaintenanceServiceAreaComponent implements OnInit {

  formServiceArea:FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceServiceAreaComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private readonly matDialog:MatDialog,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService,
              private readonly matSnackBar:MatSnackBar) { }

  ngOnInit(): void {
    console.log(this.data);
    this.loadFormWarranty();
  }

  loadFormWarranty():void{
    if(this.data.option=='new'){
      this.formServiceArea = new FormGroup({
        codigo: new FormControl('',[Validators.required]),
        descripcion: new FormControl('',[Validators.required]),
        codigoServicioSap: new FormControl('',[Validators.required]),
        codigoConstante: new FormControl('',[Validators.required]),
        bu: new FormControl('',[Validators.required]),
        busub: new FormControl('',[Validators.required]),
        lugar: new FormControl('',[Validators.required]),
        ceco: new FormControl('',[Validators.required]),
        estado: new FormControl(true,[Validators.required])
      })
    }else{
      const estate = this.data.serviceArea.estado==1? true:false;
      this.formServiceArea = new FormGroup({
        codigo: new FormControl(this.data.serviceArea.codigo,[Validators.required]),
        descripcion: new FormControl(this.data.serviceArea.descripcion,[Validators.required]),
        codigoServicioSap: new FormControl(this.data.serviceArea.codigoServicioSap,[Validators.required]),
        codigoConstante: new FormControl(this.data.serviceArea.codigoConstante,[Validators.required]),
        bu: new FormControl(this.data.serviceArea.bu,[Validators.required]),
        busub: new FormControl(this.data.serviceArea.busub,[Validators.required]),
        lugar: new FormControl(this.data.serviceArea.lugar,[Validators.required]),
        ceco: new FormControl(this.data.serviceArea.ceco,[Validators.required]),
        estado: new FormControl(estate,[Validators.required])
      })
    }
  }


  onSaveServiceArea():void{
    if(this.formServiceArea.valid){
      this.formServiceArea.value.estado==true? this.formServiceArea.value.estado=1:this.formServiceArea.value.estado=0;
      if(this.data.option=='new'){
        const request = { id:0 , activo:true , ...this.formServiceArea.value };
        this.configurationAndMaintenanceService.maintenanceServiceArea(request).subscribe(responseApi=>{
          if(responseApi.success){
            this.dialogRef.close(true);
          }else{
            this.openSnackBarWarn(responseApi.message);
          }
        });
      }else{
        const request = { id:this.data.serviceArea.id , activo:true , ...this.formServiceArea.value };
        this.configurationAndMaintenanceService.maintenanceServiceArea(request).subscribe(responseApi=>{
          if(responseApi.success){
            this.dialogRef.close(true);
          }else{
            this.openSnackBarWarn(responseApi.message);
          }
        })
      }
    }else{
      const dialogError = this.matDialog.open(DialogErrorMessageComponent,{
        disableClose:true,
        data: {text:'Rellene todos los campos requeridos'}
      });
    }
  }
  onClose():void{
    this.dialogRef.close(false);
  }

  openSnackBarWarn(message:string):void{
    this.matSnackBar.openFromComponent(SnackBarMessageComponent, {
      data: message,
      duration: 3000,
      horizontalPosition:'center',
      verticalPosition: 'top',
      panelClass:['mat-toolbar', 'mat-primary','button-color']
    });
  }
  
}
