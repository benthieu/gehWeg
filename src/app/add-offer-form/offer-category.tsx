import {Box, MenuItem, Stack, TextField, Typography} from '@mui/material';

type OfferCategoryProps = {
  categories: string[];
  updateCategory: (category: string) => void;
};

export function OfferCategory({categories, updateCategory}: OfferCategoryProps) {
  return (
    <Box mx={1}>
      <Stack direction="row" m={1}>
        <Typography variant="h6" mx={1}>
          Kategorie
        </Typography>
        <TextField
          id="offer-category"
          select
          variant="standard"
          onChange={(event) => {updateCategory(event.target.value)}}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </Box>
  );
}

export default OfferCategory;
