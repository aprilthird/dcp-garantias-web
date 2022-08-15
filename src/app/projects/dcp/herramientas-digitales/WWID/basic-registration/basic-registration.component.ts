import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogMassiveRegistrationSuccessfullyComponent } from 'app/projects/dcp/garantias/dialogs/dialog-massive-registration-successfully/dialog-massive-registration-successfully.component';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { DigitalToolsService } from 'app/shared/services/digital-tools/digital-tools.service';

@Component({
  selector: 'app-basic-registration',
  templateUrl: './basic-registration.component.html',
  styleUrls: ['./basic-registration.component.scss']
})
export class BasicRegistrationComponent implements OnInit {

  action:string;
  localUser:any;
  user:any;
  locationOptions = [];
  selectedLocation:any;

  //formulario
  formWwid:FormGroup;

  constructor(private readonly router:Router, private readonly matDialog: MatDialog,
    private readonly digitalToolsService:DigitalToolsService,
    private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit():void {
    this.action = localStorage.getItem('action');
    this.localUser = JSON.parse(localStorage.getItem('usuario'));
    this.loadUser();
    this.loadLocations();
    if(this.action === 'edit') {
      this.loadFormRegisterWWID();
    } else {
      this.loadEmptyFormRegisterWWID();
    }
  }

  loadUser(): void {
    this.digitalToolsService.userManagementByDocument(this.localUser.dni).subscribe(responseApi => {
      this.user = responseApi.body;
    });
  }

  loadLocations(): void {
    this.configurationAndMaintenanceService.getGenerals(4).subscribe(responseApi => {
      console.log(responseApi);
      this.locationOptions = responseApi.body;
    });
  }

  changeLocation(): void {
    this.selectedLocation = this.locationOptions.find(e => e.id == this.formWwid.value.locacion);
  }

  loadEmptyFormRegisterWWID():void {
    this.formWwid = new FormGroup({
      wwid: new FormControl('', [Validators.required]),
      estadoWwid: new FormControl(null),
      idPromotion: new FormControl('', [Validators.required]),
      estadoIdPromotion: new FormControl(null),
      locacion: new FormControl(null),
    });
  }

  loadFormRegisterWWID():void {
    this.formWwid = new FormGroup({
      wwid: new FormControl(this.localUser.wwid, [Validators.required]),
      estadoWwid: new FormControl(parseInt(this.localUser.estadoWwid)),
      idPromotion: new FormControl(this.localUser.idPromotion, [Validators.required]),
      estadoIdPromotion: new FormControl(parseInt(this.localUser.estadoIdPromotion)),
      locacion: new FormControl(parseInt(this.localUser.locacion)),
    });
  }

  onListUsers():void{
    this.router.navigate(['/digital-tools/users-list']);
  }

  onRegisterWWID():void{
    if(this.formWwid.value.wwid==''){
      const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Ingrese un WWID válido!'},disableClose:true});
    }else{
      if(this.formWwid.value.idPromotion==''){
        const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Ingrese un ID Promotion válido!'},disableClose:true});
      }else{
        if(this.formWwid.value.estadoWwid==''){
          const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Ingrese un Estado de WWID válido!'},disableClose:true});
          if(this.formWwid.value.estadoIdPromotion==''){
            const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Ingrese un Estado de ID Promotion válido!'},disableClose:true});
            if(this.formWwid.value.locacion==''){
              const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Ingrese una Locación válida!'},disableClose:true});
            }else{
              const request = {
                id: this.localUser.id,
                usr: this.user.nombres+' '+this.user.apellidos,
                dni: this.user.dni,
                correo: this.user.correo,
                codigoCuenta: this.selectedLocation.codigoCuenta,
                ...this.formWwid.value
              };
              this.digitalToolsService.toolUserManagement(request).subscribe(responseApi => {
                console.log(responseApi);
                const dialogRegistrarDatosDelUsuario = this.matDialog.open(DialogMassiveRegistrationSuccessfullyComponent,{
                  data:{text:'Se ingresaron los datos del usuario'},
                  disableClose:true, width: '385px',
                })
                dialogRegistrarDatosDelUsuario.afterClosed().subscribe(responseDialog=>{
                  if(responseDialog){
                    this.router.navigate(['/digital-tools/users-list']);
                  }
                });
              });     
            }
          }
        }
      }
    }
  }
}
