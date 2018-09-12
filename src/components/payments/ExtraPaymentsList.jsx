import React from "react";
import {
    List,
    ListItemText,
    ListItem,
    Typography,
    ListItemIcon,
    Divider
} from "@material-ui/core";
import { isNotEmpty, isEmpty } from "../../utils/commonUtils";
import MoneyIcon from "@material-ui/icons/AttachMoneyRounded";
import { formatMoney } from "../../utils/StringUtils";

const ExtraPaymentsList = ({ extraPayments, noFoundMessage }) => {
    console.log(extraPayments);
    return (
        <React.Fragment>
            {isNotEmpty(extraPayments) && (
                <List>
                    {extraPayments.map((extra, index) => {
                        return (
                            <ListItem key={index} divider dense>
                                <ListItemIcon>
                                    <MoneyIcon />
                                </ListItemIcon>
                                <ListItemText>{extra.description}</ListItemText>
                                <ListItemText>
                                    {formatMoney(extra.value)}
                                </ListItemText>
                                <Divider />
                            </ListItem>
                        );
                    })}
                </List>
            )}
            {isEmpty(extraPayments) && (
                <Typography variant="body1">
                    {noFoundMessage || "Sem extras."}
                </Typography>
            )}
        </React.Fragment>
    );
};

export default ExtraPaymentsList;
