import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FallasListComponent } from "./fallas-list/fallas-list.component";
import { RegistroDeFallaComponent } from "./registro-de-falla/registro-de-falla.component";

const routes: Routes = [
  {
    path: '',
    component: FallasListComponent
  },
  {
    path: 'registro-de-falla',
    component: RegistroDeFallaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionDeFallasRouting {}
