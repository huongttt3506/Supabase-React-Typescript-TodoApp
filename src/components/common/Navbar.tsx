import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout, user }: { 
    isLoggedIn: boolean, 
    onLogout: () => void; 
    user: { email: string | null} | null; 
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <div>
        {isLoggedIn ? (
          <div>
            Welcome back, {user?.email || 'Guest'}!
            <Button onClick={handleLogout} color="inherit">Logout</Button>
          </div>) : (<div></div>)}
      </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
