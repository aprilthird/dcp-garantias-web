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
    if(localStorage.getItem('success')){ this.mostrarMensajeRegistroExitosoDeUnaFalla(); };
  }

  registroMasivo():void{

  }
  registroIndividual():void{
    const dialogSeleccionarTipoDeRegistro = this.matDialog.open(DialogSeleccionarTipoDeRegistroComponent,{
      width:'646px'
    });
  }

  mostrarMensajeRegistroExitosoDeUnaFalla():void{
    this.verMensajeCreacionExitosa = true;
    setTimeout(()=>{
      this.verMensajeCreacionExitosa = false;
    },5000);
    localStorage.removeItem('success');
  }
}
