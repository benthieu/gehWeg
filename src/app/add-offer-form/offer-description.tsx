import { TextField, Box, Stack, Tooltip} from '@mui/material';

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
        <Tooltip title="Beschreibung eingeben">
        <TextField
          label="Beschreibung"
          type="text"
          id="offer-title"
          multiline
          variant="outlined"
          onChange={(event) => {
            updateDescription(event.target.value);
          }}
        />
        </Tooltip>
      </Stack>
    </Box>
  );
}

export default OfferDescription;
