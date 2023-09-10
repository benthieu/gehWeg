import { Typography, Box, Stack, TextField } from '@mui/material';

type OfferCategoryProps = {
  categories: string[];
};

export function OfferCategory(props: OfferCategoryProps) {
  return (
    <Box mx={1}>
      <Stack direction="row" m={1}>
        <Typography variant="h6" mx={1}>
          Kategorie
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

export default OfferCategory;
