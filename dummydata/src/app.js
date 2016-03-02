// var _languages = [
//   { slug: 'en', title: 'English' },
//   { slug: 'jp', title: 'Japanese' }
// ];
//
// var _countries = [
//   { slug: 'us', title: 'United States' },
//   { slug: 'ca', title: 'Canada' }
// ];
//
// function _languageItemToRoute(item) {
//   return { route: 'l/'+item.slug, name: slug.title, title: slug.title, nav: true };
// }
//
// function _countryItemToRoute(item) {
//   return { route: 'c/'+item.slug, name: slug.title, title: slug.title, nav: true };
// }

export class App {

  languageName = 'English';
  countryName = 'United States';

  configureRouter(config, router){
    config.title = 'DummyData';

    let map = [];
    // _languages.forEach(item => map.push(_languageItemToRoute(item)));
    // _countries.forEach(item => map.push(_countryItemToRoute(item)));
    map.push({ route: 're', name: 'Regenerate', title:'Regenerate' });

    config.map(map);

    // router.languageName = 'English';
    // router.countryName = 'UnitedStates';
    // router.ordinal = 0;
    // console.log(router);
    this.router = router;
  }
}
