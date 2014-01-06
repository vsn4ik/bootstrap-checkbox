/**
 * Bootstrap-checkbox
 * http://vsn4ik.github.io/bootstrap-checkbox
 *
 * Copyright (c) 2014 vsn4ik
 * Licensed under the MIT License
 */

if (typeof jQuery === 'undefined') {
	throw new Error('Bootstrap-checkbox requires jQuery');
}

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

		this.$on = this.$buttons.eq(0).html(this.options.onLabel);
		this.$off = this.$buttons.eq(1).html(this.options.offLabel);

		this.init();

		$(element).hide().change(this.render.bind(this));

		this.$group = $('<div class="btn-group">')
			.append(this.$buttons)
			.insertAfter(element)
			.keydown(this.keydown.bind(this));

		if (element.title) {
			this.$group.attr('title', element.title);
		}
		else {
			if (this.options.onTitle) {
				this.$on.attr('title', this.options.onTitle);
			}

			if (this.options.offTitle) {
				this.$off.attr('title', this.options.offTitle);
			}
		}

		if (!element.disabled) {
			this.$group.attr('tabindex', 0);
		}
	};

	Checkboxpicker.prototype = {
		init: function() {
			if (this.element.checked) {
				this.$on.addClass('active ' + this.options.onClass);
			}
			else {
				this.$off.addClass('active ' + this.options.offClass);
			}

			this.$buttons.not('.active').addClass(this.options.defaultClass);
		},
		render: function() {
			this.$group.not(':focus').focus();
			this.$buttons.toggleClass('active ' + this.options.defaultClass);
			this.$on.toggleClass(this.options.onClass);
			this.$off.toggleClass(this.options.offClass);
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
			// 13: Return, 32: Spacebar
			if (/^(13|32)$/.test(event.keyCode)) {
				// Off scroll on press "Spacebar"
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

	// HTML5 data-*.
	// <input data-on-label="43"> --> $('input').data('onLabel') == '43'.
	$.fn.checkboxpicker.defaults = {
		defaultClass: 'btn-default',
		onClass: 'btn-success',
		offClass: 'btn-danger',
		onLabel: 'Yes',
		offLabel: 'No',
		onTitle: false,
		offTitle: false
	};
})(jQuery);
