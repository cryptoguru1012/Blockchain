import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shortid from 'shortid';

import WalletModal from '../components/WalletModal';
import Dimmed from '../components/Dimmed';

import * as modalActions from '../../../redux/reducers/modal';
import * as walletsActions from '../../../redux/reducers/wallets';


class WalletModalContainer extends Component {

  handleHide() {
    const { ModalActions } = this.props;
    ModalActions.hide();
  }

  handleChange(name, value) {
    const { ModalActions } = this.props;
    ModalActions.change({
      name,
      value,
    });
  }

  handleAction() {
    () => {
      const { WalletActions, modal } = this.props;
      const { name, account, color } = modal.get('wallet').toJS();
      const id = shortid.generate();
      WalletActions.create({
        id,
        name,
        account,
        color,
      });

      this.handleHide();
    };

    () => {
      const { WalletActions, modal } = this.props;
      const { id, name, account } = modal.get('wallet').toJS();

      WalletActions.modify({
        id,
        wallet: {
          name,
          account,
        },
      });
      this.handleHide();
    };
  }


  handleRemove() {
    const { WalletActions, modal } = this.props;
    const id = modal.getIn(['wallet', 'id']);

    WalletActions.remove(id);
    this.handleHide();
  }


  render() {
    const { modal } = this.props;
    const { visible, mode, wallet } = modal.toJS();

    const {
            handleHide,
            handleAction,
            handleChange,
            handleRemove,
        } = this;

    return (
      <div>
        <WalletModal
          visible={visible}
          mode={mode}
          name={wallet.name}
          account={wallet.account}
          color={wallet.color}
          url={wallet.url}
          onHide={handleHide}
          onAction={handleAction[mode]}
          onRemove={handleRemove}
          onChange={handleChange}
        />
        <Dimmed visible={visible} />
      </div>
    );
  }
}

export default connect(
   state => ({
     modal: state.modal,
   }),
  dispatch => ({
    WalletActions: bindActionCreators(walletsActions, dispatch),
    ModalActions: bindActionCreators(modalActions, dispatch),
  }),
)(WalletModalContainer);

