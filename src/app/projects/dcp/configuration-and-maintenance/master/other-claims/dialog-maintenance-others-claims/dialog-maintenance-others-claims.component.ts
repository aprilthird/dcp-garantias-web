import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-maintenance-others-claims',
  templateUrl: './dialog-maintenance-others-claims.component.html',
  styleUrls: ['./dialog-maintenance-others-claims.component.scss']
})
export class DialogMaintenanceOthersClaimsComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<DialogMaintenanceOthersClaimsComponent>) { }

  ngOnInit(): void {
  }

  onSaveOtherClaim():void{
    this.dialogRef.close(true);
  }
  onClose():void{
    this.dialogRef.close(false);
  }

}
