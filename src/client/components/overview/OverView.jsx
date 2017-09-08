import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ViewSelectorContainer from './containers/FooterSelectorContainer';
import Container from './containers/Container';
import WalletListContainer from './containers/WalletListContainer';

class OverView extends Component {
  render() {
    const { view } = this.props;
    return (
      <div>
        <ViewSelectorContainer />
        {/* display container depend on view */}

        <Container visible={view === 'wallet'}>
          <WalletListContainer />
        </Container>

        <FooterSelectorContainer />
        <FooterContainter visible={view === 'overview'} />
        <FooterContainter visible={view === 'rating'} />
        <FooterContainter visible={view === 'sellerinfo'} />
        <FooterContainter visible={view === 'fag'} />

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
)(OverView);
