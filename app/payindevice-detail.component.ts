import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {ChatService} from './chat.service'


export interface deviceDetail {
    
    idriverVersionMajor: string;
    idriverVersionMinor: string;
    idriverPatch: string;
    subdeviceType: string;
    inDevice: boolean;
    outDevice: boolean;
    headDevice: boolean;
    coins: boolean;
    notes: boolean;

    sIdriverVersion: string;
    sDriverVersion: string;
    sDeviceFirmwareVersion: string;
    sDriverName: string;
    sDeviceName: string;
    displayName: string;
    machineName: string;
    id: string;
    name: string;

    status:string;



}

@Component({
  selector: 'my-payindevice-detail',
  template: ` 
 <div>
         <div>
    <h3>Pay-In Device Detail {{msgID}}</h3>
        <div>
   
     
<button (click)="goBack()">Back</button>
    
     
    
</div>  
`,
   styleUrls: ['app/device-detail.component.css'],
})



export class PayInDeviceDetailComponent implements OnInit{

     private device: deviceDetail;
     private ID: any;
     private buttonText: string;
     private alert:boolean;
     private request = {
        id: 237879,
        msg : 'encash',

    }
     private message = {
         id : 0,
        msg : 'hi',

    }
    private response: any;
    private dataFromPoco:any;
    private msgID:any;


  updateComponent(resp:any): void{
  if(resp[0].id == '5initCoinValidator'){
  this.msgID = resp[0].information;
  }
  }

    constructor(
    private chatService: ChatService,
    private route: ActivatedRoute) {
    this.buttonText = 'enable';
    this.alert = false;
    
    this.chatService.messages.subscribe(msg => {
         this.message = msg; 
         // Scope of improvement remove dataFromPoco
         if(this.message.id==this.ID){
         this.dataFromPoco = this.message.msg;
        this.response = this.dataFromPoco;
          this.updateComponent(this.response);

              }
                  });


}

 
    
    initComponent():void{
      if(this.ID==5){
        this.request.id=this.ID;
        this.request.msg='initCoinValidator';
        this.chatService.sendDataToPoco(this.request);
      }


    }

    ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
    this.ID = +params['id'];
    });
      this.initComponent();
     
}

 
  

  enableEncash(): void{
  if(this.buttonText==='enable'){
    this.buttonText = 'disable';
    this.request.msg = 'encash';
  }
  else{
     this.buttonText='enable';
      this.request.msg = 'stop';
  }
  this.request.id = this.ID;
  this.chatService.sendDataToPoco(this.request);
  
  }
    
     goBack(): void {
    if(this.buttonText == 'disable'){
    this.alert = true;
  }
  else{
   window.history.back();
  }

  }

}