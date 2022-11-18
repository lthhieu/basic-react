import axios from 'axios'
import React from 'react'
import { withRouter } from 'react-router-dom'
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class DetailUser extends React.Component {
    state = {
        user: {}
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id
            let req = await axios.get(`https://reqres.in/api/users/${id}`)
            this.setState({
                user: req && req.data && req.data.data ? req.data.data : {}
            })

        }
    }
    handleBack = () => {
        this.props.history.push('/users')
    }
    render() {
        let { user } = this.state
        let isEmptyObj = Object.keys(user).length === 0
        return (
            <>
                <h3>Detail User with ID: {this.props.match.params.id}</h3>
                {!isEmptyObj ?
                    <div className='list-user-container'>
                        <table className='list-user-content table table-dark table-hover'>
                            <tbody>
                                <tr>
                                    <th>User name</th>
                                    <td>{user.first_name} {user.last_name}</td>
                                </tr>
                                <tr>
                                    <th>User email</th>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th>Avatar</th>
                                    <td><img src={user.avatar} alt='avatar' /></td>
                                </tr>
                                <tr>
                                    <th>Control</th>
                                    <td><FontAwesomeIcon icon="backward"
                                        onClick={() => this.handleBack()}
                                        className="info-back" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    : <>
                        <p>No data</p>
                        <FontAwesomeIcon icon="backward"
                            onClick={() => this.handleBack()}
                            className="info-back" /></>}
            </>
        )
    }
}
export default withRouter(DetailUser)