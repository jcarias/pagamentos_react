import React, { Component } from "react";
import {
    Grid,
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelActions,
    ExpansionPanelDetails
} from "@material-ui/core";

class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Grid container>
                <Grid xs={12}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography>Serviços</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelActions>
                            <Button>Apply Filter</Button>
                        </ExpansionPanelActions>
                        <ExpansionPanelDetails>
                            <Typography>Lista de serviços a pagar.</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </Grid>
            </Grid>
        );
    }
}

export default PaymentForm;
