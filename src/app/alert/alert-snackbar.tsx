import { Alert, Snackbar } from '@mui/material';
import { useContext } from 'react';
import StateContext from '../state/state.context';

export function AlertSnackbar() {
  const { alert, setAlert } = useContext(StateContext);
  function handleClose() {
    setAlert(null);
  }
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={!!alert}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={alert?.type}
        sx={{ width: '100%' }}
      >
        {alert?.message}
      </Alert>
    </Snackbar>
  );
}
export default AlertSnackbar;
