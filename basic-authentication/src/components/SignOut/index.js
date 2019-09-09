import React from 'react';
import { withFirebase } from '../Firebase';

const SignOut = ({ firebase }) => {
    const signOut = async () => await firebase.signOut();
    return (
        <div>
            <button type="button" onClick={signOut}>
            Sign Out
            </button>
        </div>
    );
};

const SignOutButton = withFirebase(SignOut);

export default SignOutButton;
