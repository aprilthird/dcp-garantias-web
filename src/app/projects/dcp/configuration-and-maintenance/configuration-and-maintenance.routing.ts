import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConstantComponent } from "./master/constant/constant.component";
import { SrtComponent } from "./master/srt/srt.component";
// import { GarantiasListComponent } from "./garantias-list/garantias-list.component";
// import { EngineComponent } from "./register-basic/engine/engine.component";
// import { GeneratorComponent } from "./register-basic/generator/generator.component";
// import { MassiveBasicRegistrationComponent } from "./massive-basic-registration/massive-basic-registration.component";

const routes: Routes = [
  {
    path: 'master/constant',
    component: ConstantComponent
  },
  {
    path: 'master/srt',
    component: SrtComponent
  },
  // {
  //   path: 'register-engine-basic',
  //   component: EngineComponent
  // },
  // {
  //   path: 'register-generator-basic',
  //   component: GeneratorComponent
  // },
  // {
  //   path: 'massive-basic-registration',
  //   component: MassiveBasicRegistrationComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationAndMaintenancesRouting {}
