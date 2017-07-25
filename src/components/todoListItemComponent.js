import React, {Component} from 'react';
import classNames from 'classnames';

export default class todoListItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList:props.todoList,
            selected:props.selected,
        }

    }
    componentWillReceiveProps(props) {
        this.setState({todoList:props.todoList, selected:props.selected})
    }
    selectRow(selectedObj, index) {
        selectedObj.clicked = true;
        this.props.selectRow(selectedObj, index)

    }
    deleteRow(id) {
        const todoListClone = [ ...this.state.todoList ];
        todoListClone.splice(id, 1);
        this.setState({todoList: todoListClone});
        this.props.updateState(todoListClone, true);
    }
    render() {
        const propId = this.props.styles.selected_todo;
        return (
            <div
                className={classNames(this.props.styles.todo_item, {[propId]:this.props.value.clicked})}
            >
                <div onClick={() => this.selectRow(this.props.value, this.props.id)}>{this.props.value.name}</div>
                <div onClick={() => this.deleteRow(this.props.id)}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </div>
            </div>
        )
    }
}