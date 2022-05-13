import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRegisterEnrollmentComponent } from '../../dialogs/dialog-register-enrollment/dialog-register-enrollment.component';
import { Router } from '@angular/router';
import { DialogDraftSavedSuccessfullyComponent } from './../../dialogs/dialog-draft-saved-successfully/dialog-draft-saved-successfully.component';
import { DialogHistoriaESNComponent } from '../../dialogs/dialog-historia-esn/dialog-historia-esn.component';
import { GarantiasService } from 'app/shared/services/garantias/garantias.service';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { DialogOperationSuccessfullyComponent } from 'app/shared/dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements OnInit {

  enrollment:any;
  formRegisterEngine:FormGroup;
  constructor(private readonly matDialog: MatDialog, private readonly router: Router,
              private readonly garantiasService: GarantiasService,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService ) { }

  ngOnInit(): void {
    this.configurationAndMaintenanceService.listWarrantyTypes().subscribe(resp=>{
      console.log(resp);
    });
    this.configurationAndMaintenanceService.listEnrollment().subscribe(resp=>{
      console.log(resp);
    });
    this.loadFormRegisterEngine();
  }

  loadFormRegisterEngine():void{
    this.formRegisterEngine = new FormGroup({
      esn: new FormControl('',[Validators.required]),
      os: new FormControl('',[Validators.required]),
      tipoGarantia: new FormControl([Validators.required]),
      idQueja1: new FormControl([Validators.required]),
      idQueja2: new FormControl([Validators.required]),
      idQueja3: new FormControl([Validators.required]),
      idQueja4: new FormControl([Validators.required]),
    })
  }

  getEsn():void{
    console.log('ok');
  }


  onOpenDialogRegisterEnrollment():void{
    const dialogNewEnrollment = this.matDialog.open(DialogRegisterEnrollmentComponent,{
          width: '990px',
          data: {option:'new',type:'engine', name:'motor'},
          disableClose:true
        }
      );
    dialogNewEnrollment.afterClosed().subscribe(resp=>{
      if(resp){
        this.openDialogOperationSuccessfully('Matricula creada con éxito');
      }else{
        console.log('operacion cancelada');        
      }
    });
  }

  openDialogOperationSuccessfully(textDialog:string):void{
    const dialogOperationSuccessfully = this.matDialog.open(DialogOperationSuccessfullyComponent,{
      data:{text:textDialog}
    });
    dialogOperationSuccessfully.afterClosed().subscribe();
  }

  onGarantias():void{
    this.router.navigate(['/garantias']);
  }

  onOpenDialogSaveDraft():void{
    const dialogSaveDraft = this.matDialog.open(DialogDraftSavedSuccessfullyComponent, {
      disableClose:true
    });
  }

  onSaveDraft():void{
    this.onOpenDialogSaveDraft();
  }

  onOpenDialogHistoriaEsn():void{
    const dialogHistoriaEsn = this.matDialog.open(DialogHistoriaESNComponent,{
      data:{type:'engine', name: 'motor'},
      width: '900px'
    });
  }
}
