import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GarantiasService } from 'app/shared/services/garantias/garantias.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  data1: string;
  data2: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', data1: 'abcdefg', data2: 'hijklmn'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', data1: 'abcdefg', data2: 'hijklmn'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', data1: 'abcdefg', data2: 'hijklmn'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', data1: 'abcdefg', data2: 'hijklmn'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', data1: 'abcdefg', data2: 'hijklmn'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', data1: 'abcdefg', data2: 'hijklmn'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', data1: 'abcdefg', data2: 'hijklmn'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', data1: 'abcdefg', data2: 'hijklmn'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', data1: 'abcdefg', data2: 'hijklmn'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', data1: 'abcdefg', data2: 'hijklmn'},
];

@Component({
  selector: 'app-dialog-historia-esn',
  templateUrl: './dialog-historia-esn.component.html',
  styleUrls: ['./dialog-historia-esn.component.scss']
})
export class DialogHistoriaESNComponent implements OnInit {

  displayedColumns: string[] = ['pgbuClaim', 'numberOs', 'serviceArea', 'invoiceNumber', 'montoFinal', 'fechaCartaCredito'];
  dataSource = [];
  esnForm:FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  seeTable:boolean = false;
  seeNoRecords:boolean = false;
  
  constructor( @Inject(MAT_DIALOG_DATA) public data, private readonly dialogRef: MatDialogRef<DialogHistoriaESNComponent>,
                private readonly garantiasService:GarantiasService,
                private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadFormEsn();
    console.log(this.data);
  }

  onClose():void{
    this.dialogRef.close();
  }

  loadFormEsn():void{
    this.esnForm = new FormGroup ({
      esn: new FormControl('',[Validators.required])
    });
  }

  getHistoryEsn():void{
    if(this.esnForm.valid){
      // const request = {filter : {esn: this.esnForm.value.esn,fechaFin: '2022-05-12T09:47:38.423',fechaIni: '2022-05-12T09:47:38.423'}};
      this.garantiasService.findHistoryEsn(this.esnForm.value.esn).subscribe(resp=>{
        console.log(resp);
        this.dataSource = resp.data;
        if(this.dataSource.length>0){
          this.seeTable = true;
          this.seeNoRecords = false;
        }else{
          this.seeTable = false;
          this.seeNoRecords = true;
        }
      })
    }else{
      this.openSnackBar('Ingrese el esn');
    }
  }

  openSnackBar(message:string):void{
    this._snackBar.open(message,'Entendido',{
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['mat-toolbar', 'mat-primary','button-color']
    })
  }

}
