import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { calcServiceCost } from "../utils/DomainUtils";
import { formatMoney } from "../utils/StringUtils";

const ServicesFooter = props => {
    const { services, className } = props;

    const getServicesCount = () => {
        return services ? Object.keys(services).length : 0;
    };

    const getServicesTotal = () => {
        let total = 0.0;
        if (services) {
            Object.keys(services).map(key => {
                return (total += calcServiceCost(services[key]));
            });
        }

        return total;
    };

    return (
        <Grid
            container
            direction="row"
            className={className}
            spacing={16}
            justify="space-evenly"
            alignItems="flex-start"
        >
            <Grid item>
                <Typography variant="caption">Nº Serviços</Typography>
                <Typography variant="display1">{getServicesCount()}</Typography>
            </Grid>
            <Grid item>
                <Typography variant="caption">Total</Typography>
                <Typography variant="display1">
                    {formatMoney(getServicesTotal())}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="caption">Data Pagamento</Typography>
                <Typography variant="display1">
                    {formatMoney(getServicesTotal())}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ServicesFooter;
