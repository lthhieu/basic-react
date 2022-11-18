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

class ListJob extends React.Component {
    state = {
        showJobs: false
    }
    changeShowJobs = () => {
        this.setState({
            showJobs: !this.state.showJobs
        })
    }
    handleClickDelete = (job) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You are deleting " + job.title,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.deleteAJob(job)
                // toast.success("Successfully deleted")
                Toast.fire({
                    icon: 'success',
                    title: 'Deleted successfully'
                })
            }
        })


    }
    render() {
        let { arrJobs } = this.props
        let { showJobs } = this.state
        return (
            <div className="list-job-content">
                {!showJobs ?
                    <div>
                        <button onClick={() => this.changeShowJobs()} className="btn btn-info">
                            Show</button>
                    </div>
                    :
                    <>
                        <div>
                            {
                                arrJobs.map((item, index) => {
                                    return (
                                        <div key={item.id}>
                                            {item.title} - {item.salary} <FontAwesomeIcon icon="dollar-sign" /> &nbsp;
                                            <span className="delete-job" onClick={() => this.handleClickDelete(item)}>
                                                <FontAwesomeIcon icon="trash" />
                                            </span>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div>
                            <button onClick={() => this.changeShowJobs()} className="btn btn-warning">
                                Hide</button>
                        </div>
                    </>
                }
            </div>
        )
    }
}
export default ListJob;