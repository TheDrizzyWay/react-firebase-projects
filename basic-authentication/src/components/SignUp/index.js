import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { routes } from '../../constants/routes'

const initialState = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const SignUpFormBase = ({ firebase, history }) => {
    const [user, setUser] = useState(initialState);
    const changeHandler = (e) => {
        const { target: { name, value } } = e;
        setUser({ ...user, [name]: value });
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        const { username, email, passwordOne } = user;
        try {
            await firebase.emailSignUp(email, passwordOne);
            setUser(initialState);
            history.push(routes.HOME);
        } catch(error) {
            setUser({ ...user, error: error.message });
        }
    };
    const isInvalid = (
      user.passwordOne !== user.passwordTwo ||
      user.passwordOne === '' ||
      user.email === '' ||
      user.username === ''
    );

    return (
        <form onSubmit={submitHandler}>
            <input
            name="username"
            value={user.username}
            onChange={changeHandler}
            type="text"
            placeholder="Full Name"
            />
            <input
            name="email"
            value={user.email}
            onChange={changeHandler}
            type="text"
            placeholder="Email Address"
            />
            <input
            name="passwordOne"
            value={user.passwordOne}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            />
            <input
            name="passwordTwo"
            value={user.passwordTwo}
            onChange={changeHandler}
            type="password"
            placeholder="Confirm Password"
            />
            <button type="submit" disabled={isInvalid}>Sign Up</button>
            {user.error && <p>{user.error.message}</p>}
        </form>
      );
};

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

const SignUpPage = () => (
    <div>
      <h1>
        Signup Page
        <SignUpForm />
      </h1>  
    </div>
);

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
    );

export default SignUpPage;
export { SignUpLink, SignUpForm };
