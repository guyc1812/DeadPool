import {Component} from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {

  contact: any;

  title: string;

  time: any;

  isClicked:boolean;

  constructor() {

    this.title = 'www.guyuchen.com';

    this.contact = {
      github: 'github.com/guyc1812',
      gmail: 'guyc1812@gmail.com',
      linkedin: '谷宇晨',
      wechat: 'wxid_fakeface',
      weibo: 'weibo.com/guyc1812'
    }
  }

  mouseEnter(con: string) {
    if(this.title !== this.contact[`${con}`]){
      clearTimeout(this.time);
      this.isClicked = false;
      this.title = this.contact[`${con}`];
    }
  }

  mouseLeave() {
    if(!this.isClicked){
      this.title = 'www.guyuchen.com';
    }
  }

  clickE(con: string) {
    this.isClicked = true;
    clearTimeout(this.time);
    this.title = this.contact[`${con}`];
    this.time = setTimeout(()=>{
      this.title = 'www.guyuchen.com';
      this.isClicked = false;
    },3000);

    if(con==='github'){
      window.open(
        'https://github.com/guyc1812',
        '_blank'
      );
    } else if (con==='weibo'){
      window.open(
        'https://weibo.com/guyc1812',
        '_blank'
      );
    }
  }


}
