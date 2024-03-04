import React, { useState } from "react";
import { getAuth, EmailAuthProvider } from "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Navigate } from "react-router-dom";

const firebaseUIConfig = {
  signInOptions: [
    { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
  ],
  signInFlow: "popup",
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

export default function LoginPage(props) {
  const auth = getAuth(); // Corrected from getPardon to getAuth

  const [email, setEmail] = useState("");
  const [proceed, setProceed] = useState(false);

  if (props.user) {
    return <Navigate to="/home" />;
  }

  let loadingOrLoggedIn = false;
  if (props.user || props.loading) {
    loadingOrLoggedIn = true;
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.endsWith("@uw.edu")) {
      setProceed(true);
    } else {
      alert("Please use an email ending with @uw.edu.");
    }
  };

  return (
    <div className="login-container">
      {!loadingOrLoggedIn && !proceed && (
        <div className="login-box">
          <div className="login-text">
            <h1 className="signInTitle">Login to continue</h1>
            <p>
              Please enter your uw email
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your @uw.edu email"
              required
            />
            <button type="submit">Proceed</button>
          </form>
        </div>
      )}
      {proceed && (
        <StyledFirebaseAuth
          uiConfig={firebaseUIConfig}
          firebaseAuth={getAuth()}
        />
      )}
    </div>
  );
}