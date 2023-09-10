import {
  Typography,
  Box,
  Stack,
  TextField,
} from '@mui/material';

type OfferGeolocationProps = {
  title: string;
};

export function OfferGeolocation(props: OfferGeolocationProps) {
  return (
    <Box mx={1}>
      <Stack direction="row" m={1}>
        <Typography variant="h6" mx={1}>
          Standort
        </Typography>
        <TextField
          type="text"
          id="offer-title"
          multiline
          variant="standard"
        />
      </Stack>
    </Box>
  );
}

export default OfferGeolocation;
