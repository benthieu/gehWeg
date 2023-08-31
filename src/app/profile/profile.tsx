import { useContext, useEffect } from 'react';
import StateContext from '../state/state.context';

export function Profile() {
  const { users } = useContext(StateContext);
  useEffect(() => {
    console.log('users', users);
  }, [users]);

  return (
    <ul>
      {users.map((user, index) => {
        return <li key={index}>Name: {user.name}</li>;
      })}
    </ul>
  );
}

export default Profile;
