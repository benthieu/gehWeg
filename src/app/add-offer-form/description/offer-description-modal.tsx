import { Modal, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  bgcolor: '#fafafa',
  boxShadow: 24,
  height: `290px`,
};

type OfferDescriptionProps = {
  description: string;
  updateDescription: (description: string) => void;
  addDescriptionClosed: (value: boolean) => void;
};

export function OfferDescriptionModal({
  description,
  updateDescription,
  addDescriptionClosed,
}: OfferDescriptionProps) {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState<string>(description);
  const debouncedValue = useDebounce(value, 800);

  useEffect(() => updateDescription(value as string), [debouncedValue]);

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
        <Stack direction="column" m={1}>
          <TextField
            label="Beschreibung"
            type="text"
            id="offer-title"
            multiline
            value={value}
            variant="outlined"
            onChange={(event) => {
              setValue(event.target.value);
            }}
            inputProps={{
              style: {
                height: '240px',
              },
            }}
          />
        </Stack>
      </Box>
    </Modal>
  );
}

export default OfferDescriptionModal;
