import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegisterEnrollmentComponent } from '../../dialogs/dialog-register-enrollment/dialog-register-enrollment.component';
import { Router } from '@angular/router';
import { DialogDraftSavedSuccessfullyComponent } from './../../dialogs/dialog-draft-saved-successfully/dialog-draft-saved-successfully.component';
import { DialogHistoriaESNComponent } from '../../dialogs/dialog-historia-esn/dialog-historia-esn.component';
import { GarantiasService } from 'app/shared/services/garantias/garantias.service';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { DialogRejectComponent } from 'app/shared/dialogs/dialog-reject/dialog-reject.component';
import { DialogObservationComponent } from 'app/shared/dialogs/dialog-observation/dialog-observation.component';
import { DialogTransformRecordToOrangeComponent } from '../../dialogs/dialog-transform-record-to-orange/dialog-transform-record-to-orange.component';
import { UserService } from 'app/core/user/user.service';
import { SnackBarMessageComponent } from 'app/shared/dialogs/snack-bar-message/snack-bar-message.component';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements OnInit {

  //variable para guardar el tipo de garantia ( de un motor o un generador) que se va a crear o editar
  typeWarrantyText:any;
  //variable para la acción que se va a realizar, si es crear o editar  
  action:any;
  //
  garantiaParaGestionar:any;

  matriculaEcontrada:any;
  ordenDeServicioEncontrado:any;
  
  //tipo de garantia juntos a sus campos
  warrantyTypes = [ {value: 1, name: "Producto Nuevo"},
                    {value: 2, name: "Motor Recon"},
                    {value: 3, name: "Repuesto Nuevo"},
                    {value: 4, name: "Repuesto Defectuoso"},
                    {value: 5, name: "Extendidad (CAP)"},
                    {value: 6, name: "Extendida Componente Mayor"},
                    {value: 7, name: "CDC Quality y Support y Campaña "},
                    {value: 8, name: "TRP"},
                    {value: 9, name: "ATC"},
                    {value: 10, name: "Warrany Memo"},]
  //para controlar la vista de cada tipo de garantia
  viewsTypesWarranty = {a:false,b:false,c:false,d:false,e:false,f:false,g:false,h:false,i:false,};
  //listado de las quejas
  complaints:any[];
  //formulario
  formRegisterEngine:FormGroup;
  //lista de usuarios provisional
  users=[{value:1,name:'Abel Nalvate Ramirez'},{value:2,name:'Alexander Flores Cisneros'},{value:3,name:'Alejandro Gonzales Sánchez'},];
  areaDeServicioAsociadoAlOrdenDeServicio:any; verQueja2 = false; verQueja3 = false; verQueja4 = false;
  usuarioDeLaSession:any; verCamposBandeja = -1;
  mostrarFechaGarantia=true; mostrarBis=true;
  mostrarProgressBarEsn : boolean = false; mostrarProgressBarOS : boolean = false; 

  constructor(private readonly matDialog: MatDialog, private readonly router: Router,private readonly garantiasService: GarantiasService,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService,private matSnackBar: MatSnackBar,
              private readonly userService:UserService) { }

  ngOnInit(): void {
    this.typeWarrantyText = localStorage.getItem('text'); //trae de localstorge el tipo de garantia a crear (motor o generador)
    this.action = localStorage.getItem('action'); //trae de localStorage el tipo de acción que se hará (crear e editar)
    this.configurationAndMaintenanceService.getEnum('02').subscribe(resp=>{
      // console.log(resp);
    });
    this.configurationAndMaintenanceService.listEnrollmentByEsn('100').subscribe(resp=>{
      // console.log(resp);
    });
    this.loadComplaints();
    this.loadFormRegisterEngine();
    this.userService.user$.subscribe(response=>{
      this.usuarioDeLaSession = response;
    });
  }

  loadComplaints():void{
    this.configurationAndMaintenanceService.listComplaints(1).subscribe(resp=>{
      this.complaints = resp.data;
    });
  }

  loadFormRegisterEngine():void{
    if(this.action=='new'){
      this.formRegisterEngine = new FormGroup({
        esn: new FormControl(),
        os: new FormControl(),
        //
        tipoGarantia: new FormControl(),
        puntoFalla: new FormControl(),
        medida: new FormControl(),
        fechaFalla: new FormControl(),
        fechaInicioGarantia: new FormControl(),
        numParteRepuesto: new FormControl(),
        numParteFallo: new FormControl(),
        codigoAdicional: new FormControl(),
        fechaAdicional: new FormControl(),
        ejecucionAdicional: new FormControl(),
        //
        idQueja1: new FormControl(),
        idQueja2: new FormControl(),
        idQueja3: new FormControl(),
        idQueja4: new FormControl(),
        comentarios: new FormControl(),
      })
    }else{
      this.garantiaParaGestionar = JSON.parse(localStorage.getItem('garantia')); //usar esta variable para llenar la data de la garantia a gestionar en el formulario
      this.verCamposBandeja = this.garantiaParaGestionar.bandeja;
      console.log(this.garantiaParaGestionar);
      this.formRegisterEngine = new FormGroup({
        esn: new FormControl(this.garantiaParaGestionar.esn,[Validators.required]),
        os: new FormControl(this.garantiaParaGestionar.os,[Validators.required]),
        //
        tipoGarantia: new FormControl(this.garantiaParaGestionar.idTipoGarantia,[Validators.required]),
        puntoFalla: new FormControl(this.garantiaParaGestionar.puntoFalla),
        medida: new FormControl(this.garantiaParaGestionar.medida),
        fechaFalla: new FormControl(this.garantiaParaGestionar.fechaFalla),
        fechaInicioGarantia: new FormControl(this.garantiaParaGestionar.fechaInicioGarantia),
        numParteRepuesto: new FormControl(this.garantiaParaGestionar.numParteRepuesto),
        numParteFallo: new FormControl(this.garantiaParaGestionar.numParteFallo),
        codigoAdicional: new FormControl(this.garantiaParaGestionar.codigoAdicional),
        fechaAdicional: new FormControl(this.garantiaParaGestionar.fechaAdicional),
        ejecucionAdicional: new FormControl(this.garantiaParaGestionar.ejecucionAdicional),
        //
        idQueja1: new FormControl(this.garantiaParaGestionar.idQueja1,[Validators.required]),
        idQueja2: new FormControl(this.garantiaParaGestionar.idQueja2,[Validators.required]),
        idQueja3: new FormControl(this.garantiaParaGestionar.idQueja3,[Validators.required]),
        idQueja4: new FormControl(this.garantiaParaGestionar.idQueja4,[Validators.required]),
        comentarios: new FormControl(this.garantiaParaGestionar.comentarios,[Validators.required])
      });
      this.getEsn();
      this.getOs();
      this.selectTypeWarranty();
      this.mostrarQuejasIngresadas();
    }
  }

  getEsn():void{
    const esn = this.formRegisterEngine.value.esn;
    if(esn!=''){
      this.mostrarProgressBarEsn = true;
      this.garantiasService.findEsn(esn).subscribe(resp=>{
        if(resp.body){
          this.mostrarProgressBarEsn = false;
          this.matriculaEcontrada = resp.body;
          this.mostrarBis = this.matriculaEcontrada.fechaInicio? false:true;
          this.mostrarFechaGarantia = this.matriculaEcontrada.fechaInicio? true:false;
        }else{
          this.openSnackBar('Matricula no registrada');
          this.matriculaEcontrada = null;
        }
      })
    }else{
      this.openSnackBar('Ingrese un valor');
      this.matriculaEcontrada = null;
    }
  }

  // getOsEdit(valor:any):void{
  //   this.garantiasService.findOs(valor).subscribe(resp=>{
  //     if(resp.body){
  //       this.ordenDeServicioEncontrado = resp.body;
  //       this.configurationAndMaintenanceService.findServiceAreaByOS(resp.body.ceco,resp.body.codAreaServicios).subscribe(responseApi=>{
  //         this.areaDeServicioAsociadoAlOrdenDeServicio = responseApi.data[0];
  //       });
  //     }else{
  //       this.openSnackBar('No existe el OS');
  //       this.ordenDeServicioEncontrado = null;
  //     }
  //   })
  // }
  
  getOs():void{
    const os = this.formRegisterEngine.value.os;
    if(os!=''){
      this.mostrarProgressBarOS = true;
      this.garantiasService.findOs(os).subscribe(resp=>{
        if(resp.body){
          this.mostrarProgressBarOS = false;
          this.ordenDeServicioEncontrado = resp.body;
          this.configurationAndMaintenanceService.findServiceAreaByOS(resp.body.ceco,resp.body.codAreaServicios).subscribe(responseApi=>{
            this.areaDeServicioAsociadoAlOrdenDeServicio = responseApi.data[0];
          });
        }else{
          this.openSnackBar('No existe el OS ingresado, pruebe con otro');
          this.ordenDeServicioEncontrado = null;
        }
      })
    }else{
      this.openSnackBar('Ingrese el OS');
      this.ordenDeServicioEncontrado = null;
    }
  }

  onOpenDialogRegisterEnrollment():void{
    const dialogNewEnrollment = this.matDialog.open(DialogRegisterEnrollmentComponent,{
          width: '990px',
          data: {option:'new',type:this.typeWarrantyText, name:'motor'},
          disableClose:true
        }
      );
    dialogNewEnrollment.afterClosed().subscribe(resp=>{
      if(resp){
        this.openDialogOperationSuccessfully('Matricula creada con éxito');
      }else{
        console.log('operacion cancelada');        
      }
    });
  }
  
  onGarantias():void{
    this.router.navigate(['/garantias']);
  }

  onOpenDialogHistoryEsn():void{
    const dialogHistoriaEsn = this.matDialog.open(DialogHistoriaESNComponent,{
      data:{type:this.typeWarrantyText},
      width: '900px'
    });
  }

  selectTypeWarranty(){
    switch (this.formRegisterEngine.value.tipoGarantia) {
      case 1:
        this.viewsTypesWarranty.a = true;
        this.viewsTypesWarranty.b = true;
        this.viewsTypesWarranty.c = true;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = false;
        this.viewsTypesWarranty.h = false;
        this.viewsTypesWarranty.i = false;
        break;
      case 2:
        this.viewsTypesWarranty.a = true;
        this.viewsTypesWarranty.b = true;
        this.viewsTypesWarranty.c = true;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = false;
        this.viewsTypesWarranty.h = false;
        this.viewsTypesWarranty.i = false;
        break;
      case 3:
        this.viewsTypesWarranty.a = true;
        this.viewsTypesWarranty.b = true;
        this.viewsTypesWarranty.c = true;
        this.viewsTypesWarranty.d = true;
        this.viewsTypesWarranty.e = true;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = false;
        this.viewsTypesWarranty.h = false;
        this.viewsTypesWarranty.i = false;
        break;
      case 4:
        this.viewsTypesWarranty.a = true;
        this.viewsTypesWarranty.b = true;
        this.viewsTypesWarranty.c = true;
        this.viewsTypesWarranty.d = true;
        this.viewsTypesWarranty.e = true;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = false;
        this.viewsTypesWarranty.h = false;
        this.viewsTypesWarranty.i = false;
        break;
      case 5:
        this.viewsTypesWarranty.a = true;
        this.viewsTypesWarranty.b = true;
        this.viewsTypesWarranty.c = true;
        this.viewsTypesWarranty.d = true;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = false;
        this.viewsTypesWarranty.h = false;
        this.viewsTypesWarranty.i = false;
        break;
      case 6:
        this.viewsTypesWarranty.a = true;
        this.viewsTypesWarranty.b = true;
        this.viewsTypesWarranty.c = true;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = true;
        this.viewsTypesWarranty.g = false;
        this.viewsTypesWarranty.h = false;
        this.viewsTypesWarranty.i = false;
        break;
      case 7:
        this.viewsTypesWarranty.a = false;
        this.viewsTypesWarranty.b = true;
        this.viewsTypesWarranty.c = false;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = true;
        this.viewsTypesWarranty.h = true;
        this.viewsTypesWarranty.i = true;
        break;
      case 8:
        this.viewsTypesWarranty.a = false;
        this.viewsTypesWarranty.b = true;
        this.viewsTypesWarranty.c = false;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = true;
        this.viewsTypesWarranty.h = true;
        this.viewsTypesWarranty.i = true;
        break;
      case 9:
        this.viewsTypesWarranty.a = false;
        this.viewsTypesWarranty.b = true;
        this.viewsTypesWarranty.c = false;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = true;
        this.viewsTypesWarranty.h = true;
        this.viewsTypesWarranty.i = true;
        break;
      case 10:
        this.viewsTypesWarranty.a = false;
        this.viewsTypesWarranty.b = true;
        this.viewsTypesWarranty.c = false;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = true;
        this.viewsTypesWarranty.h = true;
        this.viewsTypesWarranty.i = true;
       break;    
      default:
        break;
    }
  }

  openDialogOperationSuccessfully(textDialog:string):void{
    const dialogOperationSuccessfully = this.matDialog.open(DialogOperationSuccessfullyComponent,{
      data:{text:textDialog}
    });
    dialogOperationSuccessfully.afterClosed().subscribe();
  }

  onOpenDialogSaveDraft():void{
    const dialogSaveDraft = this.matDialog.open(DialogDraftSavedSuccessfullyComponent, {
      disableClose:true,
      data: {text:'Se guardo el borrador extosamente'}
    });
    dialogSaveDraft.afterClosed().subscribe(resp=>{
      if(resp){
        this.router.navigate(['/garantias']);
      }
    })
  }
  
  openSnackBar(message:string):void{
    this.matSnackBar.openFromComponent(SnackBarMessageComponent, {
      data: message,
      duration: 3000,
      horizontalPosition:'center',
      verticalPosition: 'top',
      panelClass:['mat-toolbar', 'mat-primary','button-color']
    });
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
      case 4:
        this.verQueja4 = true;
        break;
      default:
        break;
    }
  }

  agregarQueja():void{
    if(this.verQueja2==false){
      this.verQueja2 = true;
    }else{
      if(this.verQueja3==false){
        this.verQueja3 = true;
      }else{
        if(this.verQueja4==false){
          this.verQueja4 = true;
        }
      }
    }
  }

  //ocultar queja

  ocultarQueja(numeroDeQueja:number):void{
    switch (numeroDeQueja) {
      case 2:
        if(this.verQueja3==true){
          this.openSnackBar('No puede eliminar esta queja si existe otra siguiente')
        }else{
          this.verQueja2 = false;
        }
        break;
      case 3:
        if(this.verQueja4==true){
          this.openSnackBar('No puede eliminar esta queja si existe otra siguiente')
        }else{
          this.verQueja3 = false;
        }
        break;
      case 4:
        this.verQueja4 = false;
        break;
      default:
        break;
    }
  }

  // MOSTRAR LAS QUEJAS PERTINENTES

  mostrarQuejasIngresadas():void{
    if(this.garantiaParaGestionar.idQueja2!=null){
      this.verQueja2 = true;
    }
    if(this.garantiaParaGestionar.idQueja3!=null){
      this.verQueja3 = true;
    }
    if(this.garantiaParaGestionar.idQueja4!=null){
      this.verQueja4 = true;
    }
  }

  // GUARDAR BORRADOR (REGISTRO NUEVO)

  guardarBorradorRegistroNuevo():void{
    if(!(this.matriculaEcontrada==null)){
      if(!(this.ordenDeServicioEncontrado==null)){
          if(this.verQueja2==false){this.formRegisterEngine.value.idQueja2=null}
          if(this.verQueja3==false){this.formRegisterEngine.value.idQueja3=null}
          if(this.verQueja4==false){this.formRegisterEngine.value.idQueja4=null}
          this.formRegisterEngine.value.codAreaServicios=this.ordenDeServicioEncontrado?this.ordenDeServicioEncontrado.codAreaServicios:null;
          const request = {
                id:0,
                activo:true,
                bandeja:0,
                idMatricula:this.matriculaEcontrada?this.matriculaEcontrada.id:null,
                codCeco:this.ordenDeServicioEncontrado?this.ordenDeServicioEncontrado.ceco:null,
                idAreaServicio:this.areaDeServicioAsociadoAlOrdenDeServicio?this.areaDeServicioAsociadoAlOrdenDeServicio.id:null,
                idUsuarioEvaluador: this.usuarioDeLaSession.id, //para usuario registrador
                ...this.formRegisterEngine.value
            };
          this.garantiasService.saveWarranty(request).subscribe(responseApiGarantia=>{
              if(responseApiGarantia.success){
                  const requestBitacora = {
                        tipo:1,
                        idEntidad:responseApiGarantia.body.id,
                        evaluador:1,
                        comentarios:null,
                        estado:1,
                        monto:0,
                        bandejaActual:0,
                    };
                  this.garantiasService.saveBitacora(requestBitacora).subscribe(responseApiBitacora=>{
                        if(responseApiBitacora.success){
                            localStorage.setItem('success','borrador');
                            this.router.navigate(['/garantias']);
                        }
                  });
              }
          });
      }else{        
          this.mostrarMensajeDeError('Matrícula y Orden de Servicio obligatorios para un borrador');
      }
  }else{
      this.mostrarMensajeDeError('Matrícula y Orden de Servicio obligatorios para un borrador');
  }


  }

  //GUARDAR BANDEJA BLANCA (REGISTRO NUEVO)

  guardarBandejaBlancaRegistroNuevo():void{
      if(!(this.matriculaEcontrada==null)){
          if(!(this.ordenDeServicioEncontrado==null)){
              if(!(this.formRegisterEngine.value.tipoGarantia==null)){
                  if(!(this.formRegisterEngine.value.idQueja1==null)){
                      if(!(this.formRegisterEngine.value.comentarios=='')){
                        if(this.verQueja2==false){this.formRegisterEngine.value.idQueja2=null}
                        if(this.verQueja3==false){this.formRegisterEngine.value.idQueja3=null}
                        if(this.verQueja4==false){this.formRegisterEngine.value.idQueja4=null}
                        this.formRegisterEngine.value.codAreaServicios=this.ordenDeServicioEncontrado?this.ordenDeServicioEncontrado.codAreaServicios:null;
                        const request = {
                              id:0,
                              activo:true,
                              bandeja:1,
                              idMatricula:this.matriculaEcontrada.id,
                              codCeco:this.ordenDeServicioEncontrado.ceco,
                              idAreaServicio:this.ordenDeServicioEncontrado?this.ordenDeServicioEncontrado.id:null,
                              idUsuarioEvaluador: this.usuarioDeLaSession.id, //para usuario registrador
                              ...this.formRegisterEngine.value
                          };
                        this.garantiasService.saveWarranty(request).subscribe(responseApiGarantia=>{
                            if(responseApiGarantia.success){
                                const requestBitacora = {
                                      tipo:1,
                                      idEntidad:responseApiGarantia.body.id,
                                      evaluador:1,
                                      comentarios:null,
                                      estado:1,
                                      monto:0,
                                      bandejaActual:0,
                                  };
                                this.garantiasService.saveBitacora(requestBitacora).subscribe(responseApiBitacora=>{
                                      if(responseApiBitacora.success){
                                          localStorage.setItem('success','registroBlanco');
                                          this.router.navigate(['/garantias']);
                                      }
                                });
                            }
                        });
                      }else{
                          this.mostrarMensajeDeError('Escriba comentarios');
                      }
                  }else{
                      this.mostrarMensajeDeError('Seleccione al menos una queja');
                  }
              }else{
                  this.mostrarMensajeDeError('Seleccione un tipo de garantía')
              }
          }else{
              this.mostrarMensajeDeError('OS Invalido');
          }
      }else{
          this.mostrarMensajeDeError('ESN Invalido');
      }
  }

  // EDITAR BORRADOR EXISTENTE

  editarBorrador():void{
    this.garantiaParaGestionar.idMatricula=this.matriculaEcontrada.id;
    this.garantiaParaGestionar.codAreaServicios = this.ordenDeServicioEncontrado.codAreaServicios;
    this.garantiaParaGestionar.codCeco = this.ordenDeServicioEncontrado.ceco;
    this.garantiaParaGestionar.idUsuarioEvaluador = this.usuarioDeLaSession.id;
    this.garantiaParaGestionar.esn = this.formRegisterEngine.value.esn
    this.garantiaParaGestionar.os = this.formRegisterEngine.value.os
    this.garantiaParaGestionar.tipoGarantia = this.formRegisterEngine.value.tipoGarantia
    this.garantiaParaGestionar.puntoFalla = this.formRegisterEngine.value.puntoFalla
    this.garantiaParaGestionar.medida = this.formRegisterEngine.value.medida
    this.garantiaParaGestionar.fechaFalla = this.formRegisterEngine.value.fechaFalla
    this.garantiaParaGestionar.fechaInicioGarantia = this.formRegisterEngine.value.fechaInicioGarantia
    this.garantiaParaGestionar.fechaInicioGarantia = this.formRegisterEngine.value.fechaInicioGarantia
    this.garantiaParaGestionar.numParteFallo = this.formRegisterEngine.value.numParteFallo
    this.garantiaParaGestionar.codigoAdicional = this.formRegisterEngine.value.codigoAdicional
    this.garantiaParaGestionar.fechaAdicional = this.formRegisterEngine.value.fechaAdicional
    this.garantiaParaGestionar.ejecucionAdicional = this.formRegisterEngine.value.ejecucionAdicional
    this.garantiaParaGestionar.idQueja1 = this.formRegisterEngine.value.idQueja1
    this.garantiaParaGestionar.idQueja2 = this.formRegisterEngine.value.idQueja2
    this.garantiaParaGestionar.idQueja3 = this.formRegisterEngine.value.idQueja3
    this.garantiaParaGestionar.idQueja4 = this.formRegisterEngine.value.idQueja4
    this.garantiaParaGestionar.comentarios = this.formRegisterEngine.value.comentarios    
    this.garantiasService.saveWarranty(this.garantiaParaGestionar).subscribe(responseApiGarantia=>{
      if(responseApiGarantia.success){
        const requestBitacora = {
              tipo:1,
              idEntidad:this.garantiaParaGestionar.id,
              evaluador:1,
              comentarios:null,
              estado:1,
              monto:0,
              bandejaActual:0,
          };
        
        this.garantiasService.saveBitacora(requestBitacora).subscribe(responseApiBitacora=>{
              if(responseApiBitacora.success){
                  localStorage.setItem('success','editado');
                  this.router.navigate(['/garantias']);
              }
        });
    }
    });
  }

  // ENVIAR BORRADOR EXISTENTE A BLANCA

  enviarBorradorParaBandejaBlanca():void{
    if(!(this.matriculaEcontrada==null)){
      if(!(this.ordenDeServicioEncontrado==null)){
          if(!(this.formRegisterEngine.value.tipoGarantia==null)){
              if(!(this.formRegisterEngine.value.idQueja1==null)){
                  if(!(this.formRegisterEngine.value.comentarios=='')){
                      if(this.verQueja2==false){this.formRegisterEngine.value.idQueja2=null}
                      if(this.verQueja3==false){this.formRegisterEngine.value.idQueja3=null}
                      if(this.verQueja4==false){this.formRegisterEngine.value.idQueja4=null}
                      this.garantiaParaGestionar.idMatricula=this.matriculaEcontrada.id;
                      this.garantiaParaGestionar.codAreaServicios = this.ordenDeServicioEncontrado.codAreaServicios;
                      this.garantiaParaGestionar.codCeco = this.ordenDeServicioEncontrado.ceco;
                      this.garantiaParaGestionar.idUsuarioEvaluador = this.usuarioDeLaSession.id;
                      this.garantiaParaGestionar.esn = this.formRegisterEngine.value.esn;
                      this.garantiaParaGestionar.os = this.formRegisterEngine.value.os;
                      this.garantiaParaGestionar.tipoGarantia = this.formRegisterEngine.value.tipoGarantia;
                      this.garantiaParaGestionar.puntoFalla = this.formRegisterEngine.value.puntoFalla;
                      this.garantiaParaGestionar.medida = this.formRegisterEngine.value.medida;
                      this.garantiaParaGestionar.fechaFalla = this.formRegisterEngine.value.fechaFalla;
                      this.garantiaParaGestionar.fechaInicioGarantia = this.formRegisterEngine.value.fechaInicioGarantia;
                      this.garantiaParaGestionar.fechaInicioGarantia = this.formRegisterEngine.value.fechaInicioGarantia;
                      this.garantiaParaGestionar.numParteFallo = this.formRegisterEngine.value.numParteFallo;
                      this.garantiaParaGestionar.codigoAdicional = this.formRegisterEngine.value.codigoAdicional;
                      this.garantiaParaGestionar.fechaAdicional = this.formRegisterEngine.value.fechaAdicional;
                      this.garantiaParaGestionar.ejecucionAdicional = this.formRegisterEngine.value.ejecucionAdicional;
                      this.garantiaParaGestionar.idQueja1 = this.formRegisterEngine.value.idQueja1;
                      this.garantiaParaGestionar.idQueja2 = this.formRegisterEngine.value.idQueja2;
                      this.garantiaParaGestionar.idQueja3 = this.formRegisterEngine.value.idQueja3;
                      this.garantiaParaGestionar.idQueja4 = this.formRegisterEngine.value.idQueja4;
                      this.garantiaParaGestionar.comentarios = this.formRegisterEngine.value.comentarios;
                      this.garantiaParaGestionar.bandeja = 1;
                      this.garantiasService.saveWarranty(this.garantiaParaGestionar).subscribe(responseApiGarantia=>{
                        if(responseApiGarantia.success){
                          const requestBitacora = {
                                tipo:1,
                                idEntidad:this.garantiaParaGestionar.id,
                                evaluador:1,
                                comentarios:null,
                                estado:1,
                                monto:0,
                                bandejaActual:1,
                            };
                          
                          this.garantiasService.saveBitacora(requestBitacora).subscribe(responseApiBitacora=>{
                                if(responseApiBitacora.success){
                                    localStorage.setItem('success','registroBlanco');
                                    this.router.navigate(['/garantias']);
                                }
                          });
                      }
                      });
                  }else{
                      this.mostrarMensajeDeError('Escriba comentarios');
                  }
              }else{
                  this.mostrarMensajeDeError('Seleccione al menos una queja');
              }
          }else{
              this.mostrarMensajeDeError('Seleccione un tipo de garantía')
          }
      }else{
          this.mostrarMensajeDeError('OS Invalido');
      }
  }else{
      this.mostrarMensajeDeError('ESN Invalido');
    }
  }

  // EDITAR REGISTRO BLANCO

  guardarBlancoEditado():void{
    this.garantiaParaGestionar.idMatricula=this.matriculaEcontrada.id;
    this.garantiaParaGestionar.codAreaServicios = this.ordenDeServicioEncontrado.codAreaServicios;
    this.garantiaParaGestionar.codCeco = this.ordenDeServicioEncontrado.ceco;
    this.garantiaParaGestionar.idUsuarioEvaluador = this.usuarioDeLaSession.id;;
    this.garantiaParaGestionar.esn = this.formRegisterEngine.value.esn;
    this.garantiaParaGestionar.os = this.formRegisterEngine.value.os;
    this.garantiaParaGestionar.tipoGarantia = this.formRegisterEngine.value.tipoGarantia;
    this.garantiaParaGestionar.puntoFalla = this.formRegisterEngine.value.puntoFalla;
    this.garantiaParaGestionar.medida = this.formRegisterEngine.value.medida;
    this.garantiaParaGestionar.fechaFalla = this.formRegisterEngine.value.fechaFalla;
    this.garantiaParaGestionar.fechaInicioGarantia = this.formRegisterEngine.value.fechaInicioGarantia;
    this.garantiaParaGestionar.fechaInicioGarantia = this.formRegisterEngine.value.fechaInicioGarantia;
    this.garantiaParaGestionar.numParteFallo = this.formRegisterEngine.value.numParteFallo;
    this.garantiaParaGestionar.codigoAdicional = this.formRegisterEngine.value.codigoAdicional;
    this.garantiaParaGestionar.fechaAdicional = this.formRegisterEngine.value.fechaAdicional;
    this.garantiaParaGestionar.ejecucionAdicional = this.formRegisterEngine.value.ejecucionAdicional;
    this.garantiaParaGestionar.idQueja1 = this.formRegisterEngine.value.idQueja1;
    this.garantiaParaGestionar.idQueja2 = this.formRegisterEngine.value.idQueja2;
    this.garantiaParaGestionar.idQueja3 = this.formRegisterEngine.value.idQueja3;
    this.garantiaParaGestionar.idQueja4 = this.formRegisterEngine.value.idQueja4;
    this.garantiaParaGestionar.comentarios = this.formRegisterEngine.value.comentarios;
    this.garantiaParaGestionar.estado = 1;
    this.garantiasService.saveWarranty(this.garantiaParaGestionar).subscribe(responseApiGarantia=>{
      if(responseApiGarantia.success){
        const requestBitacora = {
              tipo:1,
              idEntidad:this.garantiaParaGestionar.id,
              evaluador:1,
              comentarios:null,
              estado:1,
              monto:0,
              bandejaActual:1,
          };        
        this.garantiasService.saveBitacora(requestBitacora).subscribe(responseApiBitacora=>{
              if(responseApiBitacora.success){
                  localStorage.setItem('success','editado');
                  this.router.navigate(['/garantias']);
              }
        });
    }
    });
  }

  // ENVIAR REGISTRO BLANCO A NARANJA

  enviarBlancaParaNaranja():void{
    if(!(this.matriculaEcontrada==null)){
      if(!(this.ordenDeServicioEncontrado==null)){
          if(!(this.formRegisterEngine.value.tipoGarantia==null)){
              if(!(this.formRegisterEngine.value.idQueja1==null)){
                  if(!(this.formRegisterEngine.value.comentarios=='')){
                      if(this.verQueja2==false){this.formRegisterEngine.value.idQueja2=null}
                      if(this.verQueja3==false){this.formRegisterEngine.value.idQueja3=null}
                      if(this.verQueja4==false){this.formRegisterEngine.value.idQueja4=null}
                      this.garantiaParaGestionar.idMatricula=this.matriculaEcontrada.id;
                      this.garantiaParaGestionar.codAreaServicios = this.ordenDeServicioEncontrado.codAreaServicios;
                      this.garantiaParaGestionar.codCeco = this.ordenDeServicioEncontrado.ceco;
                      this.garantiaParaGestionar.idUsuarioEvaluador = this.usuarioDeLaSession.id;
                      this.garantiaParaGestionar.esn = this.formRegisterEngine.value.esn;
                      this.garantiaParaGestionar.os = this.formRegisterEngine.value.os;
                      this.garantiaParaGestionar.tipoGarantia = this.formRegisterEngine.value.tipoGarantia;
                      this.garantiaParaGestionar.puntoFalla = this.formRegisterEngine.value.puntoFalla;
                      this.garantiaParaGestionar.medida = this.formRegisterEngine.value.medida;
                      this.garantiaParaGestionar.fechaFalla = this.formRegisterEngine.value.fechaFalla;
                      this.garantiaParaGestionar.fechaInicioGarantia = this.formRegisterEngine.value.fechaInicioGarantia;
                      this.garantiaParaGestionar.fechaInicioGarantia = this.formRegisterEngine.value.fechaInicioGarantia;
                      this.garantiaParaGestionar.numParteFallo = this.formRegisterEngine.value.numParteFallo;
                      this.garantiaParaGestionar.codigoAdicional = this.formRegisterEngine.value.codigoAdicional;
                      this.garantiaParaGestionar.fechaAdicional = this.formRegisterEngine.value.fechaAdicional;
                      this.garantiaParaGestionar.ejecucionAdicional = this.formRegisterEngine.value.ejecucionAdicional;
                      this.garantiaParaGestionar.idQueja1 = this.formRegisterEngine.value.idQueja1;
                      this.garantiaParaGestionar.idQueja2 = this.formRegisterEngine.value.idQueja2;
                      this.garantiaParaGestionar.idQueja3 = this.formRegisterEngine.value.idQueja3;
                      this.garantiaParaGestionar.idQueja4 = this.formRegisterEngine.value.idQueja4;
                      this.garantiaParaGestionar.comentarios = this.formRegisterEngine.value.comentarios;
                      this.garantiaParaGestionar.estado = 1;
                      this.garantiaParaGestionar.bandeja = 2;
                      const dialogTransforRecordToOrange = this.matDialog.open(DialogTransformRecordToOrangeComponent,{
                        disableClose:true,
                        width:'936px',
                        data:{idGarantia:this.garantiaParaGestionar.id}
                      });
                      dialogTransforRecordToOrange.afterClosed().subscribe(responseDialog=>{
                          if(responseDialog){
                              this.garantiasService.saveWarranty(this.garantiaParaGestionar).subscribe(responseApiGarantia=>{
                                if(responseApiGarantia.success){
                                  const requestBitacora = {
                                        tipo:1,
                                        idEntidad:this.garantiaParaGestionar.id,
                                        evaluador:1,
                                        comentarios:null,
                                        estado:1,
                                        monto:0,
                                        bandejaActual:2,
                                    };
                                  
                                  this.garantiasService.saveBitacora(requestBitacora).subscribe(responseApiBitacora=>{
                                        if(responseApiBitacora.success){
                                            localStorage.setItem('success','registroNaranja');
                                            this.router.navigate(['/garantias']);
                                        }
                                  });
                              }
                              });
                          }
                        });
                  }else{
                      this.mostrarMensajeDeError('Escriba comentarios');
                  }
              }else{
                  this.mostrarMensajeDeError('Seleccione al menos una queja');
              }
          }else{
              this.mostrarMensajeDeError('Seleccione un tipo de garantía')
          }
      }else{
          this.mostrarMensajeDeError('OS Invalido');
      }
  }else{
      this.mostrarMensajeDeError('ESN Invalido');
    }
  }
  // RECHAZAR REGISTRO

  rechazarRegistro():void{
    const dialogReject = this.matDialog.open(DialogRejectComponent,{
      disableClose:true,width:'380px',data: {text:'¿Estás seguro de rechazar este registro?',description:'Al hacerlo el registro ingresará a una bandeja negra'}
    });
    dialogReject.afterClosed().subscribe(responseDialog=>{
      if(responseDialog.selection){
        const requestBitacora = {
          tipo:1,
          idEntidad:this.garantiaParaGestionar.id,
          evaluador:1,
          comentarios:responseDialog.comentario,
          estado:4,
          monto:0,
          bandejaActual:this.garantiaParaGestionar.bandeja,
        };
    this.garantiasService.saveBitacora(requestBitacora).subscribe(responseBitacora=>{
      if(responseBitacora.success){
          this.garantiaParaGestionar.estado = 4;
          this.garantiaParaGestionar.codCeco = this.garantiaParaGestionar.ceco;
          this.garantiaParaGestionar.codAreaServicios = this.garantiaParaGestionar.codAreaServicioSap;
          this.garantiasService.saveWarranty(this.garantiaParaGestionar).subscribe(responseGarantia=>{
            if(responseGarantia.success){
              localStorage.setItem('success','rechazado');
              this.router.navigate(['/garantias']);
            }
          });
      }
    });
      }
    });
  }

  //OBSERVAR REGISTRO

  observarRegistro():void{
    const dialogObservedRecord = this.matDialog.open(DialogObservationComponent,{
      disableClose:true,width:'380px',data: {text:'¿Estás seguro de que deseas observar este registro?'}
    });
    dialogObservedRecord.afterClosed().subscribe(responseDialog=>{
        if(responseDialog.selection){
            this.garantiaParaGestionar.codCeco = this.garantiaParaGestionar.ceco;
            this.garantiaParaGestionar.codAreaServicios = this.garantiaParaGestionar.codAreaServicioSap;
            this.garantiaParaGestionar.estado = 2;
            this.garantiasService.saveWarranty(this.garantiaParaGestionar).subscribe(responseGarantia=>{
              if(responseGarantia.success){
                const requestBitacora = {
                  tipo:1,
                  idEntidad:this.garantiaParaGestionar.id,
                  evaluador:1,
                  comentarios:responseDialog.comentario,
                  estado:2,
                  monto:0,
                  bandejaActual:this.garantiaParaGestionar.bandeja,
                };
                this.garantiasService.saveBitacora(requestBitacora).subscribe(responseBitacora=>{
                    if(responseBitacora.success){
                      localStorage.setItem('success','observado');
                      this.router.navigate(['/garantias']);      
                    }
                });

              }
            });
      }
    });
  }

  //TEXTO SEGUN TIPO DE GARANTIA

  textoSegunTipoDeGarantia(tipoDeGarantia:number):string{
    switch(tipoDeGarantia){
      case 3: return 'del repuesto';
      break;
      case 4: return 'del repuesto';
      break;
      case 7: return 'de campaña';
      break;
      case 8: return 'de TRP';
      break;
      case 9: return 'de ATC';
      break;
      case 10: return 'de Warrany Memo';
      break;
      default: return ''
        break;
    }
  }
  //mensaje de error

  mostrarMensajeDeError(mensaje:string):void{
    const dialogError = this.matDialog.open(DialogErrorMessageComponent,
      {data:{text:mensaje},
      disableClose:true
    });
  }
}
