import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GarantiasListComponent } from "./garantias-list/garantias-list.component";
import { EngineComponent } from "./register-basic/engine/engine.component";
import { GeneratorComponent } from "./register-basic/generator/generator.component";
import { MassiveBasicRegistrationComponent } from "./massive-basic-registration/massive-basic-registration.component";
import { ChangeTrayComponent } from './change-tray/change-tray.component';

const routes: Routes = [
  {
    path: '',
    component: GarantiasListComponent
  },
  {
    path: 'register-engine-basic',
    component: EngineComponent
  },
  {
    path: 'register-generator-basic',
    component: GeneratorComponent
  },
  {
    path: 'massive-basic-registration',
    component: MassiveBasicRegistrationComponent
  },
  {
    path: 'change-tray',
    component: ChangeTrayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarantiasRouting {}
