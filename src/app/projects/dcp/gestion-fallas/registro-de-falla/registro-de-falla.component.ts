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
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { SnackBarMessageComponent } from 'app/shared/dialogs/snack-bar-message/snack-bar-message.component';
import { AzureService } from 'app/core/azure/azure.service';
import { DialogSeeDocumentsComponent } from 'app/shared/dialogs/dialog-see-documents/dialog-see-documents.component';

@Component({
  selector: 'app-registro-de-falla',
  templateUrl: './registro-de-falla.component.html',
  styleUrls: ['./registro-de-falla.component.scss']
})
export class RegistroDeFallaComponent implements OnInit {

  accion:string; tipoDeEquipo:string; tipo:number;
  formFalla: FormGroup; formIngDeSoporte: FormGroup; formDFSE: FormGroup; formFabrica: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center'; verticalPosition: MatSnackBarVerticalPosition = 'top';
  matriculaEncontrada: any;
  maestraAreasDeServicio = []; maestraQuejas:any[]; documentosParaDescargar = [];
  usuarioDeLaSession:any; usuarioRegistrador:any;
  botonUsuarioRegistrador = false; botonUsuarioEscalador= false; botonObservar = false;
  botonIngenieroDeSoporte = false; botonCerrarCasoIngDeSoporte = false;
  botonEscalarDfse = false; verDFSE = false; botonCerrarCasoDfse = false;
  botonEscalarFabrica = false; verFabrica = false;
  botonCerrarCaso = false; verCerrarCaso = false;
  deshabilitarFalla:boolean = false;
  fallaParaGestionar:any;
  mostrarTrakingNumber = false;
  trackinNumberGenerated = Math.floor(Math.random() * 100000000);
  fechaHoy = new Date;
  // data falsa de DFSE para los select
  items = [{value:10, viewValue:'Valor 1'},{value:20, viewValue:'Valor 2'},{value:30, viewValue:'Valor 3'}];
  items2 = [{value:'10', viewValue:'Valor 1'},{value:'20', viewValue:'Valor 2'},{value:'30', viewValue:'Valor 3'}];
  niveles : any[] = [{nombre:'Ing. Soporte', id: 1}, {nombre:'DFSE', id: 2}, {nombre:'Fabrica', id: 3}];
  verQueja2 = false; verQueja3 = false;
  mostrarProgressBarEsn : boolean = false;
  documentos = [];
  documentosSubidos = [];
  
  constructor(private readonly router:Router, private readonly matDialog: MatDialog,
              private readonly garantiasService: GarantiasService, private readonly matSnackBar:MatSnackBar,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService,
              private readonly userService:UserService, private readonly fallasService:FallasService,
              private _azureService: AzureService)
              {
              }

  ngOnInit(): void {
    this.cargarInfoLocalStorage();
    this.cargarFormularios();
    this.cargarMaestras();
  }

  cargarFormularios():void{
    if(this.accion=='new'){
      this.botonUsuarioRegistrador=true;
      this.botonUsuarioEscalador = true;
      if(this.tipoDeEquipo=='motor'){
        this.tipo = 1;
      }
      if(this.tipoDeEquipo=='generador'){
        this.tipo = 2;
      }
      this.cargarFormularioRegistroBasico();
    }
    if(this.accion=='edit'){
      this.fallaParaGestionar = JSON.parse(localStorage.getItem('fallaParaGestionar'));
      this.cargarDocumentosSubidos(this.fallaParaGestionar.id);
      this.mostrarQuejasRegistradas();
      if(this.fallaParaGestionar.nivelSoporte==0){
        this.botonUsuarioEscalador = true;
        this.botonUsuarioRegistrador=true;
        this.cargarFormularioRegistroBasico();
      }
      if(this.fallaParaGestionar.nivelSoporte==1){
        this.botonEscalarDfse = true;
        this.verDFSE = true;
        this.botonObservar = true;
        this.botonCerrarCasoIngDeSoporte = true;
        this.cargarFormularioRegistroBasico();
        this.cargarFormularioIngDeSoporte();
      }
      if(this.fallaParaGestionar.nivelSoporte==2){
        this.botonEscalarFabrica = true;
        this.verDFSE = true;
        this.verFabrica = true;
        this.botonObservar = true;
        this.botonCerrarCasoDfse = true;
        this.cargarFormularioRegistroBasico();
        this.cargarFormularioIngDeSoporte();
        this.cargarFormularioDFSE();
        this.mostrarTrackingNumber();
      }
      if(this.fallaParaGestionar.nivelSoporte==3){
        this.botonCerrarCaso = true;
        this.verDFSE = true;
        this.verFabrica = true;
        this.verCerrarCaso = true;
        this.cargarFormularioRegistroBasico();
        this.cargarFormularioIngDeSoporte();
        this.cargarFormularioDFSE();
        this.cargarFormularioFabrica();
        this.mostrarTrackingNumber();
      }
      if(this.fallaParaGestionar.estado==2){
        this.botonObservar = false;
      }
    }
  }

