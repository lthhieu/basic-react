import React, { Component } from 'react'

// import { withRouter } from "react-router";
import Color from '../HOC/Color'
import Gam from '../../assets/images/Sinh-nhat-tuoi-22-cua-em.jpg'
import './style.scss'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

class Home extends Component {
    // componentDidMount() {
    //     setTimeout(() => {
    //         this.props.history.push('/todo')
    //     }, 3000)
    // }
    handleDelete = (user) => {
        console.log(">>> user info: ", user)
        Swal.fire({
            title: 'Are you sure?',
            text: "You are deleting " + user.name,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.deleteUserRedux(user)
                // toast.success("Successfully deleted")
                Toast.fire({
                    icon: 'success',
                    title: 'Deleted successfully'
                })
            }
        })
    }
    handleCreateUser = () => {
        this.props.createUserRedux()
        Toast.fire({
            icon: 'success',
            title: 'Created successfully'
        })
    }
    render() {
        console.log(">>> check props:", this.props)
        let { dataRedux } = this.props
        return (
            <>
                <div>
                    Home
                </div>
                <div>
                    <img className='Gam' src={Gam} alt='Sinh nhat tuoi 22 cua em' />

                </div>
                <div className="home-container">

                    <table className="table table-dark table-hover list-user-content">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th><FontAwesomeIcon className='create' onClick={() => this.handleCreateUser()} icon="user-plus" /></th>
                            </tr>
                        </thead>
                        <tbody>{dataRedux && dataRedux.length > 0 ?
                            dataRedux.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td><FontAwesomeIcon className='delete' icon="trash"
                                            onClick={() => this.handleDelete(item)} /></td>
                                    </tr>
                                )
                            })
                            : <></>}
                        </tbody>
                    </table>

                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataRedux: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUserRedux: (user) => dispatch({ type: 'DELETE_USER', payload: user }),
        createUserRedux: () => dispatch({ type: 'CREATE_USER' })
    }
}

// export default withRouter(Home)
// export default Color(Home)
export default connect(mapStateToProps, mapDispatchToProps)(Color(Home))
