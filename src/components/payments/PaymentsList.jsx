import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Button
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { dateFormatter, formatMoney } from "../../utils/StringUtils";
import { months_pt } from "../../utils/dateUtils";

const styles = theme => ({
  root: {
    flexGrow: 1,

    width: "100%"
  },
  mainCellRow: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  }
});

const PaymentsList = props => {
  const { payments, classes } = props;
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      className={classes.root}
    >
      {payments &&
        Object.keys(payments).map(key => {
          let payment = payments[key];
          return (
            <Grid item key={key} className={classes.mainCellRow}>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={16}
                  >
                    <Grid item>
                      <Typography color="textSecondary">Período</Typography>
                      <Typography variant="body2">
                        {months_pt[payment.month] + " " + payment.year}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography color="textSecondary">Montante</Typography>
                      <Typography variant="body2">
                        {formatMoney(payment.total)}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography color="textSecondary">
                        Data pagamento
                      </Typography>
                      <Typography variant="body2">
                        {dateFormatter(new Date(payment.paymentDate))}
                      </Typography>
                    </Grid>
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  Colocar aqui os detalhes do pagamento!
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                  <Button variant="raised">Editar</Button>
                </ExpansionPanelActions>
              </ExpansionPanel>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default withStyles(styles)(PaymentsList);
