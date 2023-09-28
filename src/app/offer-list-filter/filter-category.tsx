import { Box, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { useContext, useState } from 'react';
import StateContext from '../state/state.context';

type OfferCategoryProps = {
  updateCategory: (category: number) => void;
};

export function FilterCategory({ updateCategory }: OfferCategoryProps) {
  const { categories } = useContext(StateContext);
  const [value, setValue] = useState(0);

  const handleChange = (event: SelectChangeEvent) => {
    const value = parseInt(event.target.value);
    setValue(value);
    updateCategory(value);
  };

  return (
    <Box mx={1}>
      <Stack direction="column" m={1}>
        <Select
          labelId="filter-category-label"
          id="filter-category-select"
          value={value.toString()}
          label="Kategorie wählen"
          onChange={handleChange}
        >
          <MenuItem key={0} value={0}>
            Kategorie wählen
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Box>
  );
}

export default FilterCategory;
