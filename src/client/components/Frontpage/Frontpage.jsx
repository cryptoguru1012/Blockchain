import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col, Grid, Button } from 'react-bootstrap';
import { RaisedButton } from 'material-ui';

const homeStyle = {
  wellStyles: {
    width: '330px',
    margin: '0 auto 10px',
  },
  centerStyle: {
    minHeight: '76vh',
    display: 'flex',
    alignItems: 'center',
  },
  buttonsStyle:{
    marginTop: '10px',
  }
};

class Frontpage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <div style={homeStyle.centerStyle}>
          <div style={homeStyle.wellStyles}>
            <RaisedButton
              label="Browser"
              labelColor="#fff"
              // containerElement={<Link to="/browser" />}
              fullWidth
              primary={true}
              disabled={true}
            />
            <RaisedButton
              label="Sell"
              labelColor="#fff"
              containerElement={<Link to="/store/newItem" />}
              fullWidth
              primary={true}
              style={homeStyle.buttonsStyle}
            />
            <RaisedButton
              label="About"
              labelColor="#fff"
              // containerElement={<Link to="/about" />}
              fullWidth
              primary={true}
              style={homeStyle.buttonsStyle}
              disabled={true}
            />
          </div>
        </div>
      </Grid>
    );
  }
}

export default connect()(Frontpage);
