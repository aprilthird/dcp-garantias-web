import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GarantiasService } from 'app/shared/services/garantias/garantias.service';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';

@Component({
  selector: 'app-change-tray',
  templateUrl: './change-tray.component.html',
  styleUrls: ['./change-tray.component.scss']
})
export class ChangeTrayComponent implements OnInit {

  numberRecord:number=12345678;
  //
  documentosDetallesReclamo=[];
  //
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','description','action'];
  //SRT
  dataSourceSrt = ELEMENT_DATA;
  displayedColumnsSrt: string[] = ['codigo', 'cantidad', 'hhInvertida', 'srtFabrica','descripcion','codigoAcceso', 'subTotalHH', 'accion'];
  documentosSert=[];
  //partes
  dataSourcePartes = ELEMENT_DATA;
  displayedColumnsPartes: string[] = ['numeroParte', 'descripcion', 'cantidad', 'precioUnitario','precioListaSap','subTotal', 'accion'];
  dataSourceOtrosReclamables = ELEMENT_DATA;
  displayedColumnsOtrosReclamables: string[] = ['descripcion', 'precio', 'accion'];
  dataSourceViajes = ELEMENT_DATA;
  displayedColumnsViajes: string[] = ['fecha','medioTransporte' ,'descripcion','tipo','detalle','unidadMedida','valor', 'costo', 'accion'];
  dataSourceNarrativa = ELEMENT_DATA;
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

  constructor(private readonly matDialog: MatDialog, private readonly router: Router, private readonly garantiasService:GarantiasService,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.button.detalles = true;
    this.styleButton.detallesStyle='darkButton';
    this.warranty = JSON.parse(localStorage.getItem('garantia'));
    this.loadComplaints();
    this.loadFormGroupChangeTray();
    console.log(this.warranty);
    
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
      puntoFalla: new FormControl({value:'',disabled:true}),
      medida: new FormControl({value:null,disabled:true}),
      fechaFalla: new FormControl({value:'',disabled:true}),
      fechaInicioGarantia: new FormControl({value:'',disabled:true}),
      numParteRepuesto: new FormControl({value:'',disabled:true}),
      numParteFallo: new FormControl({value:'',disabled:true}),
      codigoAdicional: new FormControl({value:'',disabled:true}),
      fechaAdicional: new FormControl({value:'',disabled:true}),
      ejecucionAdicional: new FormControl({value:'',disabled:true}),
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

  loadComplaints():void{
    this.configurationAndMaintenanceService.listComplaints().subscribe(resp=>{
      this.complaints = resp.data;
    });
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

