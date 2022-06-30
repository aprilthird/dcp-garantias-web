import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';

@Component({
  selector: 'app-dialog-asignacion-de-la-falla',
  templateUrl: './dialog-asignacion-de-la-falla.component.html',
  styleUrls: ['./dialog-asignacion-de-la-falla.component.scss']
})
export class DialogAsignacionDeLaFallaComponent implements OnInit {

  selectedValue:number;
  usuarios : any[] = [{nombre:'Ing. Soporte', id: 1}, {nombre:'DFSE', id: 2}, {nombre:'Fabrica', id: 3}];
  usuarioResponsable=1;
  
  constructor(private readonly matDialogRef: MatDialogRef<DialogAsignacionDeLaFallaComponent>,
              private readonly matDialog: MatDialog) { }

  ngOnInit(): void {
  }

//   Antes del primer escalado: Registrado - B Inicial
// Escalado Ing. Soporte - Ing. Soporte
// Escalado DFSE - DFSE
// Escalado Fábrica - Fábrica
// Cerrado

  onClose():void{
    this.matDialogRef.close({success:false});
  }

  agregarAsignacion():void{
    console.log(this.selectedValue)
    if(this.selectedValue!=null){
      this.matDialogRef.close({success:true, nivelSoporte:this.selectedValue,idUsuario:this.usuarioResponsable})
    }else{
      const dialogMensajeDeError = this.matDialog.open(DialogErrorMessageComponent,{disableClose:true, data:{text:'Seleccione una asignacion'}});
    }
  }

}
