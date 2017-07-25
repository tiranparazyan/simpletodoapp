import React, {Component} from 'react';
import TaskListItem from './taskListItem';
import TaskAddComponent from './taskAddComponent';

export default class TodoTasksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList:props.todoList,
            selected:props.selected,
            selectedIndex:props.selectedIndex
        }
        this.getDoneTasksNumber(this.state.selected)
    }
    componentWillReceiveProps(props) {
        this.getDoneTasksNumber(props.selected)
        this.setState({selected:props.selected,selectedIndex:props.selectedIndex,todoList:props.todoList})

    }
    updateState(updatedItem, index, newTodos) {

        if(index) {
            this.state.selected.toDos[index] = updatedItem;
            this.state.todoList[this.state.selectedIndex] = this.state.selected;
        }
        if(newTodos) {
            this.setState({todoList:newTodos})
        }

        this.props.updateState(this.state.todoList)
    }
    getDoneTasksNumber(selected) {
         const doneTasks = selected.toDos.filter((value) => {
            return value.checked;
        })
        this.state.doneTasks = doneTasks;
    }
    renderIfEmptyTodoList() {
        if(!this.state.todoList.length || !this.state.selected.toDos.length) {
            return (
                <tr style={{'color':'red'}}>
                    <td>
                        There are no tasks to display
                    </td>
                </tr>
            );
        }
        else {
            return null;

        }
    }
    render() {
        const styles = this.props.styles;
        return (
            <div className={styles.tasks_container}>
                <div className={styles.todos}>
                    <div className={styles.tasks_header_container}>
                        <h2>{this.props.selected.name}</h2>
                        <div>{this.state.doneTasks.length} of {this.props.selected.toDos.length} Done</div>
                    </div>
                </div>
                <div className={styles.table_container}>
                    <table className={styles.task_list}>
                        <tbody>
                        {
                            this.state.selected.toDos.map((value, key) => {
                                return(
                                    <TaskListItem
                                        value={value}
                                        key={key}
                                        id={key}
                                        todoList={this.state.todoList}
                                        selectedIndex={this.state.selectedIndex}
                                        styles={this.props.styles}
                                        updateState={(taskItem, index, newTodos) => this.updateState(taskItem, index, newTodos)}
                                    />

                                )

                            })
                        }
                        {this.renderIfEmptyTodoList()}
                        </tbody>
                    </table>
                </div>
                <TaskAddComponent
                    styles={this.props.styles}
                    todoList={this.state.todoList}
                    selected={this.state.selected}
                    selectedIndex={this.state.selectedIndex}
                    updateState={(todoList) => this.updateState(todoList)}
                />
            </div>
        )
    }
}