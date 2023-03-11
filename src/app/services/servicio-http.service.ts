import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})

export class ServicioHTTPService {

  User = {
    "userPassword": '',
    "userEmail": '',
    "userName": '',  
    "userPhoneNumber": '',
    "type":'1',
    "userProfilePic": '', 
  }

  dataLocal = {
    "userPassword": '',
    "userEmail": '',
    "userName": '',  
    "userPhoneNumber": '',
    "type":'1',
    "userProfilePic": '', 
    "gps":'',  
  }


  httpOptions = {
    headers: new HttpHeaders({
      'x-api-key':'123456',
      'Country': 'DO'
    }), 
  };

  private apiUrl = 'https://api.lancergroup.org/likeride/api/Auth/Register';
  private apiUrlLogin ='https://api.lancergroup.org/likeride/api/Auth/Get_ToketLogin';

  constructor(private http: HttpClient, private storage:Storage) { 
    
  }

  //resgistrar usuariios
   registerUser() {
      return this.http.post<any>(this.apiUrl, this.User,this.httpOptions)
      .subscribe( (resp:any)=>{
      console.log(resp);
    },
    (error) => {
      console.error('Ha ocurrido un error:', error);
    });
  }

  //hacer login
  login(user:string, password:string){
    const User = {
      "userPassword": password.trim(),
      "userEmail": user.trim(),
    }
    return this.http.post<any>(this.apiUrlLogin, User ,this.httpOptions)
}

}


