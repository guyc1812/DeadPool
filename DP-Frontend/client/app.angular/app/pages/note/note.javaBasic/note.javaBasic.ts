import {Component} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {autorun} from "mobx";

import {SiderState} from "../../../service/siderState/sider.state.store";
import {SiderItem} from '../../../ui/sider/sider-item/sider.item.interface'

import siderList from '../../../ui/sider/sider-list/sider.list'

@Component({
  templateUrl: './note.javaBasic.html',
  styleUrls: ['./note.javaBasic.css'],
  animations: [
    trigger('siderListExpand', [
      state('isExpand', style({'padding-left': '260px'})),
      state('noExpand', style({'padding-left': '0'})),
      transition('* => isExpand', animate('500ms')),
      transition('* => noExpand', animate('500ms')),
      transition('noExpand => isExpand', animate('500ms')),
      transition('isExpand => noExpand', animate('500ms'))
    ])
  ]
})

export class NoteJavaBasic {

  siderList:SiderItem[];

  animationState:string = 'noExpand';

  isInit:boolean=false;

  constructor(private siderState: SiderState){
    this.siderList = siderList;
    // setTimeout(()=>{
    // this.animationState = 'noExpand';
    //   console.log(this.animationState);
    //   this.init = true;
    // },3000);
    // autorun(() => {
    //   if(this.init&&!this.siderState.isBigScreen){
    //     this.animationState = 'noExpand'
    //   }else {
    //     this.animationState = this.siderState.isSiderExpanded?'isExpand':'noExpand';
    //   }
    // });
  }

  ngOnInit(){
    this.animationState = 'noExpand';
  }

  ngAfterContentInit(){

    // this.animationState = 'isExpand';
    // if(this.siderState.isBigScreen){
    //   this.animationState = 'noExpand';
    //   console.log(this.animationState);
    //   setTimeout(()=>{
    //     this.animationState = 'isExpand';
    //     console.log(this.animationState);
    //     this.init = true;
    //   },3000);
    // }else {
    //   this.animationState = 'noExpand';
    //   this.init = true;
    // }
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
