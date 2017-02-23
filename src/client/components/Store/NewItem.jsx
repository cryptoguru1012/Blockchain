import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';
import { RaisedButton, MenuItem, Snackbar } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsySelect, FormsyText, FormsyToggle } from 'formsy-material-ui/lib';
import { doCategoryReq } from '../../redux/actions/store/category';
import { doItemCreate, showSnackbar } from '../../redux/actions/store/new_item';
import VideoPanel from './VideoPanel';

const mainStyle = { width: '100%', padding: 0 };

const spinnerStyle = { margin: 'auto', display: 'block', padding: 5 };

const container_form = {
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

const style_form = {
  width: "90%",
  maxWidth: 500,
  background: "#ffffff",
  position: "relative",
  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.3)"
}

const form_title = {
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

const form_body = {
  padding: "10px 20px 20px 20px",
}

const register_input = {
  marginBottom: 10,
  width:"100%"
}




class NewItem extends React.Component {
  constructor(props) {
    super(props);

    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSnackbarSuccessRequestClose = this.handleSnackbarSuccessRequestClose.bind(this);
    this.handleSnackbarErrorRequestClose = this.handleSnackbarErrorRequestClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { canSubmit: false };
  }

  componentWillMount() {
    this.props.dispatch(doCategoryReq());
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  handleSnackbarSuccessRequestClose(reason) {
    if (reason !== 'clickaway' && !this.props.newItem.error) {
      window.location.reload();
    }
  }

  handleSnackbarErrorRequestClose() {
    this.props.dispatch(showSnackbar());
  }

  handleSubmit(data) {
    const fd = new FormData();
    
    fd.append('name', data.name);
    fd.append('category', data.category);
    fd.append('price', data.price);
    fd.append('currency', data.currency);
    fd.append('paymentOptions', data.paymentOptions);
    fd.append('certificate', data.certificate);
    fd.append('itemDescription', data.itemDescription);
    
    if (window.Video) {
      console.log(window.Video);
      fd.append('productVideo', window.Video.getBlob());
    }
    
    
    this.props.dispatch(doItemCreate(fd));
  }

  renderNewItemForm() {
    return (
      <div style={style_form}>
        <h4 style={ form_title }>{"New Item"}</h4>
        <div style={ form_body }>
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.handleSubmit}
        >
        <FormsyText
            hintText="Item name"
            name="name"
            validations="isSpecialWords"
            validationError="Please only use letters"
            requiredError="This field is required"
            required
            fullWidth
          />
          <FormsySelect name="category" floatingLabelText="Category" fullWidth required>
            {this.props.categories.categories.map(item => (
              <MenuItem key={item._id} value={item._id} primaryText={item.name} />
            ))}
          </FormsySelect>
          <br />
          <FormsyText
            name="price"
            hintText="Price"
            validations="isNumeric"
            validationError="Please provide a number"
            fullWidth
            required
            requiredError="This field is required"
          />
          <FormsySelect name="currency" floatingLabelText="Currency" required fullWidth>
            <MenuItem value="USD" primaryText="USD" />
            <MenuItem value="EUR" primaryText="EUR" />
          </FormsySelect>
          <FormsySelect name="paymentOptions" floatingLabelText="Payment" required fullWidth>
            <MenuItem value="Paypal" primaryText="Paypal" />
            <MenuItem value="Credit Card" primaryText="Credit Card" />
            <MenuItem value="Bitcoin" primaryText="Bitcoin" />
          </FormsySelect>
          <FormsyToggle name="certificate" label="Certificate" />
          <FormsyText
            name="itemDescription"
            hintText="Description"
            validations="isAlphanumeric"
            validationError="Please only use letters and/or numbers"
            multiLine
            fullWidth
            required
          />
          <VideoPanel />
          <br />
          {!this.props.newItem.loading &&
            <RaisedButton
              label="Send"
              type="submit"
              primary={false}
              fullWidth
              disabled={!this.state.canSubmit}
            />}
        </Formsy.Form>
        
        {this.props.newItem.loading &&
          !this.props.newItem.success &&
          <CircularProgress size={50} style={spinnerStyle} />}
        <Snackbar
          open={this.props.newItem.success}
          message="Success! Item created."
          autoHideDuration={2000}
          onRequestClose={this.handleSnackbarSuccessRequestClose}
        />
        <Snackbar
          open={this.props.newItem.showSnackbar}
          message={this.props.newItem.message}
          autoHideDuration={2000}
          onRequestClose={this.handleSnackbarErrorRequestClose}
        />
        </div>
      </div>
    );
  }

  render() {
    return ( 
      <div className="container" style={container_form}>
        {this.renderNewItemForm()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const categories = state.categories;
  const newItem = state.newItem;

  return { categories, newItem };
}

export default connect(mapStateToProps)(NewItem);

