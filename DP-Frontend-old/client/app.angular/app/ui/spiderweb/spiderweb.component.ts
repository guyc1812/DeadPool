import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'spiderWeb',
  templateUrl: './spiderweb.component.html',
  styleUrls: ['./spiderweb.component.css']
})

export class SpiderWebComponent {

  spiderShow: boolean;
  scrollStatus: string = 'void';

  constructor(private router: Router) {
    this.spiderShow = false;
  }

  ngOnInit() {
    setTimeout(() => this.spiderShow = true, 1000);
  }

  spider() {
    this.router.navigate([`/spider`]);
  }

}
