import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { GarantiasService } from 'app/shared/services/garantias/garantias.service';
@Component({
  selector: 'app-dialog-transform-record-to-yellow',
  templateUrl: './dialog-transform-record-to-yellow.component.html',
  styleUrls: ['./dialog-transform-record-to-yellow.component.scss']
})
export class DialogTransformRecordToYellowComponent implements OnInit {

  formGroup:FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogTransformRecordToYellowComponent>, private readonly matDialog:MatDialog,
             @Inject(MAT_DIALOG_DATA) public data, private readonly garantiasService:GarantiasService) { }

  ngOnInit(): void {
    this.loadForm();
  }

  onClose(_option):void{
      this.dialogRef.close(_option);
  }

  loadForm():void{
    this.formGroup = new FormGroup({
      idClaim: new FormControl(null,[Validators.required]),
      idControl: new FormControl(null,[Validators.required]),
    });
  }

  saveRapidServer():void{
    if(this.formGroup.valid){
      this.garantiasService.checkList(this.formGroup.value).subscribe(resp=>{
        if(resp.id){
          this.onClose(true);
        }else{
          this.onClose(false);
        }
      })
    }else{
      const dialogError = this.matDialog.open(DialogErrorMessageComponent,{
        data:{text:'Seleccione un claim y un control'},
        disableClose:true
      });
    }
  }
}
