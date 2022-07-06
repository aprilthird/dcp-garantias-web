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
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { DialogRejectComponent } from 'app/shared/dialogs/dialog-reject/dialog-reject.component';
import { DialogObservationComponent } from 'app/shared/dialogs/dialog-observation/dialog-observation.component';
import { DialogTransformRecordToOrangeComponent } from '../../dialogs/dialog-transform-record-to-orange/dialog-transform-record-to-orange.component';
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
  warranty:any;
  //para usarlo como data inicial del esn y donde se va a cargar el esn que se va a usar en la garantía
  esn = {id:'-',cliente:'-',direccion:'-',aplicacion:'-',modelo:'-',cpl:'-',etoPto:'-',fechaInicioGarantia:'-',bis:false};
  //para usarlo como data inicial del os y donde se va a cargar el os que se va a usar en la garantía
  os = {claseActividad:'-' ,codAreaServicios:'-' ,fechaLib:'-', os:'-', bu:'-',ceco:'-'};
  //tipo de garantia juntos a sus campos
  warrantyTypes = [ {value: 1, name: "Producto Nuevo"},{value: 2, name: "Motor Recon"},{value: 3, name: "Repuesto Nuevo"},{value: 4, name: "Repuesto Defectuoso"},{value: 5, name: "Cap"},{value: 6, name: "Extendida Mayor"},{value: 7, name: "Cdc"},{value: 8, name: "Trp"},{value: 9, name: "Atc"},{value: 10, name: "Memo"},]
  //para controlar la vista de cada tipo de garantia
  viewsTypesWarranty = {a:false,b:false,c:false,d:false,e:false,f:false,g:false,h:false,i:false,};
  //listado de las quejas
  complaints:any[];
  //formulario
  formRegisterEngine:FormGroup;
  //configuraciones para el snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  //lista de usuarios provisional
  users=[{value:1,name:'Abel Nalvate Ramirez'},{value:2,name:'Alexander Flores Cisneros'},{value:3,name:'Alejandro Gonzales Sánchez'},];
  areaDeServicioAsociado = '-';
  verQueja2 = false; verQueja3 = false; verQueja4 = false;
  
  constructor(private readonly matDialog: MatDialog, private readonly router: Router,private readonly garantiasService: GarantiasService,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService,private _snackBar: MatSnackBar) { }

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
  }

  loadComplaints():void{
    this.configurationAndMaintenanceService.listComplaints(1).subscribe(resp=>{
      this.complaints = resp.data;
    });
  }

  loadFormRegisterEngine():void{
    if(this.action=='new'){
      this.formRegisterEngine = new FormGroup({
        esn: new FormControl(''),
        os: new FormControl(''),
        //
        tipoGarantia: new FormControl(null),
        puntoFalla: new FormControl(''),
        medida: new FormControl(),
        fechaFalla: new FormControl(),
        fechaInicioGarantia: new FormControl(),
        numParteRepuesto: new FormControl(''),
        numParteFallo: new FormControl(''),
        codigoAdicional: new FormControl(''),
        fechaAdicional: new FormControl(),
        ejecucionAdicional: new FormControl(''),
        //
        idQueja1: new FormControl(null),
        idQueja2: new FormControl(null),
        idQueja3: new FormControl(null),
        idQueja4: new FormControl(null),
        idUsuarioEvaluador: new FormControl(null),
        comentarios: new FormControl('')
      })
    }else{
      this.warranty = JSON.parse(localStorage.getItem('garantia')); //usar esta variable para llenar la data de la garantia a gestionar en el formulario
      console.log(this.warranty);
      this.formRegisterEngine = new FormGroup({
        esn: new FormControl(this.warranty.esn,[Validators.required]),
        os: new FormControl(this.warranty.os,[Validators.required]),
        //
        tipoGarantia: new FormControl(this.warranty.idTipoGarantia,[Validators.required]),
        puntoFalla: new FormControl(this.warranty.puntoFalla),
        medida: new FormControl(this.warranty.medida),
        fechaFalla: new FormControl(this.warranty.fechaFalla),
        fechaInicioGarantia: new FormControl(this.warranty.fechaInicioGarantia),
        numParteRepuesto: new FormControl(this.warranty.numParteRepuesto),
        numParteFallo: new FormControl(this.warranty.numParteFallo),
        codigoAdicional: new FormControl(this.warranty.codigoAdicional),
        fechaAdicional: new FormControl(this.warranty.fechaAdicional),
        ejecucionAdicional: new FormControl(this.warranty.ejecucionAdicional),
        //
        idQueja1: new FormControl(this.warranty.idQueja1,[Validators.required]),
        idQueja2: new FormControl(this.warranty.idQueja2,[Validators.required]),
        idQueja3: new FormControl(this.warranty.idQueja3,[Validators.required]),
        idQueja4: new FormControl(this.warranty.idQueja4,[Validators.required]),
        idUsuarioEvaluador: new FormControl(this.warranty.idUsuarioEvaluador,[Validators.required]),
        comentarios: new FormControl(this.warranty.comentarios,[Validators.required])
      });
      this.getEsn();
      this.getOs();
      this.selectTypeWarranty();
    }
  }

  getEsn():void{
    const esn = this.formRegisterEngine.value.esn;
    if(esn!=''){
      this.garantiasService.findEsn(esn).subscribe(resp=>{
        if(resp.body){
          this.esn = resp.body;
        }else{
          this.openSnackBar('No existe matricula con tal ESN');
          this.esn.id = '-';
          this.esn.cliente = '-';
          this.esn.direccion = '-';
          this.esn.aplicacion = '-';
          this.esn.modelo = '-';
          this.esn.etoPto = '-';
          this.esn.fechaInicioGarantia = '-';
          this.esn.bis = false;
        }
      })
    }else{
      this.openSnackBar('Ingrese el ESN');
      this.esn.id = '-';
      this.esn.cliente = '-';
      this.esn.direccion = '-';
      this.esn.aplicacion = '-';
      this.esn.modelo = '-';
      this.esn.etoPto = '-';
      this.esn.fechaInicioGarantia = '-';
      this.esn.bis = false;
    }
  }

  getOs():void{
    const os = this.formRegisterEngine.value.os;
    if(os!=''){
      this.garantiasService.findOs(os).subscribe(resp=>{
        if(resp.body){
          this.os = resp.body;
          this.configurationAndMaintenanceService.findServiceAreaByOS(resp.body.ceco,resp.body.codAreaServicios).subscribe(responseApi=>{
            this.areaDeServicioAsociado = responseApi.data[0].descripcion;
          });
        }else{
          this.openSnackBar('No existe el OS ingresado, pruebe con otro');
          this.os.claseActividad = '-';
          this.os.codAreaServicios = '-';
          this.os.fechaLib = '-';
          this.os.os = '-';
          this.os.bu = '-';
        }
      })
    }else{
      this.openSnackBar('Ingrese el OS');
      this.os.claseActividad = '-';
      this.os.codAreaServicios = '-';
      this.os.fechaLib = '-';
      this.os.os = '-';
      this.os.bu = '-';
    }
  }

  onOpenDialogRegisterEnrollment():void{
    const dialogNewEnrollment = this.matDialog.open(DialogRegisterEnrollmentComponent,{
          width: '990px',
          data: {option:'new',type:'engine', name:'motor'},
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

  onSendRegister(action):void{
    if(this.esn.id=='-'){
      const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Ingrese un ESN válido!'},disableClose:true});
    }else{
      if(this.os.codAreaServicios=='-'){
        const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Ingrese un OS válido!'},disableClose:true});
      }else{
        if(this.formRegisterEngine.value.tipoGarantia==null){
          const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Seleccione un tipo de garantía!'},disableClose:true});
        }else{
          if(this.formRegisterEngine.value.idQueja1==null){ // && this.formRegisterEngine.value.idQueja2==null && this.formRegisterEngine.value.idQueja3==null && this.formRegisterEngine.value.idQueja4==null){
            const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Seleccione al menos una queja!'},disableClose:true});
          }else{
            if(this.formRegisterEngine.value.idUsuarioEvaluador==null){
              const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Seleccione un usuario registrador!'},disableClose:true});
            }else{
              if(this.formRegisterEngine.value.comentarios==''){
                const dialogError = this.matDialog.open(DialogErrorMessageComponent,{data:{text:'¡Ingresa algún comentario!'},disableClose:true});
              }else{
                const data = {
                  idMatricula:this.esn.id,
                  codAreaServicios:this.os.codAreaServicios,
                  codCeco:this.os.ceco,
                  ...this.formRegisterEngine.value
                }
                switch(action){
                  case 'borrador':
                    this.onSaveRegister(data,0);
                    break;
                  case 'blanca':
                      this.onSaveRegister(data,1);
                    case 'edit':
                      this.onEditRegister(data);
                    break;
                  case 'naranja':
                    this.onTransfornRecordToOrange(data);                                            
                    break;
                  case 'observar':
                    this.onObservedRecord(data);                                            
                    break;
                  case 'rechazar':
                    this.onReject(data);
                    break;
                  
                  default:
                    break;
                }
              }
            }
          }
        }
      }
    }
  }

  onSaveRegister(data,_bandeja):void{
    const request = {...data,bandeja:_bandeja,id:0};
    this.garantiasService.saveWarranty(request).subscribe(resp=>{
      if(resp.success){
        if(_bandeja==0){
          this.onOpenDialogSaveDraft();
        }
        if(_bandeja==1){
          localStorage.setItem('success','true');
          this.router.navigate(['/garantias']);
        }
      }
    });
  }

  onEditRegister(data):void{
  const requestEdit = {...data,id:this.warranty.id,activo:true};
  this.garantiasService.saveWarranty(requestEdit).subscribe(resp=>{
    if(resp.success){
        const dialogSaveRegister = this.matDialog.open(DialogDraftSavedSuccessfullyComponent, {
          disableClose:true,
          data:{text:'Se guardó con éxito'}
        });
        dialogSaveRegister.afterClosed().subscribe(resp=>{
          if(resp){
            this.router.navigate(['/garantias']);
          }
        });
      }
    });
  }

  onReject(data):void{
    const dialogReject = this.matDialog.open(DialogRejectComponent,{
      disableClose:true,width:'380px',data: {text:'¿Estás seguro de rechazar este registro?',description:'Al hacerlo el registro ingresará a una bandeja negra'}
    });
    dialogReject.afterClosed().subscribe(dataDialog=>{
      if(dataDialog.selection){
        const requestBitacora = { idGarantia:this.warranty.id, comentarios:dataDialog.comentario };
        this.garantiasService.saveBitacora(requestBitacora).subscribe(responseBitacora=>{
          if(responseBitacora.success){
            const requestGarantiaRechazado = {...data,id:this.warranty.id,estado:1,activo:true} 
            this.garantiasService.saveWarranty(requestGarantiaRechazado).subscribe(responseGarantia=>{
              if(responseGarantia.success){
                this.router.navigate(['/garantias']);
              }
            });
          }
        });
      }
    });
  }

  onObservedRecord(data):void{
    const dialogObservedRecord = this.matDialog.open(DialogObservationComponent,{
      disableClose:true,width:'380px',data: {text:'¿Estás seguro de que deseas observar este registro?'}
    });
    dialogObservedRecord.afterClosed().subscribe(dataDialog=>{
      if(dataDialog.selection){
        const requestBitacora = { idGarantia:this.warranty.id, comentarios:dataDialog.comentario };
        this.garantiasService.saveBitacora(requestBitacora).subscribe(responseBitacora=>{
          if(responseBitacora.success){
            const requestGarantiaObservada = {...data,id:this.warranty.id,estado:2,activo:true} 
            this.garantiasService.saveWarranty(requestGarantiaObservada).subscribe(responseGarantia=>{
              if(responseGarantia.success){
                this.router.navigate(['/garantias']);
              }
            });
          }
        });
      }
    });
  }

  onTransfornRecordToOrange(data):void{    
    const dialogTransforRecordToOrange = this.matDialog.open(DialogTransformRecordToOrangeComponent,{
      disableClose:true,
      width:'936px',
      data:{idGarantia:this.warranty.id}
    });
    dialogTransforRecordToOrange.afterClosed().subscribe(responseDialog=>{
      if(responseDialog){
        const requestNaranja = {...data,bandeja:2,id:this.warranty.id,activo:true};
        this.garantiasService.saveWarranty(requestNaranja).subscribe(resp=>{
            if(resp.success){
              const dialogSaveRegister = this.matDialog.open(DialogDraftSavedSuccessfullyComponent, {
                disableClose:true,
                data:{text:'Se transformó con éxito'}
              });
              dialogSaveRegister.afterClosed().subscribe(resp=>{
                if(resp){
                  this.router.navigate(['/garantias']);
                }
              });
            }
        });
      }else{
        console.log('Error en la transformación');
      }
    });
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
    this._snackBar.open(message,'x',{
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['mat-toolbar', 'mat-primary','button-color']
    })
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
}
