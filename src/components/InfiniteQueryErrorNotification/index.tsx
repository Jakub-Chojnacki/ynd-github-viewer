import { useEffect, useState } from "react";

import { TInfiniteQueryErrorNotificationProps } from "./types";
import { Alert, Snackbar } from "@mui/material";

const InfiniteQueryErrorNotification = ({
  error,
  hasData,
  customErrorMessage,
}: TInfiniteQueryErrorNotificationProps) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (error && hasData) {
      setShowSnackbar(true);
    }
  }, [error, hasData]);

  const handleCloseSnackbar = ():void => {
    setShowSnackbar(false);
  };

  const errorMessage = customErrorMessage || error?.message;

  return (
    <>
      {/* Show Alert when there is an error and no data */}
      {error && !hasData && <Alert severity="error">{errorMessage}</Alert>}

      {/* Show Snackbar when there is an error on infinite query fetch*/}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </>
  );
};

export default InfiniteQueryErrorNotification;