  cargarDocumentosSubidos(id:number):void{
    this.garantiasService.listAdjuntos(id,'fallas').subscribe(responseApi=>{
      if(responseApi.success){
        this.documentosParaDescargar = responseApi.body      
      }else{
        this.openSnackBarWarn('Error en la consulta de los documentos cargados');
      }
    })
  }

  cargarFormularioRegistroBasico():void{
    this.formFalla = new FormGroup({
      os: new FormControl({value:this.fallaParaGestionar?this.fallaParaGestionar.os:'', disabled:this.accion=='edit'?true:false},[Validators.required]),
      io: new FormControl(this.fallaParaGestionar?this.fallaParaGestionar.io:'', [Validators.required]),
      esn: new FormControl({value:this.fallaParaGestionar?this.fallaParaGestionar.esn:'', disabled:this.accion=='edit'?true:false }, [Validators.required]),
      idArea: new FormControl({value:this.fallaParaGestionar?this.fallaParaGestionar.idArea:null, disabled:this.accion=='edit'?true:false}),
      aplicacion: new FormControl(this.fallaParaGestionar?this.fallaParaGestionar.aplicacion:'', [Validators.required]),
      numParte: new FormControl(this.fallaParaGestionar?this.fallaParaGestionar.numParte:'',[Validators.required]),
      puntoFalla: new FormControl(this.fallaParaGestionar?this.fallaParaGestionar.puntoFalla:'',[Validators.required]),
      tipoFalla: new FormControl(this.fallaParaGestionar?this.fallaParaGestionar.tipoFalla:'',[Validators.required]),
      fechaFalla: new FormControl(this.fallaParaGestionar?this.fallaParaGestionar.fechaFalla:'',[Validators.required]),
      descripcion: new FormControl(this.fallaParaGestionar?this.fallaParaGestionar.descripcion:'',[Validators.required]),
      queja1: new FormControl(this.fallaParaGestionar?this.fallaParaGestionar.queja1:null),
      queja2: new FormControl(this.fallaParaGestionar?this.fallaParaGestionar.queja2:null),
      queja3: new FormControl(this.fallaParaGestionar?this.fallaParaGestionar.queja3:null),
      evento: new FormControl(this.fallaParaGestionar?this.fallaParaGestionar.evento:'',[Validators.required]),
    });
    if(this.fallaParaGestionar!=null){
      this.getEsnRegistroExistente(this.fallaParaGestionar.esn);
    }
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
      trakingNumber: new FormControl({value:this.fallaParaGestionar.trakingNumber!=null?this.fallaParaGestionar.trakingNumber:this.trackinNumberGenerated, disabled:true}),
      subestadoPartsReturn: new FormControl(this.fallaParaGestionar.subestadoPartsReturn!=null?this.fallaParaGestionar.subestadoPartsReturn:null),
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
    if(this.accion=='edit'){
      this.configurationAndMaintenanceService.obtenerUsuarioPorId(this.fallaParaGestionar.idUsuarioReg).subscribe(responseApi=>{
        this.usuarioRegistrador = responseApi;
      })
    }
    this.configurationAndMaintenanceService.listComplaints(1).subscribe(resp=>{
      this.maestraQuejas = resp.data;
    });

  }

