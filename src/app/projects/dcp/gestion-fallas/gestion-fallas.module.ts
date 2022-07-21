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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogAsignacionDeLaFallaComponent } from './dialogs/dialog-asignacion-de-la-falla/dialog-asignacion-de-la-falla.component';
import { MatTableModule } from '@angular/material/table';
import { DialogCerrarFallaComponent } from './dialogs/dialog-cerrar-falla/dialog-cerrar-falla.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DialogMostrarComentarioComponent } from './dialogs/dialog-mostrar-comentario/dialog-mostrar-comentario.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    FallasListComponent,
    DialogSeleccionarTipoDeRegistroComponent,
    RegistroDeFallaComponent,
    DialogAsignacionDeLaFallaComponent,
    DialogCerrarFallaComponent,
    DialogMostrarComentarioComponent
  ],
  imports: [
    CommonModule,
    GestionDeFallasRouting,
    FuseDateRangeModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatDatepickerModule,
    MatSnackBarModule,
    MatTableModule,
    MatMenuModule
  ],
  providers:[{provide: MAT_DATE_LOCALE, useValue: 'es-ES'}]
})
export class GestionFallasModule { }
