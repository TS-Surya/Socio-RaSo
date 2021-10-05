import "./Common.style.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <h2>Hello</h2>
      <Link to="/auth/login">Login</Link> <br /> <br />
      <Link to="/auth/register">Register</Link>
    </div>
  );
}
