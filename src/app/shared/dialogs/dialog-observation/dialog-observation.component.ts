import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-observation',
  templateUrl: './dialog-observation.component.html',
  styleUrls: ['./dialog-observation.component.scss']
})
export class DialogObservationComponent implements OnInit {

  comentario : string = '';

  constructor(private readonly matDialogRef: MatDialogRef<DialogObservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  onClose(selection):void{
    const data = {selection:selection,comentario:this.comentario}
    this.matDialogRef.close(data);
  }
}
