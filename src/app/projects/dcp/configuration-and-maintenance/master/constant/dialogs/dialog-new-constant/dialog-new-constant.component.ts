import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { MasterConstantRequest } from 'app/shared/models/request/master-constant.request';

@Component({
  selector: 'app-dialog-new-constant',
  templateUrl: './dialog-new-constant.component.html',
  styleUrls: ['./dialog-new-constant.component.scss']
})
export class DialogNewConstantComponent implements OnInit {

  formNewConstant: FormGroup;
  disabledInputCode:boolean;

  constructor(private readonly dialogRef: MatDialogRef<DialogNewConstantComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private readonly configurationAndMaintenanceService: ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.loadFormNewConstant();
  }

  loadFormNewConstant():void{
    this.formNewConstant = new FormGroup({
      codigo: new FormControl ('', [Validators.required]),
      laborRate: new FormControl('',[Validators.required]),
      kmRate: new FormControl('',[Validators.required]),
      bfcMarkup: new FormControl('',[Validators.required]),
      siteLabor: new FormControl('',[Validators.required]),
      activo: new FormControl(false, [Validators.required])
    });
  }

  onSaveNewConstant():void{
    if(this.formNewConstant.valid){
      if(this.data.option=='new'){
        const request = MasterConstantRequest.createFormObject(this.formNewConstant.value, 0);
        this.configurationAndMaintenanceService.saveConstant(request).subscribe(resp=>{
            if(resp.success){
              this.dialogRef.close(true);
            }else{
              console.log('Error en la creación de la constante')
            }        
        });
      }else{

      }
    }else{
      console.log('error');
    }
  }

}
