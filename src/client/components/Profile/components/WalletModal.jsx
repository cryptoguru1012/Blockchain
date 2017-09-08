import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SendButton from 'material-ui/RaisedButton';
import Thumbnail from './Thumbnail';
import Modal from './Modal';
import InputAddress from './InputAddress';
import InputAmount from './InputAmount';
import CopyAddress from './CopyAddress';
import SendIcon from '../asset/whiteSendIcon.png';
import CancelIcon from '../asset/cancelIcon.png';

const RemoveButton = styled.div`
    position: absolute;
    right:1rem;
    top:1rem;

    color: #868e96;
    cursor: pointer;
    font-size:2rem;

    &:hover{
        color:#fa5252;
    }

    &:active{
        color: #0ca678;
    }
`;

const Form = styled.div`
    margin-top: 4rem;
    margin-bottom: 4rem;
    padding: 1rem;
    padding-left: 10rem;
    padding-right: 10rem;
    background: #fff;

    .sendButton{
      width: 17rem;
      margin-top 2rem;
      
    }

`;

const AddressLabel = styled.p`
    padding-top:2rem;
    padding-left:2rem;
    color:#0094da;
    font-size: 1.7rem;
`;


class WalletModal extends React.Component {


  handleChange(e) {
    const { onChange } = this.props;
    onChange({
      name: e.target.name,
      value: e.target.value,
    });
  }
  render() {
    const { handleChange } = this;
    const {
            visible,
            name,
            mode,
            onHide,
            onAction,
        } = this.props;

    return (
      <Modal visible={visible} onHide={onHide}>


        {mode === 'send' && <div>
          <RemoveButton onClick={onHide}> <img src={CancelIcon} style={CancelIcon.logo} alt="Cancel" /> </RemoveButton>
          <Form>
            {/* <InputAd
              placeholder="To SYScoin Address"
              onChange={handleChange}
            /> */}
            <InputAddress name={name} />
            <InputAmount name={name} />
            <SendButton
              className="sendButton"
              onClick={onHide}
              label="Send"
              labelColor="#fff"
              backgroundColor="#0094da"
            >
              <img src={SendIcon} style={SendIcon.logo} alt="fireSpot" />&nbsp;&nbsp;
            </SendButton>
          </Form>
          </div>}
        {mode === 'receive' && <div>
          {name === 'BTC Wallet' && <AddressLabel>BTC Wallet address</AddressLabel> }
          {name === 'SYS Wallet' && <AddressLabel>SYS Wallet address</AddressLabel> }
          {name === 'ZEC Wallet' && <AddressLabel>ZEC Wallet address</AddressLabel> }
          <RemoveButton onClick={onHide}> <img src={CancelIcon} style={CancelIcon.logo} alt="Cancel" /></RemoveButton>
          <Form>
            <Thumbnail url="BarCode" size="10rem" />
            <CopyAddress />
          </Form>
          </div>}

      </Modal>

    );
  }

}

WalletModal.propTypes = {
  visible: PropTypes.bool,
  mode: PropTypes.oneOf(['create', 'modify']),
  name: PropTypes.string,
  account: PropTypes.string,
  color: PropTypes.string,
  url: PropTypes.string,
  onHide: PropTypes.func,
  onAction: PropTypes.func,
};

export default WalletModal;
