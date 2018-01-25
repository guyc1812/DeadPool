import {Component, HostListener} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('void', style({'top': '0'})),
      state('scrollUp', style({'top': '-50px'})),
      state('scrollDown', style({'top': '30px'})),
      transition('void => scrollUp', animate('300ms')),
      transition('void => scrollDown', animate('300ms')),
      transition('scrollUp => void', animate('200ms')),
      transition('scrollDown => void', animate('200ms')),
      transition('scrollDown => scrollUp', animate('200ms')),
      transition('scrollUp => scrollDown', animate('200ms'))
    ])
  ]
})

export class HomeComponent {

  scrollStatus:string = 'void';

  @HostListener('mousewheel', ['$event'])
  onWheel(e) {
      console.log(e.deltaY);
      if(e.deltaY>30){
        this.scrollStatus = 'scrollDown';
      }else if(e.deltaY<-30){
        this.scrollStatus = 'scrollUp'
      }
      setTimeout(()=>{
        this.scrollStatus = 'void';
        console.log(this.scrollStatus);
      },300);
  }

}
