import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { fetchServices, deleteService } from "./actions/servicesActions";
import { fetchWorkers } from "./actions/workersActions";
import { AppBar, CircularProgress } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";
import blue from "@material-ui/core/colors/blue";
import CssBaseline from "@material-ui/core/CssBaseline";
import { urls, urlsToolbar } from "./utils/urlUtils";
import HomePage from "./components/Home";
import ServicesList from "./components/ServicesList";
import About from "./components/About";
import ServiceForm from "./components/ServiceForm";
import HomeToolbar from "./components/HomeToolbar";
import BackToolbar from "./components/BackToolbar";
import PaymentsHome from "./components/payments/PaymentsHome";
import PaymentForm from "./components/payments/PaymentForm";
import WorkersHome from "./components/workers/WorkersHome";
import WorkerForm from "./components/workers/WorkersForm";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blueGrey
  }
});

class App extends Component {
  componentWillMount() {
    this.props.fetchServices();
    this.props.fetchWorkers();
  }

  render() {
    const {
      servicesData,
      servicesLoading,
      workersLoading,
      workersData,
      servicesFilters
    } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <AppBar position="fixed">
            <Switch>
              <Route
                exact
                path={urls.home.path}
                render={props => <HomeToolbar {...props} config={urls.home} />}
              />
              {urlsToolbar().map(({ path, name }, index) => {
                return (
                  <Route
                    exact
                    key={index}
                    path={path}
                    render={props => <BackToolbar {...props} config={name} />}
                  />
                );
              })}
            </Switch>
          </AppBar>
          <div style={{ paddingTop: "56px" }}>
            <Route
              exact
              path={urls.home.path}
              render={props => <HomePage services={servicesData} {...props} />}
            />
            <Route
              exact
              path={urls.services.path}
              render={props => (
                <React.Fragment>
                  <ServicesList
                    {...props}
                    data={servicesData}
                    workers={workersData}
                    filters={servicesFilters}
                    deleteService={this.props.deleteService}
                    fetchServicesFn={this.props.fetchServices}
                  />
                </React.Fragment>
              )}
            />

            {(servicesLoading || workersLoading) && (
              <div
                style={{
                  position: "fixed",
                  left: "calc(100vw / 2 - 20px)",
                  top: "calc(100vh /2 - 20px)"
                }}
              >
                <CircularProgress />
              </div>
            )}
            <Route
              path={urls.about.path}
              render={props => <About {...props} />}
            />
            <Route
              path={urls.addService.path}
              render={props => <ServiceForm {...props} />}
            />
            <Route
              path={urls.updateService.path}
              render={props => <ServiceForm {...props} />}
            />
            <Route
              exact
              path={urls.payments.path}
              render={props => (
                <PaymentsHome workers={workersData} {...props} />
              )}
            />
            <Route
              path={urls.addPayment.path}
              render={props => (
                <PaymentForm
                  workers={workersData}
                  services={servicesData}
                  {...props}
                />
              )}
            />
            <Route
              path={urls.updatePayment.path}
              render={props => (
                <PaymentForm
                  workers={workersData}
                  services={servicesData}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path={urls.workers.path}
              render={props => (
                <WorkersHome workers={workersData} theme={theme} {...props} />
              )}
            />
            <Route
              path={urls.addWorker.path}
              render={props => <WorkerForm theme={theme} {...props} />}
            />
            <Route
              path={urls.updateWorker.path}
              render={props => <WorkerForm theme={theme} {...props} />}
            />
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    servicesLoading: state.ServicesReducer.loading,
    servicesFilters: state.ServicesReducer.filters,
    servicesData: state.ServicesReducer.services,
    workersData: state.WorkersReducer.workers,
    workersLoading: state.WorkersReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchServices: (year, month) => {
      dispatch(fetchServices(year, month));
    },
    deleteService: key => {
      dispatch(deleteService(key));
    },
    fetchWorkers: () => {
      dispatch(fetchWorkers());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(App);
