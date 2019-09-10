import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from '../Firebase';
import { setUsers } from '../../actions';

const UserList = ({ users }) => (
    <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
    </ul>
);

const Admin = ({ firebase, users, setUsers }) => {
    useEffect(() => {
        firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
              }));
            setUsers(usersList);
        })
        return () => firebase.users().off();
    }, [firebase, setUsers]);

    return (
        <div>
          <h1>Admin</h1>
          <UserList users={users} />
        </div>
    );
};

const mapStateToProps = state => ({
    users: state.users.usersList
 });

export default connect(mapStateToProps, { setUsers })(withFirebase(Admin));
