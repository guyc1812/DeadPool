import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  distance:number;

  scroll(e:any){
    console.log(e);
  }

  @HostListener('mousewheel', ['$event'])
  onWheel(e) {

      this.distance = e.deltaY-0;
      console.log(this.distance);


  }







}
