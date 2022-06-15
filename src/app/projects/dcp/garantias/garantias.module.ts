import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarantiasListComponent } from './garantias-list/garantias-list.component';
import { GarantiasRouting } from './garantias.routing';
import { MatIconModule } from '@angular/material/icon';
import { FuseDateRangeModule } from "@fuse/components/date-range";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogQuestionNewRecordComponent } from './dialogs/dialog-question-new-record/dialog-question-new-record.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EngineComponent } from './register-basic/engine/engine.component';
import { GeneratorComponent } from './register-basic/generator/generator.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule} from '@angular/material/radio';
import { DialogRegisterEnrollmentComponent } from './dialogs/dialog-register-enrollment/dialog-register-enrollment.component';
import { MatRippleModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { DialogDraftSavedSuccessfullyComponent } from './dialogs/dialog-draft-saved-successfully/dialog-draft-saved-successfully.component';
import { MassiveBasicRegistrationComponent } from './massive-basic-registration/massive-basic-registration.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogMassiveRegistrationSuccessfullyComponent } from './dialogs/dialog-massive-registration-successfully/dialog-massive-registration-successfully.component';
import { HistoriaESNComponent } from './dialogs/historia-esn/historia-esn.component';
import { DialogHistoriaESNComponent } from './dialogs/dialog-historia-esn/dialog-historia-esn.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductoNuevoGarantiaReconComponent } from './type-warranties/producto-nuevo-garantia-recon/producto-nuevo-garantia-recon.component';
import { RepuestoNuevoRespuestoDefectuosoComponent } from './type-warranties/repuesto-nuevo-respuesto-defectuoso/repuesto-nuevo-respuesto-defectuoso.component';
import { ExtendidaCapComponent } from './type-warranties/extendida-cap/extendida-cap.component';
import { ExtendidaComponenteMayorComponent } from './type-warranties/extendida-componente-mayor/extendida-componente-mayor.component';
import { CdcComponent } from './type-warranties/cdc/cdc.component';
import { TrpComponent } from './type-warranties/trp/trp.component';
import { AtcComponent } from './type-warranties/atc/atc.component';
import { MemoComponent } from './type-warranties/memo/memo.component';
import { DialogTransformRecordToOrangeComponent } from './dialogs/dialog-transform-record-to-orange/dialog-transform-record-to-orange.component';
import { ChangeTrayComponent } from './change-tray/change-tray.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    GarantiasListComponent,
    DialogQuestionNewRecordComponent,
    EngineComponent,
    GeneratorComponent,
    DialogRegisterEnrollmentComponent,
    DialogDraftSavedSuccessfullyComponent,
    MassiveBasicRegistrationComponent,
    DialogMassiveRegistrationSuccessfullyComponent,
    HistoriaESNComponent,
    DialogHistoriaESNComponent,
    ProductoNuevoGarantiaReconComponent,
    RepuestoNuevoRespuestoDefectuosoComponent,
    ExtendidaCapComponent,
    ExtendidaComponenteMayorComponent,
    CdcComponent,
    TrpComponent,
    AtcComponent,
    MemoComponent,
    DialogTransformRecordToOrangeComponent,
    ChangeTrayComponent
  ],
  imports: [
    CommonModule,
    GarantiasRouting,
    MatIconModule,
    FuseDateRangeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatExpansionModule
  ],
  providers:[{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}]
})
export class GarantiasModule { }
