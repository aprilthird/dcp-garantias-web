import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-maintenance-account-code',
  templateUrl: './maintenance-account-code.component.html',
  styleUrls: ['./maintenance-account-code.component.scss']
})
export class MaintenanceAccountCodeComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<MaintenanceAccountCodeComponent>) { }

  ngOnInit(): void {
  }

  onSaveAccountCode():void{
    this.dialogRef.close(true);
  }
  onClose():void{
    this.dialogRef.close(false);
  }

}
