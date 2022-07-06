import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogMassiveRegistrationSuccessfullyComponent } from 'app/projects/dcp/garantias/dialogs/dialog-massive-registration-successfully/dialog-massive-registration-successfully.component';

@Component({
  selector: 'app-basic-registration',
  templateUrl: './basic-registration.component.html',
  styleUrls: ['./basic-registration.component.scss']
})
export class BasicRegistrationComponent implements OnInit {

  usuario:any;

  constructor(private readonly router:Router, private readonly matDialog: MatDialog) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(this.usuario);    
  }

  onListUsers():void{
    this.router.navigate(['/digital-tools/users-list']);
  }

  registrarDatosDelUsuario():void{
    const dialogRegistrarDatosDelUsuario = this.matDialog.open(DialogMassiveRegistrationSuccessfullyComponent,{
      data:{text:'Se ingresaron los datos del usuario'},
      disableClose:true, width: '385px',
    })
    dialogRegistrarDatosDelUsuario.afterClosed().subscribe(responseDialog=>{
      if(responseDialog){
        this.router.navigate(['/digital-tools/users-list']);
      }
    });
  }
}
