import React, { useState } from "react";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import { data } from "./data.js";
import {
  Button,
  Typography,
  Container,
  TextField,
  makeStyles,
  MenuItem,
  Select,
  Snackbar
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    top: "20vh",
    display: "flex",
    flexDirection: "column"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },

  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  head: {
    top: "35vh",
    position: "relative",
    color: "#F5F5F5"
  },
  head1: {
    top: "20vh",
    position: "relative",
    textDecorationLine: "underline",
    fontWeight: "bold"
  },
  leftPane: {
    height: "100vh",
    width: "50%",
    color: "#F5F5F5"
  },
  rightPane: {
    width: "50%"
  },
  splitScreen: {
    display: "flex",
    flexDirection: "row",
    backgroundSize: "cover"
  },
  drop: {
    top: "-5vh"
  }
}));
export function LoginForm(props) {
  var plant_data = JSON.stringify(data);
  console.log("plant_data:::", plant_data);
  if (typeof plant_data !== "undefined") {
    var jsonParse = JSON.parse(plant_data);
    console.log("jsonParse ", jsonParse);
    console.log("ty")
  } else {
    console.log(plant_data);
  }

  const [flag, setflag] = React.useState(false);
  const handleflag = (event) => {
    setflag(event.target.value);
  };
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(data);
    console.log(typeof data);
  };

  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null
  });
  const classes = useStyles();

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      email: state.email,
      password: state.password
    };

    axios
      .post("http://localhost:3001/v1/user/login", payload)
      .then(function (response) {
        if (response.status === 200) {
          console.log("successfully logged in");
          console.log(JSON.stringify(response));
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login successful. Redirecting to home page.."
          }));
          redirectToHome();
        } else if (response.code === 204) {
          alert("Invalid credentials");
          console.log(JSON.stringify(response));
          setflag(true);
          handleflag();
          props.showError("Username and password do not match");
          console.log("password did not match");
        } else {
          alert("Invalid credentials");
          console.log(JSON.stringify(response));

          props.showError("Username does not exists");
          console.log("Sorry!! You cannot access this portal");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const redirectToHome = () => {
    props.history.push("/spoc_home");
  };

  return (

        <Container fixed maxWidth="xs">
      <div className={classes.paper}>
            <Typography
              component="h1"
              variant="h4"
              color="textPrimary"
              align="left"
            >
              Login
            </Typography>
       
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth
                onChange={handleChange}
                value={state.email}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth
                onChange={handleChange}
                value={state.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Type of user
                </InputLabel>
                <Select value={age} onChange={handleChange}>
                  <MenuItem value={"SPOC"}>SPoC</MenuItem>
                  <MenuItem value={"DQM"}>DQM</MenuItem>
                </Select>

              </FormControl>
              <Button
                type="submit"
                fullWidth
                color="primary"
                onClick={handleSubmitClick}
                className={classes.submit}
              >
                Sign In
              </Button>   </div>

{/* <Typography>{jsonParse[0].plant}</Typography>
<Typography>{typeof(jsonParse)}</Typography> */}


{jsonParse.map(action => (
<Typography>
  {action.plant}
</Typography>
      ))}
        </Container>);
}

export default LoginForm;
