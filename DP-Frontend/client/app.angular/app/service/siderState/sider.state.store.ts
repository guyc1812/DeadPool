import {Injectable} from '@angular/core';
import {action, observable, useStrict} from 'mobx';

useStrict(true);

@Injectable()
export class SiderState {

  constructor() {
  }

  @observable isInited: boolean;
  @observable isBigScreen: boolean;
  @observable isSiderExpanded: boolean;

  @action
  setInitedState(inited: boolean) {
    this.isInited = inited;
    console.log('[sider state sv]\t\t set inited state : ' + inited);
  }

  @action
  setExpandState(state: boolean) {
    this.isSiderExpanded = state;
    console.log('[sider state sv]\t\t set state Expand : ' + state);
  }

  @action
  setBigScreenState(state: boolean) {
    this.isBigScreen = state;
  }

}
