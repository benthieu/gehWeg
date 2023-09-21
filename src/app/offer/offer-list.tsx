import {Box, Divider, ListItemButton, ListItemText, Typography,} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {useContext, useEffect, useState} from 'react';
import StateContext from '../state/state.context';
import {Offer} from '../state/supabase/database.types';
import {formatCHDate} from '../utils/date-utils';
import OfferDetailModal from './offer-detail-modal';
import {FilterProps, ListFilter} from "../offer-list-filter/list-filter";

export function OfferList() {
  const {offers, loadFilterListOffers} = useContext(StateContext);
  const [activeOffer, setOfferActive] = useState<Offer | null>(null);
  const [filter, setFilter] = useState<FilterProps>({category: '', title: ''})
  useEffect(() => {
    loadFilterListOffers(filter);
  }, [filter]);

  function updateSelection(filter: FilterProps) {
    console.log('Filter change', filter);
    setFilter(filter);
    loadFilterListOffers(filter);
  }

  return (
    <>
      <div className="header">
        <h3>Angebote</h3>
      </div>
      <div>
        <ListFilter updateSelection={updateSelection}></ListFilter>
      </div>
      <List sx={{width: '100%'}}></List>
      {activeOffer ? (
        <OfferDetailModal
          offer={activeOffer}
          offerClosed={() => setOfferActive(null)}
        />
      ) : null}
      {offers.map((offer, index) => {
        return (
          <div key={index}>
            <ListItem alignItems="flex-start" disablePadding>
              <ListItemButton onClick={() => setOfferActive(offer)}>
                <img
                  className="list-item-image"
                  src={`https://picsum.photos/200?test=${index}`}
                />
                <ListItemText
                  primary={offer.subject}
                  secondary={offer.description}
                ></ListItemText>
                <Typography variant="overline">
                  <Box sx={{ color: 'text.disabled' }}>
                    {formatCHDate(offer.created_at)}
                  </Box>
                </Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </>
  );
}

export default OfferList;
