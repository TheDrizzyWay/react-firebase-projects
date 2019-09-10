import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { routes } from '../../constants/routes';

const initialState = {
    email: '',
    error: ''
};

const PasswordForgetFormBase = ({ firebase }) => {
  const [forget, setForget] = useState(initialState);
  const changeHandler = (e) => {
    const { target: { name, value } } = e;
    setForget({ ...forget, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email } = forget;
    try {
        await firebase.resetPassword(email);
        setForget(initialState);
    } catch(error) {
        setForget({ error: error.message });
    }
  };

  const isInvalid = forget.email === '';

  return (
    <form onSubmit={submitHandler}>
      <input
        name="email"
        value={forget.email}
        onChange={changeHandler}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {forget.error && <p>{forget.error.message}</p>}
    </form>
  );
};

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

const PasswordForgetPage = () => (
    <div>
        <h1>PasswordForget</h1>
        <PasswordForgetForm />
    </div>
);

const PasswordForgetLink = () => (
    <p>
      <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
  );

export default PasswordForgetPage;
export { PasswordForgetForm, PasswordForgetLink };
