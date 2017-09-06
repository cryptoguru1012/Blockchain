import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SYSicon from '../asset/SYSicon.png';
import BTCicon from '../asset/BTCicon.png';
import ZECicon from '../asset/ZECicon.png';

const Wrapper = styled.div`
  
    width: 5rem;
    height: 5rem;
    display: flex;

    content: center;
    font-size: calc(${props => props.size} * 0.75);    
  
`;

Wrapper.propTypes = {
  size: PropTypes.string,
  url: PropTypes.string,
};

const Thumbnail = ({ url }) => (
  <Wrapper url={url}>
    {url === 'BTCicon' && <img src={BTCicon} style={BTCicon.logo} alt="fireSpot" />}
    {url === 'SYSicon' && <img src={SYSicon} style={SYSicon.logo} alt="fireSpot" />}
    {url === 'ZECicon' && <img src={ZECicon} style={ZECicon.logo} alt="fireSpot" />}

  </Wrapper>
);

Thumbnail.propTypes = {
  url: PropTypes.string,
};


Thumbnail.defaultProps = {
  url: '',
};

export default Thumbnail;
