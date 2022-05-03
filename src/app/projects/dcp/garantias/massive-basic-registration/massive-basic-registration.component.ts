import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogMassiveRegistrationSuccessfullyComponent } from '../dialogs/dialog-massive-registration-successfully/dialog-massive-registration-successfully.component';

@Component({
  selector: 'app-massive-basic-registration',
  templateUrl: './massive-basic-registration.component.html',
  styleUrls: ['./massive-basic-registration.component.scss']
})
export class MassiveBasicRegistrationComponent implements OnInit {

  constructor(private readonly router: Router,
              private readonly dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onGarantias():void{
    this.router.navigate(['/garantias']);
  }

  onOpenDialogMassiveRegistration():void{
    const dialogMassibeRegistration = this.dialog.open(DialogMassiveRegistrationSuccessfullyComponent,{
      disableClose:true
    });

  }

  onMassiveRegistration():void{
    this.onOpenDialogMassiveRegistration();
  }
}
