import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationAndMaintenancesRouting } from './configuration-and-maintenance.routing';
import { ConstantComponent } from './master/constant/constant.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogNewConstantComponent } from './master/constant/dialogs/dialog-new-constant/dialog-new-constant.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SrtComponent } from './master/srt/srt.component';
import { DialogNewSrtComponent } from './master/srt/dialogs/dialog-new-srt/dialog-new-srt.component';

@NgModule({
  declarations: [
    ConstantComponent,
    DialogNewConstantComponent,
    SrtComponent,
    DialogNewSrtComponent
  ],
  imports: [
    CommonModule,
    ConfigurationAndMaintenancesRouting, 
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ]
})
export class ConfigurationAndMaintenanceModule { }
