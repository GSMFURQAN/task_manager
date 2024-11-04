import { useMutation } from "@apollo/client";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SIGNUP_USER } from "../gqlQueries/Mutations";

export default function Signup() {
  const navigate = useNavigate();
  const searchString = window.location.href;
const [signupUser,{data, error, loading}] = useMutation(SIGNUP_USER)

  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
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
    signupUser({
        variables:{
            newuser: details
        }
    })
    setOpenSnack({...openSnack, open:true})
  };
console.log('dse',data?.user?.name)
  return (
    <>
      <Stack direction={"column"} mx={"38%"} mt={8}>
        <Typography variant="h5" fontWeight={"bold"} m={"auto"}>
          Register
        </Typography>
        <TextField
          size="sm"
          sx={{ width: "360px", marginTop: "18px" }}
          name="name"
          label="Name"
          variant="outlined"
          value={details.name}
          onChange={handleChange}
        />
        <TextField
          size="sm"
          sx={{ width: "360px", marginTop: "18px" }}
          name="email"
          label="Email"
          variant="outlined"
          value={details.email}
          onChange={handleChange}
        />
        <TextField
          size="sm"
          sx={{ width: "360px", marginTop: "18px" }}
          name="password"
          label="password"
          variant="outlined"
          value={details.password}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          sx={{ width: "200px", marginLeft: "76px", marginTop: "34px" }}
          size="md"
          onClick={() => handleSubmit()}
        >
          {loading ? 'Processing...' : 'Signup'}
        </Button>
        <Snackbar
          open={loading}
          autoHideDuration={3000}
          onClose={() => setOpenSnack({ ...openSnack, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setOpenSnack({ ...openSnack, open: false })}
            severity={openSnack.severity}
            sx={{ width: "100%" }}
          >
            {`You've sucessfully registered with us, ${data?.user?.name}`}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
