import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FallasListComponent } from './fallas-list/fallas-list.component';
import { GestionDeFallasRouting } from './gestion-fallas.routing';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    FallasListComponent
  ],
  imports: [
    CommonModule,
    GestionDeFallasRouting,
    MatButtonModule
  ]
})
export class GestionFallasModule { }
