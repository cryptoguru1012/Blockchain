import React from 'react';
import {connect} from 'react-redux';
import {
  TextField,
  RaisedButton,
  SelectField,
  MenuItem,
  Toggle
} from 'material-ui';
import { doCategoryReq } from '../../redux/actions/store/category';
import { doItemCreate } from '../../redux/actions/store/new_item';


const mainStyle = {
  width: '100%',
  padding: 0,
};

class NewItem extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      category: '',
      price: 0,
      paymentOptions: '',
      certificate: false,
      itemDescription: ''
    };
  }

  componentWillMount() {
      this.props.dispatch(doCategoryReq());
  }

  renderNewItemForm() {
    return (
      <div style={{ width: '300px', margin: '200px auto' }}>
        <TextField
          hintText='Item name'
          onChange={(e, val) => {
            const toState = {
                name: val
            };

            this.setState(toState);
          }}
          fullWidth={true}
        />
        <SelectField
          floatingLabelText="Category"
          value={this.state.category}
          onChange={(e, ind, val) => {
            const toState = {
                category: val
            };

            this.setState(toState);
          }}
          fullWidth={true}
        >
            {this.props.categories.categories.map(item => {
                return (
                    <MenuItem
                        value={item._id}
                        primaryText={item.name}
                    />
                );
            })}
        </SelectField>
        <br/>
        <TextField
          hintText='Price'
          type='number'
          onChange={(e, val) => {
            this.setState({ price: val });
          }}
          fullWidth={true}
        />
        <SelectField
          floatingLabelText="Currency"
          value={this.state.currency}
          onChange={(e, ind, val) => {
            const toState = {
              currency: val
            };

            this.setState(toState);
          }}
          fullWidth={true}
        >
            <MenuItem
                value='USD'
                primaryText='USD'
            />
            <MenuItem
                value='BTC'
                primaryText='BTC'
            />
        </SelectField>
        <SelectField
          floatingLabelText="Payment"
          value={this.state.paymentOptions}
          onChange={(e, ind, val) => {
            const toState = {
              paymentOptions: val
            };

            this.setState(toState);
          }}
          fullWidth={true}
        >
            <MenuItem
                value='Paypal'
                primaryText='Paypal'
            />
            <MenuItem
                value='Credit Card'
                primaryText='Credit Card'
            />
            <MenuItem
                value='Bitcoin'
                primaryText='Bitcoin'
            />
        </SelectField>
        <Toggle
            label='Certificate'
            onToggle={(e, isChecked) => {
                const toState = {
                    certificate: isChecked
                };

                this.setState(toState);
            }}
        />
        <TextField
          hintText='Description'
          multiLine={true}
          onChange={(e, val) => {
            this.setState({ itemDescription: val });
          }}
          fullWidth={true}
        />
        <p>{this.props.newItem.succes ? 'Success!' : ''}</p>
        <p>{this.props.newItem.error ? 'An error has occurred' : ''}</p>
        <RaisedButton
          label="Send"
          primary={false}
          fullWidth={true}
          onClick={() => {
            this.props.dispatch(doItemCreate(this.state));
          }}
        />
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

    return {
        categories,
        newItem
    };
}

export default connect(mapStateToProps)(NewItem);
