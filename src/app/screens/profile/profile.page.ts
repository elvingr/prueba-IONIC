import { Component, OnInit } from '@angular/core';
import { ServicioHTTPService } from '../../services/servicio-http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {

  constructor(private http:ServicioHTTPService) {
    //this.user = this.http.User.UserId;
    
    this.nombre = localStorage.getItem('nombre') ||'';
    this.correo = localStorage.getItem('email') ||'';
    this.telefono = localStorage.getItem('telefono') || '';
    //this.contrasena = this.http.User.userPassword;
    this.gps = localStorage.getItem('gps') || '' ;
    this.img64 = localStorage.getItem('imagen') || '';
  }
  image:any = './assets/fondo pelota.png';
  user:string='';
  nombre: string ='';
  apellido: string ='';
  correo: string ='';
  telefono: string ='';
  contrasena: string ='';
  gps:string='';
  img64:string='';

  onClick(){
    localStorage.setItem('estadoLicencia','false');
  }

}
