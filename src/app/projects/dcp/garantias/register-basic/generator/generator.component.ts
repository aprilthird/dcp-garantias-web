import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegisterEnrollmentComponent } from '../../dialogs/dialog-register-enrollment/dialog-register-enrollment.component';
import { Router } from '@angular/router';
import { DialogDraftSavedSuccessfullyComponent } from './../../dialogs/dialog-draft-saved-successfully/dialog-draft-saved-successfully.component';
import { DialogHistoriaESNComponent } from '../../dialogs/dialog-historia-esn/dialog-historia-esn.component';
@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  constructor(private readonly matDialog: MatDialog, private readonly router: Router) { }

  ngOnInit(): void {
  }

  onOpenDialogRegisterEnrollment():void{
    const dialog = this.matDialog.open(DialogRegisterEnrollmentComponent, {
      width: '990px',
      data: {type:'generator', name:'generador'}
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

  onOpenDialogHistoriaEsn():void{
    const dialogHistoriaEsn = this.matDialog.open(DialogHistoriaESNComponent,{
      data:{type:'generator', name: 'generador'},
      width: '900px'
    });
  }
}
