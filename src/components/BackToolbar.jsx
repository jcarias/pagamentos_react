import React from "react";
import { Toolbar, IconButton, Typography } from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBack";

const BackToolbar = props => {
    const { config } = props;
    return (
        <Toolbar>
            <IconButton color="inherit" onClick={props.history.goBack}>
                <BackIcon />
            </IconButton>

            <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
                {config}
            </Typography>
            <div>{props.children}</div>
        </Toolbar>
    );
};

export default BackToolbar;
