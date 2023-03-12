import { Component} from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { ServicioHTTPService } from '../../services/servicio-http.service';
//import { ScreenOrientation } from '@ionic-native/screen-orientation';
//import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
//import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
})
export class GpsPage  {
  latitude:string = '';
  longitude:string= '';

  constructor( 
    private platform: Platform, 
    private router:Router, 
    private http:ServicioHTTPService,
    private alertC:AlertController,
    //private screenOrientation: ScreenOrientation
    ) {
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.platform.ready().then(async () => {
      this.obtenerLocation();     
    })
   }

//obtener latitud y longitud
  async obtenerLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude=  coordinates.coords.latitude.toFixed(8).toString();
    this.longitude = coordinates.coords.longitude.toFixed(8).toString();

  }
//asignar los valores
  asignarVariable(){
    if(this.latitude && this.longitude === '') return
    this.http.dataLocal.gps = (this.latitude+', '+this.longitude).toString();
    localStorage.setItem('gps',this.http.dataLocal.gps);
    this.presentAlert();
    this.router.navigate(['./profile']);
  }
//alerta para continuar a logeo
  async presentAlert() {
    const alert = await this.alertC.create({
      header: '!!!Felicidades!!!',
      subHeader: 'Su cuenta fue creada con exito!',
      message: 'Ahora inicie sesion',
      buttons: ['OK'],     
    });
    await alert.present();
  }
}
