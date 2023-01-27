import { FC } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SettingsDialog: FC<Props> = ({ open, onClose }): JSX.Element => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
    </Dialog>
  );
};
