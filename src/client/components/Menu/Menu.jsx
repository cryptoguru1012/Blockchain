import React,  { Component, PropTypes }  from 'react';
import {Row, Col, Grid, Nav, Navbar, NavItem, NavDropdown} from 'react-bootstrap';
import { Router, Route, Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import style from './css/style.css';

class Menu extends Component {

    constructor(props) {
      super(props);
      this.state = {open: false};
    }

    handleToggle () {
      this.setState({open: !this.state.open});
    };

    cerrar () {
      this.setState({open: false});
    }

    render() {
        return (
          <div>
            <Navbar fixedTop fluid staticTop className={style.navegador}>
              <AppBar
                title="Shopshot"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
                onTouchTap={this.handleToggle.bind(this)}
              />
            </Navbar>
            <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
              <AppBar showMenuIconButton={false} title="Routes"	/>
              <MenuItem onTouchTap={this.cerrar.bind(this)}><Link to={'/'}>Home</Link></MenuItem>
              <MenuItem onTouchTap={this.cerrar.bind(this)}><Link to={'/register'}>Register</Link></MenuItem>
              <MenuItem onTouchTap={this.cerrar.bind(this)}><Link to={'/keystone/signin'} target="_blank">Admin</Link></MenuItem>
            </Drawer>
          </div>
          );
    }
}


export default Menu;
