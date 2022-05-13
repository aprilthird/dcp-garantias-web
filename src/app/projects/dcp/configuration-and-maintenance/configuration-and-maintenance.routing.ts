import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConstantComponent } from "./master/constant/constant.component";
import { SrtComponent } from "./master/srt/srt.component";
import { TravelDetailsComponent } from './master/travels/travel-details/travel-details.component';
import { TravelUnitOfMeasureComponent } from './master/travels/travel-unit-of-measure/travel-unit-of-measure.component';
import { TravelTypeTravelComponent } from './master/travels/travel-type-travel/travel-type-travel.component';
import { OtherClaimsComponent } from './master/other-claims/other-claims.component';
import { PartsComponent } from './master/parts/parts.component';
import { FailuresComponent } from './master/failures/failures.component';
import { EngineApplicationComponent } from './master/engine/engine-application/engine-application.component';
import { EngineBrandComponent } from './master/engine/engine-brand/engine-brand.component';
import { EngineModelComponent } from './master/engine/engine-model/engine-model.component';
import { AccountCodeComponent } from './master/other-codes/account-code/account-code.component';
import { PayCodeComponent } from './master/other-codes/pay-code/pay-code.component';
import { ClientComponent } from './master/warranty-data/client/client.component';
import { ComplaintsComponent } from './master/warranty-data/complaints/complaints.component';
import { ServiceAreaComponent } from './master/warranty-data/service-area/service-area.component';
import { TypeOfWarrantyComponent } from './master/warranty-data/type-of-warranty/type-of-warranty.component';

const routes: Routes = [
  // Constantes
  {
    path: 'master/constant',
    component: ConstantComponent
  },
  // SRT
  {
    path: 'master/srt',
    component: SrtComponent
  },
  // Viajes
  {
    path: 'master/travel/details',
    component: TravelDetailsComponent
  },
  {
    path: 'master/travel/unit-of-measure',
    component: TravelUnitOfMeasureComponent
  },
  {
    path: 'master/travel/type-travel',
    component: TravelTypeTravelComponent
  },
  // Otros reclamables
  {
    path: 'master/other-claims',
    component: OtherClaimsComponent
  },
  {
    path: 'master/parts',
    component: PartsComponent
  },  
  {
    path: 'master/failures',
    component: FailuresComponent
  },
  // Motor
  {
    path: 'master/engine/application',
    component: EngineApplicationComponent
  },
  {
    path: 'master/engine/brand',
    component: EngineBrandComponent
  },
  {
    path: 'master/engine/model',
    component: EngineModelComponent
  },
  // Otros codigos
  {
    path: 'master/other-codes/account-code',
    component: AccountCodeComponent
  },
  {
    path: 'master/other-codes/pay-code',
    component: PayCodeComponent
  },
  // Datos Garantia
  {
    path: 'master/warranty-data/client',
    component: ClientComponent
  },
  {
    path: 'master/warranty-data/complaints',
    component: ComplaintsComponent
  },  {
    path: 'master/warranty-data/service-area',
    component: ServiceAreaComponent
  },
  {
    path: 'master/warranty-data/type-of-warranty',
    component: TypeOfWarrantyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationAndMaintenancesRouting {}
