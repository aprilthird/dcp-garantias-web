import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';

@Component({
  selector: 'app-dialog-maintenance-complaints',
  templateUrl: './dialog-maintenance-complaints.component.html',
  styleUrls: ['./dialog-maintenance-complaints.component.scss']
})
export class DialogMaintenanceComplaintsComponent implements OnInit {

  formWarranty:FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceComplaintsComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.loadFormWarranty();

  }

  loadFormWarranty():void{
    if(this.data.option=='new'){
      this.formWarranty = new FormGroup({
        codigo: new FormControl('',[Validators.required]),
        descripcion: new FormControl('',[Validators.required]),
        descripcionComplaint: new FormControl('',[Validators.required]),
        estado: new FormControl(true,[Validators.required])
      })
    }else{
      const estate = this.data.complaint.estado==1? true:false;
      this.formWarranty = new FormGroup({
        codigo: new FormControl(this.data.complaint.codigo,[Validators.required]),
        descripcion: new FormControl(this.data.complaint.descripcion,[Validators.required]),
        descripcionComplaint: new FormControl(this.data.complaint.descripcionComplaint,[Validators.required]),
        estado: new FormControl(estate,[Validators.required])
      })
    }
  }

  onSaveComplaint():void{
    if(this.formWarranty.valid){
      this.formWarranty.value.estado==true? this.formWarranty.value.estado=1:this.formWarranty.value.estado=0;
      if(this.data.option=='new'){
        const request = { id:0 , activo:true , ...this.formWarranty.value };
        this.configurationAndMaintenanceService.maintenanceComplaints(request).subscribe(resp=>{
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la creacion de la queja')
          }
        });
      }else{
        const request = { id:this.data.complaint.id , activo:true , ...this.formWarranty.value };
        this.configurationAndMaintenanceService.maintenanceComplaints(request).subscribe(resp=>{
          console.log(resp);
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la edicion de la queja')
          }
        })
      }
    }else{
      console.log('Ingrese todos los datos');
    }
  }
  
  onClose():void{
    this.dialogRef.close(false);
  }

}
