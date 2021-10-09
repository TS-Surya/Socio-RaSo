import "./App.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
// import axios from "axios";

import { UserHome, CreatePost, AllPosts } from "./Components/User/index";

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
            <Route path={`/blog/:user/create`} exact>
              <CreatePost />
            </Route>
            <Route path={`/blog/:user/allposts`} exact>
              <AllPosts />
            </Route>
          </userContext.Provider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
