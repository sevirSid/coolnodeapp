import { Component, OnInit } from '@angular/core';
import { Message } from '../hero';
import * as _ from 'underscore';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  /*
  hero = 'Windstorm';
  */

  toutouMessages:Message[] = [];
  SidMessages:Message[] = [];
  message = '';
  messageToutou: Message;
cpt =0;
  constructor() { 
    
    //let sortedArray = _.sortBy(this.arrayH, 'name'); 
    //this.arrayH.sort((a,b) => a.id - b.id);

  }

  ngOnInit() {
  }
  keyDownFunction(event) {
  if(event.keyCode == 13) {
    this.cpt++
    this.messageToutou = new Message();
    this.messageToutou.id = this.cpt;
    this.messageToutou.value= this.message;
    this.messageToutou.date = new Date();
    this.toutouMessages.push(this.messageToutou);
    console.log(this.toutouMessages)
    // rest of your code
  }
}

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/