import React from 'react'
import axios from 'axios'
import './style.scss'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ListUser extends React.Component {
    state = {
        ListUser: []
    }
    async componentDidMount() {
        let res = await axios.get("https://reqres.in/api/users?page=1")
        this.setState({
            ListUser: res && res.data && res.data.data ? res.data.data : []
        })
    }
    handleInfo = (user) => {
        this.props.history.push(`/users/${user.id}`)
    }
    render() {
        let { ListUser } = this.state
        console.log(this.props)
        return (
            <>
                <div className="list-user-container">
                    <h3>
                        Users List
                    </h3>
                    <div className="list-user-content">
                        <table className="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>{ListUser && ListUser.length > 0 &&
                                ListUser.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.first_name}</td>
                                            <td>{item.last_name}</td>
                                            <td>
                                                <FontAwesomeIcon icon="circle-info"
                                                    onClick={() => this.handleInfo(item)}
                                                    className="info-back" />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}
export default withRouter(ListUser)