import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AddressIcon from '../../asset/address.png';

const Wrapper = styled.div`
    display:flex;
    flex-direction: row;
    align-items:center;     
`;

const Img = styled.div`
    width: 80px;
    height: 80px;
    padding: 1.5rem !important;
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
    align-content: center !important;
    justify-content: center !important;
    flex-wrap: wrap;
    border:none;
    border-right: 1px solid #ced4da;   
    
`;

const Label = styled.div`
    padding-left: 3rem;
    width: 40rem;
    font-size: 2rem;
    align-content: center;
`;
const Content = styled.div`
    font-size: 2rem;
    justify-content: center;
`;

const LabelContent = styled.div`
    color: #019921;
    font-size: 2rem;
    align-content: center;
`;

const Shipping = ({ info }) => (
  <Wrapper>
    <Img>
      <img className="imgIcon" src={AddressIcon} style={AddressIcon.logo} alt="name" />
    </Img>
    <Label>Shipping address:</Label>
    <Content>
      { info || (
        <LabelContent>Add Shipping Address</LabelContent>
      )}
    </Content>
  </Wrapper>
);

Shipping.propTypes = {
  info: PropTypes.string,
};

Shipping.defaultProps = {
  info: '',
};

export default Shipping;
