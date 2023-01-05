const tidyUpEquation = (eq) => {
	const negativeReverse = /\-(\(\d+(([\+\-]\d+)+)+\))/;
	const addition = /(?<![\-\*\/])((\()\d+([\+\-\*\/]+\d+)+\))(?![\*\/])/;
	const mutliplicationAndDivision = /(\(\d+([*/]\d+)+\))/;
	let done = false;

	// Iterates over the solution untill no more unneccesary parantheses are found
	while (!done) {
		if (eq.match(negativeReverse)) {
			// When we find a minus sign followed by a pair of parantheses containing just plus and minus signs, we remove the parantheses and negate the operators inside the parantheses
			let match = eq.match(negativeReverse)[1].slice(1, -1);
			match = match.replaceAll('+', 't').replaceAll('-', '+').replaceAll('t', '-');
			eq = eq.replace(negativeReverse, '-' + match);
		} else if (eq.match(addition)) {
			// when we find a plus sign or a left parantesis followed by a pair of parantheses we can remove the parantheses no mather what operators are inside the parantheses
			let match = eq.match(addition)[0].slice(1, -1);
			eq = eq.replace(addition, match);
		} else if (eq.match(mutliplicationAndDivision)) {
			// When we find parantheses containing only multiplication and division we can remove the parantheses
			let match = eq.match(mutliplicationAndDivision)[0].slice(1, -1);
			eq = eq.replace(mutliplicationAndDivision, match);
		} else if (eq[0] === '(' && eq[eq.length - 1] === ')') {
			// Finally we check if the equation is still surounded by parantheses, when that is the case we check if the outer most paranteses belong together and if that is the case we remove them
			let i = 1;
			let counter = 1;

			while (i < eq.length - 1 && counter !== 0) {
				if (eq[i] === '(') {
					counter++;
				} else if (eq[i] === ')') {
					counter--;
				}
				i++;
			}
			if (i !== eq.length - 1) {
				return eq;
			}
			eq = eq.slice(1, -1);
		} else {
			done = true;
		}
	}
	return eq;
};

module.exports = tidyUpEquation;
