import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent }      from './heroes.component';
import {DashboardComponent}     from './dashboard.component';
import {HeroDetailComponent}    from './hero-detail.component';
import {SocketCanvasComponent}  from './socket-canvas.component';
import {DevicesComponent}       from './devices.component';
import {DeviceDetailComponent}  from './device-detail.component';
import {PayInDeviceDetailComponent} from './payindevice-detail.component';
const appRoutes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/devices',
    pathMatch: 'full'
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  },
  {
    path: 'canvas',
    component: SocketCanvasComponent
  },
  {
    path: 'devices',
    component: DevicesComponent
  },
  {
    path: 'devicedetail/:id',
    component: DeviceDetailComponent
  },
  {
    path: 'payindetail/:id',
    component: PayInDeviceDetailComponent
  },


];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
