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
        path: "configuration-and-maintenance",
        loadChildren: () =>
          import("./configuration-and-maintenance/configuration-and-maintenance.module").then((m) => m.ConfigurationAndMaintenanceModule),
      },



      {
        path: "formatos",
        loadChildren: () =>
          import("./formatos/formatos.module").then((m) => m.FormatosModule),
      },
      {
        path: "informes",
        loadChildren: () =>
          import("./actividades/actividades.module").then(
            (m) => m.ActividadesModule
          ),
      },
      {
        path: "tipos_servicios",
        loadChildren: () =>
          import("./tipos-servicios/tipos-servicios.module").then(
            (m) => m.TiposServiciosModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KmmpRoutingModule {}
