import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {
    DialogMassiveRegistrationSuccessfullyComponent
} from 'app/projects/dcp/garantias/dialogs/dialog-massive-registration-successfully/dialog-massive-registration-successfully.component';
import {DialogErrorMessageComponent} from 'app/shared/dialogs/dialog-error-message/dialog-error-message.component';
import {SnackBarMessageComponent} from 'app/shared/dialogs/snack-bar-message/snack-bar-message.component';
import {
    ConfigurationAndMaintenanceService
} from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
import {DigitalToolsService} from 'app/shared/services/digital-tools/digital-tools.service';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'app-tool-request-keys',
    templateUrl: './tool-request-keys.component.html',
    styleUrls: ['./tool-request-keys.component.scss']
})
export class ToolRequestKeysComponent implements OnInit {

    formRequest: FormGroup;

    displayedColumns: string[] = ['tipo', 'cantidad', 'keyFuncional', 'keyBasico', 'keyActivacion'];

    localRequest: any;
    user: any;
    action: string;

    users = [];
    isSearching = false;

    dataSource = [{
        id: 0,
        idHerramienta: 0,
        tipo: 'Inside',
        cantidad: 1,
        keyFuncional: null,
        keyBasico: null,
        keyActivacion: null
    },
        {
            id: 0,
            idHerramienta: 0,
            tipo: 'Inpower',
            cantidad: 1,
            keyFuncional: null,
            keyBasico: null,
            keyActivacion: null
        },
        {
            id: 0,
            idHerramienta: 0,
            tipo: 'Calibrations',
            cantidad: 0,
            keyFuncional: null,
            keyBasico: null,
            keyActivacion: null
        },
        {
            id: 0,
            idHerramienta: 0,
            tipo: 'Zap - Its',
            cantidad: 0,
            keyFuncional: null,
            keyBasico: null,
            keyActivacion: null
        }];

    constructor(private readonly router: Router, private readonly matDialog: MatDialog, private readonly matSnackBar: MatSnackBar,
                private readonly digitalToolsService: DigitalToolsService,
                private readonly configurationAndMaintenanceService: ConfigurationAndMaintenanceService) {
    }

    ngOnInit(): void {
        this.action = localStorage.getItem('action');
        if (this.action === 'edit') {
            let localRequestStr = localStorage.getItem('usuario');
            if (localRequestStr !== null && localRequestStr !== "") {
                this.localRequest = JSON.parse(localRequestStr);
            }
            this.loadFormRequest();
            this.obtainLicenses();
            this.user = {
                bu: this.localRequest.area,
                centroCosto: this.localRequest.ceco,
                jefe: this.localRequest.jefe,
                correoJefe: this.localRequest.correoJefe
            };
        } else {
            this.loadEmptyFormRequest();
        }
    }

    ngAfterViewInit(): void {
        const searchInput = document.getElementById("userSearch");
        fromEvent(searchInput, "keyup").pipe(debounceTime(1000)).subscribe(value => {
            this.searchUsers();
        });
    }

    loadEmptyFormRequest(): void {
        this.formRequest = new FormGroup({
            os: new FormControl('', [Validators.required]),
            pcid: new FormControl('', [Validators.required]),
            marca: new FormControl('', [Validators.required]),
            modelo: new FormControl('', [Validators.required]),
            serie: new FormControl('', [Validators.required]),
            usuario: new FormControl('', [Validators.required]),
        });
    }

    loadFormRequest(): void {
        this.formRequest = new FormGroup({
            os: new FormControl({value:this.localRequest.os, disabled:true}, [Validators.required]),
            pcid: new FormControl({value: this.localRequest.pcid, disabled: true}, [Validators.required]),
            marca: new FormControl({value: this.localRequest.marca, disabled: true}, [Validators.required]),
            modelo: new FormControl({value: this.localRequest.modelo, disabled: true}, [Validators.required]),
            serie: new FormControl({value: this.localRequest.serie, disabled: true}, [Validators.required]),
            usuario: new FormControl({value: this.localRequest.usuario, disabled: true}, [Validators.required]),
        });
    }

