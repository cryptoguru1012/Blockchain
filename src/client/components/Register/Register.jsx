import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import { RaisedButton, Snackbar } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import { doRegister } from '../../redux/actions/auth';

const mainStyle = { width: '100%', padding: 0 };
const spinnerStyle = { margin: 'auto', display: 'block', padding: 5 };

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = { name: { first: '', last: '' }, email: '', password: '', canSubmit: false };
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  handleSnackbarRequestClose(reason) {
    if (reason !== 'clickaway' && !this.props.register.error) {
      window.location.reload();
    }
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
            onChange={(e, val) => {
              this.setState({ name: { ...this.state.name, first: val } });
            }}
          />
          <br />
          <FormsyText
            hintText="Last name"
            name="lastName"
            required
            onChange={(e, val) => {
              this.setState({ name: { ...this.state.name, last: val } });
            }}
          />
          <br />
          <FormsyText
            hintText="Email"
            required
            name="email"
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
            onChange={(e, val) => {
              this.setState({ password: val });
            }}
          />
          <br />
          {this.props.register.loading &&
            !this.props.register.success &&
            <CircularProgress size={50} style={spinnerStyle} />}
          <Snackbar
            open={this.props.register.success}
            message={this.props.register.message}
            autoHideDuration={2000}
            onRequestClose={this.handleSnackbarRequestClose}
          />
          <Snackbar
            open={(this.props.register.error) || false }
            message={this.props.register.message}
            autoHideDuration={2000}
          />
          <RaisedButton
            label="Send"
            type="submit"
            primary={false}
            fullWidth
            disabled={!this.state.canSubmit}
          />
        </Formsy.Form>
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

