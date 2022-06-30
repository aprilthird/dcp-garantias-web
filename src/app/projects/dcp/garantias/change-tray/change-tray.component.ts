import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GarantiasService } from 'app/shared/services/garantias/garantias.service';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { DialogAdjuntarDocumentoComponent } from '../dialogs/dialog-adjuntar-documento/dialog-adjuntar-documento.component';
import { DialogRejectComponent } from 'app/shared/dialogs/dialog-reject/dialog-reject.component';
import { DialogObservationComponent } from 'app/shared/dialogs/dialog-observation/dialog-observation.component';
import { clone, slice } from 'lodash';
import { DialogTransformRecordToYellowComponent } from '../dialogs/dialog-transform-record-to-yellow/dialog-transform-record-to-yellow.component';
@Component({
  selector: 'app-change-tray',
  templateUrl: './change-tray.component.html',
  styleUrls: ['./change-tray.component.scss']
})
export class ChangeTrayComponent implements OnInit {

  //variable para la acción que se va a realizar, si es crear o editar  
  action:any;

  numberRecord:number=12345678;
  //marcas y modelos de los equipos
  marcas=[];   modelos=[];
  documentosDetallesReclamo=[]; auxiliarTable = [];
  //FALLAS
  dataSourceFallas = ELEMENT_DATA; tiposDeFalla = [];
  displayedColumnsFallas: string[] = ['position', 'name', 'weight', 'symbol','description','action'];
  //SRT
  dataSourceSrt=[]; documentosSrt= []; checkBoxEliminarTodoSrt=false
  displayedColumnsSrt: string[] = ['codigo', 'cantidad', 'hhInvertida', 'srtFabrica','descripcion','codigoAcceso', 'subTotalHH', 'accion'];
  displayedColumnsSrtVerificacion: string[] = ['codigo', 'cantidad', 'hhInvertida', 'srtFabrica','descripcion','codigoAcceso', 'subTotalHH'];
  formBuscarSrt: FormGroup = new FormGroup({codigoBuscarSrt: new FormControl('', [Validators.required])});
  verCamposNuevoSrt:boolean=false; verMensajeAgregarNuevoSrt:boolean=false; dondeSeReparo: any; montoTotalManoDeObra = 0; montoTotalManoDeObraConPenalizacion = 0; totalHorasHombre = 0;
  //partes
  dataSourcePartes = []; documentosPartes = []; checkBoxEliminarTodoPartes=false
  displayedColumnsPartes: string[] = ['numeroParte', 'descripcion', 'cantidad', 'precioUnitario','precioListaSap','subTotal', 'accion'];
  displayedColumnsPartesVerificacion: string[] = ['numeroParte', 'descripcion', 'cantidad', 'precioUnitario','precioListaSap','subTotal'];
  formBuscarParte: FormGroup = new FormGroup({codigoBuscarParte: new FormControl('', [Validators.required])});
  mensajeParteNoExiste: boolean= false; montoTotalPartes = 0; montoTotalPartesConPenalizacion = 0; montoTotalPartesEnSAP = 0;
  //otros reclamables
  dataSourceOtrosReclamables = []; reclamables = []; documentosOtrosReclamables = []; checkBoxEliminarTodoReclamables=false;
  displayedColumnsOtrosReclamables: string[] = ['descripcion', 'precio', 'accion'];
  displayedColumnsOtrosReclamablesVerificacion: string[] = ['descripcion', 'precio'];
  idReclamable : any; descripcionReclamable : string = ''; totalPrecioReclamables: number= 0;
  //viajes
  dataSourceViajes = []; tiposDeViaje = []; detallesDeViaje = []; montoTotalDeViajes=0; montoTotalDeViajesConPenalizacion:number=0; documentosViajes = []; checkBoxEliminarTodoViajes = false;
  displayedColumnsViajes: string[] = ['fecha','medioTransporte' ,'descripcion','tipo','detalle','unidadMedida','valor', 'costo', 'accion'];
  displayedColumnsViajesVerificacion: string[] = ['fecha','medioTransporte' ,'descripcion','tipo','detalle','unidadMedida','valor', 'costo'];
  fechaDeViaje:any; medioDeTransporteSeleccionado:any; descripcionDeViaje:string ; tipoDeViajeSeleccionado:any; detalleDeViajeSeleccionado:any; unidadDeMedida = 'KM'; cantidadDeTecnicos = 0; 
  //narrativas
  queja1:any={descripcion:''}; queja2:any={descripcion:''}; queja3:any={descripcion:''}; queja4:any={descripcion:''}; causasNarrativa=''; correccionesNarrativa=''; documentosNarrativas = [];
  dataSourceNarrativa = [{quejasNarrativa:'', tecnicoResponsable:'Diego Perez (estatico)', idPromotion:'2500TM (estatico)'}];
  displayedColumnsNarrativa: string[] = ['quejas','idPromocion' ,'tecnico','causas','correcciones'];  
  //formulario
  formGroupChangeTray: FormGroup;
  //
  button={
    detalles:false,
    fallas:false,
    srt:false,
    partes:false,
    otros:false,
    viajes:false,
    narrativa:false,
    verificacion:false
  }
  styleButton={
    detallesStyle:'lightButton',
    fallasStyle:'lightButton',
    srtStyle:'lightButton',
    partesStyle:'lightButton',
    otrosStyle:'lightButton',
    viajesStyle:'lightButton',
    narrativaStyle:'lightButton',
    verificacionStyle:'lightButton'
  };
  //guardamos la garantia que llega
  warranty:any;
  //datos de la matricula
  esn = {id:'-',cliente:'-',direccion:'-',aplicacion:'-',modelo:'-',cpl:'-',etoPto:'-',fechaInicioGarantia:'-',bis:false};
  //datos de orden de servicio
  os = {claseActividad:'-' ,codAreaServicios:'-' ,fechaLib:'-', os:'-', bu:'-'};
  //tipo de garantia juntos a sus campos  
  warrantyTypes = [ {value: 1, name: "Producto Nuevo"},{value: 2, name: "Motor Recon"},{value: 3, name: "Repuesto Nuevo"},
                  {value: 4, name: "Repuesto Defectuoso"},{value: 5, name: "Cap"},{value: 6, name: "Extendida Mayor"},
                  {value: 7, name: "Cdc"},{value: 8, name: "Trp"},{value: 9, name: "Atc"},{value: 10, name: "Memo"}];
  //listado de las quejas
  complaints:any[];
  //lista de usuarios provisional
  users=[{value:1,name:'Abel Nalvate Ramirez'},{value:2,name:'Alexander Flores Cisneros'},{value:3,name:'Alejandro Gonzales Sánchez'},];
  //para controlar la vista de cada tipo de garantia
  viewsTypesWarranty = {a:false,b:false,c:false,d:false,e:false,f:false,g:false,h:false,i:false,};
  //nuevo SRT
  formSrt: FormGroup;

