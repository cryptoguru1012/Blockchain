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
import VideoPanel from './VideoPanel';


const mainStyle = {
  width: '100%',
  padding: 0,
};

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
    
    this.state = {
      name: '',
      category: '',
      price: 0,
      currency: '',
      paymentOptions: '',
      certificate: false,
      itemDescription: '',
      videoBlobUrl: ''
    };
  }

  componentWillMount() {
      this.props.dispatch(doCategoryReq());
  }

  renderNewItemForm() {
    return (
      <div style={style_form}>
        <h4 style={ form_title }>{"New Item"}</h4>
        <div style={ form_body }>      
          <TextField
            floatingLabelText="Item name"
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
            floatingLabelText="Price"
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
            floatingLabelText="Description"
            hintText='Description'
            multiLine={true}
            onChange={(e, val) => {
              this.setState({ itemDescription: val });
            }}
            fullWidth={true}
          />
          <VideoPanel />
          <p>{this.props.newItem.succes ? 'Success!' : ''}</p>
          <p>{this.props.newItem.error ? 'An error has occurred' : ''}</p>
          <RaisedButton
            label="Send"
            primary={false}
            fullWidth={true}
            backgroundColor="rgb(255, 109, 0)"
            labelColor="#fff"
            onClick={() => {
              const fd = new FormData();
              
              fd.append('name', this.state.name);
              fd.append('category', this.state.category);
              fd.append('price', this.state.price);
              fd.append('currency', this.state.currency);
              fd.append('paymentOptions', this.state.paymentOptions);
              fd.append('certificate', this.state.certificate);
              fd.append('itemDescription', this.state.itemDescription);

              if (window.Video) {
                fd.append('productVideo', window.Video.getBlob());
              }

              this.props.dispatch(doItemCreate(fd));
            }}
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

    return {
        categories,
        newItem
    };
}

export default connect(mapStateToProps)(NewItem);
