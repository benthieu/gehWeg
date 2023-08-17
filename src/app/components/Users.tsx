import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://sjnxrpazstalmggosrcy.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqbnhycGF6c3RhbG1nZ29zcmN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIxMjIyNjcsImV4cCI6MjAwNzY5ODI2N30.oL_LjLWYH_V0HjxPCwjPt1NXaosiXKQbCDugQDELOP8'
);

type User = { name: string };

function Users() {
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
