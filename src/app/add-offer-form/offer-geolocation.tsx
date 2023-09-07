import { ListItem, ListItemButton, ListItemText, Typography, Divider } from "@mui/material";

type OfferGeolocationProps = {
    title: string;
}

export function OfferGeolocation(props: OfferGeolocationProps) {
  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton>
          <ListItemText
            primary={'Standort'}
          ></ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}

export default OfferGeolocation;
