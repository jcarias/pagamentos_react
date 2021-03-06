import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  List,
  Divider,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Paper,
  Hidden,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { months_pt, getYears } from "../utils/dateUtils";
import { getWorker } from "../utils/DomainUtils";
import ServiceListItem from "./ServiceListItem";
import ServicesTable from "./ServicesTable";
import ConfirmDialog from "./ConfirmDialog";
import ServicesFooter from "./ServicesFooter";
import ServiceDetailsDialog from "./ServiceDetailsDialog";
import { urls } from "../utils/urlUtils";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  filterContainer: {
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing.unit * 2,
    boxShadow: theme.shadows[1]
  },
  footer: {
    position: "fixed",
    bottom: "0px",
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.secondary.light
  }
});

class ServicesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceDetailsOpen: false,
      deleteDialogOpen: false,
      selection: {},
      filters: {
        year: this.props.filters.year || new Date().getFullYear(),
        month: this.props.filters.month || new Date().getMonth()
      }
    };
  }

  handleClick = (serviceKey, service) => {
    this.setState({
      serviceDetailsOpen: true,
      selection: { ...service, key: serviceKey }
    });
  };

  handleClose = () => {
    this.setState({ serviceDetailsOpen: false }, () => {
      this.setState({ selection: {} });
    });
  };

  showDeleteDialog = key => {
    this.setState({ deleteDialogOpen: true, selServiceKey: key });
  };

  deleteDialogConfirm = () => {
    this.setState({ deleteDialogOpen: false }, () => {
      this.props.deleteService(this.state.selServiceKey);
    });
  };

  handleCloseDeleteDialog = () => {
    this.setState({ deleteDialogOpen: false });
  };

  handleFilterChange = event => {
    if (event) {
      event.preventDefault();
      this.setState(
        {
          ...this.state,
          filters: {
            ...this.state.filters,
            [event.target.name]: event.target.value
          }
        },
        () => {
          const { year, month } = this.state.filters;
          this.props.fetchServicesFn(year, month);
        }
      );
    }
  };

  render() {
    const { data, workers, classes } = this.props;
    return (
      <React.Fragment>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              className={classes.filterContainer}
              spacing={8}
            >
              <Grid item xs={5}>
                <TextField
                  select
                  name="year"
                  label="Ano"
                  value={this.state.filters.year}
                  onChange={this.handleFilterChange}
                  fullWidth
                >
                  {getYears(this.state.filters.year).map(number => (
                    <MenuItem key={number} value={number}>
                      {number}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  select
                  name="month"
                  label="Mês"
                  value={this.state.filters.month}
                  onChange={this.handleFilterChange}
                  fullWidth
                >
                  {months_pt.map((month, index) => (
                    <MenuItem key={index} value={index}>
                      {month}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="extendedFab"
                  color="inherit"
                  component={Link}
                  to={urls.addService.path}
                  style={{ flex: 1 }}
                >
                  <AddIcon />
                  Adicionar
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Hidden mdUp>
              <List
                style={{
                  height: "calc(100vh - 56px - 80px - 104px)",
                  overflowY: "auto"
                }}
              >
                {data &&
                  Object.keys(data) &&
                  Object.keys(data).map((key, index) => {
                    return (
                      <React.Fragment key={index}>
                        <ServiceListItem
                          serviceKey={key}
                          serviceData={data[key]}
                          workerData={getWorker(workers, data[key].worker)}
                          onItemClick={this.handleClick}
                          onDelete={this.showDeleteDialog}
                        />
                        <Divider />
                      </React.Fragment>
                    );
                  })}
              </List>
            </Hidden>
            <Hidden smDown>
              <ServicesTable
                services={data}
                workers={workers}
                onDelete={this.showDeleteDialog}
                onEdit={this.handleClick}
              />
            </Hidden>
          </Grid>
          <Grid item>
            <Paper>
              <Typography variant="display1" />
            </Paper>
          </Grid>
        </Grid>

        <ServiceDetailsDialog
          serviceDetailsOpen={this.state.serviceDetailsOpen}
          handleClose={this.handleClose}
          selection={this.state.selection}
          workers={workers}
        />

        <ConfirmDialog
          open={this.state.deleteDialogOpen}
          handleClose={this.handleCloseDeleteDialog}
          destructive={true}
          title="Apagar serviço?"
          confirmFn={this.deleteDialogConfirm}
        >
          <Typography variant="body2" gutterBottom>
            Tem a certeza que deseja apagar o serviço seleccionado?
          </Typography>
          <Typography variant="caption">
            Nota: esta acção não é reversível!
          </Typography>
        </ConfirmDialog>

        <ServicesFooter services={data} className={classes.footer} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ServicesList);
