import React, {Component} from 'react';
import classNames from 'classnames';

export default class TaskListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList:props.todoList,
            selectedIndex:props.selectedIndex,
            taskItem:props.value,
            id:props.id
        }
    }
    componentWillReceiveProps(props) {
        this.setState({taskItem:props.value, selectedIndex:props.selectedIndex, id:props.id});
    }

    checkedHandler({target}) {
        this.state.todoList[this.state.selectedIndex].toDos[this.props.id].checked = target.checked;
        this.props.updateState(this.state.taskItem, this.props.id);
    }
    deleteTask() {
        const todoListClone = [...this.state.todoList],
              selectedIndexClone = this.state.selectedIndex,
              indexClone = this.state.id;

        todoListClone[selectedIndexClone].toDos.splice(indexClone, 1);
        this.setState({todoList:todoListClone});
        this.props.updateState(this.state.taskItem, false, todoListClone)
    }
    render() {
        return (
            <tr className={classNames({[this.props.styles.checked_row]:this.state.taskItem.checked})}>
                <td style={{width:'10%'}}>
                    <input
                        type="checkbox"
                        checked={this.state.taskItem.checked}
                        onChange={(event) => this.checkedHandler(event)}
                    />
                </td>
                <td>{this.state.taskItem.name}</td>
                <td style={{textAlign:'right'}}>
                    <i className="fa fa-times"
                       aria-hidden="true"
                       onClick={() => this.deleteTask()}
                    >&nbsp;</i>
                </td>
            </tr>
        )
    }
}