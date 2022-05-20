import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-repuesto-nuevo-respuesto-defectuoso',
  templateUrl: './repuesto-nuevo-respuesto-defectuoso.component.html',
  styleUrls: ['./repuesto-nuevo-respuesto-defectuoso.component.scss']
})
export class RepuestoNuevoRespuestoDefectuosoComponent implements OnInit {

  @Output('onGetForm') valueEventGetForm = new EventEmitter<any>();
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm():void{
    this.form = new FormGroup({
      numParteRepuesto: new FormControl('',[Validators.required]),
      puntoFalla: new FormControl('',[Validators.required]),
      medida: new FormControl([Validators.required]),
      fechaInicioGarantia: new FormControl([Validators.required]),
      fechaFalla: new FormControl([Validators.required]),
    })
  }

  onGetForm():void{
    if(this.form.valid){
      // const momentDateA = new Date(this.form.value.fechaInicioGarantia);
      // const formattedDateA = moment(momentDateA).format("YYYY/MM/DD");
      // this.form.value.fechaInicioGarantia = formattedDateA;
      // const momentDate = new Date(this.form.value.fechaFalla);
      // const formattedDate = moment(momentDate).format("YYYY/MM/DD");
      // this.form.value.fechaFalla = formattedDate;
      // console.log(formattedDate);
      const form = {success:true, form: {...this.form.value}};
      this.valueEventGetForm.emit(form);
    }else{
      const form = {success:false}
      this.valueEventGetForm.emit(form);
    }
  }
}
