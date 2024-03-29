import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {autorun} from 'mobx';
import {SiderState} from '../../service/siderState/sider.state.store';
import {SiderItem} from '../../ui/sider/sider-item/sider.item.interface';
import siderList from '../../ui/sider/sider-list/sider.list';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/httpService/httpService';
import * as $ from 'jquery';

@Component({
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  animations: [
    trigger('mainExpand', [
      state('isExpand', style({'padding-left': '260px'})),
      state('noExpand', style({'padding-left': '0'})),
      transition('* => isExpand', animate('400ms ease-in')),
      transition('noExpand => isExpand', animate('400ms ease-in')),
      transition('isExpand => noExpand', animate('380ms ease-out'))
    ])
  ]
})

export class NoteComponent implements OnInit, OnDestroy {

  // Input values
  id: string;
  category: string;
  siderList: SiderItem[];

  // subscribers
  httpSubscriber: any;
  routeSubscriber: any;
  disposer: any;

  mainState: string;

  categories: any;
  src: string;
  background: string;

  constructor(private siderState: SiderState,
              private route: ActivatedRoute,
              private http: HttpService) {
    this.siderState.setInitedState(false);
    this.siderList = siderList;
    setTimeout(() => this.siderState.setInitedState(true), 420);
  }

  ngOnInit() {

    this.categories = {
      javaBasic: {
        src: 'https://oss.guyuchen.com/deadpool/images/Stark-symbol.png',
        background: 'radial-gradient(circle farthest-side at right top,#fefdfe 5%,#f8cdda 25%,#1d2b64 80%,#0e153a 98%)'
      },
      designPattern: {
        src: 'https://oss.guyuchen.com/deadpool/images/Steven-symbol.png',
        background: 'radial-gradient(circle farthest-side at right top,#233f6e 5%,#9e404a 25%,#381317 80%,#20090b 98%)'
      },
      algorithm: {
        src: 'https://oss.guyuchen.com/deadpool/images/Hulk-Symbol.png',
        background: 'radial-gradient(circle farthest-side at right top,#fab64b 5%,#2d582a 25%,#082310 80%,#001204 98%)'
      },
      devOps: {
        src: 'https://oss.guyuchen.com/deadpool/images/Tchalla-symbol.png',
        background: 'radial-gradient(circle farthest-side at right top,#c8b388 5%,#9fbab5 25%,#082310 80%,#162522 98%)'
      },
      frontend: {
        src: 'https://oss.guyuchen.com/deadpool/images/Thor-symbol.png',
        background: 'radial-gradient(circle farthest-side at right top,#fbfef7 5%,#c1792f 25%,#30221f 80%,#1c1115 98%)'
      },
      others: {
        src: 'https://oss.guyuchen.com/deadpool/images/Strange-symbol.png',
        background: 'radial-gradient(circle farthest-side at right top,#d6df36 5%,#ae7984 25%,#231231 80%,#120323 98%)'
      }
    };

    this.category = this.route.snapshot.paramMap.get('category');
    this.id = this.route.snapshot.paramMap.get('id');

    this.src = this.categories[`${this.category}`].src;
    this.background = this.categories[`${this.category}`].background;

    this.httpSubscriber = this.http.getSiderList(this.category)
      .subscribe(
        data => {
          const text = data['text'];
          const response = JSON.parse(data['response']);
          if (text === 'error') {
            console.error('get sider list error');
          } else if (text === 'ok') {
            this.siderList = response['index'];
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
      this.mainState = this.siderState.isBigScreen && this.siderState.isSiderExpanded ? 'isExpand' : 'noExpand';
    });
  }

  ngOnDestroy() {
    this.disposer();
    this.httpSubscriber.unsubscribe();
    this.routeSubscriber.unsubscribe();
  }

  toTop() {
    $('html, body').animate({scrollTop: 0}, 400);
  }

  toBottom() {
    $('html, body').animate({scrollTop: $(document).height() - $(window).height()}, 400);
  }

  toggleMain() {
    if ((!this.siderState.isBigScreen) && this.siderState.isSiderExpanded) {
      this.siderState.setExpandState(false);
    }
  }
}
