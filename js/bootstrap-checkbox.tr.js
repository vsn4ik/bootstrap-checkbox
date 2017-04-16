'use strict';

if (typeof jQuery === 'undefined') {
	throw new Error('Bootstrap-checkbox için jQuery kurulması gerekir.');
}

(function($) {
	function Checkboxpicker(element, options) {
		this.element = element;
		this.$element = $(element);

		if (this.$element.closest('label').length) {
			console.warn('Lütfen label elementi içerisinde bootstrap-checkbox kullanmayınız.');
			return;
		}

		this.options = $.extend({}, $.fn.checkboxpicker.defaults, options, this.$element.data());

		this.$group = $('<div class="btn-group">');

		// .btn-group-justified works with <a> elements as the <button> doesn't pick up the styles
		this.$buttons = $('<a><a>').addClass('btn');

		// === '': <... data-reverse>
		var reverse = this.options.reverse || this.options.reverse === '';

		this.$off = this.$buttons.eq(reverse ? 1 : 0);
		this.$on = this.$buttons.eq(reverse ? 0 : 1);

		this.init();
	}

	Checkboxpicker.prototype = {
		init: function() {
			this.$element.prop('hidden', true);

			if (this.options.offLabel) {
				this.$off.html(this.options.offLabel);
			}

			if (this.options.onLabel) {
				this.$on.html(this.options.onLabel);
			}

			if (this.options.offIconClass) {
				this.$off.prepend('<span class="' + this.options.offIconClass + '"></span>');
			}

			if (this.options.onIconClass) {
				this.$on.prepend('<span class="' + this.options.onIconClass + '"></span>');
			}

			if (this.element.checked) {
				this.$on.addClass('active ' + this.options.onClass);
				this.$off.addClass(this.options.defaultClass);
			}
			else {
				this.$off.addClass('active ' + this.options.offClass);
				this.$on.addClass(this.options.defaultClass);
			}

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

				if (this.element.id) {
					$('label[for="' + this.element.id + '"]').click(this.focus.bind(this));
				}

				$(this.element.form).on('reset', this.reset.bind(this));
			}

			this.$group.append(this.$buttons).insertAfter(this.element);
		},
		toggle: function() {
			// this.$group not focus (incorrect on form reset)
			this.$buttons.toggleClass('active ' + this.options.defaultClass);
			this.$off.toggleClass(this.options.offClass);
			this.$on.toggleClass(this.options.onClass);
		},
		focus: function() {
			// Original behavior
			this.$group.focus();
		},
		change: function() {
			this.$element.prop('checked', !this.element.checked).change();
		},
		clicked: function() {
			if (!$(event.target).hasClass('active')) {
				this.change();
			}
		},
		keydown: function() {
			// 13: Return, 32: Spacebar
			if (/^(13|32)$/.test(event.keyCode)) {
				// Off scroll on press "Spacebar"
				event.preventDefault();

				this.change();
			}
		},
		reset: function() {
			// this.element.checked not used (incorect on large number of form elements)
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
		offLabel: 'Pasif',
		onLabel: 'Aktif',
		offTitle: false,
		onTitle: false
	};
})(jQuery);

