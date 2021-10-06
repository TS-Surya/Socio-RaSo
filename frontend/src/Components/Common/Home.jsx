import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <h2>Hello Welcome to Socio-RaSo</h2>
      <h3>An Social Media app for coders</h3>
      <div className="links">
        <Link to="/auth/login">Login</Link>
        <Link to="/auth/register">Register</Link>
      </div>
    </div>
  );
}
