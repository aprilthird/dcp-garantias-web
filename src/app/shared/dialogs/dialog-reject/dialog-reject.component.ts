import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-reject',
  templateUrl: './dialog-reject.component.html',
  styleUrls: ['./dialog-reject.component.scss']
})
export class DialogRejectComponent implements OnInit {

  comentario : string = '';
  
  constructor(private readonly matDialogRef: MatDialogRef<DialogRejectComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  onClose(selection):void{
    const data = {selection:selection,comentario:this.comentario}
    this.matDialogRef.close(data);
  }
}
