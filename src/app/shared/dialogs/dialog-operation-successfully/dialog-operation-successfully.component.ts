import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-operation-successfully',
  templateUrl: './dialog-operation-successfully.component.html',
  styleUrls: ['./dialog-operation-successfully.component.scss']
})
export class DialogOperationSuccessfullyComponent implements OnInit {

  constructor(private readonly matDialogRef: MatDialogRef<DialogOperationSuccessfullyComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  onClose():void{
    this.matDialogRef.close(true);
  }

}
