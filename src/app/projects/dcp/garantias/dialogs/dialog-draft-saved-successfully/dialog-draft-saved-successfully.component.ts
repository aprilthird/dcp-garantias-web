import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-draft-saved-successfully',
  templateUrl: './dialog-draft-saved-successfully.component.html',
  styleUrls: ['./dialog-draft-saved-successfully.component.scss']
})
export class DialogDraftSavedSuccessfullyComponent implements OnInit {

  constructor(private readonly router: Router,
              private readonly matDialogRef: MatDialogRef<DialogDraftSavedSuccessfullyComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  onClose():void{
    this.matDialogRef.close(true);
  }

}
