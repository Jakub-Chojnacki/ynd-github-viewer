import { useEffect, useState } from "react";

import { Alert, Snackbar } from "@mui/material";

import { TInfiniteQueryErrorNotificationProps } from "./types";

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

  const handleCloseSnackbar = (): void => {
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </>
  );
};

export default InfiniteQueryErrorNotification;
