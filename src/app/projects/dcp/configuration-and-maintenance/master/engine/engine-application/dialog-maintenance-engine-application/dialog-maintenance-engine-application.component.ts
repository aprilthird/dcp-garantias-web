import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
@Component({
  selector: 'app-dialog-maintenance-engine-application',
  templateUrl: './dialog-maintenance-engine-application.component.html',
  styleUrls: ['./dialog-maintenance-engine-application.component.scss']
})
export class DialogMaintenanceEngineApplicationComponent implements OnInit {

  formEngineApplication:FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceEngineApplicationComponent>,
               @Inject(MAT_DIALOG_DATA) public data,private readonly matDialog:MatDialog,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.loadFormEngineModel();
  }

  loadFormEngineModel():void{
    if(this.data.option=='new'){
      this.formEngineApplication = new FormGroup({
        codigo: new FormControl('',[Validators.required]),
        descripcion: new FormControl('',[Validators.required]),
        estado: new FormControl(true,[Validators.required])
      })
    }else{
      const estate = this.data.application.estado==1? true:false;
      this.formEngineApplication = new FormGroup({
        codigo: new FormControl(this.data.application.codigo,[Validators.required]),
        descripcion: new FormControl(this.data.application.descripcion,[Validators.required]),
        estado: new FormControl(estate,[Validators.required])
      })
    }
  }

  onSaveEngineApplication():void{
    if(this.formEngineApplication.valid){
      this.formEngineApplication.value.estado==true? this.formEngineApplication.value.estado=1:this.formEngineApplication.value.estado=0;
      if(this.data.option=='new'){
        const request = { id:0 , activo:true , ...this.formEngineApplication.value };
        this.configurationAndMaintenanceService.maintenanceEngineApplications(request).subscribe(resp=>{
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la creacion de la aplicacion de motor')
          }
        });
      }else{
        const request = { id:this.data.application.id , activo:true , ...this.formEngineApplication.value };
        this.configurationAndMaintenanceService.maintenanceEngineApplications(request).subscribe(resp=>{
          console.log(resp);
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la edicion de la aplicacione de motor')
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
