import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-massive-registration-successfully',
  templateUrl: './dialog-massive-registration-successfully.component.html',
  styleUrls: ['./dialog-massive-registration-successfully.component.scss']
})
export class DialogMassiveRegistrationSuccessfullyComponent implements OnInit {

  constructor(private readonly router: Router,
    private readonly matDialogRef: MatDialogRef<DialogMassiveRegistrationSuccessfullyComponent>) { }

  ngOnInit(): void {
  }

  onClose():void{
    this.matDialogRef.close();
    this.router.navigate(['/garantias']);
  }

}
