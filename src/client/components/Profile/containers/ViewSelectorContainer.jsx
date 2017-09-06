import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import ViewSelector from '../components/ViewSelector';
import * as baseActions from '../../../redux/reducers/base';

const Wrapper = styled.div`
    width: 1400px;
    margin: 0 auto; 
    margin-top: 4rem;
    margin-bottom: 0.2rem;
    padding: 0rem;
`;

class ViewSelectorContainer extends Component {
  handleSelect(view) {
    const { BaseActions } = this.props;
    BaseActions.setView(view);
  }

  render() {
    const { view } = this.props;
    const { handleSelect } = this;

    return (
      <Wrapper>
        <ViewSelector selected={view} onSelect={handleSelect} />
      </Wrapper>
    );
  }
}

//
export default connect(
    state => ({
      view: state.base.get('view'),
    }),
    dispatch => ({
      BaseActions: bindActionCreators(baseActions, dispatch),
    }),
)(ViewSelectorContainer);
