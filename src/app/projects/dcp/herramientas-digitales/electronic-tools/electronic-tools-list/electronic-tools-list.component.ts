import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DigitalToolsService } from 'app/shared/services/digital-tools/digital-tools.service';
import { UserService } from 'app/core/user/user.service';
import { ConfigurationAndMaintenanceService } from 'app/shared/services/configuration-and-maintenance/configuration-and-maintenance.service';
@Component({
  selector: 'app-electronic-tools-list',
  templateUrl: './electronic-tools-list.component.html',
  styleUrls: ['./electronic-tools-list.component.scss']
})
export class ElectronicToolsListComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'area', 'jefeAprobador', 'tipoDeLicencia', 'cantidad', 'pcidEquipo', 'fechaDeSolicitud', 'estado', 'action'];
  dataSource = [];

  //filtros
  formFilter:FormGroup;

  //datos del paginado
  totalUsers:any;
  totalFilas:any;
  numeroDePaginas:any;
  pageCurrent:number=1;

  //botones del paginado
  nextButton:boolean=false;
  prevButton:boolean=false;
  
  statusOptions = [];
  
  usuarioDeLaSession:any;
  menuArbol:any;
  accionesUsuarioHerramientasDigitales = [];

  constructor(private readonly router: Router, private readonly digitalToolsService:DigitalToolsService, 
    private readonly userService:UserService, private readonly configurationAndMaintenanceService:ConfigurationAndMaintenanceService) { 
    this.menuArbol = JSON.parse(localStorage.getItem('menuArbol'));
    this.accionesUsuarioHerramientasDigitales = this.menuArbol[3].acciones;
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(response=>{
        this.usuarioDeLaSession = response;
    });
    this.loadFormFilter();
    this.loadStatus();
  }

  acceder(nombre:string):boolean{
    let ver = false;
    for (let i = 0; i < this.accionesUsuarioHerramientasDigitales.length; i++) {
      if(this.accionesUsuarioHerramientasDigitales[i].nombre==nombre && this.accionesUsuarioHerramientasDigitales[i].activo==true){
          ver = true;
      }
    }
    return ver;
  }

  loadStatus():void {
    this.configurationAndMaintenanceService.getGenerals(15).subscribe(responseApi=>{
      console.log(responseApi);
      this.statusOptions = responseApi.body;
      this.listUsers();
    });
  }

  listUsers():void {
    if(this.acceder('Listado todas solicitudes HE')!=true){
      this.formFilter.value.idUsuario = this.usuarioDeLaSession.id;
    }
    this.digitalToolsService.trayTools(this.formFilter.value, this.pageCurrent).subscribe(responseApi => {
      this.totalUsers = responseApi.totalRecords;
      this.totalFilas = responseApi.pageSize;
      this.numeroDePaginas = this.getPageCount(responseApi.pageSize,responseApi.totalRecords);
      this.dataSource = responseApi.data;
      this.disablePaginationButtons(); 
    });
  }

  loadFormFilter():void {
    this.formFilter = new FormGroup({
      usuario: new FormControl(null),
      estado: new FormControl(null),
      fechaIni: new FormControl(),
      fechaFin: new FormControl(),
      idUsuario: new FormControl(null)
    });
  }

  onEditBasic(usuario:any,soloVer:string):void{
    localStorage.setItem('action','edit');
    localStorage.setItem('usuario',JSON.stringify(usuario));
    localStorage.setItem('soloVer',soloVer);
    if(usuario.nombreEstado == "Aprobado") {
      this.router.navigate(['/digital-tools/tool-request-keys']);
    } else {
      if(usuario.nombreEstado == "Terminado"){
        this.router.navigate(['/digital-tools/tool-request-keys']);
      }else{
        this.router.navigate(['/digital-tools/tool-request']);
      }
    }
  }

  onRegisterBasic():void{
    localStorage.setItem('action','new');
    localStorage.setItem('soloVer','false');
    this.router.navigate(['/digital-tools/tool-request']);
  }

  disablePaginationButtons(){
    if(this.pageCurrent == this.numeroDePaginas){
      this.prevButton = true,
      this.nextButton = true;
    }
    if( this.pageCurrent == 1 && this.pageCurrent < this.numeroDePaginas){
      this.prevButton = true;
      this.nextButton = false;
    }
    if(this.pageCurrent > 1 && this.pageCurrent < this.numeroDePaginas){
      this.prevButton = false;
      this.nextButton = false;
    }
    if(this.pageCurrent > 1 && this.pageCurrent == this.numeroDePaginas){
      this.prevButton = false;
      this.nextButton = true;
    }
  }

  changePage(type:string){
    if(type=='more'){
      this.pageCurrent = this.pageCurrent + 1 ;
      this.listUsers();
      this.disablePaginationButtons();
    }
    if(type=='less'){
      this.pageCurrent = this.pageCurrent - 1 ;
      this.listUsers();
      this.disablePaginationButtons();
    }
  }

  getPageCount(totalRows:any,totalRecords:any):number{
    let result:any;
    result = totalRecords / totalRows;
    if((totalRecords % totalRows)>0){
      result = (result + 1 );
    }
    return Math.trunc(result);
  }

  limpiarFiltros():void{
    this.formFilter.reset();
    this.listUsers();
  }
}
