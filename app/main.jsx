var React = require("react");
var ReactDOM = require("react-dom");
var TodoList = require("./components/TodoList.jsx");
var todoListStore = require("./stores/todoListStore.jsx");
var _todos;
todoListStore.getTodos().then(function (todos) {
    _todos = todos;
    console.log("main jsx todos ", _todos);
    render();
});

todoListStore.onChange(function (todos) {
    _todos = todos;
    render();
});

function render () {
    ReactDOM.render(<TodoList todos={_todos} />, document.getElementById("container"));    
}