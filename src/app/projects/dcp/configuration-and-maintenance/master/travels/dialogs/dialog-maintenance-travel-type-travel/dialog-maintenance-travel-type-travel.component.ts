import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-maintenance-travel-type-travel',
  templateUrl: './dialog-maintenance-travel-type-travel.component.html',
  styleUrls: ['./dialog-maintenance-travel-type-travel.component.scss']
})
export class DialogMaintenanceTravelTypeTravelComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceTravelTypeTravelComponent>) { }

  ngOnInit(): void {
  }

  onSaveTravelType():void{
    this.dialogRef.close(true);
  }
  onClose():void{
    this.dialogRef.close(false);
  }

}
