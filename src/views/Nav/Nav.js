import React from 'react'
import './style.scss'
import { NavLink } from "react-router-dom";

class Nav extends React.Component {
    render() {
        return (
            <div className="topnav">
                <NavLink activeClassName='active' exact to="/" >Home</NavLink>
                <NavLink activeClassName='active' to="/todo">Todo</NavLink>
                <NavLink activeClassName='active' to="/users">User</NavLink>
                <NavLink activeClassName='active' to="/jobs">Job</NavLink>
            </div>
        )
    }
}
export default Nav