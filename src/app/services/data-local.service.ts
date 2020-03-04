import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  guardados: Registro[] = [];
  constructor() { }

  guardarRegistro(format: string, texto: string) {
    console.log('Desde el servicio');
    const nuevoRegistro = new Registro(format, texto);
    this.guardados.unshift(nuevoRegistro);
    console.log(this.guardados);
  }


}
