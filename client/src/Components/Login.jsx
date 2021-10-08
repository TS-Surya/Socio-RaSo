import { useRef, useState, useContext } from "react";
import { login } from "../API/authapi";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/User.context";

function Login() {
  const email = useRef();
  const password = useRef();

  const { user, setUser } = useContext(UserContext);

  const history = useHistory();

  const [message, setMessage] = useState("");

  const onSumbit = (e) => {
    e.preventDefault();

    const data = {
      email: email.current.value,
      password: password.current.value,
    };

    login(data)
      .then((res) => {
        setMessage(res.data.message);
        setUser(res.data);
        user &&
          history.push(
            "/users/" +
              String(res.data.user.username).split(" ")[0].toLocaleLowerCase()
          );
      })
      .catch((e) => setMessage(e.message));
  };

  return (
    <div>
      <div className="form">
        <form onSubmit={(e) => onSumbit(e)}>
          <h1>Login</h1>
          <>
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
            <button type="submit">Login</button>

            <div className="err">
              <h4>{message}</h4>
            </div>
          </>
        </form>
      </div>
    </div>
  );
}

export default Login;
