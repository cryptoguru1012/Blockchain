import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import { RaisedButton, Snackbar } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import { doRegister, showSnackbar } from '../../redux/actions/auth';

const mainStyle = { width: '100%', padding: 0 };
const spinnerStyle = { margin: 'auto', display: 'block' };

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
      <div style={{ textAlign: 'center', width: '300px', margin: '200px auto' }}>
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

function mapStateToProps(state) {
  const register = state.register;
  return { register };
}

export default connect(mapStateToProps)(Register);

