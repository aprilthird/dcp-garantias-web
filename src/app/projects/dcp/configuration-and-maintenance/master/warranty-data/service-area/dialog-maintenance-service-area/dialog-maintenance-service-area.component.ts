import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
@Component({
  selector: 'app-dialog-maintenance-service-area',
  templateUrl: './dialog-maintenance-service-area.component.html',
  styleUrls: ['./dialog-maintenance-service-area.component.scss']
})
export class DialogMaintenanceServiceAreaComponent implements OnInit {

  formServiceArea:FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceServiceAreaComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.loadFormWarranty();
  }

  loadFormWarranty():void{
    if(this.data.option=='new'){
      this.formServiceArea = new FormGroup({
        codigo: new FormControl('',[Validators.required]),
        descripcion: new FormControl('',[Validators.required]),
        codigoServicioSap: new FormControl('',[Validators.required]),
        codigoConstante: new FormControl('',[Validators.required]),
        bu: new FormControl('',[Validators.required]),
        busub: new FormControl('',[Validators.required]),
        lugar: new FormControl('',[Validators.required]),
        estado: new FormControl(true,[Validators.required])
      })
    }else{
      const estate = this.data.serviceArea.estado==1? true:false;
      this.formServiceArea = new FormGroup({
        codigo: new FormControl(this.data.serviceArea.codigo,[Validators.required]),
        descripcion: new FormControl(this.data.serviceArea.descripcion,[Validators.required]),
        codigoServicioSap: new FormControl(this.data.serviceArea.codigoServicioSap,[Validators.required]),
        codigoConstante: new FormControl(this.data.serviceArea.codigoConstante,[Validators.required]),
        bu: new FormControl(this.data.serviceArea.bu,[Validators.required]),
        busub: new FormControl(this.data.serviceArea.busub,[Validators.required]),
        lugar: new FormControl(this.data.serviceArea.lugar,[Validators.required]),
        estado: new FormControl(estate,[Validators.required])
      })
    }
  }


  onSaveServiceArea():void{
    if(this.formServiceArea.valid){
      this.formServiceArea.value.estado==true? this.formServiceArea.value.estado=1:this.formServiceArea.value.estado=0;
      if(this.data.option=='new'){
        const request = { id:0 , activo:true , ...this.formServiceArea.value };
        this.configurationAndMaintenanceService.maintenanceServiceArea(request).subscribe(resp=>{
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la creacion de la queja');
          }
        });
      }else{
        const request = { id:this.data.serviceArea.id , activo:true , ...this.formServiceArea.value };
        this.configurationAndMaintenanceService.maintenanceServiceArea(request).subscribe(resp=>{
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
