import React from "react";
import { Link } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    ListItemSecondaryAction,
    IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import {
    getWorkerAvatarInitials,
    getWorkerName
} from "../../utils/DomainUtils";
import { formatMoney } from "../../utils/StringUtils";
import { isNotEmpty } from "../../utils/commonUtils";
import { urls } from "../../utils/urlUtils";

const WorkersList = ({ workers }) => {
    return (
        <List>
            {isNotEmpty(workers) ? (
                Object.keys(workers).map(key => {
                    let w = workers[key];
                    return (
                        <ListItem
                            key={key}
                            button
                            divider
                            component={Link}
                            to={urls.updateWorker.path.replace(":id", key)}
                        >
                            <ListItemAvatar>
                                <Avatar>{getWorkerAvatarInitials(w)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={getWorkerName(w)}
                                secondary={formatMoney(w.priceHour)}
                            />
                            <ListItemSecondaryAction>
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
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
