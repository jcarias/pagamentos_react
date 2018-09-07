import React from "react";
import { Typography } from "@material-ui/core";

const FieldDisplay = props => {
    const { caption, value, formatter, valueVariant } = props;

    return (
        <React.Fragment>
            <Typography variant="caption">{caption}</Typography>
            <Typography variant={valueVariant || "body1"} gutterBottom>
                {formatter ? formatter(value) : value}
            </Typography>
        </React.Fragment>
    );
};

export default FieldDisplay;
