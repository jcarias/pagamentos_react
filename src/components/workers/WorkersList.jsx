import React from "react";
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import {
    getWorkerAvatarInitials,
    getWorkerName
} from "../../utils/DomainUtils";
import { formatMoney } from "../../utils/StringUtils";
import { isNotEmpty } from "../../utils/commonUtils";

const WorkersList = ({ workers }) => {
    return (
        <List>
            {isNotEmpty(workers) ? (
                Object.keys(workers).map(key => {
                    let w = workers[key];
                    return (
                        <ListItem key={key} button divider>
                            <ListItemAvatar>
                                <Avatar>{getWorkerAvatarInitials(w)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={getWorkerName(w)}
                                secondary={formatMoney(w.priceHour)}
                            />
                        </ListItem>
                    );
                })
            ) : (
                <Typography>Nenhum trabalhador.</Typography>
            )}
        </List>
    );
};

export default WorkersList;
