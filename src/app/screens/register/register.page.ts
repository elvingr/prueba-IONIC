
import { Component } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioHTTPService } from '../../services/servicio-http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  constructor(private fb:FormBuilder, private route: Router, private http: ServicioHTTPService) {}

  user:string='';
  nombre: string ='';
  apellido: string ='';
  correo: string ='';
  telefono: string ='';
  contrasena: string ='';
  confirmacion: string ='';

  miFormulario:FormGroup = this.fb.group({
    user: ['user',[Validators.required,Validators.maxLength(20)]],
    name: ['name',[Validators.required,Validators.maxLength(30)]],
    lastname: ['lastname',[Validators.required,Validators.maxLength(30)]],
    email: ['email',[Validators.required,Validators.email]],
    phone: ['phone',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    password: ['password',[Validators.required,Validators.minLength(8),Validators.maxLength(16),this.validarContrasena]]
  })

  campoInvalido(campo:string){
    return this.miFormulario.controls[campo].errors 
        && this.miFormulario.controls[campo].touched;
  }

  campoInvalidoContrasena(campo:string){
    return this.miFormulario.controls[campo].hasError('contrasenaInvalida') 
        && this.miFormulario.controls[campo].errors 
        && this.miFormulario.controls[campo].touched ;

  }

  onSubmit(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return
    }  
    if (this.contrasena !== this.confirmacion) {
      console.error("La contraseña y la confirmación no coinciden");
      return
    }

    this.asignarValores();
    this.route.navigate(['./gps']);
    //this.miFormulario.reset();
    return
  }


 validarContrasena(control:any) {
    const tieneMayuscula = /[A-Z]/.test(control.value);
    const tieneNumero = /[0-9]/.test(control.value);
  
    if (!tieneMayuscula || !tieneNumero) {
      return { contrasenaInvalida: true };
    }
  
    return null;
  }
  
  asignarValores(){
    this.http.User.userName = this.nombre +' '+ this.apellido;
    this.http.User.userEmail= this.correo;
    this.http.User.userPhoneNumber = this.telefono;
    this.http.User.userPassword = this.contrasena;
  }



}