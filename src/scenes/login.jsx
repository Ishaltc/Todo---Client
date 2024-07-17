import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Link, TextField, Typography, Snackbar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { login } from "../api/auth";
import { setLoggedInUser, setUser } from "../state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [payload, setPayload] = useState({ email: "", password: "" });
  const [open, setOpen] = useState(false);
  const [success,setSuccess] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "20px",
    width: "40%",
    margin: "19px auto",
    backgroundColor: "#E6F4F1",
    borderRadius: "12px",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 25)",
  };
  const avatarStyle = { backgroundColor: "#D9D9D9" };
  const btnstyle = { backgroundColor: "#1B6DA1", margin: "12px 0" };
  const logoStyle = {
    backgroundColor: "#D9D9D9",
    margin: "10px 0",
    width: 70,
    height: 70,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await login(payload);
      if (response && response.success) {
        dispatch(
          setLoggedInUser({
            id: response.data.id,
            email: response.data.email,
            token: response.data.token,
          })
        );
        dispatch(setUser(true))
        setSuccess(true)
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          navigate("/");
        }, 1500);
      } else {
        setSuccess(false)
        setOpen(true);
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error in login", error);
    }
  };

  return (
    <Grid>
      <Grid align="center">
        <Avatar style={logoStyle}>
          <LocationCityIcon
            style={{ color: "#002A57", width: 56, height: 56 }}
          />
        </Avatar>
        <h2>Ansrsource</h2>
      </Grid>

      <Paper elavation={12} style={paperStyle}>
        <form onSubmit={handleLogin}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon style={{ color: "#002A57" }} />
            </Avatar>
            <h2>Login</h2>
          </Grid>
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            placeholder="Enter Your Email"
            fullWidth
            required
            name="email"
            value={payload.email}
            onChange={handleChange}
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            placeholder="Enter Your Password"
            type="password"
            fullWidth
            required
            name="password"
            value={payload.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember Me"
          />

          <Button
            style={btnstyle}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
          >
            Login
          </Button>

          <Typography>
            Don't have an account?
            <Link href="/sign-up">Sign Up Here.</Link>
          </Typography>
        </form>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={1500}
        message = {success? "Logged in successfully ": "Invalid credentials"}
        onClose={() => setOpen(false)}
      />
    </Grid>
  );
};

export default Login;
