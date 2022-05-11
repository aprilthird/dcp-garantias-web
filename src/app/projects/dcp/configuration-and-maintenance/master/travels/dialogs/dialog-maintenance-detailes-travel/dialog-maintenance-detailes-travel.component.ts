import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-maintenance-detailes-travel',
  templateUrl: './dialog-maintenance-detailes-travel.component.html',
  styleUrls: ['./dialog-maintenance-detailes-travel.component.scss']
})
export class DialogMaintenanceDetailesTravelComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceDetailesTravelComponent>) { }

  ngOnInit(): void {
  }

  onSaveTravelDetail():void{
    this.dialogRef.close(true);
  }
  onClose():void{
    this.dialogRef.close(false);
  }

}
