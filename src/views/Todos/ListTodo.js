import React from "react";
import './style.scss';
import AddTodo from "./AddTodo";
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    showCloseButton: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


class ListTodo extends React.Component {
    state = {
        listTodos: [
            { id: "1", title: "Learning React" },
            { id: "2", title: "Watching YouTube" },
            { id: "3", title: "Doing Housework" }
        ],
        editTodo: {}
    }
    handleAddTodo = (todo) => {
        this.setState({
            listTodos: [...this.state.listTodos, todo]
        })
    }
    handleDeleteTodo = (todo) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are deleting " + todo.title,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let curTodos = this.state.listTodos
                curTodos = curTodos.filter(item => item.id !== todo.id)
                this.setState({
                    listTodos: curTodos
                })
                // toast.success("Successfully deleted")
                Toast.fire({
                    icon: 'success',
                    title: 'Deleted successfully'
                })
            }
        })


    }
    handleEditTodo = (todo) => {
        let { listTodos, editTodo } = this.state
        let isEmptyObj = Object.keys(editTodo).length === 0

        //save
        if (!isEmptyObj && editTodo.id === todo.id) {
            let listTodosCopy = [...listTodos]

            //Find index of specific object using findIndex method.    
            let objIndex = listTodosCopy.findIndex((obj => obj.id == todo.id))

            //Update object's name property.
            listTodosCopy[objIndex].title = editTodo.title

            this.setState({
                listTodos: listTodosCopy,
                editTodo: {}
            })

            Toast.fire({
                icon: 'success',
                title: 'Edited successfully'
            })
            return

        }

        //edit
        this.setState({
            editTodo: todo
        })
    }
    handleChangeTodo = (e) => {
        let editTodoCopy = { ...this.state.editTodo }
        editTodoCopy.title = e.target.value
        this.setState({
            editTodo: editTodoCopy
        })
    }
    render() {
        let { listTodos, editTodo } = this.state
        let isEmptyObj = Object.keys(editTodo).length === 0

        return (
            <div className="list-todo-container">
                <AddTodo
                    handleAddTodo={this.handleAddTodo} />
                <div className="list-todo-content">
                    <table className="table table-dark table-hover todo-child">
                        <tbody>{
                            listTodos.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{isEmptyObj ?
                                            <>{item.title}</>
                                            :
                                            <>{editTodo.id === item.id ?
                                                <><input className="form-control" value={editTodo.title}
                                                    onChange={(e) => this.handleChangeTodo(e)} /></>
                                                :
                                                <>{item.title}</>
                                            }</>
                                        }
                                        </td>
                                        <td>
                                            <button className="btn btn-info"
                                                onClick={() => this.handleEditTodo(item)}>
                                                {!isEmptyObj && editTodo.id === item.id ?
                                                    "Save" : "Edit"}
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                                onClick={() => this.handleDeleteTodo(item)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
}

export default ListTodo;

