import {Box, MenuItem, Stack, TextField} from '@mui/material';

type OfferCategoryProps = {
  categories: string[];
  updateCategory: (category: string) => void;
};

export function OfferCategory({categories, updateCategory}: OfferCategoryProps) {
  return (
    <Box mx={1}>
      <Stack direction="column" m={1}>
        <TextField
          id="offer-category"
          label='Kategorie wählen'
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
