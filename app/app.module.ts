import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }        from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent }     from './heroes.component';
import { HeroService }         from './hero.service';
import {routing}               from './app.routing';
import {DashboardComponent}    from './dashboard.component';
import {SocketCanvasComponent} from './socket-canvas.component';
import {DevicesComponent}      from './devices.component';
import {DeviceDetailComponent} from './device-detail.component';
import {PayInDeviceDetailComponent} from './payindevice-detail.component';
import {ChatService} from './chat.service'
import {WebSocketService} from './websocket.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    routing,
    
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    SocketCanvasComponent,
    DevicesComponent,
    DeviceDetailComponent,
    PayInDeviceDetailComponent,
   
  ],
  providers: [
    HeroService,
    ChatService,
    WebSocketService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}