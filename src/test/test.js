const x = {};
Object.defineProperty(x, 'size', {
	value: 99,
	writable: true,
	enumerable: false,
	configurable: true,
});

Object.defineProperty(x, 'age', {
	value: 11,
	writable: false,
	enumerable: true,
	configurable: false,
});

x.size = 0;
x.age = 9;
console.log(Object.keys(x));
console.log(x.hasOwnProperty('size'));
console.log('aged' in x);
console.log(Object.getOwnPropertyNames(x));
