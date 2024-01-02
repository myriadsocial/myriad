(function (e) {
  const o = (e['sk'] = e['sk'] || {});
  o.dictionary = Object.assign(o.dictionary || {}, {
    '%0 of %1': '%0 z %1',
    Accept: 'Potvrdiť',
    Aquamarine: 'Akvamarínová',
    Black: 'Čierna',
    Blue: 'Modrá',
    Cancel: 'Zrušiť',
    Clear: 'Vyčistiť',
    'Click to edit block': 'Úprava bloku kliknutím',
    'Dim grey': 'Tmavosivá',
    'Drag to move': 'Potiahnuť a presunúť',
    'Dropdown toolbar': 'Panel nástrojov roletového menu',
    'Edit block': 'Upraviť odsek',
    'Editor block content toolbar': 'Panel s nástrojmi obsahu bloku editora',
    'Editor contextual toolbar': 'Kontextový panel nástrojov editora',
    'Editor editing area: %0': 'Oblasť úprav editora: %0',
    'Editor toolbar': 'Panel nástrojov editora',
    Green: 'Zelená',
    Grey: 'Sivá',
    HEX: 'HEX',
    'Insert paragraph after block': 'Vložiť odstavec za blok',
    'Insert paragraph before block': 'Vložiť odstavec pred blok',
    'Light blue': 'Bledomodrá',
    'Light green': 'Bledozelená',
    'Light grey': 'Bledosivá',
    Next: 'Ďalšie',
    'No results found': 'Neboli nájdené žiadne výsledky',
    'No searchable items': 'Žiadne vyhľadávateľné položky',
    Orange: 'Oranžová',
    'Press Enter to type after or press Shift + Enter to type before the widget':
      'Stlačte Enter, ak chcete písať po miniaplikácii, alebo stlačte Shift + Enter, ak chcete písať pred miniaplikáciou',
    Previous: 'Predchádzajúce',
    Purple: 'Fialová',
    Red: 'Červená',
    Redo: 'Znova',
    'Rich Text Editor': 'Editor s formátovaním',
    'Select all': 'Označiť všetko',
    'Show more items': 'Zobraziť viac položiek',
    Turquoise: 'Tyrkysová',
    Undo: 'Späť',
    White: 'Biela',
    'Widget toolbar': 'Panel nástrojov ovládacieho prvku',
    Yellow: 'Žltá',
  });
  o.getPluralForm = function (e) {
    return e % 1 == 0 && e == 1
      ? 0
      : e % 1 == 0 && e >= 2 && e <= 4
      ? 1
      : e % 1 != 0
      ? 2
      : 3;
  };
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}));
