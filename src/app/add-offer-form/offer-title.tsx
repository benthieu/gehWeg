import { ListItem, ListItemButton, ListItemText, Typography, Divider } from "@mui/material";

type OfferTitleProps = {
    title: string;
}

export function OfferTitle(props: OfferTitleProps) {
  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton>
          <ListItemText
            primary={'Titel'}
          ></ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
}

export default OfferTitle;
