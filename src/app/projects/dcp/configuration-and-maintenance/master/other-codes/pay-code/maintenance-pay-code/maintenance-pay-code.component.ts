import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-maintenance-pay-code',
  templateUrl: './maintenance-pay-code.component.html',
  styleUrls: ['./maintenance-pay-code.component.scss']
})
export class MaintenancePayCodeComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<MaintenancePayCodeComponent>) { }

  ngOnInit(): void {
  }

  onSavePayCode():void{
    this.dialogRef.close(true);
  }
  onClose():void{
    this.dialogRef.close(false);
  }

}
