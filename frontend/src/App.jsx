import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Components/Common/Home";

export default function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
