const chai = require('chai');
const expect = chai.expect;
const recursiveSolver = require('../scripts/recursiveSolver');

describe('Single step solutions', () => {
	it('Addition', () => {
		let solution = recursiveSolver(34, [25, 9]);
		expect(solution).to.equal('25+9');
	});
	it('Subtraction', () => {
		let solution = recursiveSolver(16, [25, 9]);
		expect(solution).to.equal('25-9');
	});
	it('Subtraction reverse order', () => {
		let solution = recursiveSolver(16, [9, 25]);
		expect(solution).to.equal('25-9');
	});
	it('Multiplication', () => {
		let solution = recursiveSolver(125, [25, 5]);
		expect(solution).to.equal('25*5');
	});
	it('Division', () => {
		let solution = recursiveSolver(4, [100, 25]);
		expect(solution).to.equal('100/25');
	});
	it('Division reverse order', () => {
		let solution = recursiveSolver(4, [25, 100]);
		expect(solution).to.equal('100/25');
	});
	it('No solution', () => {
		let solution = recursiveSolver(5, [25, 100]);
		expect(solution).to.equal(false);
	});
});

describe('Single step solutions with unnecessary numbers', () => {
	it('Addition', () => {
		let solution = recursiveSolver(14, [25, 10, 5, 50, 75, 9]);
		expect(solution).to.equal('9+5');
	});
	it('Subtraction', () => {
		let solution = recursiveSolver(4, [25, 10, 5, 50, 75, 9]);
		expect(solution).to.equal('9-5');
	});
	it('Multiplication', () => {
		let solution = recursiveSolver(45, [100, 10, 3, 5, 75, 9]);
		expect(solution).to.equal('9*5');
	});

	it('Division', () => {
		let solution = recursiveSolver(2, [25, 10, 5, 100, 75, 9]);
		expect(solution).to.equal('10/5');
	});

	it('No solution', () => {
		let solution = recursiveSolver(645, [25, 25, 2, 75, 2, 4]);
		expect(solution).to.equal(false);
	});
});

describe('Multiple steps solutions with unnecessary numbers', () => {
	it('Addition only', () => {
		let solution = recursiveSolver(24, [25, 10, 5, 50, 75, 9]);
		expect(solution).to.equal('10+9+5');
	});

	it('Addition and Subtraction', () => {
		let solution = recursiveSolver(136, [25, 2, 5, 50, 75, 9]);
		expect(solution).to.equal('75+50+25-9-5');
	});

	it('Multiplication', () => {
		let solution = recursiveSolver(950, [25, 10, 5, 10, 75, 9]);
		expect(solution).to.equal('(75+25+5-10)*10');
	});

	it('Division', () => {
		let solution = recursiveSolver(30, [25, 10, 4, 100, 75, 9]);
		expect(solution).to.equal('((100+75+25)/(9-4))-10');
	});

	it('No solution', () => {
		let solution = recursiveSolver(991, [75, 10, 2, 100, 50, 2]);
		expect(solution).to.equal(false);
	});
});

describe('Real ones', () => {
	it('952', () => {
		let solution = recursiveSolver(952, [25, 50, 75, 100, 3, 6]);
		expect(solution).to.equal('((((100+6)*75)*3)-50)/25');
	});

	it('813', () => {
		let solution = recursiveSolver(813, [25, 50, 75, 100, 1, 10]);
		expect(solution).to.equal('((((75-10)*25)+1)*50)/100');
	});

	it('930', () => {
		let solution = recursiveSolver(930, [25, 50, 9, 6, 4, 10]);
		expect(solution).to.equal('((50+25-9)*(10+4))+6');
	});

	it('331', () => {
		let solution = recursiveSolver(331, [9, 6, 75, 100, 25, 50]);
		expect(solution).to.equal('(((100+75)*9)+6)-50*25');
	});
	it('123', () => {
		let solution = recursiveSolver(123, [3, 1, 6, 7, 25, 75]);
		expect(solution).to.equal('75+25-1+(6*(7-3))');
	});
});
