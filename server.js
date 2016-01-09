var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'go to noahs bagels',
	completed: false
}, {
	id: 2,
	description: 'go to whole foods',
	completed: false
}, {
	id: 3,
	description: 'pick up kids',
	completed: true
}];

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

// GET /todos
app.get('/todos', function (req, res) {
	res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function (req, res) {
	var foundTodo;
	var todoId = parseInt(req.params.id, 10);
	todos.forEach(function (todo) {
		if(todoId === todo.id) {
			foundTodo = todo;
		}
	});
	if(foundTodo) {
		res.json(foundTodo);
	} else {
		res.status(404).send();
	}
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});
