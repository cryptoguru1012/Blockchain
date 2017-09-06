import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WalletList from '../components/WalletList';


import * as modalActions from '../../../redux/reducers/modal';
import * as walletsActions from '../../../redux/reducers/wallets';


class WalletListContainer extends Component {
  handleOpenModify(id) {
    const { wallets, ModalActions } = this.props;
    const wallet = wallets.find(wallet => wallet.get('id') === id);
    ModalActions.show({
      mode: 'modify',
      wallet: wallet.toJS(),
    });
  }

  handleToggleFavorite(id) {
    const { WalletsActions } = this.props;
    WalletsActions.toggleFavorite(id);
  }

  render() {
    const { wallets } = this.props;
    const {
            handleOpenModify,
            handleToggleFavorite,
        } = this;

    return (
      <WalletList
        wallets={wallets}
        onOpenModify={handleOpenModify}
        onToggleFavorite={handleToggleFavorite}
      />
    );
  }

}

export default connect(
    state => ({
      wallets: state.wallets,
    }),
    dispatch => ({
      ModalActions: bindActionCreators(modalActions, dispatch),
      WalletsActions: bindActionCreators(walletsActions, dispatch),
    }),
)(WalletListContainer);
