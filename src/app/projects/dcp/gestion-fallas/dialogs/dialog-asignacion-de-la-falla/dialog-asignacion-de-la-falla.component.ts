import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarMessageComponent } from 'app/shared/dialogs/snack-bar-message/snack-bar-message.component';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';

@Component({
  selector: 'app-dialog-asignacion-de-la-falla',
  templateUrl: './dialog-asignacion-de-la-falla.component.html',
  styleUrls: ['./dialog-asignacion-de-la-falla.component.scss']
})
export class DialogAsignacionDeLaFallaComponent implements OnInit {

  idUsuarioSeleccionado:number;
  nivelSeleccionado:number;
  niveles : any[];
  usuarios :any[] = [];
  
  
  constructor(private readonly matDialogRef: MatDialogRef<DialogAsignacionDeLaFallaComponent>,
              private readonly matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data:any,
              private readonly matSnackBar:MatSnackBar, private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { }

  ngOnInit(): void {
    this.cargarSelectorEscalarNivel();
  }

  traerUsuariosDelNivelSeleccionado():void{
    // console.log(this.nivelSeleccionado);
    this.configurationAndMaintenanceService.obtenerUsuariosPorRol(this.nivelSeleccionado+2).subscribe(responseApi=>{
        this.usuarios = responseApi;
    });
  }

  cargarSelectorEscalarNivel():void{
    if(this.data.nivel==1){
      this.niveles = [{nombre:'Ing. Soporte', id: 1}, {nombre:'DFSE', id: 2}];
    }
    if(this.data.nivel==2){
      this.niveles = [{nombre:'DFSE', id: 2}];
    }
    if(this.data.nivel==3){
      this.niveles = [{nombre:'Fabrica', id: 3}]
    }
  }

  onClose():void{
    this.matDialogRef.close({success:false});
  }

  agregarAsignacion():void{
    if(!(this.idUsuarioSeleccionado==null)){
        this.matDialogRef.close({success:true, idUsuario:this.idUsuarioSeleccionado,nivelSeleccionado:this.nivelSeleccionado})
    }else{
      this.openSnackBarWarn('Seleccionar un Usuario');
    }
  }

  openSnackBarWarn(message:string):void{
    this.matSnackBar.openFromComponent(SnackBarMessageComponent, {
      data: message,
      duration: 3000,
      horizontalPosition:'center',
      verticalPosition: 'top',
      panelClass:['mat-toolbar', 'mat-primary','button-color']
    });
  }
  
}
