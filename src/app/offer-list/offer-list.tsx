import {
  Box,
  Divider,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useContext, useEffect } from 'react';
import StateContext from '../state/state.context';

export function OfferList() {
  const { offers } = useContext(StateContext);
  useEffect(() => {
    console.log('offers', offers);
  }, [offers]);

  return (
    <>
      <div className="header">
        <h3>Angebote</h3>
      </div>
      <List sx={{ width: '100%' }}></List>
      {offers.map((offer, index) => {
        const offerDate = new Date(offer.created_at);
        const formattedDate = offerDate.toLocaleDateString('de-CH');
        return (
          <>
            <ListItem key={index} alignItems="flex-start" disablePadding>
              <ListItemButton>
                <img
                  className="list-item-image"
                  src={`https://picsum.photos/200?test=${index}`}
                />
                <ListItemText
                  primary={offer.subject}
                  secondary={offer.description}
                ></ListItemText>
                <Typography variant="overline">
                  <Box sx={{ color: 'text.disabled' }}>{formattedDate}</Box>
                </Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        );
      })}
    </>
  );
}

export default OfferList;
