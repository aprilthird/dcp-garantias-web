import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './WWID/users-list/users-list.component';
import { ElectronicToolsListComponent } from './electronic-tools/electronic-tools-list/electronic-tools-list.component';
import { HerramientasDigitalesRouting } from './herramientas-digitales.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { BasicRegistrationComponent } from './WWID/basic-registration/basic-registration.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolRequestComponent } from './electronic-tools/tool-request/tool-request.component';

@NgModule({
  declarations: [
    UsersListComponent,
    ElectronicToolsListComponent,
    BasicRegistrationComponent,
    ToolRequestComponent
  ],
  imports: [
    CommonModule,
    HerramientasDigitalesRouting,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HerramientasDigitalesModule { }
