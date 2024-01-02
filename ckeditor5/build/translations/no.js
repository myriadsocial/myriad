(function (e) {
  const r = (e['no'] = e['no'] || {});
  r.dictionary = Object.assign(r.dictionary || {}, {
    '%0 of %1': '%0 av %1',
    Accept: 'Godta',
    Aquamarine: 'Akvamarin',
    Black: 'Svart',
    Blue: 'Blå',
    Cancel: 'Avbryt',
    Clear: 'Slett',
    'Click to edit block': 'Klikk for å redigere blokk',
    'Dim grey': 'Svak grå',
    'Drag to move': 'Dra for å flytte',
    'Dropdown toolbar': 'Verktøylinje for nedtrekksliste',
    'Edit block': 'Rediger blokk',
    'Editor block content toolbar':
      'Verktøylinje for blokkinnhold i redigeringsverktøy',
    'Editor contextual toolbar':
      'Verktøylinje for kontekst i redigeringsverktøy',
    'Editor editing area: %0': 'Redigeringsområde for redigeringsverktøyet: %0',
    'Editor toolbar': 'Verktøylinje for redigeringsverktøy',
    Green: 'Grønn',
    Grey: 'Grå',
    HEX: 'HEX',
    'Insert paragraph after block': 'Sett inn paragraf etter blokk',
    'Insert paragraph before block': 'Sett inn paragraf foran blokk',
    'Light blue': 'Lyseblå',
    'Light green': 'Lysegrønn',
    'Light grey': 'Lysegrå',
    Next: 'Neste',
    'No results found': 'Ingen resultater',
    'No searchable items': 'Ingen søkbare elementer',
    Orange: 'Oransje',
    'Press Enter to type after or press Shift + Enter to type before the widget':
      'Trykk Enter for å skrive etter eller trykk Shift + Enter for å skrive før widgeten',
    Previous: 'Forrige',
    Purple: 'Lilla',
    Red: 'Rød',
    Redo: 'Gjør om',
    'Rich Text Editor': 'Tekstredigeringsverktøy for rik tekst',
    'Select all': 'Velg alt ',
    'Show more items': 'Vis flere elementer',
    Turquoise: 'Turkis',
    Undo: 'Angre',
    White: 'Hvit',
    'Widget toolbar': 'Widget verktøylinje ',
    Yellow: 'Gul',
  });
  r.getPluralForm = function (e) {
    return e != 1;
  };
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}));