  //TRAER LA MATRICULA INGRESADA

  getEsn():void{
    const esn = this.formFalla.value.esn;
    if(esn!=''){
      this.mostrarProgressBarEsn = true;
      this.garantiasService.findEsn(esn).subscribe(response=>{
        this.mostrarProgressBarEsn = false;
        if(response.body){
          // this.openSnackBarSuccess('¡Matrícula asociada con éxito!');
          this.matriculaEncontrada = response.body;
        }else{
          this.openSnackBarWarn('No existe matricula con tal ESN');
          this.matriculaEncontrada = null;
        }
      })
    }else{
      this.openSnackBarWarn('Ingrese el ESN');
      this.matriculaEncontrada = null;
    }
  }

  getEsnRegistroExistente(esn:string):void{
    this.mostrarProgressBarEsn = true;
    this.garantiasService.findEsn(esn).subscribe(response=>{
      this.mostrarProgressBarEsn = false;
      if(response.body){
        this.matriculaEncontrada = response.body;
      }else{
        this.openSnackBarWarn('No existe matricula con tal ESN');
        this.matriculaEncontrada = null;
      }
    })
  }

  // IR A LA VISTA LISTADO DE FALLAS

  onListfallas():void{
    this.router.navigate(['/gestion-fallas']);
  }

  // abrir modal para adjuntar documentos

  adjuntarDocumento():void{
    const dialogoAdjuntarDocumentos = this.matDialog.open(DialogAdjuntarDocumentoComponent,{
      width: '425px',
      disableClose:true,
      data:{modulo:'fallas'}
    });
    dialogoAdjuntarDocumentos.afterClosed().subscribe(responseDialogAjuntarDocumento=>{
      this.documentos =  responseDialogAjuntarDocumento.documentos;
    });
  }

  // SUBIR ARCHIVOS A AZURE

  async subirArchivosAlServidor(_entidad:number){
    for (let i = 0; i < this.documentos.length; i++) {
        const file = this.documentos[i];
        const blob = new Blob([file], { type: file.type });
        const response = await this._azureService.uploadFile(blob, file.name);
        const urlFile = this._azureService.getResourceUrl(response.uuidFileName);
        const request = {
            entidad:_entidad,
            nombre:file.name,
            ruta:urlFile,
            tabla:'fallas'
        };
        this.garantiasService.saveAdjuntos(request).subscribe(responseApi=>{
            if(responseApi.success==false){
              this.openSnackBarWarn('Error al subir el documento');
            }
        })
    }
  }

  // GUARDAR BITACORA


  guardarBitacora(_idEntidad:number,_idEvaluador:number,_comentarios:any,_estado:number,_nivelSoporteActual:number):void{
    const request = {
      tipo:2,
      idEntidad:_idEntidad,
      evaluador:_idEvaluador,
      comentarios:_comentarios,
      estado:_estado,
      nivelSoporteActual:_nivelSoporteActual
    };
    this.garantiasService.saveBitacora(request).subscribe(responseApi=>{
      if(responseApi.success==false){
        this.openSnackBarWarn('Error en el registro de la bitacora');
      }
    });
  }

