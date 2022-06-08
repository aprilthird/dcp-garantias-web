import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
@Component({
  selector: 'app-dialog-maintenance-parts',
  templateUrl: './dialog-maintenance-parts.component.html',
  styleUrls: ['./dialog-maintenance-parts.component.scss']
})
export class DialogMaintenancePartsComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenancePartsComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private readonly matDialog:MatDialog,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.loadFormNewConstant();
  }

  loadFormNewConstant():void{
    if(this.data.option == 'new'){
        this.formGroup = new FormGroup({
        codigo: new FormControl ('', [Validators.required]),
        tipo: new FormControl('',[Validators.required]),
        precioFob: new FormControl('',[Validators.required]),
        descripcion: new FormControl('',[Validators.required]),
        estado: new FormControl(true, [Validators.required])
      });
    }else{
      const estate = this.data.srt.estado==1? true:false;
      this.formGroup = new FormGroup({
        codigo: new FormControl (this.data.constant.codigo, [Validators.required]),
        tipo: new FormControl(this.data.constant.tipo,[Validators.required]),
        precioFob: new FormControl(this.data.constant.precioFob,[Validators.required]),
        descripcion: new FormControl(this.data.constant.descripcion,[Validators.required]),
        estado: new FormControl (estate, [Validators.required])
      });
    }
  }

  onSavePart():void{
    if(this.formGroup.valid){
      this.formGroup.value.estado==true ? this.formGroup.value.estado=1:this.formGroup.value.estado=0;
      if(this.data.option=='new'){        
        const request = { id:0, activo:true, ...this.formGroup.value }
        this.configurationAndMaintenanceService.maintenanceParts(request).subscribe(resp=>{
          console.log(resp);
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la creacion');
          }
        });
      }else{
        const request = {
                        id:this.data.srt.id,
                        activo:true,
                        ...this.formGroup.value
                      };
        console.log(request);
        this.configurationAndMaintenanceService.maintenanceSrt(request).subscribe(resp=>{
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
        data: {text:'Rellene los campos necesarios'}
      });
    }
  }

  onClose():void{
    this.dialogRef.close(false);
  }

}
