import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-see-documents',
  templateUrl: './dialog-see-documents.component.html',
  styleUrls: ['./dialog-see-documents.component.scss']
})

export class DialogSeeDocumentsComponent implements OnInit {

  documentos = [];
  constructor(private readonly matDialogRef: MatDialogRef<DialogSeeDocumentsComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.documentos = this.data.documentos;
  }

  onClose():void{
    this.matDialogRef.close();
  }
}
