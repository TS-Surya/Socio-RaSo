import { useContext, useEffect, useState } from "react";
import useLoggedin from "../../Hooks/useLoggedin";
import userContext from "../../Context/User.context";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

import { getAllPosts, deletePost } from "../../API/blogapi";

function AllPosts({ single }) {
  const { setUser, user } = useContext(userContext);
  useLoggedin(setUser);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

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
    <div className="posts">
      <h1>All Posts</h1>
      <>
        {!loading &&
          data.map((e, i) => {
            return (
              <div className="post" key={i}>
                <div className="content">
                  <p>{e.title}</p>
                  <p>{e.content}</p>
                  <div className="inner_links">
                    <Link
                      onClick={() => single(e)}
                      to={`/blog/${
                        user.user &&
                        String(user.user.username)
                          .split(" ")[0]
                          .toLocaleLowerCase()
                      }/post/${e._id}`}
                    >
                      View
                    </Link>
                    <Link
                      onClick={() => {
                        deletePost(
                          `/blog/${
                            user.user &&
                            String(user.user.username)
                              .split(" ")[0]
                              .toLocaleLowerCase()
                          }/delete/${e._id}`,
                          { id: e._id }
                        ).then((res) => {
                          if (res.data.ok) {
                            history.go(0);
                          }
                        });
                      }}
                      to={`/blog/${
                        user.user &&
                        String(user.user.username)
                          .split(" ")[0]
                          .toLocaleLowerCase()
                      }/allposts`}
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </>
      <div className="links">
        <Link
          to={`/users/${
            user.user &&
            String(user.user.username).split(" ")[0].toLocaleLowerCase()
          }`}
        >
          Go to Home
        </Link>
        <Link
          to={`/blog/${
            user.user &&
            String(user.user.username).split(" ")[0].toLocaleLowerCase()
          }/create`}
        >
          Add New Post
        </Link>
        <div className="err">{message && message}</div>
      </div>
    </div>
  );
}

export default AllPosts;
