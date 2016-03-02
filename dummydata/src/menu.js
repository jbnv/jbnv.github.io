import {inject} from 'aurelia-framework';
import {Context} from './core/context';

@inject(Context)
export class Menu {
  constructor(context) {
    console.log("Menu.constructor");
    this.context = new Context();
  }
}
