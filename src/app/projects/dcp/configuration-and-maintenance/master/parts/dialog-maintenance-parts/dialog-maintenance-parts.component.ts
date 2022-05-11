import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-maintenance-parts',
  templateUrl: './dialog-maintenance-parts.component.html',
  styleUrls: ['./dialog-maintenance-parts.component.scss']
})
export class DialogMaintenancePartsComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenancePartsComponent>) { }

  ngOnInit(): void {
  }

  onSavePart():void{
    this.dialogRef.close(true);
  }
  onClose():void{
    this.dialogRef.close(false);
  }

}
