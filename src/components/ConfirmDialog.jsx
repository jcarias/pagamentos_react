import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ConfirmDialog = ({
    open,
    handleClose,
    confirmFn,
    cancelFn,
    destructive,
    title,
    msg,
    children
}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title || "Dialog Title"}
            </DialogTitle>
            <DialogContent>
                {children ? (
                    children
                ) : (
                    <DialogContentText id="alert-dialog-description">
                        {msg || "Dialog message"}
                    </DialogContentText>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={confirmFn || handleClose}
                    color="primary"
                    autoFocus={!destructive}
                >
                    OK
                </Button>
                <Button
                    onClick={cancelFn || handleClose}
                    color="secondary"
                    autoFocus={destructive}
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
