import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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

            if (this.props.match.id) {
                //update
                console.log("update");
            } else {
                //insert
                console.log("insert");
            }

            this.props.history.goBack();
        }
    };

    render() {
        const { classes } = this.props;
        console.log(this.props);
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

export default withStyles(styles)(WorkerForm);
