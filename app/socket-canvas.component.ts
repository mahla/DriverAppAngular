import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {WebSocketService} from './websocket.service';
import { HeroService } from './hero.service';
import {ChatService, Message, rawData} from './chat.service';
import {Devices}     from './devices';

@Component({
  selector: 'my-socket-canvas',
  template: `
 <div>
    <h3>Web Socket Canvas</h3>
        <div>
     <input [(ngModel)]="request.msg" placeholder="request.msg" />

        </div>
    <button (click)="goBack()">Back</button>
    <button (click)="onSubmit()">Send</button>


       <div> <label>Number of ServerMsg: </label>{{serverMsg}}  </div>
       <div> <label>Number of ErrMsg: </label>{{errMsg}}  </div>


</div>
`,
  styleUrls: ['app/socket-canvas.component.css'],


})


export class SocketCanvasComponent implements OnInit {


  private dataForPoco: any;
  private dataFromPoco: any;
  private devices: Devices[];
  private serverMsg: number;
  private errMsg: number;
  private message = {
    id: this.ID,
    msg: 'hi',
  }
  private ID = 9999;

  private request = {
    id: this.ID,
    msg: 'hi',

  }


  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute) {


    this.serverMsg = 0;
    this.errMsg = 0;
    chatService.messages.subscribe(

      x => {
        this.serverMsg = this.serverMsg + 1;
        console.log('ID is:' + x.id + ' Message is:' + x.msg);
      },
      err => {
        this.errMsg = this.errMsg + 1;
        console.log('Error is parsing server JSON in Socket Canvas: ' + err);
      }


    );
  }

  onSubmit() {

    this.chatService.sendDataToPoco(this.request);

  }

  ngOnInit(): void {
  }


  getDataFromPoco() {
    // this.dataFromPoco  = this.chatService.getHeroData();
  }



  goBack(): void {
    window.history.back();
  }

}