  onRegistrarMatricula():void{
    const dialogNewEnrollment = this.matDialog.open(DialogRegisterEnrollmentComponent,{
        width: '990px',
        disableClose:true,
        data: { option:'new',
                type:this.fallaParaGestionar==null?this.tipoDeEquipo:this.fallaParaGestionar.tipo==1?'motor':this.fallaParaGestionar.tipo==2?'generador':'¡Error!' },
      });
    dialogNewEnrollment.afterClosed().subscribe(responseDialog=>{
      if(responseDialog.success){
        this.openDialogOperationSuccessfully('Matricula creada con éxito');
        if(this.accion=='new'){
          this.formFalla.controls['esn'].setValue(responseDialog.matricula.esn);
          this.getEsn();
        }
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  // USUARIO DE SERVICIO

  registrarFalla():void{
    if(this.accion=='new'){
        if(!(this.matriculaEncontrada==null) && !(this.formFalla.value.os=='') && !(this.formFalla.value.fechaFalla=='') && !(this.formFalla.value.idArea==null)){
          if(this.verQueja2==false){this.formFalla.value.queja2=null};
          if(this.verQueja3==false){this.formFalla.value.queja3=null};
            const nuevaFalla = { id:0,
                                nivelSoporte:0,
                                tipo:this.tipo,
                                activo:true,
                                idEsn: this.matriculaEncontrada.id,
                                idUsuarioReg: this.usuarioDeLaSession.id,
                                responsable:this.usuarioDeLaSession.id,
                                ...this.formFalla.value };
            this.fallasService.mantenimientoFallas(nuevaFalla).subscribe(responseApi=>{
                if(responseApi.success){
                  this.guardarBitacora(responseApi.body.id,0,null,1,0);
                    this.subirArchivosAlServidor(responseApi.body.id);
                    this.registroExitosoDeLaFalla('true');
                }
            });
        }else{
        this.openSnackBarWarn('Llenar campos necesarios para el registro básico');
      }
    }
    if(this.accion=='edit'){
        this.fallaParaGestionar.os = this.formFalla.value.os;
        this.fallaParaGestionar.io = this.formFalla.value.io;
        this.fallaParaGestionar.esn = this.formFalla.value.esn;
        this.fallaParaGestionar.idArea = this.formFalla.value.idArea;
        this.fallaParaGestionar.aplicacion = this.formFalla.value.aplicacion;
        this.fallaParaGestionar.numParte = this.formFalla.value.numParte;
        this.fallaParaGestionar.puntoFalla = this.formFalla.value.puntoFalla;
        this.fallaParaGestionar.tipoFalla = this.formFalla.value.tipoFalla;
        this.fallaParaGestionar.fechaFalla = this.formFalla.value.fechaFalla;
        this.fallaParaGestionar.descripcion = this.formFalla.value.descripcion;
        if(this.verQueja2==false){this.formFalla.value.queja2=null};
        if(this.verQueja3==false){this.formFalla.value.queja3=null};
        this.fallaParaGestionar.queja1 = this.formFalla.value.queja1;
        this.fallaParaGestionar.queja2 = this.formFalla.value.queja2;
        this.fallaParaGestionar.queja3 = this.formFalla.value.queja3;
        this.fallaParaGestionar.evento = this.formFalla.value.evento;
        this.fallaParaGestionar.idUsuarioReg = this.usuarioDeLaSession.id;
        this.fallaParaGestionar.responsable = this.usuarioDeLaSession.id;
        this.fallaParaGestionar.estado = 1;
        this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
            if(responseApi.success){
                this.guardarBitacora(responseApi.body.id,0,null,1,0);
                this.subirArchivosAlServidor(responseApi.body.id);
                this.registroExitosoDeLaFalla('editado');
            }
        });
    }
  }

  escalarFalla():void{
    const mensaje = 'llene todos los campos';
    if(this.accion=='new'){
        if(this.formFalla.valid){
            if(this.formFalla.value.idArea!=null){
                if(this.formFalla.value.queja1!=null){
                    if(this.matriculaEncontrada!=null){
                        const dialogAsignacionDeLaFalla = this.matDialog.open(DialogAsignacionDeLaFallaComponent,{
                          width:'425px', data:{nivel:1},
                          disableClose:true,
                        });
                        dialogAsignacionDeLaFalla.afterClosed().subscribe(responseDialog=>{
                            if(responseDialog.success){
                                if(this.verQueja2==false){this.formFalla.value.queja2=null};
                                if(this.verQueja3==false){this.formFalla.value.queja3=null};
                                const nuevaFalla = {
                                    id:0,
                                    nivelSoporte:responseDialog.nivelSeleccionado,
                                    activo:true,
                                    asignacionFalla: responseDialog.idUsuario,
                                    idEsn:this.matriculaEncontrada!=null?this.matriculaEncontrada.id:'',
                                    idUsuarioReg: this.usuarioDeLaSession.id,
                                    responsable:responseDialog.idUsuario,
                                    ...this.formFalla.value,
                                    tipo:this.tipo
                                };
                                this.fallasService.mantenimientoFallas(nuevaFalla).subscribe(responseApi=>{
                                    if(responseApi.success){
                                        this.guardarBitacora(responseApi.body.id,responseDialog.idUsuario,null,1,responseDialog.nivelSeleccionado);
                                        this.subirArchivosAlServidor(responseApi.body.id);
                                        localStorage.setItem('success','escalado');
                                        this.router.navigate(['/gestion-fallas']);
                                    }
                              });
                            }
                        });             
                    }else{
                      this.openSnackBarWarn(mensaje);
                    }
                }else{
                  this.openSnackBarWarn(mensaje);
                }
            }else{
              this.openSnackBarWarn(mensaje);
            }
        }else{
          this.openSnackBarWarn(mensaje);
        }
    }else{
      const dialogAsignacionDeLaFalla = this.matDialog.open(DialogAsignacionDeLaFallaComponent,{
        width:'425px',
        disableClose:true,
        data:{nivel:1}
      });
      dialogAsignacionDeLaFalla.afterClosed().subscribe(responseDialog=>{
          if(responseDialog.success){
            this.fallaParaGestionar.nivelSoporte = responseDialog.nivelSeleccionado;
            this.fallaParaGestionar.asignacionFalla = responseDialog.idUsuario;
            this.fallaParaGestionar.idUsuarioReg = this.usuarioDeLaSession.id;
            this.fallaParaGestionar.responsable = responseDialog.idUsuario;
            this.fallaParaGestionar.estado = 1;
            if(this.verQueja2==false){this.fallaParaGestionar.queja2=null};
            if(this.verQueja3==false){this.fallaParaGestionar.queja3=null};
            this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(response=>{
              if(response.success){
                //guardamos en la bitacora
                this.guardarBitacora(this.fallaParaGestionar.id,responseDialog.idUsuario,null,1,responseDialog.nivelSeleccionado);
                this.subirArchivosAlServidor(this.fallaParaGestionar.id);
                localStorage.setItem('success','escalado');
                this.router.navigate(['/gestion-fallas']);            
              }
            });
          }
      }); 
    } 
  }

  // INGENIERO DE SOPORTE

  guardarRegistroIngenieroDeSoporte():void{
      this.fallaParaGestionar.activo = true;
      this.fallaParaGestionar.discucion = this.formIngDeSoporte.value.discucion;
      this.fallaParaGestionar.conclusion = this.formIngDeSoporte.value.conclusion;
      this.fallaParaGestionar.recomendacion = this.formIngDeSoporte.value.recomendacion;
      this.fallaParaGestionar.idUsuarioReg = this.usuarioDeLaSession.id;
      this.fallaParaGestionar.estado = 1;
      this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
          if(responseApi.success){
            //guardamos en la bitacora
            this.guardarBitacora(this.fallaParaGestionar.id,this.fallaParaGestionar.responsable,null,1,this.fallaParaGestionar.nivelSoporte);
            this.subirArchivosAlServidor(this.fallaParaGestionar.id);
            this.registroExitosoDeLaFalla('true');  
          }
      });
  }

