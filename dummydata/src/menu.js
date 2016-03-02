export class Menu {

  context = {};

  updateLanguage(slug) {
    this.context.setLanguage(slug);
  }

  updateCountry(slug) {
    this.context.setCountry(slug);
  }

  bind(bindingContext, overrideContext) {
    this.context = overrideContext.bindingContext.context;
  }
}
