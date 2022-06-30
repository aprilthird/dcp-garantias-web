import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GarantiasService } from 'app/shared/services/garantias/garantias.service';
import { DialogAdjuntarDocumentoComponent } from '../../garantias/dialogs/dialog-adjuntar-documento/dialog-adjuntar-documento.component';
import { DialogRegisterEnrollmentComponent } from '../../garantias/dialogs/dialog-register-enrollment/dialog-register-enrollment.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { UserService } from "app/core/user/user.service";
import { FallasService } from 'app/shared/services/gestion-fallas/fallas.service';
import { DialogDraftSavedSuccessfullyComponent } from '../../garantias/dialogs/dialog-draft-saved-successfully/dialog-draft-saved-successfully.component';
import { DialogAsignacionDeLaFallaComponent } from '../dialogs/dialog-asignacion-de-la-falla/dialog-asignacion-de-la-falla.component';
import { DialogObservationComponent } from 'app/shared/dialogs/dialog-observation/dialog-observation.component';
import { DialogCerrarFallaComponent } from '../dialogs/dialog-cerrar-falla/dialog-cerrar-falla.component';

@Component({
  selector: 'app-registro-de-falla',
  templateUrl: './registro-de-falla.component.html',
  styleUrls: ['./registro-de-falla.component.scss']
})
export class RegistroDeFallaComponent implements OnInit {

  accion:string; tipoDeEquipo:string;
  formFalla: FormGroup; formIngDeSoporte: FormGroup; formDFSE: FormGroup; formFabrica: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center'; verticalPosition: MatSnackBarVerticalPosition = 'top';
  matriculaEncontrada: any;
  maestraAreasDeServicio = []; maestraQuejas:any[];
  usuarioDeLaSession:any;
  botonUsuarioRegistrador = false; botonUsuarioEscalador= false;
  botonIngenieroDeSoporte = false;
  botonEscalarDfse = false; verDFSE = false;
  botonEscalarFabrica = false; verFabrica = false;
  botonCerrarCaso = false; verCerrarCaso = false;
  deshabilitarFalla:boolean = false;
  fallaParaGestionar:any;
  // data falsa de DFSE para los select
  items = [{value:'10', viewValue:'Valor 1'},{value:'20', viewValue:'Valor 2'},{value:'30', viewValue:'Valor 3'}];
  niveles : any[] = [{nombre:'Ing. Soporte', id: 1}, {nombre:'DFSE', id: 2}, {nombre:'Fabrica', id: 3}];
  constructor(private readonly router:Router, private readonly matDialog: MatDialog,
              private readonly garantiasService: GarantiasService, private _snackBar: MatSnackBar,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService,
              private readonly userService:UserService, private readonly fallasService:FallasService) { }

  ngOnInit(): void {
    this.cargarInfoLocalStorage();
    this.cargarFormularios();
    this.cargarMaestras();
  }

  cargarFormularios():void{
    if(this.accion=='new'){
      this.botonUsuarioRegistrador=true; this.botonUsuarioEscalador = true;
      this.cargarFormularioFallaSinDatos();
    }
    if(this.accion=='edit'){
      this.fallaParaGestionar = JSON.parse(localStorage.getItem('fallaParaGestionar'));
      if(this.fallaParaGestionar.nivelSoporte==0){
        this.botonUsuarioEscalador = true;
        this.cargarFormularioFallaConDatos();
      }
      if(this.fallaParaGestionar.nivelSoporte==1){
        this.botonEscalarDfse = true;
        this.verDFSE = true;
        this.cargarFormularioFallaConDatos();
        this.cargarFormularioIngDeSoporte();
      }
      if(this.fallaParaGestionar.nivelSoporte==2){
        this.botonEscalarFabrica = true;
        this.verDFSE = true;
        this.verFabrica = true;
        this.cargarFormularioFallaConDatos();
        this.cargarFormularioIngDeSoporte();
        this.cargarFormularioDFSE();
      }
      if(this.fallaParaGestionar.nivelSoporte==3){
        this.botonCerrarCaso = true;
        this.verDFSE = true;
        this.verFabrica = true;
        this.verCerrarCaso = true;
        this.cargarFormularioFallaConDatos();
        this.cargarFormularioIngDeSoporte();
        this.cargarFormularioDFSE();
        this.cargarFormularioFabrica();
      }
    }
  }

