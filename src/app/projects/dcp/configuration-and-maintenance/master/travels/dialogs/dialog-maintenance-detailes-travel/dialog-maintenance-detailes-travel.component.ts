import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';

@Component({
  selector: 'app-dialog-maintenance-detailes-travel',
  templateUrl: './dialog-maintenance-detailes-travel.component.html',
  styleUrls: ['./dialog-maintenance-detailes-travel.component.scss']
})
export class DialogMaintenanceDetailesTravelComponent implements OnInit {

  formGroup:FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceDetailesTravelComponent>,
    @Inject(MAT_DIALOG_DATA) public data,private readonly matDialog:MatDialog,
    private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.loadFormEngineModel();
  }

  loadFormEngineModel():void{
    if(this.data.option=='new'){
      this.formGroup = new FormGroup({
        codigo: new FormControl('',[Validators.required]),
        factor: new FormControl('',[Validators.required]),
        descripcion: new FormControl('',[Validators.required]),
        estado: new FormControl(true,[Validators.required])
      })
    }else{
      const estate = this.data.detalleDeViaje.estado==1? true:false;
      this.formGroup = new FormGroup({
        codigo: new FormControl(this.data.detalleDeViaje.codigo,[Validators.required]),
        factor: new FormControl(this.data.detalleDeViaje.factor,[Validators.required]),
        descripcion: new FormControl(this.data.detalleDeViaje.descripcion,[Validators.required]),
        estado: new FormControl(estate,[Validators.required])
      })
    }
  }
  
  onSaveTravelDetail():void{
    if(this.formGroup.valid){
      this.formGroup.value.estado==true? this.formGroup.value.estado=1:this.formGroup.value.estado=0;
      if(this.data.option=='new'){
        const request = { id:0 , activo:true , ...this.formGroup.value };
        this.configurationAndMaintenanceService.maintenanceDetalleViaje(request).subscribe(resp=>{
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la creacion del modelo de motor')
          }
        });
      }else{
        const request = { id:this.data.detalleDeViaje.id , activo:true , ...this.formGroup.value };
        this.configurationAndMaintenanceService.maintenanceDetalleViaje(request).subscribe(resp=>{
          console.log(resp);
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la edicion del modelo de motor')
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

}
