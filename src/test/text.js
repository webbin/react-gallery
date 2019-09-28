


const foo = () => {
	console.log(' I am foo ');
	console.log('foo this = ', this);
	this.count += 1;
};

foo.count = 0;

class Text {
	constructor(props) {

		this.t = 'parent';
	}

	printBind() {
		console.log(' Text print bind ', this.t);
	}

	print() {
		console.log(' Text print ', this.t);
	}


}

class SubText extends Text {
	constructor(props) {
		super(props);

		this.t = 'child';
	}
}


const subText = new SubText();
subText.print();
subText.printBind();


for (let i = 0; i < 10; i += 1) {
	if (i > 5) foo();
}

console.log('foo count = ', foo.count);
