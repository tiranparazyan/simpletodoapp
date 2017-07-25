import React, {Component} from 'react';
import todoList from '../../resources/todo';
import TodoListComponent from './todoListComponent';
import TodoTasksComponent from './todoTasksComponent';
import styles from './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.sortTodos(todoList, (newTodos) =>{
            newTodos[0].clicked = true;
        });
        this.state = {
            todoList,
            selected:todoList[0],
            selectedIndex:0
        }

    }
    sortTodos(newTodos, fn) {
        newTodos.sort((a,b) => {
            return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : (b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0;
        })

        if(fn) {
            fn(newTodos);
        }
    }
    updateState(todoList, hasDeleted) {
        if(hasDeleted && todoList.length) {
            const anythingSelected = todoList.filter((value) => {
                return !!value.clicked
            })
            if(!anythingSelected.length) {
                todoList[0].clicked = true;
                this.setState({selected:todoList[0], selectedIndex:0})
            }
        }
        if(!todoList.length) {
            this.setState({todoList:[], selected:{
                name:'',
                clicked:false,
                toDos:[]
            }})
        }
        this.sortTodos(todoList);
        this.setState({todoList});
    }
    selectRow(selectedObj, index) {
        this.setState({selected:selectedObj, selectedIndex:index})
    }
    render() {
        return (
            <div className={styles.app}>
                <div className={styles.todo_container}>
                    <TodoListComponent
                        todoList={this.state.todoList}
                        selected={this.state.selected}
                        styles={styles}
                        updateState={(todoList, hasDeleted) => this.updateState(todoList, hasDeleted)}
                        selectRow={(selectedObj, index) => this.selectRow(selectedObj, index)}
                    />
                    <TodoTasksComponent
                        styles={styles}
                        selected={this.state.selected}
                        todoList={this.state.todoList}
                        selectedIndex={this.state.selectedIndex}
                        updateState={(todoList) => this.updateState(todoList)}
                    />
                    {/*<div className={styles.todos}></div>*/}
                </div>
            </div>
        )
    }


}

export default App;