import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AddressIcon from '../asset/address.png';
import PhoneIcon from '../asset/phoneNumber.png';
import YutubeIcon from '../asset/youtube.png';
import FaceIcon from '../asset/facebook.png';
import TwitterIcon from '../asset/twitter.png';

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

const PrivateItem = ({ info, match }) => (
  <Wrapper>
    <Img>
      {match === 'shippingaddress' && <img className="imgIcon" src={AddressIcon} style={AddressIcon.logo} alt="name" />}
      {match === 'phonenumber' && <img className="imgIcon" src={PhoneIcon} style={PhoneIcon.logo} alt="name" />}
      {match === 'yutube' && <img className="imgIcon" src={YutubeIcon} style={YutubeIcon.logo} alt="name" />}
      {match === 'twitter' && <img className="imgIcon" src={TwitterIcon} style={TwitterIcon.logo} alt="name" />}
      {match === 'facebok' && <img className="imgIcon" src={FaceIcon} style={FaceIcon.logo} alt="name" />}
    </Img>
    {match === 'shippingaddress' && <Label>Shipping address:</Label>}
    {match === 'phonenumber' && <Label>Phone Number:</Label>}
    {match === 'yutube' && <Label>Yutube:</Label>}
    {match === 'twitter' && <Label>Twitter:</Label>}
    {match === 'facebok' && <Label>Facebok:</Label>}
    <Content>
      {/*{match === 'shippingaddress' && <AddressContent match={match} info={info} />}
      {match === 'phonenumber' && <AddressContent match={match} info={info} />}
       {match === 'yutube' && <SocialContent match={match} info={info} />}
      {match === 'twitter' && <SocialContent match={match} info={info} />}
      {match === 'facebok' && <SocialContent match={match} info={info} />} */}
    </Content>
  </Wrapper>
);

PrivateItem.propTypes = {
  info: PropTypes.string,
  match: PropTypes.string,
};

PrivateItem.defaultProps = {
  info: '',
  match: '',
};

export default PrivateItem;
