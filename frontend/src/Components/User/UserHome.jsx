import { useHistory, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth.hook";

import UserDataContext from "../../Context/User.context";
import { useContext } from "react";

function UserHome() {
  const { user } = useParams();
  const userData = useContext(UserDataContext);
  const loggedin = useAuth(userData);

  const history = useHistory();

  if (!loggedin) history.push("/auth/login");

  return (
    <div>
      <h1>Welcome {user}</h1>
    </div>
  );
}

export default UserHome;
