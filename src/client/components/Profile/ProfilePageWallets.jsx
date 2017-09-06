
import React, { Component } from 'react';
import { connect } from 'react-redux';
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

export default connect(
    state => ({
      view: state.base.get('view'),
    }),
)(ProfilePageWallets);
