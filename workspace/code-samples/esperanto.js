(function (factory) {
	!(typeof exports === 'object' && typeof module !== 'undefined') &&
	typeof define === 'function' && define.amd ? define(factory) :
	factory()
}(function () { 'use strict';

	const sqrt = Math.sqrt;
	function square(x) {
		return x * x;
	}
	function diag(x, y) {
		return sqrt(square(x) + square(y));
	}

	console.log(square(11)); // 121
	console.log(diag(4, 3)); // 5

}));