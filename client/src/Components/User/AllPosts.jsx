import { useContext, useEffect, useState } from "react";
import useLoggedin from "../../Hooks/useLoggedin";
import userContext from "../../Context/User.context";

import { getAllPosts } from "../../API/blogapi";

function AllPosts() {
  const { setUser, user } = useContext(userContext);
  useLoggedin(setUser);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && !user.ok) return "Invalid Session";
    if (!user) return "Invalid Session";

    if (user) {
      const username = String(user.user.username)
        .split(" ")[0]
        .toLocaleLowerCase();
      getAllPosts(`/blog/${username}/allposts`, {
        userID: user.user._id,
      }).then((res) => {
        if (!res.data.ok) {
          setMessage(res.data.message);
          setLoading(false);
        }
        setData(res.data.posts);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <div>
      <h1>All Posts</h1>
      <div className="posts">
        {!loading &&
          data.map((e, i) => {
            return (
              <div className="post" key={i}>
                <h3>{e.title}</h3>
                <h5>{e.author}</h5>
                <h4>{e.content}</h4>
              </div>
            );
          })}
      </div>
      <div className="err">{message && message}</div>
    </div>
  );
}

export default AllPosts;
