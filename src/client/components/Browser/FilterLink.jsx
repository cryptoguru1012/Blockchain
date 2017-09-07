import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { setVisibilityFilter } from '../../redux/actions/browser';
import { fetchOffers, getFilterOption } from '../../redux/actions/sortActions';

const styles = {
  filter: {
    padding: '5px 10px',
    color: 'rgba(0, 0, 0, 0.298039)',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'inline-block',
  },
};

/**
 * Class FilterLink
 */
class FilterLink extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick();
    this.props.fetchOffers();
    this.props.getFilterOption(this.props.filter);
  }

  render() {
    if (this.props.active) {
      return (
        <span style={{ ...styles.filter, color: '#263238' }}>
          {this.props.children}
        </span>
      );
    }

    return (
      <a href="#" onClick={e => this.handleClick(e)} style={styles.filter}>
        {this.props.children}
      </a>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.browser.filter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
  fetchOffers: () => {
    dispatch(fetchOffers());
  },
  getFilterOption: option => dispatch(getFilterOption(option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterLink);
