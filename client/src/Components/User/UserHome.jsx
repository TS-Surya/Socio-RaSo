import { useContext } from "react";
import useLoggedin from "../../Hooks/useLoggedin";
import userContext from "../../Context/User.context";

function UserHome() {
  const { setUser, user } = useContext(userContext);
  useLoggedin(setUser);

  if (user && !user.ok) return "Invalid Session";
  if (!user) return "Invalid Session";

  return (
    <div>
      <h1>Hello {user.user.username}</h1>
    </div>
  );
}

export default UserHome;
