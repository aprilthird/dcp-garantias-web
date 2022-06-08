import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { MasterConstantRequest } from 'app/shared/models/request/master-constant.request';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
@Component({
  selector: 'app-dialog-new-constant',
  templateUrl: './dialog-new-constant.component.html',
  styleUrls: ['./dialog-new-constant.component.scss']
})
export class DialogNewConstantComponent implements OnInit {

  formNewConstant: FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogNewConstantComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private readonly matDialog:MatDialog,
              private readonly configurationAndMaintenanceService: ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.loadFormNewConstant();
    console.log(this.data);
  }

  loadFormNewConstant():void{
    if(this.data.option == 'new'){
        this.formNewConstant = new FormGroup({
        codigo: new FormControl ('', [Validators.required]),
        laborRate: new FormControl('',[Validators.required]),
        kmRate: new FormControl('',[Validators.required]),
        bfcMarkup: new FormControl('',[Validators.required]),
        siteLabor: new FormControl('',[Validators.required]),
        estado: new FormControl(true, [Validators.required])
      });
    }else{
      this.formNewConstant = new FormGroup({
        codigo: new FormControl (this.data.constant.codigo, [Validators.required]),
        laborRate: new FormControl(this.data.constant.laborRate,[Validators.required]),
        kmRate: new FormControl(this.data.constant.kmRate,[Validators.required]),
        bfcMarkup: new FormControl(this.data.constant.bfcMarkup,[Validators.required]),
        siteLabor: new FormControl(this.data.constant.siteLabor,[Validators.required]),
        estado: new FormControl(this.data.constant.activo, [Validators.required])
      });
    }
  }

  onSaveConstant():void{
    if(this.formNewConstant.valid){
      if(this.data.option=='new'){
        const object = MasterConstantRequest.createFormObject(this.formNewConstant.value, 0);
        const request = {activo:true,...object};      
        this.configurationAndMaintenanceService.saveConstant(request).subscribe(resp=>{
          console.log(resp)
            if(resp.success){
              this.dialogRef.close(true);
            }else{
              console.log('Error en la creación de la constante')
            }        
        });
      }else{
        const object = MasterConstantRequest.createFormObject(this.formNewConstant.value, this.data.constant.id );
        const request = {activo:true,...object};
        this.configurationAndMaintenanceService.saveConstant(request).subscribe(resp=>{        
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('Error en la edición de la constante')
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
