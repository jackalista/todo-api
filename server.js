var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'go to costco',
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

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + '!');
});
