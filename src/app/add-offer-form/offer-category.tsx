import { Typography, Box, Stack } from "@mui/material";

type OfferCategoryProps = {
    categories: string[];
}

export function OfferCategory(props: OfferCategoryProps) {
  return (
    <Box mx={1}>
      <Stack direction="row" m={1}>
        <Typography variant="h6" mx={1}>
          Kategorie
        </Typography>
  
      </Stack>
    </Box>
  );
}

export default OfferCategory;
