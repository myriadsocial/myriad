(function (e) {
  const o = (e['sl'] = e['sl'] || {});
  o.dictionary = Object.assign(o.dictionary || {}, {
    '%0 of %1': '',
    Accept: '',
    Aquamarine: 'Akvamarin',
    Black: 'Črna',
    Blue: 'Modra',
    Cancel: 'Prekliči',
    Clear: '',
    'Click to edit block': '',
    'Dim grey': 'Temno siva',
    'Drag to move': '',
    'Dropdown toolbar': '',
    'Edit block': '',
    'Editor block content toolbar': '',
    'Editor contextual toolbar': '',
    'Editor editing area: %0': '',
    'Editor toolbar': '',
    Green: 'Zelena',
    Grey: 'Siva',
    HEX: '',
    'Light blue': 'Svetlo modra',
    'Light green': 'Svetlo zelena',
    'Light grey': 'Svetlo siva',
    Next: '',
    'No results found': '',
    'No searchable items': '',
    Orange: 'Oranžna',
    Previous: '',
    Purple: 'Vijolična',
    Red: 'Rdeča',
    'Rich Text Editor': '',
    'Show more items': '',
    Turquoise: 'Turkizna',
    White: 'Bela',
    Yellow: 'Rumena',
  });
  o.getPluralForm = function (e) {
    return e % 100 == 1
      ? 0
      : e % 100 == 2
      ? 1
      : e % 100 == 3 || e % 100 == 4
      ? 2
      : 3;
  };
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}));
