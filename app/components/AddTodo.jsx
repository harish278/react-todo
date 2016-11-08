var React = require("react");
var actions = require("../actions/TodoActions");
var uuid = require("node-uuid");

module.exports = React.createClass ({
    getInitialState:function(){
      return {
          title:"",
          desc:"",
          dueDate: ""
      }
    },
    addTodo:function(e){
        e.preventDefault();
        actions.addTodo(this.state);
        this.setState({
          title:"",
          desc:"",
          dueDate: ""
      });
    },
    handleInputChange:function(e){
      e.preventDefault();
      var name = e.target.name;
      var state = this.state;
      state[name] = e.target.value;
      this.setState(state);
    },
    render:function(){
        return(
            <form className="form" onSubmit={this.addTodo}>
                <div className="form-group">
                    <label className="control-label" htmlFor="title">Todo title:</label>
                    <input type="text" className="form-control" id="title" name="title" value={this.state.title} onChange={this.handleInputChange} placeholder="Todo Title" />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="desc">Todo Description:</label>
                    <input type="text" className="form-control" id="desc" name="desc" value={this.state.desc} onChange={this.handleInputChange} placeholder="Description" />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="Duedate">Duedate:</label>
                    <input type="date" className="form-control" id="Duedate" name="dueDate" value={this.state.dueDate} onChange={this.handleInputChange} placeholder="Due Date" />
                </div>
                <div className="form-group">
                    <button className="btn" type="submit">Add Todo</button>
                </div>
            </form>
        )
    }
})