  cargarFormularioFallaSinDatos():void{
    this.formFalla = new FormGroup({
      os: new FormControl('', [Validators.required]),
      io: new FormControl('', [Validators.required]),
      esn: new FormControl('', [Validators.required]),
      idArea: new FormControl(null),
      aplicacion: new FormControl('', [Validators.required]),
      numParte: new FormControl('',[Validators.required]),
      puntoFalla: new FormControl('',[Validators.required]),
      tipoFalla: new FormControl('',[Validators.required]),
      fechaFalla: new FormControl('',[Validators.required]),
      descripcion: new FormControl('',[Validators.required]),
      queja1: new FormControl(null),
      queja2: new FormControl(null),
      queja3: new FormControl(null),
      evento: new FormControl('',[Validators.required]),
    });
  }

  cargarFormularioFallaConDatos():void{
    this.formFalla = new FormGroup({
      os: new FormControl({value:this.fallaParaGestionar.os, disabled:true}),
      io: new FormControl({value:this.fallaParaGestionar.io, disabled:true}),
      esn: new FormControl({value:this.fallaParaGestionar.esn, disabled:true}),
      idArea: new FormControl({value:this.fallaParaGestionar.idArea, disabled:true}),
      aplicacion: new FormControl({value:this.fallaParaGestionar.aplicacion, disabled:true}),
      numParte: new FormControl({value:this.fallaParaGestionar.numParte, disabled:true}),
      puntoFalla: new FormControl({value: this.fallaParaGestionar.puntoFalla, disabled:true}),
      tipoFalla: new FormControl({value:this.fallaParaGestionar.tipoFalla, disabled:true}),
      fechaFalla: new FormControl({value:this.fallaParaGestionar.fechaFalla, disabled:true}),
      descripcion: new FormControl({value:this.fallaParaGestionar.descripcion, disabled:true}),
      queja1: new FormControl({value:this.fallaParaGestionar.queja1, disabled:true}),
      queja2: new FormControl({value:this.fallaParaGestionar.queja2, disabled:true}),
      queja3: new FormControl({value:this.fallaParaGestionar.queja3, disabled:true}),
      evento: new FormControl({value:this.fallaParaGestionar.evento, disabled:true}),
  });
  this.getEsn();
  }

  cargarFormularioIngDeSoporte():void{
    this.formIngDeSoporte = new FormGroup({
      discucion: new FormControl(this.fallaParaGestionar.discucion!=null?this.fallaParaGestionar.discucion:'', [Validators.required]),
      conclusion: new FormControl(this.fallaParaGestionar.conclusion!=null?this.fallaParaGestionar.conclusion:'', [Validators.required]),
      recomendacion: new FormControl(this.fallaParaGestionar.recomendacion!=null?this.fallaParaGestionar.recomendacion:'', [Validators.required])
    });
  }

