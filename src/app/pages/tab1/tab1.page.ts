import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
   options = {
     allowSlidePrev: false,
     allowSlideNext: false
   };
  constructor(private barcodeScanner: BarcodeScanner,
              private dataLocalService: DataLocalService) { }
  ionViewDidEnter() {
    console.log('La vista esta cargada');
  }
  ionViewDidLeave() {
    console.log('viewDidLeave');
  }
  ionViewWillEnter() {
    console.log('WillLoad');
    this.scanCode();
  }
  ionViewWillLeave() {
    console.log('WillLeave');
  }


  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (!barcodeData.cancelled) {
        this.dataLocalService.guardarRegistro(barcodeData.format, barcodeData.text);
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
