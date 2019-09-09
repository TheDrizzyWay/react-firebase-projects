import React, { createContext, useContext } from 'react';

const FirebaseContext = createContext(null);

export const withFirebase = Component => props => {
  const firebase = useContext(FirebaseContext);
  return <Component {...props} firebase={firebase} />;
};

export default FirebaseContext;
