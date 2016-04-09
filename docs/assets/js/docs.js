// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

'use strict';

$(function() {
  $.ajax({
    url: 'https://api.github.com/repos/vsn4ik/bootstrap-checkbox',
    success: function(data) {
      // XSS check
      if (typeof data.stargazers_count != 'number') {
        return;
      }

      var $group = $('<div class="input-group"><span class="input-group-btn"></span></div>');

      $group.append('<span class="input-group-addon">' + data.stargazers_count + '&nbsp;<span class="octicon octicon-star"></span></span>');

      $('#gh-view-link').wrap($group);
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

    // 'html' for Mozilla Firefox, 'body' for other browsers
    $(containers).animate({
      scrollTop: 0
    }, 800, $.proxy(function() {
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
  hljs.initHighlighting();
});
