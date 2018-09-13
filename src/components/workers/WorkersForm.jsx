import React, { Component } from "react";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { addWorker, updateWorker } from "../../actions/workersActions";
import { workersRef } from "../../utils/firebaseUtils";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2
    },
    inputField: {
        marginTop: theme.spacing.unit * 2
    },
    buttonBar: {
        marginTop: theme.spacing.unit * 2,
        textAlign: "right"
    }
});

class WorkerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            priceHour: "",
            bankAccountNumber: ""
        };
    }

    handleChange = event => {
        if (event) {
            event.preventDefault();
            this.setState({ [event.target.name]: event.target.value });
        }
    };

    handleSubmit = event => {
        if (event) {
            event.preventDefault();

            let worker = {
                fname: this.state.fname,
                lname: this.state.lname,
                priceHour: Number(this.state.priceHour),
                bankAccountNumber: this.state.bankAccountNumber
            };

            if (this.props.match.params.id) {
                this.props.updateWorker(this.props.match.params.id, worker);
            } else {
                this.props.createWorker(worker);
            }

            this.props.history.goBack();
        }
    };
    teste = arg => {
        console.log(arg);
    };

    componentDidMount = () => {
        if (this.props.match.params.id) {
            workersRef
                .child(this.props.match.params.id)
                .once("value", snapshot => {
                    let worker = snapshot.val();
                    this.setState({
                        fname: worker.fname,
                        lname: worker.lname,
                        priceHour: worker.priceHour,
                        bankAccountNumber: worker.bankAccountNumber
                    });
                });
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <form onSubmit={this.handleSubmit} className={classes.root}>
                <TextField
                    required
                    label="Primeiro Nome"
                    id="fname"
                    name="fname"
                    value={this.state.fname}
                    onChange={this.handleChange}
                    fullWidth
                />
                <TextField
                    className={classes.inputField}
                    label="Último Nome"
                    id="lname"
                    name="lname"
                    value={this.state.lname}
                    onChange={this.handleChange}
                    fullWidth
                />
                <TextField
                    className={classes.inputField}
                    required
                    label="Preço por Hora"
                    id="priceHour"
                    name="priceHour"
                    type="number"
                    value={this.state.priceHour}
                    onChange={this.handleChange}
                    fullWidth
                />
                <TextField
                    className={classes.inputField}
                    label="Número de Conta"
                    id="bankAccountNumber"
                    name="bankAccountNumber"
                    value={this.state.bankAccountNumber}
                    onChange={this.handleChange}
                    helperText="Nº de conta utilizado para pagamentos por transferência bancária."
                    fullWidth
                />
                <div className={classes.buttonBar}>
                    <Button color="primary" type="submit">
                        Gravar
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => this.props.history.goBack()}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        createWorker: worker => {
            dispatch(addWorker(worker));
        },
        updateWorker: (key, worker) => {
            dispatch(updateWorker(key, worker));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(WorkerForm));
