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
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  request:any;
  typeWarranty:any;
  enrollmentByEsn = {
    cliente:'',
    direccion:'',
    aplicacion:'',
    modelo:'',
    cpl:'',
    etoPto:'',
    fechaInicioGarantia:'',
    bis:false
  };
  osObject={
    claseActividad:'',
    codAreaServicios:'',
    fechaLib:'',
    os:''
  }
  warrantyTypes ={
    1: "ProductoNuevo",
    2: "MotorRecon",
    3: "RepuestoNuevo",
    4: "RepuestoDefectuoso",
    5: "Cap",
    6: "ExtendidaMayor",
    7: "Cdc",
    8: "Trp",
    9: "Atc",
    10: "Memo",
  }
  viewsTypesWarranty = {
    a:false,
    b:false,
    c:false,
    d:false,
    e:false,
    f:false,
    g:false,
    h:false,
    i:false,
    j:false,
  }
  complaints:any[];
  formRegisterEngine:FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private readonly matDialog: MatDialog, private readonly router: Router,
              private readonly garantiasService: GarantiasService,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.configurationAndMaintenanceService.getEnum('02').subscribe(resp=>{
      console.log(resp);
    });
    this.configurationAndMaintenanceService.listEnrollmentByEsn('100').subscribe(resp=>{
      console.log(resp);
    });
    this.loadComplaints();
    this.loadFormRegisterEngine();
  }

  loadComplaints():void{
    this.configurationAndMaintenanceService.listComplaints().subscribe(resp=>{
      this.complaints = resp.data;
    });
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
      comentarios: new FormControl('',[Validators.required]),
      idUsuarioEvaluador: new FormControl([Validators.required])
    })
  }

  getEsn():void{
    const esn = this.formRegisterEngine.value.esn;
    if(esn!=''){
      this.garantiasService.findEsn(esn).subscribe(resp=>{
        if(resp.body){
          this.enrollmentByEsn = resp.body;
        }else{
          this.openSnackBar('No existe matricula con tal ESN');
        }
      })
    }else{
      this.openSnackBar('Ingrese el ESN');
    }
  }

  getOs():void{
    const os = this.formRegisterEngine.value.os;
    if(os!=''){
      this.garantiasService.findOs(os).subscribe(resp=>{
        if(resp.body){
          this.osObject = resp.body;
        }else{
          this.openSnackBar('No existe tal OS');
        }
      })
    }else{
      this.openSnackBar('Ingrese el OS');
    }
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

  onGarantias():void{
    this.router.navigate(['/garantias']);
  }

  openDialogOperationSuccessfully(textDialog:string):void{
    const dialogOperationSuccessfully = this.matDialog.open(DialogOperationSuccessfullyComponent,{
      data:{text:textDialog}
    });
    dialogOperationSuccessfully.afterClosed().subscribe();
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
      data:{type:'generator', name: 'generador'},
      width: '900px'
    });
  }

  openSnackBar(message:string):void{
    this._snackBar.open(message,'Entendido',{
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['mat-toolbar', 'mat-primary','button-color']
    })
  }

  selectTypeWarranty(){
    const type = this.formRegisterEngine.value.tipoGarantia;
    console.log(this.formRegisterEngine.value.tipoGarantia);
    switch (type) {
      case '1':
        this.viewsTypesWarranty.a = true;
        this.viewsTypesWarranty.b = false;
        this.viewsTypesWarranty.c = false;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = false;
        this.viewsTypesWarranty.h = false;
        this.viewsTypesWarranty.i = false;
        this.viewsTypesWarranty.j = false;
        break;
      case '2':
        this.viewsTypesWarranty.a = false;
        this.viewsTypesWarranty.b = true;
        this.viewsTypesWarranty.c = false;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = false;
        this.viewsTypesWarranty.h = false;
        this.viewsTypesWarranty.i = false;
        this.viewsTypesWarranty.j = false;
        break;
      case '3':
        this.viewsTypesWarranty.a = false;
        this.viewsTypesWarranty.b = false;
        this.viewsTypesWarranty.c = true;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = false;
        this.viewsTypesWarranty.h = false;
        this.viewsTypesWarranty.i = false;
        this.viewsTypesWarranty.j = false;
        break;
      case '4':
        this.viewsTypesWarranty.a = false;
        this.viewsTypesWarranty.b = false;
        this.viewsTypesWarranty.c = false;
        this.viewsTypesWarranty.d = true;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = false;
        this.viewsTypesWarranty.h = false;
        this.viewsTypesWarranty.i = false;
        this.viewsTypesWarranty.j = false;
        break;
      case '5':
        this.viewsTypesWarranty.a = false;
        this.viewsTypesWarranty.b = false;
        this.viewsTypesWarranty.c = false;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = true;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = false;
        this.viewsTypesWarranty.h = false;
        this.viewsTypesWarranty.i = false;
        this.viewsTypesWarranty.j = false;
        break;
      case '6':
        this.viewsTypesWarranty.a = false;
        this.viewsTypesWarranty.b = false;
        this.viewsTypesWarranty.c = false;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = true;
        this.viewsTypesWarranty.g = false;
        this.viewsTypesWarranty.h = false;
        this.viewsTypesWarranty.i = false;
        this.viewsTypesWarranty.j = false;
        break;
      case '7':
        this.viewsTypesWarranty.a = false;
        this.viewsTypesWarranty.b = false;
        this.viewsTypesWarranty.c = false;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = true;
        this.viewsTypesWarranty.h = false;
        this.viewsTypesWarranty.i = false;
        this.viewsTypesWarranty.j = false;
        break;
      case '8':
        this.viewsTypesWarranty.a = false;
        this.viewsTypesWarranty.b = false;
        this.viewsTypesWarranty.c = false;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = false;
        this.viewsTypesWarranty.h = true;
        this.viewsTypesWarranty.i = false;
        this.viewsTypesWarranty.j = false;
        break;
      case '9':
        this.viewsTypesWarranty.a = false;
        this.viewsTypesWarranty.b = false;
        this.viewsTypesWarranty.c = false;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = false;
        this.viewsTypesWarranty.h = false;
        this.viewsTypesWarranty.i = true;
        this.viewsTypesWarranty.j = false;
        break;
      case '10':
        this.viewsTypesWarranty.a = false;
        this.viewsTypesWarranty.b = false;
        this.viewsTypesWarranty.c = false;
        this.viewsTypesWarranty.d = false;
        this.viewsTypesWarranty.e = false;
        this.viewsTypesWarranty.f = false;
        this.viewsTypesWarranty.g = false;
        this.viewsTypesWarranty.h = false;
        this.viewsTypesWarranty.i = false;
        this.viewsTypesWarranty.j = true;
       break;    
      default:
        break;
    }
  }

  onGetForm(data:any):void{
    console.log(data);
    if(data.success){
      this.typeWarranty = {...data.form}
    }else{
      console.log('ingresar los campos del tipo de garantía')
    }
  }

  sendRegister():void{
    console.log(this.formRegisterEngine.value);
    this.request = {id:0,idTipo:1,...this.typeWarranty,...this.formRegisterEngine.value};
    console.log(this.request);
    this.garantiasService.saveWarranty(this.request).subscribe(resp=>{
      console.log(resp);
    });
  }
}
