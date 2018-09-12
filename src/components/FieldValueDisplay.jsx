import React from "react";
import { Grid, Typography } from "@material-ui/core";

const FieldValueDisplay = ({ label, value }) => {
    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="baseline"
            spacing={8}
        >
            <Grid item>
                <Typography variant="caption">{label}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="subheading">{value}</Typography>
            </Grid>
        </Grid>
    );
};

export default FieldValueDisplay;
