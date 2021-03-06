import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  CardActionArea
} from "@material-ui/core";

import MonetizationIcon from "@material-ui/icons/MonetizationOnRounded";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { urls } from "../../utils/urlUtils";
import { formatMoney } from "../../utils/StringUtils";
import { calcSubsides, calcYearTotals } from "../../utils/DomainUtils";

const PaymentsWidget = props => {
  const { classes, servicesYearData } = props;
  const { vacations, thirteenth } = calcSubsides(servicesYearData);
  const { totalAmount, totalAmountPayed } = calcYearTotals(servicesYearData);
  return (
    <React.Fragment>
      <Card>
        <CardActionArea component={Link} to={urls.payments.path}>
          <CardContent className={classes.widgetHeader}>
            <MonetizationIcon className={classes.widgetMedia} />
            <Typography variant="headline" component="h2" color="inherit">
              Pagamentos
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subheading" align="center">
                Totais do Ano {new Date().getFullYear()}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" align="left">
                Regularizado
              </Typography>
              <Typography variant="headline" align="left">
                {formatMoney(totalAmountPayed)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" align="right">
                Por regularizar
              </Typography>
              <Typography variant="headline" align="right">
                {formatMoney(totalAmount)}
              </Typography>
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={12}>
              <ExpansionPanel elevation={0}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="body1" color="textSecondary">
                    Detalhes
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container direction="row" alignItems="center">
                    <Grid item xs={7}>
                      <Typography variant="body1">Subs. de Férias</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="title" align="right">
                        {formatMoney(vacations)}
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">Subs. de Natal</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="title" align="right">
                        {formatMoney(thirteenth)}
                      </Typography>
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button color="primary" component={Link} to={urls.payments.path}>
            Ver
          </Button>
          <Button color="primary" component={Link} to={urls.addPayment.path}>
            Criar Novo
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default PaymentsWidget;
