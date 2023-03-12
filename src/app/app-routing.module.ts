import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './screens/login/login.page';
import { AuthGuard } from './guards/auth.guard';
import { Auth2Guard } from './guards/auth2.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'login',
    loadChildren:() =>import ('./screens/login/login.module').then(m => m.LoginPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'gps',
    loadChildren: () => import('./screens/gps/gps.module').then( m => m.GpsPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./screens/register/register.module').then( m => m.RegisterPageModule), canActivate:[AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./screens/profile/profile.module').then( m => m.ProfilePageModule), canActivate:[Auth2Guard]
  },
  {
    path: 'image-selector',
    loadChildren: () => import('./screens/image-selector/image-selector.module').then( m => m.ImageSelectorPageModule), canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


