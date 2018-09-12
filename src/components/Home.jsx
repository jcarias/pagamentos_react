import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    Grid,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    CardActionArea
} from "@material-ui/core";

import PersonIcon from "@material-ui/icons/PersonRounded";
import { withStyles } from "@material-ui/core/styles";

import { urls } from "../utils/urlUtils";
import {
    fetchServicesYear,
    fetchServicesYearMonth
} from "../actions/homePageActions";

import ServicesWidget from "./widgets/ServicesWidget";
import PaymentsWidget from "./widgets/PaymentsWidget";

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit,
        margin: 0,
        width: "100%"
    },

    widgetHeader: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        textAlign: "center"
    },
    widgetMedia: {
        fontSize: 64
    }
});

class HomePage extends Component {
    defaultYear = new Date().getFullYear();
    defaultMonth = new Date().getMonth();

    componentDidMount() {
        this.props.fetchServicesYear(
            this.props.servicesFilters.year || this.defaultYear
        );

        this.props.fetchServicesYearMonth(
            this.props.servicesFilters.year || this.defaultYear,
            this.props.servicesFilters.month || this.defaultMonth
        );
    }

    render() {
        const {
            classes,
            servicesYearData,
            servicesYearMonthData,
            servicesFilters
        } = this.props;

        return (
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                className={classes.root}
                spacing={16}
            >
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <ServicesWidget
                        classes={classes}
                        services={servicesYearMonthData}
                        year={servicesFilters.year}
                        month={servicesFilters.month}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card>
                        <CardActionArea component={Link} to={urls.workers.path}>
                            <CardContent className={classes.widgetHeader}>
                                <PersonIcon className={classes.widgetMedia} />
                                <Typography
                                    variant="headline"
                                    component="h2"
                                    color="inherit"
                                >
                                    Trabalhadores
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="body1">
                                    Gestão dos trabalhadores.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button
                                color="primary"
                                component={Link}
                                to={urls.workers.path}
                            >
                                Ver
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <PaymentsWidget
                        classes={classes}
                        servicesYearData={servicesYearData}
                    />
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        servicesFilters: state.HomePageReducer.serviceFilters,
        servicesYearData: state.HomePageReducer.servicesYear,
        servicesYearMonthData: state.HomePageReducer.servicesYearMonth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchServicesYear: year => {
            dispatch(fetchServicesYear(year));
        },
        fetchServicesYearMonth: (year, month) => {
            dispatch(fetchServicesYearMonth(year, month));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null
)(withStyles(styles)(HomePage));
