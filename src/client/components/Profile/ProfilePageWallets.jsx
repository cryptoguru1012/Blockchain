
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ViewSelectorContainer from './containers/ViewSelectorContainer';
import Container from './containers/Container';
import WalletModalContainer from './containers/WalletModalContainer';
import WalletListContainer from './containers/WalletListContainer';

class ProfilePageWallets extends Component {
  render() {
    const { view } = this.props;
    return (
      <div>
        <ViewSelectorContainer />
        {/* display container depend on view */}

        <Container visible={view === 'wallet'}>
          <WalletListContainer />
        </Container>
        <WalletModalContainer />

      </div>
    );
  }
}

ProfilePageWallets.propsTypes = {
  view: PropTypes.string,
};


export default connect(
    state => ({
      view: state.base.get('view'),
    }),
)(ProfilePageWallets);
