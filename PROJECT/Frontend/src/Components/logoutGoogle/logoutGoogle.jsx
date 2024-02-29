import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useUser } from '../../contexts/context';

// Google API client ID
const clientId = "271649088931-1b1j0bon6p21cikasf1cksrpt3b3t5df.apps.googleusercontent.com";

// LogoutGoogle component for handling Google logout
function LogoutGoogle() {
    // Destructure currentUser and setUser from the useUser hook
    const { currentUser, setUser } = useUser();

    // Callback function for successful Google logout
    const onSuccess = () => {
        console.log("LOGOUT SUCCESS ");
        setUser(null);
    }

    return (
        <>
            <div id="signOutButton">
                {/* GoogleLogout component for handling Google logout */}
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={onSuccess}
                />
            </div>
        </>
    );
}

export default LogoutGoogle;
