import logo from './logo.svg';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import MyTodo from './Todos2/MyTodo';
import ListUser from './Users/ListUser';
import DetailUser from './Users/DetailUser';
import Job from './Job/Job';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faCircleInfo, faBackward, faPen, faFloppyDisk, faDollarSign, faUserPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faCircleInfo, faBackward, faPen, faFloppyDisk, faDollarSign, faUserPlus);

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Nav />
          <img src={logo} className="App-logo" alt="logo" />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/todo">
              <MyTodo />
            </Route>
            <Route path="/users/:id">
              <DetailUser />
            </Route>
            <Route path="/users">
              <ListUser />
            </Route>
            <Route path="/jobs">
              <Job />
            </Route>
          </Switch>
        </header>
      </div>
    </BrowserRouter>

  );
}

export default App;
