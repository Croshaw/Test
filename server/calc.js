module.exports = {
	calc,
};

const operations = ["*", "/", "+", "-"];

function compute(first, second, action) {
	switch (action) {
		case "*":
			return first * second;
		case "+":
			return first + second;
		case "/":
			return first / second;
		case "-":
			return first - second;
	}
}

function infixToPostfix(expression) {
	const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
	const operators = [];
	const output = [];

	// Функция для проверки, является ли токен оператором
	function isOperator(token) {
		return operations.includes(token);
	}

	// Функция для задания приоритета операторов
	function precedenceOf(op) {
		return precedence[op] || 0;
	}

	// Парсинг чисел и операторов
	const tokens = expression.match(/(\d+|\+|\-|\*|\/|\(|\))/g);

	tokens.forEach(token => {
		if (!isNaN(token)) {
			// Если токен — число
			output.push(Number(token));
		} else if (isOperator(token)) {
			// Если токен — оператор
			while (
				operators.length &&
				isOperator(operators[operators.length - 1]) &&
				precedenceOf(operators[operators.length - 1]) >= precedenceOf(token)
			) {
				output.push(operators.pop());
			}
			operators.push(token);
		} else if (token === "(") {
			// Если токен — открывающая скобка
			operators.push(token);
		} else if (token === ")") {
			// Если токен — закрывающая скобка
			while (operators.length && operators[operators.length - 1] !== "(") {
				output.push(operators.pop());
			}
			operators.pop(); // Удаляем открывающую скобку
		}
	});

	// Добавляем оставшиеся операторы из стека
	while (operators.length) {
		output.push(operators.pop());
	}

	return output;
}

async function calc(expression) {
	const postfix = infixToPostfix(expression);
	const actions = [];
	postfix.forEach(element => {
		if (operations.includes(element)) {
			const second = actions.pop();
			const first = actions.pop();
			actions.push(compute(first, second, element));
		} else {
			actions.push(element);
		}
	});
	return actions.pop();
}