  cargarFormularioDFSE():void{
    this.formDFSE = new FormGroup({
      issueCategory: new FormControl(this.fallaParaGestionar.issueCategory!=null?this.fallaParaGestionar.issueCategory:null, [Validators.required]),
      nivelSoporte: new FormControl(this.fallaParaGestionar.nivelSoporte!=null?this.fallaParaGestionar.nivelSoporte:null, [Validators.required]),
      subEstado: new FormControl(this.fallaParaGestionar.subEstado!=null?this.fallaParaGestionar.subEstado:null, [Validators.required]),
      tsr: new FormControl(this.fallaParaGestionar.tsr!=null?this.fallaParaGestionar.tsr:'', [Validators.required]),
      partsReturn: new FormControl(this.fallaParaGestionar.partsReturn!=null?this.fallaParaGestionar.partsReturn:null, [Validators.required]),
      trakingNumber: new FormControl(this.fallaParaGestionar.trakingNumber!=null?this.fallaParaGestionar.trakingNumber:'', [Validators.required]),
      subestadoPartsReturn: new FormControl(this.fallaParaGestionar.subestadoPartsReturn!=null?this.fallaParaGestionar.subestadoPartsReturn:null, [Validators.required]),
      fechaIniDesarmeMotor: new FormControl(this.fallaParaGestionar.fechaIniDesarmeMotor!=null?this.fallaParaGestionar.fechaIniDesarmeMotor:null, [Validators.required]),
      fechaFinDesarmeMotor: new FormControl(this.fallaParaGestionar.fechaFinDesarmeMotor!=null?this.fallaParaGestionar.fechaFinDesarmeMotor:null, [Validators.required]),
      fechaSolPartes: new FormControl(this.fallaParaGestionar.fechaSolPartes!=null?this.fallaParaGestionar.fechaSolPartes:null, [Validators.required]),
      fechaEnvio: new FormControl(this.fallaParaGestionar.fechaEnvio!=null?this.fallaParaGestionar.fechaEnvio:null, [Validators.required]),
      discucionDfse: new FormControl(this.fallaParaGestionar.discucionDfse!=null?this.fallaParaGestionar.discucionDfse:'', [Validators.required]),
      conclusionDfse: new FormControl(this.fallaParaGestionar.conclusionDfse!=null?this.fallaParaGestionar.conclusionDfse:'', [Validators.required]),
      recomendacionesDfse: new FormControl(this.fallaParaGestionar.recomendacionesDfse!=null?this.fallaParaGestionar.recomendacionesDfse:'', [Validators.required]),
    });
  }

  cargarFormularioFabrica():void{
    this.formFabrica = new FormGroup({
      conclusionesFabrica: new FormControl(this.fallaParaGestionar.conclusionesFabrica!=null?this.fallaParaGestionar.conclusionesFabrica:'', [Validators.required]),
      comentariosFabrica: new FormControl(this.fallaParaGestionar.comentariosFabrica!=null?this.fallaParaGestionar.comentariosFabrica:'', [Validators.required])
    });
  }

  cargarInfoLocalStorage():void{
    this.accion = localStorage.getItem('action'); //trae de localStorage la acción que se hará (crear e editar falla)
    this.tipoDeEquipo = localStorage.getItem('text'); //trae de localstorge el tipo de equipo (motor o generador)
  }

  cargarMaestras():void{
    this.configurationAndMaintenanceService.listaAreasDeServicioSinPaginar().subscribe(response=>{
      this.maestraAreasDeServicio = response.data;
    });
    this.userService.user$.subscribe(response=>{
      this.usuarioDeLaSession = response;  
    });
    this.configurationAndMaintenanceService.listComplaints(1).subscribe(resp=>{
      this.maestraQuejas = resp.data;
    });
  }
  
  getEsn():void{
    const esn = this.formFalla.value.esn;
    if(esn!=''){
      this.garantiasService.findEsn(esn).subscribe(response=>{
        if(response.body){
          this.matriculaEncontrada = response.body;
        }else{
          this.openSnackBar('No existe matricula con tal ESN');
          this.matriculaEncontrada = null;
        }
      })
    }else{
      this.openSnackBar('Ingrese el ESN');
      this.matriculaEncontrada = null;
    }
  }

  onListfallas():void{
    this.router.navigate(['/gestion-fallas']);
  }

  adjuntarDocumento():void{
    const dialogoAdjuntarDocumentos = this.matDialog.open(DialogAdjuntarDocumentoComponent,{
      width: '425px',
      disableClose:true,
      data:{modulo:'fallas'}
    });
    dialogoAdjuntarDocumentos.afterClosed().subscribe(resp=>{
      console.log(resp);
    });
  }

  onRegistrarMatricula():void{
    const dialogRegistrarMatricula = this.matDialog.open(DialogRegisterEnrollmentComponent,{
      width:'990px',
      disableClose: true,
      data: {option:'new',type:'engine', name:'motor'}
    })
  }

