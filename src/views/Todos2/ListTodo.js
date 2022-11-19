import React from "react";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        editTodo: {}
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
                this.props.handleDeleteTodo(todo)
                // toast.success("Successfully deleted")
                Toast.fire({
                    icon: 'success',
                    title: 'Deleted successfully'
                })
            }
        })


    }
    handleEditTodo = (todo) => {
        let { listTodos, handleEditTodo } = this.props
        let { editTodo } = this.state
        let isEmptyObj = Object.keys(editTodo).length === 0

        //save
        if (!isEmptyObj && editTodo.id === todo.id) {
            let listTodosCopy = [...listTodos]

            //Find index of specific object using findIndex method.    
            let objIndex = listTodosCopy.findIndex((obj => obj.id === todo.id))

            //Update object's name property.
            listTodosCopy[objIndex].title = editTodo.title

            handleEditTodo(listTodosCopy)

            this.setState({
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
        let { listTodos } = this.props
        let { editTodo } = this.state
        let isEmptyObj = Object.keys(editTodo).length === 0

        return (
            <div className="list-todo-content">
                <table className="table table-dark table-hover">
                    <tbody>{listTodos && listTodos.length > 0 &&
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
                                        {!isEmptyObj && editTodo.id === item.id ?
                                            <FontAwesomeIcon onClick={() => this.handleEditTodo(item)} icon="floppy-disk" className="edit-save" />
                                            : <FontAwesomeIcon onClick={() => this.handleEditTodo(item)} icon="pen" className="edit-save" />}
                                    </td>
                                    <td>
                                        <FontAwesomeIcon onClick={() => this.handleDeleteTodo(item)} icon="trash" className="delete" />
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListTodo;