  constructor(private readonly matDialog: MatDialog, private readonly router: Router, private readonly garantiasService:GarantiasService,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.button.detalles = true;
    this.styleButton.detallesStyle='darkButton';
    this.warranty = JSON.parse(localStorage.getItem('garantia'));
    this.loadFormGroupChangeTray();
    this.loadFormGroupSrt();
    this.cargarDatosDeMaestras();
    console.log(this.warranty);    
  }

  cargarDatosDeMaestras():void{
    this.configurationAndMaintenanceService.listComplaints(1).subscribe(resp=>{
      this.complaints = resp.data;
      this.obtenerQuejas();
    });
    this.configurationAndMaintenanceService.listMarcaMotorSinPaginar().subscribe(resp=>{
      this.marcas = resp.data;
    });
    this.configurationAndMaintenanceService.listaModelosSinPaginar().subscribe(resp=>{
      this.modelos = resp.data;
    });
    this.configurationAndMaintenanceService.listaFallasSinPaginar().subscribe(response=>{
      console.log(response);
      this.tiposDeFalla = response.data;
    })
    this.configurationAndMaintenanceService.listaOtrosReclamablesSinPaginar().subscribe(response=>{
      this.reclamables = response.data;
    });
    this.configurationAndMaintenanceService.listaTiposDeViajeSinPaginar().subscribe(response=>{
      this.tiposDeViaje = response.data;
    });
    this.configurationAndMaintenanceService.listaDetallesDeViajeSinPaginar().subscribe(response=>{
      this.detallesDeViaje = response.data;
    });
  }

