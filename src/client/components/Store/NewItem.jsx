import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';
import { RaisedButton, MenuItem } from 'material-ui';
import Formsy from 'formsy-react';
import { FormsySelect, FormsyText, FormsyToggle } from 'formsy-material-ui/lib';
import { doCategoryReq } from '../../redux/actions/store/category';
import { doItemCreate } from '../../redux/actions/store/new_item';

const mainStyle = { width: '100%', padding: 0 };

const spinnerStyle = { margin: 'auto', display: 'block' };

class NewItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      category: '',
      price: 0,
      paymentOptions: '',
      certificate: false,
      itemDescription: '',
      canSubmit: false,
    };
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
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

  renderNewItemForm() {
    return (
      <div style={{ width: '300px', margin: '200px auto' }}>
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={() => {
            this.props.dispatch(doItemCreate(this.state));
          }}
        >
          <FormsyText
            hintText="Item name"
            name="name"
            required
            onChange={(e, val) => {
              this.setState({ name: val });
            }}
            fullWidth
          />
          <FormsySelect
            name="category"
            floatingLabelText="Category"
            value={this.state.category}
            onChange={(e, val) => {
              this.setState({ category: val });
            }}
            fullWidth
            required
          >
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
            onChange={(e, val) => {
              this.setState({ price: val });
            }}
            fullWidth
            required
          />
          <FormsySelect
            name="currency"
            floatingLabelText="Currency"
            value={this.state.currency}
            onChange={(e, val) => {
              this.setState({ currency: val });
            }}
            required
            fullWidth
          >
            <MenuItem value="USD" primaryText="USD" />
            <MenuItem value="BTC" primaryText="BTC" />
          </FormsySelect>
          <FormsySelect
            name="paymentOptions"
            floatingLabelText="Payment"
            required
            value={this.state.paymentOptions}
            onChange={(e, val) => {
              this.setState({ paymentOptions: val });
            }}
            fullWidth
          >
            <MenuItem value="Paypal" primaryText="Paypal" />
            <MenuItem value="Credit Card" primaryText="Credit Card" />
            <MenuItem value="Bitcoin" primaryText="Bitcoin" />
          </FormsySelect>
          <FormsyToggle
            name="certificate"
            label="Certificate"
            onToggle={(e, val) => {
              this.setState({ certificate: val });
            }}
          />
          <FormsyText
            name="itemDescription"
            hintText="Description"
            multiLine
            onChange={(e, val) => {
              this.setState({ itemDescription: val });
            }}
            fullWidth
            required
          />
          {this.props.newItem.loading && <CircularProgress size={50} style={spinnerStyle} />}
          <p>{this.props.newItem.success && 'Success! Item created'}</p>
          <p>{this.props.newItem.error && 'An error has occurred'}</p>
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

