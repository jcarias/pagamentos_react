import React from "react";
import { TextField, Grid, IconButton } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

const ExtraPaymentsForm = props => {
    const { classes, extras, handleValueChange, handleDelete } = props;

    return (
        <Grid container direction="column">
            {extras &&
                extras.map((extraPayment, index) => {
                    return (
                        <Grid
                            key={index}
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="flex-end"
                            spacing={8}
                        >
                            <Grid item xs={6}>
                                <TextField
                                    label="Descritivo"
                                    value={extraPayment.description}
                                    name="description"
                                    onChange={e => handleValueChange(index, e)}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    margin="normal"
                                    autoFocus={extraPayment.description === ""}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    label="Valor"
                                    value={extraPayment.value}
                                    name="value"
                                    onChange={e => handleValueChange(index, e)}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    margin="normal"
                                    autoFocus={extraPayment.value === ""}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton>
                                    <DeleteIcon
                                        onClick={() => handleDelete(index)}
                                    />
                                </IconButton>
                            </Grid>
                        </Grid>
                    );
                })}
        </Grid>
    );
};

export default ExtraPaymentsForm;
