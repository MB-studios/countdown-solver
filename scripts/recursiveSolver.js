const tidyUpEquation = require('./tidyUpEquation');
const operations = ['+', '-', '*', '/'];
const operationsLength = operations.length;

const recursiveSolver = (target, numbers) => {
	// Sort all numbers descending so that we dont have to care about getting negative numbers from subtraction or dividing smaller numbers with bigger
	numbers = numbers.sort((a, b) => eval(b) - eval(a));

	// Calculate all values from the numbers array wich can contain equations aswell as numbers
	let evalNumbers = numbers.map((n) => eval(n));
	let arraySize = evalNumbers.length;

	// If our calculated array contains the target, return the matching equation
	if (evalNumbers.includes(target)) {
		return numbers[evalNumbers.indexOf(target)];

		// When the size of the array is 1 we have reached the end of this possible and as we haven't got the target we return false in order to try another soluition
	} else if (arraySize === 1) {
		return false;
	} else {
		// Iterate over each combination of operators and numbers that are still unused
		for (let operator = 0; operator < operationsLength; operator++) {
			for (let left = 0; left < arraySize - 1; left++) {
				for (let right = left + 1; right < arraySize; right++) {
					// If the result from the division is not an integer the solution is not allowed by the game rules
					if (operations[operator] === '/' && evalNumbers[left] % evalNumbers[right] !== 0) {
						return false;
					}

					// Copy the array of numbers and equations, then splice out the two we are currently testing
					let splicedNumbers = Array.from(numbers);
					let rightParam = splicedNumbers.splice(right, 1)[0];
					let leftParam = splicedNumbers.splice(left, 1)[0];

					// Push the two selected numbers combined with the operator we are curently testing surounded by parantheses in order to not mess up already added equations
					splicedNumbers.push('(' + leftParam + operations[operator] + rightParam + ')');

					// Check if our test combination contains the solution further along
					let solution = recursiveSolver(target, splicedNumbers);
					if (solution !== false) {
						// If the solution is found, send it for cleanup to remove all unneccesary paranthesis
						return tidyUpEquation(solution);
					}
				}
			}
		}
	}
	return false;
};

module.exports = recursiveSolver;
