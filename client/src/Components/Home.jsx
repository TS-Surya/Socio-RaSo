import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>Hello Coder</h1>

      <div className="links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Home;
