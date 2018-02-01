import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {SiderItem} from "./sider.item.interface";
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'sider-item',
  templateUrl: './sider-item.component.html',
  styleUrls: ['./sider-item.component.css'],
  animations: [
    trigger('siderItemExpand', [
      state('isExpand', style({transform: 'rotate(90deg)'})),
      state('noExpand', style({transform: 'rotate(0deg)'})),
      transition('* => isExpand', animate('200ms ease-in')),
      transition('noExpand => isExpand', animate('200ms ease-in')),
      transition('isExpand => noExpand', animate('200ms ease-in'))
    ])
  ]
})

export class SiderItemComponent {

  @Input() item:SiderItem;

  expand:boolean = false;

  animationState:string;

  // for nav
  category:any = {
    Stark: "javaBasic"
  };

  constructor(private router: Router) {}

  toggleOrNav(item:SiderItem){
    let category = this.category[`${item.category}`];
    this.expand = !this.expand;
    this.animationState = this.expand?'isExpand':'noExpand';
    if(item.nav&&item.nav!==''){
      this.router.navigate([`/note/${category}/${item.nav}`]);
    }
  }

}
