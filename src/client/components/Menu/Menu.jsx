import React, { Component, PropTypes } from 'react';
import { Row, Col, Grid, Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import { Router, Route, Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import style from './css/style.css';

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
    const style_bar = {
      backgroundColor: {
        backgroundColor: 'rgb(255, 109, 0)',
      },
    };

    return (
      <div>
        <Navbar fixedTop fluid staticTop className={style.navegador}>
          <AppBar
            title="Shopshot"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            style={style_bar.backgroundColor}
            onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
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
            <MenuItem
              onTouchTap={this.cerrar.bind(this)}
              primaryText="Home"
            />
          </Link>
          <MenuItem
            disabled
            onTouchTap={this.cerrar.bind(this)}
            primaryText="Browse"
          />
          <Link to="/store/newItem">
          <MenuItem
            onTouchTap={this.cerrar.bind(this)}
            primaryText="Sell"
          />
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
