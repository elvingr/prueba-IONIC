import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { ServicioHTTPService } from '../../services/servicio-http.service';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
})
export class GpsPage  {
  latitude:string = '';
  longitude:string= '';

  constructor( private platform: Platform, private router:Router, private http:ServicioHTTPService) {
    this.platform.ready().then(async () => {
      this.obtenerLocation();
      
    })
   }

//crear boton de enviar
  async obtenerLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude=  coordinates.coords.latitude.toFixed(8).toString();
    this.longitude = coordinates.coords.longitude.toFixed(8).toString();

  }

  asignarVariable(){
    if(this.latitude && this.longitude === '') return
    this.http.dataLocal.gps = (this.latitude+', '+this.longitude).toString();
    localStorage.setItem('gps',this.http.dataLocal.gps);
    this.router.navigate(['./image-selector']);
  }

}
