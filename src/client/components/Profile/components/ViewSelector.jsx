import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

const Wrapper = styled.div`
    height: 10rem;
    background: white;
    width: 100%;
    position: relative;
    border: 1px solid #ced4da;
`;

const ItemContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    
`;

const StyledItem = styled.div`
    height: 100%;
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ced4da;

    color: ${props => props.active ? '#40c057' : '#868e96'};
    font-size: 1.5rem;
    cursor:pointer;
    &: hover{
        background: #f1f3f5;
    }
`;

StyledItem.propTypes = {
  active: PropTypes.bool,
};


const Item = ({ children, selected, name, onSelect }) => (
  <StyledItem
    onClick={() => onSelect(name)}
    active={name === selected}
  >
    {children}
  </StyledItem>

);

Item.propTypes = {
  selected: PropTypes.string,
  name: PropTypes.string,
  onSelect: PropTypes.func,
};


const ViewSelector = ({ selected, onSelect }) => (
  <Wrapper>
    <ItemContainer>
      <Item
        selected={selected}
        name="personal"
        onSelect={onSelect}
      >
                Personal info
            </Item>
      <Item
        selected={selected}
        name="order"
        onSelect={onSelect}
      >
                Your orders
            </Item>
      <Item
        selected={selected}
        name="wallet"
        onSelect={onSelect}
      >
                Wallets
            </Item>
      <Item
        selected={selected}
        name="transaction"
        onSelect={onSelect}
      >
                Transactions
            </Item>
    </ItemContainer>
  </Wrapper>
);


ViewSelector.propTypes = {
  selected: PropTypes.string,
  onSelect: PropTypes.func,
};

export default ViewSelector;
