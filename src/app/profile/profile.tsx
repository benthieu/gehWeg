import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useContext } from 'react';
import StateContext from '../state/state.context';

export function Profile() {
  const { users, activeUser, setUserActive } = useContext(StateContext);

  return (
    <>
      <div className="header">
        <h3>Benutzer auswählen</h3>
      </div>
      <List sx={{ width: '100%' }}>
        {users.map((user, index) => {
          const isActiveUser = user.id === activeUser?.id;
          return (
            <>
              <ListItem
                className={isActiveUser ? `active` : ``}
                key={index}
                alignItems="flex-start"
                disablePadding
              >
                <ListItemButton onClick={() => setUserActive(user.id)}>
                  <ListItemText primary={user.name}></ListItemText>
                  <Checkbox edge="end" checked={isActiveUser} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    </>
  );
}

export default Profile;
