import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SYSicon from '../asset/SYSicon.png';
import BTCicon from '../asset/BTCicon.png';
import ZECicon from '../asset/ZECicon.png';
import BarCode from '../asset/barCode.png';

const Wrapper = styled.div`
  
    width: ${props => props.size};
    height: ${props => props.size};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(${props => props.size} * 0.75);    
  
`;

Wrapper.propTypes = {
  size: PropTypes.string,
  url: PropTypes.string,
};

const Thumbnail = ({ url, size }) => (
  <Wrapper url={url}>
    {url === 'BTCicon' && <img src={BTCicon} style={BTCicon.logo} alt="fireSpot" />}
    {url === 'SYSicon' && <img src={SYSicon} style={SYSicon.logo} alt="fireSpot" />}
    {url === 'ZECicon' && <img src={ZECicon} style={ZECicon.logo} alt="fireSpot" />}
    {url === 'BarCode' && <img src={BarCode} style={BarCode.logo} alt="BarCode" />}

  </Wrapper>
);

Thumbnail.propTypes = {
  url: PropTypes.string,
  size: PropTypes.string,
};


Thumbnail.defaultProps = {
  url: '',
  size: '5rem',
};

export default Thumbnail;
