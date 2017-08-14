import React from 'react';
import {Row, Col, Grid, Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import  footerStyle from './css/styles.css';
import fonts from '../fonts/style.css';

// var footer = {
//     position: 'absolute',
//     right: 0,
//     bottom: 0,
//     left: 0,
//     padding: '1rem',
//     backgroundColor: '#efefef',
//     textAlign: 'center',
//     height: '100px',
// };

/**
 * class Footer
 */
const Footer = React.createClass({
    render: function() {
        return (
        <div className={fonts.alfaSlabOne} style={{position:"absolute", left:0, right:0, bottom:0 }}>
        {/*  <Row>
            <Col md={12}>*/}
                <div className={footerStyle.footerContent}> © 2002 - 2017 Moovr. All rights reserved. </div>
            {/*</Col>
          </Row>*/}
        </div>
        );
    }
});

export default Footer;
