import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';

@Component({
  selector: 'app-dialog-maintenance-type-of-warranty',
  templateUrl: './dialog-maintenance-type-of-warranty.component.html',
  styleUrls: ['./dialog-maintenance-type-of-warranty.component.scss']
})
export class DialogMaintenanceTypeOfWarrantyComponent implements OnInit {

  formWarrantyType:FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceTypeOfWarrantyComponent>,
              @Inject(MAT_DIALOG_DATA) public data,private readonly matDialog:MatDialog,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.loadFormWarrantyType();
  }

  loadFormWarrantyType():void{
    if(this.data.option=='new'){
      this.formWarrantyType = new FormGroup({
        codigo: new FormControl('',[Validators.required]),
        descripcion: new FormControl('',[Validators.required]),
        estado: new FormControl(true,[Validators.required])
      })
    }else{
      const estate = this.data.warrantyType.estado==1? true:false;
      this.formWarrantyType = new FormGroup({
        codigo: new FormControl(this.data.warrantyType.codigo,[Validators.required]),
        descripcion: new FormControl(this.data.warrantyType.descripcion,[Validators.required]),
        estado: new FormControl(estate,[Validators.required])
      })
    }
  }

  onSaveTypeWarranty():void{
    if(this.formWarrantyType.valid){
      this.formWarrantyType.value.estado==true? this.formWarrantyType.value.estado=1:this.formWarrantyType.value.estado=0;
      if(this.data.option=='new'){
        const request = { id:0 , activo:true , ...this.formWarrantyType.value };
        this.configurationAndMaintenanceService.maintenanceWarrantyTypes(request).subscribe(resp=>{
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la creacion de la aplicacion de motor')
          }
        });
      }else{
        const request = { id:this.data.warrantyType.id , activo:true , ...this.formWarrantyType.value };
        this.configurationAndMaintenanceService.maintenanceWarrantyTypes(request).subscribe(resp=>{
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
        data: {text:'Rellene todos los campos requeridos de la constante'}
      });
    }
  }
  onClose():void{
    this.dialogRef.close(false);
  }

}
