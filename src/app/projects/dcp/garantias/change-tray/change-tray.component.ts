import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-tray',
  templateUrl: './change-tray.component.html',
  styleUrls: ['./change-tray.component.scss']
})
export class ChangeTrayComponent implements OnInit {

  numberRecord:number=12345678;
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','description','action'];
  dataSourceSrt = ELEMENT_DATA;
  displayedColumnsSrt: string[] = ['codigo', 'cantidad', 'hhInvertida', 'srtFabrica','descripcion','codigoAcceso', 'subTotalHH', 'accion'];
  dataSourcePartes = ELEMENT_DATA;
  displayedColumnsPartes: string[] = ['numeroParte', 'descripcion', 'cantidad', 'precioUnitario','precioListaSap','subTotal', 'accion'];
  dataSourceOtrosReclamables = ELEMENT_DATA;
  displayedColumnsOtrosReclamables: string[] = ['descripcion', 'precio', 'accion'];
  dataSourceViajes = ELEMENT_DATA;
  displayedColumnsViajes: string[] = ['fecha','medioTransporte' ,'descripcion','tipo','detalle','unidadMedida','valor', 'costo', 'accion'];
  dataSourceNarrativa = ELEMENT_DATA;
  displayedColumnsNarrativa: string[] = ['quejas','idPromocion' ,'tecnico','causas','correcciones'];

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
  constructor(private readonly matDialog: MatDialog, private readonly router: Router) { }

  ngOnInit(): void {
    this.button.detalles = true;
    this.styleButton.detallesStyle='darkButton';
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

