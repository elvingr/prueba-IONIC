import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageSelectorPageRoutingModule } from './image-selector-routing.module';

import { ImageSelectorPage } from './image-selector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageSelectorPageRoutingModule
  ],
  declarations: [ImageSelectorPage]
})
export class ImageSelectorPageModule {}
