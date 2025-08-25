import "../styles/Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div>
      <a
        href="https://www.instagram.com/vital_bracelet/"
        className="btn-inst"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="btn-inst"
          src={require("../img/iconoinst.png")}
          alt="instagram"
        />
      </a>

      <button
        className="btn-up"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img
          className="btn-up"
          src={require("../img/flechaarriba.png")}
          alt="Ir arriba"
        />
      </button>

      <div className="header">
        <nav className="navbar">
          <div className="div-logo">
            <Link to="/" className="logo">
              VB
            </Link>
          </div>

          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <p
                className="nav-link"
                onClick={() => handleScrollTo("sobre nosotros")}
              >
                Sobre Nosotros
              </p>
            </li>
            <li className="nav-item">
              <p
                className="nav-link"
                onClick={() => handleScrollTo("artículos")}
              >
                Artículos
              </p>
            </li>
            <li className="nav-item">
              <p
                className="nav-link"
                onClick={() => handleScrollTo("contacto")}
              >
                Contacto
              </p>
            </li>
            <li className="nav-item">
              <p
                className="nav-link"
                onClick={() => handleScrollTo("aquí_no_hay_nada")}
              >
                Comprar
              </p>
            </li>
            <li className="nav-item">
              <Link to="/plagueMap" className="btn-navbar">
                Plague Map
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/profile" className="btn-navbar">
                    Perfil de {user.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/primary" className="btn-navbar">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dates" className="btn-navbar">
                    Datos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/"
                    onClick={() => {
                      logout();
                    }}
                    className="btn-navbar"
                  >
                    Salir
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn-navbar">
                    Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn-navbar">
                    Registrarte
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
