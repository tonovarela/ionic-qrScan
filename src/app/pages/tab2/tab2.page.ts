import { Registro } from './../../models/registro.model';
import { DataLocalService } from './../../services/data-local.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public datalocalService: DataLocalService
              ) {}

  enviarCorreo() {
    //this.datalocalService.borrarRegistros();
    this.datalocalService.enviarCorreo();
    console.log('Enviando el correo');
  }

  abrirRegistro(registro: Registro){
    this.datalocalService.abrirRegistro(registro);
  }


  

}
