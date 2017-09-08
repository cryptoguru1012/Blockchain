import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PhoneIcon from '../../asset/phoneNumber.png';

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

const Phone = ({ info }) => (
  <Wrapper>
    <Img>
      <img className="imgIcon" src={PhoneIcon} style={PhoneIcon.logo} alt="name" />
    </Img>
    <Label>Phone address:</Label>
    <Content>
      { info || (
        <LabelContent>Add Phone Number</LabelContent>
      )}
    </Content>
  </Wrapper>
);

Phone.propTypes = {
  info: PropTypes.string,
};

Phone.defaultProps = {
  info: '',
};

export default Phone;
