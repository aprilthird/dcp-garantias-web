import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-maintenance-engine-model',
  templateUrl: './dialog-maintenance-engine-model.component.html',
  styleUrls: ['./dialog-maintenance-engine-model.component.scss']
})
export class DialogMaintenanceEngineModelComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceEngineModelComponent>) { }

  ngOnInit(): void {
  }

  onSaveEngineModel():void{
    this.dialogRef.close(true);
  }
  onClose():void{
    this.dialogRef.close(false);
  }

}
