import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomRenderFn } from '@ionic/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ServicioHTTPService } from '../../services/servicio-http.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.page.html',
  styleUrls: ['./image-selector.page.scss'],
})
export class ImageSelectorPage  {

  image:any = './assets/fondo pelota.png';
  capturarArchivo(event:any){
    //console.log(event);
  }

  select(){}

  constructor(private http:ServicioHTTPService, private sanitizer: DomSanitizer, private router:Router,private alertController: AlertController) {}

  visualizacion64:string= this.image;
  fileCapturado:any = [];
  fileName = '';
  estado:boolean=false;


  //capturar la imagen
  capturarFile(event:any):any{
    const file:File = event.target.files[0];
    this.convertirImagenABase64(file).then((imagen:any)=>{
      localStorage.setItem('imagen',imagen);
      this.visualizacion64 = localStorage.getItem('imagen') || '';
      this.http.User.userProfilePic = imagen;
    })
    this.fileName = file.name;
    this.fileCapturado.push(file)

    console.log(event.target.files[0]);
    console.log(this.fileName)
    console.log( this.fileCapturado)
  }

  //convertir imagen a base 64
  convertirImagenABase64(imagen: File): Promise<string> {
    return new Promise<string>((resp, error) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resp(base64String);
      };
      reader.onerror = () => {
        error(reader.error);
      };
      reader.readAsDataURL(imagen);
    });
  }
  

  subirImagen(): any {
      this.estado = true;
      this.http.registerUser();
      //console.log(this.http.User) 
      this.presentAlert();
      this.router.navigate(['./login']);
      this.estado = false;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Buenas noticias',
      message: 'Su cuenta fue creada de manera exitosa!',
      buttons: ['OK'],
      
    });
    await alert.present();
  }
}
  



