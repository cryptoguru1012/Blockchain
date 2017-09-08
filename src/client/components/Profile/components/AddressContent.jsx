import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Wrapper = styled.div`
    font-size: 2rem;
    justify-content: center;
`;

const Add = styled.div`
    font-size: 2rem;
    color: #019921;
`;


const AddressContent = ({ info, match }) => (
  <Wrapper>
    {info ? (
       { info }
      ) : (
        <Add>Add Phone Number</Add>
    )}
  </Wrapper>
);

AddressContent.propTypes = {
  info: PropTypes.string,
  match: PropTypes.string,
};

AddressContent.defaultProps = {
  info: '',
  match: '',
};
export default AddressContent;
