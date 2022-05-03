import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-draft-saved-successfully',
  templateUrl: './dialog-draft-saved-successfully.component.html',
  styleUrls: ['./dialog-draft-saved-successfully.component.scss']
})
export class DialogDraftSavedSuccessfullyComponent implements OnInit {

  constructor(private readonly router: Router,
              private readonly matDialogRef: MatDialogRef<DialogDraftSavedSuccessfullyComponent>) { }

  ngOnInit(): void {
  }

  onClose():void{
    this.matDialogRef.close();
    this.router.navigate(['/garantias']);
  }

}
