import React, { useState } from 'react';
import { withFirebase } from '../Firebase';

const initialState = {
    passwordOne: '',
    passwordTwo: '',
    error: ''
};

const PasswordChangeForm = ({ firebase }) => {
    const [password, setPassword] = useState(initialState);
    const changeHandler = (e) => {
        const { target: { name, value } } = e;
        setPassword({ ...password, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const { passwordOne } = password;
        try {
            await firebase.updatePassword(passwordOne);
            setPassword(initialState);
        } catch(error) {
            setPassword({ error: error.message });
        }
    };

    const isInvalid =
    password.passwordOne !== password.passwordTwo || password.passwordOne === '';

    return (
        <form onSubmit={submitHandler}>
          <input
            name="passwordOne"
            value={password.passwordOne}
            onChange={changeHandler}
            type="password"
            placeholder="New Password"
          />
          <input
            name="passwordTwo"
            value={password.passwordTwo}
            onChange={changeHandler}
            type="password"
            placeholder="Confirm New Password"
          />
          <button disabled={isInvalid} type="submit">
            Reset My Password
          </button>
          {password.error && <p>{password.error.message}</p>}
        </form>
      );
};

export default withFirebase(PasswordChangeForm);
