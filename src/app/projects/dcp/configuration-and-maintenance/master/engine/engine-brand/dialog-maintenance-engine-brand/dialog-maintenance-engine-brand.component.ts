import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
@Component({
  selector: 'app-dialog-maintenance-engine-brand',
  templateUrl: './dialog-maintenance-engine-brand.component.html',
  styleUrls: ['./dialog-maintenance-engine-brand.component.scss']
})
export class DialogMaintenanceEngineBrandComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceEngineBrandComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private readonly matDialog:MatDialog,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm():void{
    if(this.data.option=='new'){
      this.formGroup = new FormGroup({
        codigo: new FormControl('',[Validators.required]),
        descripcion: new FormControl('',[Validators.required]),
        estado: new FormControl(true,[Validators.required])
      })
    }else{
      const estate = this.data.marca.estado==1? true:false;
      this.formGroup = new FormGroup({
        codigo: new FormControl(this.data.marca.codigo,[Validators.required]),
        descripcion: new FormControl(this.data.marca.descripcion,[Validators.required]),
        estado: new FormControl(estate,[Validators.required])
      })
    }
  }
  onSaveEngineBrand():void{
    if(this.formGroup.valid){
      this.formGroup.value.estado==true? this.formGroup.value.estado=1:this.formGroup.value.estado=0;
      if(this.data.option=='new'){
        const request = { id:0 , activo:true , ...this.formGroup.value };
        this.configurationAndMaintenanceService.mantenimientoMarcaMotor(request).subscribe(resp=>{
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la creacion del modelo de motor')
          }
        });
      }else{
        const request = { id:this.data.marca.id , activo:true , ...this.formGroup.value };
        this.configurationAndMaintenanceService.mantenimientoMarcaMotor(request).subscribe(resp=>{
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
