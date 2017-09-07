import React from 'react';
import styled from 'styled-components';

import sysA from '../asset/sysA.png';

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


const InputAddress = () => (
  <Wrapper>
    <Img>
      <img src={sysA} style={sysA.logo} alt="Mark" />
    </Img>
    <Input
      placeholder="Enter Amount"
    />

  </Wrapper>

);

export default InputAddress;
