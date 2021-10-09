import { useContext, useEffect, useState } from "react";
import useLoggedin from "../../Hooks/useLoggedin";

import { Link } from "react-router-dom";

import userContext from "../../Context/User.context";

function SinglePost({ single }) {
  const { setUser, user } = useContext(userContext);
  const [loading, setLoading] = useState(true);
  useLoggedin(setUser);

  useEffect(() => {
    if (user && !user.ok) return "Invalid Session";
    if (!user) return "Invalid Session";

    if (single) {
      setLoading(false);
    }
  }, [user, single]);
  return (
    <>
      <div className="single">
        {loading && "Loading"}
        <div className="title">
          <h1>{single.title}</h1>
          <span>post By {single.author}</span>
        </div>

        <div className="content__">{single.content}</div>
      </div>
      <div className="links">
        <Link
          to={`/blog/${
            user.user &&
            String(user.user.username).split(" ")[0].toLocaleLowerCase()
          }/allposts`}
        >
          All Posts
        </Link>
      </div>
    </>
  );
}

export default SinglePost;
