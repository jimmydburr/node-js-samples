function wrapElements(a) {
  var result = [];
  for (var i = 0, n = a.length; i < n; i++) {
    (function() {
      j = i;
      result[i] = function() { return a[j]; };
    })();
  }
  return result;
}

var wrapped = wrapElements ([10,20,30,40,50]);
var f = wrapped[0];
f();
