import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';

@Component({
  selector: 'app-dialog-new-srt',
  templateUrl: './dialog-new-srt.component.html',
  styleUrls: ['./dialog-new-srt.component.scss']
})
export class DialogNewSrtComponent implements OnInit {

  placeOfRepair: any;
  typeSrt: any;
  formSrt: FormGroup;

  constructor(private readonly dialogRef: MatDialogRef<DialogNewSrtComponent>,
              @Inject(MAT_DIALOG_DATA) public data,private readonly matDialog:MatDialog,
              private readonly configurationAndMaintenanceService: ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.loadEnum();
    this.onLoadFormSrt();
  }

  onLoadFormSrt():void{
    if(this.data.option=='new'){
      this.formSrt = new FormGroup ({
        lugar : new FormControl([Validators.required]),
        tipo : new FormControl ([Validators.required]),
        grupoSrt : new FormControl ('',[Validators.required]),
        procedimiento : new FormControl ('',[Validators.required]),
        paso : new FormControl ('',[Validators.required]),
        descripcion : new FormControl ('',[Validators.required]),
        srtFabrica : new FormControl ('',[Validators.required]),
        estado: new FormControl (true, [Validators.required])
      });
    }else{
        const estate = this.data.srt.estado==1? true:false;
        this.formSrt = new FormGroup ({
          lugar : new FormControl(this.data.srt.lugar,[Validators.required]),
          tipo : new FormControl (this.data.srt.tipo,[Validators.required]),
          grupoSrt : new FormControl (this.data.srt.grupoSrt,[Validators.required]),
          procedimiento : new FormControl (this.data.srt.procedimiento,[Validators.required]),
          paso : new FormControl (this.data.srt.paso,[Validators.required]),
          descripcion : new FormControl (this.data.srt.descripcion,[Validators.required]),
          srtFabrica : new FormControl (this.data.srt.srtFabrica,[Validators.required]),
          estado: new FormControl (estate, [Validators.required])
        });
    }
  }

  loadEnum():void{
    this.configurationAndMaintenanceService.getEnum('01').subscribe(resp => {
      this.placeOfRepair = resp.body;
    });
    this.configurationAndMaintenanceService.getEnum('03').subscribe(resp => {
      this.typeSrt = resp.body;      
    });
  }


  onSaveSrt():void{
    if(this.formSrt.valid){
      this.formSrt.value.estado==true ? this.formSrt.value.estado=1:this.formSrt.value.estado=0;
      if(this.data.option=='new'){        
        const request = {
                        id:0,
                        activo:true,
                        ...this.formSrt.value
                        }
        console.log(request);
        this.configurationAndMaintenanceService.maintenanceSrt(request).subscribe(resp=>{
          console.log(resp);
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la creacion del SRT');
          }
        });
      }else{
        const request = {
                        id:this.data.srt.id,
                        activo:true,
                        ...this.formSrt.value
                      };
        console.log(request);
        this.configurationAndMaintenanceService.maintenanceSrt(request).subscribe(resp=>{
          console.log(resp);
          if(resp.success){
            this.dialogRef.close(true);
          }else{
            console.log('error en la creacion del SRT');
          }
        });
      }
    }else{
      const dialogError = this.matDialog.open(DialogErrorMessageComponent,{
        disableClose:true,
        data: {text:'Rellene todos los campos requeridos de la constante'}
      });
    }
  }
  
  onClose():void{
    this.dialogRef.close(false);
  }
}
