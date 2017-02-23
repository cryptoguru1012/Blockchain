import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import { RaisedButton, Snackbar } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import { doRegister, showSnackbar } from '../../redux/actions/auth';

const mainStyle = { width: '100%', padding: 0 };
const spinnerStyle = { margin: 'auto', display: 'block' };

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
	background: "rgb(255, 109, 0)",
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

    this.state = { name: { first: '', last: '' }, email: '', password: '', canSubmit: false };
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSnackbarSuccessRequestClose = this.handleSnackbarSuccessRequestClose.bind(this);
    this.handleSnackbarErrorRequestClose = this.handleSnackbarErrorRequestClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  handleSnackbarSuccessRequestClose(reason) {
    if (reason !== 'clickaway' && !this.props.register.error) {
      window.location.href = '/keystone/signin/'
    }
  }
  handleSnackbarErrorRequestClose() {
    this.props.dispatch(showSnackbar());
  }

  handleSubmit() {
    this.props.dispatch(doRegister(this.state));
  }

  renderRegisterForm() {
    return (
      <div style={ register_form }>
        <h4 style={ register_title }>{"Register"}</h4>
        <div style={ register_body }>
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.handleSubmit}
        >
          <FormsyText
            hintText="First name"
            name="firstName"
            required
            requiredError="This field is required"
            validations="isSpecialWords"
            validationError="Please only use letters"
            style ={ register_input }
            onChange={(e, val) => {
              this.setState({ name: { ...this.state.name, first: val } });
            }}
          />
          <br />
          <FormsyText
            hintText="Last name"
            name="lastName"
            required
            requiredError="This field is required"
            validations="isSpecialWords"
            validationError="Please only use letters"
            style ={ register_input }
            onChange={(e, val) => {
              this.setState({ name: { ...this.state.name, last: val } });
            }}
          />
          <br />
          <FormsyText
            hintText="Email"
            required
            name="email"
            validations="isEmail"
            validationError="This is not a valid email"
            requiredError="This field is required"
            style ={ register_input }
            onChange={(e, val) => {
              this.setState({ email: val });
            }}
          />
          <br />
          <FormsyText
            hintText="Password"
            type="password"
            name="password"
            required
            requiredError="This field is required"
            style ={ register_input }
            onChange={(e, val) => {
              this.setState({ password: val });
            }}
          />
          <FormsyText
            hintText="Confirm password"
            type="password"
            name="repeated_password"
            validations="equalsField:password"
            validationError="Passwords must match"
          />
          <br />
          {!this.props.register.loading &&
            <RaisedButton
              label="Send"
              type="submit"
              primary={false}
              buttonStyle={btn_boder_radius.borderRadius}
              backgroundColor="rgb(255, 109, 0)"
              labelColor="#fff"
              fullWidth
              disabled={!this.state.canSubmit}
            />}
        </Formsy.Form>
        {this.props.register.loading &&
          !this.props.register.success &&
          <CircularProgress size={50} style={spinnerStyle} />}
        <Snackbar
          open={this.props.register.success}
          message={this.props.register.message}
          autoHideDuration={2000}
          onRequestClose={this.handleSnackbarSuccessRequestClose}
        />
        <Snackbar
          open={this.props.register.showSnackbar}
          message={this.props.register.message}
          autoHideDuration={2000}
          onRequestClose={this.handleSnackbarErrorRequestClose}
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

function mapStateToProps(state) {
  const register = state.register;
  return { register };
}

export default connect(mapStateToProps)(Register);

