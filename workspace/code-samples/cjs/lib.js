exports.sqrt = Math.sqrt;
exports.square = function square(x) {
	return x * x;
}
exports.diag = function diag(x, y) {
	return sqrt(square(x) + square(y));
}
