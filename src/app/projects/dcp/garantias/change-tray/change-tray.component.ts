import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GarantiasService } from 'app/shared/services/garantias/garantias.service';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { DialogAdjuntarDocumentoComponent } from '../dialogs/dialog-adjuntar-documento/dialog-adjuntar-documento.component';
@Component({
  selector: 'app-change-tray',
  templateUrl: './change-tray.component.html',
  styleUrls: ['./change-tray.component.scss']
})
export class ChangeTrayComponent implements OnInit {

  numberRecord:number=12345678;
  //marcas y modelos de los equipos
  marcas:[];   modelos:[];
  documentosDetallesReclamo=[];
  //
  dataSourceFallas = ELEMENT_DATA;
  displayedColumnsFallas: string[] = ['position', 'name', 'weight', 'symbol','description','action'];
  //SRT
  dataSourceSrt=[];  auxSrtCantidad = []; auxSrtHorasHombre = []; auxSrtSubTotal = []; documentosSrt= [];
  displayedColumnsSrt: string[] = ['codigo', 'cantidad', 'hhInvertida', 'srtFabrica','descripcion','codigoAcceso', 'subTotalHH', 'accion'];
  displayedColumnsSrtVerificacion: string[] = ['codigo', 'cantidad', 'hhInvertida', 'srtFabrica','descripcion','codigoAcceso', 'subTotalHH'];
  formBuscarSrt: FormGroup = new FormGroup({codigoBuscarSrt: new FormControl('', [Validators.required])});
  verCamposNuevoSrt:boolean=false; verMensajeAgregarNuevoSrt:boolean=false; dondeSeReparo: any; montoTotalManoDeObra = 0; montoTotalManoDeObraConPenalizacion = 0; totalHorasHombre = 0;
  //partes
  dataSourcePartes = []; cantidadPartes = []; precioUnitarioPartes = []; subTotalPartes = []; documentosPartes = [];
  displayedColumnsPartes: string[] = ['numeroParte', 'descripcion', 'cantidad', 'precioUnitario','precioListaSap','subTotal', 'accion'];
  displayedColumnsPartesVerificacion: string[] = ['numeroParte', 'descripcion', 'cantidad', 'precioUnitario','precioListaSap','subTotal'];
  formBuscarParte: FormGroup = new FormGroup({codigoBuscarParte: new FormControl('', [Validators.required])});
  mensajeParteNoExiste: boolean= false; montoTotalPartes = 0; montoTotalPartesConPenalizacion = 0; montoTotalPartesEnSAP = 0;
  //otros reclamables
  dataSourceOtrosReclamables = []; reclamables = [];  preciosReclamables = []; documentosOtrosReclamables = [];
  displayedColumnsOtrosReclamables: string[] = ['descripcion', 'precio', 'accion'];
  displayedColumnsOtrosReclamablesVerificacion: string[] = ['descripcion', 'precio'];
  idReclamable : any; descripcionReclamable : string = ''; totalPrecioReclamables: number= 0;
  //viajes
  dataSourceViajes = []; tiposDeViaje = []; detallesDeViaje = []; valorDeViajes = []; costoDeViajes = []; montoTotalDeViajes=0; montoTotalDeViajesConPenalizacion:number=0; documentosViajes = [];
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

  saveDocDetallesReclamo(event):void{
    const document = event.target.files[0];
    this.documentosDetallesReclamo.push(document);
    console.log(this.documentosDetallesReclamo);
    console.log(document);
  }

