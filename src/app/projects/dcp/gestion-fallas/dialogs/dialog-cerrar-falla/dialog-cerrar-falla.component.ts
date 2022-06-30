import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-cerrar-falla',
  templateUrl: './dialog-cerrar-falla.component.html',
  styleUrls: ['./dialog-cerrar-falla.component.scss']
})
export class DialogCerrarFallaComponent implements OnInit {

  constructor(private readonly matDialogRef: MatDialogRef<DialogCerrarFallaComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  onClose(success):void{
    this.matDialogRef.close(success);
  }

}
