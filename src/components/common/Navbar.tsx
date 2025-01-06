import supabase from "../../supabase";

const Navbar = ({ 
    isLoggedIn, 
    onLogout, 
    user, 
}: { 
    isLoggedIn: boolean, 
    onLogout: () => void; 
    user: { email: string | null} | null; 
}) => {
  return (
    <header>
      <nav>
        <h1>Todo App</h1>
        <div>
          {isLoggedIn ? (
            <div>
              <span>Welcome back, { user?.email || 'Guest'}!</span>
              <button onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <div>
             
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
