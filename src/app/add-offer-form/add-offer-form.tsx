import { Box, Container, Grid } from '@mui/material';
import ImageLoader from './image-loader';

export function AddOfferForm() {
  return (
    // <Container>
    //   <Box display="flex" justifyContent="center" alignItems="center">
    //     <ImageLoader />
    //   </Box>
    // </Container>

    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <ImageLoader />
      </Grid>
      <Grid item xs={3}>
      Bezeichnung
      </Grid>
      <Grid item xs={3}>
      Kategorie
      </Grid>
      <Grid item xs={3}>
      Beschreibung
      </Grid>
      <Grid item xs={3}>
      Standort
      </Grid>
    </Grid>
  );
}
