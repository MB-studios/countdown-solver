var prompt = require('prompt');
var recursiveSolver = require('./scripts/recursiveSolver');

var schema = {
	properties: {
		target: {
			description: 'Enter your target',
			type: 'integer',
			minimum: 1,
			message: 'A target is required and has to be a positive integer',
			required: true,
		},
		number1: {
			description: 'Enter number 1',
			type: 'integer',
			minimum: 1,
			message: 'The number has to be a positive integer',
			required: true,
		},
		number2: {
			description: 'Enter number 2',
			type: 'integer',
			minimum: 1,
			message: 'The number has to be a positive integer',
			required: true,
		},
		number3: {
			description: 'Enter number 3',
			type: 'integer',
			minimum: 1,
			message: 'The number has to be a positive integer',
			required: true,
		},
		number4: {
			description: 'Enter number 4',
			type: 'integer',
			minimum: 1,
			message: 'The number has to be a positive integer',
			required: true,
		},
		number5: {
			description: 'Enter number 5',
			type: 'integer',
			minimum: 1,
			message: 'The number has to be a positive integer',
			required: true,
		},
		number6: {
			description: 'Enter number 6',
			type: 'integer',
			minimum: 1,
			message: 'The number has to be a positive integer',
			required: true,
		},
	},
};

prompt.start();

const run = () => {
	prompt.get(schema, function (err, result) {
		if (err) {
			console.error(err);
		}

		console.log(
			'Searching for target: %d with the numbers: %d, %d, %d, %d, %d, %d',
			result.target,
			result.number1,
			result.number2,
			result.number3,
			result.number4,
			result.number5,
			result.number6
		);

		let solution = recursiveSolver(result.target, [
			result.number1,
			result.number2,
			result.number3,
			result.number4,
			result.number5,
			result.number6,
		]);

		solution ? console.log('Solution found: ' + solution) : console.log('No solution found');

		prompt.get(
			{ properties: { restart: { pattern: /^y(es)?$|^no?$/i, description: 'One more? (y/n)', required: true } } },
			function (err, result) {
				if (err) {
					console.error(err);
				}
				if (result.restart.match(/^y(es)?$/)) {
					run();
				} else {
					process.exit();
				}
			}
		);
	});
};

run();
