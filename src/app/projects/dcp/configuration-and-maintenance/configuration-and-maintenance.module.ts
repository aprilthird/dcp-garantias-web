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
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TravelDetailsComponent } from './master/travels/travel-details/travel-details.component';
import { TravelUnitOfMeasureComponent } from './master/travels/travel-unit-of-measure/travel-unit-of-measure.component';
import { TravelTypeTravelComponent } from './master/travels/travel-type-travel/travel-type-travel.component';
import { DialogMaintenanceDetailesTravelComponent } from './master/travels/dialogs/dialog-maintenance-detailes-travel/dialog-maintenance-detailes-travel.component';
import { DialogMaintenanceTravelTypeTravelComponent } from './master/travels/dialogs/dialog-maintenance-travel-type-travel/dialog-maintenance-travel-type-travel.component';
import { DialogMaintenanceTravelUnitOfMeasureComponent } from './master/travels/dialogs/dialog-maintenance-travel-unit-of-measure/dialog-maintenance-travel-unit-of-measure.component';
import { OtherClaimsComponent } from './master/other-claims/other-claims.component';
import { DialogMaintenanceOthersClaimsComponent } from './master/other-claims/dialog-maintenance-others-claims/dialog-maintenance-others-claims.component';
import { PartsComponent } from './master/parts/parts.component';
import { DialogMaintenancePartsComponent } from './master/parts/dialog-maintenance-parts/dialog-maintenance-parts.component';
import { FailuresComponent } from './master/failures/failures.component';
import { DialogMaintenanceFailuresComponent } from './master/failures/dialog-maintenance-failures/dialog-maintenance-failures.component';
import { MatSelectModule } from '@angular/material/select';
import { EngineApplicationComponent } from './master/engine/engine-application/engine-application.component';
import { EngineBrandComponent } from './master/engine/engine-brand/engine-brand.component';
import { EngineModelComponent } from './master/engine/engine-model/engine-model.component';
import { DialogMaintenanceEngineApplicationComponent } from './master/engine/engine-application/dialog-maintenance-engine-application/dialog-maintenance-engine-application.component';
import { DialogMaintenanceEngineBrandComponent } from './master/engine/engine-brand/dialog-maintenance-engine-brand/dialog-maintenance-engine-brand.component';
import { DialogMaintenanceEngineModelComponent } from './master/engine/engine-model/dialog-maintenance-engine-model/dialog-maintenance-engine-model.component';
import { AccountCodeComponent } from './master/other-codes/account-code/account-code.component';
import { PayCodeComponent } from './master/other-codes/pay-code/pay-code.component';
import { MaintenanceAccountCodeComponent } from './master/other-codes/account-code/maintenance-account-code/maintenance-account-code.component';
import { MaintenancePayCodeComponent } from './master/other-codes/pay-code/maintenance-pay-code/maintenance-pay-code.component';
import { ClientComponent } from './master/warranty-data/client/client.component';
import { ComplaintsComponent } from './master/warranty-data/complaints/complaints.component';
import { ServiceAreaComponent } from './master/warranty-data/service-area/service-area.component';
import { TypeOfWarrantyComponent } from './master/warranty-data/type-of-warranty/type-of-warranty.component';
import { DialogMaintenanceClientComponent } from './master/warranty-data/client/dialog-maintenance-client/dialog-maintenance-client.component';
import { DialogMaintenanceComplaintsComponent } from './master/warranty-data/complaints/dialog-maintenance-complaints/dialog-maintenance-complaints.component';
import { DialogMaintenanceServiceAreaComponent } from './master/warranty-data/service-area/dialog-maintenance-service-area/dialog-maintenance-service-area.component';
import { DialogMaintenanceTypeOfWarrantyComponent } from './master/warranty-data/type-of-warranty/dialog-maintenance-type-of-warranty/dialog-maintenance-type-of-warranty.component';

@NgModule({
  declarations: [
    ConstantComponent,
    DialogNewConstantComponent,
    SrtComponent,
    DialogNewSrtComponent,
    TravelDetailsComponent,
    TravelUnitOfMeasureComponent,
    TravelTypeTravelComponent,
    DialogMaintenanceDetailesTravelComponent,
    DialogMaintenanceTravelTypeTravelComponent,
    DialogMaintenanceTravelUnitOfMeasureComponent,
    OtherClaimsComponent,
    DialogMaintenanceOthersClaimsComponent,
    PartsComponent,
    DialogMaintenancePartsComponent,
    FailuresComponent,
    DialogMaintenanceFailuresComponent,
    EngineApplicationComponent,
    EngineBrandComponent,
    EngineModelComponent,
    DialogMaintenanceEngineApplicationComponent,
    DialogMaintenanceEngineBrandComponent,
    DialogMaintenanceEngineModelComponent,
    AccountCodeComponent,
    PayCodeComponent,
    MaintenanceAccountCodeComponent,
    MaintenancePayCodeComponent,
    ClientComponent,
    ComplaintsComponent,
    ServiceAreaComponent,
    TypeOfWarrantyComponent,
    DialogMaintenanceClientComponent,
    DialogMaintenanceComplaintsComponent,
    DialogMaintenanceServiceAreaComponent,
    DialogMaintenanceTypeOfWarrantyComponent
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
    MatSlideToggleModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule
  ]
})
export class ConfigurationAndMaintenanceModule { }
