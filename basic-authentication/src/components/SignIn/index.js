import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import { routes } from '../../constants/routes';

const initialState = {
    email: '',
    password: '',
    error: null,
};

const SignInFormBase = ({ firebase, history }) => {
    const [user, setUser] = useState(initialState);
    const changeHandler = (e) => {
        const { target: { name, value } } = e;
        setUser({ ...user, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const { email, password } = user;
        try {
            await firebase.emailSignIn(email, password);
            setUser(initialState);
            history.push(routes.HOME);
        } catch(error) {
            setUser({ ...user, error: error.message });
        }
    };

    const isInvalid = user.password === '' || user.email === '';

    return (
        <form onSubmit={submitHandler}>
            <input
                name="email"
                value={user.email}
                onChange={changeHandler}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="password"
                value={user.password}
                onChange={changeHandler}
                type="password"
                placeholder="Password"
            />
            <button disabled={isInvalid} type="submit">
            Sign In
            </button>
            {user.error && <p>{user.error.message}</p>}
        </form>
    );
};

const SignInForm = withRouter(withFirebase(SignInFormBase));

const SignInPage = () => (
    <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink /> 
    </div>
);

export default SignInPage;
export { SignInForm };
