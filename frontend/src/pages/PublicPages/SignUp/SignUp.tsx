import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signUp } from "../services";
import { PublicRoutes } from "../../../models";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Poppins, sans-serif';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
        }
      `,
    },
  },
});

export default function SignInSide() {
  const navigation = useNavigate();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const signUpInfo = {
      email: data.get("email") + "",
      name: data.get("name") + "",
      password: data.get("password") + "",
      image: data.get("image") + "",
      role: data.get("isChef") === "on" ? "CHEF" : "CUSTOMER",
    };

    toast
      .promise(
        signUp(
          signUpInfo.name,
          signUpInfo.email,
          signUpInfo.password,
          signUpInfo.image,
          signUpInfo.role
        ),
        {
          loading: "Creating User...",
          success: <b>User Registered!</b>,
          error: (e) => {
            return <b>{e.data.message}</b>;
          },
        }
      )
      .then(() => {
        navigation(PublicRoutes.SIGN_IN);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
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
              style={{ width: "90px", borderRadius: "20px" }}
              alt=""
            />

            <h2>Register</h2>
            <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
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
              <TextField
                margin="normal"
                fullWidth
                id="image"
                label="User Image"
                name="image"
                autoComplete="image"
                autoFocus
              />
              <FormControlLabel
                name="isChef"
                control={<Checkbox />}
                label="I'm a Chef"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/sign-in" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
