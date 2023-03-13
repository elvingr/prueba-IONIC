import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicioHTTPService } from '../../services/servicio-http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
//import { BiometryType, NativeBiometric } from "capacitor-native-biometric";
//import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
//import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
//import { ScreenOrientation } from '@ionic-native/screen-orientation';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {

  constructor(
    private fb:FormBuilder, 
    private http:ServicioHTTPService, 
    private route:Router,
    private toast:ToastController,
    private huellas: FingerprintAIO
   // private screenOrientation: ScreenOrientation
    ) { 
     // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    //console.log( this.performBiometricVerificatin());

    this.llamarHuella()
    }
  //  lamar a las huelas digitales
  LectorHuella(){
    this.huellas.show({
      title:'Comprueba que eres tu',
      subtitle: 'Utiliza tu hella dactilar para validar la informacion'
  })
  .then((result: any) => {  
    localStorage.setItem('estadoLicencia','true');
    this.route.navigate(['/profile']);
  }
    )
  .catch((error: any) => console.log(error));
  }

  //llamar al lector de las huellas
  llamarHuella(){
    if(localStorage.getItem('primerUsohuella') == 'activo'){
      this.LectorHuella();
    }else{
      this.presentToast('middle','Para usar la huella dactilar, es necesario iniciar sesion de manera normal la primera vez',2000);
    }
  }

//variables
  usuario:string = '';
  contrasena:string =''
  passwordUsointerno:string ='';
  primerUsohella:string = '';


 //este es el formbuilder para manejar los formularios
 miFormulario:FormGroup = this.fb.group({
  email: ['email',[Validators.required,Validators.email]],
  password: ['password',[Validators.required,Validators.minLength(8),Validators.maxLength(16),this.validarContrasena]]
})
  //validar campos
  campoInvalido(campo:string){
    return this.miFormulario.controls[campo].errors 
        && this.miFormulario.controls[campo].touched;
  }


//login
  login(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return
    }  
    this.http.login(this.usuario.trim(), this.contrasena.trim()).subscribe((resp) => {
      if(resp.code === 1){
        this.presentToast('middle','Login Exitoso',2000);
        localStorage.setItem('estadoLicencia','true');
        localStorage.setItem('email',resp.User.userEmail);
        localStorage.setItem('nombre',resp.User.custumerName);
        localStorage.setItem('telefono',resp.User.phoneNumber);
        this.passwordUsointerno = this.contrasena.trim();
        localStorage.setItem('primerUsohuella','activo');
        setTimeout(()=>{},1000)
        this.route.navigate(['/profile'])
        
      }else if(resp.code === 2){
        this.presentToast('middle','Contrasena Incorrecta',2000);
      }
      else if(resp.code === 3){
        this.presentToast('middle',' Usuario o Contrasena Incorrecta',2000);
      }
    }, error => {
      alert(error);
    });
  }

  //presentar un toast
  async presentToast(position: 'top' | 'middle' | 'bottom',msj:string, time:number) {
    const toast = await this.toast.create({
      message: msj,
      duration: time,
      position: position
    });
    await toast.present();
  }

  //validar contrasena
  validarContrasena(control:any) {
    const tieneMayuscula = /[A-Z]/.test(control.value);
    const tieneNumero = /[0-9]/.test(control.value);
  
    if (!tieneMayuscula || !tieneNumero) {
      return { contrasenaInvalida: true };
    }
    return null;
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