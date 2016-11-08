var React = require("react");
var actions = require("../actions/TodoActions");


module.exports = React.createClass({
   render:function () {
       return(
           <div className="row">
                <select>
                    <option value="byDueDate">By due date</option>
                    <option value="byCreatedDate">Saab</option>
                </select>
           </div>
       )
   } 
});