  getEsn():void{
    const esn = this.formGroupChangeTray.value.esn;
    this.garantiasService.findEsn(esn).subscribe(resp=>{
      if(resp.body){
        this.esn = resp.body;
      }else{
        console.log('error');
      }
    })
  }

  getOs():void{
    const os = this.formGroupChangeTray.value.os;
    this.garantiasService.findOs(os).subscribe(resp=>{
      if(resp.body){
        this.os = resp.body;
      }else{
        console.log('error');
      }
    })
  }

  loadFormGroupChangeTray():void{
    this.formGroupChangeTray = new FormGroup ({
      esn: new FormControl ({value: this.warranty.esn, disabled: true}),
      os: new FormControl ({value: this.warranty.os, disabled: true}),
      //
      tipoGarantia: new FormControl ({value: this.warranty.idTipoGarantia, disabled: true}),
      puntoFalla: new FormControl({value:this.warranty.puntoFalla, disabled:true}),
      medida: new FormControl({value:this.warranty.medida, disabled:true}),
      fechaFalla: new FormControl({value:this.warranty.fechaFalla, disabled:true}),
      fechaInicioGarantia: new FormControl({value:this.warranty.fechaInicioGarantia, disabled:true}),
      numParteRepuesto: new FormControl({value:this.warranty.numParteRepuesto, disabled:true}),
      numParteFallo: new FormControl({value:this.warranty.numParteFallo, disabled:true}),
      codigoAdicional: new FormControl({value:this.warranty.codigoAdicional, disabled:true}),
      fechaAdicional: new FormControl({value:this.warranty.fechaAdicional, disabled:true}),
      ejecucionAdicional: new FormControl({value:this.warranty.ejecucionAdicional, disabled:true}),
      //
      idQueja1: new FormControl({value:this.warranty.idQueja1,disabled:true}),
      idQueja2: new FormControl({value:this.warranty.idQueja2,disabled:true}),
      idQueja3: new FormControl({value:this.warranty.idQueja3,disabled:true}),
      idQueja4: new FormControl({value:this.warranty.idQueja4,disabled:true}),
      idUsuarioEvaluador: new FormControl({value:this.warranty.idUsuarioEvaluador,disabled:true}),
      comentarios: new FormControl({value:this.warranty.comentarios,disabled:true})
    });
    this.getEsn();
    this.getOs();
    this.selectTypeWarranty();
  }

  onGarantias():void{
    this.router.navigate(['/garantias']);
  }

  clearButtons():void{
    this.button.detalles = false;
    this.styleButton.detallesStyle='lightButton';
    this.button.fallas=false;
    this.styleButton.fallasStyle='lightButton';
    this.button.srt=false;
    this.styleButton.srtStyle='lightButton';
    this.button.partes=false;
    this.styleButton.partesStyle='lightButton';
    this.button.otros=false;
    this.styleButton.otrosStyle='lightButton';
    this.button.viajes=false;
    this.styleButton.viajesStyle='lightButton';
    this.button.narrativa=false;
    this.styleButton.narrativaStyle='lightButton';
    this.button.verificacion=false;
    this.styleButton.verificacionStyle='lightButton';
  }

  change(view):void{
    switch(view){
      case 'detalles':
        this.clearButtons();
        this.button.detalles=true;
        this.styleButton.detallesStyle = 'darkButton';
        break;
      case 'fallas':
        this.clearButtons();
        this.button.fallas=true;
        this.styleButton.fallasStyle = 'darkButton';
        break;
      case 'srt':
        this.clearButtons();
        this.button.srt=true;
        this.styleButton.srtStyle = 'darkButton';
        break;
      case 'partes':
        this.clearButtons();
        this.button.partes=true;
        this.styleButton.partesStyle = 'darkButton';
        break;
      case 'otros':
        this.clearButtons();
        this.button.otros=true;
        this.styleButton.otrosStyle = 'darkButton';
        break;
      case 'viajes':
        this.clearButtons();
        this.button.viajes=true;
        this.styleButton.viajesStyle = 'darkButton';
        break;
      case 'narrativa':
        this.clearButtons();
        this.button.narrativa=true;
        this.styleButton.narrativaStyle = 'darkButton';
        break;
      case 'verificacion':
        this.clearButtons();
        this.button.verificacion=true;
        this.styleButton.verificacionStyle = 'darkButton';
        break;
        default:
          break;
    }
  }

