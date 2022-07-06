import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuPermissionGuard } from "app/core/permission/guards/menu-permission.guard";
import { KmmpComponent } from "./kmmp.component";

const routes: Routes = [
  {
    path: "",
    component: KmmpComponent,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("./home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "garantias",
        loadChildren: () =>
          import("./garantias/garantias.module").then((m) => m.GarantiasModule),
      },
      {
        path: "gestion-fallas",
        loadChildren: () =>
          import("./gestion-fallas/gestion-fallas.module").then((m) => m.GestionFallasModule),
      },
      {
        path: "configuration-and-maintenance",
        loadChildren: () =>
          import("./configuration-and-maintenance/configuration-and-maintenance.module").then((m) => m.ConfigurationAndMaintenanceModule),
      },
      {
        path: "digital-tools",
        loadChildren: () =>
          import("./herramientas-digitales/herramientas-digitales.module").then((m) => m.HerramientasDigitalesModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KmmpRoutingModule {}
