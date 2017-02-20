import React from 'react';
import {connect} from 'react-redux';
import {
  TextField,
  RaisedButton
} from 'material-ui';
import { doRegister } from '../../redux/actions/auth';


const mainStyle = {
  width: '100%',
  padding: 0,
};

class Register extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      name: {
        first: '',
        last: ''
      },
      email: '',
      password: ''
    }
  }
  
  renderRegisterForm() {
    return (
      <div style={{ textAlign: 'center', width: '300px', margin: '200px auto' }}>
        <TextField
          hintText='First name'
          onChange={(e, val) => {
            const toState = {
              name: {
                ...this.state.name,
                first: val	
              }
            };

            this.setState(toState);
          }}
        />
        <br/>
        <TextField
          hintText='Last name'
          onChange={(e, val) => {
            const toState = {
              name: {
                ...this.state.name,
                last: val	
              }
            };

            this.setState(toState);
          }}
        />
        <br/>
        <TextField
          hintText='Email'
          onChange={(e, val) => {
            this.setState({ email: val });
          }}
        />
        <br/>
        <TextField
          hintText='Password'
          type='password'
          onChange={(e, val) => {
            this.setState({ password: val });
          }}
        />
        <br/>
        <p>{this.props.register && this.props.register.success ? 'Success!' : ''}</p>
        <p>{this.props.register && this.props.register.error ? 'An error has occurred' : ''}</p>
        <RaisedButton
          label="Send"
          primary={false}
          fullWidth={true}
          onClick={() => {
            this.props.dispatch(doRegister(this.state));
          }}
        />
      </div>
    );
  }

  render() {
    return ( 
      <div className="container" style={mainStyle}>
        {this.renderRegisterForm()}
      </div>
    );
  }

}

export default connect()(Register);
