import {inject} from 'aurelia-framework';

export class Demo {

  context = {};

  // array of {title,value,showSpinner} or null (separator).
  menu = [];

  // Evaluate each item in the menu.
  populate() {
    //TODO Wait for the data to actually be available before populating.
    let menuWithFunctions = this.context.menu();
    let evaluatedMenu = [];
    menuWithFunctions.forEach(function(e) {
      if (e) {
        let value = e[1]();
        evaluatedMenu.push({
          title: e[0],
          value: value,
          showSpinner: !value
        });
      } else {
        evaluatedMenu.push(null);
      }
    });
    this.menu = evaluatedMenu;
  }

  constructor() {
  }

  bind(bindingContext, overrideContext) {
    this.context = overrideContext.bindingContext.context;
    this.context.subscribe("regenerate",() => this.populate());
  }

  attached() {
    this.populate();
  }
}
