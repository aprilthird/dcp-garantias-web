import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
@Component({
  selector: 'app-dialog-maintenance-engine-model',
  templateUrl: './dialog-maintenance-engine-model.component.html',
  styleUrls: ['./dialog-maintenance-engine-model.component.scss']
})
export class DialogMaintenanceEngineModelComponent implements OnInit {

  formEngineModel:FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceEngineModelComponent>,
              @Inject(MAT_DIALOG_DATA) public data,private readonly matDialog:MatDialog,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.loadFormEngineModel();
  }

  loadFormEngineModel():void{
    if(this.data.option=='new'){
      this.formEngineModel = new FormGroup({
        codigo: new FormControl('',[Validators.required]),
        descripcion: new FormControl('',[Validators.required]),
        estado: new FormControl(true,[Validators.required])
      })
    }else{
      const estate = this.data.model.estado==1? true:false;
      this.formEngineModel = new FormGroup({
        codigo: new FormControl(this.data.model.codigo,[Validators.required]),
        descripcion: new FormControl(this.data.model.descripcion,[Validators.required]),
        estado: new FormControl(estate,[Validators.required])
      })
    }
  }
  
  onSaveEngineModel():void{
    if(this.formEngineModel.valid){
      this.formEngineModel.value.estado==true? this.formEngineModel.value.estado=1:this.formEngineModel.value.estado=0;
      if(this.data.option=='new'){
        const request = { id:0 , activo:true , ...this.formEngineModel.value };
        this.configurationAndMaintenanceService.maintenanceEngineModels(request).subscribe(resp=>{
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la creacion del modelo de motor')
          }
        });
      }else{
        const request = { id:this.data.model.id , activo:true , ...this.formEngineModel.value };
        this.configurationAndMaintenanceService.maintenanceEngineModels(request).subscribe(resp=>{
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