    obtainLicenses(): void {
        this.digitalToolsService.obtainLicenses(this.localRequest.id).subscribe(responseApi => {
            if (responseApi.body) {
                this.dataSource = responseApi.body;
            }
        });
    }

    searchUsers(): void {
        this.users = [];
        if (this.formRequest.value.usuario != null) {
            if (this.formRequest.value.usuario.length > 2) {
                this.isSearching = true;
                this.digitalToolsService.userManagementByUsername(this.formRequest.value.usuario).subscribe(responseApi => {
                    this.isSearching = false;
                    if (responseApi.body) {
                        if (responseApi.body.length > 0) {
                            for (var i = 0; i < responseApi.body.length; ++i) {
                                this.users.push(responseApi.body[i]);
                            }
                        } else {
                            this.showSnackBar('No se encontraron coincidencias');
                        }
                    } else {
                        this.showSnackBar('No se encontraron coincidencias');
                    }
                });
            }
        }
    }

    selectUser(user: any): void {
        this.user = user;
    }

    onListElectronicTools(): void {
        this.router.navigate(['/digital-tools/electronic-tools']);
    }

    onRegisterRequest(): void {
        if (this.formRequest.value.os == '') {
            const dialogError = this.matDialog.open(DialogErrorMessageComponent, {
                data: {text: '¡Ingrese un OS válido!'},
                disableClose: true
            });
        } else {
            if (this.formRequest.value.pcid == '') {
                const dialogError = this.matDialog.open(DialogErrorMessageComponent, {
                    data: {text: '¡Ingrese un PCID válido!'},
                    disableClose: true
                });
            } else {
                if (this.formRequest.value.marca == '') {
                    const dialogError = this.matDialog.open(DialogErrorMessageComponent, {
                        data: {text: '¡Ingrese una Marca válida!'},
                        disableClose: true
                    });
                } else {
                    if (this.formRequest.value.modelo == '') {
                        const dialogError = this.matDialog.open(DialogErrorMessageComponent, {
                            data: {text: '¡Ingrese un Modelo válido!'},
                            disableClose: true
                        });
                    } else {
                        if (this.formRequest.value.serie == '') {
                            const dialogError = this.matDialog.open(DialogErrorMessageComponent, {
                                data: {text: '¡Ingrese una Serie válida!'},
                                disableClose: true
                            });
                        } else {
                            if (this.formRequest.value.usuario == '') {
                                const dialogError = this.matDialog.open(DialogErrorMessageComponent, {
                                    data: {text: '¡Ingrese un Usuario válido!'},
                                    disableClose: true
                                });
                            } else {
                                const request = {
                                    dni: this.user.dni,
                                    bu: this.user.bu,
                                    correoJefe: this.user.correoJefe,
                                    jefe: this.user.jefe,
                                    ceco: this.user.centroCosto,
                                    licencias: this.dataSource,
                                    //...this.formRequest.value
                                    ...this.formRequest.getRawValue()
                                };
                                if (this.action === 'edit') {
                                    request.id = this.localRequest.id;
                                    request.estado = this.localRequest.estado;
                                }
                                if (!this.user.dni) {
                                    request.dni = this.localRequest.dni;
                                } else {
                                    request.dni = this.user.dni;
                                }
                                this.digitalToolsService.toolManagement(request).subscribe(responseApi => {
                                        const dialogRegistrarDatosDelUsuario = this.matDialog.open(DialogMassiveRegistrationSuccessfullyComponent, {
                                            data: {text: 'Se envió el registro con éxito'},
                                            disableClose: true, width: '385px',
                                        })
                                        dialogRegistrarDatosDelUsuario.afterClosed().subscribe(responseDialog => {
                                            if (responseDialog) {
                                                this.router.navigate(['/digital-tools/electronic-tools']);
                                            }
                                        });
                                    },
                                    error => {
                                        console.log('garantias')
                                        console.log(error)
                                    })
                            }
                        }
                    }
                }
            }
        }

    }

    showSnackBar(message: string): void {
        this.matSnackBar.openFromComponent(SnackBarMessageComponent, {
            data: message,
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['mat-toolbar', 'mat-primary', 'button-color']
        });
    }
}
