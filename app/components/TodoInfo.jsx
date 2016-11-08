var React = require("react");
var actions = require("../actions/TodoActions");

module.exports = React.createClass({
    getInitialState : function() {
       return { isEdit : false };
    },
    deleteTodo: function (e) {
        e.preventDefault();
        actions.deleteTodo(this.props.info);
    },

    editTodo: function (e) {
        e.preventDefault();
        this.setState({ isEdit : true} );
    },

    onChange: function (e){
      e.preventDefault();
      var name = e.target.name;
      this.props.info[name] = e.target.value;
    },

    save: function (e) {
        e.preventDefault();
        actions.editTodo(this.props.info);
        this.setState({ isEdit : false} );
    },

    render: function () {
           if (!this.state.isEdit) {
               return (
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            {this.props.info.title}
                            <span className="pull-right text-uppercase delete-button" onClick={this.deleteTodo}>&times;</span>
                        </div>
                        <div className="row panel-body">
                            <div className="col-md-8">
                                <div className="">{this.props.info.desc}</div>
                                <div className="">{this.props.info.dueDate}</div>
                                <div className="">{this.props.info.created}</div>
                            </div>
                            <div className="col-md-4">
                                <button type="button" className="btn btn-info btn-md" onClick={this.editTodo}>Edit Todo</button>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="panel panel-default">
                        <form className="form" onSubmit={this.save}>
                            <div className="panel-heading">
                                <label className="control-label" htmlFor="title">Todo title:</label>
                                <input type="text" className="form-control" id="title" name="title" placeholder={this.props.info.title} onChange={this.onChange}/>
                            </div>
                            <div className="form-group panel-body">
                                <label className="control-label" htmlFor="desc">Description:</label>
                                <input type="text" className="form-control" id="desc" name="desc" placeholder={this.props.info.desc} onChange={this.onChange}/>
                            </div>
                            <div className="form-group panel-body">
                                <label className="control-label" htmlFor="dueDate">Due date:</label>
                                <input type="date" className="form-control" id="dueDate" name="dueDate" placeholder={this.props.info.dueDate} onChange={this.onChange}/>
                            </div>
                            <div className="form-group panel-body">
                                <button className="btn pull-right btn-info btn-sm" type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                )
            }
    }
});