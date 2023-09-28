import {
  Box,
  Divider,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useContext, useEffect, useState } from 'react';
import { FilterProps, ListFilter } from '../offer-list-filter/list-filter';
import StateContext from '../state/state.context';
import { Offer } from '../state/supabase/database.types';
import { formatCHDate } from '../utils/date-utils';
import OfferDetailModal from './offer-detail-modal';
import { OfferImage } from './offer-image';

export function OfferList() {
  const { offers, loadFilterListOffers } = useContext(StateContext);
  const [activeOffer, setOfferActive] = useState<Offer | null>(null);
  const [filter, setFilter] = useState<FilterProps>({
    category: '',
    title: '',
  });
  useEffect(() => {
    loadFilterListOffers(filter);
  }, [filter]);
  function updateSelection(filter: FilterProps) {
    setFilter(filter);
    loadFilterListOffers(filter);
  }
  function handleOfferClosed(reload: boolean) {
    if (reload) {
      loadFilterListOffers(filter);
    }
    setOfferActive(null);
  }
  return (
    <>
      <div className="header">
        <h3>Angebote</h3>
      </div>
      <div>
        <ListFilter updateSelection={updateSelection}></ListFilter>
      </div>
      <List sx={{ width: '100%' }}></List>
      {activeOffer ? (
        <OfferDetailModal
          offer={activeOffer}
          offerClosed={(reload) => handleOfferClosed(reload)}
        />
      ) : null}
      {offers.map((offer, index) => {
        return (
          <div key={index}>
            <ListItem alignItems="flex-start" disablePadding>
              <ListItemButton onClick={() => setOfferActive(offer)}>
                {offer.images?.[0] && (
                  <OfferImage
                    className="list-item-image-wrapper"
                    width={60}
                    height={60}
                    image={offer.images?.[0]}
                  ></OfferImage>
                )}
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
