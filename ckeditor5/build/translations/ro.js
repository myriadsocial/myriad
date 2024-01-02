(function (e) {
  const t = (e['ro'] = e['ro'] || {});
  t.dictionary = Object.assign(t.dictionary || {}, {
    '%0 of %1': '%0 din %1',
    Accept: 'Acceptă',
    Aquamarine: 'Acvamarin',
    Black: 'Negru',
    Blue: 'Albastru',
    Cancel: 'Anulare',
    Clear: 'Ștergere',
    'Click to edit block': 'Faceți clic pentru a edita întreg blocul',
    'Dim grey': 'Gri slab',
    'Drag to move': 'Glisați pentru a muta',
    'Dropdown toolbar': 'Bară listă opțiuni',
    'Edit block': 'Editează bloc',
    'Editor block content toolbar':
      'Bară de instrumente editor pentru blocuri de conținut',
    'Editor contextual toolbar': 'Bară contextuală de instrumente editor',
    'Editor editing area: %0': 'Zonă editare editor: %0',
    'Editor toolbar': 'Bară editor',
    Green: 'Verde',
    Grey: 'Gri',
    HEX: 'HEX',
    'Insert paragraph after block': 'Inserează un paragraf după bloc',
    'Insert paragraph before block': 'Inserează un paragraf înaintea blocului',
    'Light blue': 'Albastru deschis',
    'Light green': 'Verde deschis',
    'Light grey': 'Gri deschis',
    Next: 'Înainte',
    'No results found': 'Nu au fost găsite rezultate',
    'No searchable items': 'Nu există elemente ce pot fi căutate',
    Orange: 'Portocaliu',
    'Press Enter to type after or press Shift + Enter to type before the widget':
      'Apăsați Enter pentru a scrie după widget sau Shift+Enter pentru a scrie înaintea acestuia',
    Previous: 'Înapoi',
    Purple: 'Violet',
    Red: 'Roșu',
    Redo: 'Revenire',
    'Rich Text Editor': 'Editor de text',
    'Select all': 'Selectează-le pe toate',
    'Show more items': 'Arată mai multe elemente',
    Turquoise: 'Turcoaz',
    Undo: 'Anulare',
    White: 'Alb',
    'Widget toolbar': 'Bară widget',
    Yellow: 'Galben',
  });
  t.getPluralForm = function (e) {
    return e == 1 ? 0 : e % 100 > 19 || (e % 100 == 0 && e != 0) ? 2 : 1;
  };
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}));