  deleteDocumentDetalleReclamo(name):void{
    const index = this.documentosDetallesReclamo.findIndex(e=>e.name==name);
    this.documentosDetallesReclamo.splice(index,1);
    console.log(index);
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
            this.dataSourceSrt = this.dataSourceSrt.concat([response.body]);
            this.auxSrtCantidad[this.dataSourceSrt.length-1] = 0;
            this.auxSrtHorasHombre[this.dataSourceSrt.length-1] = 0;
            this.auxSrtSubTotal[this.dataSourceSrt.length-1] = 0;
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
          this.dataSourceSrt = this.dataSourceSrt.concat([response.data[0]]);
          this.auxSrtCantidad[this.dataSourceSrt.length-1] = 0;
          this.auxSrtHorasHombre[this.dataSourceSrt.length-1] = 0;
          this.auxSrtSubTotal[this.dataSourceSrt.length-1] = 0;
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
    this.auxSrtSubTotal[index] = this.auxSrtCantidad[index] * this.auxSrtHorasHombre[index] * 10;
    let sumaTotal = 0;  let sumaHorasHombre = 0; let sumaTotalConPenalizacion = 0;
    for (let j = 0; j < this.dataSourceSrt.length; j++) {
      sumaTotal += Number(this.auxSrtSubTotal[j]);
      sumaHorasHombre += Number(this.auxSrtHorasHombre[j]);      
    }
    sumaTotalConPenalizacion = sumaTotal + (sumaTotal * 0.1);

    this.montoTotalManoDeObra = sumaTotal;
    this.montoTotalManoDeObraConPenalizacion = sumaTotalConPenalizacion;
    this.totalHorasHombre = sumaHorasHombre;
  }
  //PARTES
  buscarParte():void{
    if(this.formBuscarParte.valid){
      this.configurationAndMaintenanceService.buscarParte(this.formBuscarParte.value.codigoBuscarParte).subscribe(response=>{
        if(response.data[0]){
          this.dataSourcePartes = this.dataSourcePartes.concat([response.data[0]]);
          this.cantidadPartes[this.dataSourcePartes.length-1] = 0;
          this.precioUnitarioPartes[this.dataSourcePartes.length-1] = 0;
          this.subTotalPartes[this.dataSourcePartes.length-1] = 0;
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
  calcularTotalPartes(index):void{
    this.subTotalPartes[index] = this.cantidadPartes[index] * this.precioUnitarioPartes[index] * this.dataSourcePartes[index].precioFob;
    let sumaTotalPartes = 0; let sumaTotalPartesConPenalizacion = 0; let sumaTotalPartesEnSAP = 0;
    for (let i = 0; i < this.subTotalPartes.length; i++) { sumaTotalPartes += Number(this.subTotalPartes[i]); }
    for (let j = 0; j < this.dataSourcePartes.length; j++) { sumaTotalPartesEnSAP += Number(this.dataSourcePartes[j].precioFob); }
    this.montoTotalPartes = sumaTotalPartes;
    this.montoTotalPartesConPenalizacion = sumaTotalPartes + (sumaTotalPartes * 0.1);
    this.montoTotalPartesEnSAP = sumaTotalPartesEnSAP;
  }
  //RECLAMABLES
  buscarDescripcionDelReclamable():void{
    let reclamable = this.reclamables.find(e => e.id == this.idReclamable);
    this.descripcionReclamable = reclamable.descripcion;
  }
  agregarReclamable():void{
    if(this.idReclamable!=null){
      let reclamable = this.reclamables.find(e => e.id == this.idReclamable);
      this.dataSourceOtrosReclamables = this.dataSourceOtrosReclamables.concat([reclamable]);
      console.log(this.dataSourceOtrosReclamables)
    }else{
      const dialogError = this.matDialog.open(DialogErrorMessageComponent,{
        data:{text:'Seleccione un reclamable'},disableClose:true,
      });
    }
  }
  limpiarReclamables():void{
    console.log(this.preciosReclamables);
  }
  calcularTotalReclamables():void{
    let suma:number = 0;
    for (let index = 0; index < this.preciosReclamables.length; index++) {
       suma += Number(this.preciosReclamables[index]);      
    }
    this.totalPrecioReclamables = suma;
  }
  //VIAJES
  agregarViaje():void{
    if(this.fechaDeViaje!=null){
      if(this.medioDeTransporteSeleccionado!=null){
        if(this.tipoDeViajeSeleccionado!=null){
          if(this.detalleDeViajeSeleccionado!=null){
            const viaje = {fechaDeViaje: this.fechaDeViaje._d, ...this.medioDeTransporteSeleccionado, descripcionDeViaje:this.descripcionDeViaje,...this.tipoDeViajeSeleccionado,
              ...this.detalleDeViajeSeleccionado, tecnicos:this.cantidadDeTecnicos, unidadDeMedida:this.unidadDeMedida};
              this.dataSourceViajes = this.dataSourceViajes.concat([viaje]);
            }else{ const dialogError = this.matDialog.open(DialogErrorMessageComponent,{ data:{text:'Debe seleccionar un detalle de viaje'},disableClose:true }); }
        }else{ const dialogError = this.matDialog.open(DialogErrorMessageComponent, {data:{text:'Debe seleccionar un tipo de viaje'},disableClose:true}); }
      }else{ const dialogError = this.matDialog.open(DialogErrorMessageComponent,{ data:{text:'Debe seleccionar una medio de transporte'},disableClose:true }); }
    }else{ const dialogError = this.matDialog.open(DialogErrorMessageComponent,{ data:{text:'Debe seleccionar una fecha'},disableClose:true }); }
  }
  calcularSubTotalDeViaje(index):void{
    this.costoDeViajes[index] = this.valorDeViajes[index] * 1.5;
    let suma = 0;
    for (let i = 0; i < this.costoDeViajes.length; i++) {
      suma += Number(this.costoDeViajes[i]);      
    }
    this.montoTotalDeViajes = suma;
    this.montoTotalDeViajesConPenalizacion = suma + (suma*0.1);
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

