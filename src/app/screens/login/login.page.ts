import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicioHTTPService } from '../../services/servicio-http.service';
//import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
//import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
//import { ScreenOrientation } from '@ionic-native/screen-orientation';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  usuario:string = '';
  contrasena:string =''
  constructor(
    private http:ServicioHTTPService, 
    private route:Router,
    private toast:ToastController,
   // private screenOrientation: ScreenOrientation
    ) { 
     // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }

  ngOnInit() {
  }
//login
  login(){
    this.http.login(this.usuario, this.contrasena).subscribe((resp) => {
      if(resp.code === 1){
        this.presentToast('bottom','Login Exitoso');
        localStorage.setItem('estadoLicencia','true');
        localStorage.setItem('email',resp.User.userEmail);
        localStorage.setItem('nombre',resp.User.custumerName);
        localStorage.setItem('telefono',resp.User.phoneNumber);
        setTimeout(()=>{},1000)
        this.route.navigate(['/profile'])
        
      }else if(resp.code === 2){
        this.presentToast('bottom','Contrasena Incorrecta');
      }
      else if(resp.code === 3){
        this.presentToast('bottom',' Usuario o Contrasena Incorrecta');
      }
    }, error => {
      alert(error);
    });
  }

  //presentar un toast
  async presentToast(position: 'top' | 'middle' | 'bottom',ms:string) {
    const toast = await this.toast.create({
      message: ms,
      duration: 1500,
      position: position
    });
    await toast.present();
  }
}


// interface UserInterface
//  {
//   userPassword: string,
//   userEmail: string,
//   userName: string,  
//   userPhoneNumber: string,
//   type:string,
//   userProfilePic: string, 
// }

// interface User {
//   userPassword: string,
//   userEmail: string,
//   userName: string,  
//   userPhoneNumber: string,
//   type:string,
//   userProfilePic: string, 
// }

//le puse return en el servicio