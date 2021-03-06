import React from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./../App.css"
import TaskView from "./task/TaskView";
import TaskDocument from "./task/TaskDocument";
import {Profile} from "./Profile";
import UserView from "./user/UserView";


export const Outline = (props) => {
    let jwtDecode = require('jwt-decode');
    let decoded = jwtDecode(sessionStorage.getItem("jwtToken"));
    const [userName] = React.useState(decoded.sub);

    const logout = event => {
        sessionStorage.removeItem("jwtToken");
        window.location.replace('/sign_in');
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="juka-navbar">
                <Navbar.Brand href="/" className="font-weight-bold">JUKA</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <NavDropdown title="Views" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/view/tasks">Tasks</NavDropdown.Item>
                            <NavDropdown.Item href="/view/my_tasks">My tasks</NavDropdown.Item>
                            <NavDropdown.Item href="/view/users">All Users</NavDropdown.Item>
                            <NavDropdown.Item href="/view/logs">Logs</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/profile">{userName}</Nav.Link>
                        <Nav.Link eventKey={2} onClick={logout}>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {props.match.path === "/view/:viewName" && (props.match.params.viewName === "tasks" || props.match.params.viewName === "may_tasks") && <TaskView viewType = {props.match.params.viewName}/>}
            {props.match.path === "/view/:viewName" && props.match.params.viewName === "users" && <UserView/>}
            {props.match.path === "/document/:id" && <TaskDocument id={props.match.params.id}/>}
            {props.match.path === "/profile" && <Profile/>}
        </div>
    );
}

export default Outline;

