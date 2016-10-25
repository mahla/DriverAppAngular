import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
  <nav>
    <a routerLink="/devices" routerLinkActive="active">Devices</a>
    <a routerLink="/canvas" routerLinkActive="active">WebSocket</a>
  </nav>
  <router-outlet></router-outlet>
`,
  styleUrls: ['app/app.component.css'],
 
})
export class AppComponent {
  title = 'Driver Test Application';
}