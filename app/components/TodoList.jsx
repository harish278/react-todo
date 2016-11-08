var React = require("react");
var TodoInfo = require("./TodoInfo.jsx")
var AddTodo = require("./AddTodo.jsx");
// var SortTodos = require("./SortTodos.jsx");

module.exports = React.createClass({
   render:function () {
       return(
           <div className="row">
                <div className="col-md-5">
                    <AddTodo />
                </div>
                <div className="col-md-5">
                    <div>
                        {
                            this.props.todos.map(function(s,index){
                                return(
                                    <TodoInfo info={s} key={"todo"+index} />
                                )         
                            })
                        }
                    </div>
                </div>
           </div>
       )
   } 
});