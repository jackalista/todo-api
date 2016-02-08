var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

//sequelize.sync({force: true})...

sequelize.sync({
	force: true
}).then(function() {
	console.log('everything is synced');

	Todo.create({
		description: 'wake up the kids'
	}).then(function(todo) {
		return Todo.create({
			description: 'make dinner'
		});
	}).then(function() {
		return Todo.create({
			description: 'relax :)'
		});
	}).then(function() {
		//return Todo.findById(1)
		return Todo.findAll({
			where: {
				description: {
					$like: '%ake%'
				}
			}
		});
	}).then(function (todos) {
		if (todos) {
			console.log('here comes todo.toJSON()');
			console.log();
			var i = 1;
			todos.forEach(function(todo) {
				console.log('item: ' + i);
				console.log(todo.toJSON());
				i++
			});
		} else {
			console.log('no todos found!?!?');
		}
	}).catch(function(e) {
		console.log(e);
	});
});

// -=j=-: stuff chopped out of the GET /todos&completed=[true|false]&q=[search terms]

	// var filteredTodos = todos;
	// var validAttributes = {};

	// // if has property and completed === 'true'
	// if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
	// 	validAttributes.completed = true;
	// 	filteredTodos = _.where(filteredTodos, validAttributes);
	// } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
	// 	validAttributes.completed = false;
	// 	filteredTodos = _.where(filteredTodos, validAttributes);
	// } else if (typeof queryParams.completed !== 'undefined') {
	// 	return res.status(400).json({
	// 		"error": "invalid data submitted"
	// 	});
	// }

	// if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
	// 	filteredTodos = _.filter(filteredTodos, function(todo) {
	// 		return todo.description.toLowerCase().indexOf(queryParams.q) > -1;
	// 	});
	// }

	// res.json(filteredTodos);

// some further scrap from the PUT /todos/:id call from before I realized I didn't need to
// exlpicitly pop and item off the array and replace it but could modify the existing item 
// while still in the array

	// -=j=-: all this stuff is unnecessary as foundTodo is still in the list
	// and is updated inline so no need to pull the old one off and replace, we
	// just update the existing object in place in the list (pass by reference)
	//
	// todos = _.without(todos, foundTodo);
	// body.id = todoId;
	// todos.push(body);
	// res.json(body);
