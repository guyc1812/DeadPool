import {Component, HostListener} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // animations: [
  //   trigger('scrollAnimation', [
  //     state('void', style({'top': '0'})),
  //     state('scrollUp', style({'top': '-50px'})),
  //     state('scrollDown', style({'top': '30px'})),
  //     transition('void => scrollUp', animate('300ms')),
  //     transition('void => scrollDown', animate('300ms')),
  //     transition('scrollUp => void', animate('200ms')),
  //     transition('scrollDown => void', animate('200ms')),
  //     transition('scrollDown => scrollUp', animate('200ms')),
  //     transition('scrollUp => scrollDown', animate('200ms'))
  //   ])
  // ]
})

export class HomeComponent {

  categories:any;

  constructor(private router: Router){
    this.categories = [
      {
        avenger: 'Stark',
        category:'javaBasic',
        title:'Java Basic',
        src: ''
      },
      {
        avenger: 'Rogers',
        category:'designPattern',
        title:'Design Pattern',
        src: ''
      },
      {
        avenger: 'Banner',
        category:'algorithm',
        title:'Algorithm',
        src: ''
      },
      {
        avenger: 'TChalla',
        category:'devOps',
        title:'DevOps',
        src: ''
      },
      {
        avenger: 'Thor',
        category:'frontend',
        title:'Frontend',
        src: ''
      },
      {
        avenger: 'Strange',
        category:'others',
        title:'Others',
        src: ''
      },
    ]
  }

  navTo(category:string){
    this.router.navigate([`/note/${category}/hello`]);
  }

  navToHome(){
    this.router.navigate([`/home`]);
  }



}
