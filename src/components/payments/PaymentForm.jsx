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
    Divider,
    Avatar,
    Input,
    TextField
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { fetchUnpaidServices } from "../../actions/paymentsActions";

import { getWorkerName, computeServicesMetrics } from "../../utils/DomainUtils";
import { months_pt, getYears } from "../../utils/dateUtils";
import ServicesTable from "../ServicesTable";
import UnpaidServicesTable from "../UnpaidServicesTable";
import { formatMoney } from "../../utils/StringUtils";

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
            extras: {},
            total: 0,
            paymentDate: "",
            paymentForm: ""
        };
    }

    handleChange = event => {
        if (event) {
            event.preventDefault();
            this.setState({ [event.target.name]: event.target.value }, () => {
                if (
                    event.target.name === "worker" ||
                    event.target.name === "year" ||
                    event.target.name === "month"
                ) {
                    this.fetchServices();
                }
            });
        }
    };

    handleSubmit = event => {
        if (event) {
            event.preventDefault();
            console.log(this.state);
        }
    };

    fetchServices = () => {
        const { worker, year, month } = this.state;
        this.props.fetchUnpaidServices(worker, year, month);
    };

    componentDidMount = () => {
        this.fetchServices();
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
                                <UnpaidServicesTable
                                    services={unpaidServices}
                                />
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
                                    Extras
                                </Typography>
                                <Typography variant="headline">
                                    {formatMoney(0)}
                                </Typography>
                            </ExpansionPanelSummary>
                            <Divider />
                            <ExpansionPanelDetails>
                                Colocar form aqui para inserir extras (SS,
                                Subsídiosm ...)
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="date"
                            label="Data do pagamento"
                            type="date"
                            className={classes.formControl}
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ marginTop: 16, float: "right" }}>
                            <Button type="submit" color="primary">
                                Gravar
                            </Button>
                            <Button
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
        fetchUnpaidServices: (worker, year, month) => {
            dispatch(fetchUnpaidServices(worker, year, month));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(PaymentForm));
