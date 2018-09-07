import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { TextField, MenuItem, Button, Grid } from "@material-ui/core";
import { dateFormatter } from "../utils/StringUtils";
import { getWorkerName, calcServiceCost } from "../utils/DomainUtils";
import { addService, updateService } from "../actions/servicesActions";
import { servicesRef } from "../utils/firebaseUtils";

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        padding: theme.spacing.unit
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    btnContainer: {
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
});

class ServiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service: {
                serviceDate: dateFormatter(new Date()),
                worker: "",
                serviceHours: 0,
                serviceMinutes: 0,
                priceHour: 0,
                totalCost: 0
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleChange = event => {
        if (event) {
            event.preventDefault();

            this.setState(
                {
                    ...this.state,
                    service: {
                        ...this.state.service,
                        [event.target.name]: event.target.value
                    }
                },
                () => {
                    const {
                        serviceHours: hours,
                        serviceMinutes: minutes,
                        priceHour
                    } = this.state.service;
                    let serviceCost =
                        (Number(hours) + Number(minutes) / 60) *
                        Number(priceHour);
                    console.log(hours, minutes, priceHour, serviceCost);
                    this.setState({
                        service: {
                            ...this.state.service,
                            totalCost: serviceCost
                        }
                    });
                }
            );
        }
    };

    handleSelectChange = event => {
        if (event) {
            event.preventDefault();
            this.setState(
                {
                    ...this.state,
                    service: {
                        ...this.state.service,
                        [event.target.name]: event.target.value
                    }
                },
                () => {
                    let selWorker = this.props.workersData[event.target.value];
                    if (
                        !(
                            Object.keys(selWorker).length === 0 &&
                            selWorker.constructor === Object
                        )
                    ) {
                        this.setState({
                            ...this.state,
                            service: {
                                ...this.state.service,
                                priceHour: selWorker.priceHour
                            }
                        });
                    }
                }
            );
        }
    };

    handleSaveBtn = () => {
        let newService = {
            ...this.state.service,
            serviceDate: new Date(this.state.service.serviceDate).getTime(),
            serviceHours: Number(this.state.service.serviceHours),
            serviceMinutes: Number(this.state.service.serviceMinutes)
        };
        if (this.props.match.params.id) {
            this.props.editService(this.props.match.params.id, newService);
        } else {
            this.props.createService(newService);
        }
        this.props.history.goBack();
    };

    componentDidMount = () => {
        if (this.props.match.params.id) {
            servicesRef
                .child(this.props.match.params.id)
                .once("value", snapshot => {
                    let serviceToUpdate = snapshot.val();
                    serviceToUpdate.serviceDate = dateFormatter(
                        new Date(serviceToUpdate.serviceDate)
                    );
                    serviceToUpdate.totalCost = calcServiceCost(
                        serviceToUpdate
                    );
                    this.setState({
                        ...this.state,
                        service: serviceToUpdate
                    });
                });
        }
    };

    render() {
        const { classes, workersData } = this.props;

        return (
            <form className={classes.container}>
                <TextField
                    id="select-worker"
                    select
                    label="Funcionário"
                    value={this.state.service.worker}
                    name="worker"
                    onChange={this.handleSelectChange}
                    helperText="Escolha funcionário do serviço"
                    margin="normal"
                    fullWidth
                    className={classes.textField}
                >
                    {Object.keys(workersData).map(key => {
                        return (
                            <MenuItem key={key} value={key}>
                                {getWorkerName(workersData[key])}
                            </MenuItem>
                        );
                    })}
                </TextField>

                <TextField
                    id="service-date"
                    type="date"
                    label="Data"
                    value={this.state.service.serviceDate}
                    name="serviceDate"
                    onChange={this.handleChange}
                    helperText="A data do serviço"
                    margin="normal"
                    fullWidth
                    className={classes.textField}
                />

                <TextField
                    id="service-hours"
                    type="number"
                    label="Horas"
                    value={this.state.service.serviceHours}
                    name="serviceHours"
                    onChange={this.handleChange}
                    margin="normal"
                    fullWidth
                    className={classes.textField}
                />
                <TextField
                    id="service-minutes"
                    type="number"
                    label="Minutos"
                    value={this.state.service.serviceMinutes}
                    name="serviceMinutes"
                    onChange={this.handleChange}
                    margin="normal"
                    fullWidth
                    className={classes.textField}
                />
                <TextField
                    id="service-price-hour"
                    type="number"
                    label="Preço/Hora"
                    value={this.state.service.priceHour}
                    name="priceHour"
                    onChange={this.handleChange}
                    margin="normal"
                    fullWidth
                    className={classes.textField}
                />

                <TextField
                    id="service-total"
                    disabled
                    type="number"
                    label="totalCost"
                    value={this.state.service.totalCost}
                    name="totalCost"
                    onChange={this.handleChange}
                    margin="normal"
                    fullWidth
                    className={classes.textField}
                />
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    spacing={16}
                    className={classes.btnContainer}
                >
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSaveBtn}
                        >
                            Salvar
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="default"
                            onClick={this.props.history.goBack}
                        >
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        workersData: state.WorkersReducer,
        service: state.ServicesReducer.service
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createService: newService => {
            dispatch(addService(newService));
        },
        editService: (key, service) => {
            dispatch(updateService(key, service));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null
)(withStyles(styles)(ServiceForm));
