
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioHTTPService } from '../../services/servicio-http.service';
import { AlertController } from '@ionic/angular';
//import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
//import { ScreenOrientation } from '@ionic-native/screen-orientation';
//import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  constructor(
    private fb:FormBuilder, 
    private route: Router, 
    private http: ServicioHTTPService, 
    private alertC:AlertController,
   // private screenOrientation: ScreenOrientation
    ) {
     // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }

  //variables
  validar:boolean=false;
  user:string='';
  nombre: string ='';
  apellido: string ='';
  correo: string ='';
  telefono: string ='';
  contrasena: string ='';
  confirmacion: string ='';


  //este es el formbuilder para manejar los formularios
  miFormulario:FormGroup = this.fb.group({
    name: ['name',[Validators.required,Validators.maxLength(30)]],
    lastname: ['lastname',[Validators.required,Validators.maxLength(30)]],
    email: ['email',[Validators.required,Validators.email]],
    phone: ['phone',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    password: ['password',[Validators.required,Validators.minLength(8),Validators.maxLength(16),this.validarContrasena]]
  })

  //validar campos
  campoInvalido(campo:string){
    return this.miFormulario.controls[campo].errors 
        && this.miFormulario.controls[campo].touched;
  }

  //validar contrasenas
  campoInvalidoContrasena(campo:string){
    return this.miFormulario.controls[campo].hasError('contrasenaInvalida') 
        && this.miFormulario.controls[campo].errors 
        && this.miFormulario.controls[campo].touched ;
  }

//enviar datos del formulario al endpoint
  onSubmit(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return
    }  
    if (this.contrasena !== this.confirmacion) {
      this.validar =true;
      return
    }   
    this.asignarValores();//PASO 1
    this.http.registerUser().subscribe(resp=>{//paso 2
      if(resp.code === 2){
        this.presentAlert();
        return
      }
    })
    this.route.navigate(['./gps']);   
    this.validar =false;
    this.miFormulario.reset();  
    //return
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
  
  //asignar valores
  asignarValores(){
    this.http.User.userName = this.nombre +' '+ this.apellido;
    this.http.User.userEmail= this.correo;
    this.http.User.userPhoneNumber = this.telefono;
    this.http.User.userPassword = this.contrasena;
  }

  async presentAlert() {
    const alert = await this.alertC.create({
      header: 'Alerta',
      subHeader: 'La cuenta ya exite!',
      message: 'Intente usar otro correo',
      buttons: ['OK'],  
    });
    await alert.present();
  }
}