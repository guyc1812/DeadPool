import {Component, HostListener} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {autorun} from "mobx";

import {SiderState} from "../../service/siderState/sider.state.store";
import {SiderItem} from '../../ui/sider/sider-item/sider.item.interface'

import siderList from '../../ui/sider/sider-list/sider.list'
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../service/httpService/httpService";

@Component({
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  animations: [
    trigger('siderListExpand', [
      state('isExpand', style({'padding-left': '265px'})),
      state('noExpand', style({'padding-left': '0'})),
      transition('* => isExpand', animate('500ms ease-in')),
      transition('noExpand => isExpand', animate('500ms ease-in')),
      transition('isExpand => noExpand', animate('500ms ease-out'))
    ])
  ]
})

export class NoteComponent {

  // Input values
  id: string;
  category: string;
  siderList: SiderItem[];

  // subscribers
  httpSubscriber: any;
  routeSubscriber: any;
  disposer: any;

  mainState: string;

  lastScrollTop = 0;

  constructor(private siderState: SiderState,
              private route: ActivatedRoute,
              private http: HttpService) {
    this.siderList = siderList;
  }

  ngOnInit() {

    this.category = this.route.snapshot.paramMap.get('category');
    this.id = this.route.snapshot.paramMap.get('id');

    this.httpSubscriber = this.http.getSiderList(this.category)
      .subscribe(
        data => {
          let text = data['text'];
          let response = JSON.parse(data['response']);
          if (text === 'error') {
            console.error("get sider list error");
          } else if (text === 'ok') {
            this.siderList = response['index'];
            console.log(this.siderList);
          }
        }
      );

    this.routeSubscriber = this.route.params
      .subscribe(
        params => {
          this.category = params['category'];
          this.id = params['id'];
        }
      );

    this.disposer = autorun(() => {
      this.mainState = this.siderState.isSiderExpanded ? 'isExpand' : 'noExpand';
    });
  }

  ngOnDestroy() {
    this.disposer();
    this.httpSubscriber.unsubscribe();
    this.routeSubscriber.unsubscribe();
  }

  toTop() {
    $("html, body").animate({scrollTop: 0}, 500);
  }

  toBottom() {
    $("html, body").animate({scrollTop: $(document).height() - $(window).height()}, 500);
  }

  // @HostListener('window:scroll', ['$event'])
  // onScrollEvent() {
  //   let scrollTop = $(window).scrollTop();
  //   if (scrollTop >= 10 && scrollTop <= 390) {
  //     if (scrollTop > this.lastScrollTop+10) {
  //       $("html, body").animate({scrollTop: 0}, 500);
  //       console.log('upscroll: ');
  //     } else if(scrollTop > this.lastScrollTop-10)  {
  //       $("html, body").animate({scrollTop: 400}, 500);
  //       console.log('downscroll: ');
  //     }
  //     this.lastScrollTop = scrollTop;
  //   }
  // }
}
