'use strict';

document.addEventListener('DOMContentLoaded', function() {
  fetch('https://api.github.com/repos/vsn4ik/bootstrap-checkbox')
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      // XSS check
      if (typeof response.stargazers_count !== 'number') {
        return;
      }

      var html = '' +
        '<div class="input-group">' +
          '<div class="input-group-prepend"></div>' +
          '<div class="input-group-append">' +
            '<span class="input-group-text bg-white">' +
              response.stargazers_count +
              '&nbsp;' +
              '<span class="fas fa-star"></span>' +
            '</span>' +
          '</div>' +
        '</div>';

      $('#gh-view-link').wrap(html);
    });

  function handleScroll() {
    document.querySelector('.js-scroll-top').hidden = window.pageYOffset < 100;
  }

  window.onscroll = handleScroll;

  handleScroll();

  $('#input-1').data({
    html: true,
    offLabel: '<span class="fas fa-minus-square">',
    onLabel: '<span class="fas fa-plus-square">'
  });

  $(':checkbox').checkboxpicker({
    offCls: 'btn-outline-danger',
    onCls: 'btn-outline-success',
    iconCls: 'fas',
    groupCls: 'mb-2'
  });
});
