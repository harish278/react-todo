var dispatcher = require("../dispatcher");

module.exports = {
    addTodo:function (todo) {
        dispatcher.dispatch({
           todo:todo,
           type:"todo:addTodo" 
        });
    },
    deleteTodo:function (todo) {
        dispatcher.dispatch({
           todo:todo,
           type:"todo:deleteTodo" 
        });
    },
    editTodo:function (todo) {
        console.log("inside dispatcher edit");
        dispatcher.dispatch({
            todo:todo,
            type:"todo:editTodo"
        })
    }
}