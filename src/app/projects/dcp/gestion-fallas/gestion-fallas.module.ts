import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FallasListComponent } from './fallas-list/fallas-list.component';
import { GestionDeFallasRouting } from './gestion-fallas.routing';
import { MatButtonModule } from '@angular/material/button';
import { FuseDateRangeModule } from '@fuse/components/date-range';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DialogSeleccionarTipoDeRegistroComponent } from './dialogs/dialog-seleccionar-tipo-de-registro/dialog-seleccionar-tipo-de-registro.component';
import { RegistroDeFallaComponent } from './registro-de-falla/registro-de-falla.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    FallasListComponent,
    DialogSeleccionarTipoDeRegistroComponent,
    RegistroDeFallaComponent
  ],
  imports: [
    CommonModule,
    GestionDeFallasRouting,
    FuseDateRangeModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatRadioModule,
    MatDatepickerModule
  ]
})
export class GestionFallasModule { }
