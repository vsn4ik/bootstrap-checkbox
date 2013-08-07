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
			.addClass('btn').attr('type', 'button').prop('disabled', element.disabled)
			.click(this.clicked.bind(this));

		this.$on = this.$buttons.eq(0).text(this.options.on);
		this.$off = this.$buttons.eq(1).text(this.options.off);

		this.render();

		$(element).hide().change(this.render.bind(this));
		$('<div class="btn-group">').append(this.$buttons).insertAfter(element);
	};

	Checkboxpicker.prototype = {
		clicked: function(event) {
			if ($(event.target).hasClass('active')) {
				return;
			}

			$(this.element).prop('checked', !this.element.checked).change();
		},
		render: function() {
			this.$buttons.removeClass('active ' + this.options.onClass + ' ' + this.options.offClass);

			if (this.element.checked) {
				this.$on.addClass('active ' + this.options.onClass);
			}
			else {
				this.$off.addClass('active ' + this.options.offClass);
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
