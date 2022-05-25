import { Component,Inject ,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-error-message',
  templateUrl: './dialog-error-message.component.html',
  styleUrls: ['./dialog-error-message.component.scss']
})
export class DialogErrorMessageComponent implements OnInit {

  constructor(private readonly matDialogRef: MatDialogRef<DialogErrorMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  onClose(_delete:any):void{
    this.matDialogRef.close(_delete);
  }
  
}
