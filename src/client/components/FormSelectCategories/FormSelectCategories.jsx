import React from 'react';
import { connect } from 'react-redux';
import { FormsySelect } from 'formsy-material-ui/lib';
import { MenuItem } from 'material-ui';

import { doCategoryReq } from '../../redux/actions/store/category';

/**
 * class FormSelectCategories
 *
 * Dropdown select for Categories
 */
class FormSelectCategories extends React.Component {
	constructor(props) {
		super(props);

		this.props.getCategories();
	}

	renderCategories() {
		if (this.props.categories.categories.length > 0) {
			return this.props.categories.categories.map((category, i) => {
				if(i == 0){
					return (<MenuItem required key={i} value={category.cat} primaryText={category.cat} />);
				}else{
					return (<MenuItem key={i} value={category.cat} primaryText={category.cat} />);
				}
				
			})
		}
	}

	render() {
		if (this.props.categories.error)
			alert('Error:\nCould not fetch categories\n' + this.props.categories.message);
		const props = Object.assign({}, this.props);
		delete props.categories;
		delete props.getCategories;
		return (
			<FormsySelect {...props} floatingLabelText={this.props.label}>
				{this.renderCategories()}
			</FormsySelect>
		);
	}
}

function mapStateToProps(state) {
  const categories = state.categories;

  return { categories };
}

function mapDispatchToProps(dispatch) {
  	return {
		getCategories: () => {
		  dispatch(doCategoryReq());
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FormSelectCategories);
