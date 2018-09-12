import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    ExpansionPanelActions,
    Chip
} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withStyles } from "@material-ui/core/styles";
import { getWorkerName, getWorker } from "../../utils/DomainUtils";
import { months_pt, getYears } from "../../utils/dateUtils";

import { fetchPayments, deletePayment } from "../../actions/paymentsActions";
import PaymentsList from "./PaymentsList";
import { isNotEmpty } from "../../utils/commonUtils";

const styles = theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    gridContainer: {
        margin: theme.spacing.unit * 2
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    },
    expansionPanelSummary: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText
    },
    chip: {
        marginLeft: theme.spacing.unit
    }
});

class PaymentsHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selWorker: "",
            selYear: "",
            selMonth: "",
            selectedPaymentKey: "",
            selectedPayment: {},
            deleteConfirmDialogOpen: false
        };
    }

    countFilters = () => {
        const { selWorker, selYear, selMonth } = this.state;
        return (selWorker ? 1 : 0) + (selYear ? 1 : 0) + (selMonth ? 1 : 0);
    };

    handleChange = event => {
        if (event) {
            this.setState({ [event.target.name]: event.target.value }, () => {
                this.props.fetchPayments(
                    this.state.selWorker,
                    this.state.selYear,
                    this.state.selMonth
                );
            });
        }
    };

    clearFilters = () => {
        this.setState(
            {
                selWorker: "",
                selYear: "",
                selMonth: ""
            },
            () => {
                this.props.fetchPayments(
                    this.state.selWorker,
                    this.state.selYear,
                    this.state.selMonth
                );
            }
        );
    };

    handleDeleteFilter = key => {
        this.setState(
            {
                ...this.state,
                [key]: ""
            },
            () => {
                this.props.fetchPayments(
                    this.state.selWorker,
                    this.state.selYear,
                    this.state.selMonth
                );
            }
        );
    };

    componentDidMount() {
        //Fetch Data here
        this.props.fetchPayments(
            this.state.selWorker,
            this.state.selYear,
            this.state.selMonth
        );
    }

    showDeleteConfirm = (key, payment) => {
        this.setState({
            selectedPaymentKey: key,
            selectedPayment: payment,
            deleteConfirmDialogOpen: true
        });
    };
    handleCloseDeleteConfirm = () => {
        this.setState({
            selectedPaymentKey: "",
            selectedPayment: {},
            deleteConfirmDialogOpen: false
        });
    };

    confirmPaymentDelete = () => {
        const { selectedPaymentKey, selectedPayment } = this.state;
        this.props.deletePayment(selectedPaymentKey, selectedPayment);
        this.setState({
            deleteConfirmDialogOpen: false
        });
    };

    render() {
        const { classes, workers, paymentsData } = this.props;
        const { selWorker, selYear, selMonth } = this.state;
        return (
            <Grid container direction="column">
                <Grid item style={{ padding: 16 }}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={
                                <ExpandMoreIcon style={{ color: "#FFFFFF" }} />
                            }
                            className={classes.expansionPanelSummary}
                        >
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Typography
                                        color="inherit"
                                        variant="button"
                                    >
                                        Filtros ({this.countFilters()})
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <div>
                                        {selWorker && (
                                            <Chip
                                                label={getWorkerName(
                                                    getWorker(
                                                        workers,
                                                        selWorker
                                                    )
                                                )}
                                                onDelete={() =>
                                                    this.handleDeleteFilter(
                                                        "selWorker"
                                                    )
                                                }
                                                className={classes.chip}
                                                variant="default"
                                                color="primary"
                                            />
                                        )}
                                        {selYear && (
                                            <Chip
                                                label={selYear}
                                                onDelete={() =>
                                                    this.handleDeleteFilter(
                                                        "selYear"
                                                    )
                                                }
                                                className={classes.chip}
                                                variant="default"
                                                color="primary"
                                            />
                                        )}
                                        {selMonth !== "" && (
                                            <Chip
                                                label={months_pt[selMonth]}
                                                onDelete={() =>
                                                    this.handleDeleteFilter(
                                                        "selMonth"
                                                    )
                                                }
                                                className={classes.chip}
                                                variant="default"
                                                color="primary"
                                            />
                                        )}
                                    </div>
                                </Grid>
                            </Grid>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container spacing={16}>
                                <Grid item xs={12} md={4}>
                                    <FormControl
                                        className={classes.formControl}
                                        fullWidth={true}
                                    >
                                        <InputLabel htmlFor="worker">
                                            Trabalhador
                                        </InputLabel>
                                        <Select
                                            value={this.state.selWorker}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: "selWorker",
                                                id: "worker"
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>Todos</em>
                                            </MenuItem>
                                            {workers &&
                                                Object.keys(workers).map(
                                                    key => {
                                                        let worker =
                                                            workers[key];
                                                        return (
                                                            <MenuItem
                                                                key={key}
                                                                value={key}
                                                            >
                                                                {getWorkerName(
                                                                    worker
                                                                )}
                                                            </MenuItem>
                                                        );
                                                    }
                                                )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl
                                        className={classes.formControl}
                                        fullWidth={true}
                                    >
                                        <InputLabel htmlFor="selYear">
                                            Ano
                                        </InputLabel>
                                        <Select
                                            value={this.state.selYear}
                                            name="selYear"
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: "selYear",
                                                id: "selYear"
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>Todos</em>
                                            </MenuItem>
                                            {getYears(this.state.selYear).map(
                                                year => {
                                                    return (
                                                        <MenuItem
                                                            key={year}
                                                            value={year}
                                                        >
                                                            {year}
                                                        </MenuItem>
                                                    );
                                                }
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl
                                        className={classes.formControl}
                                        fullWidth={true}
                                    >
                                        <InputLabel htmlFor="selMonth">
                                            Mês
                                        </InputLabel>
                                        <Select
                                            value={this.state.selMonth}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: "selMonth",
                                                id: "selMonth"
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>Todos</em>
                                            </MenuItem>
                                            {months_pt &&
                                                months_pt.map(
                                                    (month, index) => {
                                                        return (
                                                            <MenuItem
                                                                key={index}
                                                                value={index}
                                                            >
                                                                {month}
                                                            </MenuItem>
                                                        );
                                                    }
                                                )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                        <ExpansionPanelActions>
                            <Button color="primary" onClick={this.clearFilters}>
                                Limpar filtros
                            </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                </Grid>
                <Divider />
                <Grid item>
                    {isNotEmpty(paymentsData) ? (
                        <PaymentsList
                            payments={paymentsData}
                            workers={workers}
                            showDeleteConfirm={this.showDeleteConfirm}
                            handleCloseDeleteConfirm={
                                this.handleCloseDeleteConfirm
                            }
                            deleteConfirmDialogOpen={
                                this.state.deleteConfirmDialogOpen
                            }
                            selectedPayment={this.state.selectedPayment}
                            confirmDelete={this.confirmPaymentDelete}
                        />
                    ) : (
                        <Typography variant="display1" align="center">
                            Nenhum pagamento encontrado
                            {this.countFilters() > 0 && " (Filtros Aplicados)"}
                            {"."}
                        </Typography>
                    )}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.PaymentsReducer.loading,
        paymentsData: state.PaymentsReducer.payments
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPayments: (worker, year, month) => {
            dispatch(fetchPayments(worker, year, month));
        },
        deletePayment: (paymentKey, paymentData) => {
            dispatch(deletePayment(paymentKey, paymentData));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(PaymentsHome));
