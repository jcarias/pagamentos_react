import React from "react";
import { Grid, Divider } from "@material-ui/core";
import { months_pt } from "../../utils/dateUtils";
import { formatMoney, dateFormatter } from "../../utils/StringUtils";
import {
    getWorkerName,
    getWorker,
    paymentFormats
} from "../../utils/DomainUtils";
import FieldValueDisplay from "../FieldValueDisplay";

const PaymentFieldsDisplay = ({ payment, workers }) => {
    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={8}
        >
            <Grid item>
                <FieldValueDisplay
                    label="Período"
                    value={months_pt[payment.month] + " " + payment.year}
                />
                <Divider />
            </Grid>
            <Grid item>
                <FieldValueDisplay
                    label="Montante"
                    value={formatMoney(payment.total)}
                />
                <Divider />
            </Grid>
            <Grid item>
                <FieldValueDisplay
                    label="Trabalhador"
                    value={getWorkerName(getWorker(workers, payment.worker))}
                />
                <Divider />
            </Grid>
            <Grid item>
                <FieldValueDisplay
                    label="Data pagamento"
                    value={dateFormatter(new Date(payment.paymentDate))}
                />
                <Divider />
            </Grid>
            <Grid item>
                <FieldValueDisplay
                    label="Forma pagamento"
                    value={paymentFormats[payment.paymentForm]}
                />
                <Divider />
            </Grid>
        </Grid>
    );
};

export default PaymentFieldsDisplay;
