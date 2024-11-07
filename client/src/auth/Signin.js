import { useApolloClient, useMutation } from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SIGNIN_USER } from "../gqlQueries/Mutations";

export default function Login() {
  const navigate = useNavigate();
  const client = useApolloClient();

  const searchString = window.location.href;
  const [signinUser, {data, loading, error}] = useMutation(SIGNIN_USER,{
    onCompleted(data){
        localStorage.setItem("token", data?.user?.token);
          navigate("/");
    },
    onError(error){
    }
  });
  const editUser = searchString.includes("editUser");
  const { id } = useParams();
  const [details, setDetails] = useState({
    email: "",
    password: null,
  });

  const [openSnack, setOpenSnack] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    signinUser({
      variables: {
        userSignIn: details,
      },
    })
    client.clearStore();
  };

  return (
    <Box
      border={1}
      borderRadius={6}
      width={{ xs: "80%", md: "460px", lg: "460px" }}
      boxShadow={4}
      m={"auto"}
      my={4}
      p={{ xs: 1, lg: 4, md: 4 }}
    >
      <Stack display="flex" direction={"column"} alignItems={"center"} mt={4}>
        <Typography variant="h5" fontWeight={"bold"} m={"auto"}>
          Login{" "}
        </Typography>
        <TextField
          size="sm"
          sx={{
            width: { xs: "80%", md: "360px", lg: "360px" },
            marginTop: "18px",
          }}
          name="email"
          label="Email"
          variant="outlined"
          value={details.email}
          onChange={handleChange}
        />
        <TextField
          size="sm"
          sx={{
            width: { xs: "80%", md: "360px", lg: "360px" },
            marginTop: "18px",
          }}
          name="password"
          label="password"
          variant="outlined"
          value={details.password}
          onChange={handleChange}
        />
        {loading ? (
          <CircularProgress sx={{ margin: "12px" }} />
        ) : (
          <Button
            variant="contained"
            sx={{
              width: { xs: "60%", md: "180px", lg: "180px" },
              marginTop: "34px",
            }}
            size="md"
            onClick={() => handleSubmit()}
          >
            Login
          </Button>
        )}
        <br />
        <Button variant="text" onClick={() => navigate("/signup")}>
          New User ?
        </Button>
      </Stack>
      <Snackbar
        open={!loading}
        autoHideDuration={3000}
        onClose={() => setOpenSnack({ ...openSnack, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnack({ ...openSnack, open: false })}
          severity={openSnack.severity}
          sx={{ width: "100%" }}
        >
          {error && error.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
