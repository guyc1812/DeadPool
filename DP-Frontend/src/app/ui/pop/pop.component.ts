import {Component, OnDestroy, OnInit} from '@angular/core';
import {PopService} from '../../service/popService/popService';
import {autorun} from 'mobx';

@Component({
  selector: 'pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.css'],
})

export class PopComponent implements OnInit, OnDestroy {

  loading: boolean;
  pop: boolean;
  disposer: any;

  constructor(private popService: PopService) {
    this.loading = true;
  }

  ngOnInit() {
    this.disposer = autorun(() => {
      this.pop = this.popService.pop;
    });
  }

  ngOnDestroy() {
    this.disposer();
  }

  cancelPop() {
    this.popService.cancelPop();
  }

  imgClick(e: any) {
    e.stopPropagation();
  }

}
