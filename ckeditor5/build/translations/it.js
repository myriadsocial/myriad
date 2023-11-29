(function (e) {
  const r = (e['it'] = e['it'] || {});
  r.dictionary = Object.assign(r.dictionary || {}, {
    '%0 of %1': '%0 di %1',
    Accept: 'Accetta',
    Aquamarine: 'Aquamarina',
    Black: 'Nero',
    Blue: 'Blu',
    Cancel: 'Annulla',
    Clear: 'Cancella',
    'Click to edit block': 'Clicca per modificare il blocco',
    'Dim grey': 'Grigio tenue',
    'Drag to move': 'Trascina per spostare',
    'Dropdown toolbar': 'Barra degli strumenti del menu a discesa',
    'Edit block': 'Modifica blocco',
    'Editor block content toolbar':
      "Barra degli strumenti contestuale dell'editor del blocco",
    'Editor contextual toolbar':
      "Barra degli strumenti contestuale dell'editor",
    'Editor editing area: %0': "Area di modifica dell'editor: %0",
    'Editor toolbar': "Barra degli strumenti dell'editor",
    Green: 'Verde',
    Grey: 'Grigio',
    HEX: 'HEX',
    'Insert paragraph after block': 'Inserisci paragrafo dopo blocco',
    'Insert paragraph before block': 'Inserisci paragrafo prima di blocco',
    'Light blue': 'Azzurro',
    'Light green': 'Verde chiaro',
    'Light grey': 'Grigio chiaro',
    Next: 'Avanti',
    'No results found': 'Nessun risultato trovato',
    'No searchable items': 'Nessun elemento ricercabile',
    Orange: 'Arancio',
    'Press Enter to type after or press Shift + Enter to type before the widget':
      'Premere Invio per inserire dopo il widget o premere Maiusc + Invio per inserire prima del widget',
    Previous: 'Indietro',
    Purple: 'Porpora',
    Red: 'Rosso',
    Redo: 'Ripristina',
    'Rich Text Editor': 'Editor di testo formattato',
    'Select all': 'Seleziona tutto',
    'Show more items': 'Mostra più elementi',
    Turquoise: 'Turchese',
    Undo: 'Annulla',
    White: 'Bianco',
    'Widget toolbar': 'Barra degli strumenti del widget',
    Yellow: 'Giallo',
  });
  r.getPluralForm = function (e) {
    return e == 1 ? 0 : e != 0 && e % 1e6 == 0 ? 1 : 2;
  };
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}));
