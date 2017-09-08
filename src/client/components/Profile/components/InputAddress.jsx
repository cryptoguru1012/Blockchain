import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import sysMark from '../asset/sysMark.png';

const Wrapper = styled.div`
    padding:0.5rem;
    width: 100%;
    border: none;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5rem;
`;
const Img = styled.div`
    width:42px;
    height: 39px;
    
    border:none;
    border-right: 1px solid #e9ecef;
`;


const Input = styled.input`
    border:none;
    padding-left: 0.5rem;
    font-size: 1.5rem;
    &:focus{
        outline: none;
        border: none;
    }
`;


const InputAddress = ({ name }) => (
  <Wrapper>
    <Img>
      <img src={sysMark} style={sysMark.logo} alt="Mark" />
    </Img>
    { name === 'SYS Wallet' && <Input placeholder="To SYScoin Address" />}
    { name === 'BTC Wallet' && <Input placeholder="To BTCcoin Address" />}
    { name === 'ZEC Wallet' && <Input placeholder="To ZECcoin Address" />}

  </Wrapper>

);

InputAddress.propTypes = {
  name: PropTypes.string,
};

InputAddress.defaultProps = {
  name: '',
};

export default InputAddress;
