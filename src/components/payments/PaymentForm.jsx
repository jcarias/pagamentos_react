import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
    Grid,
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Hidden,
    ExpansionPanelActions
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";

import {
    fetchUnpaidServices,
    addPayment,
    updatePayment
} from "../../actions/paymentsActions";

import {
    getWorkerName,
    computeServicesMetrics,
    paymentFormats
} from "../../utils/DomainUtils";
import { months_pt, getYears } from "../../utils/dateUtils";
import UnpaidServicesTable from "../UnpaidServicesTable";
import { formatMoney, dateFormatter } from "../../utils/StringUtils";
import UnpaidServicesList from "../UnpaidServicesList";
import ExtraPaymentsForm from "./ExtraPaymentsForm";
import { paymentsRef } from "../../utils/firebaseUtils";
import { isNotEmpty } from "../../utils/commonUtils";

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2
    },
    formControl: {
        marginBottom: theme.spacing.unit,
        minWidth: 120
    },
    expansionPanel: {
        marginTop: theme.spacing.unit
    }
});

class PaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            worker: "",
            year: "",
            month: "",
            services: {},
            extras: [],
            total: 0,
            paymentDate: "",
            paymentForm: ""
        };
        this.handleExtraValueChange = this.handleExtraValueChange.bind(this);
    }

    handleChange = event => {
        if (event) {
            event.preventDefault();
            this.setState(
                {
                    [event.target.name]: event.target.value,
                    total: this.computePaymentTotal()
                },
                () => {
                    if (
                        event.target.name === "worker" ||
                        event.target.name === "year" ||
                        event.target.name === "month"
                    ) {
                        this.fetchServices();
                    }
                }
            );
        }
    };

    handleValueChange = event => {
        if (event) {
            this.setState({ [event.target.name]: event.target.value });
        }
    };

    handleSubmit = event => {
        if (event) {
            event.preventDefault();

            const {
                worker,
                year,
                month,
                extras,
                paymentDate,
                paymentForm
            } = this.state;

            let newPayment = {
                worker: worker,
                year: year,
                month: month,
                services: this.props.unpaidServices,
                extras: extras,
                total: this.computePaymentTotal(),
                paymentDate: new Date(paymentDate).getTime(),
                paymentForm: paymentForm
            };
            if (this.props.match.params.id) {
                this.props.updatePayment(
                    this.props.match.params.id,
                    newPayment
                );
            } else {
                this.props.addPayment(newPayment);
            }

            this.props.history.goBack();
        }
    };

    fetchServices = () => {
        const { worker, year, month } = this.state;
        this.props.fetchUnpaidServices(
            worker,
            year,
            month,
            this.props.match.params.id
        );
    };

    componentDidMount = () => {
        this.fetchServices();

        if (this.props.match.params.id) {
            paymentsRef
                .child(this.props.match.params.id)
                .once("value", snapshot => {
                    let paymentToUpdate = snapshot.val();

                    this.setState(
                        {
                            ...this.state,
                            worker: paymentToUpdate.worker,
                            year: paymentToUpdate.year,
                            month: paymentToUpdate.month,
                            services: paymentToUpdate.services,
                            extras: paymentToUpdate.extras,
                            total: paymentToUpdate.total,
                            paymentDate: dateFormatter(
                                new Date(paymentToUpdate.paymentDate)
                            ),
                            paymentForm: paymentToUpdate.paymentForm
                        },
                        () => {
                            this.fetchServices();
                        }
                    );
                });
        }
    };

    onAddNewExtraClick = () => {
        let extras = this.state.extras || [];
        extras.push({ description: "", value: 0 });
        this.setState({ ...this.state, extras: extras });
    };

    handleExtraValueChange = (index, event) => {
        let tmpExtras = this.state.extras;
        let extra = tmpExtras[index];
        extra[event.target.name] = event.target.value;
        this.setState({ extras: tmpExtras });
    };

    computeExtrasTotal = () => {
        let total = 0.0;
        if (isNotEmpty(this.state.extras)) {
            this.state.extras.map(extra => (total += Number(extra.value)));
        }
        return total;
    };

    handleExtraDelete = index => {
        let tmpExtras = this.state.extras;
        tmpExtras.splice(index, 1);
        this.setState({ extras: tmpExtras });
    };

    computePaymentTotal = () => {
        let total = 0;
        const { totalCost } = computeServicesMetrics(this.props.unpaidServices);
        total += totalCost;
        total += this.computeExtrasTotal();
        return total;
    };

    render() {
        const { classes, workers, unpaidServices } = this.props;
        const { count, totalCost } = computeServicesMetrics(unpaidServices);
        return (
            <form onSubmit={this.handleSubmit} className={classes.root}>
                <Grid container direction="column" spacing={16}>
                    <Grid item xs={12}>
                        <FormControl
                            className={classes.formControl}
                            fullWidth={true}
                        >
                            <InputLabel htmlFor="worker">
                                Trabalhador
                            </InputLabel>
                            <Select
                                required
                                value={this.state.worker}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: "worker",
                                    id: "worker"
                                }}
                            >
                                <MenuItem value="">
                                    <em>Todos</em>
                                </MenuItem>
                                {workers &&
                                    Object.keys(workers).map(key => {
                                        let worker = workers[key];
                                        return (
                                            <MenuItem key={key} value={key}>
                                                {getWorkerName(worker)}
                                            </MenuItem>
                                        );
                                    })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl
                            className={classes.formControl}
                            fullWidth={true}
                        >
                            <InputLabel htmlFor="year">Ano</InputLabel>
                            <Select
                                required
                                value={this.state.year}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: "year",
                                    id: "year"
                                }}
                            >
                                <MenuItem value="">
                                    <em>Todos</em>
                                </MenuItem>
                                {getYears(this.state.year).map(year => {
                                    return (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl
                            className={classes.formControl}
                            fullWidth={true}
                            required
                        >
                            <InputLabel htmlFor="month">Mês</InputLabel>
                            <Select
                                required
                                value={this.state.month}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: "month",
                                    id: "month"
                                }}
                            >
                                <MenuItem value="">
                                    <em>Todos</em>
                                </MenuItem>
                                {months_pt &&
                                    months_pt.map((month, index) => {
                                        return (
                                            <MenuItem key={index} value={index}>
                                                {month}
                                            </MenuItem>
                                        );
                                    })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography
                                    variant="headline"
                                    style={{ flex: 1 }}
                                    color="textSecondary"
                                >
                                    {count} Serviços
                                </Typography>
                                <Typography variant="headline">
                                    {formatMoney(totalCost)}
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Hidden smDown>
                                    <UnpaidServicesTable
                                        services={unpaidServices}
                                    />
                                </Hidden>
                                <Hidden mdUp>
                                    <UnpaidServicesList
                                        services={unpaidServices}
                                    />
                                </Hidden>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                    <Grid item xs={12}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography
                                    variant="headline"
                                    style={{ flex: 1 }}
                                    color="textSecondary"
                                >
                                    {this.state.extras
                                        ? this.state.extras.length
                                        : 0}{" "}
                                    Extras
                                </Typography>
                                <Typography variant="headline">
                                    {formatMoney(this.computeExtrasTotal())}
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <ExtraPaymentsForm
                                    extras={this.state.extras}
                                    handleValueChange={
                                        this.handleExtraValueChange
                                    }
                                    handleDelete={this.handleExtraDelete}
                                />
                            </ExpansionPanelDetails>
                            <ExpansionPanelActions>
                                <Button
                                    variant="flat"
                                    color="primary"
                                    onClick={this.onAddNewExtraClick}
                                >
                                    <AddIcon />
                                    Adicionar
                                </Button>
                            </ExpansionPanelActions>
                        </ExpansionPanel>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="date"
                            name="paymentDate"
                            label="Data do pagamento"
                            type="date"
                            value={this.state.paymentDate}
                            className={classes.formControl}
                            onChange={this.handleValueChange}
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl
                            className={classes.formControl}
                            fullWidth={true}
                            required
                        >
                            <InputLabel htmlFor="paymentForm">
                                Forma de Pagamento
                            </InputLabel>
                            <Select
                                required
                                value={this.state.paymentForm}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: "paymentForm",
                                    id: "paymentForm"
                                }}
                            >
                                {paymentFormats &&
                                    Object.keys(paymentFormats).map(key => {
                                        return (
                                            <MenuItem key={key} value={key}>
                                                {paymentFormats[key]}
                                            </MenuItem>
                                        );
                                    })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography
                                    variant="subheading"
                                    color="secondary"
                                >
                                    Total a pagar:
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="headline" align="right">
                                    {formatMoney(this.computePaymentTotal())}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ marginTop: 16, float: "right" }}>
                            <Button
                                type="submit"
                                color="primary"
                                variant="raised"
                            >
                                Gravar
                            </Button>
                            <Button
                                style={{ marginLeft: 16 }}
                                variant="raised"
                                color="secondary"
                                onClick={() => this.props.history.goBack()}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.PaymentsReducer.loading,
        unpaidServices: state.PaymentsReducer.unpaidServices
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUnpaidServices: (worker, year, month, paymentKey) => {
            dispatch(fetchUnpaidServices(worker, year, month, paymentKey));
        },
        addPayment: payment => {
            dispatch(addPayment(payment));
        },
        updatePayment: (key, payment) => {
            dispatch(updatePayment(key, payment));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(PaymentForm));
