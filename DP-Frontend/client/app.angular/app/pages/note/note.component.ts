import {Component, HostListener, Inject} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {autorun} from "mobx";

import {SiderState} from "../../service/siderState/sider.state.store";
import {SiderItem} from '../../ui/sider/sider-item/sider.item.interface'

import siderList from '../../ui/sider/sider-list/sider.list'
import {ActivatedRoute} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  animations: [
    trigger('siderListExpand', [
      state('isExpand', style({'padding-left': '260px'})),
      state('noExpand', style({'padding-left': '0'})),
      transition('* => isExpand', animate('500ms ease-in')),
      transition('noExpand => isExpand', animate('500ms ease-in')),
      transition('isExpand => noExpand', animate('500ms ease-out'))
    ]),
    trigger('mainHeaderToggle', [
      state('noToggled', style({'margin-top': '-400px'})),
      state('isToggled', style({'margin-top': '0'})),
      transition('noToggled => isToggled', animate('500ms ease-in')),
      transition('isToggled => noToggled', animate('500ms ease-out'))
    ])
  ]
})

export class NoteComponent {

  siderList: SiderItem[];

  id: string;
  mainState: string;
  mainHeaderState: string;
  disposer: any;

  scrollTop:number;

  constructor(private siderState: SiderState,
              private route: ActivatedRoute,
              @Inject(DOCUMENT) private document: Document) {
    this.siderList = siderList;
    this.mainHeaderState = 'isToggled';
    this.scrollTop = 0;
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.disposer = autorun(() => {
      this.mainState = this.siderState.isSiderExpanded ? 'isExpand' : 'noExpand';
    });
  }

  ngAfterContentInit() {
    setTimeout(()=>this.mainHeaderState='noToggled',1500)
  }

  ngOnDestroy(){
    this.disposer();
  }

  toggle() {
    if (this.siderState.isBigScreen) {
      return
    } else {
      if (this.siderState.isSiderExpanded) {
        this.siderState.setExpandState(false)
      }
    }
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll() {
    this.scrollTop = this.document.scrollingElement.scrollTop;
  }

  @HostListener('mousewheel', ['$event'])
  onWheel(e) {
    if(e.deltaY<=-10&&this.scrollTop===0&&this.mainHeaderState === 'noToggled'){
      this.mainHeaderState = 'isToggled';
    }
    if(e.deltaY>=10&&this.mainHeaderState === 'isToggled'){
      this.mainHeaderState = 'noToggled';
      setTimeout(()=>this.document.scrollingElement.scrollTo(0,0),510)
    }
  }

}
