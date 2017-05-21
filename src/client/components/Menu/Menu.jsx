import React, { Component, PropTypes } from 'react';
import {
  Row,
  Col,
  Grid,
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
} from 'react-bootstrap';
import { Router, Route, Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import  SSIcon from "./icon"

require('./styles/menu.scss');

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  cerrar() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Navbar fixedTop fluid staticTop className="navegador">
          <AppBar
            title="moovr"
            titleStyle= {{ fontFamily:'verdana', fontWeight:'bold'}}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            className="appbar-color"
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
            iconElementLeft={<IconButton><SSIcon /></IconButton>}
            onTouchTap={this.handleToggle.bind(this)}
          />
        </Navbar>
        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={open => this.setState({ open })}
        >
          <AppBar showMenuIconButton={false} title="Menu" />
          <Link to="/">
            <MenuItem onTouchTap={this.cerrar.bind(this)} primaryText="Home" />
          </Link>
          <Link to="/store/newItem">
            <MenuItem onTouchTap={this.cerrar.bind(this)} primaryText="Sell" />
          </Link>
          <MenuItem
            disabled
            onTouchTap={this.cerrar.bind(this)}
            primaryText="About"
          />
          <MenuItem
            disabled
            onTouchTap={this.cerrar.bind(this)}
            primaryText="Register"
          />
          <MenuItem
            disabled
            onTouchTap={this.cerrar.bind(this)}
            primaryText="Profile"
          />
        </Drawer>
      </div>
    );
  }
}

export default Menu;
