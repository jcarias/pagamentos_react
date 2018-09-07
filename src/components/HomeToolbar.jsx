import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Toolbar,
    IconButton,
    Typography,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import BackIcon from "@material-ui/icons/ArrowBackRounded";
import HelpIcon from "@material-ui/icons/HelpRounded";

import AlarmIcon from "@material-ui/icons/AlarmRounded";
import PersonIcon from "@material-ui/icons/PersonRounded";
import MonetizationIcon from "@material-ui/icons/MonetizationOnRounded";

import { urls } from "../utils/urlUtils";

class HomeToolbar extends Component {
    state = {
        openDrawer: false
    };

    toggleDrawer = () => {
        this.setState({
            openDrawer: !this.state.openDrawer
        });
    };

    render() {
        return (
            <React.Fragment>
                <SwipeableDrawer
                    open={this.state.openDrawer}
                    onClose={this.toggleDrawer}
                    onOpen={this.toggleDrawer}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer}
                        onKeyDown={this.toggleDrawer}
                    >
                        <List component="nav">
                            <ListItem button onClick={this.toggleDrawer}>
                                <ListItemIcon>
                                    <BackIcon />
                                </ListItemIcon>
                            </ListItem>
                            <Divider />
                            <ListItem
                                button
                                component={Link}
                                to={urls.services.path}
                            >
                                <ListItemIcon>
                                    <AlarmIcon />
                                </ListItemIcon>
                                <ListItemText primary="Serviços" />
                            </ListItem>
                            <ListItem button disabled>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="Trabalhadores" />
                            </ListItem>
                            <ListItem button disabled>
                                <ListItemIcon>
                                    <MonetizationIcon />
                                </ListItemIcon>
                                <ListItemText primary="Pagamentos" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List component="nav">
                            <ListItem
                                button
                                component={Link}
                                to={urls.about.path}
                            >
                                <ListItemIcon>
                                    <HelpIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sobre" />
                            </ListItem>
                        </List>
                    </div>
                </SwipeableDrawer>
                <Toolbar>
                    <IconButton onClick={this.toggleDrawer} color="inherit">
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="title"
                        color="inherit"
                        style={{ flexGrow: 1 }}
                    >
                        Pagamentos & Serviços
                    </Typography>

                    <IconButton
                        component={Link}
                        to={urls.about.path}
                        color="inherit"
                    >
                        <HelpIcon />
                    </IconButton>
                </Toolbar>
            </React.Fragment>
        );
    }
}

export default HomeToolbar;
