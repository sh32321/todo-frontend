import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [userContext, setUserContext] = useContext(UserContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    fetch(process.env.REACT_APP_API_ENDPOINT + "users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
      credentials: "include",
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Missing Credentials");
          } else if (response.status === 401) {
            setError("Invalid email or password");
          } else {
            setError("Something went wrong....");
          }
        } else {
          const data = await response.json();
          setUserContext((prev) => ({ ...prev, token: data.token }));
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError("Something went wrong....");
      });
  };

  return (
    <div className="log-in-container">
      <h3 className="title">My To Do List</h3>
      {error && <p className="error">{error}</p>}
      <form className="login-form" onSubmit={formSubmitHandler}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <Link to="/signup" className="sign-up-link">
        Sign up?
      </Link>
    </div>
  );
};

export default Login;
