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
      <Stack direction="column" m={1} mt={3}>
        {/* <Typography variant="h6" mx={1}>
          Beschreibung
        </Typography> */}
        <TextField
          label="Beschreibung eingeben"
          type="text"
          id="offer-title"
          multiline
          variant="outlined"
          onChange={(event) => {
            updateDescription(event.target.value);
          }}
        />
      </Stack>
    </Box>
  );
}

export default OfferDescription;
