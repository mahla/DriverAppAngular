import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Devices} from './devices';
import {ChatService} from './chat.service'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'my-device-detail',
  template: `
 <div>
         <div>
    <h3>{{device.name}}</h3>

        <div> <label>id: </label>{{device.id}} </div>

      <div  *ngIf="ID==5">
    <label>Encash: </label>
    <button (click)="enableEncash()">{{buttonText}}</button>
     <span *ngIf="encashedAmount>0">Amount:{{encashedAmount}} Euro</span>
      </div>

      <div  *ngIf="ID==8 || ID==7">
    <label>PayOut: </label>
    <button (click)="startPayOut()">{{payOutButtonText}}</button>
     <button (click)="endPayOut()">End-PayOut</button>
     <span *ngIf="payoutAmount>0">Amount:{{payoutAmount}} Euro</span>
      </div>


      <div> <label>status: </label>{{device.status}} </div>
      <div> <label>IdrvMaj: </label>{{device.idriverVersionMajor}} </div>
      <div> <label>DisplayName: </label>{{device.displayName}} </div>
      <div> <label>MachineName: </label>{{device.machineName}}  </div>

      <div> <label>IdriverVer: </label>{{device.sIdriverVersion}}  </div>
      <div> <label>SDriverVer: </label>{{device.sDriverVersion}}  </div>
      <div> <label>FirmwareVer: </label>{{device.sDeviceFirmwareVersion}}  </div>
      <div> <label>DriverName: </label>{{device.sDriverName}}  </div>

       <div> <label>inDevice: </label>{{device.inDevice}}  </div>
      <div> <label>outDevice: </label>{{device.outDevice}}  </div>
      <div> <label>headDevice: </label>{{device.headDevice}}  </div>
      <div> <label>coins: </label>{{device.coins}}  </div>
      <div> <label>notes: </label>{{device.notes}}  </div>


       <div> <label>Ticker: </label>{{ticker}}  </div>
       <div> <label>ServerMsg: </label>{{serverMsg}}  </div>
       <div> <label>Number of ErrMsg: </label>{{errMsg}}  </div>


         </div>

<button (click)="goBack()">Back</button>

     <div *ngIf="alert">Please Disable Enchasher</div>

</div>
`,
  styleUrls: ['app/device-detail.component.css'],

})


export class DeviceDetailComponent implements OnInit {

  private device: Devices;
  private ID: any;
  private buttonText: string;
  private payOutButtonText: string;
  private alert: boolean;
  private encashAmount: any;
  private request = {
    id: 237879,
    msg: 'encash',

  }
  private message = {
    id: 0,
    msg: 'hi',

  }
  private msg: any;
  private response: any;
  private dataFromPoco: any;
  private encashedAmount: number;
  private payoutAmount: number;
  private ticker: number;
  private serverMsg: number;
  private errMsg: number;
  private timer = Observable.timer(2000, 3000);
  private timerSubscription: any;


  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute) {

    this.device = this.chatService.getDevice();
    this.buttonText = 'enable';
    this.payOutButtonText = 'PayOut-1-Euro';
    this.alert = false;
    this.response = 0;
    this.ticker = 0;
    this.serverMsg = 0;
    this.errMsg = 0;

    this.timerSubscription = this.timer.subscribe(t => {
      this.ticker = t;
      this.updateStatus();
    });


  }


  ngOnInit(): void {

    this.route.params.forEach((params: Params) => {
      this.ID = +params['id'];
    });



    this.chatService.messages.subscribe(
      x => {
        this.message = x;
        this.msg = this.message.msg;
        console.log('message info: %s', this.msg.information);
        this.serverMsg = this.serverMsg + 1;

        // Componenet with ID 5 server response handling

        if (this.message.id == 5) {

          /*
          console.log('componenet ID : %s', this.message.id);
          console.log('This.ID : %s', this.ID);*/
          //console.log('message info: %s', this.msg.information);

          if (this.msg.id == 'encashAmount') {
            this.encashedAmount = Number(this.msg.information);
          }
        }
        // Componenet with ID 7 server response handling

        if (this.message.id == 8 || this.message.id == 7) {

          //console.log('ID 8 & Next: %s', this.msg.information);
          if (this.msg.id == 'payoutAmount') {
            this.payoutAmount = Number(this.msg.information);
          }

        }

        // Updating status for all device detail components
        else if (this.msg.id == 'deviceStatus') {

          this.device.status = this.msg.information;
        }


      }, // end of function x

      err => {
        this.errMsg = this.errMsg + 1;
        console.log('Error is parsing server JSON in component detail: ' + err);
      }


    ); // end of subscribtion





  }


  enableEncash(): void {
    if (this.buttonText === 'enable') {
      this.buttonText = 'disable';
      this.request.msg = 'encash';
    }
    else {
      this.buttonText = 'enable';
      this.request.msg = 'stop';
    }
    this.request.id = this.ID;
    this.chatService.sendDataToPoco(this.request);


  }

  startPayOut(): void {
    this.request.msg = 'startPayout';
    this.request.id = this.ID;
    this.chatService.sendDataToPoco(this.request);
  }

  endPayOut(): void {
    this.request.msg = 'stopPayout';
    this.request.id = this.ID;
    this.chatService.sendDataToPoco(this.request);
  }




  updateStatus() {
    this.request.id = this.ID;
    this.request.msg = 'deviceStatus';
    this.chatService.sendDataToPoco(this.request);

  }

  goBack(): void {
    if (this.buttonText == 'disable') {
      this.alert = true;
    }
    else {
      window.history.back();
      this.timerSubscription.unsubscribe();
    }

  }

}
