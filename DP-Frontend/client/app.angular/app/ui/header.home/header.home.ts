import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'header-home',
  templateUrl: './header.home.html',
  styleUrls: ['./header.home.css']
})

export class HeaderHomeComponent {

  categories: any;

  constructor(private router: Router) {
    this.categories = [
      {
        avenger: 'Stark',
        category: 'javaBasic',
        title: 'Java Basic',
        src: ''
      },
      {
        avenger: 'Rogers',
        category: 'designPattern',
        title: 'Design Pattern',
        src: ''
      },
      {
        avenger: 'Banner',
        category: 'algorithm',
        title: 'Algorithm',
        src: ''
      },
      {
        avenger: 'TChalla',
        category: 'devOps',
        title: 'DevOps',
        src: ''
      },
      {
        avenger: 'Thor',
        category: 'frontend',
        title: 'Frontend',
        src: ''
      },
      {
        avenger: 'Strange',
        category: 'others',
        title: 'Others',
        src: ''
      },
    ]
  }

  navTo(category: string) {
    this.router.navigate([`/note/${category}/hello`]);
  }

  navToHome() {
    this.router.navigate([`/home`]);
  }


}
