import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    width: 1400px;
    margin: 0 auto; 
    margin-top: 0.8rem;
    padding: 0rem;
    border: 1px solid #ced4da;
`;

// visible  false null
const Container = ({ visible, children }) => visible ? (
  <Wrapper>
    {children}
  </Wrapper>
) : null;

// propTypes
Container.propTypes = {
  visible: PropTypes.bool,
};

Container.defaultProps = {
  visible: true,
};

export default Container;
