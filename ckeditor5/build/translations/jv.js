(function (n) {
  const a = (n['jv'] = n['jv'] || {});
  a.dictionary = Object.assign(a.dictionary || {}, {
    '%0 of %1': '%0 saking %1',
    Cancel: 'Batal',
    Clear: '',
    'Show more items': 'Tampilaken langkung kathah',
  });
  a.getPluralForm = function (n) {
    return 0;
  };
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}));
