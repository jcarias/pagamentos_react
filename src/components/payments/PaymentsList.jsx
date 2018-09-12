import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
    Grid,
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Button,
    Divider,
    Hidden
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { dateFormatter, formatMoney } from "../../utils/StringUtils";
import { months_pt } from "../../utils/dateUtils";
import { getWorker, getWorkerName } from "../../utils/DomainUtils";
import UnpaidServicesTable from "../UnpaidServicesTable";
import PaymentFieldsDisplay from "./PaymentFieldsDisplay";
import UnpaidServicesList from "../UnpaidServicesList";
import ExtraPaymentsList from "./ExtraPaymentsList";
import ConfirmDialog from "../ConfirmDialog";

const styles = theme => ({
    root: {
        flexGrow: 1,

        width: "100%"
    },
    mainCellRow: {
        paddingTop: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2
    },
    ExpansionPanelActions: {
        backgroundColor: theme.palette.grey[50]
    }
});

const PaymentsList = props => {
    const {
        payments,
        workers,
        classes,
        deleteConfirmDialogOpen,
        showDeleteConfirm,
        handleCloseDeleteConfirm,
        selectedPayment,
        confirmDelete
    } = props;

    return (
        <React.Fragment>
            <ConfirmDialog
                open={deleteConfirmDialogOpen}
                title={"Apagar pagamento"}
                handleClose={handleCloseDeleteConfirm}
                destructive={true}
                confirmFn={confirmDelete}
            >
                <Typography gutterBottom>
                    Tem a certeza que deseja eliminar o pagamento de ... no
                    valor de ?
                </Typography>
                <Typography variant="caption">
                    Atenção: Esta operação é irreversível!
                </Typography>
            </ConfirmDialog>

            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                className={classes.root}
            >
                {payments &&
                    Object.keys(payments).map(key => {
                        let payment = payments[key];
                        return (
                            <Grid
                                item
                                key={key}
                                className={classes.mainCellRow}
                            >
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                            spacing={16}
                                        >
                                            <Grid item>
                                                <Typography color="textSecondary">
                                                    Período
                                                </Typography>
                                                <Typography variant="body2">
                                                    {months_pt[payment.month] +
                                                        " " +
                                                        payment.year}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography color="textSecondary">
                                                    Montante
                                                </Typography>
                                                <Typography variant="body2">
                                                    {formatMoney(payment.total)}
                                                </Typography>
                                            </Grid>
                                            <Hidden smDown>
                                                <Grid item>
                                                    <Typography color="textSecondary">
                                                        Trabalhador
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {getWorkerName(
                                                            getWorker(
                                                                workers,
                                                                payment.worker
                                                            )
                                                        )}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography color="textSecondary">
                                                        Data pagamento
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {dateFormatter(
                                                            new Date(
                                                                payment.paymentDate
                                                            )
                                                        )}
                                                    </Typography>
                                                </Grid>
                                            </Hidden>
                                        </Grid>
                                    </ExpansionPanelSummary>
                                    <Divider />
                                    <ExpansionPanelDetails>
                                        <Grid
                                            container
                                            direction="column"
                                            spacing={16}
                                        >
                                            <Grid item>
                                                <Typography variant="subheading">
                                                    Detalhes
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <PaymentFieldsDisplay
                                                    payment={payment}
                                                    workers={workers}
                                                />
                                            </Grid>

                                            <Grid item>
                                                <Typography variant="subheading">
                                                    Serviços
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Hidden smDown>
                                                    <UnpaidServicesTable
                                                        services={
                                                            payment.services
                                                        }
                                                    />
                                                </Hidden>
                                                <Hidden smUp>
                                                    <UnpaidServicesList
                                                        services={
                                                            payment.services
                                                        }
                                                    />
                                                </Hidden>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subheading">
                                                    Extras
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <ExtraPaymentsList
                                                    extraPayments={
                                                        payment.extras
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </ExpansionPanelDetails>
                                    <Divider />
                                    <ExpansionPanelActions
                                        className={
                                            classes.ExpansionPanelActions
                                        }
                                    >
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() =>
                                                showDeleteConfirm(key, payment)
                                            }
                                        >
                                            Apagar
                                        </Button>
                                    </ExpansionPanelActions>
                                </ExpansionPanel>
                            </Grid>
                        );
                    })}
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(PaymentsList);
