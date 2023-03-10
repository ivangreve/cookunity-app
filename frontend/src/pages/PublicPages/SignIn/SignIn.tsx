import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { signIn } from "../services";
import { PrivateRoutes, Roles } from "../../../models";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../../store/states/user.state";
import { toast } from "react-hot-toast";

export default function SignInSide() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginInfo = {
      email: data.get("email") + "",
      password: data.get("password") + "",
    };

    try {
      const response = await signIn(loginInfo.email, loginInfo.password);
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));

      const role = response.data.user.role;
      if (role === Roles.CHEF) {
        navigation(PrivateRoutes.CHEF_PORTAL);
        return;
      }
      if (role === Roles.CUSTOMER) {
        navigation(PrivateRoutes.CUSTOMER_PORTAL);
        return;
      }
    } catch (e: any) {
      const errorMessage = e.data.message;
      toast.error(errorMessage);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://media.lacucinaitaliana.com/photos/5f63174d4012464e51027c15/1:1/pass/cook%20unity.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="/static/images/logo-chef.jpg"
            className="sign_in_cookunity_logo"
            alt=""
          />

          <h2>Login</h2>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
