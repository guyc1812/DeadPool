import {APP_ID, Component, HostListener, Inject, Input, PLATFORM_ID} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {isPlatformBrowser} from "@angular/common";
import {autorun} from 'mobx';

import {SiderState} from "../../service/siderState/sider.state.store";
import {SiderItem} from "./sider-item/sider.item.interface";


@Component({
  selector: 'sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css'],
  animations: [
    trigger('siderListExpand', [
      state('isExpand', style({'margin-left': '0'})),
      state('noExpand', style({'margin-left': '-260px'})),
      transition('* => isExpand', animate('500ms')),
      transition('noExpand => isExpand', animate('500ms')),
      transition('isExpand => noExpand', animate('500ms'))
    ])
  ]
})

export class SiderComponent {

  @Input() list:SiderItem[];

  isBrowser:boolean;
  isInited:boolean;

  isExpand:boolean;
  animationState:string;

  disposer:any;

  constructor( @Inject(PLATFORM_ID) private platformId: Object,
               @Inject(APP_ID) private appId: string,
               private siderState: SiderState){

    this.isBrowser = isPlatformBrowser(platformId);

    this.siderState.setBigScreenState(window.innerWidth>=960);
    this.siderState.setExpandState(this.siderState.isBigScreen);
    this.animationState = 'noExpand';

    this.disposer = autorun(() => {
      if(this.isInited){
        this.isExpand = this.siderState.isSiderExpanded;
        this.animationState = this.siderState.isSiderExpanded?'isExpand':'noExpand';
      }
    });

  }

  ngOnInit(){
    setTimeout(()=>{
      this.isInited = true;
    },1000)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(event.target.innerWidth>=960){
      this.siderState.setExpandState(true);
      this.siderState.setBigScreenState(true);
    }else {
      this.siderState.setExpandState(false);
      this.siderState.setBigScreenState(false);
    }
  }

  expand(){
    if(this.isExpand){
      this.siderState.setExpandState(false);
    }else {
      this.siderState.setExpandState(true);
    }
  }

}
