import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-question-new-record',
  templateUrl: './dialog-question-new-record.component.html',
  styleUrls: ['./dialog-question-new-record.component.scss']
})
export class DialogQuestionNewRecordComponent implements OnInit {

  constructor( private readonly router: Router,
                private readonly matDialogRef: MatDialogRef<DialogQuestionNewRecordComponent>) { }

  ngOnInit(): void {
  }

  onRegisterBasic(type):void{
    this.matDialogRef.close();
    this.router.navigate([type]);
  }

}
