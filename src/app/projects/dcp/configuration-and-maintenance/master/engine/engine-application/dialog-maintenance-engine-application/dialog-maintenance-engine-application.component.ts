import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-maintenance-engine-application',
  templateUrl: './dialog-maintenance-engine-application.component.html',
  styleUrls: ['./dialog-maintenance-engine-application.component.scss']
})
export class DialogMaintenanceEngineApplicationComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceEngineApplicationComponent>) { }

  ngOnInit(): void {
  }

  onSaveEngineApplication():void{
    this.dialogRef.close(true);
  }
  onClose():void{
    this.dialogRef.close(false);
  }


}
