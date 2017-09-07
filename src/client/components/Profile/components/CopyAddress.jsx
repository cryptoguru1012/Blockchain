import React from 'react';
import styled from 'styled-components';

import copyIcon from '../asset/copyIcon.png';

const Wrapper = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    border: 1px solid #e9ecef;
    display: flex;
    flex-direction: row-reverse;
    
    
`;

const Input = styled.input`
    width:100%;
    border:none;
    padding-left: 0.5rem;
    font-size: 1.5rem;
    &:focus{
        outline: none;
        border: none;
    }
`;

const Img = styled.div`
    padding: 0.5rem;
    height: 39px;   
    border:none;
    border-left: 1px solid #e9ecef;
`;


const InputAddress = () => (
  <Wrapper>
    <Img>
      <img src={copyIcon} style={copyIcon.logo} alt="Mark" />
    </Img>
    <Input
      placeholder="da10ede359369ecb565e72a5c17cfb530b4e95dcdsfdsaf3sdf"
    />

  </Wrapper>

);

export default InputAddress;
