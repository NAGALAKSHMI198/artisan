import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false); // false for login, true for register
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Automatically detect auth state changes (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // currentUser is null if logged out
      setError(""); // clear errors on auth change
    });
    return unsubscribe; // cleanup listener on unmount
  }, []);

  // Handle form submit to register or login user
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      if (register) {
        // Register user with email and password
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // Login user with email and password
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  // Logout function
  async function handleLogout() {
    await signOut(auth);
    setUser(null);
  }

  // If logged in, show welcome and logout
  if (user) {
    return (
      <div>
        <p>Welcome, {user.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  // If not logged in, show login/register form
  return (
    <form onSubmit={handleSubmit}>
      <h2>{register ? "Register" : "Login"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{register ? "Register" : "Login"}</button>
      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => setRegister(!register)}
      >
        {register ? "Already have an account? Login" : "New user? Register"}
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
