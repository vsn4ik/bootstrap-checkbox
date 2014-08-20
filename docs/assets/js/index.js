'use strict';

$(function() {
	$(':checkbox').checkboxpicker({
		style: 'm-b'
	});

	$('#scroll_top').click(function() {
		// 'html' for Mozilla Firefox, 'body' for other browsers
		$('body, html').animate({
			scrollTop: 0
		}, 800);

		this.blur();
	});
});
