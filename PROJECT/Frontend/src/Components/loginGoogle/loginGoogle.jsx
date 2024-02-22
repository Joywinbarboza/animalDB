import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useUser } from '../../contexts/context';

// Google API client ID
const clientId = "271649088931-1b1j0bon6p21cikasf1cksrpt3b3t5df.apps.googleusercontent.com";

// LoginGoogle component for handling Google authentication
function LoginGoogle() {
    // Destructure currentUser and setUser from the useUser hook
    const { currentUser, setUser } = useUser();

    // Callback function for successful Google login
    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS ", res.profileObj);
        setUser(res.profileObj.name);
    }

    // Callback function for failed Google login
    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }

    return (
        <>
            <div id="signInButton">
                {/* GoogleLogin component for handling Google authentication */}
                <GoogleLogin
                    clientId={clientId}
                    buttonText='Login'
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    redirectUri={'redirect'}
                />
                {/* Display a greeting if a user is logged in */}
                {currentUser && <p>HI {currentUser}!!</p>}
            </div>
        </>
    );
}

export default LoginGoogle;
