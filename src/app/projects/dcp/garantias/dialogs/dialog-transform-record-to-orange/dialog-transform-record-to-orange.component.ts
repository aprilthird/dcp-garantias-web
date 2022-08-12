import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { GarantiasService } from 'app/shared/services/garantias/garantias.service';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
@Component({
  selector: 'app-dialog-transform-record-to-orange',
  templateUrl: './dialog-transform-record-to-orange.component.html',
  styleUrls: ['./dialog-transform-record-to-orange.component.scss']
})
export class DialogTransformRecordToOrangeComponent implements OnInit {

  formGroup:FormGroup;
  userOptions = [];

  constructor(private readonly dialogRef: MatDialogRef<DialogTransformRecordToOrangeComponent>, private readonly matDialog:MatDialog,
             @Inject(MAT_DIALOG_DATA) public data, private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService,
              private readonly garantiasService:GarantiasService) { }

  ngOnInit(): void {
    this.loadForm();
    console.log(this.data);
    this.loadUsers();
  }

  onClose(_option):void{
      this.dialogRef.close(_option);
  }

  loadUsers(): void{
    this.configurationAndMaintenanceService.obtenerUsuariosPorRol(7).subscribe(responseApi=>{
      this.userOptions = responseApi;
    });
  }

  loadForm():void{
    this.formGroup = new FormGroup({
      idUsuarioElavorador: new FormControl(null,[Validators.required]),
      criterio1: new FormControl(false),
      criterio2: new FormControl(false),
      criterio3: new FormControl(false),
      criterio4: new FormControl(false),
    });
  }

  saveEvaluation():void{
    if(this.formGroup.valid){
      const requestCheckList = {idGarantia:this.data.idGarantia, ...this.formGroup.value};
      this.garantiasService.checkList(requestCheckList).subscribe(resp=>{
        if(resp.id){
          this.onClose(true);
        }else{
          this.onClose(false);
        }
      })
    }else{
      const dialogError = this.matDialog.open(DialogErrorMessageComponent,{
        data:{text:'Seleccione un usuario elaborador del informe'},
        disableClose:true
      });
    }
  }
}
