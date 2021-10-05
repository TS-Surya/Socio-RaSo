import { Formik, Form, Field } from "formik";
import { register } from "../../API/Auth/AuthApi";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Register() {
  const [message, setMessage] = useState("");
  const history = useHistory();

  const getData = async (values) => {
    await register(values)
      .then((res) => {
        setMessage(res.data.message);
        if (res.data.ok) {
          console.log(res);
          history.push("/auth/login");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h1>Register</h1>

      <div className="form_">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            getData(values);
          }}
        >
          <Form>
            <div className="form_field">
              <label htmlFor="username">Username</label>
              <Field type="text" name="username" required></Field>
            </div>
            <div className="form_field">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" required></Field>
            </div>
            <div className="form_field">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" required></Field>
            </div>
            <button type="submit">Create Account</button>
          </Form>
        </Formik>
        {message}
      </div>
    </div>
  );
}

export default Register;
