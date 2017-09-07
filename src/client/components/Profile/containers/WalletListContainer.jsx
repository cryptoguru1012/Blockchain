import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WalletList from '../components/WalletList';


import * as modalActions from '../../../redux/reducers/modal';
import * as walletsActions from '../../../redux/reducers/wallets';


class WalletListContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.handleReceive = this.handleReceive.bind(this);
  }
  handleSend(id) {
    const { wallets, ModalActions } = this.props;
    const wallet = wallets.find(wallet => wallet.get('id') === id);
    ModalActions.show({
      mode: 'send',
      wallet: wallet.toJS(),
    });
  }

  handleReceive(id) {
    // const { WalletsActions } = this.props;
    // WalletsActions.toggleFavorite(id);

    const { wallets, ModalActions } = this.props;
    const wallet = wallets.find(wallet => wallet.get('id') === id);
    ModalActions.show({
      mode: 'receive',
      wallet: wallet.toJS(),
    });
  }

  render() {
    const { wallets } = this.props;
    const {
            handleSend,
            handleReceive,
        } = this;

    return (
      <WalletList
        wallets={wallets}
        onSend={handleSend}
        onReceive={handleReceive}
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
