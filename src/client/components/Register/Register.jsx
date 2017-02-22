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
  background:"#757575"
}

const register_form = {
  borderRadius: "2px 2px 5px 5px",
  padding: "10px 20px 20px 20px",
  width: "90%",
  maxWidth: 380,
  background: "#ffffff",
  position: "relative",
  paddingBottom: 80,
  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.3)"
}

const register_title = {
  color: "#444",
  fontSize: "1.2em",
  fontWeight: "bold",
  margin: "10px 0 30px 0",
  borderBottom: "1px solid #eee",
  paddingBottom: 20
}

const register_btn = {
  width: "100%",
  height: "100%",
  padding: "10px 10px",
  background: "#2196F3",
  color: "#fff",
  display: "block",
  border: "none",
  marginTop:20,
  position: "absolute",
  left: 0,
  bottom: 0,
  maxHeight: 60,
  border: "0px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "0 0 2px 2px",
  transform: "rotateZ(0deg)",
  transition: "all 0.1s ease-out",
  borderBottomWidth: 7,
}

const register_input = {
  marginBottom: 10,
  width:"100%"
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
        <p style={ register_title }>{"Register"}</p>
        <TextField
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
          hintText='Email'
          style ={ register_input }
          onChange={(e, val) => {
            this.setState({ email: val });
          }}
        />
        <br/>
        <TextField
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
        <button
          label="Send"
          //primary={false}
          //fullWidth={true}
          style= { register_btn }
          onClick={() => {
            this.props.dispatch(doRegister(this.state));
          }}
        >
          {"Register"}
        </button>
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