  openSnackBar(message:string):void{
    this._snackBar.open(message,'x',{
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['mat-toolbar', 'mat-primary','button-color']
    })
  }

  registrarNuevaFalla():void{
    const mensaje = 'llene todos los campos';
    if(this.formFalla.valid){
      if(this.formFalla.value.idArea!=null){
        if(this.formFalla.value.queja1!=null){
          if(this.formFalla.value.queja2!=null){
            if(this.formFalla.value.queja3!=null){
              if(this.matriculaEncontrada!=null){
                const nuevaFalla = {id:0, nivelSoporte:0, activo:true, idEsn: this.matriculaEncontrada!=null?this.matriculaEncontrada.id:'', idUsuario: this.usuarioDeLaSession.id, ...this.formFalla.value};
                this.fallasService.mantenimientoFallas(nuevaFalla).subscribe(response=>{
                  if(response.success){
                    this.registroExitosoDeLaFalla();
                  }
                });
              }else{ this.mensajeErrorDeCampos(mensaje); }
            }else{ this.mensajeErrorDeCampos(mensaje); }            
          }else{ this.mensajeErrorDeCampos(mensaje); }
        }else{ this.mensajeErrorDeCampos(mensaje); }
      }else{ this.mensajeErrorDeCampos(mensaje); }
    }else{ this.mensajeErrorDeCampos(mensaje); }
  }

  escalarFalla():void{
    const mensaje = 'llene todos los campos';
    if(this.accion=='new'){
      if(this.formFalla.valid){
        if(this.formFalla.value.idArea!=null){
          if(this.formFalla.value.queja1!=null){
            if(this.formFalla.value.queja2!=null){
              if(this.formFalla.value.queja3!=null){
                if(this.matriculaEncontrada!=null){
                    const dialogAsignacionDeLaFalla = this.matDialog.open(DialogAsignacionDeLaFallaComponent,{
                      width:'425px',
                      disableClose:true
                    });
                    dialogAsignacionDeLaFalla.afterClosed().subscribe(responseDialog=>{
                        if(responseDialog.success){
                          const nuevaFalla = {id:0, nivelSoporte:responseDialog.nivelSoporte, activo:true, asignacionFalla: responseDialog.idUsuario,
                                              idEsn:this.matriculaEncontrada!=null?this.matriculaEncontrada.id:'',
                                              idUsuario: this.usuarioDeLaSession.id, ...this.formFalla.value};
                          this.fallasService.mantenimientoFallas(nuevaFalla).subscribe(response=>{
                              if(response.success){
                                localStorage.setItem('success','true');
                                this.router.navigate(['/gestion-fallas']);
                              }
                          });
                        }
                    });             
                }else{ this.mensajeErrorDeCampos(mensaje); }
              }else{ this.mensajeErrorDeCampos(mensaje); }            
            }else{ this.mensajeErrorDeCampos(mensaje); }
          }else{ this.mensajeErrorDeCampos(mensaje); }
        }else{ this.mensajeErrorDeCampos(mensaje); }
      }else{ this.mensajeErrorDeCampos(mensaje); }
    }else{
      const dialogAsignacionDeLaFalla = this.matDialog.open(DialogAsignacionDeLaFallaComponent,{
        width:'425px',
        disableClose:true
      });
      dialogAsignacionDeLaFalla.afterClosed().subscribe(responseDialog=>{
          if(responseDialog.success){
            this.fallaParaGestionar.nivelSoporte=1;
            this.fallaParaGestionar.asignacionFalla= responseDialog.idUsuario
            this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(response=>{
              if(response.success){
                localStorage.setItem('success','true');
                this.router.navigate(['/gestion-fallas']);
              }
            });
          }
      }); 
    }
  }

