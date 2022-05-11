import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-new-srt',
  templateUrl: './dialog-new-srt.component.html',
  styleUrls: ['./dialog-new-srt.component.scss']
})
export class DialogNewSrtComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<DialogNewSrtComponent>) { }

  ngOnInit(): void {
  }

  onSaveSrt():void{
    this.dialogRef.close(true);
  }
  onClose():void{
    this.dialogRef.close(false);
  }
}
