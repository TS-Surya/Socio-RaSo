import { useParams } from "react-router-dom";

const useAuth = ({ userData, loggedin }) => {
  const { user } = useParams();

  const { username } = userData;
  if (loggedin) {
    if (user === username) return true;
    return false;
  }

  if (localStorage.getItem("sessionData")) {
    if (
      JSON.parse(localStorage.getItem("sessionData")).username === user &&
      username
    ) {
      return true;
    }
  }
};

export default useAuth;
