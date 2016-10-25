import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {WebSocketService} from './websocket.service';
import {Devices}          from './devices';

const CHAT_URL = "ws://" + location.host + "/ws";
export interface Message {
  id: string;
  msg: string;
}
export interface rawData {
  id: any;
  msg: any;
}

@Injectable()
export class ChatService {
  public messages: Subject<rawData>;


  private message = {
    rData: 'hihfdhk'
  }


  private selectedDevice: Devices;

  constructor(wsService: WebSocketService) {

    this.messages = <Subject<rawData>>wsService
      .connect(CHAT_URL)
      .map((response: MessageEvent): rawData => {
        let data = JSON.parse(response.data);
        return {
          id: data.id,
          msg: data.msg,
        }
      });

  }



  public getHeroData(): any {
    return this.message.rData;
  }

  public sendDataToPoco(data: rawData): void {
    this.messages.next(data);
  }

  public setDevice(device: Devices) {
    this.selectedDevice = device;
  }

  public getDevice(): Devices {
    return this.selectedDevice;
  }

}
