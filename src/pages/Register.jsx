import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [userContext, setUserContext] = useContext(UserContext);

  const fromSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    fetch(process.env.REACT_APP_API_ENDPOINT + "users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, username: email, password }),
      credentials: "include",
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill the missing fields");
          } else if (response.status === 401) {
            setError("Invalid email or password");
          } else if (response.status === 500) {
            const data = await response.json();
            if (data.message) {
              setError(data.message || "Something went wrong....");
            } else {
              setError("Something went wrong....");
            }
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
    <div className="signup-container">
      {error && <p className="error">{error}</p>}
      <h3 className="title">My To Do List</h3>
      <form className="signup-form" onSubmit={fromSubmitHandler}>
        <input
          placeholder="First Name"
          type="text"
          value={firstName}
          className="signup-input"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          placeholder="Last Name"
          type="text"
          value={lastName}
          className="signup-input"
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          value={email}
          placeholder="Email"
          className="signup-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          className="signup-input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <Link to="/" className="log-in-link">
        Log In?
      </Link>{" "}
    </div>
  );
};

export default Register;
