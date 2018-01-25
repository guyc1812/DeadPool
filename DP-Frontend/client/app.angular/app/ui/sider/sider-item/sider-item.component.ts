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

  constructor(private router: Router) {}

  toggleOrNav(nav:string){
    this.expand = !this.expand;
    this.animationState = this.expand?'isExpand':'noExpand';
    if(nav&&nav!==''){
      this.router.navigate([`/${nav}`]);
    }
  }

}
