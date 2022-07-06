import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogMassiveRegistrationSuccessfullyComponent } from 'app/projects/dcp/garantias/dialogs/dialog-massive-registration-successfully/dialog-massive-registration-successfully.component';

@Component({
  selector: 'app-tool-request',
  templateUrl: './tool-request.component.html',
  styleUrls: ['./tool-request.component.scss']
})
export class ToolRequestComponent implements OnInit {

  displayedColumns: string[] = ['tipo', 'cantidad'];
  dataSource = [{tipo:'Inside', cantidad:0},
                {tipo:'Inpower', cantidad:0},
                {tipo:'Calibrations', cantidad:0},
                {tipo:'Zap - Its', cantidad:0}];

  constructor(private readonly router:Router, private readonly matDialog:MatDialog) { }

  ngOnInit(): void {
  }

  onListElectronicTools():void{
    this.router.navigate(['/digital-tools/electronic-tools']);
  }

  registrarSolicitud():void{
    const dialogRegistrarDatosDelUsuario = this.matDialog.open(DialogMassiveRegistrationSuccessfullyComponent,{
      data:{text:'Se envió el registro con éxito'},
      disableClose:true, width: '385px',
    })
    dialogRegistrarDatosDelUsuario.afterClosed().subscribe(responseDialog=>{
      if(responseDialog){
        this.router.navigate(['/digital-tools/electronic-tools']);
      }
    });
  }

}