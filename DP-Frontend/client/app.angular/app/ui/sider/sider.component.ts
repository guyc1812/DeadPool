import {APP_ID, ChangeDetectionStrategy, Component, HostListener, Inject, Input, PLATFORM_ID} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
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
      state('noExpand', style({'margin-left': '-270px'})),
      transition('* => isExpand', animate('500ms ease-in')),
      transition('noExpand => isExpand', animate('500ms ease-in')),
      transition('isExpand => noExpand', animate('500ms ease-out'))
    ])
  ]
})

export class SiderComponent {

  @Input() list: SiderItem[];

  @Input() category:string;

  src:string;

  categories:any;

  isBrowser: boolean;

  animationState: string;

  disposer: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              @Inject(APP_ID) private appId: string,
              private siderState: SiderState) {

    this.isBrowser = isPlatformBrowser(platformId);

    this.siderState.setBigScreenState(window.innerWidth >= 960);
    this.siderState.setExpandState(false);
    this.siderState.setInitedState(false);

    this.categories = {
      designPattern : 'assets/images/Steven-logo-1.png',
      javaBasic :     'assets/images/Stark-logo-1.png',
      banner :        'assets/images/Hulk-logo-1.png',
      thor :          'assets/images/Thor-logo-1.png',
      tchalla :       'assets/images/Tchalla-logo-1.png',
      strange :       'assets/images/Strange-logo-1.png',
    }

  }

  ngOnInit(){
    this.disposer = autorun(() => {
      this.animationState = this.siderState.isInited&&this.siderState.isSiderExpanded ? 'isExpand' : 'noExpand';
    });
  }

  ngAfterContentInit() {
    let self = this;
    setTimeout(() => {
      self.siderState.setInitedState(true);
      self.siderState.setExpandState(this.siderState.isBigScreen);
    }, 2200);
  }

  ngOnChanges(){
    this.src = this.categories[`${this.category}`];
  }

  ngOnDestroy(){
    this.disposer();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth >= 960) {
      this.siderState.setExpandState(true);
      this.siderState.setBigScreenState(true);
    } else {
      this.siderState.setExpandState(false);
      this.siderState.setBigScreenState(false);
    }
  }

}
