import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageSelectorPage } from './image-selector.page';

const routes: Routes = [
  {
    path: '',
    component: ImageSelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageSelectorPageRoutingModule {}
