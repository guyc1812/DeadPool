import {Component, Input} from '@angular/core';
import {SiderState} from "../../service/siderState/sider.state.store";
import {Router} from "@angular/router";

@Component({
  selector: 'header-note',
  templateUrl: './header.note.html',
  styleUrls: ['./header.note.css']
})

export class HeaderNoteComponent {

  @Input()
  category: string;

  categories: any;

  src: string;

  title:string;

  constructor(private siderState: SiderState, private router: Router) {
    this.categories = {
      designPattern: {
        src: 'assets/images/Steven-logo-1.png',
        title: 'Design Pattern'
      },
      designPattern2: 'assets/images/Steven-logo-2.png',
      javaBasic: {
        src: 'assets/images/Stark-logo-1.png',
        title: 'Java Basic'
      },
      javaBasic2: 'assets/images/Stark-logo-2.png',
      algorithm: {
        src: 'assets/images/Hulk-logo-1.png',
        title: 'Algorithm'
      },
      algorithm2: 'assets/images/Hulk-logo-2.png',
      frontend: {
        src: 'assets/images/Thor-logo-1.png',
        title: 'Frontend'
      },
      frontend2: 'assets/images/Thor-logo-2.png',
      devOps: {
        src: 'assets/images/Tchalla-logo-1.png',
        title: 'DevOps'
      },
      devOps2: 'assets/images/Tchalla-logo-2.png',
      others: {
        src: 'assets/images/Strange-logo-1.png',
        title: 'Others'
      },
      others2: 'assets/images/Strange-logo-2.png',
    }
  }

  ngOnChanges() {
    if (this.categories) {
      this.src = this.categories[`${this.category}`].src;
      this.title = this.categories[`${this.category}`].title;
    }
  }

  expand(e:any) {

    e.stopPropagation();

    if (this.siderState.isSiderExpanded) {
      this.siderState.setExpandState(false);
    } else {
      this.siderState.setExpandState(true);
    }
  }

  mouseEnter() {
    this.src = this.categories[`${this.category}2`]
  }

  mouseLeave() {
    this.src = this.categories[`${this.category}`].src
  }

  navToHome() {
    this.router.navigate([`/home`]);
  }


}
