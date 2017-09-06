import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Thumbnail from './Thumbnail';
import SendIcon from '../asset/sendIcon.png';
import ReceiveIcon from '../asset/receiveIcon.png';

const Wrapper = styled.div`
    height: 8rem;
    padding: 1rem;
    position: relative;
    overflow: hidden;
    display: flex;
    
    background:white;
    border: 1px solid #ced4da;

    transition: all .25s;

    
    .favorit{
        background:#d3f9d8;
    }

    }

    &:hover {
        border: 1px solid #ced4da;
        background: #dee2e6;       
    }
    
`;
const Info = styled.div`
    margin-left: 3rem;
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const Name = styled.div`
    font-size: 1.25rem;
    color: ${pros => pros.color};
    font-weight: 500;
`;

const Phone = styled.div`
    color:#868e96;
    margin-top: 0.25rem;
`;

const Button = styled.div`
    height: 3.5rem;
    width: 15rem;
    display: flex;
    align-items: center;
    justify-content: center;
   
    margin: 0.25rem;
    margin-top: 1rem;

    font-size: 1.15rem;

    background: white;
    border: 1px solid #ced4da;
    color: #343a40;
    cursor:pointer;


    &:hover{
        border: 1px solid #495057;
        color: #212529;
        
    }

    &.favorite{
        background: ${props => props.color};
        color: white;
        margin-left: 4rem;
        margin-right: 8rem;

    }
`;

Button.propTypes = {
  active: PropTypes.bool,
};


class WalletItem extends React.Component {


  render() {
    const {
            wallet,
            onOpenModify,
            onToggleFavorite,
        } = this.props;

    const { name, account, favorite, id, color, btncolor, url } = wallet.toJS();

    return (
      <Wrapper>
        <Thumbnail url={url} />
        <Info>
          <Name color={color}>{name}</Name>
          <Phone color={color}>{account}</Phone>
        </Info>


        <Button onClick={() => onOpenModify(id)}>
          <img src={SendIcon} style={SendIcon.logo} alt="fireSpot" />&nbsp; Send
        </Button>
        <Button className="favorite" active={favorite} onClick={() => onToggleFavorite(id)} color={btncolor}>
          <img src={ReceiveIcon} style={ReceiveIcon.logo} alt="fireSpot" />&nbsp; Receive
        </Button>

      </Wrapper>
    );
  }
}

WalletItem.propTypes = {
  wallet: ImmutablePropTypes.mapContains({
    id: PropTypes.string,
    name: PropTypes.string,
    account: PropTypes.string,
    color: PropTypes.string,
    url: PropTypes.string,
  }),
  onToggleFavorite: PropTypes.func,
  onOpenModify: PropTypes.func,
};

WalletItem.defaultProps = {
  onToggleFavorite: () => console.log('This send function.'),
  onOpenModify: () => console.log('This is send function'),
};

export default WalletItem;
