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
			return this.props.categories.map((category, i) => {
				if(i == 0){
					return (<MenuItem required key={i} value={category.cat} primaryText={category.cat} />);
				}else{
					return (<MenuItem key={i} value={category.cat} primaryText={category.cat} />);
				}
				
			})
		}
	}

	render() {
		let required = (this.props.required) ? true: false;
		return (
			<FormsySelect name={this.props.name} floatingLabelText={this.props.label} required={required} fullWidth={this.props.fullWidth}>
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
