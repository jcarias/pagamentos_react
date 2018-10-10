import React from "react";
import { Link } from "react-router-dom";
import { urls } from "../../utils/urlUtils";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AlarmIcon from "@material-ui/icons/AlarmRounded";
import { months_pt } from "../../utils/dateUtils";
import { Grid, Divider, CardActionArea } from "@material-ui/core";
import { formatMoney } from "../../utils/StringUtils";
import { computeServicesMetrics } from "../../utils/DomainUtils";
import UnpaidServicesList from "../UnpaidServicesList";
import { isEmpty } from "../../utils/commonUtils";

const ServicesWidget = props => {
  const { classes, year, month, services } = props;
  const { count, totalCost } = computeServicesMetrics(services);
  return (
    <Card>
      <CardActionArea component={Link} to={urls.services.path}>
        <CardContent className={classes.widgetHeader}>
          <AlarmIcon className={classes.widgetMedia} />
          <Typography variant="headline" component="h2" color="inherit">
            Serviços
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="subheading" align="center">
              Mês actual
            </Typography>
          </Grid>
          <Grid item>
            <ExpansionPanel elevation={0}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                  <Grid item xs={12}>
                    <Typography variant="headline" noWrap>
                      {months_pt[month] + " " + year}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="display1" noWrap>
                      {formatMoney(totalCost)}
                    </Typography>
                    <Typography variant="caption" noWrap>
                      {count} seriço(s)
                    </Typography>
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                {isEmpty(services) ? (
                  <Typography variant="body1">
                    Sem serviços registados para o corrente mês.
                  </Typography>
                ) : (
                  <Grid container direction="column">
                    <Typography variant="subheading">
                      Lista de Serviços
                    </Typography>
                    <Divider />
                    <UnpaidServicesList services={services} />
                  </Grid>
                )}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" component={Link} to={urls.services.path}>
          Ver serviços
        </Button>
        <Button color="primary" component={Link} to={urls.addService.path}>
          Adicionar Novo
        </Button>
      </CardActions>
    </Card>
  );
};

export default ServicesWidget;
