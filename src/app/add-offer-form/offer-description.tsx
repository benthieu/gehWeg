import { TextField, Box, Stack, Typography } from '@mui/material';

type OfferDescriptionProps = {
  description: string;
  updateDescription: (description: string) => void;
};

export function OfferDescription({
  description,
  updateDescription,
}: OfferDescriptionProps) {
  return (
    <Box mx={1}>
      <Stack direction="row" m={1}>
        <Typography variant="h6" mx={1}>
          Beschreibung
        </Typography>
        <TextField
          type="text"
          required
          id="offer-title"
          multiline
          variant="standard"
          onChange={(event) => {
            updateDescription(event.target.value);
          }}
        />
      </Stack>
    </Box>
  );
}

export default OfferDescription;
