import {Component} from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {

  contact:any;

  title:string;

  constructor(){

    this.title = 'www.guyuchen.com';

    this.contact = {
      github: 'github.com/guyc1812',
      gmail:  'guyc1812@gmail.com',
      linkedin: 'guyuchen@linkedin',
      wechat: 'wxid_fakeface',
      weibo: 'good@weibo'
    }
  }

  mouseEnter(con:string){
    this.title = this.contact[`${con}`];
  }

  mouseLeave(){
    this.title = 'www.guyuchen.com';
  }


}
