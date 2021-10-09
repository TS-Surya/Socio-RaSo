import { useContext } from "react";
import useLoggedin from "../../Hooks/useLoggedin";
import userContext from "../../Context/User.context";

import { Link } from "react-router-dom";

function UserHome() {
  const { setUser, user } = useContext(userContext);
  useLoggedin(setUser);

  if (user && !user.ok) return "Invalid Session";
  if (!user) return "Invalid Session";

  return (
    <div className="home">
      <h1>Hello {user.user.username}</h1>

      <div className="links">
        <Link
          to={`/blog/${String(user.user.username)
            .split(" ")[0]
            .toLocaleLowerCase()}/create`}
        >
          Create New Post
        </Link>
        <Link
          to={`/blog/${String(user.user.username)
            .split(" ")[0]
            .toLocaleLowerCase()}/allposts`}
        >
          Your Posts
        </Link>
        <Link to={`/blog/public/posts/allposts`}>Public Posts</Link>
      </div>
    </div>
  );
}

export default UserHome;
