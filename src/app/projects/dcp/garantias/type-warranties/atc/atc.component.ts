import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-atc',
  templateUrl: './atc.component.html',
  styleUrls: ['./atc.component.scss']
})
export class AtcComponent implements OnInit {

  @Output('onGetForm') valueEventGetForm = new EventEmitter<any>();
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm():void{
    this.form = new FormGroup({
      ejecucionAdicional: new FormControl('',[Validators.required]),
      medida: new FormControl([Validators.required]),
      fechaAdicional: new FormControl([Validators.required]),
      codigoAdicional: new FormControl('',[Validators.required]),
    })
  }

  onGetForm():void{
    if(this.form.valid){
      // const momentDate = new Date(this.form.value.fechaAdicional);
      // const formattedDate = moment(momentDate).format("YYYY/MM/DD");
      // this.form.value.fechaAdicional = formattedDate;
      // console.log(formattedDate);
      const form = {success:true, form: {...this.form.value}};
      this.valueEventGetForm.emit(form);
    }else{
      const form = {success:false}
      this.valueEventGetForm.emit(form);
    }
  }
}
