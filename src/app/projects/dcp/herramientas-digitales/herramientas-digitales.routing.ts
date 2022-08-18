import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersListComponent } from "./WWID/users-list/users-list.component";
import { ElectronicToolsListComponent } from "./electronic-tools/electronic-tools-list/electronic-tools-list.component";
import { BasicRegistrationComponent } from "./WWID/basic-registration/basic-registration.component";
import { ToolRequestComponent } from "./electronic-tools/tool-request/tool-request.component";
import { ToolRequestKeysComponent } from "./electronic-tools/tool-request-keys/tool-request-keys.component";

const routes: Routes = [
  {
    path: 'users-list',
    component: UsersListComponent
  },
  {
    path: 'basic-registration',
    component: BasicRegistrationComponent
  },
  {
    path: 'electronic-tools',
    component: ElectronicToolsListComponent
  },
  {
    path: 'tool-request',
    component: ToolRequestComponent
  },
  {
    path: 'tool-request-keys',
    component: ToolRequestKeysComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HerramientasDigitalesRouting {}
