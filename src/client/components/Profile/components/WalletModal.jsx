import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Thumbnail from './Thumbnail';
import Input from './Input';

const ThumbnailWrapper = styled.div`
    padding-top: 3rem;
    padding-buttom: 3rem;
    display: flex;
    justify-content: center;
    background:white;
`;

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
        color: #f03e3e;
    }

    ${props => !props.visible && 'display:none;'}

`;


RemoveButton.propTypes = {
  visible: PropTypes.bool,
};

const Form = styled.div`
    padding: 1rem;
    background: #f8f9fa;
`;

const ButtonsWrapper = styled.div`
    display: flex;
`;

const Button = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
    flex:1;
    display: inline-block;

    cursor: pointer;
    text-align: center;
    font-weight: 500;
    font-size: 1.2rem;
    transition: all .3s;

    color: white;
    background: #12b886;
    
    &:hover{
        background: #20c997;
    }

    &:active{
        background: #0ca678;
    }
`;

Button.propTypes = {
  color: PropTypes.string,
};


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
            mode,
            name,
            account,
            color,
            url,
            onHide,
            onAction,
        } = this.props;

    return (
      <Modal visible={visible} onHide={onHide}>
        <ThumbnailWrapper>
          <Thumbnail size="8rem" color={color} url={url} />
        </ThumbnailWrapper>
        <Form>
          <Input
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleChange}
          />
          <Input
            name="account"
            placeholder="account"
            value={account}
            onChange={handleChange}
          />
        </Form>
        <ButtonsWrapper>
          <Button
            color="teal"
            onClick={onAction}
          >
            { mode === 'create' ? 'Modify' : 'Send'}
          </Button>
          <Button
            onClick={onHide}
            color="gray"
          >
                        Cancel
                    </Button>
        </ButtonsWrapper>

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
