import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignUpForm from "./components/auth/SignUpForm";
import SignInForm from "./components/auth/SignInForm";
import { useState } from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ email: string | null } | null>(null);

  const handleLogin = (user: { email: string | null }) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('access_token');
  };
  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} user={currentUser} />
        <main>
          <Routes>
              <Route path="/" element={<SignInForm onLogin={handleLogin} />} />
              <Route path="/sign-up" element={<SignUpForm />} />
              <Route path="/tasks" element={<Link to="/sign-in">Go to Login</Link>} />
          </Routes>

        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
