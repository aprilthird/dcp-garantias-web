import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-dcp',
  templateUrl: './menu-dcp.component.html',
  styleUrls: ['./menu-dcp.component.scss']
})

export class MenuDcpComponent implements OnInit {

  seeConfigurationAndMaintenance:boolean=false;
  homeMenu='color-text-black';
  homeIcon='icon-menu-red';
  garantiasMenu='color-text-gray';
  garantiasIcon='icon-menu-gray';
  fallasMenu='color-text-gray';
  fallasIcon='icon-menu-gray';
  herramientasMenu='color-text-gray';
  herramientasIcon='icon-menu-gray';
  configuracionMenu='color-text-gray';
  configuracionIcon='icon-menu-gray';
  reportesMenu='color-text-gray';
  reportesIcon='icon-menu-gray';

  constructor(private readonly router:Router) { }

  ngOnInit(): void {
  }

  showConfigurationAndMaintenance():void{
    this.seeConfigurationAndMaintenance==true?this.seeConfigurationAndMaintenance=false:this.seeConfigurationAndMaintenance=true;
  }

  navegacion(ruta:string):void{
    this.clear();
    if(ruta=='/home'){
      this.homeMenu='color-text-black';
      this.homeIcon='icon-menu-red';
      this.router.navigate([ruta]);
    }
    if(ruta=='/garantias'){
      this.garantiasMenu='color-text-black';
      this.garantiasIcon='icon-menu-red';
      this.router.navigate([ruta]);
    }
    if(ruta=='/gestion-fallas'){
      this.fallasMenu='color-text-black';
      this.fallasIcon='icon-menu-red';
      this.router.navigate([ruta]);
    }
    if(ruta=='/herramientas'){
      this.herramientasMenu='color-text-black';
      this.herramientasIcon='icon-menu-red';
    }
    if(ruta=='/configuracion'){
      this.configuracionMenu='color-text-black';
      this.configuracionIcon='icon-menu-red';
      this.showConfigurationAndMaintenance();
    }
    if(ruta=='/reportes'){
      this.reportesMenu='color-text-black';
      this.reportesIcon='icon-menu-red';
    }
  }

  navegacionSubMenu(ruta:string):void{
    this.router.navigate([ruta]);
  }

  clear():void{
    this.homeMenu='color-text-gray';
    this.homeIcon='icon-menu-gray';
    this.garantiasMenu='color-text-gray';
    this.garantiasIcon='icon-menu-gray';
    this.fallasMenu='color-text-gray';
    this.fallasIcon='icon-menu-gray';
    this.herramientasMenu='color-text-gray';
    this.herramientasIcon='icon-menu-gray';
    this.configuracionMenu='color-text-gray';
    this.configuracionIcon='icon-menu-gray';
    this.reportesMenu='color-text-gray';
    this.reportesIcon='icon-menu-gray';
  }
}
