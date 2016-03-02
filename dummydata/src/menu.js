export class Menu {

  context = {};

  bind(bindingContext, overrideContext) {
    this.context = overrideContext.bindingContext.context;
  }
}
