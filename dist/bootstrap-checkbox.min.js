/**
 * Bootstrap-checkbox
 * http://vsn4ik.github.io/bootstrap-checkbox
 *
 * Copyright 2013-2014 vsn4ik
 * Licensed under the MIT License
 */

if("undefined"===typeof jQuery)throw Error("Bootstrap-checkbox requires jQuery");
(function(b){var c=function(a,c){this.element=a;this.$element=b(a).hide();this.options=b.extend({},b.fn.checkboxpicker.defaults,c,this.$element.data());this.$buttons=b("<a><a>").addClass("btn").click(this.clicked.bind(this));this.$off=this.$buttons.eq(0).html(this.options.offLabel);this.$on=this.$buttons.eq(1).html(this.options.onLabel);this.$group=b('<div class="btn-group">').append(this.$buttons).keydown(this.keydown.bind(this)).insertAfter(a);this.init()};c.prototype={init:function(){this.element.checked?
this.$on.addClass("active "+this.options.onClass):this.$off.addClass("active "+this.options.offClass);this.$buttons.not(".active").addClass(this.options.defaultClass);this.options.style&&this.$group.addClass(this.options.style);this.element.title?this.$group.attr("title",this.element.title):(this.options.offTitle&&this.$off.attr("title",this.options.offTitle),this.options.onTitle&&this.$on.attr("title",this.options.onTitle));this.element.disabled?this.$buttons.addClass("disabled"):(this.$element.change(this.render.bind(this)),
this.$group.attr("tabindex",0),this.element.autofocus&&this.$group.focus())},render:function(){this.$group.not(":focus").focus();this.$buttons.toggleClass("active "+this.options.defaultClass);this.$off.toggleClass(this.options.offClass);this.$on.toggleClass(this.options.onClass)},change:function(){this.$element.prop("checked",!this.element.checked).change()},clicked:function(a){b(a.target).hasClass("active")||this.change()},keydown:function(a){/^(13|32)$/.test(a.keyCode)&&(a.preventDefault(),this.change())}};
b.fn.checkboxpicker=function(a){return this.each(function(){new c(this,a)})};b.fn.checkboxpicker.defaults={style:!1,defaultClass:"btn-default",offClass:"btn-danger",onClass:"btn-success",offLabel:"No",onLabel:"Yes",offTitle:!1,onTitle:!1}})(jQuery);
