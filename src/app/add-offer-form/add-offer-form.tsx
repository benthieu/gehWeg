import ImageLoader from './image-loader';
import OfferTitle from './offer-title';
import OfferCategory from './offer-category';
import OfferDescription from './offer-description';
import OfferGeolocation from './offer-geolocation';
import { Button, Grid } from '@mui/material';

export function AddOfferForm() {
  return (
    <>
      <div className="header">
        <h3>Angebot erfassen</h3>
      </div>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <ImageLoader />
        </Grid>
        <Grid item xs={3}>
          <OfferDescription description={''} />
        </Grid>
        <Grid item xs={3}>
          <OfferTitle title={''} />
        </Grid>
        <Grid item xs={3}>
          <OfferCategory categories={[]} />
        </Grid>
        <Grid item xs={3}>
          <OfferGeolocation title={''} />
        </Grid>
        <Grid  mb={1}>
        <Button>Speichern</Button>
        </Grid>
      </Grid>
    </>
  );
}
