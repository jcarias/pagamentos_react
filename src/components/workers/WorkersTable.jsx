import React from "react";
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    Typography,
    TableRow,
    IconButton
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { isNotEmpty } from "../../utils/commonUtils";
import { formatMoney } from "../../utils/StringUtils";

const WorkersTable = ({ workers }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Primeiro Nome</TableCell>
                    <TableCell>Último Nome</TableCell>
                    <TableCell numeric>Preço/hora</TableCell>
                    <TableCell>IBAN</TableCell>
                    <TableCell />
                </TableRow>
            </TableHead>
            <TableBody>
                {isNotEmpty(workers) ? (
                    Object.keys(workers).map(key => {
                        let w = workers[key];
                        return (
                            <TableRow key={key}>
                                <TableCell>{w.fname}</TableCell>
                                <TableCell>{w.lname}</TableCell>
                                <TableCell numeric>
                                    {formatMoney(w.priceHour)}
                                </TableCell>
                                <TableCell>{w.bankAccountNumber}</TableCell>
                                <TableCell numeric>
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })
                ) : (
                    <TableRow>
                        <TableCell colSpan={5}>
                            <Typography variant="subheading">
                                Nenhum trabalhador...
                            </Typography>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default WorkersTable;
