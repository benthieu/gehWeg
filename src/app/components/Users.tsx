import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

type User = { name: string };

function Users() {
  const supabase = useSupabaseClient()
  const [user, setUser] = useState<User[] | null>([]);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const { data } = await supabase.from('_user').select();
    console.log('data fetched: ', data);
    if (data) setUser(data);
  }

  return (
    <ul>
      <h1>User: </h1>
      {user
        ? user.map((user: User) => <li key={user.name}>{user.name}</li>)
        : 'No user found'}
    </ul>
  );
}

export default Users;
