import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VerifyButton from 'material-ui/RaisedButton';
import YoutubeIcon from '../../asset/youtube.png';

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

const Youtube = ({ info }) => (
  <Wrapper>
    <Img>
      <img className="imgIcon" src={YoutubeIcon} style={YoutubeIcon.logo} alt="name" />
    </Img>
    <Label>Youtube address:</Label>
    <Content>
      { info ? (
        <Content>disconnect youtube<LabelContent> Verified </LabelContent></Content>
      ) : (
        <VerifyButton
          className="verifyButton"
          label="Verify with Youtube"
          labelColor="#fff"
          backgroundColor="#0088df"
        />
      )}
    </Content>
  </Wrapper>
);

Youtube.propTypes = {
  info: PropTypes.string,
};

Youtube.defaultProps = {
  info: '',
};

export default Youtube;
