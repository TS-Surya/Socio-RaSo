import { useRef, useState } from "react";
import { register } from "../API/authapi";
import { useHistory } from "react-router-dom";

function Resister() {
  const username = useRef();
  const email = useRef();
  const password = useRef();

  const history = useHistory();

  const [message, setMessage] = useState("");

  const onSumbit = (e) => {
    e.preventDefault();

    const data = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    register(data)
      .then((res) => {
        setMessage(res.data.message);
      })
      .then(() => history.push("/login"))
      .catch((e) => setMessage(e.message));
  };

  return (
    <div>
      <div className="form">
        <form onSubmit={(e) => onSumbit(e)}>
          <h1>Resister</h1>
          <>
            <div className="field">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                ref={username}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="email"
                name="email"
                ref={email}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Username"
                name="password"
                ref={password}
                required
              />
            </div>
            <button type="submit">Resister</button>

            <div className="err">
              <h4>{message}</h4>
            </div>
          </>
        </form>
      </div>
    </div>
  );
}

export default Resister;
