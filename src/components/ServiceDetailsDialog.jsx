import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Divider
} from "@material-ui/core";
import { Link } from "react-router-dom";
import FieldDisplay from "./FieldDisplay";
import { urls } from "../utils/urlUtils";
import { getWorkerName, calcServiceCost } from "../utils/DomainUtils";
import { pad, trail } from "../utils/StringUtils";

const ServiceDetailsDialog = props => {
    const { serviceDetailsOpen, handleClose, selection } = props;
    const noValue = "---";
    return (
        <Dialog
            open={serviceDetailsOpen}
            onClose={handleClose}
            aria-labelledby="service-details-title"
        >
            <DialogTitle id="service-details-title">
                Detalhes do Serviço
            </DialogTitle>
            <DialogContent>
                <FieldDisplay
                    caption="Trabalhador"
                    value={selection && selection.serviceDate}
                    formatter={value =>
                        value ? getWorkerName(selection.worker) : noValue
                    }
                />
                <FieldDisplay
                    caption="Data do Serviço"
                    value={selection && selection.serviceDate}
                    formatter={value =>
                        value ? new Date(value).toLocaleDateString() : noValue
                    }
                />
                <FieldDisplay
                    caption="Duração"
                    value={selection}
                    formatter={value =>
                        value
                            ? pad(value.serviceHours || 0, 2) +
                              ":" +
                              pad(value.serviceMinutes || 0, 2)
                            : noValue
                    }
                />
                <FieldDisplay
                    caption="Preço/Hora"
                    value={selection.priceHour}
                    formatter={value =>
                        value ? trail(value, 2) + " €" : noValue
                    }
                />
                <FieldDisplay
                    caption="Custo Total"
                    value={selection}
                    formatter={value => trail(calcServiceCost(value), 2) + " €"}
                    valueVariant="body2"
                />
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Fechar
                </Button>
                <Button
                    component={Link}
                    to={urls.updateService.path.replace(":id", selection.key)}
                    color="secondary"
                    autoFocus
                >
                    Editar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ServiceDetailsDialog;
