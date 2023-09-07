import { ListItem, ListItemButton, ListItemText, Typography, Divider } from "@mui/material";

type OfferCategoryProps = {
    categories: string[];
}

export function OfferCategory(props: OfferCategoryProps) {
  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton>
          <ListItemText
            primary={'Kategorie'}
          ></ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}

export default OfferCategory;
