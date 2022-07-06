import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-massive-registration-successfully',
  templateUrl: './dialog-massive-registration-successfully.component.html',
  styleUrls: ['./dialog-massive-registration-successfully.component.scss']
})
export class DialogMassiveRegistrationSuccessfullyComponent implements OnInit {

  constructor(private readonly router: Router, @Inject(MAT_DIALOG_DATA) public data,
              private readonly matDialogRef: MatDialogRef<DialogMassiveRegistrationSuccessfullyComponent>) { }

  ngOnInit(): void {
  }

  onClose(guardar):void{
    this.matDialogRef.close(guardar);
    this.router.navigate(['/garantias']);
  }

}
