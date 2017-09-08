import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VerifyButton from 'material-ui/RaisedButton';
import FacebokIcon from '../../asset/facebook.png';

const Wrapper = styled.div`
    display:flex;
    flex-direction: row;
    align-items:center;   

    .verifyButton{
      width: 17rem;     
    }  
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
    color: #868e96;
    padding-left: 3rem;
    width: 40rem;
    font-size: 2rem;
    align-content: center;
`;
const Content = styled.div`
    color: #868e96;
    display:flex;
    flex-direction: row;
    font-size: 2rem;
    justify-content: center;
`;

const LabelContent = styled.div`
    
    padding-left: 10rem;
    color: #019921;
    font-size: 2rem;
    align-content: center;
`;

const Facebok = ({ info }) => (
  <Wrapper>
    <Img>
      <img className="imgIcon" src={FacebokIcon} style={FacebokIcon.logo} alt="name" />
    </Img>
    <Label>Facebok address:</Label>
    <Content>
      { info ? (
        <Content>disconnect facebook <LabelContent> Verified </LabelContent></Content>
      ) : (
        <VerifyButton
          className="verifyButton"
          label="Verify with Facebook"
          labelColor="#fff"
          backgroundColor="#0088df"
        />
      )}
    </Content>
  </Wrapper>
);

Facebok.propTypes = {
  info: PropTypes.string,
};

Facebok.defaultProps = {
  info: '',
};

export default Facebok;
