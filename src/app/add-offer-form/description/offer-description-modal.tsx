
import { Modal, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { LatLngLiteral, Tooltip } from 'leaflet';
import { useEffect, useState } from 'react';
import OfferDescription from './offer-description';
import { useDebounce } from 'use-lodash-debounce'; // Types seem not to exist

const style = {
  position: 'absolute' as 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  bgcolor: '#fafafa',
  boxShadow: 24,
  height: `300px`,
};

type OfferDescriptionProps = {
  description: string,
  updateDescription: (description: string) => void,
    addDescriptionClosed: (value: boolean) => void
};

export function OfferDescriptionModal({
  description,
  updateDescription,
  addDescriptionClosed
}: OfferDescriptionProps) {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState<string>();
  const debouncedValue = useDebounce(value, 800);

  useEffect(() => updateDescription(value as string), [debouncedValue]);

  console.log('offer desciptionmocal opened')

  const handleClose = () => {
    setOpen(false);
    addDescriptionClosed(true);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction="column" m={1} mt={3}>
          <TextField
            label="Beschreibung"
            type="text"
            id="offer-title"
            multiline
            variant="outlined"
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        </Stack>
      </Box>
    </Modal>
  );
}

export default OfferDescriptionModal;
