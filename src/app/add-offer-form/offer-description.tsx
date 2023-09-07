import { ListItem, ListItemButton, ListItemText, Typography, Divider } from "@mui/material";

type OfferDescriptionProps = {
    description: string;
}

export function OfferDescription(props: OfferDescriptionProps) {
  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton>
          <ListItemText
            primary={'Beschreibung'}
          ></ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}

export default OfferDescription;
