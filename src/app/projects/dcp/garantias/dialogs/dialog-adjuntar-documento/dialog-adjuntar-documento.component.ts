import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogErrorMessageComponent } from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';

@Component({
  selector: 'app-dialog-adjuntar-documento',
  templateUrl: './dialog-adjuntar-documento.component.html',
  styleUrls: ['./dialog-adjuntar-documento.component.scss']
})
export class DialogAdjuntarDocumentoComponent implements OnInit {
  
  seccionSeleccionada: any;
  documentosCargados = [];
  secciones:any[] = [{idSeccion:1, valorSeccion:'Detalle reclamo'},
                    {idSeccion:2, valorSeccion:'Fallas'},
                    {idSeccion:3, valorSeccion:'SRT'},
                    {idSeccion:4, valorSeccion:'Partes'},
                    {idSeccion:5, valorSeccion:'Otros reclamables'},
                    {idSeccion:6, valorSeccion:'Viajes'},
                    {idSeccion:7, valorSeccion:'Narrativas'}];

  constructor(private readonly matDialog:MatDialog, private readonly matDialogRef: MatDialogRef<DialogAdjuntarDocumentoComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  cargarDocumento(event):void{
    console.log(event);
    if(this.data.modulo=='garantias'){
      if(this.seccionSeleccionada!=null){
        for (let i = 0; i < event.target.files.length; i++) {
          this.documentosCargados.push(event.target.files[i]);  
        }
      }else{
        const dialogoError = this.matDialog.open(DialogErrorMessageComponent,{
          data:{text:'Debe seleccionar una sección'},
          disableClose:true
        });
      }    
    }
    if(this.data.modulo=='fallas'){
      for (let i = 0; i < event.target.files.length; i++) {
        this.documentosCargados.push(event.target.files[i]);  
      }
    }
  }

  deleteDocumentDetalleReclamo(name):void{
    const index = this.documentosCargados.findIndex(e=>e.name==name);
    this.documentosCargados.splice(index,1);
  }

  agregarDocumento():void{
    if(this.documentosCargados.length==0){
      const dialogoError = this.matDialog.open(DialogErrorMessageComponent,{
        data:{text:'Ningún archivo cargado'},
        disableClose:true
      });
    }else{
      if(this.data.modulo=='garantias'){
        this.matDialogRef.close({accion:true,seccion:this.seccionSeleccionada,documentos:this.documentosCargados});
      }
      if(this.data.modulo=='fallas'){
        this.matDialogRef.close({accion:true,documentos:this.documentosCargados});
      }
    }
  }

  onClose():void{
    this.matDialogRef.close({accion:false});
  }
}
