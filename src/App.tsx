import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignUpForm from "./components/auth/SignUpForm";
import SignInForm from "./components/auth/SignInForm";
import { useState } from "react";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('access_token');
  };
  return (
    <Router>
      <div>
        <h1>Welcome to the Todo App</h1>
        {isLoggedIn ? (
          <div>
            <p>You're logged in!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <p>You are not logged in. Please log in or sign up!</p>
            <Routes>
              <Route path="/sign-up" element={<SignUpForm />} />
              <Route path="/sign-in" element={<SignInForm />} />
              <Route path="/" element={<Link to="/sign-in">Go to Login</Link>} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
