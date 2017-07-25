import React, {Component} from 'react';

export default class todoListAddComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList:props.todoList,
            newListName:''
        }
    }
    componentWillReceiveProps(props) {
        this.setState({todoList:props.todoList})
    }
    getNewListNameValue(newListName) {
        this.setState({newListName});

    }
    addNewListItem(newListObj) {
        if(newListObj.name) {
            const todoList = this.state.todoList.slice();
            todoList.push(newListObj);
            this.setState({todoList});
            this.props.updateState(todoList);
        }
        this.newTodoInput.value = "";
        this.setState({newListName:''})
    }
    render() {
        return(
            <div
                className={this.props.styles.input_container}
                style={{marginTop: 'auto'}}
            >
                <input type="text"
                       placeholder="Enter new list name"
                       onChange={event => this.getNewListNameValue(event.target.value)}
                       ref={(el) => this.newTodoInput = el}
                />
                <i  className="fa fa-plus-circle fa-2x"
                    style={{color:'green', cursor:'pointer'}}
                    aria-hidden="true"
                    onClick={() => this.addNewListItem({
                        name:this.state.newListName,
                        toDos:[]
                    })}
                >
                </i>
            </div>

        )
    }
}