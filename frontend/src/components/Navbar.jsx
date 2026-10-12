import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand" to="/">🐾 PetConnect</Link>
        <nav>
          <Link to="/pets">Find Pets</Link>
          {user && <Link to="/favorites">Favorites</Link>}
          {user?.role === "adopter" && <Link to="/applications">Applications</Link>}
          {(user?.role === "shelter" || user?.role === "admin") && <Link to="/dashboard">Dashboard</Link>}
          {user ? (
            <>
              <Link to="/profile">{user.name}</Link>
              <button className="link-btn" onClick={signOut}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link className="nav-cta" to="/register">Join Us</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
