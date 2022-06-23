import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSeleccionarTipoDeRegistroComponent } from '../dialogs/dialog-seleccionar-tipo-de-registro/dialog-seleccionar-tipo-de-registro.component';
@Component({
  selector: 'app-fallas-list',
  templateUrl: './fallas-list.component.html',
  styleUrls: ['./fallas-list.component.scss']
})
export class FallasListComponent implements OnInit {

  verMensajeCreacionExitosa = false;

  constructor(private readonly matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  registroMasivo():void{

  }
  registroIndividual():void{
    const dialogSeleccionarTipoDeRegistro = this.matDialog.open(DialogSeleccionarTipoDeRegistroComponent,{
      width:'646px'
    });
  }
}
