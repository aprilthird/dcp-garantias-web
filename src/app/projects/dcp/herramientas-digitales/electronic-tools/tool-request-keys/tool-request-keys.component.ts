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
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-tool-request-keys',
  templateUrl: './tool-request-keys.component.html',
  styleUrls: ['./tool-request-keys.component.scss']
})
export class ToolRequestKeysComponent implements OnInit {

  formRequest:FormGroup;

  displayedColumns: string[] = ['tipo', 'cantidad', 'keyFuncional', 'keyBasico', 'keyDeActivacion'];

  localRequest:any;
  user:any;
  action:string;

  users = [];
  isSearching = false;

  dataSource = [{tipo:'Inside', cantidad:1, keyFuncional:null, keyBasico:null, keyDeActivacion:null },
                {tipo:'Inpower', cantidad:1, keyFuncional:null, keyBasico:null, keyDeActivacion:null},
                {tipo:'Calibrations', cantidad:0, keyFuncional:null, keyBasico:null, keyDeActivacion:null},
                {tipo:'Zap - Its', cantidad:0, keyFuncional:null, keyBasico:null, keyDeActivacion:null}];

  constructor(private readonly router:Router, private readonly matDialog:MatDialog, private readonly matSnackBar: MatSnackBar,
    private readonly digitalToolsService:DigitalToolsService, 
    private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.action = localStorage.getItem('action');
    if(this.action === 'edit') {
      let localRequestStr = localStorage.getItem('usuario');
      if(localRequestStr !== null && localRequestStr !== "") {
        this.localRequest = JSON.parse(localRequestStr);
      }
      this.loadFormRequest();
      this.searchUsers();

      let localLic = localStorage.getItem("datasrclic" + this.localRequest.dni);
      if(localLic !== null && localLic !== "") {
        this.dataSource = JSON.parse(localLic);
      }
    } else {
      this.loadEmptyFormRequest();
    }
  }

  ngAfterViewInit():void {
    const searchInput = document.getElementById("userSearch");
    fromEvent(searchInput, "keyup").pipe(debounceTime(1000)).subscribe(value => {
      this.searchUsers();
    });
  }

  loadEmptyFormRequest():void {
    this.formRequest = new FormGroup({
      os: new FormControl('', [Validators.required]),
      pcid: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      modelo: new FormControl('', [Validators.required]),
      serie: new FormControl('', [Validators.required]),
      usr: new FormControl('', [Validators.required]),
    });
  }

  loadFormRequest():void {
    this.formRequest = new FormGroup({
      os: new FormControl(this.localRequest.os, [Validators.required]),
      pcid: new FormControl({value: this.localRequest.pcid, disabled: true}, [Validators.required]),
      marca: new FormControl({value: this.localRequest.marca, disabled: true}, [Validators.required]),
      modelo: new FormControl({value: this.localRequest.modelo, disabled: true}, [Validators.required]),
      serie: new FormControl({value: this.localRequest.serie, disabled: true}, [Validators.required]),
      usr: new FormControl({value: this.localRequest.usr, disabled: true}, [Validators.required]),
    });
  }

  searchUsers():void {
    this.users = [];
    if(this.formRequest.value.usr != null) {
      if(this.formRequest.value.usr.length>2){
        this.isSearching = true;
        this.digitalToolsService.userManagementByUsername(this.formRequest.value.usr).subscribe(responseApi=>{
          this.isSearching = false;
          if(responseApi.body) {
            if(responseApi.body.length > 0) {
              for(var i=0; i<responseApi.body.length; ++i) {
                this.users.push(responseApi.body[i]);
              }
            } else {
              this.showSnackBar('No se encontraron coincidencias');
            }
          } else {
            this.showSnackBar('No se encontraron coincidencias');
          }
        });
      }
    }
  }

  selectUser(user:any):void {
    this.user = user;
  }

  onListElectronicTools():void{
    this.router.navigate(['/digital-tools/electronic-tools']);
  }

  onRegisterRequest():void{
    if(this.formRequest.value.os==''){
      const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Ingrese un OS válido!'},disableClose:true});
    }else{
      if(this.formRequest.value.pcid==''){
        const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Ingrese un PCID válido!'},disableClose:true});
      }else{
        if(this.formRequest.value.marca==''){
          const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Ingrese una Marca válida!'},disableClose:true});
        }else{
          if(this.formRequest.value.modelo==''){
            const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Ingrese un Modelo válido!'},disableClose:true});
          }else{    
            if(this.formRequest.value.serie==''){
              const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Ingrese una Serie válida!'},disableClose:true});
            }else{      
              if(this.formRequest.value.usr==''){
                const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Ingrese un Usuario válido!'},disableClose:true});
              }else{
                const request = {
                  dni: this.user.dni,
                  usr: this.user.usr,
                  area: this.user.bu,
                  correo: this.user.correoJefe,
                  jefe: this.user.jefe,
                  ceco: this.user.centroCosto,
                  licencias: this.dataSource,
                  ...this.formRequest.value
                };
                if(this.action === 'edit') {
                  request.id = this.localRequest.id;
                }
                this.digitalToolsService.toolManagement(request).subscribe(responseApi=>{
                  const dialogRegistrarDatosDelUsuario = this.matDialog.open(DialogMassiveRegistrationSuccessfullyComponent,{
                    data:{text:'Se envió el registro con éxito'},
                    disableClose:true, width: '385px',
                  })
                  dialogRegistrarDatosDelUsuario.afterClosed().subscribe(responseDialog=>{
                    if(responseDialog){
                      this.router.navigate(['/digital-tools/electronic-tools']);
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

  showSnackBar(message:string):void{
    this.matSnackBar.openFromComponent(SnackBarMessageComponent, {
      data: message,
      duration: 3000,
      horizontalPosition:'center',
      verticalPosition: 'top',
      panelClass:['mat-toolbar', 'mat-primary','button-color']
    });
  }
}