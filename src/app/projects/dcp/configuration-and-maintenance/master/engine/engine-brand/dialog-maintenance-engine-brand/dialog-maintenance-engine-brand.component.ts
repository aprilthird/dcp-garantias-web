import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-maintenance-engine-brand',
  templateUrl: './dialog-maintenance-engine-brand.component.html',
  styleUrls: ['./dialog-maintenance-engine-brand.component.scss']
})
export class DialogMaintenanceEngineBrandComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceEngineBrandComponent>) { }

  ngOnInit(): void {
  }
  onSaveEngineBrand():void{
    this.dialogRef.close(true);
  }
  onClose():void{
    this.dialogRef.close(false);
  }

}
