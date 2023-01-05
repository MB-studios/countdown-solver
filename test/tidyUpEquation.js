const chai = require('chai');
const expect = chai.expect;
const tidyUpEquation = require('../scripts/tidyUpEquation');

describe('Remove addition parenthesis', () => {
	it('Simple addition', () => {
		let tidy = tidyUpEquation('(9+4)');
		expect(tidy).to.equal('9+4');
	});
	it('Simple subtraction', () => {
		let tidy = tidyUpEquation('(9-4)');
		expect(tidy).to.equal('9-4');
	});
	it('Multiple', () => {
		let tidy = tidyUpEquation('(5+(9-4))');
		expect(tidy).to.equal('5+9-4');
	});
	it('Multiplication before', () => {
		let tidy = tidyUpEquation('(5*(9-4))');
		expect(tidy).to.equal('5*(9-4)');
	});
});

describe('Inverse negative paranthesises', () => {
	it('Simple eqution positive', () => {
		let tidy = tidyUpEquation('-(9+4)');
		expect(tidy).to.equal('-9-4');
	});
	it('Simple eqution negative', () => {
		let tidy = tidyUpEquation('-(9-4)');
		expect(tidy).to.equal('-9+4');
	});
	it('Multiple', () => {
		let tidy = tidyUpEquation('10-(5+3)-(9-4)');
		expect(tidy).to.equal('10-5-3-9+4');
	});
	it('Nested', () => {
		let tidy = tidyUpEquation('10-(5-(9-4)-(4+2))');
		expect(tidy).to.equal('10-5+9-4+4+2');
	});
});

describe('Multiple test', () => {
	it('Addition and outer', () => {
		let tidy = tidyUpEquation('((((50+25)-9)*(10+4))+6)');
		expect(tidy).to.equal('((50+25-9)*(10+4))+6');
	});

	it('Inner and outer', () => {
		let tidy = tidyUpEquation('((5+(4+2))*(5-(4+2)))');
		expect(tidy).to.equal('(5+4+2)*(5-4-2)');
	});
});
