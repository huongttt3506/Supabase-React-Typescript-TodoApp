import React, { useState } from "react";
import { signIn } from "../../api/Auth";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const SignInForm = ({
  onLogin,
}: {
  onLogin: (user: {
    email: string | null;
    userId: string | null;
    accessToken: string | null;
  }) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { user, accessToken, refreshToken } = await signIn(email, password);
      setMessage(`Login successful! Wellcome ${user?.email}`);
      onLogin({
        email: user?.email ?? null,
        userId: user?.id ?? null,
        accessToken: accessToken ?? null,
      });
      navigate("/tasks");
    } catch (error: any) {
      setMessage(`Login failed: ${error.message}`);
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
        <form onSubmit={handleSubmit}>
        <div style={{ textAlign: "center" }}>
          <h2>Login</h2>
        </div>
        <div>
          <div>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="outlined-start-adornment"
              sx={{ m: 1, width: "50ch" }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <div>
            <FormControl sx={{ m: 1, width: "50ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <div>
            <Button variant="contained" type="submit" sx={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "50ch",
          }}>Login</Button>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
            Don't have an account? <Link to='/sign-up'>Sign Up</Link>
            {message && <p>{message}</p>}
        </div>
    </form>

      </Box>
    
  );
};
export default SignInForm;
