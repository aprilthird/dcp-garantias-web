import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UploadFileComponent } from "./ui/upload-file/upload-file.component";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TextFilterPipe } from "./pipes/text-filter.pipe";
import { ExportExcelService } from "./utils/export-excel.ts.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { UiDialogsComponent } from "./ui/ui-dialogs/ui-dialogs.component";
import { MatDialogModule } from "@angular/material/dialog";
import { GroupPositionPipe } from "./pipes/group-position.pipe";
import { DialogOperationSuccessfullyComponent } from './dialogs/dialog-operation-successfully/dialog-operation-successfully.component';
import { DialogDeleteComponent } from './dialogs/dialog-delete/dialog-delete.component';
import { DialogErrorMessageComponent } from './dialogs/dialog-error-message/dialog-error-message.component';
import { DialogRejectComponent } from './dialogs/dialog-reject/dialog-reject.component';
import { DialogObservationComponent } from './dialogs/dialog-observation/dialog-observation.component';
import { MenuDcpComponent } from './components/menu-dcp/menu-dcp.component';
import { SnackBarMessageComponent } from './dialogs/snack-bar-message/snack-bar-message.component';
import { DialogSeeDocumentsComponent } from './dialogs/dialog-see-documents/dialog-see-documents.component';
import { DialogLoadingComponent } from './dialogs/dialog-loading/dialog-loading.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UploadFileComponent,
    UiDialogsComponent,
    GroupPositionPipe,
    TextFilterPipe,
    MenuDcpComponent
  ],
  declarations: [
    UploadFileComponent,
    TextFilterPipe,
    UiDialogsComponent,
    GroupPositionPipe,
    DialogOperationSuccessfullyComponent,
    DialogDeleteComponent,
    DialogErrorMessageComponent,
    DialogRejectComponent,
    DialogObservationComponent,
    MenuDcpComponent,
    SnackBarMessageComponent,
    DialogSeeDocumentsComponent,
    DialogLoadingComponent,
  ],
  providers: [ExportExcelService],
})
export class SharedModule {}