  selectTypeWarranty(){
    switch (this.formGroupChangeTray.value.tipoGarantia) {
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
  //SRT
  loadFormGroupSrt():void{
    this.formSrt = new FormGroup({
      codigo: new FormControl('',[Validators.required]),
      descripcion: new FormControl('',[Validators.required]),
      cantidad: new FormControl('',[Validators.required]),
      srtFabrica: new FormControl('',[Validators.required]),
      codigoAcceso: new FormControl('',[Validators.required])
    });
  }
  limpiarCamposSrt():void{
    this.formSrt.reset();
  }
  guardarNuevaSrt():void{
    if(this.formSrt.valid){
      if(this.dondeSeReparo!=null){
        const array = this.formSrt.value.codigo.split('-');
        const request = {id:0, activo:true, grupoSrt:array[0], procedimiento:array[1], lugar:this.dondeSeReparo ,...this.formSrt.value};      
        this.configurationAndMaintenanceService.maintenanceSrt(request).subscribe(response=>{
          if(response.success){
            const aux = {cantidadSrt:0,horasHombreSrt:0, subTotalSrt:0, ...response.body};
            this.dataSourceSrt = this.dataSourceSrt.concat([aux]);
          }
        });
      }else{
        const dialogError = this.matDialog.open(DialogErrorMessageComponent,{
          data:{text:'Debe seleccionar el lugar donde se reparó'},
          disableClose:true,
        });
      }
    }else{
      const dialogError = this.matDialog.open(DialogErrorMessageComponent,{
        data:{text:'Ingrese todos los campos SRT'},
        disableClose:true,
      });
    }
  }
  buscarSrt():void{
    if(this.formBuscarSrt.valid){
      this.configurationAndMaintenanceService.searchSrt(this.formBuscarSrt.value.codigoBuscarSrt).subscribe(response=>{
        if(response.data[0]){
          const aux = {check:false, cantidadSrt:0, horasHombreSrt:0, subTotalSrt:0, ...response.data[0]};
          this.dataSourceSrt = this.dataSourceSrt.concat([aux]);
          if(this.verCamposNuevoSrt){this.verCamposNuevoSrt=false;}
        }else{
          this.verMensajeAgregarNuevoSrt = true;
          setTimeout(()=>{
            this.verMensajeAgregarNuevoSrt = false;
          },5000);
          this.formBuscarSrt.reset();
          this.formSrt.reset();
          this.verCamposNuevoSrt=true;
        }   
      });
    }else{
      const dialogError = this.matDialog.open(DialogErrorMessageComponent,{
        data:{text:'Ingrese codigo del SRT'},
        disableClose:true,
      });
    }
  }
  calcularSubTotalSrt(index):void{
    this.dataSourceSrt[index].subTotalSrt = this.dataSourceSrt[index].cantidadSrt * this.dataSourceSrt[index].horasHombreSrt * 10;
    this.calcularTotalSrt();
  }
  calcularTotalSrt():void{
    let sumaTotal = 0;  let sumaHorasHombre = 0; let sumaTotalConPenalizacion = 0;
    for (let j = 0; j < this.dataSourceSrt.length; j++) {
      sumaTotal += Number(this.dataSourceSrt[j].subTotalSrt);
      sumaHorasHombre += Number(this.dataSourceSrt[j].horasHombreSrt);      
    }
    sumaTotalConPenalizacion = sumaTotal + (sumaTotal * 0.1);
    this.montoTotalManoDeObra = sumaTotal;
    this.montoTotalManoDeObraConPenalizacion = sumaTotalConPenalizacion;
    this.totalHorasHombre = sumaHorasHombre;
  }
  eliminarSrts():void{
    let aux = [];
    for (let i = 0; i < this.dataSourceSrt.length; i++) {
      if(this.dataSourceSrt[i].check==false){
        aux.push(this.dataSourceSrt[i]);
      }
    }
    this.dataSourceSrt = aux;
    this.calcularTotalSrt();
    if(this.dataSourceSrt.length==0){
      this.checkBoxEliminarTodoSrt = false;
    }
  }
  seleccionarTodoSrt():void{
    if(this.dataSourceSrt.length>0){
      for (let i = 0; i < this.dataSourceSrt.length; i++) {
        this.dataSourceSrt[i].check = this.checkBoxEliminarTodoSrt;
      }
    }
  }
  //PARTES
  buscarParte():void{
    if(this.formBuscarParte.valid){
      this.configurationAndMaintenanceService.buscarParte(this.formBuscarParte.value.codigoBuscarParte).subscribe(response=>{
        if(response.data[0]){
          const parte = {check:false, cantidadParte:0, precioUnitarioParte:0, subTotalParte:0, ...response.data[0]};
          this.dataSourcePartes = this.dataSourcePartes.concat([parte]);
        }else{
          this.mensajeParteNoExiste = true;
          setTimeout(()=>{this.mensajeParteNoExiste = false;},5000);
        }   
      });
    }else{
      const dialogError = this.matDialog.open(DialogErrorMessageComponent,{
        data:{text:'Ingrese codigo de la Parte'},disableClose:true,
      });
    }
  }

  calcularSubTotalPartes(index):void{
    this.dataSourcePartes[index].subTotalParte = this.dataSourcePartes[index].cantidadParte * this.dataSourcePartes[index].precioUnitarioParte * this.dataSourcePartes[index].precioFob;
    this.calcularTotalPartes();
  }

  calcularTotalPartes():void{
    let sumaTotalPartes = 0;
    let sumaTotalPartesConPenalizacion = 0;
    let sumaTotalPartesEnSAP = 0;
    for (let i = 0; i < this.dataSourcePartes.length; i++) {
      sumaTotalPartes += Number(this.dataSourcePartes[i].subTotalParte);
    }
    for (let j = 0; j < this.dataSourcePartes.length; j++) {
      sumaTotalPartesEnSAP += Number(this.dataSourcePartes[j].precioFob);
    }
    this.montoTotalPartes = sumaTotalPartes;
    this.montoTotalPartesConPenalizacion = sumaTotalPartes + (sumaTotalPartes * 0.1);
    this.montoTotalPartesEnSAP = sumaTotalPartesEnSAP;
  }

  eliminarPartes():void{
    let aux = [];
    for (let i = 0; i < this.dataSourcePartes.length; i++) {
      if(this.dataSourcePartes[i].check==false){
        aux.push(this.dataSourcePartes[i]);
      }
    }
    this.dataSourcePartes = aux;
    this.calcularTotalPartes();
    if(this.dataSourcePartes.length==0){
      this.checkBoxEliminarTodoPartes = false;
    }
  }
  seleccionarTodoPartes():void{
    if(this.dataSourcePartes.length>0){
      for (let i = 0; i < this.dataSourcePartes.length; i++) {
        this.dataSourcePartes[i].check = this.checkBoxEliminarTodoPartes;
      }
    }
  }
  //OTROS RECLAMABLES
  buscarDescripcionDelReclamable():void{
    let reclamable = this.reclamables.find(e => e.id == this.idReclamable);
    this.descripcionReclamable = reclamable.descripcion;
  }
  agregarReclamable():void{
    if(this.idReclamable!=null){
      const reclamable = this.reclamables.find(e => e.id == this.idReclamable);
      const fila = {check:false, precioReclamable:0, ...reclamable};
      this.dataSourceOtrosReclamables = this.dataSourceOtrosReclamables.concat([fila]);
    }else{
      const dialogError = this.matDialog.open(DialogErrorMessageComponent,{
        data:{text:'Seleccione un reclamable'},disableClose:true,
      });
    }
  }
  limpiarReclamables():void{
    console.log('falta habilitar');    
  }
  calcularTotalReclamables():void{
    let suma:number = 0;
    for (let index = 0; index < this.dataSourceOtrosReclamables.length; index++) {
       suma += Number(this.dataSourceOtrosReclamables[index].precioReclamable);      
    }
    this.totalPrecioReclamables = suma;
  }
  seleccionarTodoReclamables():void{
    if(this.dataSourceOtrosReclamables.length>0){
      for (let i = 0; i < this.dataSourceOtrosReclamables.length; i++) {
        this.dataSourceOtrosReclamables[i].check = this.checkBoxEliminarTodoReclamables;
      }
    }
  }
  eliminarReclamables():void{
    let aux = [];
    for (let i = 0; i < this.dataSourceOtrosReclamables.length; i++) {
      if(this.dataSourceOtrosReclamables[i].check==false){
        aux.push(this.dataSourceOtrosReclamables[i]);
      }
    }
    this.dataSourceOtrosReclamables = aux;
    this.calcularTotalReclamables();
    if(this.dataSourceOtrosReclamables.length==0){
      this.checkBoxEliminarTodoReclamables = false;
    }
  }
  //VIAJES
  agregarViaje():void{
    if(this.fechaDeViaje!=null){
      if(this.medioDeTransporteSeleccionado!=null){
        if(this.tipoDeViajeSeleccionado!=null){
          if(this.detalleDeViajeSeleccionado!=null){
            const viaje = {fechaDeViaje: this.fechaDeViaje._d,
                          ...this.medioDeTransporteSeleccionado,
                          descripcionDeViaje:this.descripcionDeViaje,
                          ...this.tipoDeViajeSeleccionado,
                          ...this.detalleDeViajeSeleccionado,
                          tecnicos:this.cantidadDeTecnicos,
                          unidadDeMedida:this.unidadDeMedida,
                          valorDeViaje:0,
                          costoDeViaje:0,
                        check:false};
              this.dataSourceViajes = this.dataSourceViajes.concat([viaje]);
            }else{ const dialogError = this.matDialog.open(DialogErrorMessageComponent,{ data:{text:'Debe seleccionar un detalle de viaje'},disableClose:true }); }
        }else{ const dialogError = this.matDialog.open(DialogErrorMessageComponent, {data:{text:'Debe seleccionar un tipo de viaje'},disableClose:true}); }
      }else{ const dialogError = this.matDialog.open(DialogErrorMessageComponent,{ data:{text:'Debe seleccionar una medio de transporte'},disableClose:true }); }
    }else{ const dialogError = this.matDialog.open(DialogErrorMessageComponent,{ data:{text:'Debe seleccionar una fecha'},disableClose:true }); }
  }
  calcularSubTotalDeViaje(index):void{
    this.dataSourceViajes[index].costoDeViaje = this.dataSourceViajes[index].valorDeViaje * 1.5;
    this.calcularTotalViajes();
  }
  calcularTotalViajes():void{
    let suma = 0;
    for (let i = 0; i < this.dataSourceViajes.length; i++) {
      suma += Number(this.dataSourceViajes[i].costoDeViaje);      
    }
    this.montoTotalDeViajes = suma;
    this.montoTotalDeViajesConPenalizacion = suma + (suma*0.1);
  }
  eliminarViajes():void{
    let aux = [];
    for (let i = 0; i < this.dataSourceViajes.length; i++) {
      if(this.dataSourceViajes[i].check==false){
        aux.push(this.dataSourceViajes[i]);
      }
    }
    this.dataSourceViajes = aux;
    this.calcularTotalViajes();
    if(this.dataSourceViajes.length==0){
      this.checkBoxEliminarTodoViajes = false;
    }
  }
  seleccionarTodoViajes():void{
    if(this.dataSourceViajes.length>0){
      for (let i = 0; i < this.dataSourceViajes.length; i++) {
        this.dataSourceViajes[i].check = this.checkBoxEliminarTodoViajes;
      }
    }
  }
  //NARRATIVAS
  obtenerQuejas():void{
    if(this.warranty.idQueja1){
      this.queja1 = this.complaints.find(item => item.id ==this.warranty.idQueja1);
    }
    if(this.warranty.idQueja2){
      this.queja2 = this.complaints.find(item => item.id ==this.warranty.idQueja2);
    }
    if(this.warranty.idQueja3){
      this.queja3 = this.complaints.find(item => item.id ==this.warranty.idQueja3);
    }
    if(this.warranty.idQueja4){
      this.queja4 = this.complaints.find(item => item.id ==this.warranty.idQueja4);
    }
  }
  cargarDocumentoNarrativas(event):void{
    const document = event.target.files[0];
    this.documentosDetallesReclamo.push(document);
    console.log(this.documentosDetallesReclamo);
    console.log(document);
  }
  adjuntarDocumento():void{
    const dialogoAdjuntarDocumentos = this.matDialog.open(DialogAdjuntarDocumentoComponent,{
      width: '425px',
      disableClose:true,
      data: {modulo:'garantias'}
    });
    dialogoAdjuntarDocumentos.afterClosed().subscribe(resp=>{
      console.log(resp);
    });
  }
  
  //VERIFICAION DETALLES

  onSendRegister(action):void{
    const data = {
      idMatricula:this.esn.id,
      codAreaServicios:this.os.codAreaServicios,
      ...this.formGroupChangeTray.value
    }
    switch(action){
      case 'amarilla':
          this.onTransfornRecordToYellow(data);
        case 'edit':
          this.onEditRegister(data);
        break
      case 'observar':
        this.onObservedRecord(data);                                            
        break;
      case 'rechazar':
        this.onReject(data);
        break;
      case 'back':
        this.onSaveBack(data);
        break;
      default:
        break;
    }
  }

  onSaveBack(data):void{
    // const requestEdit = {...data,bandeja:2,id:this.warranty.id,activo:true};
    // data.os="100056431";
    // data.esn="999";
    // data.idMatricula=this.esn.id;
    // data.codAreaServicios=this.os.codAreaServicios;
    const requestEdit = {...data,bandeja:0,id:this.warranty.id,activo:true};
  
    this.garantiasService.saveWarranty(requestEdit).subscribe(resp=>{
      if(resp.success){
          // const dialogSaveRegister = this.matDialog.open(DialogDraftSavedSuccessfullyComponent, {
          //   disableClose:true,
          //   data:{text:'Se guardó con éxito'}
          // });
          // dialogSaveRegister.afterClosed().subscribe(resp=>{
          //   if(resp){
          //     this.router.navigate(['/garantias']);
          //   }
          // });
        }
      });
    }

  onSaveRegister(data):void{
    const request = {...data,id:0};

    this.garantiasService.saveWarranty(request).subscribe(resp=>{
      if(resp.success){

        localStorage.setItem('success','true');
        this.router.navigate(['/garantias']);
      }
    });
  }

  onEditRegister(data):void{
  // const requestEdit = {...data,bandeja:2,id:this.warranty.id,activo:true};
  const requestEdit = {...data,esn:"999",id:this.warranty.id,activo:true};

  this.garantiasService.saveWarranty(requestEdit).subscribe(resp=>{
    if(resp.success){
        // const dialogSaveRegister = this.matDialog.open(DialogDraftSavedSuccessfullyComponent, {
        //   disableClose:true,
        //   data:{text:'Se guardó con éxito'}
        // });
        // dialogSaveRegister.afterClosed().subscribe(resp=>{
        //   if(resp){
        //     this.router.navigate(['/garantias']);
        //   }
        // });
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

  onTransfornRecordToYellow(data):void{    
    const dialogTransforRecordToYellow = this.matDialog.open(DialogTransformRecordToYellowComponent,{
      disableClose:true,
      width:'480px',
      data:{idGarantia:this.warranty.id}
    });
    dialogTransforRecordToYellow.afterClosed().subscribe(responseDialog=>{
      if(responseDialog){
        const requestAmarillo = {...data,bandeja:6,id:this.warranty.id,activo:true};
        this.garantiasService.saveWarranty(requestAmarillo).subscribe(resp=>{
            if(resp.success){
              this.router.navigate(['/garantias']);
            }
        });
      }else{
        console.log('Error en la transformación');
      }
    });
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'}
];

