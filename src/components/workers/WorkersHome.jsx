import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Hidden, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import WorkersTable from "./WorkersTable";
import WorkersList from "./WorkersList";
import ConfirmDialog from "../ConfirmDialog";
import { urls } from "../../utils/urlUtils";
import { deleteWorker } from "../../actions/workersActions";
import { getWorkerName } from "../../utils/DomainUtils";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2
    },
    table: {
        minWidth: 700
    }
});

class WorkersHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selWorkerKey: "",
            selWorker: {},
            confirmDeleteOpen: false
        };
    }

    showDeleteConfirm = workerKey => {
        this.setState({
            selWorkerKey: workerKey,
            selWorker: this.props.workers[workerKey],
            confirmDeleteOpen: true
        });
    };

    closeDeleteConfirmDialog = () => {
        this.setState({
            selWorkerKey: "",
            selWorker: {},
            confirmDeleteOpen: false
        });
    };

    confirmDelete = () => {
        this.setState({ confirmDeleteOpen: false }, () => {
            this.props.deleteWorker(this.state.selWorkerKey);
        });
    };

    render() {
        const { workers, theme, classes } = this.props;
        return (
            <React.Fragment>
                <Hidden smDown>
                    <WorkersTable workers={workers} className={classes.root} />
                </Hidden>
                <Hidden smUp>
                    <WorkersList
                        workers={workers}
                        deleteWorkerFn={this.showDeleteConfirm}
                    />
                </Hidden>
                <Button
                    variant="fab"
                    color="primary"
                    component={Link}
                    to={urls.addWorker.path}
                    style={{
                        position: "fixed",
                        bottom: theme.spacing.unit * 2,
                        right: theme.spacing.unit * 2
                    }}
                >
                    <AddIcon />
                </Button>

                <ConfirmDialog
                    open={this.state.confirmDeleteOpen}
                    handleClose={this.closeDeleteConfirmDialog}
                    confirmFn={this.confirmDelete}
                    cancelFn={this.closeDeleteConfirmDialog}
                    destructive={true}
                    title="Apagar trabalhador?"
                >
                    <Typography gutterBottom>
                        {"Tem a certeza que deseja apagar o trabalhador " +
                            getWorkerName(this.state.selWorker) +
                            "?"}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Nota: ao eliminar o trabalhador todos os serviços e
                        respectivos pagamentos serão também eliminados.
                    </Typography>
                    <Typography variant="caption">
                        Atenção: a eliminação não pode ser revertida!
                    </Typography>
                </ConfirmDialog>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        workers: state.WorkersReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteWorker: workerKey => {
            dispatch(deleteWorker(workerKey));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(WorkersHome));
