(function (i) {
  const a = (i['lt'] = i['lt'] || {});
  a.dictionary = Object.assign(a.dictionary || {}, {
    '%0 of %1': '%0 iš %1',
    Accept: 'Priimti',
    Aquamarine: 'Aquamarine',
    Black: 'Juoda',
    Blue: 'Mėlyna',
    Cancel: 'Atšaukti',
    Clear: 'Išvalyti',
    'Click to edit block': 'Spustelėkite norėdami redaguoti bloką',
    'Dim grey': 'Pilkšva',
    'Drag to move': 'Vilkite, kad perkeltumėte',
    'Dropdown toolbar': 'Įrankių juosta pasirenkamajame sąraše',
    'Edit block': 'Redaguoti bloką',
    'Editor block content toolbar': 'Redaktoriaus bloko turinio įrankių juosta',
    'Editor contextual toolbar': 'Redaktoriaus kontekstinė įrankių juosta',
    'Editor editing area: %0': 'Redaktoriaus redagavimo sritis: %0',
    'Editor toolbar': 'Redaktoriaus įrankių juosta',
    Green: 'Žalia',
    Grey: 'Pilka',
    HEX: 'Šešioliktainė reikšmė (angl. HEX)',
    'Insert paragraph after block': 'Įkelti pastraipą po bloko',
    'Insert paragraph before block': 'Įkelti pastraipą prieš bloką',
    'Light blue': 'Šviesiai mėlyna',
    'Light green': 'Šviesiai žalia',
    'Light grey': 'Šviesiai pilka',
    Next: 'Kitas',
    'No results found': 'Nieko nerasta',
    'No searchable items': 'Nėra paieškos elementų',
    Orange: 'Oranžinė',
    'Press Enter to type after or press Shift + Enter to type before the widget':
      'Paspauskite Enter, jei norite rašyti po valdiklio, arba paspauskite Shift + Enter, jei norite rašyti prieš valdiklį.',
    Previous: 'Buvęs',
    Purple: 'Violetinė',
    Red: 'Raudona',
    Redo: 'Pirmyn',
    'Rich Text Editor': 'Raiškiojo teksto redaktorius',
    'Select all': 'Pasirinkti viską',
    'Show more items': 'Rodyti daugiau elementų',
    Turquoise: 'Turkio',
    Undo: 'Atgal',
    White: 'Balta',
    'Widget toolbar': 'Valdiklių įrankių juosta',
    Yellow: 'Geltona',
  });
  a.getPluralForm = function (i) {
    return i % 10 == 1 && (i % 100 > 19 || i % 100 < 11)
      ? 0
      : i % 10 >= 2 && i % 10 <= 9 && (i % 100 > 19 || i % 100 < 11)
      ? 1
      : i % 1 != 0
      ? 2
      : 3;
  };
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}));
