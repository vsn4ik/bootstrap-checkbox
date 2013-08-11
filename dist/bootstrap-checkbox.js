/**
 * Bootstrap-checkbox
 * http://vsn4ik.github.io/bootstrap-checkbox
 *
 * Copyright (c) 2013 vsn4ik
 * Licensed under the MIT License
 */
(function($) {
	'use strict';

	var Checkboxpicker = function(element, options) {
		this.element = element;
		this.options = $.extend({}, $.fn.checkboxpicker.defaults, options, $(element).data());

		this.$buttons = $('<button><button>')
			.addClass('btn')
			.attr({ type: 'button', tabindex: -1 })
			.prop('disabled', element.disabled)
			.click(this.clicked.bind(this));

		this.$on = this.$buttons.eq(0).text(this.options.on);
		this.$off = this.$buttons.eq(1).text(this.options.off);

		this.render();

		$(element).hide().change(this.render.bind(this));

		$('<div class="btn-group" tabindex="0">')
			.append(this.$buttons)
			.insertAfter(element)
			.keydown(this.keydown.bind(this));
	};

	Checkboxpicker.prototype = {
		render: function() {
			this.$buttons.removeClass('active btn-default ' + this.options.onClass + ' ' + this.options.offClass);

			if (this.element.checked) {
				this.$on.addClass('active ' + this.options.onClass);
			}
			else {
				this.$off.addClass('active ' + this.options.offClass);
			}

			this.$buttons.not('.active').addClass('btn-default');
		},
		change: function() {
			$(this.element).prop('checked', !this.element.checked).change();
		},
		clicked: function(event) {
			if (!$(event.target).hasClass('active')) {
				this.change();
			}
		},
		keydown: function(event) {
			// Buttons: Space, Enter
			if (/(13|32)/.test(event.keyCode)) {
				// Off scroll on press space button
				event.preventDefault();

				this.change();
			}
		}
	};

	$.fn.checkboxpicker = function(options) {
		return this.each(function() {
			new Checkboxpicker(this, options);
		});
	};

	$.fn.checkboxpicker.defaults = {
		on: 'Yes',
		off: 'No',
		onClass: 'btn-success',
		offClass: 'btn-danger'
	};
})(window.jQuery);
