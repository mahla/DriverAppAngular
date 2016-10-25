import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {WebSocketService} from './websocket.service';
import { HeroService } from './hero.service';
import {ChatService} from './chat.service';
import {Devices}     from './devices';


@Component({
  selector: 'my-devices',
  template: `
      <div>
    <h3>Device List From Machine</h3>
    <button (click)="onSubmit()">Load Device List</button>
      </div>

 <div>
      <ul class="devices">
        <li *ngFor="let m of devices" (click)="onSelect(m)">
         <span>{{m.name}} </span>
         <span class="badge" [style.background-color]="m.color" >{{m.status}}</span>
        </li>
      </ul>


      <p> Ticker is {{ticker}} </p>
 </div>

`,
  styleUrls: ['app/devices.component.css'],


})


export class DevicesComponent implements OnInit {


  private dataFromPoco: any;
  private sampleArray = [{ 'id': '1', 'name': 'alfa' }];
  private message = {
    id: 0,
    msg: '',
  }
  public devices: Devices[];
  private ID: number = 5467;
  private request = {
    id: this.ID,
    msg: 'deviceList',

  }
  private selectedDevice: Devices;

  private color: string = 'blue';
  private ticker: number;
  private timer = Observable.timer(2000, 6000);
  private timerSubscription: any;

  constructor(
    private chatService: ChatService,
    private router: Router, ) {
    chatService.messages.subscribe(
      msg => {
        this.message = msg;
        // Scope of improvement remove dataFromPoco
        if (this.message.id == this.ID) {
          this.dataFromPoco = this.message.msg;
          this.devices = this.dataFromPoco;
        }
      },
      err => {
        console.log('Error is parsing server JSON in device component: ' + err);
      }


    );
  }


  onSubmit() {
    this.chatService.sendDataToPoco(this.request);
  }

  ngOnInit(): void {
    this.onSubmit();

    this.timerSubscription = this.timer.subscribe(t => {
      this.ticker = t;
      this.onSubmit();
    });

  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();

  }

  gotoDetail(): void {
    this.router.navigate(['/devicedetail', this.selectedDevice.id]);
  }

  gotoPayInDevice(): void {
    this.router.navigate(['/devicedetail', this.selectedDevice.id]);
    //this.router.navigate(['/payindetail', this.selectedDevice.id]);
  }

  onSelect(device: Devices): void {
    this.selectedDevice = device;
    this.chatService.setDevice(this.selectedDevice);
    if (this.selectedDevice.id == '5') {
      this.gotoPayInDevice();

    }
    else

      this.gotoDetail();
  }


}
