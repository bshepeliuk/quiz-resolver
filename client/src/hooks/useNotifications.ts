import { useSnackbar } from 'notistack';

const useNotifications = () => {
  const { enqueueSnackbar } = useSnackbar();

  const success = (message: string) => {
    enqueueSnackbar(message, { variant: 'success' });
  };

  const error = (message: string) => {
    enqueueSnackbar(message, { variant: 'error' });
  };

  const info = (message: string) => {
    enqueueSnackbar(message, { variant: 'info' });
  };

  return {
    success,
    error,
  };
};

export default useNotifications;