  guardarRegistroIngenieroDeSoporte():void{
    if(this.formIngDeSoporte.valid){
      this.fallaParaGestionar.activo = true;
      this.fallaParaGestionar.discucion = this.formIngDeSoporte.value.discucion;
      this.fallaParaGestionar.conclusion = this.formIngDeSoporte.value.conclusion;
      this.fallaParaGestionar.recomendacion = this.formIngDeSoporte.value.recomendacion;
      this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
          if(responseApi.success){
            this.registroExitosoDeLaFalla();
          }
      });
    }else{
      this.mensajeErrorDeCampos('Llene los campos de ingeniero de soporte');
    }
  }

  escalarFallaHaciaDFSE():void{
    if(this.formIngDeSoporte.valid) {
      this.fallaParaGestionar.activo = true;
      this.fallaParaGestionar.discucion = this.formIngDeSoporte.value.discucion;
      this.fallaParaGestionar.conclusion = this.formIngDeSoporte.value.conclusion;
      this.fallaParaGestionar.recomendacion = this.formIngDeSoporte.value.recomendacion;
      const dialogAsignacionDeLaFalla = this.matDialog.open(DialogAsignacionDeLaFallaComponent,{
        width:'425px',
        disableClose:true
      });
      dialogAsignacionDeLaFalla.afterClosed().subscribe(responseDialog=>{
        if(responseDialog.success){
          this.fallaParaGestionar.asignacionFalla1 = responseDialog.idUsuario;
          this.fallaParaGestionar.nivelSoporte = responseDialog.nivelSoporte;
            this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
                if(responseApi.success){
                  localStorage.setItem('success','true');
                  this.router.navigate(['/gestion-fallas']);
                }
            });
        }
      });
    }else{
      this.mensajeErrorDeCampos('Llene los campos de ingeniero de soporte');
    }
  }

  mensajeErrorDeCampos(mensaje):void{
    const dialogMensajeDeError = this.matDialog.open(DialogErrorMessageComponent,{
      width:'386px',
      disableClose:true,
      data:{text:mensaje}
    });
  }

  registroExitosoDeLaFalla():void{
    const dialogRegistroExitoso = this.matDialog.open(DialogDraftSavedSuccessfullyComponent,{
      disableClose:true,
      data: {text:'Se guardó el registro con éxito'},
      width:'386px'
    });
    dialogRegistroExitoso.afterClosed().subscribe(response=>{
      if(response){
        localStorage.setItem('success','true');
        this.router.navigate(['/gestion-fallas']);
      }
    });
  }

  guardarRegistroDFSE():void{
    if(this.formIngDeSoporte.valid){
      this.fallaParaGestionar.activo = true;
      this.fallaParaGestionar.discucion = this.formIngDeSoporte.value.discucion;
      this.fallaParaGestionar.conclusion = this.formIngDeSoporte.value.conclusion;
      this.fallaParaGestionar.recomendacion = this.formIngDeSoporte.value.recomendacion;
      if(this.formDFSE.valid){
        this.fallaParaGestionar.issueCategory = this.formDFSE.value.issueCategory;
        this.fallaParaGestionar.nivelSoporte = this.formDFSE.value.nivelSoporte;
        this.fallaParaGestionar.subEstado = this.formDFSE.value.subEstado;
        this.fallaParaGestionar.tsr = this.formDFSE.value.tsr;
        this.fallaParaGestionar.partsReturn = this.formDFSE.value.partsReturn;
        this.fallaParaGestionar.trakingNumber = this.formDFSE.value.trakingNumber;
        this.fallaParaGestionar.subestadoPartsReturn = this.formDFSE.value.subestadoPartsReturn;
        this.fallaParaGestionar.fechaIniDesarmeMotor = this.formDFSE.value.fechaIniDesarmeMotor;
        this.fallaParaGestionar.fechaFinDesarmeMotor = this.formDFSE.value.fechaFinDesarmeMotor;
        this.fallaParaGestionar.fechaSolPartes = this.formDFSE.value.fechaSolPartes;
        this.fallaParaGestionar.fechaEnvio = this.formDFSE.value.fechaEnvio;
        this.fallaParaGestionar.discucionDfse = this.formDFSE.value.discucionDfse;
        this.fallaParaGestionar.conclusionDfse = this.formDFSE.value.conclusionDfse;
        this.fallaParaGestionar.recomendacionesDfse = this.formDFSE.value.recomendacionesDfse;
        this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
          if(responseApi.success){
            this.registroExitosoDeLaFalla();
          }
      });
      }else{
        this.mensajeErrorDeCampos('Llene los campos DFSE');
      }
    }else{
      this.mensajeErrorDeCampos('Llene los campos de ingeniero de soporte');
    }
  }

  escalarHaciaFabrica():void{
    if(this.formIngDeSoporte.valid){
      this.fallaParaGestionar.activo = true;
      this.fallaParaGestionar.discucion = this.formIngDeSoporte.value.discucion;
      this.fallaParaGestionar.conclusion = this.formIngDeSoporte.value.conclusion;
      this.fallaParaGestionar.recomendacion = this.formIngDeSoporte.value.recomendacion;
      if(this.formDFSE.valid){
        this.fallaParaGestionar.issueCategory = this.formDFSE.value.issueCategory;
        this.fallaParaGestionar.nivelSoporte = 3;
        this.fallaParaGestionar.subEstado = this.formDFSE.value.subEstado;
        this.fallaParaGestionar.tsr = this.formDFSE.value.tsr;
        this.fallaParaGestionar.partsReturn = this.formDFSE.value.partsReturn;
        this.fallaParaGestionar.trakingNumber = this.formDFSE.value.trakingNumber;
        this.fallaParaGestionar.subestadoPartsReturn = this.formDFSE.value.subestadoPartsReturn;
        this.fallaParaGestionar.fechaIniDesarmeMotor = this.formDFSE.value.fechaIniDesarmeMotor;
        this.fallaParaGestionar.fechaFinDesarmeMotor = this.formDFSE.value.fechaFinDesarmeMotor;
        this.fallaParaGestionar.fechaSolPartes = this.formDFSE.value.fechaSolPartes;
        this.fallaParaGestionar.fechaEnvio = this.formDFSE.value.fechaEnvio;
        this.fallaParaGestionar.discucionDfse = this.formDFSE.value.discucionDfse;
        this.fallaParaGestionar.conclusionDfse = this.formDFSE.value.conclusionDfse;
        this.fallaParaGestionar.recomendacionesDfse = this.formDFSE.value.recomendacionesDfse;
        this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
          if(responseApi.success){
            localStorage.setItem('success','true');
            this.router.navigate(['/gestion-fallas']);
          }
      });
      }else{
        this.mensajeErrorDeCampos('Llene los campos DFSE');
      }
    }else{
      this.mensajeErrorDeCampos('Llene los campos de ingeniero de soporte');
    }
  }

  guardarRegistroFabrica():void{
    if(this.formIngDeSoporte.valid){
      this.fallaParaGestionar.activo = true;
      this.fallaParaGestionar.discucion = this.formIngDeSoporte.value.discucion;
      this.fallaParaGestionar.conclusion = this.formIngDeSoporte.value.conclusion;
      this.fallaParaGestionar.recomendacion = this.formIngDeSoporte.value.recomendacion;
      if(this.formDFSE.valid){
        this.fallaParaGestionar.issueCategory = this.formDFSE.value.issueCategory;
        this.fallaParaGestionar.nivelSoporte = this.formDFSE.value.nivelSoporte;
        this.fallaParaGestionar.subEstado = this.formDFSE.value.subEstado;
        this.fallaParaGestionar.tsr = this.formDFSE.value.tsr;
        this.fallaParaGestionar.partsReturn = this.formDFSE.value.partsReturn;
        this.fallaParaGestionar.trakingNumber = this.formDFSE.value.trakingNumber;
        this.fallaParaGestionar.subestadoPartsReturn = this.formDFSE.value.subestadoPartsReturn;
        this.fallaParaGestionar.fechaIniDesarmeMotor = this.formDFSE.value.fechaIniDesarmeMotor;
        this.fallaParaGestionar.fechaFinDesarmeMotor = this.formDFSE.value.fechaFinDesarmeMotor;
        this.fallaParaGestionar.fechaSolPartes = this.formDFSE.value.fechaSolPartes;
        this.fallaParaGestionar.fechaEnvio = this.formDFSE.value.fechaEnvio;
        this.fallaParaGestionar.discucionDfse = this.formDFSE.value.discucionDfse;
        this.fallaParaGestionar.conclusionDfse = this.formDFSE.value.conclusionDfse;
        this.fallaParaGestionar.recomendacionesDfse = this.formDFSE.value.recomendacionesDfse;
        if(this.formFabrica.valid){
            this.fallaParaGestionar.conclusionesFabrica = this.formFabrica.value.conclusionesFabrica;
            this.fallaParaGestionar.comentariosFabrica = this.formFabrica.value.comentariosFabrica;          
            this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
              if(responseApi.success){
                this.registroExitosoDeLaFalla();
              }
            });
        }else{
          this.mensajeErrorDeCampos('Llene los campos Fabrica');
        }
      }else{
        this.mensajeErrorDeCampos('Llene los campos DFSE');
      }
    }else{
      this.mensajeErrorDeCampos('Llene los campos de ingeniero de soporte');
    }
  }

  cerrarCaso():void{
    if(this.formIngDeSoporte.valid){
      this.fallaParaGestionar.activo = true;
      this.fallaParaGestionar.discucion = this.formIngDeSoporte.value.discucion;
      this.fallaParaGestionar.conclusion = this.formIngDeSoporte.value.conclusion;
      this.fallaParaGestionar.recomendacion = this.formIngDeSoporte.value.recomendacion;
      if(this.formDFSE.valid){
        this.fallaParaGestionar.issueCategory = this.formDFSE.value.issueCategory;
        this.fallaParaGestionar.nivelSoporte = this.formDFSE.value.nivelSoporte;
        this.fallaParaGestionar.subEstado = this.formDFSE.value.subEstado;
        this.fallaParaGestionar.tsr = this.formDFSE.value.tsr;
        this.fallaParaGestionar.partsReturn = this.formDFSE.value.partsReturn;
        this.fallaParaGestionar.trakingNumber = this.formDFSE.value.trakingNumber;
        this.fallaParaGestionar.subestadoPartsReturn = this.formDFSE.value.subestadoPartsReturn;
        this.fallaParaGestionar.fechaIniDesarmeMotor = this.formDFSE.value.fechaIniDesarmeMotor;
        this.fallaParaGestionar.fechaFinDesarmeMotor = this.formDFSE.value.fechaFinDesarmeMotor;
        this.fallaParaGestionar.fechaSolPartes = this.formDFSE.value.fechaSolPartes;
        this.fallaParaGestionar.fechaEnvio = this.formDFSE.value.fechaEnvio;
        this.fallaParaGestionar.discucionDfse = this.formDFSE.value.discucionDfse;
        this.fallaParaGestionar.conclusionDfse = this.formDFSE.value.conclusionDfse;
        this.fallaParaGestionar.recomendacionesDfse = this.formDFSE.value.recomendacionesDfse;
        if(this.formFabrica.valid){
            this.fallaParaGestionar.conclusionesFabrica = this.formFabrica.value.conclusionesFabrica;
            this.fallaParaGestionar.comentariosFabrica = this.formFabrica.value.comentariosFabrica;         
            const dialogCerrarCaso = this.matDialog.open(DialogCerrarFallaComponent,{
              disableClose:true,
              width:'380px'
            });
            dialogCerrarCaso.afterClosed().subscribe(responseDialog=>{
              if(responseDialog.success){
                this.fallaParaGestionar.estado = 3;
                this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
                  if(responseApi.success){
                    localStorage.setItem('success','true');
                    this.router.navigate(['/gestion-fallas']);
                  }
                });
              }
            });
        }else{
          this.mensajeErrorDeCampos('Llene los campos Fabrica');
        }
      }else{
        this.mensajeErrorDeCampos('Llene los campos DFSE');
      }
    }else{
      this.mensajeErrorDeCampos('Llene los campos de ingeniero de soporte');
    }
  }
}
