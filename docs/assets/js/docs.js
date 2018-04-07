'use strict';

document.addEventListener('DOMContentLoaded', function() {
  $.ajax({
    url: 'https://api.github.com/repos/vsn4ik/bootstrap-checkbox',
    success: function(data) {
      // XSS check
      if (typeof data.stargazers_count !== 'number') {
        return;
      }

      var html = '' +
        '<div class="input-group">' +
          '<div class="input-group-btn"></div>' +
          '<div class="input-group-addon">' +
            '<span>' + data.stargazers_count + '</span>' +
            '&nbsp;' +
            '<span class="fa fa-star"></span>' +
          '</div>' +
        '</div>';

      $('#gh-view-link').wrap(html);
    }
  });

  /**
   * document.documentElement: 'html', for Mozilla Firefox
   * document.body: 'body', for other browsers
   */
  var containers = [
    document.body,
    document.documentElement
  ];

  var $scrollBtn = $('#scroll-top');

  function updateScrollBtnCls() {
    var scrollTop = containers.reduce(function(result, element) {
      return result + element.scrollTop;
    }, 0);

    $scrollBtn.toggleClass('hidden', scrollTop < 100);
  }

  $scrollBtn.on('click', function() {
    window.onscroll = null;

    $(this).addClass('hidden');

    $(containers).animate({
      scrollTop: 0
    }, 500, $.proxy(function() {
      window.onscroll = updateScrollBtnCls;
    }, this));
  });

  window.onscroll = updateScrollBtnCls;

  $('#input-1').data({
    html: true,
    offLabel: '<span class="glyphicon glyphicon-remove">',
    onLabel: '<span class="glyphicon glyphicon-ok">'
  });

  $(':checkbox').checkboxpicker({
    groupCls: 'm-b'
  });

  updateScrollBtnCls();
});
