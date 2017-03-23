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
          <MenuItem
            onTouchTap={this.cerrar.bind(this)}
            primaryText="Home"
            containerElement={<Link to="/" />}
          />
          <MenuItem
            disabled
            onTouchTap={this.cerrar.bind(this)}
            primaryText="Browse"
            containerElement={<Link to="/" />}
          />
          <MenuItem
            onTouchTap={this.cerrar.bind(this)}
            primaryText="Sell"
            containerElement={<Link to="/store/newItem" />}
          />
          <MenuItem
            disabled
            onTouchTap={this.cerrar.bind(this)}
            primaryText="About"
            containerElement={<Link to="/" />}
          />
          <MenuItem
            disabled
            onTouchTap={this.cerrar.bind(this)}
            primaryText="Register"
            containerElement={<Link to="/register" />}
          />
          <MenuItem
            disabled
            onTouchTap={this.cerrar.bind(this)}
            primaryText="Profile"
            containerElement={<Link to="/keystone/signin" />}
          />
        </Drawer>
      </div>
    );
  }
}

export default Menu;
