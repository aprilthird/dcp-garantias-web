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
  usuarios : any[] = [{nombre:'Juane Perez', id: 10}, {nombre:'Jose Diaz', id: 20}];
  usuarioResponsable:string='';
  
  constructor(private readonly matDialogRef: MatDialogRef<DialogAsignacionDeLaFallaComponent>,
              private readonly matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClose():void{
    this.matDialogRef.close({success:false});
  }

  agregarAsignacion():void{
    if(this.usuarioResponsable==''){
      const dialogMensajeDeError = this.matDialog.open(DialogErrorMessageComponent,{disableClose:true, data:{text:'Seleccione una asignacion'}});
    }else{
      this.matDialogRef.close({success:true, idUsuario:this.selectedValue})
    }
  }

}
