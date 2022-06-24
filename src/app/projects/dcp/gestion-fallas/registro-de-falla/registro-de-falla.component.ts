import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GarantiasService } from 'app/shared/services/garantias/garantias.service';
import { DialogAdjuntarDocumentoComponent } from '../../garantias/dialogs/dialog-adjuntar-documento/dialog-adjuntar-documento.component';
import { DialogRegisterEnrollmentComponent } from '../../garantias/dialogs/dialog-register-enrollment/dialog-register-enrollment.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { UserService } from "app/core/user/user.service";
import { FallasService } from 'app/shared/services/gestion-fallas/fallas.service';
import { DialogDraftSavedSuccessfullyComponent } from '../../garantias/dialogs/dialog-draft-saved-successfully/dialog-draft-saved-successfully.component';

@Component({
  selector: 'app-registro-de-falla',
  templateUrl: './registro-de-falla.component.html',
  styleUrls: ['./registro-de-falla.component.scss']
})
export class RegistroDeFallaComponent implements OnInit {

  accion:string; tipoDeEquipo:string;
  formFalla: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center'; verticalPosition: MatSnackBarVerticalPosition = 'top';
  matriculaEncontrada: any;
  maestraAreasDeServicio = []; maestraQuejas:any[];
  usuarioDeLaSession:any;


  constructor(private readonly router:Router, private readonly matDialog: MatDialog,
              private readonly garantiasService: GarantiasService, private _snackBar: MatSnackBar,
              private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService,
              private readonly userService:UserService, private readonly fallasService:FallasService) { }

  ngOnInit(): void {
    this.cargarInfoLocalStorage();
    this.cargarFormulario();
    this.cargarMaestras();
  }

  cargarFormulario():void{
    if(this.accion=='new'){
      this.formFalla = new FormGroup({
        os: new FormControl('', [Validators.required]),
        io: new FormControl('', [Validators.required]),
        esn: new FormControl('', [Validators.required]),
        idArea: new FormControl(null),
        aplicacion: new FormControl('', [Validators.required]),
        numParte: new FormControl('',[Validators.required]),
        puntoFalla: new FormControl('',[Validators.required]),
        tipoFalla: new FormControl('',[Validators.required]),
        fechaFalla: new FormControl('',[Validators.required]),
        descripcion: new FormControl('',[Validators.required]),
        queja1: new FormControl(null),
        queja2: new FormControl(null),
        queja3: new FormControl(null),
        evento: new FormControl('',[Validators.required]),
        //falta agregar idEsn
        //falta agreagr idUsuario
      });
    }
  }

  cargarInfoLocalStorage():void{
    this.accion = localStorage.getItem('action'); //trae de localStorage la acción que se hará (crear e editar falla)
    this.tipoDeEquipo = localStorage.getItem('text'); //trae de localstorge el tipo de equipo (motor o generador)
  }

  cargarMaestras():void{
    this.configurationAndMaintenanceService.listaAreasDeServicioSinPaginar().subscribe(response=>{
      this.maestraAreasDeServicio = response.data;
    });
    this.userService.user$.subscribe(response=>{
      this.usuarioDeLaSession = response;  
    });
    this.configurationAndMaintenanceService.listComplaints(1).subscribe(resp=>{
      this.maestraQuejas = resp.data;
    });
  }
  
  getEsn():void{
    const esn = this.formFalla.value.esn;
    if(esn!=''){
      this.garantiasService.findEsn(esn).subscribe(response=>{
        if(response.body){
          this.matriculaEncontrada = response.body;
        }else{
          this.openSnackBar('No existe matricula con tal ESN');
          this.matriculaEncontrada = null;
        }
      })
    }else{
      this.openSnackBar('Ingrese el ESN');
      this.matriculaEncontrada = null;
    }
  }

  onListfallas():void{
    this.router.navigate(['/gestion-fallas']);
  }

  adjuntarDocumento():void{
    const dialogoAdjuntarDocumentos = this.matDialog.open(DialogAdjuntarDocumentoComponent,{
      width: '425px',
      disableClose:true,
      data:{modulo:'fallas'}
    });
    dialogoAdjuntarDocumentos.afterClosed().subscribe(resp=>{
      console.log(resp);
    });
  }

  onRegistrarMatricula():void{
    const dialogRegistrarMatricula = this.matDialog.open(DialogRegisterEnrollmentComponent,{
      width:'990px',
      disableClose: true,
      data: {option:'new',type:'engine', name:'motor'}
    })
  }

  openSnackBar(message:string):void{
    this._snackBar.open(message,'x',{
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['mat-toolbar', 'mat-primary','button-color']
    })
  }

  cargarDatosFalla(accionParaLaFalla:string):void{
    if(this.formFalla.valid){
      if(this.formFalla.value.idArea!=null){
        if(this.formFalla.value.queja1!=null){
          if(this.formFalla.value.queja2!=null){
            if(this.formFalla.value.queja3!=null){
              if(this.matriculaEncontrada!=null){
                const falla = {id:0, activo:true, idEsn: this.matriculaEncontrada!=null?this.matriculaEncontrada.id:'', idUsuario: this.usuarioDeLaSession.id, ...this.formFalla.value};
                this.guardarFalla(falla, accionParaLaFalla);
              }else{ this.mensajeErrorDeCampos(); }
            }else{ this.mensajeErrorDeCampos(); }            
          }else{ this.mensajeErrorDeCampos(); }
        }else{ this.mensajeErrorDeCampos(); }
      }else{ this.mensajeErrorDeCampos(); }
    }else{ this.mensajeErrorDeCampos(); }
    console.log(this.formFalla.value);
    
  }

  guardarFalla(falla:any, accion:any):void{
    if(accion=='registrar'){
      const request = {nivelSoporte:0,...falla};
      this.registroExitosoDeLaFalla();
      // this.fallasService.mantenimientoFallas(request).subscribe(response=>{
      //   if(response.success){
      //   }
      // });
    }
    if(accion=='escalar'){
      const request = {nivelSoporte:1,...falla};
      this.fallasService.mantenimientoFallas(request).subscribe(response=>{
        console.log(response);
      });
    }
  }

  mensajeErrorDeCampos():void{
    const dialogMensajeDeError = this.matDialog.open(DialogErrorMessageComponent,{
      width:'386px',
      disableClose:true,
      data:{text:'Llene todos los campos y que sean datos válidos'}
    });
  }

  registroExitosoDeLaFalla():void{
    const dialogRegistroExitoso = this.matDialog.open(DialogDraftSavedSuccessfullyComponent,{
      disableClose:true,
      data: {text:'Se guardó el registro de la falla con éxito'},
      width:'386px'
    });
    dialogRegistroExitoso.afterClosed().subscribe(response=>{
      if(response){
        localStorage.setItem('success','true');
        this.router.navigate(['/gestion-fallas']);
      }
    });
  }

}
