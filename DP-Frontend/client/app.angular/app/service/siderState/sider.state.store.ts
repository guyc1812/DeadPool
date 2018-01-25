import {Injectable} from '@angular/core';
import {action, observable, useStrict} from 'mobx';

useStrict(true);

@Injectable()
export class SiderState {

  constructor() {
  }

  @observable isBigScreen: boolean;
  @observable isSiderExpanded: boolean;

  @action
  setExpandState(state: boolean) {
    this.isSiderExpanded = state;
  }

  @action
  setBigScreenState(state: boolean) {
    this.isBigScreen = state;
  }


}
