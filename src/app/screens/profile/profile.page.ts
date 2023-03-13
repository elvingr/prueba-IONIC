import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {

 cambioToggle:boolean=true;

  constructor(
    private route:Router,
    private screenOrientation: ScreenOrientation
    ) {
    this.nombre = localStorage.getItem('nombre') ||'';
    this.correo = localStorage.getItem('email') ||'';
    this.telefono = localStorage.getItem('telefono') || '';
    this.gps = localStorage.getItem('gps') || '' ;
    this.img64 = localStorage.getItem('imagen') || './assets/fondo pelota.png';
    this.verificacion(); 
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  nombre     : string ='';
  apellido   : string ='';
  correo     : string ='';
  telefono   : string ='';
  contrasena : string ='';
  gps        :string='';
  img64      :string='';

  cerrarSecion(){
    localStorage.setItem('estadoLicencia','false');
    this.route.navigate(['./login'])  
  }

  clambioToggle(event:any){
    localStorage.setItem('activarHuella', (event.detail.checked));
    this.verificacion();  
  }


//esto se va a usar para el toggle
  verificacion(){
    if(localStorage.getItem('activarHuella') === 'true'){
      this.cambioToggle = true;
    }else if(localStorage.getItem('activarHuella') === 'false'){
      this.cambioToggle = false;
    } 
  }
}
