import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FallasListComponent } from "./fallas-list/fallas-list.component";

const routes: Routes = [
  {
    path: '',
    component: FallasListComponent
  },
  // {
  //   path: 'register-engine-basic',
  //   component: EngineComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionDeFallasRouting {}
