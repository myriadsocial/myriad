(function (n) {
  const o = (n['hy'] = n['hy'] || {});
  o.dictionary = Object.assign(o.dictionary || {}, {
    '%0 of %1': '',
    Cancel: 'Չեղարկել',
    Clear: '',
    'Show more items': '',
  });
  o.getPluralForm = function (n) {
    return n != 1;
  };
})(window.CKEDITOR_TRANSLATIONS || (window.CKEDITOR_TRANSLATIONS = {}));
