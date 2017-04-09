import React from 'react';
import { connect } from 'react-redux';
import { FormsySelect } from 'formsy-material-ui/lib';
import { MenuItem } from 'material-ui';

import { doCategoryReq } from '../../redux/actions/store/category';

class Browser extends React.Component {
	constructor(props) {
		super(props);

		this.props.getCategories();
	}

	renderCategories() {
		if (this.props.categories.length > 0) {
			return this.props.categories.map(category => {
				return <MenuItem key={category._id} value={category.name} primaryText={category.name} />
			})
		}
	}

	render() {
		return (
			<FormsySelect name={this.props.name} floatingLabelText={this.props.label} required fullWidth={this.props.fullWidth}>
				{this.renderCategories()}
			</FormsySelect>
		);
	}
}

function mapStateToProps(state) {
  const categories = state.categories.categories;

  return { categories };
}

function mapDispatchToProps(dispatch) {
  	return {
		getCategories: () => {
		  dispatch(doCategoryReq());
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
