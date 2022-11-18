import React from "react";
import ListJob from "./ListJob";
import AddJob from "./AddJob";

class Job extends React.Component {
    state = {
        arrJobs: [
            { id: "1", title: "Developer", salary: 500 },
            { id: "2", title: "Tester", salary: 400 },
            { id: "3", title: "DevOps", salary: 700 }
        ]
    }
    addNewJob = (job) => {
        this.setState({
            arrJobs: [...this.state.arrJobs, job]
        })
    }
    deleteAJob = (job) => {
        let curJobs = this.state.arrJobs
        curJobs = curJobs.filter(item => item.id !== job.id)
        this.setState({
            arrJobs: curJobs
        })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(">>> Run component did update:", "Previous state:", prevState, "Current state:", this.state)
    }

    componentDidMount() {
        console.log(">>> Run component did mount")
    }


    render() {
        console.log(">>> Call render:", this.state)
        return (
            <div className="list-job-container">
                <AddJob
                    addNewJob={this.addNewJob}
                />
                <ListJob
                    arrJobs={this.state.arrJobs}
                    deleteAJob={this.deleteAJob}
                />
            </div>
        )
    }
}

export default Job;