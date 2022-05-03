import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-register-enrollment',
  templateUrl: './dialog-register-enrollment.component.html',
  styleUrls: ['./dialog-register-enrollment.component.scss']
})
export class DialogRegisterEnrollmentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
   }

  ngOnInit(): void {
    console.log(this.data);
  }

}
