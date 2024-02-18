import { getAuth, EmailAuthProvider } from "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Navigate } from "react-router-dom";

//an object of configuration values
const firebaseUIConfig = {
  // allow email sign in
  signInOptions: [
    { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
  ],
  signInFlow: 'popup', //don't redirect to authenticate
  credentialHelper: 'none', //don't show the email account chooser
  callbacks: {
    signInSuccessWithAuthResult: () => {
      return false; //don't redirect after authentication
    }
  }
}

// Takes in user object
// Takes in loading
export default function LoginPage(props) {
  //access the "authenticator"
  const auth = getAuth();

  // Redirect to profile page when logged in
  if (props.user) {
    return <Navigate to="/home" />
  }

  let loadingOrLoggedIn = false;
  if(props.user || props.loading) {
    loadingOrLoggedIn = true;
  }

  return (
    <div>
      {!loadingOrLoggedIn &&
        <div className='container login-container text-center'>
          <div className='login-text'>
            <h1>Login to continue</h1>
            <p>With an account you can upload your own items and request other user's items.</p>
          </div>
            <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
        </div>
      }
    </div>
  );
}