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

const container_register = {
  /*margin: "0 auto",
  maxWidth: "385px",
  border: "12px solid rgba(0, 0, 0, 0.45)",
  borderRadius: 5,*/
  display:"flex",
  alignItems: "center",
  flexDirection: "column", 
  justifyContent: "center",
  width: "100%",
  minHeight: "100%",
  padding: 20,
  background:"#E0E0E0"
}

const register_form = {
  width: "90%",
  maxWidth: 380,
  background: "#ffffff",
  position: "relative",
  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.3)"
}

const register_title = {
  margin:0,
  fontSize:25,
	lineHeight: "64px",
	width: "100%",
	height: 64,
	padding: "0 16px",
	color: "#fff",
	background: "#2196F3",
  textAlign:"center"
}

const register_body = {
  padding: "10px 20px 20px 20px",
}


const register_input = {
  marginBottom: 10,
  width:"100%"
}

const btn_boder_radius = {
  borderRadius:{
    borderRadius:"0px"
  }
}

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
      <div style={ register_form }>
        <h4 style={ register_title }>{"Register"}</h4>
        <div style={ register_body }>
          <TextField
            floatingLabelText="First name"
            hintText='First name'
            style ={ register_input }
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
            floatingLabelText="Last name"
            hintText='Last name'
            style ={ register_input }
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
            floatingLabelText="Email"
            hintText='Email'
            style ={ register_input }
            onChange={(e, val) => {
              this.setState({ email: val });
            }}
          />
          <br/>
          <TextField
            floatingLabelText="Password"
            hintText='Password'
            style ={ register_input }
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
            fullWidth={false}
            buttonStyle={btn_boder_radius.borderRadius}
            backgroundColor="#2196F3"
            labelColor="#fff"
            onClick={() => {
              this.props.dispatch(doRegister(this.state));
            }}
          />
        </div>       
        
      </div>
    );
  }

  render() {
    return ( 
      <div className="container" style={container_register}>
        {this.renderRegisterForm()}
      </div>
    );
  }

}

export default connect()(Register);