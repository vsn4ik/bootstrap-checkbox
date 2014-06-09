/**
 * Bootstrap-checkbox
 * http://vsn4ik.github.io/bootstrap-checkbox
 *
 * Copyright 2013-2014 vsn4ik
 * Licensed under the MIT License
 */

'use strict';

if (typeof jQuery === 'undefined') {
	throw new Error('Bootstrap-checkbox requires jQuery');
}

(function($) {
	var Checkboxpicker = function(element, options) {
		this.element = element;

		// Change .prop('hidden', true) -> .hide() in future
		this.$element = $(element).prop('hidden', true);

		this.options = $.extend({}, $.fn.checkboxpicker.defaults, options, this.$element.data());

		// .btn-group-justified works with <label> elements as the <button> doesn't pick up the styles
		this.$buttons = $('<label></label><label></label>').addClass('btn').click(this.clicked.bind(this));

		this.$off = this.$buttons.eq(0).html(this.options.offLabel);
		this.$on = this.$buttons.eq(1).html(this.options.onLabel);

		this.$group = $('<div class="btn-group"></div>')
			.append(this.$buttons)
			.keydown(this.keydown.bind(this))
			.insertAfter(element);

		this.init();
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

			if (this.options.style) {
				this.$group.addClass(this.options.style);
			}

			if (this.element.title) {
				this.$group.attr('title', this.element.title);
			}
			else {
				if (this.options.offTitle) {
					this.$off.attr('title', this.options.offTitle);
				}

				if (this.options.onTitle) {
					this.$on.attr('title', this.options.onTitle);
				}
			}

			if (this.element.disabled) {
				this.$buttons.addClass('disabled');
				this.$group.css('cursor', 'not-allowed');
			}
			else {
				this.$element.change(this.render.bind(this));

				this.$group.attr('tabindex', 0);

				if (this.element.autofocus) {
					this.$group.focus();
				}
			}
		},
		render: function() {
			this.$group.not(':focus').focus();
			this.$buttons.toggleClass('active ' + this.options.defaultClass);
			this.$off.toggleClass(this.options.offClass);
			this.$on.toggleClass(this.options.onClass);
		},
		change: function() {
			this.$element.prop('checked', !this.element.checked).change();
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
		style: false,
		defaultClass: 'btn-default',
		offClass: 'btn-danger',
		onClass: 'btn-success',
		offLabel: 'No',
		onLabel: 'Yes',
		offTitle: false,
		onTitle: false
	};
})(jQuery);
