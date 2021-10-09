import { useContext, useRef, useState } from "react";
import useLoggedin from "../../Hooks/useLoggedin";
import userContext from "../../Context/User.context";

import { useHistory } from "react-router";

import { createPost } from "../../API/blogapi";

function CreatePost() {
  const { setUser, user } = useContext(userContext);
  useLoggedin(setUser);

  const history = useHistory();

  const title = useRef();
  const content = useRef();
  const [message, setMessage] = useState();

  if (user && !user.ok) return "Invalid Session";
  if (!user) return "Invalid Session";

  const username = String(user.user.username).split(" ")[0].toLocaleLowerCase();

  const onSumbit = (e) => {
    e.preventDefault();

    const data = {
      title: title.current.value,
      content: content.current.value,
      author: username,
      authorID: user.user._id,
    };

    createPost(`/blog/${username}/newpost`, data).then((res) => {
      if (!res.data.ok) {
        setMessage(res.data.message);
      }

      history.push(`/blog/${username}/allposts`);
    });
  };

  return (
    <div>
      <div>
        <div className="form">
          <form onSubmit={(e) => onSumbit(e)}>
            <h1>Create Post</h1>
            <>
              <div className="field">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  ref={title}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="content">Content</label>
                <textarea
                  name="content"
                  cols="30"
                  rows="14"
                  required
                  ref={content}
                ></textarea>
              </div>

              <button type="submit">Post</button>

              <div className="err">
                <h4>{message}</h4>
              </div>
            </>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
