var express = require("express");
var path = require("path");

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,"./app/dist")));
var todos = [];

app.post('/postTodo', function (req, res) {
    console.log(req.body);
    todos.push(req.body);
    var message = "added new todo " + req.body;
    res.send(message);
});

app.get('/getTodos', function (req, res) {
    res.send(todos);
});

app.put('/updateTodo', function (req, res) {
    var _index;
    todos.map(function (s, index) {
        if (s.id === req.body.id) {
            _index = index;
        }
    });
    todos[_index].title = req.body.title;
    todos[_index].desc = req.body.desc;
    todos[_index].dueDate = req.body.dueDate;
    var message = "updated todo " + JSON.stringify(todos[_index]);
    console.log(message);
    res.send(message);
});

app.delete('/deleteTodo/:id', function (req, res) {
    var _index;
    todos.map(function (s, index) {
        if (s.id === req.params.id) {
            _index = index;
        }
    });
    var message = "deleted todo " + JSON.stringify(todos[_index]);
    todos.splice(_index, 1);
    console.log(message);
    res.send(message);
});

app.listen(7777,function(){
    console.log("Started listening on port", 7777);
})