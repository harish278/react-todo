var dispatcher = require("../dispatcher");
var uuid = require("node-uuid");
var q = require("q");

function TodoStore () {
    var listeners = [];
    var todos = [];
    // var todos = [
    //     {
    //         "id": uuid.v4(),
    //         "title": "First todo default",
    //         "desc": "This is my first to do",
    //         "dueDate": "04-11-2016",
    //         "created": new Date().toISOString()
    //     },
    //     {
    //         "id": uuid.v4(),
    //         "title": "Second todo default",
    //         "desc": "This is my second to do",
    //         "dueDate": "05-11-2016",
    //         "created": new Date().toISOString()
    //     }
    // ];

    function getTodos () {
        var defer = q.defer();
        $.ajax({
            url: 'http://localhost:7777/getTodos',
            dataType: "json",
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            async: false,
            processData: false,
            cache: false,
            success: function (todosList) {
                console.log(JSON.stringify(todosList));
                defer.resolve(todosList);
            },
            error: function (xhr) {
                defer.reject();
                console.log("some error");
            }
        });
        return defer.promise;
    };

    function onChange (listener) {
        listeners.push(listener);
    };

    function addTodo (todo) {
        todo.id = uuid.v4();
        todo.created = new Date().toISOString();
        console.log(todo);
        $.ajax({
            url: 'http://localhost:7777/postTodo',
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(todo),
            success: function (data) {
                triggerListeners();
                console.log(data);
            },
            error: function (xhr) {
                alert('error');
            }
        });
    };

    function deleteTodo (todo) {
        $.ajax({
            url: 'http://localhost:7777/deleteTodo/' + todo.id,
            type: "DELETE",
            async: false,
            processData: false,
            cache: false,
            success: function (message) {
                triggerListeners();
                console.log(message);
            },
            error: function (xhr) {
                alert('error in delete');
            }
        });
    };

    function editTodo(todo) {
        $.ajax({
            url: 'http://localhost:7777/updateTodo',
            type: "PUT",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(todo),
            async: false,
            processData: false,
            cache: false,
            success: function (message) {
                triggerListeners();
                console.log(message);
            },
            error: function (xhr) {
                alert('error in put');
            }
        });
    };

    function triggerListeners () {
        listeners.forEach(function (listener) {
            getTodos().then(function (todos) {
                listener(todos);
            })
        });
    };

    dispatcher.register(function (payload) {
        var split = payload.type.split(":");
        if (split[0] === "todo") {
            switch (split[1]) {
                case "addTodo":
                    addTodo(payload.todo);
                    break;
                case "deleteTodo":
                    deleteTodo(payload.todo);
                    break;
                case "editTodo":
                    editTodo(payload.todo);
                    break;
            }
        }
    });

    return {
        getTodos: getTodos,
        onChange: onChange
    }
}

module.exports = TodoStore();