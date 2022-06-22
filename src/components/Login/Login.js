import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const actions = {
  USER_INPUT: "user-input",
  INPUT_BLUR: "input-blurred",
};

function emailReducer(state, action) {
  if (action.type === actions.USER_INPUT) {
    return { value: action.value, isValid: action.value.includes("@") };
  } else if (action.type === actions.INPUT_BLUR) {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
}

function passwordReducer(state, action) {
  if (action.type === actions.USER_INPUT) {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  } else if (action.type === actions.INPUT_BLUR) {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [password, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  useEffect(function(){
    const identifier = setTimeout(() => {
      setFormIsValid(emailState.isValid && password.isValid);
    },500);

    return () => {
      clearTimeout(identifier);
    }
  },[emailState, password])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: actions.USER_INPUT, value: event.target.value });

    setFormIsValid(emailState.isValid && password.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: actions.USER_INPUT, value: event.target.value });

    setFormIsValid(emailState.isValid && password.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: actions.INPUT_BLUR });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: actions.INPUT_BLUR });
    // console.log(password);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            password.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
