import { Snackbar, Typography, IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import { AlertState } from "../utils/types.utils";
import { useAppDispatch } from "../store/store";
import { setAlert } from "../store/slices/general.slice";
import { IoMdClose } from "react-icons/io";

type Props = {
  alertProps: AlertState;
};

export function CustomAlert({ alertProps }: Props) {
  const { open, severity, message } = alertProps;

  const dispatch = useAppDispatch();
  return (
    <div className="alert-snackbar">
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          dispatch(
            setAlert({
              open: false,
              severity: "error",
              message: "",
            }),
          );
        }}
      >
        <Alert
          severity={severity}
          sx={{ width: "100%" }}
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                dispatch(
                  setAlert({
                    open: false,
                    message: "",
                    severity: "success",
                  }),
                );
              }}
            >
              <IoMdClose />
            </IconButton>
          }
        >
          <Typography variant="body1">{message}</Typography>
        </Alert>
      </Snackbar>
    </div>
  );
}
