import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-maintenance-failures',
  templateUrl: './dialog-maintenance-failures.component.html',
  styleUrls: ['./dialog-maintenance-failures.component.scss']
})
export class DialogMaintenanceFailuresComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceFailuresComponent>) { }

  ngOnInit(): void {
  }

  onSaveFailure():void{
    this.dialogRef.close(true);
  }
  onClose():void{
    this.dialogRef.close(false);
  }

}

