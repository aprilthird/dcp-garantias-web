import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';

@Component({
  selector: 'app-dialog-maintenance-client',
  templateUrl: './dialog-maintenance-client.component.html',
  styleUrls: ['./dialog-maintenance-client.component.scss']
})
export class DialogMaintenanceClientComponent implements OnInit {

  formClient:FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceClientComponent>,
              @Inject(MAT_DIALOG_DATA) public data,private readonly matDialog:MatDialog,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.loadFormClient();
  }

  loadFormClient():void{
    if(this.data.option=='new'){
      this.formClient = new FormGroup({
        codigo: new FormControl('',[Validators.required]),
        razonSocial: new FormControl('',[Validators.required]),
        direccion: new FormControl('',[Validators.required]),
        ciudad: new FormControl('',[Validators.required]),
        telefono: new FormControl('',[Validators.required]),
        ruc: new FormControl('',[Validators.required]),
        contacto1: new FormControl('',[Validators.required]),
        cargoContacto1: new FormControl('',[Validators.required]),
        telefono1: new FormControl('',[Validators.required]),
        email1: new FormControl('',[Validators.required]),
        contacto2: new FormControl('',[Validators.required]),
        cargoContacto2: new FormControl('',[Validators.required]),
        telefono2: new FormControl('',[Validators.required]),
        estado: new FormControl(true,[Validators.required])
      })
    }else{
      const estate = this.data.client.estado==1? true:false;
      this.formClient = new FormGroup({
        codigo: new FormControl(this.data.client.codigo,[Validators.required]),
        razonSocial: new FormControl(this.data.client.razonSocial,[Validators.required]),
        direccion: new FormControl(this.data.client.direccion,[Validators.required]),
        ciudad: new FormControl(this.data.client.ciudad,[Validators.required]),
        telefono: new FormControl(this.data.client.telefono,[Validators.required]),
        ruc: new FormControl(this.data.client.ruc,[Validators.required]),
        contacto1: new FormControl(this.data.client.contacto1,[Validators.required]),
        cargoContacto1: new FormControl(this.data.client.cargoContacto1,[Validators.required]),
        telefono1: new FormControl(this.data.client.telefono1,[Validators.required]),
        email1: new FormControl(this.data.client.email1,[Validators.required]),
        contacto2: new FormControl(this.data.client.contacto2,[Validators.required]),
        cargoContacto2: new FormControl(this.data.client.cargoContacto2,[Validators.required]),
        telefono2: new FormControl(this.data.client.telefono2,[Validators.required]),
        estado: new FormControl(estate,[Validators.required])
      })
    }
  }

  onSaveClient():void{
    if(this.formClient.valid){
      this.formClient.value.estado==true? this.formClient.value.estado=1:this.formClient.value.estado=0;
      if(this.data.option=='new'){
        const request = { id:0 , activo:true , ...this.formClient.value };
        this.configurationAndMaintenanceService.maintenanceClients(request).subscribe(resp=>{
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la creacion del cliente de motor')
          }
        });
      }else{
        const request = { id:this.data.client.id , activo:true , ...this.formClient.value };
        this.configurationAndMaintenanceService.maintenanceClients(request).subscribe(resp=>{
          console.log(resp);
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la edicion del cliente de motor')
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
