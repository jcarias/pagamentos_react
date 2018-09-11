import React from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
    Typography
} from "@material-ui/core";
import {
    dateFormatter,
    formatDuration,
    formatMoney
} from "../utils/StringUtils";
import { calcServiceCost, computeServicesMetrics } from "../utils/DomainUtils";

const UnpaidServicesTable = props => {
    const { services } = props;
    const { count, totalCost } = computeServicesMetrics(services);
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell numeric>Duração</TableCell>
                    <TableCell numeric>Preço/Hora</TableCell>
                    <TableCell numeric>Total</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {services &&
                    Object.keys(services).map(key => {
                        let service = services[key];
                        return (
                            <TableRow key={key}>
                                <TableCell>
                                    {dateFormatter(
                                        new Date(service.serviceDate)
                                    )}
                                </TableCell>
                                <TableCell numeric>
                                    {formatDuration(
                                        service.serviceHours,
                                        service.serviceMinutes
                                    )}
                                </TableCell>
                                <TableCell numeric>
                                    {formatMoney(service.priceHour)}
                                </TableCell>
                                <TableCell numeric>
                                    {formatMoney(calcServiceCost(service))}
                                </TableCell>
                            </TableRow>
                        );
                    })}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>{count} serviços.</TableCell>
                    <TableCell colSpan={2} numeric>
                        <Typography>
                            Total <strong>{formatMoney(totalCost)}</strong>
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default UnpaidServicesTable;
