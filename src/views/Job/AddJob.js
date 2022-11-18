import React from "react";
import './style.scss'
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

class AddJob extends React.Component {
    state = {
        title: "",
        salary: ""
    }
    componentDidMount() {
        console.log(typeof this.state.salary)
    }
    handleChangetitleJob = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleChangejobSalary = (e) => {
        this.setState({
            salary: e.target.value
        })
    }
    submitForm = () => {
        console.log(this.state.salary)
        console.log(Number.isInteger(this.state.salary * 1))
        if (!this.state.title || !this.state.salary) {
            Toast.fire({
                icon: 'error',
                title: 'Missing something..'
            })
            return
        }
        if (Number.isInteger(this.state.salary * 1)) {
            this.props.addNewJob({
                id: Math.floor(Math.random() * 100),
                title: this.state.title,
                salary: this.state.salary
            })
            this.setState({
                title: "",
                salary: ""
            })
            Toast.fire({
                icon: 'success',
                title: 'Added successfully'
            })

        }
        else {
            Toast.fire({
                icon: 'error',
                title: 'Please input a number for salary..'
            })
            return
        }

    }
    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label>Job title:</label><br />
                        <input className="form-control" type="text" value={this.state.title}
                            onChange={(e) => this.handleChangetitleJob(e)} />
                    </div>
                    <div className="form-group">
                        <label>Salary:</label><br />
                        <input className="form-control" type="text" value={this.state.salary}
                            onChange={(e) => this.handleChangejobSalary(e)} />
                    </div>
                    <input className="btn btn-success mt-3" type="button" value="Submit"
                        onClick={() => this.submitForm()} />
                </form>
            </div>
        )
    }
}
export default AddJob