import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioHTTPService } from '../../services/servicio-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  usuario:string = '';
  contrasena:string =''
  constructor(private http:ServicioHTTPService, private route:Router) { }

  ngOnInit() {
  }

  login(){
    this.http.login(this.usuario, this.contrasena).subscribe(resp => {
      if(resp.User.userEmail !== this.usuario ){
        alert('El email no coincide');
        return
      }
      localStorage.setItem('estadoLicencia','true');
      localStorage.setItem('email',resp.User.userEmail);
      localStorage.setItem('nombre',resp.User.custumerName);
      localStorage.setItem('telefono',resp.User.phoneNumber);
   

      setTimeout(()=>{},1000)
      this.route.navigate(['/profile'])
        //console.log(resp.User.userEmail)
        //resp.User.UserPassword
      // Handle successful login
    }, error => {
      alert(error);
    });
  }

}


//le puse return en el servicio