var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('Todo API Root');
});

// GET /todos?completed=true&q=kick
app.get('/todos', function(req, res) {
	var queryParams = req.query;
	var filteredTodos = todos;
	var validAttributes = {};

	// if has property and completed === 'true'
	if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
		validAttributes.completed = true;
		filteredTodos = _.where(filteredTodos, validAttributes);
	} else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
		validAttributes.completed = false;
		filteredTodos = _.where(filteredTodos, validAttributes);
	} else if (typeof queryParams.completed !== 'undefined') {
		return res.status(400).json({
			"error": "invalid data submitted"
		});
	}

	if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
		filteredTodos = _.filter(filteredTodos, function(todo) {
			return todo.description.toLowerCase().indexOf(queryParams.q) > -1;
		});
	}

	res.json(filteredTodos);
});

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	db.todo.findById(todoId).then(function (todo) {
		if (!!todo) {
			res.json(todo.toJSON());
		} else {
			res.status(404).send();
		}
	}, function (e) {
		res.status(500).json(e);
	});
});

// POST /todos
app.post('/todos', function(req, res) {
	// list valid fields we want to keep
	var body = _.pick(req.body, 'description', 'completed');

	body.description = body.description.trim();
	db.todo.create(body).then(function(todo) {
		res.json(todo.toJSON());
	}, function(e) {
		res.status(400).json(e);
	});
});

// PUT /todos/:id
app.put('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var foundTodo = _.findWhere(todos, {
		id: todoId
	});
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};

	if (!foundTodo) {
		return res.status(404).json({
			"error": "no todo found with that id: (" + todoId + ")"
		});
	}

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).json({
			"error": "invalid data for completed property"
		});
	}

	if (body.hasOwnProperty('description') && _.isString(body.description) &&
		body.description.trim().length > 0) {
		validAttributes.description = body.description;
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).json({
			"error": "invalid data for description property"
		});
	}

	_.extend(foundTodo, validAttributes);
	res.json(foundTodo);

	// -=j=-: all this stuff is unnecessary as foundTodo is still in the list
	// and is updated inline so no need to pull the old one off and replace, we
	// just update the existing object in place in the list (pass by reference)
	//
	// todos = _.without(todos, foundTodo);
	// body.id = todoId;
	// todos.push(body);
	// res.json(body);
});

// DELETE /todos/:id
app.delete('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var foundTodo = _.findWhere(todos, {
		id: todoId
	});

	if (foundTodo) {
		todos = _.without(todos, foundTodo);
		res.json(foundTodo);
	} else {
		res.status(404).json({
			"error": "no todo found with that id"
		});
	}
});

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});