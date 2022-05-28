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

  constructor(private readonly matDialog: MatDialog, private readonly router: Router) { }

  ngOnInit(): void {
  }

  onGarantias():void{
    this.router.navigate(['/garantias']);
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

