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