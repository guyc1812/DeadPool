import {Component} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'deadpool',
  templateUrl: './deadpool.component.html',
  styleUrls: ['./deadpool.component.scss']
})

export class DeadpoolComponent {

  flag: boolean;

  ngOnInit() {
    this.flag = true;
  }

  closeEye() {
    if (this.flag) {
      this.flag = false;
      let c7 = $('.c7');
      c7.css("background-color", "#00070d");
      setTimeout(() => {
        c7.css("background-color", "#ffffff");
      }, 200);
      setTimeout(() => {
        this.flag = true;
      }, 10000)
    }
  }

}
