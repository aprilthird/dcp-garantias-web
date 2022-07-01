import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { GarantiasService } from 'app/shared/services/garantias/garantias.service';
@Component({
  selector: 'app-dialog-transform-record-to-gray',
  templateUrl: './dialog-transform-record-to-gray.component.html',
  styleUrls: ['./dialog-transform-record-to-gray.component.scss']
})
export class DialogTransformRecordToGrayComponent implements OnInit {

  formGroup:FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogTransformRecordToGrayComponent>, private readonly matDialog:MatDialog,
             @Inject(MAT_DIALOG_DATA) public data, private readonly garantiasService:GarantiasService) { }

  ngOnInit(): void {
    this.loadForm();
  }

  onClose(_option):void{
      this.dialogRef.close(_option);
  }

  loadForm():void{
    this.formGroup = new FormGroup({
      paymentDate: new FormControl(null,[Validators.required]),
      creditStatementNumber: new FormControl(null,[Validators.required]),
      creditNumber: new FormControl(null,[Validators.required]),
      idClaim: new FormControl(null,[Validators.required]),
      laborRate: new FormControl(null,[Validators.required]),
      idControl: new FormControl(null,[Validators.required]),
    });
  }

  saveTransform():void{
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
        data:{text:'Rellene los campos requeridos'},
        disableClose:true
      });
    }
  }
}
