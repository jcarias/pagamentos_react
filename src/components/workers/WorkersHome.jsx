import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Hidden } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import WorkersTable from "./WorkersTable";
import WorkersList from "./WorkersList";
import { urls } from "../../utils/urlUtils";
import { deleteWorker } from "../../actions/workersActions";

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

const WorkersHome = ({ workers, theme, classes, deleteWorker }) => {
    return (
        <React.Fragment>
            <Hidden smDown>
                <WorkersTable workers={workers} className={classes.root} />
            </Hidden>
            <Hidden smUp>
                <WorkersList workers={workers} deleteWorkerFn={deleteWorker} />
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
        </React.Fragment>
    );
};

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
