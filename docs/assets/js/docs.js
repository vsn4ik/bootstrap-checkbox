'use strict';

var exec = function() {
  fetch('https://api.github.com/repos/vsn4ik/bootstrap-checkbox')
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      // XSS check
      if (typeof response.stargazers_count !== 'number') {
        return;
      }

      document.querySelector('.js-stargazers-count').style.setProperty('--stargazers', response.stargazers_count);
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
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', exec);
} else {
  exec();
}
