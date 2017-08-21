import React, { Component } from 'react';
import * as actions from '../../redux/actions/sortActions.js';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PaginationField from './PaginationField';
import SorterForm from './SorterForm';

class Sorter extends Component {
  componentDidMount() {
    this.props.fetchOffers();
  }

  renderItems() {
    return this.props.itemSorted.map((item, i) =>
      <div key={i} style={{ border: '1px solid #ddd' }}>
        <h3>
          {item.title}
        </h3>
        <p>
          price: {item.price} {item.currency}
        </p>
        <p>
          payment options: {item.paymentoptions_display}
        </p>
        <p>
          category: {item.category}
        </p>
        <p>
          distanceFromUser: {item.distanceFromUser}
        </p>
      </div>,
    );
  }

  submitSort(values) {
    console.log(values);
    this.props.sortOffers(values);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div style={{ margin: '100px 20px 0px 20px' }}>
        <form
          onSubmit={handleSubmit(this.submitSort.bind(this))}
          style={{
            width: '100%',
            border: '1px solid #333',
            background: '#f9f9f9',
            padding: 16,
            margin: 16,
          }}
        >
          <SorterForm />
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear
          </button>
        </form>
        {this.renderItems()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    itemSorted: state.sorter,
  };
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: 'sorter',
  })(Sorter),
);

// <---- IGNORE BELOW CODE USED TO HELP WITH REDUX FORM --->

// import React from 'react';
// import { Field, reduxForm } from 'redux-form';
//
// function submit(values) {
//   console.log(values);
// }
//
// const SimpleForm = (props) => {
//   const { handleSubmit, pristine, reset, submitting } = props;
//   return (
//     <form onSubmit={handleSubmit(submit)}>
//       <div>
//         <label>First Name</label>
//         <div>
//           <Field name="firstName" component="input" type="text" placeholder="First Name" />
//         </div>
//       </div>
//       <div>
//         <label>Last Name</label>
//         <div>
//           <Field name="lastName" component="input" type="text" placeholder="Last Name" />
//         </div>
//       </div>
//       <div>
//         <label>Email</label>
//         <div>
//           <Field name="email" component="input" type="email" placeholder="Email" />
//         </div>
//       </div>
//       <div>
//         <label>Sex</label>
//         <div>
//           <label>
//             <Field name="sex" component="input" type="radio" value="male" /> Male
//           </label>
//           <label>
//             <Field name="sex" component="input" type="radio" value="female" /> Female
//           </label>
//         </div>
//       </div>
//       <div>
//         <label>Favorite Color</label>
//         <div>
//           <Field name="favoriteColor" component="select">
//             <option />
//             <option value="ff0000">Red</option>
//             <option value="00ff00">Green</option>
//             <option value="0000ff">Blue</option>
//           </Field>
//         </div>
//       </div>
//       <div>
//         <label htmlFor="employed">Employed</label>
//         <div>
//           <Field name="employed" id="employed" component="input" type="checkbox" />
//         </div>
//       </div>
//       <div>
//         <label>Notes</label>
//         <div>
//           <Field name="notes" component="textarea" />
//         </div>
//       </div>
//       <div>
//         <button type="submit" disabled={pristine || submitting}>
//           Submit
//         </button>
//         <button type="button" disabled={pristine || submitting} onClick={reset}>
//           Clear Values
//         </button>
//       </div>
//     </form>
//   );
// };
//
// export default reduxForm({
//   form: 'simple', // a unique identifier for this form
// })(SimpleForm);
