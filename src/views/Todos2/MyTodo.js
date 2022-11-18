import React from "react";
import './style.scss';
import AddTodo from "./AddTodo";
import ListTodo from "./ListTodo";


class MyTodo extends React.Component {
    state = {
        listTodos: [
            { id: "1", title: "Learning React" },
            { id: "2", title: "Watching YouTube" },
            { id: "3", title: "Doing Housework" }
        ]
    }
    handleAddTodo = (todo) => {
        this.setState({
            listTodos: [...this.state.listTodos, todo]
        })
    }
    handleDeleteTodo = (todo) => {
        let curTodos = this.state.listTodos
        curTodos = curTodos.filter(item => item.id !== todo.id)
        this.setState({
            listTodos: curTodos
        })
    }

    handleEditTodo = (todo) => {
        this.setState({
            listTodos: todo
        })
    }

    render() {
        return (
            <>
                <h3>
                    Simple Todo App with React
                </h3>
                <div className="list-todo-container">

                    <AddTodo
                        handleAddTodo={this.handleAddTodo} />
                    <ListTodo
                        handleDeleteTodo={this.handleDeleteTodo}
                        handleEditTodo={this.handleEditTodo}
                        listTodos={this.state.listTodos} />
                </div>
            </>

        )

    }
}

export default MyTodo;