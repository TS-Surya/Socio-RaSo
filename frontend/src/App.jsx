import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useMemo } from "react";

import Home from "./Components/Common/Home";
import UserHome from "./Components/User/UserHome";
import { Login, Register } from "./Components/Auth/index";

// * context
import UserDataContext from "./Context/User.context";

import "./styles/Global.style.css";

export default function App() {
  const [userData, setUserData] = useState({});
  const providerValue = useMemo(
    () => ({ userData, setUserData }),
    [userData, setUserData]
  );

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/auth/register" exact>
            <Register />
          </Route>
          <UserDataContext.Provider value={providerValue}>
            <Route path="/auth/login" exact>
              <Login />
            </Route>
            <Route path="/users/:username" exact>
              <UserHome />
            </Route>
          </UserDataContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}
