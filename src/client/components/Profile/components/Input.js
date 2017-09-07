import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = styled.input`
    width: 100%;
    padding: 0.5rem;

    border: 1px solid #e9ecef;
    border:
    font-size: 1.5rem;
    line-height: 2rem;
    transition: all .25s;

    &:focus{
        outline: none;
        border: 1px solid #faa2c1;
        color: #e64980;
    }

    &+& {
        margin-top: 1rem;
    }
`;


Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
