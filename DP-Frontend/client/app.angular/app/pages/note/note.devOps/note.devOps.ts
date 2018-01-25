import {Component} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {autorun} from "mobx";

import {SiderState} from "../../../service/siderState/sider.state.store";
import {SiderItem} from '../../../ui/sider/sider-item/sider.item.interface'

import siderList from '../../../ui/sider/sider-list/sider.list'

@Component({
  templateUrl: './note.devOps.html',
  styleUrls: ['./note.devOps.css'],
  animations: [
    trigger('siderListExpand', [
      state('isExpand', style({'padding-left': '260px'})),
      state('noExpand', style({'padding-left': '0'})),
      transition('* => isExpand', animate('500ms')),
      transition('noExpand => isExpand', animate('500ms')),
      transition('isExpand => noExpand', animate('500ms'))
    ])
  ]
})

export class NoteDevOps {

  siderList:SiderItem[];

  animationState:string;

  constructor(private siderState: SiderState){
    this.siderList = siderList;
    autorun(() => {
      if(!this.siderState.isBigScreen){
        this.animationState = 'noExpand'
      }else {
        this.animationState = this.siderState.isSiderExpanded?'isExpand':'noExpand';
      }
    });
  }

  toggle(){
    if(this.siderState.isBigScreen){
      return
    }else {
      if(this.siderState.isSiderExpanded){
        this.siderState.setExpandState(false)
      }
    }
  }


}
