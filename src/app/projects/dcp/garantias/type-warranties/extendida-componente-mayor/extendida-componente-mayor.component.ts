import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-extendida-componente-mayor',
  templateUrl: './extendida-componente-mayor.component.html',
  styleUrls: ['./extendida-componente-mayor.component.scss']
})
export class ExtendidaComponenteMayorComponent implements OnInit {

  @Output('onGetForm') valueEventGetForm = new EventEmitter<any>();
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm():void{
    this.form = new FormGroup({
      puntoFalla: new FormControl('',[Validators.required]),
      medida: new FormControl([Validators.required]),
      fechaFalla: new FormControl([Validators.required]),
      numParteFallo: new FormControl('',[Validators.required])
    })
  }

  onGetForm():void{
    if(this.form.valid){
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
