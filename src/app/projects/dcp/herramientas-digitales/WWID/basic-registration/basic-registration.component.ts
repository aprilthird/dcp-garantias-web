import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogMassiveRegistrationSuccessfullyComponent } from 'app/projects/dcp/garantias/dialogs/dialog-massive-registration-successfully/dialog-massive-registration-successfully.component';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
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

  //formulario
  formWwid:FormGroup;

  constructor(private readonly router:Router, private readonly matDialog: MatDialog,
    private readonly digitalToolsService:DigitalToolsService) { }

  ngOnInit():void {
    this.action = localStorage.getItem('action');
    this.localUser = JSON.parse(localStorage.getItem('usuario'));
    this.loadUser();
    if(this.action === 'edit') {
      this.loadFormRegisterWWID();
    } else {
      this.loadEmptyFormRegisterWWID();
    }
  }

  loadUser(): void {
    this.digitalToolsService.userManagement(this.localUser.dni).subscribe(responseApi => {
      this.user = responseApi.body;
    });
  }

  loadEmptyFormRegisterWWID():void {
    this.formWwid = new FormGroup({
      wwid: new FormControl('', [Validators.required]),
      estadoWwid: new FormControl(null),
      idPromotion: new FormControl('', [Validators.required]),
      estadoIdPromotion: new FormControl(null),
      locacion: new FormControl(null),
      codigoCuenta: new FormControl('', [Validators.required]),
    });
  }

  loadFormRegisterWWID():void {
    this.formWwid = new FormGroup({
      wwid: new FormControl(this.localUser.wwid, [Validators.required]),
      estadoWwid: new FormControl(parseInt(this.localUser.estadoWwid)),
      idPromotion: new FormControl(this.localUser.idPromotion, [Validators.required]),
      estadoIdPromotion: new FormControl(parseInt(this.localUser.estadoIdPromotion)),
      locacion: new FormControl(parseInt(this.localUser.locacion)),
      codigoCuenta: new FormControl(this.localUser.codigoCuenta, [Validators.required]),
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
        if(this.formWwid.value.codigoCuenta==''){
          const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Ingrese un Código de Cuenta válido!'},disableClose:true});
        }else{
          const request = {
            id: this.localUser.id,
            usr: this.user.nombres+' '+this.user.apellidos,
            dni: this.user.dni,
            correo: this.user.correo,
            ...this.formWwid.value
          };
          this.digitalToolsService.toolUserManagement(request).subscribe(responseApi => {
            // localStorage.setItem("wwid_" + this.user.dni, this.formWwid.value.wwid);
            // localStorage.setItem("cc_" + this.user.dni, this.formWwid.value.codigoCuenta);
            // localStorage.setItem("loc_" + this.user.dni, this.formWwid.value.locacion);

            // let tmp = localStorage.getItem("datasrcwwid");
            // if(tmp !== null && tmp !== "") {
            //   let dataSource = JSON.parse(tmp);
            //   let findIndex = dataSource.findIndex(i => i.dni == this.user.dni);
            //   dataSource[findIndex].wwid = this.formWwid.value.wwid;
            //   dataSource[findIndex].idPromotion = this.formWwid.value.idPromotion;
            //   dataSource[findIndex].estadoIdPromotion = this.formWwid.value.estadoIdPromotion;
            //   dataSource[findIndex].estadoWwid = this.formWwid.value.estadoWwid;
            //   localStorage.setItem("datasrcwwid", JSON.stringify(dataSource));
            // }

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
