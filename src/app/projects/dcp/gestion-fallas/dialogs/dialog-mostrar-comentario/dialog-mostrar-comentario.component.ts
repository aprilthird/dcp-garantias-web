import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-mostrar-comentario',
  templateUrl: './dialog-mostrar-comentario.component.html',
  styleUrls: ['./dialog-mostrar-comentario.component.scss']
})
export class DialogMostrarComentarioComponent implements OnInit {

  constructor(private readonly matDialogRef: MatDialogRef<DialogMostrarComentarioComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }
  onClose(success):void{
    this.matDialogRef.close(success);
  }

  obtenerTexto(estado:number):string{
    switch(estado){
      case 4: return 'Tu reclamo ha sido rechazado';
      break;
      case 2: return 'Tu reclamo ha sido observado';
      break;
      default: break;
    }
  }
}
