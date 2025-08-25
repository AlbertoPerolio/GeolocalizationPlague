import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LeerMas from "./pages/LeerMas";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import PlagueMap from "./pages/PlagueMap";
import Primary from "./pages/Primary";
import Dates from "./pages/Dates";
import Profile from "./pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="main-content">
            <Routes>
              {/* rutas públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/leerMas" element={<LeerMas />} />
              <Route path="/plagueMap" element={<PlagueMap />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/* rutas protegidas */}
              <Route element={<ProtectedRoute />}>
                <Route path="/primary" element={<Primary />} />
                <Route path="/dates" element={<Dates />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
