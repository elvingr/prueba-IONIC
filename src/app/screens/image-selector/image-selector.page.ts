import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ServicioHTTPService } from '../../services/servicio-http.service';
import { AlertController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.page.html',
  styleUrls: ['./image-selector.page.scss'],
})
export class ImageSelectorPage  {

  image:any = './assets/fondo pelota.png';
  constructor(
    private http:ServicioHTTPService, 
    private sanitizer: DomSanitizer, 
    private router:Router,
    private alertController: AlertController,
    private screenOrientation: ScreenOrientation
    ) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
//variables
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

  //subir imagen y enviar datos 
  continuar(): any {
    if(this.visualizacion64 === this.image){
      this.presentAlert();
    } else{
      this.router.navigate(['./register']);
    }
  }
  //crear alerta para presentarla
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['./register']);
          },
        },
      ],
      subHeader: 'Foto por defecto?',
      message: 'Esta seguro que quiere continuar con la foto por defecto?'
    });
    await alert.present();
  }
}
