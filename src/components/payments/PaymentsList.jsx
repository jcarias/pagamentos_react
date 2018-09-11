import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, ExpansionPanel, ExpansionPanelSummary } from "@material-ui/core";
import { dateFormatter } from "../../utils/StringUtils";

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing.unit * 2
    }
});

const PaymentsList = props => {
    const { payments, classes } = props;
    return (
        <Grid container className={classes.root}>
            {payments &&
                Object.keys(payments).map(key => {
                    let payment = payments[key];
                    return (
                        <Grid item key={key}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary>
                                    {dateFormatter(
                                        new Date(payment.paymentDate)
                                    )}
                                </ExpansionPanelSummary>
                            </ExpansionPanel>
                        </Grid>
                    );
                })}
        </Grid>
    );
};

export default withStyles(styles)(PaymentsList);
