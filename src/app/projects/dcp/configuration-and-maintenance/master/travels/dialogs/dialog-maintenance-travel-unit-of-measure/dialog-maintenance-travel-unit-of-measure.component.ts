import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-maintenance-travel-unit-of-measure',
  templateUrl: './dialog-maintenance-travel-unit-of-measure.component.html',
  styleUrls: ['./dialog-maintenance-travel-unit-of-measure.component.scss']
})
export class DialogMaintenanceTravelUnitOfMeasureComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceTravelUnitOfMeasureComponent>) { }

  ngOnInit(): void {
  }

  
  onSaveTravelUnitOfMeasure():void{
    this.dialogRef.close(true);
  }
  onClose():void{
    this.dialogRef.close(false);
  }
}
