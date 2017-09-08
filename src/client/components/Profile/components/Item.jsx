import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import NameIcon from '../asset/name.png';
import EmailIcon from '../asset/email.png';
import AliasIcon from '../asset/alias.png';
import PwIcon from '../asset/pass.png';


const Wrapper = styled.div`
    display:flex;
    flex-direction: row;
    align-items:center;     
`;

const Img = styled.div`
    width: 60px;
    height: 60px;
    padding: 1.5rem !important;
    align-content: center !important;
    justify-content: center !important;
    flex-wrap: wrap;
    border:none;
    border-right: 1px solid #ced4da;   
    
`;
Img.propTypes = {
  size: PropTypes.string,
};

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

const Item = ({ info, match }) => (
  <Wrapper>
    <Img>
      {match === 'name' && <img className="imgIcon" src={NameIcon} style={NameIcon.logo} alt="name" />}
      {match === 'email' && <img className="imgIcon" src={EmailIcon} style={EmailIcon.logo} alt="name" />}
      {match === 'alias' && <img className="imgIcon" src={AliasIcon} style={AliasIcon.logo} alt="name" />}
      {match === 'password' && <img className="imgIcon" src={PwIcon} style={PwIcon.logo} alt="name" />}
    </Img>
    {match === 'name' && <Label>Name:</Label>}
    {match === 'email' && <Label>Email:</Label>}
    {match === 'alias' && <Label>Alias:</Label>}
    {match === 'password' && <Label>Password:</Label>}
    <Content>{info}</Content>
  </Wrapper>
);

Item.propTypes = {
  info: PropTypes.string,
  match: PropTypes.string,
};

Item.defaultProps = {
  info: '',
  match: '',
};

export default Item;
