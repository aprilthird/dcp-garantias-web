import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';

@Component({
  selector: 'app-dialog-maintenance-failures',
  templateUrl: './dialog-maintenance-failures.component.html',
  styleUrls: ['./dialog-maintenance-failures.component.scss']
})
export class DialogMaintenanceFailuresComponent implements OnInit {

  formFailure: FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceFailuresComponent>,
    @Inject(MAT_DIALOG_DATA) public data,private readonly matDialog:MatDialog,
    private readonly configurationAndMaintenanceService: ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.onLoadFormSrt();
  }

  onLoadFormSrt():void{
    if(this.data.option=='new'){
      this.formFailure = new FormGroup ({
        tipo : new FormControl ([Validators.required]),        
        grupoMayor : new FormControl ('',[Validators.required]),
        grupoMayorDescripcion : new FormControl ('',[Validators.required]),
        parteFallada : new FormControl ('',[Validators.required]),
        parteFalladaDescripcion : new FormControl ('',[Validators.required]),
        tipoFalla : new FormControl ('',[Validators.required]),
        tipoFallaDescripcion: new FormControl('',[Validators.required]),
        estado: new FormControl (true, [Validators.required])
      });
    }else{
        const _estado = this.data.falla.estado==1? true:false;
        this.formFailure = new FormGroup ({
          tipo : new FormControl (this.data.falla.tipo, [Validators.required]),        
          grupoMayor : new FormControl (this.data.falla.grupoMayor, [Validators.required]),
          grupoMayorDescripcion : new FormControl (this.data.falla.grupoMayorDescripcion, [Validators.required]),
          parteFallada : new FormControl (this.data.falla.parteFallada, [Validators.required]),
          parteFalladaDescripcion : new FormControl (this.data.falla.parteFalladaDescripcion, [Validators.required]),
          tipoFalla : new FormControl (this.data.falla.tipoFalla, [Validators.required]),
          tipoFallaDescripcion: new FormControl(this.data.falla.tipoFallaDescripcion, [Validators.required]),
          estado: new FormControl (_estado, [Validators.required])
        });
    }
  }
  
  onSaveFailure():void{
    if(this.formFailure.valid){
      this.formFailure.value.estado==true ? this.formFailure.value.estado=1:this.formFailure.value.estado=0;
      if(this.data.option=='new'){        
        const request = { id:0, activo:true, ...this.formFailure.value }
        this.configurationAndMaintenanceService.mantenimientoFallas(request).subscribe(resp=>{
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la creacion del SRT');
          }
        });
      }else{
        const request = { id:this.data.falla.id, activo:true, ...this.formFailure.value };
        this.configurationAndMaintenanceService.mantenimientoFallas(request).subscribe(resp=>{
          console.log(resp);
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la creacion del SRT');
          }
        });
      }
    }else{
      const dialogError = this.matDialog.open(DialogErrorMessageComponent,{
        disableClose:true,
        data: {text:'Rellene todos los campos requeridos de la constante'}
      });
    }
  }
  onClose():void{
    this.dialogRef.close(false);
  }

}

