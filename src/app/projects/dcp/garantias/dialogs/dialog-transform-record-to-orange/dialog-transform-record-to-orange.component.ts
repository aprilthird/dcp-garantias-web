import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-transform-record-to-orange',
  templateUrl: './dialog-transform-record-to-orange.component.html',
  styleUrls: ['./dialog-transform-record-to-orange.component.scss']
})
export class DialogTransformRecordToOrangeComponent implements OnInit {

  formGroup:FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogTransformRecordToOrangeComponent>) { }

  ngOnInit(): void {
    this.loadForm();
  }

  onClose(option):void{
    this.dialogRef.close(option);
  }

  loadForm():void{
    this.formGroup = new FormGroup({
      user: new FormControl(),
      datosOk: new FormControl(),
      garantiaOk: new FormControl(),
      coherenciaOk: new FormControl(),
      esnOk: new FormControl(),
    });
  }
}
