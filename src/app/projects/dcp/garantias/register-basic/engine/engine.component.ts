import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegisterEnrollmentComponent } from '../../dialogs/dialog-register-enrollment/dialog-register-enrollment.component';
import { Router } from '@angular/router';
import { DialogDraftSavedSuccessfullyComponent } from './../../dialogs/dialog-draft-saved-successfully/dialog-draft-saved-successfully.component';


@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements OnInit {

  constructor(private readonly matDialog: MatDialog, private readonly router: Router) { }

  ngOnInit(): void {
  }

  onOpenDialogRegisterEnrollment():void{
    const dialog = this.matDialog.open(DialogRegisterEnrollmentComponent,{
          width: '990px',
          data: {type:'engine', name:'motor'}
        }
      );
  }

  onGarantias():void{
    this.router.navigate(['/garantias']);
  }

  onOpenDialogSaveDraft():void{
    const dialogSaveDraft = this.matDialog.open(DialogDraftSavedSuccessfullyComponent, {
      disableClose:true
    });
  }

  onSaveDraft():void{
    this.onOpenDialogSaveDraft();
  }
}
