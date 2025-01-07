import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import SignUpForm from "./components/auth/SignUpForm";
import SignInForm from "./components/auth/SignInForm";
import { useEffect, useState } from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import TaskLayout from "./components/tasks/TasksLayout";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ 
    email: string | null; 
    userId: string | null 
  } | null>(null);
  
  useEffect(() => {
    // Check user info in localStorage
    const savedUserId = localStorage.getItem('userId');
    const savedUserEmail = localStorage.getItem('userEmail');
    
    if (savedUserId && savedUserEmail) {
      setIsLoggedIn(true);
      setCurrentUser({
        email: savedUserEmail,
        userId: savedUserId
      });
    }
  }, []);

  const handleLogin = (user: { 
    email: string | null; 
    userId: string | null 
  }) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
  };


  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

  };
  return (
  <Router>
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} user={currentUser} />
      <main>
        <Routes>
          <Route path="/" element={<SignInForm onLogin={handleLogin} />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/tasks" element={<TaskLayout /> } />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
  );
};

export default App;
