import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import { SnackBarMessageComponent } from 'app/shared/dialogs/snack-bar-message/snack-bar-message.component';

@Component({
  selector: 'app-dialog-asignacion-de-la-falla',
  templateUrl: './dialog-asignacion-de-la-falla.component.html',
  styleUrls: ['./dialog-asignacion-de-la-falla.component.scss']
})
export class DialogAsignacionDeLaFallaComponent implements OnInit {

  selectedValue:number;
  niveles : any[] = [{nombre:'Ing. Soporte', id: 1}, {nombre:'DFSE', id: 2}, {nombre:'Fabrica', id: 3}];
  usuariosIngSoporte = [{nombre:'Pedro Gutierrez', id: 1}, {nombre:'Angela Ruiz', id: 2}, {nombre:'Miguel Gonzales', id: 3}];
  usuariosDfse = [{nombre:'Diana Zolano', id: 4}, {nombre:'Andres Caceres', id: 5}, {nombre:'Pedro Luna', id: 6}];
  usuariosFabrica = [{nombre:'Luigi Dominguez', id: 7}, {nombre:'Astrid Cerna', id: 8}, {nombre:'Steven Sifuentes', id: 9}];
  usuarios = [];
  
  constructor(private readonly matDialogRef: MatDialogRef<DialogAsignacionDeLaFallaComponent>,
              private readonly matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data:any,
              private readonly matSnackBar:MatSnackBar) { }

  ngOnInit(): void {
    console.log(this.data);
    
    switch(this.data.nivel){
      case 1: this.usuarios = this.usuariosIngSoporte;
      break;
      case 2: this.usuarios = this.usuariosDfse;
      break;
      case 3: this.usuarios = this.usuariosFabrica;
      break;
      default:
      break;
    }
  }

  onClose():void{
    this.matDialogRef.close({success:false});
  }

  agregarAsignacion():void{
    if(!(this.selectedValue==null)){
        this.matDialogRef.close({success:true, idUsuario:this.selectedValue})
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
