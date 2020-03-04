import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx'
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  guardados: Registro[] = [];
  dataDirectory: string = '';
  constructor(private storage: Storage,
    private navCtrl: NavController,
    private iab: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer
  ) {
    this.dataDirectory = this.file.dataDirectory;

    // this.emailComposer.isAvailable().then((available: boolean) => {
    //   if (available) {
    //     console.log('Se pueden enviar Correos');
    //   }
    // });
    this.cargarRegistros();
    //cargar el storage
  }

  guardarRegistro(format: string, texto: string) {

    //this.cargarRegistros();
    const nuevoRegistro = new Registro(format, texto);
    this.guardados.unshift(nuevoRegistro);
    console.log(this.guardados);
    this.storage.set('registros', this.guardados);
    this.abrirRegistro(nuevoRegistro);
    // agregar el en storage
  }

  borrarRegistros() {
    this.storage.clear();
    this.guardados = [];
  }

  async cargarRegistros() {
    this.guardados = await this.storage.get('registros') || [];
    console.log('Registros cargados', this.guardados.length);

  }

  enviarCorreo() {
    const arr = [];
    const titulos = 'Tipo ,Formato ,Creado , Texto\n';
    arr.push(titulos);
    this.guardados.forEach((x: Registro) => {
      const linea = `${x.type}, ${x.format}, ${x.created}, ${x.text.replace(',', ' ')}\n`;
      arr.push(linea);
    });

    console.log(arr.join(''));


    let email = {
      to: 'mestelles@litoprocess.com',      
      attachments: [
        this.dataDirectory+'registros.csv'
        // 'file://img/logo.png',
        // 'res://icon.png',
        // 'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        // 'file://README.pdf'
      ],
      subject: 'Backups de Scans',
      body: 'Adjunto tienes los backups de los <stron>scans</strong> ',
      isHtml: true
    }
    
    // Send a text message using default options
    this.emailComposer.open(email).then(z=>
                                    console.log('Elemento enviado'));


    //this.crearArchivoFisico(arr.join(''));
  }

  async escribirArchivo(text: string) {
    await this.file.writeExistingFile(this.dataDirectory, 'registros.csv', text);
    console.log(this.dataDirectory, 'registro.csv');
  }

  crearArchivoFisico(text: string) {
    this.file.createFile(this.dataDirectory, 'registros.csv', true)
      .then(x => this.escribirArchivo(text))
      .catch(err => console.log("No se pudo crear el archivo", err));
    // this.file.checkFile(this.file.dataDirectory, 'registros.csv')
    //   .then(e => {
    //     console.log('Existe archivo?', e);
    //     return this.escribirArchivo(text);
    //   }
    //   )
    //   .catch(err => {
    //     console.log('Archivo doesnt exist');
    //     return this.file.createFile(this.file.dataDirectory, 'registros.csv', false)
    //     .then(x => this.escribirArchivo(text))
    //     .catch(err => console.log("No se pudo crear el archivo", err));
    //   }
    //   );

  }

  abrirRegistro(registro: Registro) {

    //console.log(registro.text);
    switch (registro.type) {
      case 'http':
        this.navCtrl.navigateForward('/tabs/tab2');
        this.iab.create(registro.text, '_system');
        break;
      case 'geo':
        this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.text}`);
        break;

      default:
        break;
    }


  }
}



