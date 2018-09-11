import React from "react";
import {
    List,
    ListItem,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
    dateFormatter,
    formatDuration,
    formatMoney
} from "../utils/StringUtils";
import AlarmIcon from "@material-ui/icons/AlarmRounded";
import { calcServiceCost } from "../utils/DomainUtils";

const styles = theme => ({
    root: {
        width: "100%"
    }
});

const UnpaidServicesList = ({ services, ...props }) => {
    const { classes } = props;
    return (
        <List className={classes.root}>
            {services &&
                Object.keys(services).map(key => {
                    let service = services[key];
                    let dateStr = dateFormatter(new Date(service.serviceDate));
                    let duration = formatDuration(
                        service.serviceHours,
                        service.serviceMinutes
                    );
                    let total = formatMoney(calcServiceCost(service));
                    return (
                        <ListItem key={key}>
                            <Avatar>
                                <AlarmIcon />
                            </Avatar>
                            <ListItemText
                                primary={dateStr}
                                secondary={duration}
                            />
                            <ListItemSecondaryAction>
                                <Typography variant="subheading">
                                    {total}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
        </List>
    );
};

export default withStyles(styles)(UnpaidServicesList);
