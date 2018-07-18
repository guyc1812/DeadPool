import {Injectable} from "@angular/core";
import {action, observable, useStrict} from 'mobx';

useStrict(true);

@Injectable()
export class PopService {

  @observable pop: boolean;

  constructor() {
    this.pop = false;
  }

  @action
  setPop() {
    this.pop = true;
  }

  @action
  cancelPop() {
    this.pop = false;
  }

}
