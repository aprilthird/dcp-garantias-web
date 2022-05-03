import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-massive-basic-registration',
  templateUrl: './massive-basic-registration.component.html',
  styleUrls: ['./massive-basic-registration.component.scss']
})
export class MassiveBasicRegistrationComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  onGarantias():void{
    this.router.navigate(['/garantias']);
  }
}
