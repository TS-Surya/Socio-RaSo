import { Formik, Form, Field } from "formik";
import { login } from "../../API/Auth/AuthApi";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import "./Auth.style.css";

import UserDataContext from "../../Context/User.context";

function Login() {
  localStorage.removeItem("sessionData");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const { setUserData, setUserLoggedin } = useContext(UserDataContext);

  const getData = async (values) => {
    await login(values)
      .then((res) => {
        setMessage(res.data.message);
        setUserLoggedin(false);
        if (res.data.ok) {
          setMessage(res.data.message);
          setUserData(res.data.User);

          // go to users home page
          localStorage.setItem(
            "sessionData",
            JSON.stringify({
              username: res.data.User.username,
            })
          );
          setUserLoggedin(true);
          history.push("/users/" + res.data.User.username);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="login">
      <h1>Login</h1>

      <div className="form_">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            getData(values);
          }}
        >
          <Form>
            <div className="form_field">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" required></Field>
            </div>
            <div className="form_field">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" required></Field>
            </div>
            <button type="submit">Login</button>
          </Form>
        </Formik>
        {message}
      </div>
    </div>
  );
}

export default Login;