  escalarFallaHaciaDFSE():void{
    if(this.formIngDeSoporte.valid) {
      this.fallaParaGestionar.activo = true;
      this.fallaParaGestionar.discucion = this.formIngDeSoporte.value.discucion;
      this.fallaParaGestionar.conclusion = this.formIngDeSoporte.value.conclusion;
      this.fallaParaGestionar.recomendacion = this.formIngDeSoporte.value.recomendacion;
      const dialogAsignacionDeLaFalla = this.matDialog.open(DialogAsignacionDeLaFallaComponent,{
        width:'425px',
        disableClose:true,
        data:{nivel:2}
      });
      dialogAsignacionDeLaFalla.afterClosed().subscribe(responseDialog=>{
        if(responseDialog.success){
          this.fallaParaGestionar.asignacionFalla1 = responseDialog.idUsuario;
          this.fallaParaGestionar.nivelSoporte = responseDialog.nivelSeleccionado;
          this.fallaParaGestionar.estado = 1;
          this.fallaParaGestionar.responsable = responseDialog.idUsuario;
          this.fallaParaGestionar.idUsuarioReg = this.usuarioDeLaSession.id;
          this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
              if(responseApi.success){
                  this.guardarBitacora(this.fallaParaGestionar.id,responseDialog.idUsuario,null,1,this.fallaParaGestionar.nivelSoporte);
                  this.subirArchivosAlServidor(this.fallaParaGestionar.id);
                  localStorage.setItem('success','escalado');
                  this.router.navigate(['/gestion-fallas']);
              }
          });
        }
      });
    }else{
      this.openSnackBarWarn('Llene los campos de ingeniero de soporte');
    }
  }

  cerrarCasoIngDeSoporte():void{
    if(this.formIngDeSoporte.valid){
      this.fallaParaGestionar.activo = true;
      this.fallaParaGestionar.discucion = this.formIngDeSoporte.value.discucion;
      this.fallaParaGestionar.conclusion = this.formIngDeSoporte.value.conclusion;
      this.fallaParaGestionar.recomendacion = this.formIngDeSoporte.value.recomendacion;
      this.fallaParaGestionar.idUsuarioReg = this.usuarioDeLaSession.id;
      const dialogCerrarCaso = this.matDialog.open(DialogCerrarFallaComponent,{
        disableClose:true,
        width:'380px', data:{text:'¿Estás seguro de que deseas cerrar este registro?'}
      });
      dialogCerrarCaso.afterClosed().subscribe(responseDialog=>{
        if(responseDialog){
          this.fallaParaGestionar.estado = 3;
          this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
            if(responseApi.success){
                this.guardarBitacora(this.fallaParaGestionar.id,this.fallaParaGestionar.responsable,null,3,this.fallaParaGestionar.nivelSoporte);
                this.subirArchivosAlServidor(this.fallaParaGestionar.id);
                localStorage.setItem('success','cerrado');
                this.router.navigate(['/gestion-fallas']); 
            }
          });
        }
      });
    }else{
      this.mensajeErrorDeCampos('Llene los campos de ingeniero de soporte');
    }
  }

  // DFSE

  guardarRegistroDFSE():void{
      this.fallaParaGestionar.activo = true;
      this.fallaParaGestionar.discucion = this.formIngDeSoporte.value.discucion;
      this.fallaParaGestionar.conclusion = this.formIngDeSoporte.value.conclusion;
      this.fallaParaGestionar.recomendacion = this.formIngDeSoporte.value.recomendacion;
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
        this.fallaParaGestionar.estado = 1;
        this.fallaParaGestionar.idUsuarioReg = this.usuarioDeLaSession.id;
        this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
          if(responseApi.success){
            this.guardarBitacora(this.fallaParaGestionar.id,this.fallaParaGestionar.responsable,null,1,2);
            this.subirArchivosAlServidor(this.fallaParaGestionar.id);
            this.registroExitosoDeLaFalla('true');
          }
      });
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
        this.fallaParaGestionar.idUsuarioReg = this.usuarioDeLaSession.id;
        this.fallaParaGestionar.estado = 1;
        this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
          if(responseApi.success){
              this.guardarBitacora(this.fallaParaGestionar.id,this.fallaParaGestionar.responsable,null,1,3);
              this.subirArchivosAlServidor(this.fallaParaGestionar.id);
              localStorage.setItem('success','escalado');
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

  cerrarCasoDfse():void{
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
        this.fallaParaGestionar.idUsuarioReg = this.usuarioDeLaSession.id;
        const dialogCerrarCaso = this.matDialog.open(DialogCerrarFallaComponent,{
          disableClose:true,
          width:'380px', data:{text:'¿Estás seguro de que deseas cerrar este registro?'}
        });
        dialogCerrarCaso.afterClosed().subscribe(responseDialog=>{
          if(responseDialog){
            this.fallaParaGestionar.estado = 3;
            this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
              if(responseApi.success){
                  this.guardarBitacora(this.fallaParaGestionar.id,this.fallaParaGestionar.responsable,null,3,this.fallaParaGestionar.nivelSoporte);
                  this.subirArchivosAlServidor(this.fallaParaGestionar.id);
                  localStorage.setItem('success','cerrado');
                  this.router.navigate(['/gestion-fallas']);
              }
            });
          }
        });
      }else{
        this.mensajeErrorDeCampos('Llene los campos DFSE');
      }
    }else{
      this.mensajeErrorDeCampos('Llene los campos de ingeniero de soporte');
    }
  }

  // FABRICA

  guardarRegistroFabrica():void{
      this.fallaParaGestionar.activo = true;
      this.fallaParaGestionar.discucion = this.formIngDeSoporte.value.discucion;
      this.fallaParaGestionar.conclusion = this.formIngDeSoporte.value.conclusion;
      this.fallaParaGestionar.recomendacion = this.formIngDeSoporte.value.recomendacion;
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
            this.fallaParaGestionar.conclusionesFabrica = this.formFabrica.value.conclusionesFabrica;
            this.fallaParaGestionar.comentariosFabrica = this.formFabrica.value.comentariosFabrica;
            this.fallaParaGestionar.idUsuarioReg = this.usuarioDeLaSession.id;
            this.fallaParaGestionar.estado = 1;
            this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
              if(responseApi.success){
                  this.guardarBitacora(this.fallaParaGestionar.id,this.fallaParaGestionar.responsable,null,1,this.fallaParaGestionar.nivelSoporte);
                  this.subirArchivosAlServidor(this.fallaParaGestionar.id);
                  this.registroExitosoDeLaFalla('true');
              }
            });
  }

  cerrarCaso():void{
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
        if(this.formFabrica.valid){
            this.fallaParaGestionar.conclusionesFabrica = this.formFabrica.value.conclusionesFabrica;
            this.fallaParaGestionar.comentariosFabrica = this.formFabrica.value.comentariosFabrica;
            this.fallaParaGestionar.idUsuarioReg = this.usuarioDeLaSession.id;
            const dialogCerrarCaso = this.matDialog.open(DialogCerrarFallaComponent,{
              disableClose:true,
              width:'380px', data:{text:'¿Estás seguro de que deseas cerrar este registro?'}
            });
            dialogCerrarCaso.afterClosed().subscribe(responseDialog=>{
              if(responseDialog){
                this.fallaParaGestionar.estado = 3;
                this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
                  if(responseApi.success){
                      this.guardarBitacora(this.fallaParaGestionar.id,this.fallaParaGestionar.responsable,null,3,this.fallaParaGestionar.nivelSoporte);
                      this.subirArchivosAlServidor(this.fallaParaGestionar.id);
                      localStorage.setItem('success','cerrado');
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

  // OBSERVAR FALLA

  observarFalla():void{
    const dialogObservedRecord = this.matDialog.open(DialogObservationComponent,{
      disableClose:true,width:'450px',data: {text:'¿Estás seguro de que deseas observar este registro?'}
    });
    dialogObservedRecord.afterClosed().subscribe(responseDialog=>{
      if(responseDialog.selection){
        const requestBitacora = {tipo:2, idEntidad:this.fallaParaGestionar.id, evaluador:1, comentarios:responseDialog.comentario, estado:2, nivelSoporteActual:this.fallaParaGestionar.nivelSoporte};
        this.garantiasService.saveBitacora(requestBitacora).subscribe(responseBitacora=>{
          if(responseBitacora.success){
            this.fallaParaGestionar.estado = 2;
            this.fallaParaGestionar.nivelSoporte = this.fallaParaGestionar.nivelSoporte - 1;
            this.fallasService.mantenimientoFallas(this.fallaParaGestionar).subscribe(responseApi=>{
              if(responseApi.success){
                localStorage.setItem('success','observado');
                this.router.navigate(['/gestion-fallas']);
              }
            });
          }
        });
      }
    });
  }

  // OTRAS FUNCIONES

  mensajeErrorDeCampos(mensaje:string):void{
    const dialogMensajeDeError = this.matDialog.open(DialogErrorMessageComponent,{
      width:'386px',
      disableClose:true,
      data:{text:mensaje}
    });
  }

  //mensaje registro exitoso

  registroExitosoDeLaFalla(accion:string):void{
    const dialogRegistroExitoso = this.matDialog.open(DialogDraftSavedSuccessfullyComponent,{
      disableClose:true,
      data: {text:'Se guardó el registro con éxito'},
      width:'386px'
    });
    dialogRegistroExitoso.afterClosed().subscribe(response=>{
      if(response){
        localStorage.setItem('success',accion);
        this.router.navigate(['/gestion-fallas']);
      }
    });
  }

  // abrir snack bar para los mensajes

  openSnackBarWarn(message:string):void{
    this.matSnackBar.openFromComponent(SnackBarMessageComponent, {
      data: message,
      duration: 3000,
      horizontalPosition:'center',
      verticalPosition: 'top',
      panelClass:['mat-toolbar', 'mat-primary','button-color']
    });
  }

  openSnackBarSuccess(message:string):void{
    this.matSnackBar.openFromComponent(SnackBarMessageComponent, {
      data: message,
      duration: 3000,
      horizontalPosition:'center',
      verticalPosition: 'top',
      panelClass:['mat-toolbar', 'mat-success','button-color']
    });
  }

  // abrir dialogo registro exitoso

  openDialogOperationSuccessfully(textDialog:string):void{
    const dialogOperationSuccessfully = this.matDialog.open(DialogOperationSuccessfullyComponent,{
      data:{text:textDialog}
    });
    dialogOperationSuccessfully.afterClosed().subscribe();
  }

  // mostrar el tracking number del nivel DFSE

  mostrarTrackingNumber():void{
    if(this.formDFSE.value.partsReturn=='si'){
      this.mostrarTrakingNumber = true;
    }
    if(this.formDFSE.value.partsReturn=='no'){
      this.mostrarTrakingNumber = false;
    }
  }

  //funciones para mostrar los select de quejas

  mostrarQueja(numeroDeQueja:number):void{
      switch (numeroDeQueja) {
        case 2:
          this.verQueja2 = true;
          break;
        case 3:
          this.verQueja3 = true;
          break;
        default:
          break;
      }
  }

  //ocultar queja

  ocultarQueja(numeroDeQueja:number):void{
      switch (numeroDeQueja) {
        case 2:
          this.verQueja3==true?this.openSnackBarWarn('No puede eliminar esta queja si existe otra siguiente'):this.verQueja2=false;
          break;
        case 3:
          this.verQueja3 = false;
          break;
        default:
          break;
      }
  }

  mostrarQuejasRegistradas():void{
    if(!(this.fallaParaGestionar.queja2==null)){
      this.verQueja2 = true;
    }
    if(!(this.fallaParaGestionar.queja3==null)){
      this.verQueja3 = true;
    }
  }

  agregarQueja():void{
      if(this.verQueja2==false){
          this.verQueja2 = true;
      }else{
          if(this.verQueja3==false){
              this.verQueja3 = true;
          }
      }
  }

  modalDescargarDocumentos():void{
    this.matDialog.open(DialogSeeDocumentsComponent,{
      data:{documentos:this.documentosParaDescargar},
      disableClose:true,
      width:'700px'
    });
  }

  deleteDocumentDetalleReclamo(name:any):void{
    const index = this.documentos.findIndex(e=>e.name==name);
    this.documentos.splice(index,1);
  }
}
