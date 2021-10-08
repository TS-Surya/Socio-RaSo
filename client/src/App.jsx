import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
// import axios from "axios";

import UserHome from "./Components/User/UserHome";

import userContext from "./Context/User.context";
import { useState, useMemo } from "react";

function App() {
  const [user, setUser] = useState({});
  const providervalue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <userContext.Provider value={providervalue}>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path={`/users/:user`} exact>
              <UserHome />
            </Route>
          </userContext.Provider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
