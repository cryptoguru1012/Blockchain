import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import sysA from '../asset/sysA.png';

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
    padding-top:8px;
    font-size:1.8rem;
    color: #0088df;
    align-items: center;
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


const InputAmount = ({ name }) => (
  <Wrapper>
    <Img>
      { name === 'SYS Wallet' && <p>SYS</p> }
      { name === 'BTC Wallet' && <p>BTC</p> }
      { name === 'ZEC Wallet' && <p>ZEC</p> }
    </Img>
    <Input
      placeholder="Enter Amount"
    />

  </Wrapper>

);

InputAmount.propTypes = {
  name: PropTypes.string,
};

InputAmount.defaultProps = {
  name: '',
};


export default InputAmount;
