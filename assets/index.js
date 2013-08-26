$(document).ready(function() {
	// Запрещаем вызов контекстного меню
	window.oncontextmenu = function() {
		return false;
	};

	// Запрещаем перемещение ссылок, картинок, ...
	window.ondragstart = function(event) {
		if ($.inArray(event.target.nodeName, ['INPUT', 'TEXTAREA']) == -1) {
			return false;
		}
	};

	$(':checkbox').checkboxpicker();
});
