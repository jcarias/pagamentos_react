import React from "react";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { getWorker, getWorkerName } from "../utils/DomainUtils";
import { urls } from "../utils/urlUtils";
import {
    formatMoney,
    dateFormatter,
    formatDuration
} from "../utils/StringUtils";
import { IconButton } from "@material-ui/core";

const ServicesTable = props => {
    const { services, workers, onDelete } = props;
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Trabalhador</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell numeric>Duração</TableCell>
                    <TableCell numeric>Preço/Hora</TableCell>
                    <TableCell numeric>Total</TableCell>
                    <TableCell />
                </TableRow>
            </TableHead>
            <TableBody>
                {services && Object.keys(services) ? (
                    Object.keys(services).map(key => {
                        let row = services[key];
                        let workerName = getWorkerName(
                            getWorker(workers, row.worker)
                        );
                        return (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row">
                                    {workerName}
                                </TableCell>
                                <TableCell>
                                    {dateFormatter(row.serviceDate, true)}
                                </TableCell>
                                <TableCell numeric>
                                    {formatDuration(
                                        row.serviceHours,
                                        row.serviceMinutes
                                    )}
                                </TableCell>
                                <TableCell numeric>
                                    {formatMoney(row.priceHour)}
                                </TableCell>
                                <TableCell numeric>
                                    {formatMoney(row.totalCost)}
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        component={Link}
                                        to={urls.updateService.path.replace(
                                            ":id",
                                            key
                                        )}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => onDelete(key)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })
                ) : (
                    <TableRow>
                        <TableCell colSpan="6" />
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default ServicesTable;
