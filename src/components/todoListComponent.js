import React, {Component} from 'react';
import TodoListItemComponent from './todoListItemComponent';
import TodoListAddComponent from './todoListAddComponent';

export default class todoListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList:props.todoList,
            selected:props.selected
        }
    }
    componentWillReceiveProps(props) {
        this.setState({todoList:props.todoList, selected:props.selected})
    }
    onTodoListChange(todoSearchValue) {
        const selected = this.state.selected;
        const todoList = this.props.todoList.filter((value, key) => {
            value.clicked = false;
            return value.name.toUpperCase().includes(todoSearchValue.toUpperCase())? value:null;
        })
        if(!todoSearchValue) {
            selected.clicked = true;
        }
        this.setState({todoList, selected})
    }
    updateState(todoList, hasDeleted) {
        if(hasDeleted) {
            this.props.updateState(todoList, true)
        }
        else {
            this.props.updateState(todoList)
        }
        this.setState({todoList})
    }
    selectRow(id, listItem) {
        let newTodoList = [];
        this.state.todoList.map((value, key) => {
            value.clicked = key === id? true:false;
            newTodoList.push(value);
        });
        this.props.selectRow(listItem, id);
        this.setState({todoList:newTodoList})
    }
    render() {
        const styles = this.props.styles;
        return(
            <div className={styles.todo_list}>
                <h3>Todo Lists</h3>
                <div className={styles.input_container}>
                    <i className="fa fa-search" aria-hidden="true"></i>bbbbbb
                    <input
                        type="text"
                        onChange={event => this.onTodoListChange(event.target.value)}
                        placeholder="Search for List"
                    />
                </div>
                <div className={styles.todo_item_container}>
                     {this.state.todoList.map((value, key) => {
                         return(
                             <TodoListItemComponent
                                 value={value}
                                 key={key}
                                 id={key}
                                 selected={this.state.selected}
                                 todoList={this.state.todoList}
                                 styles={styles}
                                 selectRow={(listItem, id) => this.selectRow(id, listItem)}
                                 updateState={(todoList, hasDeleted) => this.updateState(todoList, hasDeleted)}
                             />

                         )

                     })}
                </div>
                 <TodoListAddComponent
                     styles={styles}
                     todoList={this.state.todoList}
                     updateState={(todoList, hasDeleted) => this.updateState(todoList, hasDeleted)}
                 />


            </div>

        )
    }
}
