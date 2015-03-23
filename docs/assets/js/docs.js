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

  $('#scroll_top').click(function() {
    this.disabled = true;

    // 'html' for Mozilla Firefox, 'body' for other browsers
    $('body, html').animate({
      scrollTop: 0
    }, 800, function() {
      this.disabled = false;
    }.bind(this));

    this.blur();
  });

  $(':checkbox').checkboxpicker({
    style: 'm-b'
  });
});
