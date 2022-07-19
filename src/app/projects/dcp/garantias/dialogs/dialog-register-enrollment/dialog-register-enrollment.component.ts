import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { MatDialog } from '@angular/material/dialog';
import { messages } from 'app/mock-api/apps/chat/data';
@Component({
  selector: 'app-dialog-register-enrollment',
  templateUrl: './dialog-register-enrollment.component.html',
  styleUrls: ['./dialog-register-enrollment.component.scss']
})
export class DialogRegisterEnrollmentComponent implements OnInit {

  engineModels=[];
  engineApplications=[];
  clients = []; clienteEncontrado:any;
  directionClient:string='';
  formEnrollment:FormGroup;
  tipoDeEquipo:number;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private readonly dialogRef: MatDialogRef<DialogRegisterEnrollmentComponent>,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService,
              private readonly matDialog: MatDialog) {
   }

  ngOnInit(): void {
    console.log(this.data);
    this.tipoDeEquipo = this.data.type=='motor'?1:2;
    this.loadFormClient();
    this.configurationAndMaintenanceService.listEngineModels(1).subscribe(resp=>{
      this.engineModels = resp.data;
      console.log(this.engineModels);
    });
    this.configurationAndMaintenanceService.listEngineApplications(1).subscribe(resp=>{
      this.engineApplications = resp.data;
    });
  }

  loadFormClient():void{
    if(this.data.option=='new'){
      this.formEnrollment = new FormGroup({
        razonSocial: new FormControl('',[Validators.required]),
        esn: new FormControl('',[Validators.required]),
        idModelo: new FormControl('',[Validators.required]),
        idAplicacion: new FormControl('',[Validators.required]),
        cpl: new FormControl('',[Validators.required]),
        bis: new FormControl(false,[Validators.required]),
        fechaInicioGarantia: new FormControl(),
        potencia: new FormControl(''),
        lugar: new FormControl(''),
        canal: new FormControl(),
        clienteFinal: new FormControl(''),
        equipo: new FormControl(''),
        altura: new FormControl(''),
        etoPto: new FormControl('')
      })
    }else{
      this.formEnrollment = new FormGroup({
        razonSocial: new FormControl('',[Validators.required]),
        esn: new FormControl('',[Validators.required]),
        idModelo: new FormControl('',[Validators.required]),
        idAplicacion: new FormControl('',[Validators.required]),
        cpl: new FormControl('',[Validators.required]),
        bis: new FormControl(false,[Validators.required]),
        fechaInicioGarantia: new FormControl([Validators.required]),
        potencia: new FormControl('',[Validators.required]),
        lugar: new FormControl('',[Validators.required]),
        canal: new FormControl([Validators.required]),
        clienteFinal: new FormControl('',[Validators.required]),
        equipo: new FormControl('',[Validators.required]),
        altura: new FormControl('',[Validators.required]),
        etoPto: new FormControl('',[Validators.required]),
      })
    }
  }

  onSaveEnrollment():void{
    if(this.formEnrollment.valid){
      if(this.data.option=='new'){
        if(this.clienteEncontrado==null){
          this.errorMessage('Ingrese un cliente válido');
        }else{
          const request = { id:0 , tipo:this.tipoDeEquipo, activo:true, codigoSap:this.clienteEncontrado.codigoSap,
                          direccion:this.clienteEncontrado.direccion, ...this.formEnrollment.value };
          this.configurationAndMaintenanceService.maintenanceEnrollment(request).subscribe(resp=>{
            if(resp.success){
              this.dialogRef.close(true);
            }else{
              this.errorMessage('Error del servicio en la creacion de la matricula');
            }
          });
        }
      }else{
        const request = { id:this.data.client.id , activo:true , ...this.formEnrollment.value };
        this.configurationAndMaintenanceService.maintenanceClients(request).subscribe(resp=>{
          console.log(resp);
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            this.errorMessage('Error del servicio en la edicion de la matricula');
          }
        })
      }
    }else{
      this.errorMessage('Ingrese todos los campos necesarios');
    }
  }

  setDirectionClient():void{
    let element = this.clients.find(e => e.id == this.formEnrollment.value.idCliente);
    this.directionClient = element.direccion;
  }
  onClose():void{
    this.dialogRef.close(false);
  }

  
  buscarCliente():void{
    if(this.formEnrollment.value.razonSocial.length>2){
      this.configurationAndMaintenanceService.searchClienteByName(this.formEnrollment.value.razonSocial).subscribe(responseApi=>{
        this.clients = responseApi.body;
      });
    }else{
      this.clients = [];
      this.errorMessage('Ingrese mínimo 3 caracteres');
    }
  }

  seleccionarCliente(clienteSeleccionado:any):void{
    this.configurationAndMaintenanceService.searchClienteByCode(clienteSeleccionado.codigoSap).subscribe(responseApi=>{
      this.clienteEncontrado = responseApi.body;
    });
    
  }

  errorMessage(message:string):void{
    const dialogError = this.matDialog.open(DialogErrorMessageComponent,{
      disableClose:true, data:{text:message}, width:'350px'
  });
  }
}
