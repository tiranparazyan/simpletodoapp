import React, {Component} from 'react';

export default class TaskAddComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList:props.todoList,
            selected:props.selected,
            selectedIndex:props.selectedIndex,
            newTaskName:''
        }
    }
    componentWillReceiveProps(props) {
        this.setState({selected:props.selected, selectedIndex:props.selectedIndex})
    }
    onChangeHandler({target}) {
        this.setState({newTaskName:target.value});
    }
    addNewTask(newTaskObj) {
        const todoList = [ ...this.state.todoList ]
        if(newTaskObj.name) {
            this.state.selected.toDos.push(newTaskObj);
        }
        todoList[this.state.selectedIndex] = this.state.selected;
        this.props.updateState(this.state.todoList);
        this.newTaskInput.value = "";
        this.setState({newTaskName:''})
    }
    render() {
        return (
            <div
                className={this.props.styles.input_container}
                style={{marginTop: 'auto'}}
            >
                <input type="text"
                       placeholder="Enter new list name"
                       onChange={(event) => this.onChangeHandler(event)}
                       ref={(el) => this.newTaskInput = el}
                />
                <i  className="fa fa-plus-circle fa-2x"
                    style={{color:'green', cursor:'pointer'}}
                    aria-hidden="true"
                    onClick={() => this.addNewTask({
                        name:this.state.newTaskName,
                        checked:false
                    })}
                >
                </i>
            </div>
        )
    }
}