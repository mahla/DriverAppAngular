// Keep the Input import for now, we'll remove it later:
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HeroService } from './hero.service';
import {Hero} from './hero';
import {ChatService} from './chat.service'


@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css'],
   
})


export class HeroDetailComponent implements OnInit{

    hero: Hero;
    dataForPoco: any;
    dataFromPoco : any;

    private message = {
        id: 1,
        name: 'Mahla',
    }

    constructor(
  private heroService: HeroService,
 // private chatService: ChatService,
  private route: ActivatedRoute) {
}
    
    ngOnInit(): void {
  this.route.params.forEach((params: Params) => {
    let id = +params['id'];
    this.heroService.getHero(id)
      .then(hero => this.hero = hero);
  });
}

save(): void {
  this.heroService.update(this.hero)
    .then(this.goBack);
}

sendToPoco(): void {
  this.heroService.sendToPoco(this.dataForPoco);
  this.getDataFromPoco();
    
}

getDataFromPoco() : void {
  this.dataFromPoco = this.heroService.getFromPocoServer();

}
 onSubmit() {
      //  this.chatService.messages.next(this.message);
        
    }
    
    goBack(): void {
  window.history.back();
}

}