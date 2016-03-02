import {bindable} from 'aurelia-framework';

var _languages = [
  { slug: 'en', title: 'English' },
  { slug: 'de', title: 'German' },
  { slug: 'gk', title: 'Greek' },
  { slug: 'jp', title: 'Japanese' },
  { slug: 'es', title: 'Spanish' }
];

var _countries = [
  { slug: 'us', title: 'United States' },
  { slug: 'ca', title: 'Canada' }
];

function _languageItemToRoute(item) {
  return { route: 'l/'+item.slug, name: slug.title, title: slug.title, nav: true };
}

function _countryItemToRoute(item) {
  return { route: 'c/'+item.slug, name: slug.title, title: slug.title, nav: true };
}

export class Context {
  @bindable title = 'Context';

  language = '';
  country = '';

  languageName = 'English';
  countryName = 'United States';
  ordinal = 0;

  languages = _languages;
  countries = _countries;

}
