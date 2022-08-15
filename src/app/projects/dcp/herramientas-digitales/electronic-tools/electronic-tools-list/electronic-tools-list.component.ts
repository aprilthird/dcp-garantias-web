import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DigitalToolsService } from 'app/shared/services/digital-tools/digital-tools.service';
import { UserService } from 'app/core/user/user.service';
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
  totalRows:any;
  numberOfPages:any;
  countStart:any;
  countEnd:any;
  pageCurrent:number=1;

  //botones del paginado
  nextButton:boolean=false;
  prevButton:boolean=false;
  
  usuarioDeLaSession:any;
  menuArbol:any;
  accionesUsuarioHerramientasDigitales = [];

  constructor(private readonly router: Router, private readonly digitalToolsService:DigitalToolsService, private readonly userService:UserService,) { 
    this.menuArbol = JSON.parse(localStorage.getItem('menuArbol'));
    this.accionesUsuarioHerramientasDigitales = this.menuArbol[3].acciones;
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(response=>{
        this.usuarioDeLaSession = response;
    });
    this.loadFormFilter();
    this.listUsers();
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

  listUsers():void {
    if(this.acceder('Listado todas solicitudes HE')!=true){
      this.formFilter.value.idUsuario = this.usuarioDeLaSession.id;
    }
    this.digitalToolsService.trayTools(this.formFilter.value, this.pageCurrent).subscribe(responseApi => {
      this.totalUsers = responseApi.totalRecords;
      this.totalRows = responseApi.pageSize;
      this.countStart = this.totalRows*(this.pageCurrent - 1) + 1;
      this.countEnd = this.totalRows*this.pageCurrent;
      this.numberOfPages = this.getPageCount(responseApi.pageSize,responseApi.totalRecords);
      this.dataSource = responseApi.data;

      for(var i=0; i<this.dataSource.length; ++i) {
        var os = localStorage.getItem("os_" + this.dataSource[i].nombres);
        // var pcid = localStorage.getItem("pcid_" + this.dataSource[i].nombres);
        var marca = localStorage.getItem("marca_" + this.dataSource[i].nombres);
        var modelo = localStorage.getItem("modelo_" + this.dataSource[i].nombres);
        var serie = localStorage.getItem("serie_" + this.dataSource[i].nombres);

        // var area = localStorage.getItem("area_" + this.dataSource[i].nombres);
        // var jefe = localStorage.getItem("jefe_" + this.dataSource[i].nombres);
        var cantidad = localStorage.getItem("cantidad_" + this.dataSource[i].nombres);
        // var fechaDeSolicitud = localStorage.getItem("fechaDeSolicitud_" + this.dataSource[i].nombres);

        this.dataSource[i].os = os;
        // this.dataSource[i].pcid = pcid;
        this.dataSource[i].marca = marca;
        this.dataSource[i].modelo = modelo;
        this.dataSource[i].serie = serie;
        
        // this.dataSource[i].area = area;
        // this.dataSource[i].jefe = jefe;
        this.dataSource[i].cantidad = cantidad;
        // this.dataSource[i].fechaDeSolicitud = fechaDeSolicitud;
        console.log(this.dataSource[i]);
      }
    });

    // this.digitalToolsService.userListManagement(this.pageCurrent).subscribe(responseApi=>{
    //   this.totalUsers = responseApi.body.totalRecords;
    //   this.totalRows = responseApi.body.pageSize;
    //   this.numberOfPages = this.getPageCount(responseApi.body.pageSize,responseApi.body.totalRecords);
    //   this.dataSource = responseApi.body.data;
    //   console.log("DATOS DE ENDPOINT");
    //   console.log(responseApi);
    //   localStorage.setItem("datasrcwwid", JSON.stringify(responseApi.body));
    //   this.dataSource = responseApi.body;
    // });

    // let tmp = localStorage.getItem("datasrcwwid");
    // if(tmp !== null && tmp !== "") {
    //   this.dataSource = JSON.parse(tmp);
    // } else {
    //   this.digitalToolsService.userListManagement(this.pageCurrent).subscribe(responseApi=>{
    //     // this.totalUsers = responseApi.totalRecords;
    //     // this.totalRows = responseApi.pageSize;
    //     // this.numberOfPages = this.getPageCount(responseApi.pageSize,responseApi.totalRecords);
    //     // this.dataSource = responseApi.data;
        
    //     localStorage.setItem("datasrcwwid", JSON.stringify(responseApi.body));
    //     this.dataSource = responseApi.body;
    //   });
    // }
  }

  loadFormFilter():void {
    this.formFilter = new FormGroup({
      usuario: new FormControl(null),
      estado: new FormControl(-1),
      fechaDeSolicitudInicio: new FormControl(),
      fechaDeSolicitudFin: new FormControl(),
      idUsuario: new FormControl(null)
    });
  }

  onEditBasic(usuario:any):void{
    localStorage.setItem('action','edit');
    localStorage.setItem('usuario',JSON.stringify(usuario));
    this.router.navigate(['/digital-tools/tool-request']);
  }

  onRegisterBasic():void{
    localStorage.setItem('action','new');
    this.router.navigate(['/digital-tools/tool-request']);
  }


  disablePaginationButtons(){
    if(this.pageCurrent == this.numberOfPages){
      this.prevButton = true,
      this.nextButton = true;
    }
    if( this.pageCurrent == 1 && this.pageCurrent < this.numberOfPages){
      this.prevButton = true;
      this.nextButton = false;
    }
    if(this.pageCurrent > 1 && this.pageCurrent < this.numberOfPages){
      this.prevButton = false;
      this.nextButton = false;
    }
    if(this.pageCurrent > 1 && this.pageCurrent == this.numberOfPages){
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
}
