import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-seleccionar-tipo-de-registro',
  templateUrl: './dialog-seleccionar-tipo-de-registro.component.html',
  styleUrls: ['./dialog-seleccionar-tipo-de-registro.component.scss']
})
export class DialogSeleccionarTipoDeRegistroComponent implements OnInit {

  constructor(private readonly router: Router,private readonly matDialogRef: MatDialogRef<DialogSeleccionarTipoDeRegistroComponent>) { }

  ngOnInit(): void {
  }

  onRegisterBasic(type):void{
    localStorage.setItem('text',type);
    localStorage.setItem('action','new');
    this.matDialogRef.close();
    localStorage.setItem('verFalla','false');
    this.router.navigate(['gestion-fallas/registro-de-falla']);
  }
}
