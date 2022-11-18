import React from "react";
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
class AddTodo extends React.Component {

    state = {
        title: ""
    }
    handleChangeTodo = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleAddTodo = () => {
        if (!this.state.title) {
            // toast.error('Missing title..');
            Toast.fire({
                icon: 'error',
                title: 'Missing title..'
            })
            return
        }
        let newTodo = {
            id: Math.floor(Math.random() * 100),
            title: this.state.title
        }
        this.props.handleAddTodo(newTodo)

        this.setState({
            title: ""
        })
        // toast.success('Successfully added')
        Toast.fire({
            icon: 'success',
            title: 'Added successfully'
        })
    }
    render() {
        let { title } = this.state

        return (
            <div className="add-todo input-group">
                <input className="form-control" type="text" value={title}
                    onChange={(e) => { this.handleChangeTodo(e) }} />
                <input type="button" className="btn btn-success" value="Add"
                    onClick={() => this.handleAddTodo()} />
            </div>
        )
    }
}
export default AddTodo;