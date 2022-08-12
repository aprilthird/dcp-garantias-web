import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogMassiveRegistrationSuccessfullyComponent } from 'app/projects/dcp/garantias/dialogs/dialog-massive-registration-successfully/dialog-massive-registration-successfully.component';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { DigitalToolsService } from 'app/shared/services/digital-tools/digital-tools.service';

@Component({
  selector: 'app-tool-request',
  templateUrl: './tool-request.component.html',
  styleUrls: ['./tool-request.component.scss']
})
export class ToolRequestComponent implements OnInit {

  formRequest:FormGroup;

  displayedColumns: string[] = ['tipo', 'cantidad'];

  localUser:any;
  user:any;
  action:string;

  dataSource = [{tipo:'Inside', cantidad:1},
                {tipo:'Inpower', cantidad:1},
                {tipo:'Calibrations', cantidad:0},
                {tipo:'Zap - Its', cantidad:0}];

  constructor(private readonly router:Router, private readonly matDialog:MatDialog,
    private readonly digitalToolsService:DigitalToolsService) { }

  ngOnInit(): void {
    this.action = localStorage.getItem('action');
    if(this.action === 'edit') {
      let localUserStr = localStorage.getItem('usuario');
      if(localUserStr !== null && localUserStr !== "") {
        this.localUser = JSON.parse(localUserStr);
      }
      this.loadFormRequest();
      this.searchUser();

      let localLic = localStorage.getItem("datasrclic" + this.localUser.dni);
      if(localLic !== null && localLic !== "") {
        this.dataSource = JSON.parse(localLic);
      }
    } else {
      this.loadEmptyFormRequest();
    }
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
      os: new FormControl(this.localUser.os, [Validators.required]),
      pcid: new FormControl(this.localUser.pcid, [Validators.required]),
      marca: new FormControl(this.localUser.marca, [Validators.required]),
      modelo: new FormControl(this.localUser.modelo, [Validators.required]),
      serie: new FormControl(this.localUser.serie, [Validators.required]),
      usr: new FormControl(this.localUser.usr, [Validators.required]),
    });
  }

  searchUser():void {
    this.digitalToolsService.searchUserByUsername(this.formRequest.value.usr).subscribe(responseApi=>{
      if(responseApi.body.data.length > 0) {
        this.user = responseApi.body.data[0];
        console.log(this.user);
      }
    });
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
                  area: this.user.area,
                  correo: this.user.correo,
                  jefe: this.user.jefe,
                  ceco: this.user.centroCosto,
                  licencias: this.dataSource,
                  ...this.formRequest.value
                };
                this.digitalToolsService.toolManagement(request).subscribe(responseApi=>{
                  // localStorage.setItem("os_" + this.user.nombres, this.formRequest.value.os);
                  // localStorage.setItem("pcid_" + this.user.nombres, this.formRequest.value.pcid);
                  // localStorage.setItem("marca_" + this.user.nombres, this.formRequest.value.marca);
                  // localStorage.setItem("modelo_" + this.user.nombres, this.formRequest.value.modelo);
                  // localStorage.setItem("serie_" + this.user.nombres, this.formRequest.value.serie);

                  // localStorage.setItem("area_" + this.user.nombres, this.user.area);
                  // localStorage.setItem("jefe_" + this.localUser.nombres, this.user.jefe);
                  // localStorage.setItem("cantidad_" + this.user.nombres, "2");
                  // localStorage.setItem("fechaDeSolicitud_" + this.user.nombres, (new Date()).toDateString());

                  // let tmp = localStorage.getItem("datasrcwwid");
                  // if(tmp !== null && tmp !== "") {
                  //   let dataSource = JSON.parse(tmp);
                  //   let findIndex = dataSource.findIndex(i => i.dni == this.user.dni);
                  //   dataSource[findIndex].os = this.formRequest.value.os;
                  //   dataSource[findIndex].pcid = this.formRequest.value.pcid;
                  //   dataSource[findIndex].marca = this.formRequest.value.marca;
                  //   dataSource[findIndex].modelo = this.formRequest.value.modelo;
                  //   dataSource[findIndex].serie = this.formRequest.value.serie;
                  //   dataSource[findIndex].jefe = this.user.jefe;
                  //   dataSource[findIndex].cantidad = 0;
                  //   dataSource[findIndex].fechaDeSolicitud = new Date();
                  //   localStorage.setItem("datasrcwwid", JSON.stringify(dataSource));

                  //   localStorage.setItem("datasrclic" + this.formRequest.value.dni, JSON.stringify(this.dataSource));
                  // }
                  // console.log(responseApi);

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

}