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
	function Checkboxpicker(element, options) {
		this.element = element;
		this.$element = $(element);
		this.options = $.extend({}, $.fn.checkboxpicker.defaults, options, this.$element.data());

		this.$group = $('<div class="btn-group">');

		// .btn-group-justified works with <a> elements as the <button> doesn't pick up the styles
		this.$buttons = $('<a><a>').addClass('btn');

		this.$off = this.$buttons.eq(0);
		this.$on = this.$buttons.eq(1);

		this.init();
	};

	Checkboxpicker.prototype = {
		init: function() {
			this.$element.prop('hidden', true);
			this.$off.html(this.options.offLabel);
			this.$on.html(this.options.onLabel);

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

			// Attribute title (offTitle, onTitle) on this.$buttons not work (native) if this.element.disabled
			if (this.element.title) {
				this.$group.attr('title', this.element.title);
			}
			else if (!this.element.disabled) {
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
				this.$buttons.click(this.clicked.bind(this));
				this.$element.change(this.toggle.bind(this));
				this.$group.attr('tabindex', this.element.tabIndex).keydown(this.keydown.bind(this));

				if (this.element.autofocus) {
					this.$group.focus();
				}

				$(this.element.form).on('reset', this.reset.bind(this));
			}

			this.$group.append(this.$buttons).insertAfter(this.element);
		},
		toggle: function() {
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
		},
		reset: function() {
			if ((this.element.defaultChecked && this.$off.hasClass('active')) || (!this.element.defaultChecked && this.$on.hasClass('active'))) {
				this.toggle();
			}
		}
	};

	$.fn.checkboxpicker = function(options) {
		return this.each(function() {
			var $this = $(this);
			var data = $this.data('checkboxpicker');

			if (!data) {
				new Checkboxpicker(this, options);

				$this.data('checkboxpicker', true);
			}
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
