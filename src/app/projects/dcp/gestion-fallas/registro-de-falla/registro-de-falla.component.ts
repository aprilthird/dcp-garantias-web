import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAdjuntarDocumentoComponent } from '../../garantias/dialogs/dialog-adjuntar-documento/dialog-adjuntar-documento.component';

@Component({
  selector: 'app-registro-de-falla',
  templateUrl: './registro-de-falla.component.html',
  styleUrls: ['./registro-de-falla.component.scss']
})
export class RegistroDeFallaComponent implements OnInit {

  accion:string; tipoDeEquipo:string;

  constructor(private readonly router:Router, private readonly matDialog: MatDialog) { }

  ngOnInit(): void {
    this.cargarInfoLocalStorage();
  }

  cargarInfoLocalStorage():void{
    this.accion = localStorage.getItem('action'); //trae de localStorage la acción que se hará (crear e editar falla)
    this.tipoDeEquipo = localStorage.getItem('text'); //trae de localstorge el tipo de equipo (motor o generador)
  }
  
  onListfallas():void{
    this.router.navigate(['/gestion-fallas']);
  }

  adjuntarDocumento():void{
    const dialogoAdjuntarDocumentos = this.matDialog.open(DialogAdjuntarDocumentoComponent,{
      width: '425px',
      disableClose:true,
      data:{modulo:'fallas'}
    });
    dialogoAdjuntarDocumentos.afterClosed().subscribe(resp=>{
      console.log(resp);
    });
  }
}
