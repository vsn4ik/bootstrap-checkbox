'use strict';

(function($) {
  $.extend($.fn.checkboxpicker.defaults, {
    offLabel: 'Não',
    onLabel: 'Sim',
    warningMessage: 'Elementos do tipo label não são suportados dentro do Bootstrap-checkbox.'
  });
})(jQuery);
