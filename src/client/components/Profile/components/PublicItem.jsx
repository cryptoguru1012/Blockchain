import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AddressIcon from '../asset/address.png';

const Wrapper = styled.div`
    display:flex;
    flex-direction: row;
    align-items:center;     
`;

const Img = styled.div`
    width: 80px;
    height: 80px;
    padding: 1.5rem !important;
    padding-top: 2.5rem !important;
    padding-bottom: 2.5rem !important;
    align-content: center !important;
    justify-content: center !important;
    flex-wrap: wrap;
    border:none;  
    
`;

const Label = styled.div`
    color: #868e96;
    padding-left: 3rem;
    width: 40rem;
    font-size: 2rem;
    align-content: center;
`;

const Content = styled.div`
    color: #868e96;
    padding-top:2rem;
    display:flex;
    flex-direction: column;
    font-size: 2rem;
    justify-content: center;
    a { 
        font-size: 2rem;
        color:#40c057;
    }
`;

const PublicItem = ({ info }) => (
  <Wrapper>
    <Img>
      <img className="imgIcon" src={AddressIcon} style={AddressIcon.logo} alt="name" />
    </Img>
    <Label>Public address:</Label>
    <Content>
      {info}
      <a>Or pin a location on the map</a>
    </Content>
  </Wrapper>
);

PublicItem.propTypes = {
  info: PropTypes.string,
};

PublicItem.defaultProps = {
  info: '',
};

export default PublicItem;
