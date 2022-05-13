import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-maintenance-service-area',
  templateUrl: './dialog-maintenance-service-area.component.html',
  styleUrls: ['./dialog-maintenance-service-area.component.scss']
})
export class DialogMaintenanceServiceAreaComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceServiceAreaComponent>) { }

  ngOnInit(): void {
  }

  onSaveServiceArea():void{
    this.dialogRef.close(true);
  }
  onClose():void{
    this.dialogRef.close(false);
  }

}
