import { Component, OnInit } from '@angular/core';
import { ServicioHTTPService } from '../../services/servicio-http.service';
import { Router } from '@angular/router';
//import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {

  constructor(
    //private http:ServicioHTTPService, 
    private route:Router,
    //private screenOrientation: ScreenOrientation
    ) {
    this.nombre = localStorage.getItem('nombre') ||'';
    this.correo = localStorage.getItem('email') ||'';
    this.telefono = localStorage.getItem('telefono') || '';
    this.gps = localStorage.getItem('gps') || '' ;
    this.img64 = localStorage.getItem('imagen') || './assets/fondo pelota.png';
   // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  nombre: string ='';
  apellido: string ='';
  correo: string ='';
  telefono: string ='';
  contrasena: string ='';
  gps:string='';
  img64:string='';

  cerrarSecion(){
    localStorage.setItem('estadoLicencia','false');
    this.route.navigate(['./login'])  
  }

}
