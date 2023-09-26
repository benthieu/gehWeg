import {Box, InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from '@mui/material';
import {useState} from 'react';

type OfferCategoryProps = {
  categories: string[];
  updateCategory: (category: string) => void;
};

export function FilterCategory({categories, updateCategory}: OfferCategoryProps) {

  const [value, setValue] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    updateCategory(event.target.value as string);
  };

  return (
    <Box mx={1}>
      <Stack direction="column" m={1}>
        <InputLabel id="filter-category-label">Kategorie wählen</InputLabel>
        <Select
          labelId="filter-category-label"
          id="filter-category-select"
          value={value}
          label="Kategorie wählen"
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Box>
  );
}

export default FilterCategory;
