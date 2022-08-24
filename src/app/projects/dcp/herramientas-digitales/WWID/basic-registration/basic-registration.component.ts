import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogMassiveRegistrationSuccessfullyComponent } from 'app/projects/dcp/garantias/dialogs/dialog-massive-registration-successfully/dialog-massive-registration-successfully.component';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { SnackBarMessageComponent } from 'app/shared/dialogs/snack-bar-message/snack-bar-message.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { DigitalToolsService } from 'app/shared/services/digital-tools/digital-tools.service';

@Component({
  selector: 'app-basic-registration',
  templateUrl: './basic-registration.component.html',
  styleUrls: ['./basic-registration.component.scss']
})
export class BasicRegistrationComponent implements OnInit {

  action: string;
  userSelected: any;
  userCummins: any;
  locationOptions = [];
  selectedLocation: any;
  statusOptions = [];
  isSearching = false;
  formWwid: FormGroup;

  constructor(private readonly router: Router, private readonly matDialog: MatDialog,
    private readonly digitalToolsService: DigitalToolsService,
    private readonly configurationAndMaintenanceService: ConfigurationAndMaintenanceService,
    private readonly matSnackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.userSelected = JSON.parse(localStorage.getItem('usuario'));
    this.loadUserCummins();
    this.loadLocations();
    this.loadStatus();
    this.loadFormRegisterWwid(this.userSelected);
  }

  loadUserCummins(): void {
    this.isSearching = true;
    this.digitalToolsService.userManagementByDocument(this.userSelected.dni).subscribe(responseApi => {
      this.isSearching = false;
      this.userCummins = responseApi.body;
    });
  }

  loadLocations(): void {
    this.configurationAndMaintenanceService.getGenerals(4).subscribe(responseApi => {
      this.locationOptions = responseApi.body;
      this.changeLocation();
    });
  }

  loadStatus(): void {
    this.configurationAndMaintenanceService.getGenerals(11).subscribe(responseApi => {
      this.statusOptions = responseApi.body;
    });
  }

  changeLocation(): void {
    if(this.formWwid.value.locacion!=null){
      this.selectedLocation = this.locationOptions.find(e => e.id == this.formWwid.value.locacion);
    }
  }

  loadFormRegisterWwid(userSelected:any){
    this.formWwid = new FormGroup({
      wwid: new FormControl(userSelected.wwid==null?'':userSelected.wwid),
      estadoWwid: new FormControl(userSelected.idWwid==0?null:userSelected.idWwid),
      idPromotion: new FormControl(userSelected.idPromotion==null?'':userSelected.idPromotion),
      estadoIdPromotion: new FormControl(userSelected.estadoIdPromotion==null?null:parseInt(userSelected.estadoIdPromotion)),
      locacion: new FormControl(userSelected.locacion==null?null:parseInt(userSelected.locacion)),
    });
  } 

  onListUsers(): void {
    this.router.navigate(['/digital-tools/users-list']);
  }

  onRegisterWWID(): void {
    console.log(this.formWwid.value);

    if(!(this.formWwid.value.wwid=='')){
      if(!(this.formWwid.value.estadoWwid==null)){
        if(!(this.formWwid.value.idPromotion=='')){
          if(!(this.formWwid.value.estadoIdPromotion==null)){
            if(!(this.formWwid.value.locacion==null)){
                const request = {
                  id: this.userSelected.id,
                  usr: this.userCummins.nombres + ' ' + this.userCummins.apellidos,
                  dni: this.userCummins.dni,
                  correo: this.userCummins.correo,
                  codigoCuenta:  this.selectedLocation.codigoCuenta,
                  ...this.formWwid.value
                };
                this.digitalToolsService.toolUserManagement(request).subscribe(responseApi => {
                  console.log(responseApi);
                  const dialogRegistrarDatosDelUsuario = this.matDialog.open(DialogMassiveRegistrationSuccessfullyComponent, {
                    data: { text: 'Se ingresaron los datos del usuario' },
                    disableClose: true, width: '385px',
                  })
                  dialogRegistrarDatosDelUsuario.afterClosed().subscribe(responseDialog => {
                    if (responseDialog) {
                      this.router.navigate(['/digital-tools/users-list']);
                    }
                  });
                });
            }else{
              this.openSnackBarWarn('Seleccionar una locación')
            }
          }else{
            this.openSnackBarWarn('Seleccionar un estado del Id Promotion')
          }
        }else{
          this.openSnackBarWarn('Ingresar Id Promotion')
        }
      }else{
        this.openSnackBarWarn('Seleccionar un estado del WWID')
      }
    }else{
      this.openSnackBarWarn('Ingresar WWID');
    }
  }
  
  openSnackBarWarn(message:string):void{
    this.matSnackBar.openFromComponent(SnackBarMessageComponent, {
      data: message,
      duration: 3000,
      horizontalPosition:'center',
      verticalPosition: 'top',
      panelClass:['mat-toolbar', 'mat-primary','button-color']
    });
  }
}
