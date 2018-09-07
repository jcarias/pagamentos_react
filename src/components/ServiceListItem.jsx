import React from "react";
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Avatar
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

const ServiceListItem = props => {
    const { serviceDate, worker } = props.serviceData;
    const { workerData, onDelete, serviceKey } = props;

    return (
        <ListItem
            button={true}
            onClick={() => props.onItemClick(serviceKey, props.serviceData)}
        >
            <ListItemAvatar>
                <Avatar>W</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={workerData ? workerData.fname : worker}
                secondary={
                    serviceDate
                        ? new Date(serviceDate).toLocaleDateString()
                        : null
                }
            />
            <ListItemSecondaryAction>
                <IconButton
                    aria-label="Delete"
                    onClick={() => onDelete(serviceKey)}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default ServiceListItem;
